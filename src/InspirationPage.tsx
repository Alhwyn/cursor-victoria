import { useEffect, useRef, useState, type ReactNode } from "react";
import {
  inspirationIntro,
  inspirationProjects,
  type InspirationProject,
} from "./inspiration";
import { site } from "./content";

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

function spanClass(span: InspirationProject["span"]): string {
  switch (span) {
    case "short":
      return "aspect-[4/3]";
    case "medium":
      return "aspect-[3/4]";
    case "tall":
      return "aspect-[2/3]";
    default: {
      const _exhaustive: never = span;
      return _exhaustive;
    }
  }
}

function ProjectCaption({
  title,
  builder,
}: {
  title: string;
  builder: string;
}) {
  return (
    <figcaption className="mt-2 type-sm text-[var(--fg-secondary)]">
      <span className="text-[var(--fg)]">{title}</span>
      <span className="text-[var(--fg-tertiary)]"> · {builder}</span>
    </figcaption>
  );
}

function ProjectMedia({
  project,
  className = "",
  priority = false,
}: {
  project: InspirationProject;
  className?: string;
  priority?: boolean;
}) {
  const image = (
    <img
      src={project.imageSrc}
      alt={project.imageAlt}
      className={`block h-full w-full object-cover ${className}`.trim()}
      loading={priority ? "eager" : "lazy"}
      decoding="async"
      fetchPriority={priority ? "high" : "auto"}
    />
  );

  if (project.href) {
    return (
      <a
        href={project.href}
        target="_blank"
        rel="noopener noreferrer"
        className="block focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--fg)]"
        aria-label={`${project.title} by ${project.builder}`}
      >
        {image}
      </a>
    );
  }

  return image;
}

/** Horizontal scroll carousel — community-gallery style strip of featured builds. */
function ProjectCarousel({ projects }: { projects: InspirationProject[] }) {
  const trackRef = useRef<HTMLDivElement>(null);
  const [canPrev, setCanPrev] = useState(false);
  const [canNext, setCanNext] = useState(true);

  const updateEdges = () => {
    const el = trackRef.current;
    if (!el) return;
    const max = el.scrollWidth - el.clientWidth;
    setCanPrev(el.scrollLeft > 8);
    setCanNext(el.scrollLeft < max - 8);
  };

  useEffect(() => {
    const el = trackRef.current;
    if (!el) return;
    updateEdges();
    el.addEventListener("scroll", updateEdges, { passive: true });
    window.addEventListener("resize", updateEdges);
    return () => {
      el.removeEventListener("scroll", updateEdges);
      window.removeEventListener("resize", updateEdges);
    };
  }, [projects]);

  const scrollByCard = (direction: -1 | 1) => {
    const el = trackRef.current;
    if (!el) return;
    const card = el.querySelector<HTMLElement>("[data-carousel-card]");
    const amount = card ? card.offsetWidth + 16 : el.clientWidth * 0.7;
    el.scrollBy({ left: direction * amount, behavior: "smooth" });
  };

  return (
    <section
      className="group flex flex-col"
      aria-label="Featured project carousel"
      data-intro="true"
    >
      <div className="mb-4 flex items-end justify-between gap-4 md:mb-6">
        <SectionLabel>Featured builds</SectionLabel>
        <div className="flex items-center gap-2">
          <button
            type="button"
            className="inline-flex h-8 w-8 items-center justify-center border border-[var(--border)] bg-[var(--card)] text-[var(--fg)] transition-opacity disabled:opacity-30"
            aria-label="Previous projects"
            disabled={!canPrev}
            onClick={() => scrollByCard(-1)}
          >
            <span className="rotate-180" aria-hidden>
              <ArrowIcon />
            </span>
          </button>
          <button
            type="button"
            className="inline-flex h-8 w-8 items-center justify-center border border-[var(--border)] bg-[var(--card)] text-[var(--fg)] transition-opacity disabled:opacity-30"
            aria-label="Next projects"
            disabled={!canNext}
            onClick={() => scrollByCard(1)}
          >
            <ArrowIcon />
          </button>
        </div>
      </div>

      <div
        ref={trackRef}
        className="inspiration-carousel flex gap-3 overflow-x-auto pb-2 md:gap-4"
        tabIndex={0}
      >
        {projects.map((project, index) => (
          <figure
            key={project.id}
            data-carousel-card
            className="w-[min(78vw,22rem)] shrink-0 snap-start md:w-[26rem]"
          >
            <div className="relative overflow-hidden bg-[var(--card)]">
              <div className="aspect-[4/3]">
                <ProjectMedia project={project} priority={index < 2} />
              </div>
              <p className="pointer-events-none absolute bottom-3 left-3 type-sm uppercase tracking-[0.04em] text-white drop-shadow-[0_1px_2px_rgb(0_0_0/0.55)]">
                {project.builder}
              </p>
            </div>
            <ProjectCaption title={project.title} builder={project.track} />
            <p className="mt-1 type-sm text-pretty text-[var(--fg-tertiary)]">
              {project.summary}
            </p>
          </figure>
        ))}
      </div>
    </section>
  );
}

/** Masonry columns gallery — matches cursor.com community photo grid. */
function ProjectMasonry({ projects }: { projects: InspirationProject[] }) {
  return (
    <section
      className="mt-16 md:mt-24"
      aria-label="Project gallery"
    >
      <SectionLabel>Gallery</SectionLabel>
      <div className="mt-2 columns-2 gap-2 md:columns-3 lg:mt-4 lg:gap-4">
        {projects.map(project => (
          <figure
            key={project.id}
            className="mb-2 break-inside-avoid md:mb-4"
          >
            <div className={`overflow-hidden bg-[var(--card)] ${spanClass(project.span)}`}>
              <ProjectMedia project={project} />
            </div>
            <ProjectCaption title={project.title} builder={project.builder} />
          </figure>
        ))}
      </div>
    </section>
  );
}

export function InspirationPage() {
  const featured = inspirationProjects.filter(p => p.featured);
  const gallery = inspirationProjects;

  return (
    <main id="main" className="bg-[var(--bg)] pb-32 md:pb-48">
      <section className="page-shell scroll-mt-8 pt-10 md:pt-16">
        <p className="type-sm text-[var(--fg-tertiary)]">{inspirationIntro.label}</p>
        <h1 className="mt-3 max-w-2xl font-display text-[1.75rem] leading-tight text-[var(--fg)] md:text-[2.25rem]">
          {inspirationIntro.title}
        </h1>
        <p className="mt-4 max-w-xl type-sm text-pretty text-[var(--fg-secondary)]">
          {inspirationIntro.body}
        </p>
        <div className="mt-6">
          <a
            href={site.rsvpUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center gap-2 bg-[var(--button-bg)] px-4 py-1.5 type-sm text-[var(--button-fg)] transition-colors hover:bg-[#2a2820]"
          >
            Register on Luma
            <ArrowIcon />
          </a>
        </div>
      </section>

      <section className="page-shell mt-12 md:mt-16">
        <ProjectCarousel projects={featured} />
        <ProjectMasonry projects={gallery} />
      </section>
    </main>
  );
}
