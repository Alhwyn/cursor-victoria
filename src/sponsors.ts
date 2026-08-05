import convex from "./assets/sponsors/convex.png";
import elevenlabs from "./assets/sponsors/elevenlabs.png";
import exa from "./assets/sponsors/exa.png";
import firecrawl from "./assets/sponsors/firecrawl.png";
import gmi from "./assets/sponsors/gmi.png";
import render from "./assets/sponsors/render.png";
import shipaton from "./assets/sponsors/shipaton.png";
import wisprFlow from "./assets/sponsors/wispr-flow.png";

export const sponsorsHeading =
  "Sponsored by teams that help builders ship";

export const sponsors = [
  {
    name: "Convex",
    src: convex,
    href: "https://www.convex.dev",
    className: "h-7 md:h-8",
  },
  {
    name: "Shipaton",
    src: shipaton,
    href: "https://www.revenuecat.com/shipaton",
    className: "h-8 md:h-9",
  },
  {
    name: "ElevenLabs",
    src: elevenlabs,
    href: "https://elevenlabs.io",
    className: "h-4 md:h-5",
  },
  {
    name: "GMI Cloud",
    src: gmi,
    href: "https://www.gmicloud.ai",
    className: "h-6 md:h-7",
  },
  {
    name: "Render",
    src: render,
    href: "https://render.com",
    className: "h-5 md:h-6",
  },
  {
    name: "Firecrawl",
    src: firecrawl,
    href: "https://www.firecrawl.dev",
    className: "h-5 md:h-6",
  },
  {
    name: "Exa",
    src: exa,
    href: "https://exa.ai",
    className: "h-5 md:h-6",
  },
  {
    name: "Wispr Flow",
    src: wisprFlow,
    href: "https://wisprflow.ai",
    className: "h-5 md:h-6",
  },
] as const;
