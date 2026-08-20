import { ConvexReactClient } from "convex/react";

/**
 * Bun inlines `process.env.CONVEX_URL` at build time (see build.ts).
 * In `bun --hot` / `bun start`, Bun also loads `.env.local` from `npx convex dev`.
 */
const convexUrl = process.env.CONVEX_URL;

if (!convexUrl) {
  throw new Error(
    "Missing CONVEX_URL. Run `npx convex dev` (writes .env.local) or set CONVEX_URL in the environment.",
  );
}

export const convex = new ConvexReactClient(convexUrl);
