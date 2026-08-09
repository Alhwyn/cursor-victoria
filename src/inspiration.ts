import meetup01 from "./assets/meetup/01-hackathon.png";
import meetup02 from "./assets/meetup/02-stickers.png";
import meetup03 from "./assets/meetup/03-cafe.png";
import meetup04 from "./assets/meetup/04-cowork.png";
import meetup05 from "./assets/meetup/05-banner.png";
import harborMeetup from "./assets/harbor-meetup.png";
import workshopVenue from "./assets/workshop-venue.png";
import parliamentOutdoor from "./assets/parliament-outdoor-impressionist-oil-no-figure.png";
import alhwynAvatar from "./assets/alhwyn-avatar.png";

/** Inspiration Board items — edit here to update /inspiration. */
export type InspirationItem = {
  id: string;
  /** Short caption under the media (tweet-style description). */
  description: string;
  builder: string;
  /** Optional avatar image; falls back to initials. */
  avatarSrc?: string;
  /** Link to the demo, tweet, or project. */
  href: string;
  imageSrc: string;
  imageAlt: string;
};

export const inspirationIntro = {
  title: "Inspiration Board",
  body: "Here are some cool demos/ships we came across, we wanted to share with you as a source of inspo for what you might ship.",
} as const;

export const inspirationItems: InspirationItem[] = [
  {
    id: "harbor-notes",
    description:
      "Realtime shared notes for meetup tables — open a board, drop a thought, watch the room sync live.",
    builder: "Maya Chen",
    href: "https://www.convex.dev",
    imageSrc: harborMeetup,
    imageAlt: "Victoria harbour at dusk",
  },
  {
    id: "demo-coach",
    description:
      "An agent that times your 3-minute demo and suggests tighter cuts before you get on stage.",
    builder: "Jordan Lee",
    href: "https://cursor.com",
    imageSrc: meetup01,
    imageAlt: "Builders watching a tech presentation",
  },
  {
    id: "sticker-radar",
    description:
      "Scan event stickers, collect digital badges, and trade them with other builders on the floor.",
    builder: "Priya Nair",
    href: "https://cursor.com",
    imageSrc: meetup02,
    imageAlt: "Cursor stickers and enamel pin on a table",
  },
  {
    id: "cafe-cursor",
    description:
      "Find open cowork tables nearby and drop a status for who is shipping what.",
    builder: "Alex Rivera",
    href: "https://luma.com/tenfold",
    imageSrc: meetup03,
    imageAlt: "People gathering at a cafe meetup",
  },
  {
    id: "pair-queue",
    description:
      "Match solo builders into temporary pairs for the afternoon sprint. You can just make software with someone new.",
    builder: "Sam Okonkwo",
    href: "https://www.convex.dev",
    imageSrc: meetup04,
    imageAlt: "Coworking space during a build session",
  },
  {
    id: "banner-bot",
    description:
      "Voice-controlled slide captions for demos — talk through your build and the deck keeps up.",
    builder: "Riley Park",
    href: "https://cursor.com",
    imageSrc: meetup05,
    imageAlt: "Cursor banner at a community event",
  },
  {
    id: "venue-scout",
    description:
      "Map quiet corners, power outlets, and mentor desks for the venue floor so you stop wandering mid-debug.",
    builder: "Casey Ng",
    href: "https://luma.com/cursorvictoria",
    imageSrc: workshopVenue,
    imageAlt: "Street facade of a workshop venue",
  },
  {
    id: "ship-log",
    description:
      "A public feed of what broke, what shipped, and what you would try next. Built for demo day energy.",
    builder: "Taylor Brooks",
    href: "https://cursor.com",
    imageSrc: meetup01,
    imageAlt: "Community presentation during a hackathon",
  },
  {
    id: "mentor-ping",
    description:
      "Request a five-minute unblock from mentors without leaving your editor.",
    builder: "Nina Volkov",
    href: "https://www.convex.dev",
    imageSrc: meetup04,
    imageAlt: "Builders working side by side in a cowork space",
  },
  {
    id: "parliament-sketch",
    description:
      "Weekend experiments turning Victoria landmarks into generative postcards for hackathon swag.",
    builder: "Alhwyn",
    avatarSrc: alhwynAvatar,
    href: "https://x.com/alhwynn",
    imageSrc: parliamentOutdoor,
    imageAlt: "Impressionist sketch of Victoria parliament outdoors",
  },
] as const;
