import { useEffect, useRef } from "react";
import { judges, judgesHeading, type Judge } from "./judges";
import { DEFAULT_EFFECT_SETTINGS, renderSinePortrait } from "./sinePortrait";

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

function JudgePortrait({ judge }: { judge: Judge }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const img = new Image();
    let cancelled = false;

    img.onload = () => {
      if (cancelled || !img.naturalWidth) return;
      renderSinePortrait(
        canvas,
        img,
        {
          ...DEFAULT_EFFECT_SETTINGS,
          foregroundColor: judge.foreground,
          backgroundColor: judge.background,
        },
        judge.photoFit,
      );
    };
    img.src = judge.photo;

    return () => {
      cancelled = true;
    };
  }, [judge.photo, judge.background, judge.foreground, judge.photoFit]);

  return (
    <div className="judge-portrait" style={{ background: judge.background }}>
      <canvas ref={canvasRef} aria-hidden />
    </div>
  );
}

export function JudgesSection() {
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
    <section
      id="judges"
      className="page-shell scroll-mt-8 mt-32 md:mt-64"
      aria-labelledby="judges-heading"
    >
      <div className="mb-2 flex items-center justify-between gap-4">
        <h2
          id="judges-heading"
          className="text-[1.15rem] font-medium tracking-tight text-[var(--fg)] md:text-[1.25rem]"
        >
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
              <JudgePortrait judge={judge} />
              <p className="type-sm mt-3 text-[var(--fg)]">
                <span className="font-medium">{judge.name}</span>{" "}
                <span className="text-[var(--fg-secondary)]">{judge.role}</span>
              </p>
            </a>
          </li>
        ))}
      </ul>
    </section>
  );
}
