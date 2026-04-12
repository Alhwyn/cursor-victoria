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
  heroPrefix: "Cursor @",
  heroHand: "Victoria",
  heroSubline: "Community meetups and build nights on the island.",
} as const;

/** Edit blocks below to update the site. */
export const events: StoryBlock[] = [
  {
    label: "Spring 2026 · Victoria, BC",
    headline: "Meetup: an evening for builders.",
    hand: "Meetup",
    sublines: ["No themes. No tracks.", "Just build something you care about."],
    cta: { href: "https://luma.com/", label: "Register" },
  },
];

export const builds: StoryBlock[] = [
  {
    label: "What people are building",
    headline: "Research ops dashboard.",
    hand: "dashboard",
    sublines: [
      "From messy spreadsheets to one live view the team actually opens.",
    ],
  },
  {
    headline: "Deploy preview CLI.",
    hand: "CLI",
    sublines: ["Bun script + hosting API — every branch gets a link in Slack."],
  },
];
