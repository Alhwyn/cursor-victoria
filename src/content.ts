import workshopVenue from "./assets/workshop-venue.png";

/** One hero-style block (matches cursorwaterloo.com story panels). */
export type StoryBlock = {
  /** Small gray label, e.g. season or date */
  label?: string;
  headline: string;
  /**
   * Substring of `headline` rendered in Gochi Hand.
   * If it matches the start of `headline` and `sublines` are set, order is: hand line, rest of title, then sublines.
   */
  hand?: string;
  /** Large neutral-400 lines under the headline */
  sublines: string[];
  /** `body` = text-base font-medium (e.g. date); default = large display lines */
  sublinesVariant?: "display" | "body";
  cta?: { href: string; label: string };
  imageSrc?: string;
  imageAlt?: string;
  /** Bottom gradient caption on the image (shown on hover, not a link) */
  imageOverlay?: string;
};

export const site = {
  heroHand: "VICTORIA, BC",
  /** Section heading above the first upcoming event card (matches “Past events” styling in App). */
  upcomingEventsHeading: "Upcoming events",
  footer: {
    partnerUrl: "https://victoria-tech-week.vercel.app/",
    ctaTenfoldUrl: "https://luma.com/tenfold",
    ctaLead: "Looking for a similar event in Victoria, BC?",
    ctaHighlight: "Join Tenfold",
  },
} as const;

/** Edit blocks below to update the site. */
export const events: StoryBlock[] = [
  {
    headline: "Cursor Victoria Workshop",
    sublines: ["Wednesday, April 15 9:00 a.m. - 12:00 p.m."],
    sublinesVariant: "body",
    cta: { href: "https://luma.com/event/evt-QzyP9blthoOHmqz", label: "Register" },
    imageSrc: workshopVenue,
    imageAlt:
      "Impressionistic oil-painting style illustration of the workshop venue street facade, soft light and pastel tones",
    imageOverlay: "Cursor Victoria Workshop",
  },
];
