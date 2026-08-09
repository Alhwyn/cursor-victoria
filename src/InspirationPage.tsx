import { useEffect, useRef, useState, type ReactNode } from "react";
import {
  boardIntro,
  communityGalleryItems,
  communityIntro,
  inspirationBoardItems,
  type CommunityGalleryItem,
  type InspirationBoardItem,
} from "./inspiration";
import { site } from "./content";

function XIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
    </svg>
  );
}

function builderInitials(name: string): string {
  const parts = name.trim().split(/\s+/).filter(Boolean);
  if (parts.length === 0) return "?";
  if (parts.length === 1) {
    return (parts[0]?.slice(0, 2) ?? "?").toUpperCase();
  }
  const first = parts[0]?.[0] ?? "";
  const last = parts[parts.length - 1]?.[0] ?? "";
  return `${first}${last}`.toUpperCase();
}

function BuilderAvatar({
  builder,
  avatarSrc,
}: {
  builder: string;
  avatarSrc?: string;
}) {
  if (avatarSrc) {
    return (
      <img
        src={avatarSrc}
        alt=""
        className="h-7 w-7 shrink-0 rounded-full object-cover bg-[var(--border)]"
        loading="lazy"
        decoding="async"
      />
    );
  }

  return (
    <span
      className="inline-flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-[var(--border)] type-sm font-medium text-[var(--fg-secondary)]"
      aria-hidden
    >
      {builderInitials(builder)}
    </span>
  );
}

function GalleryFigure({
  item,
  priority = false,
}: {
  item: CommunityGalleryItem;
  priority?: boolean;
}) {
  return (
    <figure className="group/item flex shrink-0 flex-col self-center">
      <div className="relative isolate overflow-hidden rounded-sm bg-[var(--card)]">
        <img
          src={item.imageSrc}
          alt={item.imageAlt}
          className="aspect-[3/4] h-auto w-[min(42vw,16.5rem)] object-cover md:w-[18.5rem] lg:w-[20rem]"
          loading={priority ? "eager" : "lazy"}
          decoding="async"
          fetchPriority={priority ? "high" : "auto"}
          draggable={false}
        />
      </div>
      <figcaption className="mt-1 type-sm text-[var(--fg-secondary)]">
        {item.label}
      </figcaption>
    </figure>
  );
}

/** cursor.com/community horizontal photo strip. */
function CommunityGallery({ items }: { items: CommunityGalleryItem[] }) {
  const trackRef = useRef<HTMLDivElement>(null);
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduceMotion) setPaused(true);
  }, []);

  useEffect(() => {
    const el = trackRef.current;
    if (!el || paused) return;

    let frame = 0;
    let last = performance.now();
    const speed = 28;

    const tick = (now: number) => {
      const dt = (now - last) / 1000;
      last = now;
      el.scrollLeft += speed * dt;
      const half = el.scrollWidth / 2;
      if (half > 0 && el.scrollLeft >= half) {
        el.scrollLeft -= half;
      }
      frame = requestAnimationFrame(tick);
    };

    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [paused, items]);

  const loopItems = [...items, ...items];

  return (
    <section
      className="group relative mt-12 flex flex-col md:mt-16"
      aria-label="Community photos and videos"
      data-intro="true"
    >
      <div
        ref={trackRef}
        role="region"
        tabIndex={0}
        aria-label="Community photos and videos"
        className="inspiration-gallery-track flex w-full gap-x-2 overflow-x-auto px-0 pb-2"
        onMouseEnter={() => setPaused(true)}
        onMouseLeave={() => setPaused(false)}
        onFocus={() => setPaused(true)}
        onBlur={() => setPaused(false)}
        onPointerDown={() => setPaused(true)}
      >
        <div className="flex w-max gap-x-2">
          {loopItems.map((item, index) => (
            <GalleryFigure
              key={`${item.id}-${index}`}
              item={item}
              priority={index < 3}
            />
          ))}
        </div>
      </div>

      <button
        type="button"
        className="absolute bottom-4 right-4 z-10 inline-flex items-center justify-center rounded-full border border-[var(--border)] bg-[var(--bg)]/90 px-3 py-1.5 type-sm text-[var(--fg-secondary)] backdrop-blur-sm transition-colors hover:text-[var(--fg)] md:bottom-6 md:right-6"
        aria-pressed={paused}
        aria-label={paused ? "Play gallery scroll" : "Pause gallery scroll"}
        onClick={() => setPaused(value => !value)}
      >
        {paused ? "Play" : "Pause"}
      </button>
    </section>
  );
}

function InspirationCard({
  item,
  priority = false,
}: {
  item: InspirationBoardItem;
  priority?: boolean;
}) {
  return (
    <a
      href={item.href}
      target="_blank"
      rel="noopener noreferrer"
      className="inspiration-card group flex flex-col overflow-hidden rounded-lg"
    >
      <div className="w-full overflow-hidden rounded-lg bg-[var(--card)]">
        <img
          src={item.imageSrc}
          alt={item.imageAlt}
          className="h-auto w-full object-cover transition-transform duration-300 ease-out group-hover:scale-[1.02]"
          loading={priority ? "eager" : "lazy"}
          decoding="async"
          fetchPriority={priority ? "high" : "auto"}
        />
      </div>
      <div className="flex flex-1 flex-col pb-2 pt-4">
        <p className="mb-3 flex-1 text-[14px] leading-relaxed text-[var(--fg-secondary)]">
          {item.description}
        </p>
        <div className="flex items-center justify-between gap-3">
          <div className="flex min-w-0 items-center gap-2.5">
            <BuilderAvatar builder={item.builder} avatarSrc={item.avatarSrc} />
            <span className="truncate text-[13px] font-medium text-[var(--fg)]">
              {item.builder}
            </span>
          </div>
          <span className="shrink-0 text-[var(--fg-tertiary)] transition-colors group-hover:text-[var(--fg-secondary)]">
            <XIcon />
          </span>
        </div>
      </div>
    </a>
  );
}

function Reveal({ children }: { children: ReactNode }) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduceMotion) {
      el.classList.add("is-visible");
      return;
    }

    const observer = new IntersectionObserver(
      entries => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            el.classList.add("is-visible");
            observer.unobserve(el);
          }
        }
      },
      { rootMargin: "0px 0px -8% 0px", threshold: 0.08 },
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <div ref={ref} className="inspiration-reveal">
      {children}
    </div>
  );
}

/** Waterloo-style masonry Inspiration Board. */
function InspirationBoard({ items }: { items: InspirationBoardItem[] }) {
  return (
    <section
      id="inspiration-board"
      className="page-shell scroll-mt-8 py-16 md:py-24"
      aria-labelledby="board-title"
    >
      <div className="mb-12 max-w-2xl md:mb-16">
        <h2
          id="board-title"
          className="font-display text-3xl font-medium leading-tight text-[var(--fg)] md:text-5xl"
        >
          {boardIntro.title}
        </h2>
        <p className="mt-6 text-lg leading-relaxed text-[var(--fg-secondary)]">
          {boardIntro.body}
        </p>
      </div>

      <div
        className="columns-1 gap-8 md:columns-2 lg:columns-3"
        aria-label="Inspiration board gallery"
      >
        {items.map((item, index) => (
          <div key={item.id} className="mb-8 break-inside-avoid">
            <Reveal>
              <InspirationCard item={item} priority={index < 3} />
            </Reveal>
          </div>
        ))}
      </div>
    </section>
  );
}

export function InspirationPage() {
  const primaryHref = site[communityIntro.primaryCta.hrefKey];
  const secondaryHref = site[communityIntro.secondaryCta.hrefKey];

  return (
    <main id="main" className="bg-[var(--bg)] pb-24 md:pb-32">
      {/* cursor.com/community-style hero + photo strip */}
      <section
        id="community-gallery"
        className="section bg-[var(--bg)] px-0 text-[var(--fg)]"
        aria-labelledby="community-title"
      >
        <div className="mx-auto max-w-md px-6 pt-16 text-center md:pt-24">
          <h1
            id="community-title"
            className="font-display text-[1.75rem] font-medium leading-tight tracking-[-0.03em] text-[var(--fg)] md:text-[2.25rem]"
          >
            {communityIntro.title}
          </h1>
          <p className="mt-4 text-pretty text-[0.9375rem] leading-relaxed text-[var(--fg-secondary)] md:text-base">
            {communityIntro.body}
          </p>
          <div className="mt-7 flex flex-wrap items-center justify-center gap-2">
            <a
              href={primaryHref}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center rounded-full bg-[var(--button-bg)] px-5 py-2.5 type-sm text-[var(--button-fg)] transition-opacity hover:opacity-90"
            >
              {communityIntro.primaryCta.label}
            </a>
            <a
              href={secondaryHref}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center rounded-full px-5 py-2.5 type-sm text-[var(--fg-secondary)] transition-colors hover:text-[var(--fg)]"
            >
              {communityIntro.secondaryCta.label}
            </a>
          </div>
        </div>

        <CommunityGallery items={[...communityGalleryItems]} />
      </section>

      {/* Keep the Inspiration Board below */}
      <InspirationBoard items={[...inspirationBoardItems]} />
    </main>
  );
}
