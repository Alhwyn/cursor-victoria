import adamWhitcroft from "./assets/judges/adam-whitcroft-sinwave.png";
import ericThomas from "./assets/judges/eric-thomas-sinwave.png";
import marcusFarrell from "./assets/judges/marcus-farrell-sinwave.png";
import simonStern from "./assets/judges/simon-stern-sinwave.png";

export const judgesHeading = "Judges";

export const judges = [
  {
    slug: "simon-stern",
    name: "Simon Stern",
    role: "Founder",
    handle: "@Apricot",
    href: "https://x.com/SimiStern",
    photo: simonStern,
    preset: "Orange",
    background: "#ebe6e1",
    foreground: "#ff6b35",
  },
  {
    slug: "eric-thomas",
    name: "Eric Thomas",
    role: "Software Architect",
    handle: "Victoria, BC",
    href: "https://www.linkedin.com/in/eric-thomas-32985a4/",
    photo: ericThomas,
    preset: "Green",
    background: "#e6f2ea",
    foreground: "#4ade80",
  },
  {
    slug: "adam-whitcroft",
    name: "Adam Whitcroft",
    role: "Designer",
    handle: "@Owner",
    href: "https://x.com/AdamWhitcroft",
    photo: adamWhitcroft,
    preset: "Purple",
    background: "#efeaf5",
    foreground: "#a78bfa",
  },
  {
    slug: "marcus-farrell",
    name: "Marcus Farrell",
    role: "Founding Designer",
    handle: "@Dub",
    href: "https://x.com/farrellmarcus",
    photo: marcusFarrell,
    preset: "Teal",
    background: "#e6f4f3",
    foreground: "#12b5a7",
  },
] as const;

export type Judge = (typeof judges)[number];
