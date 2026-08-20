import { v } from "convex/values";
import { internal } from "./_generated/api";
import type { Id } from "./_generated/dataModel";
import type { ActionCtx } from "./_generated/server";
import { action } from "./_generated/server";

const DEFAULT_FROM = "Cursor Codechella <noreply@cursorvictoria.com>";
const SUBJECT = "What to expect at Cursor Codechella Victoria";

function assertAdmin(adminSecret: string): void {
  const expected = process.env.ADMIN_SECRET;
  if (!expected) {
    throw new Error(
      "ADMIN_SECRET is not configured on the Convex deployment. Set it with `npx convex env set ADMIN_SECRET …`.",
    );
  }
  if (adminSecret !== expected) {
    throw new Error("Unauthorized");
  }
}

function trackingBaseUrl(): string {
  const raw = process.env.CONVEX_SITE_URL || process.env.SITE_URL || "";
  const base = raw.replace(/\/$/, "");
  if (!base) {
    throw new Error(
      "Missing CONVEX_SITE_URL (or SITE_URL) for email tracking links.",
    );
  }
  return base;
}

function escapeHtml(value: string): string {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;");
}

function buildEmailHtml(args: {
  firstName: string;
  openUrl: string;
  readUrl: string;
}): string {
  const name = args.firstName.trim() || "there";
  return `<!DOCTYPE html>
<html>
<body style="margin:0;padding:0;background:#edece8;color:#14120b;font-family:Geist,Inter,Segoe UI,sans-serif;">
  <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="background:#edece8;padding:32px 16px;">
    <tr>
      <td align="center">
        <table role="presentation" width="100%" style="max-width:560px;background:#f4f3ee;border:1px solid #d9d7cf;padding:28px 24px;">
          <tr>
            <td>
              <p style="margin:0 0 16px;font-size:13px;color:#8a877c;">Cursor Codechella Victoria</p>
              <h1 style="margin:0 0 12px;font-size:22px;line-height:1.3;font-weight:500;letter-spacing:-0.02em;">
                What to expect
              </h1>
              <p style="margin:0 0 12px;font-size:14px;line-height:1.55;color:#5c5a52;">
                Hi ${escapeHtml(name)} — thanks for joining us on August 22, 2026 at VIATEC.
                Bring a laptop, ship something real, and come ready to demo.
              </p>
              <p style="margin:0 0 20px;font-size:14px;line-height:1.55;color:#5c5a52;">
                Check-in starts at 9:30 am. Hacking begins at 10:00 am. Hard submission at 4:30 pm.
              </p>
              <p style="margin:0 0 24px;">
                <a href="${args.readUrl}"
                   style="display:inline-block;background:#f54e00;color:#fff;text-decoration:none;padding:10px 16px;font-size:13px;">
                  View details
                </a>
              </p>
              <p style="margin:0;font-size:12px;line-height:1.5;color:#8a877c;">
                See you in Victoria — Cursor Community
              </p>
              <img src="${args.openUrl}" width="1" height="1" alt="" style="display:block;width:1px;height:1px;border:0;" />
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>
</html>`;
}

async function deliverEmail(args: {
  to: string;
  subject: string;
  html: string;
}): Promise<{ dryRun: boolean }> {
  const apiKey = process.env.RESEND_API_KEY;
  const from = process.env.EMAIL_FROM || DEFAULT_FROM;

  if (!apiKey) {
    console.log(
      `[dry-run] Would send email to ${args.to} from ${from}: ${args.subject}`,
    );
    return { dryRun: true };
  }

  const response = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      from,
      to: [args.to],
      subject: args.subject,
      html: args.html,
    }),
  });

  if (!response.ok) {
    const detail = await response.text();
    console.error("Resend error:", detail);
    throw new Error("Failed to send email via Resend");
  }

  return { dryRun: false };
}

async function sendOne(
  ctx: ActionCtx,
  guestId: Id<"guests">,
): Promise<{ dryRun: boolean }> {
  const guest = await ctx.runMutation(internal.guests.prepareGuestSend, {
    guestId,
  });

  const base = trackingBaseUrl();
  const openUrl = `${base}/track/open?t=${encodeURIComponent(guest.emailToken)}`;
  const readUrl = `${base}/track/read?t=${encodeURIComponent(guest.emailToken)}`;

  const html = buildEmailHtml({
    firstName: guest.firstName,
    openUrl,
    readUrl,
  });

  const { dryRun } = await deliverEmail({
    to: guest.email,
    subject: SUBJECT,
    html,
  });

  await ctx.runMutation(internal.guests.markEmailSent, {
    guestId: guest.guestId,
  });

  return { dryRun };
}

/**
 * Admin-only: send the "What to expect" email to one guest.
 * Requires ADMIN_SECRET. Without RESEND_API_KEY, dry-runs and still marks sent.
 */
export const sendGuestEmail = action({
  args: {
    guestId: v.id("guests"),
    adminSecret: v.string(),
  },
  returns: v.object({
    ok: v.literal(true),
    dryRun: v.boolean(),
  }),
  handler: async (ctx, args): Promise<{ ok: true; dryRun: boolean }> => {
    assertAdmin(args.adminSecret);
    const { dryRun } = await sendOne(ctx, args.guestId);
    return { ok: true as const, dryRun };
  },
});

/**
 * Admin-only: send to every guest still at emailStatus "none".
 */
export const sendAllUnsent = action({
  args: {
    adminSecret: v.string(),
  },
  returns: v.object({
    attempted: v.number(),
    sent: v.number(),
    dryRun: v.boolean(),
    errors: v.array(v.string()),
  }),
  handler: async (
    ctx,
    args,
  ): Promise<{
    attempted: number;
    sent: number;
    dryRun: boolean;
    errors: string[];
  }> => {
    assertAdmin(args.adminSecret);

    const ids: Id<"guests">[] = await ctx.runQuery(
      internal.guests.listUnsentGuestIds,
      {},
    );
    let sent = 0;
    let anyDryRun = !process.env.RESEND_API_KEY;
    const errors: string[] = [];

    for (const guestId of ids) {
      try {
        const result = await sendOne(ctx, guestId);
        sent += 1;
        anyDryRun = anyDryRun || result.dryRun;
      } catch (error) {
        const message =
          error instanceof Error ? error.message : "Unknown send error";
        errors.push(`${guestId}: ${message}`);
      }
    }

    return {
      attempted: ids.length,
      sent,
      dryRun: anyDryRun,
      errors,
    };
  },
});
