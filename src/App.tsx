import { useEffect, useState, type ReactNode } from "react";
import { about, faq, perks, schedule, site, tracks, who } from "./content";
import alhwynAvatar from "./assets/alhwyn-avatar.png";
import "./index.css";

function CursorLogo({ className = "" }: { className?: string }) {
  return (
    <svg
      fill="none"
      className={className}
      viewBox="0 0 2193 545"
      xmlns="http://www.w3.org/2000/svg"
      overflow="visible"
      aria-hidden
    >
      <g fill="currentColor">
        <path d="m466.383 137.073-206.469-119.2034c-6.63-3.8287-14.811-3.8287-21.441 0l-206.4586 119.2034c-5.5734 3.218-9.0144 9.169-9.0144 15.615v240.375c0 6.436 3.441 12.397 9.0144 15.615l206.4686 119.203c6.63 3.829 14.811 3.829 21.441 0l206.468-119.203c5.574-3.218 9.015-9.17 9.015-15.615v-240.375c0-6.436-3.441-12.397-9.015-15.615zm-12.969 25.25-199.316 345.223c-1.347 2.326-4.904 1.376-4.904-1.319v-226.048c0-4.517-2.414-8.695-6.33-10.963l-195.7577-113.019c-2.3263-1.347-1.3764-4.905 1.3182-4.905h398.6305c5.661 0 9.199 6.136 6.368 11.041h-.009z" />
        <path d="m723.253 148.84h87.856v48.397h-84.881c-45.789 0-81.527 26.432-81.527 82.273s35.738 82.273 81.527 82.273h84.881v48.397h-91.578c-76.691 0-131.039-45.043-131.039-130.66 0-85.618 58.07-130.661 134.761-130.661z" />
        <path d="m855.781 148.84h54.348v159.7c0 39.828 18.242 58.448 61.056 58.448 42.815 0 61.055-18.61 61.055-58.448v-159.7h54.35v170.866c0 58.071-36.85 94.933-115.405 94.933-78.551 0-115.404-37.231-115.404-95.301z" />
        <path d="m1370.62 222.913c0 29.04-16.75 51.372-39.09 61.056v.746c23.45 3.354 35.37 20.103 35.73 42.814l1.12 82.641h-54.35l-1.11-73.705c-.37-16.381-10.06-26.432-29.41-26.432h-90.47v100.137h-54.34v-261.33h150.02c49.15 0 81.9 24.94 81.9 74.083zm-54.73 7.454c0-22.333-11.91-34.623-34.24-34.623h-88.61v69.236h89.34c20.47 0 33.51-12.281 33.51-34.623z" />
        <path d="m1576.09 333.85c0-18.61-11.91-26.432-29.77-27.915l-60.31-5.583c-52.12-4.837-79.3-25.318-79.3-74.83 0-49.511 33.51-76.69 81.53-76.69h133.27v46.904h-129.55c-18.61 0-30.52 9.683-30.52 28.294 0 18.61 12.28 27.547 30.9 29.04l61.42 5.214c46.54 4.091 77.06 25.318 77.06 75.198s-32.38 76.69-78.17 76.69h-139.23v-46.904h134.01c17.5 0 28.66-11.912 28.66-29.408z" />
        <path d="m1789.79 144.373c81.89 0 133.65 52.487 133.65 134.761 0 82.273-53.98 135.506-135.88 135.506s-133.65-53.233-133.65-135.506c0-82.274 53.98-134.761 135.88-134.761zm77.43 135.129c0-55.095-32.02-87.479-78.56-87.479-46.53 0-78.55 32.384-78.55 87.479 0 55.094 32.02 87.478 78.55 87.478 46.54 0 78.56-32.384 78.56-87.478z" />
        <path d="m2192.95 222.913c0 29.04-16.75 51.372-39.1 61.056v.746c23.46 3.354 35.37 20.103 35.74 42.814l1.12 82.641h-54.35l-1.12-73.705c-.36-16.381-10.05-26.432-29.4-26.432h-90.47v100.137h-54.35v-261.33h150.03c49.14 0 81.9 24.94 81.9 74.083zm-54.73 7.454c0-22.333-11.91-34.623-34.25-34.623h-88.6v69.236h89.34c20.47 0 33.51-12.281 33.51-34.623z" />
      </g>
    </svg>
  );
}

/** Outlined display wordmark — Compile-inspired letter colors. */
function CodechellaWordmark() {
  const letters = [
    { char: "C", color: "#F76D18", delay: "0s" },
    { char: "O", color: "#2C9F28", delay: "0.05s" },
    { char: "D", color: "#A88D02", delay: "0.1s" },
    { char: "E", color: "#8C89E7", delay: "0.15s" },
    { char: "C", color: "#14120b", delay: "0.2s" },
    { char: "H", color: "#916031", delay: "0.25s" },
    { char: "E", color: "#2268FF", delay: "0.3s" },
    { char: "L", color: "#F76D18", delay: "0.35s" },
    { char: "L", color: "#2C9F28", delay: "0.4s" },
    { char: "A", color: "#8C89E7", delay: "0.45s" },
  ] as const;

  return (
    <h1
      className="font-display flex flex-wrap items-center justify-center gap-x-[0.035em] text-[clamp(2.6rem,10.5vw,7.25rem)] leading-none tracking-[-0.045em]"
      aria-label="Codechella"
    >
      {letters.map((letter, i) => (
        <span
          key={`${letter.char}-${i}`}
          className="wordmark-letter inline-block"
          style={{
            color: letter.color,
            animation: `rise-in 0.85s var(--ease-out) ${letter.delay} both`,
          }}
        >
          {letter.char}
        </span>
      ))}
    </h1>
  );
}

function ArrowIcon() {
  return (
    <svg
      className="h-[1em] w-[1em] shrink-0"
      viewBox="0 0 16 16"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden
    >
      <path
        d="M4 12L12 4M12 4H6M12 4V10"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function SectionLabel({ children }: { children: ReactNode }) {
  return (
    <p className="mb-4 text-sm text-[var(--fg-tertiary)] md:mb-6">{children}</p>
  );
}

function SiteHeader() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`header-shell fixed top-0 right-0 left-0 z-50 ${
        scrolled ? "is-scrolled" : ""
      }`}
    >
      <div className="mx-auto flex h-[var(--header-h)] w-full max-w-7xl items-center justify-between px-6 md:px-10">
        <a
          href="#top"
          className="inline-flex items-center text-[var(--fg)] transition-opacity hover:opacity-70"
          aria-label="Cursor Codechella home"
        >
          <CursorLogo className="h-auto w-[68px] md:w-[82px]" />
        </a>

        <nav
          className="absolute left-1/2 hidden -translate-x-1/2 items-center gap-7 text-sm text-[var(--fg-secondary)] md:flex"
          aria-label="Primary"
        >
          <a href="#schedule" className="transition-colors hover:text-[var(--fg)]">
            Schedule
          </a>
          <a href="#tracks" className="transition-colors hover:text-[var(--fg)]">
            Tracks
          </a>
          <a href="#faq" className="transition-colors hover:text-[var(--fg)]">
            FAQ
          </a>
        </nav>

        <a
          href={site.rsvpUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1.5 rounded-sm bg-[var(--button-bg)] px-3.5 py-1.5 text-sm text-[var(--button-fg)] transition-colors hover:bg-[#2a2820]"
        >
          RSVP
          <ArrowIcon />
        </a>
      </div>
    </header>
  );
}

export function App() {
  return (
    <div id="top" className="site-grain min-h-screen bg-[var(--bg)] text-[var(--fg)]">
      <SiteHeader />

      <main className="pt-[var(--header-h)]">
        {/* Hero — brand + wordmark + meta only */}
        <section className="mx-auto grid min-h-[calc(100svh-var(--header-h))] w-full max-w-7xl place-items-center px-6 pb-20 md:px-10">
          <div className="flex w-full flex-col items-center">
            <CodechellaWordmark />
            <div className="animate-rise-delay-2 mt-10 flex w-full max-w-3xl items-baseline justify-between gap-x-4 gap-y-2 text-sm max-sm:flex-col max-sm:items-center max-sm:text-center md:mt-14 md:text-[15px]">
              <p className="text-[var(--fg)]">An event by Cursor</p>
              <p className="text-[var(--fg-secondary)]">
                {site.dateShort} · {site.location}
              </p>
            </div>
          </div>
        </section>

        {/* Intro */}
        <section
          id="about"
          className="mx-auto max-w-7xl scroll-mt-24 px-6 md:px-10"
        >
          <div className="grid items-start gap-x-12 gap-y-10 border-t border-[var(--border)] pt-10 md:grid-cols-2 lg:grid-cols-3 lg:gap-x-16">
            <div>
              <p className="text-pretty text-lg leading-snug text-[var(--fg)] md:text-xl">
                {about.lead}
              </p>
            </div>
            <div className="space-y-4 text-sm leading-relaxed text-[var(--fg-secondary)] md:text-[15px]">
              {about.body.map(paragraph => (
                <p key={paragraph} className="text-pretty">
                  {paragraph}
                </p>
              ))}
            </div>
            <div className="border-t border-[var(--border)] pt-8 md:col-span-2 md:border-t-0 md:pt-0 lg:col-span-1">
              <p className="mb-4 text-sm text-[var(--fg-secondary)]">
                Free to join. Space limited to {site.capacity}.
              </p>
              <a
                href={site.rsvpUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex w-full items-center justify-center gap-2 rounded-sm bg-[var(--button-bg)] px-4 py-2.5 text-sm text-[var(--button-fg)] transition-colors hover:bg-[#2a2820]"
              >
                Register on Luma
                <ArrowIcon />
              </a>
              <p className="mt-3 text-xs text-[var(--fg-tertiary)]">
                Exact venue shared after approval.
              </p>
            </div>
          </div>
        </section>

        {/* Schedule */}
        <section
          id="schedule"
          className="mx-auto mt-28 max-w-7xl scroll-mt-24 px-6 md:mt-40 md:px-10"
        >
          <SectionLabel>Schedule</SectionLabel>
          <ul className="border-t border-[var(--border)]">
            {schedule.map(item => (
              <li
                key={item.time}
                className="grid grid-cols-[7rem_1fr] items-baseline gap-4 border-b border-[var(--border)] py-4 text-sm md:grid-cols-[9rem_1fr] md:text-[15px]"
              >
                <span className="tabular-nums text-[var(--fg-tertiary)]">
                  {item.time}
                </span>
                <span className="text-[var(--fg)]">{item.label}</span>
              </li>
            ))}
          </ul>
        </section>

        {/* Tracks */}
        <section
          id="tracks"
          className="mx-auto mt-28 max-w-7xl scroll-mt-24 px-6 md:mt-40 md:px-10"
        >
          <SectionLabel>Prize tracks</SectionLabel>
          <div className="grid gap-0 border-t border-[var(--border)] md:grid-cols-3">
            {tracks.map((track, index) => (
              <article
                key={track.name}
                className={`border-b border-[var(--border)] py-8 md:border-b-0 md:py-10 ${
                  index === 0
                    ? "md:pr-8"
                    : index === tracks.length - 1
                      ? "md:border-l md:pl-8"
                      : "md:border-l md:px-8"
                }`}
              >
                <h2 className="text-base font-medium tracking-tight text-[var(--fg)] md:text-lg">
                  {track.name}
                </h2>
                <p className="mt-3 text-sm leading-relaxed text-[var(--fg-secondary)]">
                  {track.detail}
                </p>
                <p className="mt-5 text-sm text-[var(--fg)]">{track.prizes}</p>
              </article>
            ))}
          </div>
        </section>

        {/* Who + Perks */}
        <section className="mx-auto mt-28 max-w-7xl px-6 md:mt-40 md:px-10">
          <div className="grid gap-16 border-t border-[var(--border)] pt-10 md:grid-cols-2 md:gap-20">
            <div>
              <SectionLabel>Who should come</SectionLabel>
              <ul className="space-y-3">
                {who.map(line => (
                  <li
                    key={line}
                    className="text-sm leading-relaxed text-[var(--fg)] md:text-[15px]"
                  >
                    {line}
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <SectionLabel>What you get</SectionLabel>
              <ul className="columns-1 gap-x-10 sm:columns-2">
                {perks.map(perk => (
                  <li
                    key={perk}
                    className="mb-3 break-inside-avoid text-sm leading-relaxed text-[var(--fg)] md:text-[15px]"
                  >
                    {perk}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>

        {/* FAQ */}
        <section
          id="faq"
          className="mx-auto mt-28 max-w-7xl scroll-mt-24 px-6 md:mt-40 md:px-10"
        >
          <SectionLabel>FAQ</SectionLabel>
          <div className="border-t border-[var(--border)]">
            {faq.map(item => (
              <div
                key={item.q}
                className="grid gap-2 border-b border-[var(--border)] py-6 md:grid-cols-[minmax(10rem,16rem)_1fr] md:gap-10 md:py-7"
              >
                <h3 className="text-sm font-medium text-[var(--fg)] md:text-[15px]">
                  {item.q}
                </h3>
                <p className="text-sm leading-relaxed text-[var(--fg-secondary)] md:text-[15px]">
                  {item.a}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* Closing CTA */}
        <section className="mx-auto mt-28 max-w-7xl px-6 pb-8 md:mt-40 md:px-10">
          <div className="border-t border-[var(--border)] pt-16 text-center md:pt-24">
            <p className="font-display animate-rise text-3xl tracking-tight text-[var(--fg)] md:text-5xl">
              Ship something real.
            </p>
            <p className="mx-auto mt-4 max-w-md text-sm text-[var(--fg-secondary)] md:text-[15px]">
              {site.date} · {site.location}. Powered by{" "}
              <a
                href={site.communityUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-[var(--fg)] underline decoration-[var(--border)] underline-offset-4 transition-colors hover:decoration-[var(--fg-secondary)]"
              >
                Tenfold
              </a>
              .
            </p>
            <a
              href={site.rsvpUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-8 inline-flex items-center gap-2 rounded-sm bg-[var(--button-bg)] px-5 py-2.5 text-sm text-[var(--button-fg)] transition-colors hover:bg-[#2a2820]"
            >
              RSVP for Codechella
              <ArrowIcon />
            </a>
          </div>
        </section>
      </main>

      <footer className="mx-auto mt-20 flex max-w-7xl flex-col items-center gap-6 px-6 pb-12 md:px-10">
        <CursorLogo className="h-auto w-[56px] text-[var(--fg)] opacity-70" />
        <div className="flex items-center justify-center gap-2.5 text-sm text-[var(--fg-tertiary)]">
          <span>
            built by{" "}
            <a
              href={site.footer.builtByUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-[var(--fg-secondary)] underline decoration-[var(--border)] underline-offset-2 transition-colors hover:text-[var(--fg)]"
            >
              {site.footer.builtBy}
            </a>
          </span>
          <img
            src={alhwynAvatar}
            alt=""
            width={28}
            height={28}
            className="h-7 w-7 shrink-0 rounded-full object-cover ring-1 ring-[var(--border)]"
            loading="lazy"
            decoding="async"
          />
        </div>
      </footer>
    </div>
  );
}
