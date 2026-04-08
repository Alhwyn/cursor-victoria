# AGENTS.md

## Cursor Cloud specific instructions

This is a **Bun + React + Tailwind CSS** single-service application. Bun serves both the frontend (HTML/CSS/JS) and API routes in one process on port 3000.

### Quick reference

| Action | Command |
|---|---|
| Install deps | `bun install` |
| Dev server (HMR) | `bun dev` (port 3000) |
| Production server | `bun start` |
| Production build | `bun run build` |
| Type check | `bunx tsc --noEmit` |
| Run tests | `bun test` |

See `README.md` and `CLAUDE.md` for full documentation.

### Notes

- **Bun is the sole runtime.** Do not use Node.js, npm, pnpm, or vite. See `CLAUDE.md` for details.
- The `tsconfig.json` emits a deprecation warning for `baseUrl` with TypeScript 7+; this is a known pre-existing issue and does not block compilation.
- There are no tests in the repo yet. `bun test` will report "No tests found" — this is expected.
- No database, Docker, or external services are required.
- The dev server uses `bun --hot` for HMR; changes to `.ts`/`.tsx`/`.html`/`.css` files are picked up automatically.
