import { expect, test } from "bun:test";
import { officialWorkingSize } from "./sinePortrait";
import { judges, judgesHeading } from "./judges";

test("lists the four Codechella judges", () => {
  expect(judgesHeading).toBe("Judges");
  expect(judges).toHaveLength(4);
  expect(judges.map(judge => judge.name)).toEqual([
    "Simon Stern",
    "Eric Thomas",
    "Adam Whitcroft",
    "Marcus Farrell",
  ]);
  expect(judges.map(judge => judge.href)).toEqual([
    "https://x.com/SimiStern",
    "https://www.linkedin.com/in/eric-thomas-32985a4/",
    "https://x.com/AdamWhitcroft",
    "https://x.com/farrellmarcus",
  ]);
});

test("each judge has copy, a processed portrait PNG, and a public link", () => {
  for (const judge of judges) {
    expect(judge.role.length).toBeGreaterThan(0);
    expect(judge.handle.length).toBeGreaterThan(0);
    expect(judge.href.startsWith("https://")).toBe(true);
    expect(judge.photo.length).toBeGreaterThan(0);
    expect(judge.photo).toContain(".png");
    expect(judge.background).toMatch(/^#[0-9A-Fa-f]{6}$/);
    expect(judge.foreground).toMatch(/^#[0-9A-Fa-f]{6}$/);
  }
});

test("Simon Stern is from Superteam Solana", () => {
  const simon = judges.find(judge => judge.slug === "simon-stern");
  expect(simon?.name).toBe("Simon Stern");
  expect(simon?.role).toBe("Superteam Solana");
  expect(simon?.handle).not.toBe("@Apricot");
});

test("Adam Whitcroft uses official Blue, never purple", () => {
  const adam = judges.find(judge => judge.slug === "adam-whitcroft");
  expect(adam?.preset).toBe("Blue");
  expect(adam?.foreground).toBe("#6b8cff");
  expect(adam?.background).toBe("#e8ecf5");
  expect(adam?.foreground.toLowerCase()).not.toBe("#a78bfa");
});

test("official sine-wave export keeps a square source square", () => {
  expect(officialWorkingSize(460, 460)).toEqual({ width: 1000, height: 1000 });
});

test("Adam portrait PNG is the official sinwave export", async () => {
  const bytes = new Uint8Array(await Bun.file("src/assets/judges/adam-whitcroft-sinwave.png").arrayBuffer());
  expect(bytes[0]).toBe(0x89);
  const width = new DataView(bytes.buffer, bytes.byteOffset, bytes.byteLength).getUint32(16);
  const height = new DataView(bytes.buffer, bytes.byteOffset, bytes.byteLength).getUint32(20);
  expect(width).toBe(800);
  expect(height).toBe(1000);
});

test("portraits follow the official sinwave exports", () => {
  expect(judges.map(judge => judge.preset)).toEqual([
    "Green",
    "Orange",
    "Blue",
    "Green",
  ]);
  expect(judges.map(judge => judge.foreground)).toEqual([
    "#4ade80",
    "#ff6b35",
    "#6b8cff",
    "#4ade80",
  ]);
});
