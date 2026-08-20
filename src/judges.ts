import adamSyed from "./assets/judges/adam-syed.jpg";
import floGuo from "./assets/judges/flo-guo.jpg";
import jenniferJing from "./assets/judges/jennifer-jing.jpg";
import kennethKuh from "./assets/judges/kenneth-kuh.jpg";

export const judgesHeading = "Judges";

export const judges = [
  {
    slug: "adam-syed",
    name: "Adam Syed",
    role: "Designer",
    handle: "@Netflix",
    href: "https://syedadam.com/",
    photo: adamSyed,
    photoFit: "center 20%",
  },
  {
    slug: "flo-guo",
    name: "Flo Guo",
    role: "Founding Designer",
    handle: "@Paradigm",
    href: "https://www.floguo.com/",
    photo: floGuo,
    photoFit: "center 30%",
  },
  {
    slug: "kenneth-kuh",
    name: "Kenneth Kuh",
    role: "Designer",
    handle: "@Cursor",
    href: "https://kennethkuh.info/",
    photo: kennethKuh,
    photoFit: "center 28%",
  },
  {
    slug: "jennifer-jing",
    name: "Jennifer Jing",
    role: "Designer",
    handle: "@YouTube",
    href: "https://jenniferjing.com/",
    photo: jenniferJing,
    photoFit: "center 18%",
  },
] as const;

export type Judge = (typeof judges)[number];
