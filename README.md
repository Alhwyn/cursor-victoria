# Cursor Codechella

Landing page for **Cursor Codechella @ Victoria, BC** — a one-day hackathon styled after [Cursor Compile](https://cursor.com/compile) and Cursor brand guidelines.

## Develop

```bash
bun install
npx convex dev          # writes CONVEX_URL / CONVEX_SITE_URL to .env.local; keep running
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

## Guest email (“What to expect”)

Organizers can send a Codechella briefing email from `/guests`. Sends are **admin-gated**:

1. Set secrets on the Convex deployment (not in the public frontend env):

```bash
npx convex env set ADMIN_SECRET 'your-long-random-secret'
# Optional — without this key, sends dry-run and still mark status "sent":
npx convex env set RESEND_API_KEY 're_…'
npx convex env set EMAIL_FROM 'Cursor Codechella <noreply@cursorvictoria.com>'
# CONVEX_SITE_URL is usually written by `npx convex dev` for tracking links
```

2. On `/guests`, paste `ADMIN_SECRET` into the admin field (stored in `localStorage`). Send buttons and **Send all unsent** appear only when that field is non-empty.

3. Each guest has monotonic status: `none` → `sent` → `opened` → `read`  
   - **opened** = tracking pixel hit (`GET {CONVEX_SITE_URL}/track/open?t=TOKEN`)  
   - **read** = “View details” click (`GET …/track/read?t=TOKEN` → passport URL or Luma)

Dry-run: if `RESEND_API_KEY` is missing, Convex logs the would-be send and still advances status to `sent` so you can demo the UI without emailing real guests.

## Production

```bash
# set CONVEX_URL to your Convex deployment URL
bun run build
bun start
```

On Vercel, set `CONVEX_URL` in project env vars. `vercel.json` rewrites all paths to `index.html` so `/guests` works as an SPA route. Keep `ADMIN_SECRET` / `RESEND_API_KEY` on Convex only.

## Env

See `.env.example`. Bun loads `.env.local` automatically; the production build inlines `process.env.CONVEX_URL` (see `build.ts`).

RSVP: [luma.com/cursorvictoria](https://luma.com/cursorvictoria)
