import meetup01 from "./assets/meetup/01-hackathon.png";
import meetup02 from "./assets/meetup/02-stickers.png";
import meetup03 from "./assets/meetup/03-cafe.png";
import meetup04 from "./assets/meetup/04-cowork.png";
import meetup05 from "./assets/meetup/05-banner.png";
import harborMeetup from "./assets/harbor-meetup.png";
import workshopVenue from "./assets/workshop-venue.png";
import parliamentOutdoor from "./assets/parliament-outdoor-impressionist-oil-no-figure.png";

/** Inspiration gallery items — edit here to update /inspiration. */
export type InspirationItem = {
  id: string;
  /** Short label under the image (like city names on cursor.com/community). */
  label: string;
  href?: string;
  imageSrc: string;
  imageAlt: string;
};

export const inspirationIntro = {
  title: "Get inspired by what people have built.",
  body: "Explore demos and ships from the Cursor community — sparks for what you might build at Codechella.",
  primaryCta: {
    label: "Meet the community",
    hrefKey: "communityUrl" as const,
  },
  secondaryCta: {
    label: "Participate",
    hrefKey: "rsvpUrl" as const,
  },
} as const;

export const inspirationItems: InspirationItem[] = [
  {
    id: "harbor-notes",
    label: "Harbor Notes",
    href: "https://www.convex.dev",
    imageSrc: harborMeetup,
    imageAlt: "Victoria harbour at dusk — Harbor Notes",
  },
  {
    id: "demo-coach",
    label: "Demo Coach",
    href: "https://cursor.com",
    imageSrc: meetup01,
    imageAlt: "Builders watching a tech presentation",
  },
  {
    id: "cafe-cursor",
    label: "Cafe Cursor",
    href: "https://luma.com/tenfold",
    imageSrc: meetup03,
    imageAlt: "People gathering at a cafe meetup",
  },
  {
    id: "pair-queue",
    label: "Pair Queue",
    href: "https://www.convex.dev",
    imageSrc: meetup04,
    imageAlt: "Coworking space during a build session",
  },
  {
    id: "sticker-radar",
    label: "Sticker Radar",
    imageSrc: meetup02,
    imageAlt: "Cursor stickers and enamel pin on a table",
  },
  {
    id: "banner-bot",
    label: "Banner Bot",
    imageSrc: meetup05,
    imageAlt: "Cursor banner at a community event",
  },
  {
    id: "venue-scout",
    label: "Venue Scout",
    href: "https://luma.com/cursorvictoria",
    imageSrc: workshopVenue,
    imageAlt: "Street facade of a workshop venue",
  },
  {
    id: "ship-log",
    label: "Ship Log",
    imageSrc: meetup01,
    imageAlt: "Community presentation during a hackathon",
  },
  {
    id: "parliament-sketch",
    label: "Victoria",
    href: "https://x.com/alhwynn",
    imageSrc: parliamentOutdoor,
    imageAlt: "Impressionist sketch of Victoria parliament outdoors",
  },
] as const;
