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
    "Build something you've always wished existed, solo or in a team of up to four.",
  ],
} as const;

export const schedule = [
  { time: "10:00 am", label: "Doors open + check-in" },
  { time: "10:15 am", label: "Kickoff" },
  { time: "10:20 am", label: "Keynotes" },
  { time: "10:35 am", label: "Hacking begins" },
  { time: "10:45 - 11:05 am", label: "How to use Convex (20 min)" },
  { time: "11:05 - 11:25 am", label: "How to use Solana (20 min)" },
  { time: "12:30 pm", label: "Lunch served" },
  { time: "5:00 pm", label: "Hard stop (coding ends)" },
  { time: "5:00 - 5:45 pm", label: "Judging + demos (mandatory for prizes)" },
  { time: "5:45 - 6:00 pm", label: "Winners announced + closing" },
  { time: "6:00 pm", label: "Event ends" },
] as const;

export const tracks = [
  {
    name: "Convex",
    detail:
      "Best project built with Convex: realtime backend, database, auth, or functions.",
    prizes: "1st $1,000 · 2nd $500",
  },
  {
    name: "Solana",
    detail:
      "Best project built with Solana: onchain apps, wallets, payments, or agent tooling on Solana.",
    prizes: "$500",
  },
  {
    name: "Best AI Agent Application",
    detail:
      "Best project using GMI Cloud: deploy a model and build an agent with voice, integrations, or workflows.",
    prizes: "$500",
  },
  {
    name: "Shipaton",
    detail:
      "Best mobile app built and shipped during Codechella. Shippy trophy, exclusive swag, and a path into the main Shipaton prizes.",
    prizes: "Trophy + swag + Shipaton entry",
  },
] as const;

export const perks = [
  "$20 Cursor credits",
  "$10 GMI Cloud credits",
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
] as const;

export const faq = [
  {
    q: "Is it free?",
    a: "Yes. Participation is free. Space is limited and registration requires approval.",
  },
  {
    q: "Do I need to learn how to code?",
    a: "Why learn to code when you have artificial intelligence? Bring an idea and ship with AI.",
  },
  {
    q: "Do I need to use Cursor?",
    a: "No. You can use any coding agent you like.",
  },
  {
    q: "Do I need a team?",
    a: "No. Come solo or with up to four people. You’ll meet builders on the day.",
  },
  {
    q: "What should I bring?",
    a: "A laptop, chargers, and an idea you’ve been meaning to ship. Mentors and snacks are on site.",
  },
  {
    q: "Where is it?",
    a: "Victoria, BC. The exact venue is shared after your registration is approved.",
  },
] as const;
