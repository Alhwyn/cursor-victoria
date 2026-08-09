import { useEffect, useRef, type ReactNode } from "react";
import {
  inspirationIntro,
  inspirationItems,
  type InspirationItem,
} from "./inspiration";

function navigateHome() {
  window.history.pushState({}, "", "/");
  window.dispatchEvent(new PopStateEvent("popstate"));
}

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

function InspirationCard({
  item,
  priority = false,
}: {
  item: InspirationItem;
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

export function InspirationPage() {
  return (
    <main id="main" className="bg-[var(--bg)] pb-24 md:pb-32">
      <nav className="page-shell pt-8" aria-label="Inspiration">
        <a
          href="/"
          className="inline-flex items-center gap-1.5 type-sm text-[var(--fg-tertiary)] transition-colors hover:text-[var(--fg)]"
          onClick={event => {
            event.preventDefault();
            navigateHome();
          }}
        >
          <span aria-hidden>←</span> Back to home
        </a>
      </nav>

      <section
        id="inspiration"
        className="page-shell py-12 md:py-20"
        aria-labelledby="inspiration-title"
      >
        <div className="mb-12 max-w-2xl md:mb-16">
          <h1
            id="inspiration-title"
            className="font-display text-3xl font-medium leading-tight text-[var(--fg)] md:text-5xl"
          >
            {inspirationIntro.title}
          </h1>
          <p className="mt-6 text-lg leading-relaxed text-[var(--fg-secondary)]">
            {inspirationIntro.body}
          </p>
        </div>

        <div
          className="columns-1 gap-8 md:columns-2 lg:columns-3"
          aria-label="Inspiration board gallery"
        >
          {inspirationItems.map((item, index) => (
            <div key={item.id} className="mb-8 break-inside-avoid">
              <Reveal>
                <InspirationCard item={item} priority={index < 3} />
              </Reveal>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}
