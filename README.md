# Cursor Codechella

Landing page for **Cursor Codechella @ Victoria, BC** — a one-day hackathon styled after [Cursor Compile](https://cursor.com/compile) and Cursor brand guidelines.

## Develop

```bash
bun install
npx convex dev          # writes CONVEX_URL to .env.local; keep running
bun dev                 # landing + /guests SPA on Bun
```

Open the site, then visit `/guests` for the live guest directory (powered by Convex).

## Guest directory seed (no PII in git)

Real Luma guest CSVs / emails / phones / photos must **not** be committed.

```bash
cp data/guests.example.json data/guests.json
# edit data/guests.json with your export (gitignored)
bun run seed:guests     # requires CONVEX_URL from `npx convex dev`
```

`upsertGuests` is currently a public mutation so the seed script can call it. Lock it down with auth before relying on this in production.

## Production

```bash
# set CONVEX_URL to your Convex deployment URL
bun run build
bun start
```

On Vercel, set `CONVEX_URL` in project env vars. `vercel.json` rewrites all paths to `index.html` so `/guests` works as an SPA route.

## Env

See `.env.example`. Bun loads `.env.local` automatically; the production build inlines `process.env.CONVEX_URL` (see `build.ts`).

RSVP: [luma.com/cursorvictoria](https://luma.com/cursorvictoria)
