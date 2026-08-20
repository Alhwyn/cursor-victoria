import { ConvexReactClient } from "convex/react";

/**
 * Bun inlines `process.env.CONVEX_URL` for the browser:
 * - `bun --hot`: via bunfig.toml `[serve.static] env = "CONVEX_*"`
 * - `bun run build`: via build.ts `define`
 * Seed scripts and `npx convex dev` use the same `.env.local` key.
 */
const convexUrl = process.env.CONVEX_URL;

if (!convexUrl) {
  throw new Error(
    "Missing CONVEX_URL. Run `npx convex dev` (writes .env.local) or set CONVEX_URL in the environment.",
  );
}

export const convex = new ConvexReactClient(convexUrl);
