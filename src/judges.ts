import adamWhitcroft from "./assets/judges/adam-whitcroft.jpg";
import ericThomas from "./assets/judges/eric-thomas.jpg";
import marcusFarrell from "./assets/judges/marcus-farrell.jpg";
import simonStern from "./assets/judges/simon-stern.jpg";
import { colorPreset } from "./sinePortrait";

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
    preset: "Purple",
    background: colorPreset("Purple").bg,
    foreground: colorPreset("Purple").fg,
  },
  {
    slug: "eric-thomas",
    name: "Eric Thomas",
    role: "Software Architect",
    handle: "Victoria, BC",
    href: "https://www.linkedin.com/in/eric-thomas-32985a4/",
    photo: ericThomas,
    photoFit: "center 20%",
    preset: "Orange",
    background: colorPreset("Orange").bg,
    foreground: colorPreset("Orange").fg,
  },
  {
    slug: "adam-whitcroft",
    name: "Adam Whitcroft",
    role: "Designer",
    handle: "@Owner",
    href: "https://x.com/AdamWhitcroft",
    photo: adamWhitcroft,
    photoFit: "center 28%",
    preset: "Blue",
    background: colorPreset("Blue").bg,
    foreground: colorPreset("Blue").fg,
  },
  {
    slug: "marcus-farrell",
    name: "Marcus Farrell",
    role: "Founding Designer",
    handle: "@Dub",
    href: "https://x.com/farrellmarcus",
    photo: marcusFarrell,
    photoFit: "center 30%",
    preset: "Green",
    background: colorPreset("Green").bg,
    foreground: colorPreset("Green").fg,
  },
] as const;

export type Judge = (typeof judges)[number];
