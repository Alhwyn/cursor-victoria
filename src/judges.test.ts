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

test("each judge has copy, a profile photo, and a public link", () => {
  for (const judge of judges) {
    expect(judge.role.length).toBeGreaterThan(0);
    expect(judge.handle.length).toBeGreaterThan(0);
    expect(judge.href.startsWith("https://")).toBe(true);
    expect(judge.photo.length).toBeGreaterThan(0);
  }
});
