import { expect, test } from "bun:test";
import { judges, judgesHeading } from "./judges";
import { COLOR_PRESETS, colorPreset } from "./sinePortrait";

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

test("each judge has copy, a profile photo, a public link, and a portrait tone", () => {
  for (const judge of judges) {
    expect(judge.role.length).toBeGreaterThan(0);
    expect(judge.handle.length).toBeGreaterThan(0);
    expect(judge.href.startsWith("https://")).toBe(true);
    expect(judge.photo.length).toBeGreaterThan(0);
    expect(judge.background).toMatch(/^#[0-9A-Fa-f]{6}$/);
    expect(judge.foreground).toMatch(/^#[0-9A-Fa-f]{6}$/);
  }
});

test("portraits use official sine-wave color presets", () => {
  expect(COLOR_PRESETS.map(preset => preset.name)).toEqual([
    "Blue",
    "Orange",
    "Tan",
    "Purple",
    "Green",
  ]);
  expect(judges.map(judge => judge.preset)).toEqual([
    "Purple",
    "Orange",
    "Blue",
    "Green",
  ]);
  for (const judge of judges) {
    const preset = colorPreset(judge.preset);
    expect(judge.foreground).toBe(preset.fg);
    expect(judge.background).toBe(preset.bg);
  }
});
