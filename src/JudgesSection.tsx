import { useRef } from "react";
import { judges, judgesHeading } from "./judges";

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

export function JudgesSection() {
  const trackRef = useRef<HTMLDivElement>(null);

  const scrollByCard = (direction: -1 | 1) => {
    const track = trackRef.current;
    if (!track) return;
    const card = track.querySelector("[data-judge-card]");
    const gap = 16;
    const amount = (card?.getBoundingClientRect().width ?? 240) + gap;
    track.scrollBy({ left: amount * direction, behavior: "smooth" });
  };

  return (
    <section
      id="judges"
      className="page-shell scroll-mt-8 mt-32 md:mt-64"
      aria-labelledby="judges-heading"
    >
      <div className="flex items-center justify-between gap-4">
        <h2 id="judges-heading" className="type-md-sm leading-8 text-[var(--fg)]">
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

      <div
        ref={trackRef}
        className="no-scrollbar mt-2 snap-x snap-mandatory overflow-x-auto"
      >
        <div className="flex w-max gap-4">
          {judges.map(judge => (
            <div key={judge.slug} data-judge-card className="snap-start">
              <a
                href={judge.href}
                target="_blank"
                rel="noopener noreferrer"
                className="flex w-[min(60vw,400px)] shrink-0 flex-col gap-2 sm:w-[min(40vw,320px)]"
              >
                <div className="relative aspect-[3/4] w-full overflow-hidden" style={{ background: judge.background }}>
                  <img
                    src={judge.photo}
                    alt=""
                    className="absolute inset-0 h-full w-full object-cover"
                    width={900}
                    height={1200}
                  />
                </div>
                <div className="type-sm flex items-baseline gap-1">
                  <p className="font-medium text-[var(--fg)]">{judge.name}</p>
                  <p className="tracking-tight text-[var(--fg-secondary)]">{judge.role}</p>
                </div>
              </a>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
