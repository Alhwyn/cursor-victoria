import {
  type ComponentPropsWithoutRef,
  type ReactNode,
  useEffect,
  useRef,
} from "react";
import { about, faq, perks, schedule, site, tracks, who } from "./content";
import { judges, judgesHeading } from "./judges";
import { renderSinePortrait } from "./sinePortrait";
import { sponsors, sponsorsHeading } from "./sponsors";
import cursorLockup from "./assets/cursor-lockup.png";
import parliamentDome from "./assets/parliament-dome-sketch.png";
import "./index.css";

/** Cursor wordmark lockup — masked so it inherits currentColor. */
function CursorLogo({ className = "" }: { className?: string }) {
  return (
    <span
      className={`inline-block bg-current ${className}`.trim()}
      style={{
        aspectRatio: "1024 / 254",
        WebkitMaskImage: `url(${cursorLockup})`,
        maskImage: `url(${cursorLockup})`,
        WebkitMaskSize: "contain",
        maskSize: "contain",
        WebkitMaskRepeat: "no-repeat",
        maskRepeat: "no-repeat",
        WebkitMaskPosition: "center",
        maskPosition: "center",
      }}
      aria-hidden
    />
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

/** Same page-shell width as hero / sponsors — equal left & right gutters. */
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
    <section id={id} className={`page-shell ${className}`.trim()} {...props}>
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

function ChevronLeftIcon() {
  return (
    <svg
      className="h-4 w-4"
      viewBox="0 0 16 16"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden
    >
      <path
        d="M10 3L5 8l5 5"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function ChevronRightIcon() {
  return (
    <svg
      className="h-4 w-4"
      viewBox="0 0 16 16"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden
    >
      <path
        d="M6 3l5 5-5 5"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function JudgePortrait({
  src,
  background,
  foreground,
  alt,
}: {
  src: string;
  background: string;
  foreground: string;
  alt: string;
}) {
  const frameRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const frame = frameRef.current;
    const canvas = canvasRef.current;
    if (!frame || !canvas) return;

    const img = new Image();
    let cancelled = false;
    let frameId = 0;

    const paint = () => {
      if (cancelled || !img.naturalWidth) return;
      renderSinePortrait(canvas, img, { background, foreground });
    };

    img.onload = () => {
      if (cancelled) return;
      paint();
    };
    img.src = src;

    const observer = new ResizeObserver(() => {
      cancelAnimationFrame(frameId);
      frameId = requestAnimationFrame(paint);
    });
    observer.observe(frame);

    return () => {
      cancelled = true;
      cancelAnimationFrame(frameId);
      observer.disconnect();
    };
  }, [src, background, foreground]);

  return (
    <div
      ref={frameRef}
      className="judge-portrait"
      style={{ background }}
    >
      <canvas ref={canvasRef} aria-hidden />
      <span className="sr-only">{alt}</span>
    </div>
  );
}

function JudgesSection() {
  const trackRef = useRef<HTMLUListElement>(null);

  const scrollByCard = (direction: -1 | 1) => {
    const track = trackRef.current;
    if (!track) return;
    const card = track.querySelector("li");
    const gap = Number.parseFloat(getComputedStyle(track).columnGap || "16");
    const amount = (card?.getBoundingClientRect().width ?? 240) + gap;
    track.scrollBy({ left: amount * direction, behavior: "smooth" });
  };

  return (
    <PageSection id="judges" className="scroll-mt-8 mt-32 md:mt-64">
      <div className="mb-8 flex items-center justify-between gap-4 md:mb-10">
        <h2 className="text-[1.05rem] font-medium tracking-tight text-[var(--fg)]">
          {judgesHeading}
        </h2>
        <div className="flex items-center gap-1">
          <button
            type="button"
            className="judges-nav-btn"
            aria-label="Previous judges"
            onClick={() => scrollByCard(-1)}
          >
            <ChevronLeftIcon />
          </button>
          <button
            type="button"
            className="judges-nav-btn"
            aria-label="Next judges"
            onClick={() => scrollByCard(1)}
          >
            <ChevronRightIcon />
          </button>
        </div>
      </div>
      <ul ref={trackRef} className="judges-track">
        {judges.map(judge => (
          <li key={judge.slug} className="judge-card">
            <a
              href={judge.href}
              target="_blank"
              rel="noopener noreferrer"
              className="block transition-opacity hover:opacity-80"
            >
              <JudgePortrait
                src={judge.photo}
                background={judge.background}
                foreground={judge.foreground}
                alt={`${judge.name}, ${judge.org}`}
              />
              <p className="type-sm mt-3 text-[var(--fg)]">
                <span className="font-medium">{judge.name}</span>{" "}
                <span className="text-[var(--fg-secondary)]">{judge.org}</span>
              </p>
            </a>
          </li>
        ))}
      </ul>
    </PageSection>
  );
}

function SiteHeader() {
  return (
    <header className="header-shell">
      <div className="page-shell flex h-[var(--header-h)] items-center justify-between">
        <a
          href="#top"
          className="inline-flex items-center text-[var(--fg)] transition-opacity hover:opacity-70"
          aria-label="Cursor Codechella home"
        >
          <CursorLogo className="h-auto w-[68px] md:w-[82px]" />
        </a>

        <nav
          className="hidden items-center gap-7 type-sm text-[var(--fg-secondary)] md:flex"
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
          <a href="#judges" className="transition-colors hover:text-[var(--fg)]">
            Judges
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

      <main id="main" className="bg-[var(--bg)] pb-32 md:pb-48">
        <section className="grid h-[80svh] place-items-center">
          <div className="page-shell flex flex-col items-center">
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

        <section
          id="logo-garden"
          className="logo-garden-shell page-shell scroll-mt-8 pb-[2.1rem] pt-0"
          aria-label="Sponsors"
        >
          <div className="stack text-center">
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
                    data-sponsor={sponsor.slug}
                    aria-label={sponsor.name}
                  >
                    <img
                      src={sponsor.src}
                      alt={sponsor.name}
                      loading="lazy"
                      decoding="async"
                    />
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </section>

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
          <div className="grid items-stretch gap-x-6 gap-y-6 border-t border-[rgb(20_18_11/0.1)] pt-6 md:grid-cols-2 md:pt-10 lg:grid-cols-4 lg:gap-x-12">
            {tracks.map(track => (
              <article key={track.name} className="flex h-full flex-col">
                <h2 className="type-sm font-medium text-[var(--accent)]">
                  {track.name}
                </h2>
                <p className="type-sm mt-3 text-[var(--fg-secondary)]">
                  {track.detail}
                </p>
                <p className="type-sm mt-auto pt-5 text-[var(--fg)]">
                  {track.prizes}
                </p>
              </article>
            ))}
          </div>
        </PageSection>

        <JudgesSection />

        <PageSection className="mt-32 md:mt-64">
          <div className="grid gap-16 border-t border-[var(--border)] pt-10 md:grid-cols-2 md:gap-x-12 md:gap-y-0">
            <div>
              <SectionLabel>Who should come</SectionLabel>
              <ul className="space-y-3">
                {who.map(line => (
                  <li key={line} className="type-sm text-[var(--fg)]">
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
