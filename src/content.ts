/** One hero-style block (matches cursorwaterloo.com story panels). */
export type StoryBlock = {
  /** Small gray label, e.g. season or date */
  label?: string;
  headline: string;
  /** Substring of `headline` rendered in Gochi Hand */
  hand?: string;
  /** Large neutral-400 lines under the headline */
  sublines: string[];
  cta?: { href: string; label: string };
  imageSrc?: string;
  imageAlt?: string;
};

export const site = {
  heroHand: "Victoria, BC",
  heroSubline: "Victoria, BC",
} as const;

/** Edit blocks below to update the site. */
export const events: StoryBlock[] = [
  {
    headline: "Upcoming: Cursor Victoria Workshop",
    hand: "Upcoming",
    sublines: [],
    cta: { href: "https://luma.com/event/evt-QzyP9blthoOHmqz", label: "Register" },
  },
];
