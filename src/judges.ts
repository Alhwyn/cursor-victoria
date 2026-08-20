import adamWhitcroft from "./assets/judges/adam-whitcroft.jpg";
import ericThomas from "./assets/judges/eric-thomas.jpg";
import marcusFarrell from "./assets/judges/marcus-farrell.jpg";
import simonStern from "./assets/judges/simon-stern.jpg";

export const judgesHeading = "Judges";

export const judges = [
  {
    slug: "simon-stern",
    name: "Simon Stern",
    role: "Founder",
    handle: "@Apricot",
    href: "https://x.com/SimiStern",
    photo: simonStern,
    photoFit: "center 22%",
    background: "#F3C6D8",
    foreground: "#C2186A",
  },
  {
    slug: "eric-thomas",
    name: "Eric Thomas",
    role: "Software Architect",
    handle: "Victoria, BC",
    href: "https://www.linkedin.com/in/eric-thomas-32985a4/",
    photo: ericThomas,
    photoFit: "center 20%",
    background: "#F4C4A8",
    foreground: "#E24E1B",
  },
  {
    slug: "adam-whitcroft",
    name: "Adam Whitcroft",
    role: "Designer",
    handle: "@Owner",
    href: "https://x.com/AdamWhitcroft",
    photo: adamWhitcroft,
    photoFit: "center 28%",
    background: "#B8DCF0",
    foreground: "#1F7AA8",
  },
  {
    slug: "marcus-farrell",
    name: "Marcus Farrell",
    role: "Founding Designer",
    handle: "@Dub",
    href: "https://x.com/farrellmarcus",
    photo: marcusFarrell,
    photoFit: "center 30%",
    background: "#D4C4F0",
    foreground: "#6B46A8",
  },
] as const;

export type Judge = (typeof judges)[number];
