import adamWhitcroft from "./assets/judges/adam-whitcroft.jpg";
import ericThomas from "./assets/judges/eric-thomas.jpg";
import marcusFarrell from "./assets/judges/marcus-farrell.jpg";
import simonStern from "./assets/judges/simon-stern.jpg";

export const judgesHeading = "Thanks to our judges";

export const judges = [
  {
    slug: "eric-thomas",
    name: "Eric Thomas",
    org: "Software Architect",
    href: "https://www.linkedin.com/in/eric-thomas-32985a4",
    photo: ericThomas,
    background: "#F4C4A8",
    foreground: "#E24E1B",
  },
  {
    slug: "adam-whitcroft",
    name: "Adam Whitcroft",
    org: "Owner.com",
    href: "https://x.com/AdamWhitcroft",
    photo: adamWhitcroft,
    background: "#C5E8A8",
    foreground: "#3D8F3A",
  },
  {
    slug: "marcus-farrell",
    name: "Marcus Farrell",
    org: "Dub",
    href: "https://www.linkedin.com/in/farrellmarcus",
    photo: marcusFarrell,
    background: "#D4C4F0",
    foreground: "#7B5CB5",
  },
  {
    slug: "simon-stern",
    name: "Simon Stern",
    org: "Apricot Studios",
    href: "https://x.com/SimiStern",
    photo: simonStern,
    background: "#A8D8D4",
    foreground: "#2A8A82",
  },
] as const;
