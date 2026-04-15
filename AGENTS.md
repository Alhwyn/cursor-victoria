## Cursor Cloud specific instructions

This is a static React SPA for "Cursor @ Victoria" — a community meetup site. No backend, database, or external services are needed.

### Runtime

- **Bun** is the only runtime. See `CLAUDE.md` for the full Bun-first policy.
- Dev server: `bun dev` (runs `bun --hot src/index.ts`, serves on `http://localhost:3000`)
- Build: `bun run build` (outputs to `dist/`)
- Type check: `bunx tsc --noEmit` (deprecation warning on `baseUrl` is expected, not a real error)
- No test files exist yet; `bun test` will exit cleanly with zero tests.

### Notes

- Image assets live in `src/assets/` and are imported directly in components. They are committed in the repo (PNG files).
- The site loads Google Fonts and Cursor logo videos from external CDNs at runtime; these are cosmetic and the app renders without network access.
- Tailwind CSS v4 is configured via `bun-plugin-tailwind` in `bunfig.toml` — no separate `tailwind.config` file.
- Content (events, site copy) is hardcoded in `src/content.ts`.
