import { useRef } from "react";
import { judges, judgesHeading } from "./judges";

function ArrowLeftIcon() {
  return (
    <svg
      className="h-3.5 w-3.5"
      viewBox="0 0 16 16"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden
    >
      <path
        d="M10 3.5 5.5 8 10 12.5"
        stroke="currentColor"
        strokeWidth="1.25"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function ArrowRightIcon() {
  return (
    <svg
      className="h-3.5 w-3.5"
      viewBox="0 0 16 16"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden
    >
      <path
        d="M6 3.5 10.5 8 6 12.5"
        stroke="currentColor"
        strokeWidth="1.25"
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
    const styles = getComputedStyle(track);
    const gap = Number.parseFloat(styles.columnGap || styles.gap || "16");
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
        <div className="flex items-center">
          <button
            type="button"
            className="judges-nav-btn"
            aria-label="Previous judges"
            onClick={() => scrollByCard(-1)}
          >
            <ArrowLeftIcon />
          </button>
          <button
            type="button"
            className="judges-nav-btn"
            aria-label="Next judges"
            onClick={() => scrollByCard(1)}
          >
            <ArrowRightIcon />
          </button>
        </div>
      </div>

      <div ref={trackRef} className="judges-track no-scrollbar mt-2">
        {judges.map(judge => (
          <a
            key={judge.slug}
            data-judge-card
            href={judge.href}
            target="_blank"
            rel="noopener noreferrer"
            className="flex min-w-0 snap-start flex-col gap-2"
          >
            <div
              className="relative aspect-[3/4] w-full overflow-hidden"
              style={{ background: judge.background }}
            >
              <img
                src={judge.photo}
                alt=""
                className="absolute inset-0 h-full w-full object-cover"
                width={900}
                height={1200}
              />
            </div>
            <p className="type-sm">
              <span className="font-medium text-[var(--fg)]">{judge.name}</span>{" "}
              <span className="text-[var(--fg-secondary)]">{judge.role}</span>
            </p>
          </a>
        ))}
      </div>
    </section>
  );
}
