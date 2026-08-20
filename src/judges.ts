import adamWhitcroft from "./assets/judges/adam-whitcroft-sinwave.png";
import ericThomas from "./assets/judges/eric-thomas-sinwave.png";
import marcusFarrell from "./assets/judges/marcus-farrell-sinwave.png";
import simonStern from "./assets/judges/simon-stern-sinwave.png";

export const judgesHeading = "Judges";

export const judges = [
  {
    slug: "simon-stern",
    name: "Simon Stern",
    role: "Superteam Solana",
    handle: "@Superteam",
    href: "https://x.com/SimiStern",
    photo: simonStern,
    preset: "Green",
    background: "#e6f2ea",
    foreground: "#4ade80",
  },
  {
    slug: "eric-thomas",
    name: "Eric Thomas",
    role: "Software Architect",
    handle: "Victoria, BC",
    href: "https://www.linkedin.com/in/eric-thomas-32985a4/",
    photo: ericThomas,
    preset: "Orange",
    background: "#ebe6e1",
    foreground: "#ff6b35",
  },
  {
    slug: "adam-whitcroft",
    name: "Adam Whitcroft",
    role: "Designer",
    handle: "@Owner",
    href: "https://x.com/AdamWhitcroft",
    photo: adamWhitcroft,
    preset: "Blue",
    background: "#e8ecf5",
    foreground: "#6b8cff",
  },
  {
    slug: "marcus-farrell",
    name: "Marcus Farrell",
    role: "Founding Designer",
    handle: "@Dub",
    href: "https://x.com/farrellmarcus",
    photo: marcusFarrell,
    preset: "Purple",
    background: "#efeaf5",
    foreground: "#a78bfa",
  },
] as const;

export type Judge = (typeof judges)[number];
