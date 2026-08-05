import convex from "./assets/sponsors/convex.png";
import elevenlabs from "./assets/sponsors/elevenlabs.png";
import exa from "./assets/sponsors/exa.png";
import firecrawl from "./assets/sponsors/firecrawl.png";
import gmi from "./assets/sponsors/gmi.png";
import mintlify from "./assets/sponsors/mintlify-lockup.png";
import render from "./assets/sponsors/render.png";
import shipaton from "./assets/sponsors/shipaton.png";
import solana from "./assets/sponsors/solana-lockup.svg";
import uvec from "./assets/sponsors/uvec.png";
import wisprFlow from "./assets/sponsors/wispr-flow.png";

export const sponsorsHeading =
  "Sponsored by teams that help builders ship";

export const sponsors = [
  {
    name: "Solana",
    src: solana,
    href: "https://solana.com",
    logoScale: 1.1,
  },
  {
    name: "Mintlify",
    src: mintlify,
    href: "https://mintlify.com",
    logoScale: 0.95,
  },
  {
    name: "GMI Cloud",
    src: gmi,
    href: "https://www.gmicloud.ai",
    logoScale: 0.92,
  },
  {
    name: "UVEC",
    src: uvec,
    href: "https://www.linkedin.com/company/uvic-entrepreneurship-club",
    logoScale: 0.94,
  },
  {
    name: "Convex",
    src: convex,
    href: "https://www.convex.dev",
    logoScale: 1.3,
  },
  {
    name: "Shipaton",
    src: shipaton,
    href: "https://www.revenuecat.com/shipaton",
    logoScale: 0.94,
  },
  {
    name: "ElevenLabs",
    src: elevenlabs,
    href: "https://elevenlabs.io",
    logoScale: 1.12,
  },
  {
    name: "Render",
    src: render,
    href: "https://render.com",
    logoScale: 1.05,
  },
  {
    name: "Firecrawl",
    src: firecrawl,
    href: "https://www.firecrawl.dev",
    logoScale: 1.05,
  },
  {
    name: "Exa",
    src: exa,
    href: "https://exa.ai",
    logoScale: 0.85,
  },
  {
    name: "Wispr Flow",
    src: wisprFlow,
    href: "https://wisprflow.ai",
    logoScale: 1.02,
  },
] as const;
