import { describe, expect, it } from "vitest";
import { getDailyPuzzle } from "./dailyPuzzle";

describe("getDailyPuzzle", () => {
  it("returns the same puzzle throughout one UTC day", () => {
    const early = getDailyPuzzle(
      new Date("2026-10-27T00:00:00Z"),
    );

    const late = getDailyPuzzle(
      new Date("2026-10-27T23:59:59Z"),
    );

    expect(early.id).toBe(late.id);
  });

  it("changes the phrase at UTC midnight", () => {
    const before = getDailyPuzzle(
      new Date("2026-10-27T23:59:59Z"),
    );

    const after = getDailyPuzzle(
      new Date("2026-10-28T00:00:00Z"),
    );

    expect(before.phrase.id).not.toBe(after.phrase.id);
  });

  it("treats equivalent timezone representations identically", () => {
    const offsetTime = getDailyPuzzle(
      new Date("2026-10-28T01:30:00+02:00"),
    );

    const utcTime = getDailyPuzzle(
      new Date("2026-10-27T23:30:00Z"),
    );

    expect(offsetTime.id).toBe(utcTime.id);
  });

  it("rejects an invalid date", () => {
    expect(() => getDailyPuzzle(new Date("invalid"))).toThrow(
      "invalid date",
    );
  });
});