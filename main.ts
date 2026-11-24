import { writeFileSync, mkdirSync } from "node:fs";
import { join } from "node:path";

const ENTRY =
  "You left it on the floor. The floor is mine. Everything on the floor is mine. Honestly, you practically served it to me.";

const outDir = process.env.MAKEFUN_OUTPUT_DIR;
if (!outDir) {
  throw new Error("MAKEFUN_OUTPUT_DIR is not set");
}

// Self-check: the gate requires UTF-8 text of 1-200 chars, a single line.
const chars = [...ENTRY].length;
if (chars < 1 || chars > 200) {
  throw new Error(`entry is ${chars} chars, outside the 1-200 gate`);
}
if (ENTRY.includes("\n") || ENTRY.trim() !== ENTRY) {
  throw new Error("entry must be a single line with no surrounding whitespace");
}

mkdirSync(outDir, { recursive: true });
const entryPath = join(outDir, "entry.txt");
writeFileSync(entryPath, ENTRY, "utf8");
