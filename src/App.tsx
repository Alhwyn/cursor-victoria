import "./index.css";

/** Swap these when your Victoria events go live. */
const LINKS = {
  registerBuildNight: "https://luma.com/",
  inspiration: "https://cursor.com",
  cafeRecap: "https://x.com/cursor",
} as const;

function ArrowIcon() {
  return (
    <svg className="inline-block size-4 translate-y-px" viewBox="0 0 16 16" fill="none" aria-hidden>
      <path
        d="M3 8h10M9 4l4 4-4 4"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function VictoriaMark() {
  return (
    <svg className="text-[var(--accent)]" viewBox="0 0 120 120" fill="none" aria-hidden>
      <rect x="8" y="8" width="104" height="104" rx="12" stroke="currentColor" strokeWidth="1.5" opacity="0.35" />
      <path
        d="M60 28 L88 92 H72 L60 62 L48 92 H32 Z"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinejoin="round"
        fill="none"
      />
      <circle cx="60" cy="38" r="4" fill="currentColor" />
    </svg>
  );
}

export function App() {
  return (
    <div className="min-h-screen w-full max-w-5xl mx-auto px-5 sm:px-8 py-14 sm:py-20">
      <header className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-6 mb-16 sm:mb-20">
        <div>
          <p className="text-[var(--muted)] text-sm font-medium tracking-wide uppercase mb-3">Spring 2026</p>
          <h1 className="text-4xl sm:text-5xl font-semibold tracking-tight text-balance leading-[1.1]">
            Cursor <span className="text-[var(--accent)]">@ Victoria</span>
          </h1>
          <p className="mt-4 text-lg text-[var(--muted)] max-w-xl leading-relaxed">
            Community nights on the island. Build together, share what you ship, and grab coffee with other builders.
          </p>
        </div>
        <div className="shrink-0 w-24 h-24 sm:w-28 sm:h-28 opacity-90">
          <VictoriaMark />
        </div>
      </header>

      <div className="grid gap-10 lg:gap-14">
        <section className="card-hover rounded-2xl border border-[var(--border)] bg-[var(--card)] p-8 sm:p-10 shadow-[0_0_0_1px_rgba(255,255,255,0.03)_inset]">
          <div className="flex flex-col lg:flex-row lg:items-stretch gap-8 lg:gap-12">
            <div className="flex-1 flex flex-col justify-center order-2 lg:order-1">
              <p className="text-[var(--accent)] text-sm font-semibold tracking-wide uppercase mb-2">Build night</p>
              <h2 className="text-2xl sm:text-3xl font-semibold tracking-tight mb-4">FREEFORM: a 4 hour build night.</h2>
              <p className="text-[var(--muted)] leading-relaxed mb-6">
                No themes. No tracks. Just build something,{" "}
                <a
                  href={LINKS.inspiration}
                  className="text-[var(--fg)] underline decoration-[var(--border-strong)] underline-offset-4 hover:decoration-[var(--accent)] transition-colors"
                >
                  find inspiration
                </a>
                , and ship it by midnight.
              </p>
              <a
                href={LINKS.registerBuildNight}
                className="inline-flex items-center gap-2 self-start rounded-full bg-[var(--accent)] text-[var(--accent-fg)] px-5 py-2.5 text-sm font-semibold hover:brightness-110 transition-[filter] focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--bg)]"
              >
                Register now
                <ArrowIcon />
              </a>
            </div>
            <div className="flex-1 order-1 lg:order-2 min-h-[200px] lg:min-h-[280px] rounded-xl bg-[var(--elevated)] border border-[var(--border)] overflow-hidden relative">
              <div className="absolute inset-0 bg-gradient-to-br from-[var(--accent)]/12 via-transparent to-transparent" />
              <div className="absolute inset-6 rounded-lg border border-dashed border-[var(--border-strong)]/40 flex items-center justify-center">
                <div className="text-center px-4">
                  <p className="text-xs uppercase tracking-widest text-[var(--muted)] mb-2">Victoria</p>
                  <p className="text-sm font-medium text-[var(--fg)]/90">Spring build night</p>
                  <p className="text-xs text-[var(--muted)] mt-1">Photo or graphic — add yours</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="card-hover rounded-2xl border border-[var(--border)] bg-[var(--card)] p-8 sm:p-10 shadow-[0_0_0_1px_rgba(255,255,255,0.03)_inset]">
          <div className="flex flex-col lg:flex-row lg:items-stretch gap-8 lg:gap-12">
            <div className="flex-1 min-h-[200px] lg:min-h-[260px] rounded-xl bg-[var(--elevated)] border border-[var(--border)] overflow-hidden relative order-1">
              <div className="absolute inset-0 bg-gradient-to-tl from-amber-500/10 via-transparent to-transparent" />
              <div className="absolute inset-6 rounded-lg border border-dashed border-[var(--border-strong)]/40 flex items-center justify-center">
                <div className="text-center px-4">
                  <p className="text-xs uppercase tracking-widest text-[var(--muted)] mb-2">Popup</p>
                  <p className="text-sm font-medium text-[var(--fg)]/90">Café Cursor Victoria</p>
                  <p className="text-xs text-[var(--muted)] mt-1">Photo or graphic — add yours</p>
                </div>
              </div>
            </div>
            <div className="flex-1 flex flex-col justify-center order-2">
              <p className="text-amber-200/80 text-sm font-semibold tracking-wide uppercase mb-2">Coworking</p>
              <h2 className="text-2xl sm:text-3xl font-semibold tracking-tight mb-4">Café Cursor Victoria.</h2>
              <p className="text-[var(--muted)] leading-relaxed mb-6">
                Coffee and coworking popup. Good vibes. Great builders.
              </p>
              <a
                href={LINKS.cafeRecap}
                className="inline-flex items-center gap-2 self-start rounded-full border border-[var(--border-strong)] px-5 py-2.5 text-sm font-semibold text-[var(--fg)] hover:bg-[var(--elevated)] transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--bg)]"
              >
                See recap
                <ArrowIcon />
              </a>
            </div>
          </div>
        </section>
      </div>

      <footer className="mt-20 pt-10 border-t border-[var(--border)] text-center text-sm text-[var(--muted)]">
        <p>Cursor Victoria · Spring 2026 events</p>
      </footer>
    </div>
  );
}

export default App;
