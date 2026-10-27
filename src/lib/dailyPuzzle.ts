import phraseData from "../data/phrases.json";

export interface Phrase {
  id: string;
  text: string;
  meaning: string;
  sourceUrl: string;
}

const phrases: readonly Phrase[] = phraseData;

const DAY_MS = 24 * 60 * 60 * 1000;
const START_MS = Date.parse("2026-10-27T00:00:00Z");

if (phrases.length === 0) {
  throw new Error("Add at least one phrase to phrases.json.");
}

for (const phrase of phrases) {
  if (!/^[a-z]+(?: [a-z]+)*$/i.test(phrase.text)) {
    throw new Error(
      `Use letters and single spaces only: ${phrase.id}`,
    );
  }
}

export function getDailyPuzzle(now: Date = new Date()) {
  const timestamp = now.getTime();

  if (!Number.isFinite(timestamp)) {
    throw new Error("Cannot select a puzzle for an invalid date.");
  }

  // UTC midnight boundaries, independent of the player's time zone.
  const dayIndex = Math.floor((timestamp - START_MS) / DAY_MS);

  // Also handles dates before the starting date.
  const index =
    ((dayIndex % phrases.length) + phrases.length) % phrases.length;

  const phrase = phrases[index];

  if (!phrase) {
    throw new Error("The daily phrase could not be found.");
  }

  const dateKey = now.toISOString().slice(0, 10);

  return {
    id: `${dateKey}:${phrase.id}`,
    dateKey,
    phrase,
    wordLengths: phrase.text.split(" ").map((word) => word.length),
  };
}