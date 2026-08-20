import { v } from "convex/values";
import type { Id } from "./_generated/dataModel";
import type { QueryCtx } from "./_generated/server";
import { mutation, query } from "./_generated/server";

const guestInput = v.object({
  email: v.string(),
  name: v.string(),
  firstName: v.string(),
  lastName: v.string(),
  ticketName: v.string(),
  city: v.string(),
  company: v.string(),
  building: v.string(),
  linkedin: v.optional(v.string()),
  twitter: v.optional(v.string()),
  github: v.optional(v.string()),
  passportUrl: v.optional(v.string()),
  passportId: v.optional(v.string()),
  photoUrl: v.optional(v.string()),
  photoStorageId: v.optional(v.id("_storage")),
  lumaGuestId: v.optional(v.string()),
});

const guestPublic = v.object({
  _id: v.id("guests"),
  _creationTime: v.number(),
  email: v.string(),
  name: v.string(),
  firstName: v.string(),
  lastName: v.string(),
  ticketName: v.string(),
  city: v.string(),
  company: v.string(),
  building: v.string(),
  linkedin: v.optional(v.string()),
  twitter: v.optional(v.string()),
  github: v.optional(v.string()),
  passportUrl: v.optional(v.string()),
  passportId: v.optional(v.string()),
  photoUrl: v.optional(v.string()),
  photoStorageId: v.optional(v.id("_storage")),
  resolvedPhotoUrl: v.union(v.string(), v.null()),
  lumaGuestId: v.optional(v.string()),
});

async function resolvePhotoUrl(
  ctx: QueryCtx,
  photoUrl: string | undefined,
  photoStorageId: Id<"_storage"> | undefined,
): Promise<string | null> {
  if (photoUrl) return photoUrl;
  if (photoStorageId) {
    return await ctx.storage.getUrl(photoStorageId);
  }
  return null;
}

/**
 * Public guest directory listing. Auth not required for the event directory.
 * Lock down later if the directory should become private.
 */
export const listGuests = query({
  args: {},
  returns: v.array(guestPublic),
  handler: async ctx => {
    const guests = await ctx.db.query("guests").collect();

    const withPhotos = await Promise.all(
      guests.map(async guest => {
        const resolvedPhotoUrl = await resolvePhotoUrl(
          ctx,
          guest.photoUrl,
          guest.photoStorageId,
        );
        return { ...guest, resolvedPhotoUrl };
      }),
    );

    withPhotos.sort((a, b) => {
      const byName = a.name.localeCompare(b.name, undefined, {
        sensitivity: "base",
      });
      if (byName !== 0) return byName;
      return b._creationTime - a._creationTime;
    });

    return withPhotos;
  },
});

export const getGuestByEmail = query({
  args: { email: v.string() },
  returns: v.union(guestPublic, v.null()),
  handler: async (ctx, args) => {
    const email = args.email.trim().toLowerCase();
    const guest = await ctx.db
      .query("guests")
      .withIndex("by_email", q => q.eq("email", email))
      .unique();

    if (!guest) return null;

    const resolvedPhotoUrl = await resolvePhotoUrl(
      ctx,
      guest.photoUrl,
      guest.photoStorageId,
    );
    return { ...guest, resolvedPhotoUrl };
  },
});

/**
 * Upsert guests by email (admin / seed). Email is the unique key.
 * WARNING: This mutation is currently public so the seed script can call it.
 * Restrict with auth before production use.
 */
export const upsertGuests = mutation({
  args: { guests: v.array(guestInput) },
  returns: v.object({
    inserted: v.number(),
    updated: v.number(),
  }),
  handler: async (ctx, args) => {
    let inserted = 0;
    let updated = 0;

    for (const guest of args.guests) {
      const email = guest.email.trim().toLowerCase();
      if (!email) {
        throw new Error("Guest email is required");
      }

      const fields = {
        email,
        name: guest.name.trim(),
        firstName: guest.firstName.trim(),
        lastName: guest.lastName.trim(),
        ticketName: guest.ticketName.trim(),
        city: guest.city.trim(),
        company: guest.company.trim(),
        building: guest.building.trim(),
        linkedin: guest.linkedin,
        twitter: guest.twitter,
        github: guest.github,
        passportUrl: guest.passportUrl,
        passportId: guest.passportId,
        photoUrl: guest.photoUrl,
        photoStorageId: guest.photoStorageId,
        lumaGuestId: guest.lumaGuestId,
      };

      const existing = await ctx.db
        .query("guests")
        .withIndex("by_email", q => q.eq("email", email))
        .unique();

      if (existing) {
        await ctx.db.patch(existing._id, fields);
        updated += 1;
      } else {
        await ctx.db.insert("guests", fields);
        inserted += 1;
      }
    }

    return { inserted, updated };
  },
});

/** Generate a short-lived upload URL for Convex file storage photos. */
export const generatePhotoUploadUrl = mutation({
  args: {},
  returns: v.string(),
  handler: async ctx => {
    return await ctx.storage.generateUploadUrl();
  },
});
