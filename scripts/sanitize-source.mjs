// scripts/sanitize-source.mjs
// Usage:
//   node scripts/sanitize-source.mjs src --check
//   node scripts/sanitize-source.mjs src --write
//   node scripts/sanitize-source.mjs src --check --report-chars
//
// What it fixes:
//  - Markdown fences/headings/hrules accidentally pasted into TS/TSX
//  - Markdown list markers (ordered/unordered) before TS keywords
//  - Zero-width chars + BOM + NBSP
//  - Smart quotes -> ASCII quotes
//
// Safe-guard: list-marker stripping only triggers when a TS keyword follows.

import { promises as fs } from "node:fs";
import path from "node:path";

const args = process.argv.slice(2);
const rootDir = args.find((a) => !a.startsWith("--")) ?? "src";
const write = args.includes("--write");
const check = args.includes("--check") || !write;
const reportChars = args.includes("--report-chars");

const EXTENSIONS = new Set([".ts", ".tsx"]);
const KEYWORDS =
  "(export|import|const|let|var|function|class|interface|type|enum|describe|it|test|expect|beforeAll|afterAll|beforeEach|afterEach)";

function shouldScan(filePath) {
  const ext = path.extname(filePath).toLowerCase();
  if (!EXTENSIONS.has(ext)) return false;
  const parts = filePath.split(path.sep);
  return !parts.includes("node_modules") && !parts.includes("dist") && !parts.includes("build") && !parts.includes(".next");
}

async function walk(dir) {
  const out = [];
  const entries = await fs.readdir(dir, { withFileTypes: true });
  for (const e of entries) {
    const p = path.join(dir, e.name);
    if (e.isDirectory()) out.push(...(await walk(p)));
    else out.push(p);
  }
  return out;
}

function normalizeQuotes(text) {
  return text
    .replace(/[\u201C\u201D]/g, '"') // “ ”
    .replace(/[\u2018\u2019]/g, "'"); // ‘ ’
}

function sanitize(text) {
  const original = text;
  let next = text;

  // 1) Invisibility / whitespace weirdness
  next = next
    .replace(/^\uFEFF/, "") // BOM at start
    .replace(/[\u200B\u200C\u200D\uFEFF]/g, "") // zero-width + stray BOM
    .replace(/\u00A0/g, " "); // NBSP -> normal space

  // 2) Smart quotes -> ASCII (often breaks import lines)
  next = normalizeQuotes(next);

  // 3) Remove Markdown code fences (standalone line)
  next = next.replace(/^\s*```[\w-]*\s*$/gm, "");

  // 4) Remove Markdown horizontal rules / headings (standalone-ish)
  next = next.replace(/^\s*(?:-{3,}|\*{3,}|_{3,})\s*$/gm, ""); // --- *** ___
  next = next.replace(/^\s*#{1,6}\s+.*$/gm, ""); // # Heading

  // 5) Remove Markdown unordered list markers ONLY when TS keyword follows
  // e.g. "- export ..." "* import ..." "+ const ..."
  next = next.replace(new RegExp(`^(\\s*)[-*+]\\s+(?=${KEYWORDS}\\b)`, "gm"), "$1");

  // 6) Remove Markdown ordered list markers ONLY when TS keyword follows
  // e.g. "1. export ..." "2) import ..."
  next = next.replace(new RegExp(`^(\\s*)\\d+[.)]\\s+(?=${KEYWORDS}\\b)`, "gm"), "$1");

  // 7) Remove common bullets/dashes ONLY when TS keyword follows
  // e.g. "• export ..." "– import ..." "— const ..."
  next = next.replace(new RegExp(`^(\\s*)[•●◦▪▫–—]\\s+(?=${KEYWORDS}\\b)`, "gm"), "$1");

  // 8) Remove blockquote prefix ONLY when TS keyword follows
  next = next.replace(new RegExp(`^(\\s*)>\\s+(?=${KEYWORDS}\\b)`, "gm"), "$1");

  // 9) Remove "File:" / "Path:" prefixes sometimes pasted from docs
  // e.g. "File: src/pages/..." directly above code
  next = next.replace(/^\s*(File|Path)\s*:\s*src\/.+\.(ts|tsx)\s*$/gim, "");

  return { changed: next !== original, text: next };
}

function findSuspiciousChars(text) {
  // Report common offenders: non-ascii excluding newlines/tabs, plus known invisibles.
  const offenders = [];
  const lines = text.split(/\r?\n/);
  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    for (let j = 0; j < line.length; j++) {
      const ch = line[j];
      const code = ch.codePointAt(0);
      if (
        code === 0xfeff ||
        code === 0x200b ||
        code === 0x200c ||
        code === 0x200d ||
        code === 0x00a0 ||
        code > 0x7f
      ) {
        offenders.push({
          line: i + 1,
          col: j + 1,
          ch,
          code: `U+${code.toString(16).toUpperCase().padStart(4, "0")}`,
        });
      }
    }
  }
  return offenders;
}

async function main() {
  const absRoot = path.resolve(process.cwd(), rootDir);
  const files = (await walk(absRoot)).filter(shouldScan);

  const changedFiles = [];
  for (const filePath of files) {
    const raw = await fs.readFile(filePath, "utf8");
    const { changed, text } = sanitize(raw);

    if (reportChars) {
      const offenders = findSuspiciousChars(raw);
      if (offenders.length) {
        console.log(`\n${path.relative(process.cwd(), filePath)}:`);
        for (const o of offenders.slice(0, 50)) {
          console.log(`  L${o.line}:C${o.col} ${o.code} "${o.ch}"`);
        }
        if (offenders.length > 50) console.log(`  ... +${offenders.length - 50} more`);
      }
    }

    if (changed) {
      changedFiles.push(filePath);
      if (write) await fs.writeFile(filePath, text, "utf8");
    }
  }

  if (check) {
    if (!changedFiles.length) {
      console.log("OK: no cleanups needed (based on current rules).");
    } else {
      console.log("Would change these files:");
      for (const f of changedFiles) console.log(` - ${path.relative(process.cwd(), f)}`);
      console.log("\nRun with --write to apply.");
    }
  } else {
    console.log(`Updated ${changedFiles.length} file(s).`);
  }
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});