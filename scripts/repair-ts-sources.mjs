// scripts/repair-ts-sources.mjs
// Usage:
//   node scripts/repair-ts-sources.mjs src --check
//   node scripts/repair-ts-sources.mjs src --write --backup
//   node scripts/repair-ts-sources.mjs src --check --verbose
//
// What it fixes:
// - UTF-16LE/UTF-16BE encoded TS/TSX (common cause of TS1127/TS1434 explosions)
// - NUL bytes / BOM / zero-width / NBSP
// - Smart quotes
// - Markdown fences/headings/hrules accidentally pasted into code
// - Markdown list markers before TS keywords (e.g. "- export ...", "1. import ...")
//
// Notes:
// - Safe-guard: list-marker stripping only triggers when a TS keyword follows.
// - Writes UTF-8 only.

import { promises as fs } from "node:fs";
import path from "node:path";
import { TextDecoder } from "node:util";

const args = process.argv.slice(2);
const rootDir = args.find((a) => !a.startsWith("--")) ?? "src";

const write = args.includes("--write");
const check = args.includes("--check") || !write;
const backup = args.includes("--backup");
const verbose = args.includes("--verbose");

const EXTENSIONS = new Set([".ts", ".tsx"]);
const KEYWORDS =
  "(export|import|const|let|var|function|class|interface|type|enum|describe|it|test|expect|beforeAll|afterAll|beforeEach|afterEach)";

function shouldScan(filePath) {
  const ext = path.extname(filePath).toLowerCase();
  if (!EXTENSIONS.has(ext)) return false;
  const parts = filePath.split(path.sep);
  return (
    !parts.includes("node_modules") &&
    !parts.includes("dist") &&
    !parts.includes("build") &&
    !parts.includes(".next")
  );
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

function countNulBytes(buf) {
  let c = 0;
  for (let i = 0; i < buf.length; i++) if (buf[i] === 0x00) c++;
  return c;
}

function detectUtf16(buf) {
  if (buf.length < 2) return { kind: "utf8", confidence: 0 };

  const b0 = buf[0];
  const b1 = buf[1];

  // BOM detection
  if (b0 === 0xff && b1 === 0xfe) return { kind: "utf16le", confidence: 1 };
  if (b0 === 0xfe && b1 === 0xff) return { kind: "utf16be", confidence: 1 };

  // Heuristic detection: lots of NUL bytes implies UTF-16-ish
  const nulCount = countNulBytes(buf);
  const nulRatio = nulCount / buf.length;
  if (nulRatio < 0.1) return { kind: "utf8", confidence: 0 };

  // Determine endianness by where NULs appear more often
  let nulEven = 0;
  let nulOdd = 0;
  for (let i = 0; i < buf.length; i++) {
    if (buf[i] === 0x00) {
      if (i % 2 === 0) nulEven++;
      else nulOdd++;
    }
  }

  if (nulOdd > nulEven * 1.2) return { kind: "utf16le", confidence: nulRatio };
  if (nulEven > nulOdd * 1.2) return { kind: "utf16be", confidence: nulRatio };

  // Ambiguous: treat as utf16le if very NUL-heavy
  if (nulRatio > 0.25) return { kind: "utf16le", confidence: nulRatio };

  return { kind: "utf8", confidence: 0 };
}

function decodeBuffer(buf) {
  const det = detectUtf16(buf);

  if (det.kind === "utf16le") {
    const dec = new TextDecoder("utf-16le", { fatal: false });
    return { text: dec.decode(buf), encoding: "utf16le", confidence: det.confidence };
  }

  if (det.kind === "utf16be") {
    // swap bytes to LE then decode
    const swapped = Buffer.allocUnsafe(buf.length);
    for (let i = 0; i + 1 < buf.length; i += 2) {
      swapped[i] = buf[i + 1];
      swapped[i + 1] = buf[i];
    }
    if (buf.length % 2 === 1) swapped[buf.length - 1] = buf[buf.length - 1];
    const dec = new TextDecoder("utf-16le", { fatal: false });
    return { text: dec.decode(swapped), encoding: "utf16be", confidence: det.confidence };
  }

  const dec = new TextDecoder("utf-8", { fatal: false });
  return { text: dec.decode(buf), encoding: "utf8", confidence: det.confidence };
}

function normalizeQuotes(text) {
  return text
    .replace(/[\u201C\u201D]/g, '"') // “ ”
    .replace(/[\u2018\u2019]/g, "'"); // ‘ ’
}

function sanitize(text) {
  const original = text;
  let next = text;

  // NUL chars occasionally survive bad decodes
  next = next.replace(/\u0000/g, "");

  // Invisibles / whitespace weirdness
  next = next
    .replace(/^\uFEFF/, "") // BOM at start (as char)
    .replace(/[\u200B\u200C\u200D\uFEFF]/g, "") // zero-width + stray BOM
    .replace(/\u00A0/g, " "); // NBSP -> normal space

  next = normalizeQuotes(next);

  // Remove Markdown fences (standalone lines)
  next = next.replace(/^\s*```[\w-]*\s*$/gm, "");

  // Remove Markdown hrules/headings
  next = next.replace(/^\s*(?:-{3,}|\*{3,}|_{3,})\s*$/gm, "");
  next = next.replace(/^\s*#{1,6}\s+.*$/gm, "");

  // Unordered list markers ONLY if TS keyword follows
  next = next.replace(new RegExp(`^(\\s*)[-*+]\\s+(?=${KEYWORDS}\\b)`, "gm"), "$1");

  // Ordered list markers ONLY if TS keyword follows
  next = next.replace(new RegExp(`^(\\s*)\\d+[.)]\\s+(?=${KEYWORDS}\\b)`, "gm"), "$1");

  // Bullets/dashes ONLY if TS keyword follows
  next = next.replace(new RegExp(`^(\\s*)[•●◦▪▫–—]\\s+(?=${KEYWORDS}\\b)`, "gm"), "$1");

  // Blockquote ONLY if TS keyword follows
  next = next.replace(new RegExp(`^(\\s*)>\\s+(?=${KEYWORDS}\\b)`, "gm"), "$1");

  // Common doc-paste headers
  next = next.replace(/^\s*(File|Path)\s*:\s*src\/.+\.(ts|tsx)\s*$/gim, "");

  return { changed: next !== original, text: next };
}

async function main() {
  const absRoot = path.resolve(process.cwd(), rootDir);
  const files = (await walk(absRoot)).filter(shouldScan);

  const changed = [];
  const encodingFixed = [];
  const sanitized = [];

  for (const filePath of files) {
    const buf = await fs.readFile(filePath);
    const decoded = decodeBuffer(buf);

    const before = decoded.text;
    const afterSan = sanitize(before);

    const encodingWasNotUtf8 = decoded.encoding !== "utf8";
    const sanitationChanged = afterSan.changed;

    if (encodingWasNotUtf8 || sanitationChanged) {
      changed.push(filePath);
      if (encodingWasNotUtf8) encodingFixed.push({ filePath, encoding: decoded.encoding, confidence: decoded.confidence });
      if (sanitationChanged) sanitized.push(filePath);

      if (write) {
        if (backup) {
          const bakPath = `${filePath}.bak`;
          await fs.writeFile(bakPath, buf);
        }
        await fs.writeFile(filePath, afterSan.text, "utf8");
      }
    }
  }

  const rel = (p) => path.relative(process.cwd(), p);

  if (check) {
    console.log(changed.length ? `Would change ${changed.length} file(s).` : "OK: no changes needed.");
    if (changed.length) {
      console.log("\nFiles:");
      for (const f of changed) console.log(` - ${rel(f)}`);
      if (encodingFixed.length) {
        console.log("\nEncoding fixes detected:");
        for (const e of encodingFixed.slice(0, 50)) {
          const conf = typeof e.confidence === "number" ? e.confidence.toFixed(2) : String(e.confidence);
          console.log(` - ${rel(e.filePath)} (${e.encoding}, confidence=${conf})`);
        }
        if (encodingFixed.length > 50) console.log(` - ... +${encodingFixed.length - 50} more`);
      }
      if (verbose) {
        console.log(`\nSanitized (content edits): ${sanitized.length}`);
      }
      console.log("\nRun with --write to apply. Add --backup to keep .bak copies.");
    }
  } else {
    console.log(`Updated ${changed.length} file(s).`);
    if (encodingFixed.length) console.log(`Encoding normalized for ${encodingFixed.length} file(s).`);
    if (sanitized.length) console.log(`Sanitized content for ${sanitized.length} file(s).`);
  }
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});