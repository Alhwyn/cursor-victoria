import { useEffect, useRef, useState } from "react";
import { events, site } from "./content";
import meetup01 from "./assets/meetup/01-hackathon.png";
import meetup02 from "./assets/meetup/02-stickers.png";
import meetup03 from "./assets/meetup/03-cafe.png";
import meetup04 from "./assets/meetup/04-cowork.png";
import meetup05 from "./assets/meetup/05-banner.png";
import heroBackground from "./assets/parliament-outdoor-impressionist-oil-no-figure.png";
import "./index.css";

const CURSOR_LOGO_VIDEO_MP4 =
  "https://astf9lxpvfjnfixp.public.blob.vercel-storage.com/logo-light-theme.mp4";
const CURSOR_LOGO_VIDEO_WEBM =
  "https://astf9lxpvfjnfixp.public.blob.vercel-storage.com/logo-light-theme.webm";

/** Wait after each full play before starting again (single play per cycle, no loop). */
const LOGO_ANIMATION_IDLE_MS = 3000;

/** Horizontal lockup: static SVG; icon animates via video after each idle period. */
function CursorHeroLogo() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const idleTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const motionOkRef = useRef(true);
  const [motionOk, setMotionOk] = useState(true);
  const [videoVisible, setVideoVisible] = useState(false);

  const clearIdleTimer = () => {
    if (idleTimerRef.current !== null) {
      clearTimeout(idleTimerRef.current);
      idleTimerRef.current = null;
    }
  };

  const schedulePlayAfterIdle = (delayMs: number = LOGO_ANIMATION_IDLE_MS) => {
    clearIdleTimer();
    idleTimerRef.current = setTimeout(() => {
      idleTimerRef.current = null;
      if (!motionOkRef.current) return;
      const v = videoRef.current;
      if (!v) return;
      void v.play().catch(() => schedulePlayAfterIdle(delayMs));
    }, delayMs);
  };

  const endPlayWindow = () => {
    const v = videoRef.current;
    if (v) {
      v.pause();
      v.currentTime = 0;
    }
    setVideoVisible(false);
    schedulePlayAfterIdle();
  };

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const sync = () => {
      const ok = !mq.matches;
      motionOkRef.current = ok;
      setMotionOk(ok);
    };
    sync();
    mq.addEventListener("change", sync);
    return () => mq.removeEventListener("change", sync);
  }, []);

  useEffect(() => {
    if (!motionOk) {
      clearIdleTimer();
      videoRef.current?.pause();
      setVideoVisible(false);
      return;
    }
    schedulePlayAfterIdle(0);
    return () => {
      clearIdleTimer();
    };
  }, [motionOk]);

  const onPlaying = () => {
    setVideoVisible(true);
  };

  const onEnded = () => endPlayWindow();

  const onError = () => {
    clearIdleTimer();
    setVideoVisible(false);
  };

  return (
    <div
      className="relative inline-block overflow-hidden text-neutral-900"
      role="img"
      aria-label="Cursor"
    >
      {/* Match Cursor Waterloo: anchor to top-left, same height as SVG so the clip aligns with the mark */}
      <div className="pointer-events-none absolute top-0 left-0 z-0 h-full">
        <video
          ref={videoRef}
          muted
          playsInline
          preload="auto"
          aria-hidden
          className={`block h-full w-auto max-w-none object-contain object-left transition-opacity duration-500 ${
            videoVisible ? "opacity-100" : "opacity-0"
          }`}
          onPlaying={onPlaying}
          onEnded={onEnded}
          onError={onError}
        >
          <source type="video/webm" src={CURSOR_LOGO_VIDEO_WEBM} />
          <source type="video/mp4" src={CURSOR_LOGO_VIDEO_MP4} />
        </video>
      </div>
      <svg
        fill="none"
        className="relative z-10 block h-auto w-[110px] isolate md:w-[168px] lg:w-[200px]"
        viewBox="0 0 2193 545"
        xmlns="http://www.w3.org/2000/svg"
        overflow="visible"
      >
        <g fill="currentColor">
          <path
            className={`transition-opacity duration-500 ${
              videoVisible ? "opacity-0" : "opacity-100"
            }`}
            d="m466.383 137.073-206.469-119.2034c-6.63-3.8287-14.811-3.8287-21.441 0l-206.4586 119.2034c-5.5734 3.218-9.0144 9.169-9.0144 15.615v240.375c0 6.436 3.441 12.397 9.0144 15.615l206.4686 119.203c6.63 3.829 14.811 3.829 21.441 0l206.468-119.203c5.574-3.218 9.015-9.17 9.015-15.615v-240.375c0-6.436-3.441-12.397-9.015-15.615zm-12.969 25.25-199.316 345.223c-1.347 2.326-4.904 1.376-4.904-1.319v-226.048c0-4.517-2.414-8.695-6.33-10.963l-195.7577-113.019c-2.3263-1.347-1.3764-4.905 1.3182-4.905h398.6305c5.661 0 9.199 6.136 6.368 11.041h-.009z"
          />
          <g>
            <path d="m723.253 148.84h87.856v48.397h-84.881c-45.789 0-81.527 26.432-81.527 82.273s35.738 82.273 81.527 82.273h84.881v48.397h-91.578c-76.691 0-131.039-45.043-131.039-130.66 0-85.618 58.07-130.661 134.761-130.661z" />
            <path d="m855.781 148.84h54.348v159.7c0 39.828 18.242 58.448 61.056 58.448 42.815 0 61.055-18.61 61.055-58.448v-159.7h54.35v170.866c0 58.071-36.85 94.933-115.405 94.933-78.551 0-115.404-37.231-115.404-95.301z" />
            <path d="m1370.62 222.913c0 29.04-16.75 51.372-39.09 61.056v.746c23.45 3.354 35.37 20.103 35.73 42.814l1.12 82.641h-54.35l-1.11-73.705c-.37-16.381-10.06-26.432-29.41-26.432h-90.47v100.137h-54.34v-261.33h150.02c49.15 0 81.9 24.94 81.9 74.083zm-54.73 7.454c0-22.333-11.91-34.623-34.24-34.623h-88.61v69.236h89.34c20.47 0 33.51-12.281 33.51-34.623z" />
            <path d="m1576.09 333.85c0-18.61-11.91-26.432-29.77-27.915l-60.31-5.583c-52.12-4.837-79.3-25.318-79.3-74.83 0-49.511 33.51-76.69 81.53-76.69h133.27v46.904h-129.55c-18.61 0-30.52 9.683-30.52 28.294 0 18.61 12.28 27.547 30.9 29.04l61.42 5.214c46.54 4.091 77.06 25.318 77.06 75.198s-32.38 76.69-78.17 76.69h-139.23v-46.904h134.01c17.5 0 28.66-11.912 28.66-29.408z" />
            <path d="m1789.79 144.373c81.89 0 133.65 52.487 133.65 134.761 0 82.273-53.98 135.506-135.88 135.506s-133.65-53.233-133.65-135.506c0-82.274 53.98-134.761 135.88-134.761zm77.43 135.129c0-55.095-32.02-87.479-78.56-87.479-46.53 0-78.55 32.384-78.55 87.479 0 55.094 32.02 87.478 78.55 87.478 46.54 0 78.56-32.384 78.56-87.478z" />
            <path d="m2192.95 222.913c0 29.04-16.75 51.372-39.1 61.056v.746c23.46 3.354 35.37 20.103 35.74 42.814l1.12 82.641h-54.35l-1.12-73.705c-.36-16.381-10.05-26.432-29.4-26.432h-90.47v100.137h-54.35v-261.33h150.03c49.14 0 81.9 24.94 81.9 74.083zm-54.73 7.454c0-22.333-11.91-34.623-34.25-34.623h-88.6v69.236h89.34c20.47 0 33.51-12.281 33.51-34.623z" />
          </g>
        </g>
      </svg>
    </div>
  );
}

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

/** When `hand` is a leading prefix of `headline`, sublines can sit between hand and the rest of the title. */
function handPrefixRest(headline: string, hand?: string) {
  const h = hand?.trim();
  if (!h || !headline.startsWith(h)) return null;
  const rest = headline.slice(h.length).trimStart();
  return rest.length > 0 ? { hand: h, rest } : null;
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

function MeetupCaption({ text }: { text: string }) {
  const i = text.indexOf(" — ");
  if (i >= 0) {
    const title = text.slice(0, i);
    const subtitle = text.slice(i + 3);
    return (
      <>
        <span className="block text-xl font-medium leading-tight tracking-tight">{title}</span>
        <span className="mt-1 block text-lg font-normal leading-snug text-white/95">{subtitle}</span>
      </>
    );
  }
  return <span className="block text-xl font-medium leading-tight tracking-tight">{text}</span>;
}

/** Meetup photos at intrinsic aspect ratio (no forced crop or masonry cells). */
function MeetupPhotoGrid() {
  const photos = [
    {
      src: meetup01,
      alt: "Community tech meetup with presentation on screen",
      caption: "Cursor Victoria Hackathon — Sep 2025",
    },
    {
      src: meetup04,
      alt: "Coworking space during a build session",
      caption: "Cursor Hackathon — Sep 2025",
    },
    {
      src: meetup02,
      alt: "Cursor stickers and enamel pin",
      caption: "Cursor Stickers + Pins",
    },
    {
      src: meetup03,
      alt: "People gathering at a cafe meetup",
      caption: "Cafe Cursor — Dec 2025",
    },
    {
      src: meetup05,
      alt: "Cursor banner at an event",
      caption: "Cursor Cafe — Dec 2025",
    },
  ] as const;

  return (
    <div className="w-full bg-neutral-100/40">
      {/* Multi-column flow avoids a short image sitting in a row as tall as a portrait neighbor */}
      <div className="columns-1 gap-x-3 gap-y-2 sm:columns-2 sm:gap-y-3">
        {photos.map((p, i) => (
          <figure
            key={i}
            className="group relative mb-2 overflow-hidden rounded-[4px] break-inside-avoid sm:mb-3"
          >
            <img
              src={p.src}
              alt={p.alt}
              className="block h-auto w-full max-w-full"
              loading="lazy"
              decoding="async"
            />
            <div
              className="pointer-events-none absolute inset-x-0 bottom-0 z-[1] h-[min(55%,22rem)] bg-gradient-to-t from-black/80 to-transparent opacity-0 transition-opacity duration-300 ease-out group-hover:opacity-100"
              aria-hidden
            />
            <figcaption className="pointer-events-none absolute inset-x-0 bottom-0 z-10 p-6 text-left text-white opacity-0 transition-opacity duration-300 ease-out group-hover:opacity-100 sm:p-8">
              <MeetupCaption text={p.caption} />
            </figcaption>
          </figure>
        ))}
      </div>
    </div>
  );
}

function StoryBlockView({ block }: { block: (typeof events)[number] }) {
  const prefix = handPrefixRest(block.headline, block.hand);
  const stackedHandSublines =
    prefix !== null && block.sublines.length > 0 ? prefix : null;

  const sublinesEl =
    block.sublines.length > 0 ? (
      <div
        className={
          block.sublinesVariant === "body"
            ? "mt-2 space-y-1 md:mt-3"
            : "mt-3 space-y-2 md:mt-4 md:space-y-3"
        }
      >
        {block.sublines.map(line => (
          <p
            key={line}
            className={
              block.sublinesVariant === "body"
                ? "font-sans text-base font-medium leading-snug text-neutral-600"
                : "font-sans text-[32px] font-medium leading-[1.15] tracking-tight text-neutral-400 md:text-[46px]"
            }
          >
            {line}
          </p>
        ))}
      </div>
    ) : null;

  const headlineSizeClass =
    "text-[32px] font-medium leading-[1.15] tracking-tight text-neutral-900 md:text-[46px]";

  return (
    <div className="flex w-full flex-col">
      {block.label ? (
        <div className="mb-5 md:mb-6">
          <span className="text-sm text-neutral-400">{block.label}</span>
        </div>
      ) : null}
      {stackedHandSublines ? (
        <>
          <p className={`font-hand ${headlineSizeClass}`}>{stackedHandSublines.hand}</p>
          <p className="mt-3 font-sans text-xl leading-none text-neutral-900 md:mt-4 md:text-3xl lg:text-4xl">
            {stackedHandSublines.rest}
          </p>
          {sublinesEl}
        </>
      ) : (
        <>
          <StoryHeadline headline={block.headline} hand={block.hand} />
          {sublinesEl}
        </>
      )}
      {block.cta ? (
        <div className="mt-10 md:mt-12">
          <a
            href={block.cta.href}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-full bg-neutral-900 px-5 py-2.5 text-base font-medium text-white transition-colors hover:bg-neutral-800 md:px-6"
          >
            {block.cta.label} <span>→</span>
          </a>
        </div>
      ) : null}
      {block.imageSrc ? (
        <div className="mt-14 w-full overflow-hidden rounded-[4px] md:mt-20">
          {block.imageOverlay ? (
            <figure className="group relative m-0 w-full">
              <img
                src={block.imageSrc}
                alt={block.imageAlt ?? ""}
                className="block h-auto w-full object-cover"
              />
              <div
                className="pointer-events-none absolute inset-x-0 bottom-0 z-[1] h-[min(55%,22rem)] bg-gradient-to-t from-black/80 to-transparent opacity-0 transition-opacity duration-300 ease-out group-hover:opacity-100"
                aria-hidden
              />
              <figcaption className="pointer-events-none absolute inset-x-0 bottom-0 z-10 p-6 text-left text-base font-medium text-white opacity-0 transition-opacity duration-300 ease-out [text-shadow:0_1px_4px_rgba(0,0,0,0.85)] group-hover:opacity-100 sm:p-8">
                {block.imageOverlay}
              </figcaption>
            </figure>
          ) : (
            <img
              src={block.imageSrc}
              alt={block.imageAlt ?? ""}
              className="block h-auto w-full object-cover"
            />
          )}
        </div>
      ) : null}
    </div>
  );
}

export function App() {
  return (
    <div className="min-h-screen bg-[#F8F8F6]">
      <main>
        <section className="relative min-h-screen overflow-hidden bg-[#F8F8F6]">
          <div className="mx-auto flex w-full max-w-7xl flex-col px-6 pt-10 pb-10 md:pt-14 md:pb-12 lg:px-12">
            <div className="flex flex-row flex-wrap items-center gap-3 md:gap-4 lg:gap-5">
              <div className="shrink-0">
                <CursorHeroLogo />
              </div>
              <p className="min-w-0 font-hand text-[36px] font-medium leading-[1.15] tracking-tight text-neutral-900 md:text-[52px]">
                {site.heroHand}
              </p>
            </div>
            <div className="mt-8 w-full overflow-hidden rounded-[4px] md:mt-10">
              <figure className="group relative m-0 w-full">
                <img
                  src={heroBackground}
                  alt="Impressionistic illustration of the British Columbia Parliament Buildings, Victoria, B.C."
                  className="block h-auto w-full object-cover"
                  decoding="async"
                />
                <div
                  className="pointer-events-none absolute inset-x-0 bottom-0 z-[1] h-[min(55%,22rem)] bg-gradient-to-t from-black/80 to-transparent opacity-0 transition-opacity duration-300 ease-out group-hover:opacity-100"
                  aria-hidden
                />
                <figcaption className="pointer-events-none absolute inset-x-0 bottom-0 z-10 p-6 text-left text-base font-medium text-white opacity-0 transition-opacity duration-300 ease-out [text-shadow:0_1px_4px_rgba(0,0,0,0.85)] group-hover:opacity-100 sm:p-8">
                  Parliament Buildings, Victoria, B.C.
                </figcaption>
              </figure>
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
                    <div className="flex flex-col gap-8 md:gap-10">
                      <p className="font-hand text-[32px] font-medium leading-[1.15] tracking-tight text-neutral-900 md:text-[46px]">
                        {site.upcomingEventsHeading}
                      </p>
                      <StoryBlockView block={events[0]} />
                    </div>
                  </div>
                  <div className="flex min-h-0 w-full min-w-0 flex-col gap-6 md:gap-8">
                    <div className="flex flex-col gap-3 md:gap-4">
                      <p className="font-hand text-[32px] font-medium leading-[1.15] tracking-tight text-neutral-900 md:text-[46px]">
                        Past events
                      </p>
                      <p className="max-w-2xl font-hand text-xl font-medium leading-[1.2] tracking-tight text-neutral-700 md:text-2xl">
                        We host Cursor Cafe, hackathons, and many more, powered by the{" "}
                        <a
                          href={site.footer.partnerUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-neutral-900 underline decoration-neutral-500 underline-offset-[0.15em] transition-colors hover:text-neutral-950 hover:decoration-neutral-700"
                        >
                          Tenfold community
                        </a>
                        .
                      </p>
                    </div>
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

      <footer className="mt-16 bg-[#f2f1ee] text-stone-800">
        <div className="relative z-10 mx-auto flex max-w-[1800px] flex-col items-center gap-8 px-4 py-6 sm:px-6 sm:py-8 lg:px-8">
          <div className="flex flex-col items-center gap-1 font-hand text-center text-[32px] font-medium leading-[1.15] tracking-tight text-neutral-900 md:gap-1.5 md:text-[46px]">
            <a
              href={site.footer.partnerUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-neutral-900 transition-colors hover:text-neutral-800 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-stone-400 focus-visible:ring-offset-2 focus-visible:ring-offset-[#f2f1ee]"
            >
              {site.footer.ctaLead}
            </a>
            <a
              href={site.footer.ctaTenfoldUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-neutral-900 underline decoration-neutral-400 underline-offset-[0.15em] transition-colors hover:text-neutral-800 hover:decoration-neutral-600 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-stone-400 focus-visible:ring-offset-2 focus-visible:ring-offset-[#f2f1ee]"
            >
              {site.footer.ctaHighlight}
            </a>
          </div>
          <p className="text-center text-sm text-stone-500">
            Cursor Victoria built by{" "}
            <a
              href="https://alhwyn.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-stone-600 underline decoration-stone-300 underline-offset-2 transition-colors hover:text-stone-900 hover:decoration-stone-500"
            >
              Alhwyn
            </a>
          </p>
        </div>
      </footer>
    </div>
  );
}
