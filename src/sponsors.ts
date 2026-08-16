import convex from "./assets/sponsors/convex-lockup.svg";
import dub from "./assets/sponsors/dub-wordmark.svg";
import elevenlabs from "./assets/sponsors/elevenlabs.png";
import exa from "./assets/sponsors/exa-lockup.svg";
import firecrawl from "./assets/sponsors/firecrawl.png";
import gmi from "./assets/sponsors/gmi.png";
import mintlify from "./assets/sponsors/mintlify-lockup.svg";
import render from "./assets/sponsors/render.png";
import shipaton from "./assets/sponsors/shipaton.png";
import solana from "./assets/sponsors/solana-lockup.svg";
import uvec from "./assets/sponsors/uvec.png";
import wisprFlow from "./assets/sponsors/wispr-flow.png";

export const sponsorsHeading =
  "Sponsored by teams that help builders ship";

export const sponsors = [
  {
    slug: "convex",
    name: "Convex",
    src: convex,
    href: "https://www.convex.dev",
  },
  {
    slug: "solana",
    name: "Solana",
    src: solana,
    href: "https://solana.com",
  },
  {
    slug: "mintlify",
    name: "Mintlify",
    src: mintlify,
    href: "https://mintlify.com",
  },
  {
    slug: "gmi",
    name: "GMI Cloud",
    src: gmi,
    href: "https://www.gmicloud.ai",
  },
  {
    slug: "uvec",
    name: "UVEC",
    src: uvec,
    href: "https://www.linkedin.com/company/uvic-entrepreneurship-club",
  },
  {
    slug: "shipaton",
    name: "Shipaton",
    src: shipaton,
    href: "https://www.shipaton.com",
  },
  {
    slug: "elevenlabs",
    name: "ElevenLabs",
    src: elevenlabs,
    href: "https://elevenlabs.io",
  },
  {
    slug: "render",
    name: "Render",
    src: render,
    href: "https://render.com",
  },
  {
    slug: "firecrawl",
    name: "Firecrawl",
    src: firecrawl,
    href: "https://www.firecrawl.dev",
  },
  {
    slug: "exa",
    name: "Exa",
    src: exa,
    href: "https://exa.ai",
  },
  {
    slug: "wispr-flow",
    name: "Wispr Flow",
    src: wisprFlow,
    href: "https://wisprflow.ai",
  },
  {
    slug: "dub",
    name: "Dub",
    src: dub,
    href: "https://dub.co",
  },
] as const;
