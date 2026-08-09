import { useEffect, useRef, useState } from "react";
import {
  inspirationIntro,
  inspirationItems,
  type InspirationItem,
} from "./inspiration";
import { site } from "./content";

function GalleryFigure({
  item,
  priority = false,
}: {
  item: InspirationItem;
  priority?: boolean;
}) {
  const media = (
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
  );

  return (
    <figure className="group/item flex shrink-0 flex-col self-center">
      {item.href ? (
        <a
          href={item.href}
          target="_blank"
          rel="noopener noreferrer"
          className="block focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--fg)]"
          aria-label={item.label}
        >
          {media}
        </a>
      ) : (
        media
      )}
      <figcaption className="mt-1 type-sm text-[var(--fg-secondary)]">
        {item.label}
      </figcaption>
    </figure>
  );
}

function InspirationGallery({ items }: { items: InspirationItem[] }) {
  const trackRef = useRef<HTMLDivElement>(null);
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduceMotion) {
      setPaused(true);
    }
  }, []);

  useEffect(() => {
    const el = trackRef.current;
    if (!el || paused) return;

    let frame = 0;
    let last = performance.now();
    const speed = 28; // px per second

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
      aria-label="Project inspiration gallery"
      data-intro="true"
    >
      <div
        ref={trackRef}
        role="region"
        tabIndex={0}
        aria-label="Project inspiration photos"
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

export function InspirationPage() {
  const primaryHref = site[inspirationIntro.primaryCta.hrefKey];
  const secondaryHref = site[inspirationIntro.secondaryCta.hrefKey];

  return (
    <main id="main" className="bg-[var(--bg)] pb-24 md:pb-32">
      <section
        id="inspiration-gallery"
        className="section bg-[var(--bg)] px-0 text-[var(--fg)]"
        aria-labelledby="inspiration-title"
      >
        <div className="mx-auto max-w-md px-6 pt-16 text-center md:pt-24">
          <h1
            id="inspiration-title"
            className="font-display text-[1.75rem] font-medium leading-tight tracking-[-0.03em] text-[var(--fg)] md:text-[2.25rem]"
          >
            {inspirationIntro.title}
          </h1>
          <p className="mt-4 text-pretty text-[0.9375rem] leading-relaxed text-[var(--fg-secondary)] md:text-base">
            {inspirationIntro.body}
          </p>
          <div className="mt-7 flex flex-wrap items-center justify-center gap-2">
            <a
              href={primaryHref}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center rounded-full bg-[var(--button-bg)] px-5 py-2.5 type-sm text-[var(--button-fg)] transition-opacity hover:opacity-90"
            >
              {inspirationIntro.primaryCta.label}
            </a>
            <a
              href={secondaryHref}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center rounded-full px-5 py-2.5 type-sm text-[var(--fg-secondary)] transition-colors hover:text-[var(--fg)]"
            >
              {inspirationIntro.secondaryCta.label}
            </a>
          </div>
        </div>

        <InspirationGallery items={[...inspirationItems]} />
      </section>
    </main>
  );
}
