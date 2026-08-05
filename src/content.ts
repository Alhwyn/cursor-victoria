/** Cursor Codechella @ Victoria — edit here to update the site. */

export const site = {
  title: "Cursor · Codechella",
  description:
    "A one-day hackathon in Victoria, BC for builders who want to ship something real.",
  rsvpUrl: "https://luma.com/cursorvictoria",
  communityUrl: "https://luma.com/tenfold",
  location: "Victoria, BC",
  date: "August 22, 2026",
  dateShort: "Aug 22, 2026",
  capacity: "150–200 builders",
  footer: {
    builtBy: "Alhwyn",
    builtByUrl: "https://x.com/alhwynn",
    communityLabel: "Tenfold",
    communityUrl: "https://luma.com/tenfold",
  },
} as const;

export const about = {
  lead: "Codechella brings builders together for one day of shipping in Victoria.",
  body: [
    "This is not a demo-day hackathon. We are not optimizing for polished UIs, slide decks, or pitch theatrics. We care about what you tried to build, what broke, and what actually shipped.",
    "Build something you've always wished existed — solo or in a team of up to four.",
  ],
} as const;

export const schedule = [
  { time: "9:00 am", label: "Doors open" },
  { time: "9:30 am", label: "Keynotes" },
  { time: "10:00 am", label: "Hacking begins" },
  { time: "5:30 pm", label: "Hard stop" },
  { time: "6:00 pm", label: "Demos" },
  { time: "7:30 pm", label: "Winners announced" },
] as const;

export const tracks = [
  {
    name: "Convex",
    detail:
      "Best project built with Convex — realtime backend, database, auth, or functions.",
    prizes: "1st $1,000 · 2nd $500",
  },
  {
    name: "Best AI Agent",
    detail:
      "Best project using GMI Cloud — deploy a model and build an agent with voice, integrations, or workflows.",
    prizes: "$500",
  },
  {
    name: "Shipaton × RevenueCat",
    detail:
      "Best mobile app built and shipped during Codechella. Includes Shippy trophy, swag, and a path into the main Shipaton prizes.",
    prizes: "Trophy + swag + Shipaton entry",
  },
] as const;

export const perks = [
  "$20 Cursor credits",
  "100K ElevenLabs credits",
  "$100 Render credits",
  "3 months WhisprFlow",
  "$50 Exa credits",
  "10,000 Firecrawl credits",
  "Snacks & drinks",
  "Limited edition swag",
  "Mentors all day",
] as const;

export const who = [
  "Have an idea you've never had time to build",
  "Care about shipping something that looks and works",
  "Want a full day making something real",
  "Curious — expertise optional",
] as const;
