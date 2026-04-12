import { events, site } from "./content";
import cursorLogo from "./assets/cursor-logo.webp";
import meetup01 from "./assets/meetup/01-hackathon.png";
import meetup02 from "./assets/meetup/02-stickers.png";
import meetup03 from "./assets/meetup/03-cafe.png";
import meetup04 from "./assets/meetup/04-cowork.png";
import meetup05 from "./assets/meetup/05-banner.png";
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

/** Meetup photos at intrinsic aspect ratio (no forced crop or masonry cells). */
function MeetupPhotoGrid() {
  const photos = [
    { src: meetup01, alt: "Community tech meetup with presentation on screen" },
    { src: meetup04, alt: "Coworking space during a build session" },
    { src: meetup02, alt: "Cursor stickers and enamel pin" },
    { src: meetup03, alt: "People gathering at a cafe meetup" },
    { src: meetup05, alt: "Cursor banner at an event" },
  ] as const;

  return (
    <div className="w-full bg-neutral-100/40">
      {/* Multi-column flow avoids a short image sitting in a row as tall as a portrait neighbor */}
      <div className="columns-1 gap-x-3 gap-y-2 sm:columns-2 sm:gap-y-3">
        {photos.map((p, i) => (
          <figure key={i} className="mb-2 break-inside-avoid sm:mb-3">
            <img
              src={p.src}
              alt={p.alt}
              className="block h-auto w-full max-w-full"
              loading="lazy"
              decoding="async"
            />
          </figure>
        ))}
      </div>
    </div>
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
      {block.sublines.length > 0 ? (
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
      ) : null}
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
        <div className="mt-16 overflow-hidden md:mt-24">
          <img
            src={block.imageSrc}
            alt={block.imageAlt ?? ""}
            className="h-auto w-full object-cover"
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
              <div className="flex flex-col items-center gap-2 md:gap-3">
                <p className="inline-flex flex-wrap items-center justify-center font-sans text-4xl font-medium tracking-tight text-neutral-900 md:text-6xl lg:text-7xl">
                  <img
                    src={cursorLogo}
                    alt="Cursor"
                    className="block h-20 w-auto border-0 sm:h-24 md:h-28 lg:h-32 xl:h-36"
                    width={1018}
                    height={210}
                    decoding="async"
                  />
                </p>
                <p className="font-hand text-xl leading-none text-neutral-700 md:text-3xl lg:text-4xl">
                  {site.heroHand}
                </p>
              </div>
            </div>
          </div>
        </section>

        <div id="content">
          <section className="mx-auto max-w-7xl px-6 py-24 md:py-36 lg:px-12">
            <h2 className="sr-only">Events</h2>
            <div className="space-y-24 md:space-y-36">
              {events.length > 0 ? (
                <div className="flex flex-col gap-12 md:gap-14">
                  <div className="w-full">
                    <StoryBlockView block={events[0]} />
                  </div>
                  <div className="flex min-h-0 w-full min-w-0 flex-col gap-6 md:gap-8">
                    <p className="font-hand text-[32px] font-medium leading-[1.15] tracking-tight text-neutral-900 md:text-[46px]">
                      Past events
                    </p>
                    <MeetupPhotoGrid />
                  </div>
                </div>
              ) : null}
              {events.slice(1).map(block => (
                <StoryBlockView key={block.headline} block={block} />
              ))}
            </div>
          </section>
        </div>
      </main>

      <footer className="pb-0 pt-8 md:pt-12">
        <div className="mx-auto mb-8 max-w-7xl px-6 text-center text-sm text-neutral-400 lg:px-12">
          Cursor Victoria built by{" "}
          <a
            href="https://alhwyn.com"
            target="_blank"
            rel="noopener noreferrer"
            className="text-neutral-600 underline decoration-neutral-300 underline-offset-2 transition-colors hover:text-neutral-900 hover:decoration-neutral-500"
          >
            Alhwyn
          </a>
        </div>
      </footer>
    </div>
  );
}
