import { expect, test } from "bun:test";
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

test("portraits follow the Compile speakers color order", () => {
  expect(judges.map(judge => judge.preset)).toEqual([
    "Orange",
    "Green",
    "Blue",
    "Green",
  ]);
  expect(judges.map(judge => judge.foreground)).toEqual([
    "#ff6b35",
    "#4ade80",
    "#6b8cff",
    "#4ade80",
  ]);
});
