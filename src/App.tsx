import { builds, events, site } from "./content";
import "./index.css";

function splitHeadline(headline: string, hand?: string) {
  if (!hand) return { before: headline, match: null as string | null, after: "" };
  const i = headline.indexOf(hand);
  if (i < 0) return { before: headline, match: null as string | null, after: "" };
  return {
    before: headline.slice(0, i),
    match: hand,
    after: headline.slice(i + hand.length),
  };
}

function StoryHeadline({ headline, hand }: { headline: string; hand?: string }) {
  const { before, match, after } = splitHeadline(headline, hand);
  return (
    <p className="font-sans text-[32px] font-medium leading-[1.15] tracking-tight text-neutral-900 md:text-[46px]">
      {before}
      {match ? <span className="font-hand">{match}</span> : null}
      {after}
    </p>
  );
}

function StoryBlockView({ block }: { block: (typeof events)[number] }) {
  return (
    <div className="max-w-3xl">
      {block.label ? (
        <div className="mb-4 flex items-center justify-between">
          <span className="text-sm text-neutral-400">{block.label}</span>
        </div>
      ) : null}
      <StoryHeadline headline={block.headline} hand={block.hand} />
      <div className="mt-1 space-y-0">
        {block.sublines.map(line => (
          <p
            key={line}
            className="font-sans text-[32px] font-medium leading-[1.15] tracking-tight text-neutral-400 md:text-[46px]"
          >
            {line}
          </p>
        ))}
      </div>
      {block.cta ? (
        <div className="mt-8">
          <a
            href={block.cta.href}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-full bg-neutral-900 px-5 py-2.5 text-base font-medium text-white transition-colors hover:bg-neutral-800"
          >
            {block.cta.label} <span>→</span>
          </a>
        </div>
      ) : null}
      {block.imageSrc ? (
        <div className="mt-16 overflow-hidden rounded-xl md:mt-24">
          <img
            src={block.imageSrc}
            alt={block.imageAlt ?? ""}
            className="h-auto w-full rounded-xl object-cover"
          />
        </div>
      ) : null}
    </div>
  );
}

export function App() {
  return (
    <div className="min-h-screen bg-[#F8F8F6]">
      <main>
        <section className="relative flex min-h-screen items-center justify-center overflow-hidden bg-[#F8F8F6]">
          <div className="relative z-10 px-6">
            <div className="mx-auto max-w-4xl text-center">
              <p className="font-sans text-4xl font-medium tracking-tight text-neutral-900 md:text-6xl lg:text-7xl">
                {site.heroPrefix}{" "}
                <span className="font-hand text-[1.08em] leading-none">{site.heroHand}</span>
              </p>
              <p className="mx-auto mt-6 max-w-xl text-base leading-relaxed text-neutral-500 md:text-lg">
                {site.heroSubline}
              </p>
            </div>
          </div>
        </section>

        <div id="content">
          <div className="section-divider" />
          <section className="mx-auto max-w-7xl px-6 py-24 md:py-36 lg:px-12">
            <h2 className="sr-only">Events</h2>
            <div className="space-y-24 md:space-y-36">
              {events.map(block => (
                <StoryBlockView key={block.headline} block={block} />
              ))}
            </div>

            <div className="section-divider my-24 md:my-36" />

            <div className="space-y-24 md:space-y-36">
              {builds.map(block => (
                <StoryBlockView key={block.headline} block={block} />
              ))}
            </div>
          </section>
        </div>
      </main>

      <footer className="pb-0 pt-8 md:pt-12">
        <div className="mx-auto mb-8 flex max-w-7xl flex-wrap items-center justify-center gap-2 px-6 text-sm text-neutral-400 lg:px-12">
          <svg viewBox="0 0 467 532" fill="currentColor" className="h-3.5 w-auto text-neutral-900" aria-hidden>
            <path d="M457.43,125.94L244.42,2.96c-6.84-3.95-15.28-3.95-22.12,0L9.3,125.94c-5.75,3.32-9.3,9.46-9.3,16.11v247.99c0,6.64,3.55,12.79,9.3,16.11l213.01,122.98c6.84,3.95,15.28,3.95,22.12,0l213.01-122.98c5.75-3.32,9.3-9.46,9.3-16.11v-247.99c0-6.64-3.55-12.79-9.3-16.11h-.01ZM444.05,151.99l-205.63,356.16c-1.39,2.4-5.06,1.42-5.06-1.36v-233.21c0-4.66-2.49-8.97-6.53-11.31L24.87,145.67c-2.4-1.39-1.42-5.06,1.36-5.06h411.26c5.84,0,9.49,6.33,6.57,11.39h-.01Z" />
          </svg>
          <span>Cursor Victoria — static site; edit</span>
          <code className="rounded-md border border-neutral-200 bg-white/80 px-1.5 py-0.5 text-xs text-neutral-600">
            src/content.ts
          </code>
        </div>
      </footer>
    </div>
  );
}
