import convex from "./assets/sponsors/convex-lockup.svg";
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
    name: "Convex",
    src: convex,
    href: "https://www.convex.dev",
  },
  {
    name: "Solana",
    src: solana,
    href: "https://solana.com",
  },
  {
    name: "Mintlify",
    src: mintlify,
    href: "https://mintlify.com",
  },
  {
    name: "GMI Cloud",
    src: gmi,
    href: "https://www.gmicloud.ai",
  },
  {
    name: "UVEC",
    src: uvec,
    href: "https://www.linkedin.com/company/uvic-entrepreneurship-club",
  },
  {
    name: "Shipaton",
    src: shipaton,
    href: "https://www.revenuecat.com/shipaton",
  },
  {
    name: "ElevenLabs",
    src: elevenlabs,
    href: "https://elevenlabs.io",
  },
  {
    name: "Render",
    src: render,
    href: "https://render.com",
  },
  {
    name: "Firecrawl",
    src: firecrawl,
    href: "https://www.firecrawl.dev",
  },
  {
    name: "Exa",
    src: exa,
    href: "https://exa.ai",
  },
  {
    name: "Wispr Flow",
    src: wisprFlow,
    href: "https://wisprflow.ai",
  },
] as const;
