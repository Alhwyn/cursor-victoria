import meetup01 from "./assets/meetup/01-hackathon.png";
import meetup02 from "./assets/meetup/02-stickers.png";
import meetup03 from "./assets/meetup/03-cafe.png";
import meetup04 from "./assets/meetup/04-cowork.png";
import meetup05 from "./assets/meetup/05-banner.png";
import harborMeetup from "./assets/harbor-meetup.png";
import workshopVenue from "./assets/workshop-venue.png";

/** Projects people have built — edit here to update the Inspiration page. */
export type InspirationProject = {
  id: string;
  title: string;
  builder: string;
  summary: string;
  track: string;
  href?: string;
  imageSrc: string;
  imageAlt: string;
  /** Taller / shorter cells for masonry rhythm */
  span: "short" | "medium" | "tall";
  featured?: boolean;
};

export const inspirationIntro = {
  label: "Inspiration",
  title: "Projects people have built",
  body: "A gallery of builds from the Cursor community — use them as sparks for what you ship at Codechella.",
} as const;

export const inspirationProjects: InspirationProject[] = [
  {
    id: "harbor-notes",
    title: "Harbor Notes",
    builder: "Maya Chen",
    summary: "Realtime shared notes for meetup tables, synced live with Convex.",
    track: "Convex",
    href: "https://www.convex.dev",
    imageSrc: harborMeetup,
    imageAlt: "Victoria harbour at dusk — Harbor Notes project visual",
    span: "tall",
    featured: true,
  },
  {
    id: "demo-coach",
    title: "Demo Coach",
    builder: "Jordan Lee",
    summary: "An agent that times your 3-minute demo and suggests tighter cuts.",
    track: "AI Agent",
    imageSrc: meetup01,
    imageAlt: "Builders watching a tech presentation on a large screen",
    span: "medium",
    featured: true,
  },
  {
    id: "sticker-radar",
    title: "Sticker Radar",
    builder: "Priya Nair",
    summary: "Scan event stickers, collect digital badges, and trade with other builders.",
    track: "Shipaton",
    imageSrc: meetup02,
    imageAlt: "Cursor stickers and enamel pin on a table",
    span: "short",
    featured: true,
  },
  {
    id: "cafe-cursor",
    title: "Cafe Cursor",
    builder: "Alex Rivera",
    summary: "Find open cowork tables nearby and drop a status for who is shipping what.",
    track: "Realtime",
    imageSrc: meetup03,
    imageAlt: "People gathering at a cafe meetup",
    span: "medium",
    featured: true,
  },
  {
    id: "pair-queue",
    title: "Pair Queue",
    builder: "Sam Okonkwo",
    summary: "Match solo builders into temporary pairs for the afternoon sprint.",
    track: "Convex",
    imageSrc: meetup04,
    imageAlt: "Coworking space during a build session",
    span: "tall",
    featured: true,
  },
  {
    id: "banner-bot",
    title: "Banner Bot",
    builder: "Riley Park",
    summary: "Voice-controlled slide captions for demos, powered by speech models.",
    track: "AI Agent",
    imageSrc: meetup05,
    imageAlt: "Cursor banner at a community event",
    span: "short",
    featured: true,
  },
  {
    id: "venue-scout",
    title: "Venue Scout",
    builder: "Casey Ng",
    summary: "Map quiet corners, power outlets, and mentor desks for the venue floor.",
    track: "Shipaton",
    imageSrc: workshopVenue,
    imageAlt: "Street facade of a workshop venue",
    span: "medium",
  },
  {
    id: "ship-log",
    title: "Ship Log",
    builder: "Taylor Brooks",
    summary: "A public feed of what broke, what shipped, and what you would try next.",
    track: "Community",
    imageSrc: meetup01,
    imageAlt: "Community presentation during a hackathon",
    span: "short",
  },
  {
    id: "mentor-ping",
    title: "Mentor Ping",
    builder: "Nina Volkov",
    summary: "Request a five-minute unblock from mentors without leaving your editor.",
    track: "Realtime",
    imageSrc: meetup04,
    imageAlt: "Builders working side by side in a cowork space",
    span: "medium",
  },
] as const;
