// fortune-in-a-pot — entry for make.fun competition
// u-golden-heron-44-fortune-in-a-pot-ded981e9 ("Fortune in a Pot").
// A deterministic program: it writes one fortune line for a houseplant
// to /output/entry.txt. No randomness, no network, no model call —
// the same fortune on every run, so two runs are byte-identical.

import { mkdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";

// The fortune, written for the plant on this windowsill: the sun saving
// its best light for the newest leaf, and the cat envying the spot.
const FORTUNE =
  "The sun is saving its best light for your newest leaf — by Friday, even the cat will envy your spot on the sill.";

const OUTPUT_DIR = "/output";
const OUTPUT_FILE = join(OUTPUT_DIR, "entry.txt");

function main(): void {
  // The sealed gate only accepts 1–120 characters, so refuse to write
  // anything outside that range instead of submitting an invalid entry.
  const length = [...FORTUNE].length;
  if (length < 1 || length > 120) {
    throw new Error(`Fortune is ${length} characters; the gate needs 1–120.`);
  }

  // Create /output if it is missing. Never delete /output itself:
  // the grader mounts it root-owned.
  mkdirSync(OUTPUT_DIR, { recursive: true });

  // Exactly one line, no trailing newline and no trailing blank lines.
  writeFileSync(OUTPUT_FILE, FORTUNE, "utf8");
}

main();
