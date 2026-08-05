import { type ComponentPropsWithoutRef, type ReactNode } from "react";
import { about, faq, perks, schedule, site, tracks, who } from "./content";
import { sponsors, sponsorsHeading } from "./sponsors";
import parliamentDome from "./assets/parliament-dome-sketch.png";
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

/** Parliament dome — spans the same width as the rest of the page shell. */
function HeroStage() {
  return (
    <div className="hero-stage w-full">
      <img
        src={parliamentDome}
        alt="Pencil sketch of the Victoria parliament buildings"
        className="mx-auto h-auto w-full max-h-[min(52vw,22rem)] object-contain sm:max-h-[28rem] md:max-h-[34rem]"
        width={998}
        height={582}
        decoding="async"
        fetchPriority="high"
      />
    </div>
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
    <p className="type-sm mb-4 text-[var(--fg-tertiary)] md:mb-6">{children}</p>
  );
}

/** Compile content column — same max width as keynote/about on cursor.com/compile */
function PageSection({
  id,
  className = "",
  children,
  ...props
}: {
  id?: string;
  className?: string;
  children: ReactNode;
} & Omit<ComponentPropsWithoutRef<"section">, "id" | "className" | "children">) {
  return (
    <section id={id} className={`compile-shell ${className}`.trim()} {...props}>
      {children}
    </section>
  );
}

function AboutCta() {
  return (
    <a
      href={site.rsvpUrl}
      target="_blank"
      rel="noopener noreferrer"
      className="inline-flex w-full items-center justify-center gap-2 bg-[var(--button-bg)] px-4 py-1.5 type-sm text-[var(--button-fg)] transition-colors hover:bg-[#2a2820]"
    >
      Register on Luma
      <ArrowIcon />
    </a>
  );
}

function SiteHeader() {
  return (
    <header className="header-shell">
      <div className="compile-shell relative flex h-[var(--header-h)] items-center justify-between">
        <a
          href="#top"
          className="inline-flex items-center text-[var(--fg)] transition-opacity hover:opacity-70"
          aria-label="Cursor Codechella home"
        >
          <CursorLogo className="h-auto w-[68px] md:w-[82px]" />
        </a>

        <nav
          className="absolute left-1/2 hidden -translate-x-1/2 items-center gap-7 type-sm text-[var(--fg-secondary)] md:flex"
          aria-label="Primary"
        >
          <a href="#logo-garden" className="transition-colors hover:text-[var(--fg)]">
            Sponsors
          </a>
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
      </div>
    </header>
  );
}

export function App() {
  return (
    <div id="top" className="site-grain min-h-screen bg-[var(--bg)] text-[var(--fg)]">
      <SiteHeader />

      <main id="main" className="bg-[#EDECE8] pb-32 md:pb-48">
        {/* Hero — same structure as cursor.com/compile */}
        <section className="grid h-[80svh] place-items-center">
          <div className="compile-shell flex flex-col items-center">
            <h1 className="sr-only">Codechella</h1>
            <HeroStage />
            <div className="type-sm animate-fade mt-12 flex w-full items-baseline justify-between gap-x-4 gap-y-2 text-[var(--fg)] max-md:flex-wrap">
              <p>An event by Cursor Community</p>
              <p className="text-[var(--fg-secondary)]">
                {site.dateShort} · {site.location}
              </p>
            </div>
          </div>
        </section>

        {/* Logo garden — compile-shell width (same as hero/about) + stack/text-center */}
        <section
          id="logo-garden"
          className="compile-shell scroll-mt-8 pb-[2.1rem] pt-0"
          aria-label="Sponsors"
        >
          <div className="stack container text-center flex w-full flex-col items-center">
            <h2 className="type-sm mb-[1.4rem] font-normal text-[var(--fg)]">
              {sponsorsHeading}
            </h2>
            <ul className="logo-garden">
              {sponsors.map(sponsor => (
                <li key={sponsor.name}>
                  <a
                    href={sponsor.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="logo-garden-card"
                    aria-label={sponsor.name}
                  >
                    <img
                      src={sponsor.src}
                      alt={sponsor.name}
                      loading="lazy"
                      decoding="async"
                      style={
                        "logoScale" in sponsor
                          ? { transform: `scale(${sponsor.logoScale})` }
                          : undefined
                      }
                    />
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </section>

        {/* About — 3 columns: lead | body | CTA (md+) */}
        <PageSection id="about" className="scroll-mt-8 mt-16 md:mt-24">
          <div className="grid items-start gap-x-6 gap-y-6 md:grid-cols-3 md:gap-x-12">
            <div className="border-t border-[rgb(20_18_11/0.1)] pt-6 md:pt-10">
              <p className="type-sm text-pretty text-[var(--fg)]">
                {about.lead}
              </p>
            </div>
            <div className="grid gap-y-4 border-t border-[rgb(20_18_11/0.1)] pt-6 md:pt-10">
              {about.body.map(paragraph => (
                <p
                  key={paragraph}
                  className="type-sm text-pretty text-[var(--fg-secondary)]"
                >
                  {paragraph}
                </p>
              ))}
            </div>
            <div className="border-t border-[rgb(20_18_11/0.1)] pt-6 md:pt-10">
              <AboutCta />
            </div>
          </div>
        </PageSection>

        <PageSection id="schedule" className="scroll-mt-8 mt-32 md:mt-64">
          <SectionLabel>Schedule</SectionLabel>
          <ul className="border-t border-[var(--border)]">
            {schedule.map(item => (
              <li
                key={`${item.time}-${item.label}`}
                className="type-sm grid grid-cols-[9.5rem_1fr] items-baseline gap-4 border-b border-[var(--border)] py-4 md:grid-cols-[11.5rem_1fr]"
              >
                <span className="tabular-nums text-[var(--fg-tertiary)]">
                  {item.time}
                </span>
                <span className="text-[var(--fg)]">{item.label}</span>
              </li>
            ))}
          </ul>
        </PageSection>

        <PageSection id="tracks" className="scroll-mt-8 mt-32 md:mt-64">
          <SectionLabel>Prize tracks</SectionLabel>
          <div className="grid items-start gap-x-6 gap-y-6 md:grid-cols-3 lg:gap-x-12">
            {tracks.map(track => (
              <article
                key={track.name}
                className="md:border-t md:border-[rgb(20_18_11/0.1)] md:pt-10"
              >
                <h2 className="type-sm font-medium text-[var(--fg)]">
                  {track.name}
                </h2>
                <p className="type-sm mt-3 text-[var(--fg-secondary)]">
                  {track.detail}
                </p>
                <p className="type-sm mt-5 text-[var(--fg)]">{track.prizes}</p>
              </article>
            ))}
          </div>
        </PageSection>

        <PageSection className="mt-32 md:mt-64">
          <div className="grid gap-16 border-t border-[var(--border)] pt-10 md:grid-cols-2 md:gap-x-12 md:gap-y-0">
            <div>
              <SectionLabel>Who should come</SectionLabel>
              <ul className="space-y-3">
                {who.map(line => (
                  <li
                    key={line}
                    className="type-sm text-[var(--fg)]"
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
                    className="type-sm mb-3 break-inside-avoid text-[var(--fg)]"
                  >
                    {perk}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </PageSection>

        <PageSection id="faq" className="scroll-mt-8 mt-32 md:mt-64">
          <SectionLabel>FAQ</SectionLabel>
          <div className="border-t border-[var(--border)]">
            {faq.map(item => (
              <div
                key={item.q}
                className="grid gap-2 border-b border-[var(--border)] py-6 md:grid-cols-[minmax(10rem,16rem)_1fr] md:gap-10 md:py-7"
              >
                <h3 className="type-sm font-medium text-[var(--fg)]">
                  {item.q}
                </h3>
                <p className="type-sm text-[var(--fg-secondary)]">
                  {item.a}
                </p>
              </div>
            ))}
          </div>
        </PageSection>
      </main>
    </div>
  );
}
