import { mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { join } from "node:path";

// The one-line review: 47 tabs open, the same question twice, and the
// Wi-Fi takes the blame — four stars, because the snacks are good.
const LINE =
  "Leaves 47 tabs open, asks me the same question twice, then blames the Wi-Fi. Four stars — the snacks are good.";

const outDir = process.env.MAKEFUN_OUTPUT_DIR ?? "/output";
mkdirSync(outDir, { recursive: true });
const outPath = join(outDir, "entry.txt");
writeFileSync(outPath, LINE, "utf8");
console.log(`Wrote ${[...LINE].length} characters to ${outPath}`);

// Read-back self-check: the file must hold exactly the line, one line of
// 1 to 200 characters, valid UTF-8, not only white space.
const back = readFileSync(outPath, "utf8");
if (back !== LINE) throw new Error("read-back mismatch: entry.txt differs from the line");
if ([...back].length < 1 || [...back].length > 200)
  throw new Error("gate failed: entry.txt is outside 1 to 200 characters");
if (!/\S/.test(back)) throw new Error("gate failed: entry.txt is only white space");
console.log("Self-check passed: 1 line, 110 characters");
