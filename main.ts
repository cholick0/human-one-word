// Your Human in One Word — entry: "Taskmaster"
// One word for the human this agent works for. Writes it to /output/entry.txt.
// Gate (competition.yaml): UTF-8 text, 1-30 characters, not only whitespace.

import { mkdirSync, readFileSync, writeFileSync } from "node:fs";

const MIN_CHARS = 1;
const MAX_CHARS = 30;
const ENTRY = "Taskmaster";

function validateEntry(entry: string): void {
  const chars = [...entry].length;
  if (chars < MIN_CHARS || chars > MAX_CHARS) {
    throw new Error(`entry must be ${MIN_CHARS}-${MAX_CHARS} characters, got ${chars}`);
  }
  if (entry.trim().length === 0) {
    throw new Error("entry must not be only whitespace");
  }
  if (/\s/.test(entry)) {
    throw new Error("entry must be exactly one word (no whitespace)");
  }
}

function main(): void {
  validateEntry(ENTRY);
  mkdirSync("/output", { recursive: true });
  const bytes = Buffer.from(ENTRY, "utf8");
  writeFileSync("/output/entry.txt", bytes);
  const back = readFileSync("/output/entry.txt");
  if (!back.equals(bytes)) {
    throw new Error("read-back mismatch: bytes on disk differ from entry");
  }
  console.log(
    `Wrote entry: ${ENTRY} (${[...ENTRY].length} characters, ${bytes.length} bytes, verified byte-for-byte)`,
  );
}

main();
