// scripts/repair-ts-sources.v2.mjs
// Usage:
//   node scripts/repair-ts-sources.v2.mjs --check src
//   node scripts/repair-ts-sources.v2.mjs --write --backup src
//
// Fixes:
// - UTF-16LE/BE + NUL bytes => rewrites to UTF-8
// - Removes BOM/zero-width/NBSP + Unicode line separators
// - Removes literal "ï»¿" (BOM bytes that got saved as text)
// - Normalizes smart quotes
// - Removes markdown fences/headings/hrules
// - Strips markdown list/blockquote/bullets when followed by TS starters OR JSX "<"
// - Removes stray backticks that appear as fence remnants inside a line (common copy/paste artifact)

import { promises as fs } from "node:fs";
import path from "node:path";
import { TextDecoder } from "node:util";

const args = process.argv.slice(2);
const write = args.includes("--write");
const check = args.includes("--check") || !write;
const backup = args.includes("--backup");
const verbose = args.includes("--verbose");

const roots = args.filter((a) => !a.startsWith("--"));
if (!roots.length) roots.push("src");

const EXTENSIONS = new Set([".ts", ".tsx"]);
const STARTERS =
  "(export|import|const|let|var|function|class|interface|type|enum|return|if|for|while|switch|try|catch|finally|throw|break|continue|describe|it|test|expect|beforeAll|afterAll|beforeEach|afterEach|async|await|new)";

function isEligibleFile(p) {
  const ext = path.extname(p).toLowerCase();
  if (!EXTENSIONS.has(ext)) return false;
  const parts = p.split(path.sep);
  return !parts.includes("node_modules") && !parts.includes("dist") && !parts.includes("build") && !parts.includes(".next");
}

async function statSafe(p) {
  try {
    return await fs.stat(p);
  } catch {
    return null;
  }
}

async function walkDir(dir) {
  const out = [];
  const entries = await fs.readdir(dir, { withFileTypes: true });
  for (const e of entries) {
    const p = path.join(dir, e.name);
    if (e.isDirectory()) out.push(...(await walkDir(p)));
    else out.push(p);
  }
  return out;
}

function countNulBytes(buf) {
  let c = 0;
  for (let i = 0; i < buf.length; i++) if (buf[i] === 0x00) c++;
  return c;
}

function detectEncoding(buf) {
  if (buf.length >= 2) {
    if (buf[0] === 0xff && buf[1] === 0xfe) return "utf16le";
    if (buf[0] === 0xfe && buf[1] === 0xff) return "utf16be";
  }

  const nulRatio = buf.length ? countNulBytes(buf) / buf.length : 0;
  if (nulRatio < 0.1) return "utf8";

  let nulEven = 0;
  let nulOdd = 0;
  for (let i = 0; i < buf.length; i++) {
    if (buf[i] === 0x00) (i % 2 === 0 ? nulEven : nulOdd)++;
  }
  if (nulOdd > nulEven * 1.2) return "utf16le";
  if (nulEven > nulOdd * 1.2) return "utf16be";
  return nulRatio > 0.25 ? "utf16le" : "utf8";
}

function decode(buf, enc) {
  if (enc === "utf16le") return new TextDecoder("utf-16le", { fatal: false }).decode(buf);

  if (enc === "utf16be") {
    const swapped = Buffer.allocUnsafe(buf.length);
    for (let i = 0; i + 1 < buf.length; i += 2) {
      swapped[i] = buf[i + 1];
      swapped[i + 1] = buf[i];
    }
    if (buf.length % 2 === 1) swapped[buf.length - 1] = buf[buf.length - 1];
    return new TextDecoder("utf-16le", { fatal: false }).decode(swapped);
  }

  return new TextDecoder("utf-8", { fatal: false }).decode(buf);
}

function normalizeQuotes(s) {
  return s
    .replace(/[\u201C\u201D]/g, '"') // “ ”
    .replace(/[\u2018\u2019]/g, "'"); // ‘ ’
}

function sanitize(text) {
  const original = text;
  let s = text;

  // NUL + BOM variants
  s = s
    .replace(/\u0000/g, "")
    .replace(/^\uFEFF/, "")
    .replace(/[\uFEFF\u200B\u200C\u200D]/g, "")
    .replace(/\u00A0/g, " ")
    .replace(/[\u2028\u2029]/g, "\n");

  // BOM bytes that got saved as visible text: ï»¿
  s = s.replace(/^\u00EF\u00BB\u00BF/, "");
  s = s.replace(/^ï»¿/, "");

  s = normalizeQuotes(s);

  // Remove markdown fences even if preceded by whitespace
  s = s.replace(/^\s*```[\w-]*\s*$/gm, "");
  s = s.replace(/^\s*(?:-{3,}|\*{3,}|_{3,})\s*$/gm, "");
  s = s.replace(/^\s*#{1,6}\s+.*$/gm, "");

  // Strip list/bullets/blockquote when followed by TS starters or JSX "<"
  s = s.replace(new RegExp(`^(\\s*)[-*+]\\s+(?=(?:${STARTERS})\\b|<)`, "gm"), "$1");
  s = s.replace(new RegExp(`^(\\s*)\\d+[.)]\\s+(?=(?:${STARTERS})\\b|<)`, "gm"), "$1");
  s = s.replace(new RegExp(`^(\\s*)[•●◦▪▫–—]\\s+(?=(?:${STARTERS})\\b|<)`, "gm"), "$1");
  s = s.replace(new RegExp(`^(\\s*)>\\s+(?=(?:${STARTERS})\\b|<)`, "gm"), "$1");

  // Remove doc-paste headers
  s = s.replace(/^\s*(File|Path)\s*:\s*src\/.+\.(ts|tsx)\s*$/gim, "");

  // Extra: remove stray fence remnants embedded in a line (common copy-paste)
  // Only remove when the line is otherwise mostly fence-like.
  s = s.replace(/^\s*`{3,}.*$/gm, "");

  return { changed: s !== original, text: s };
}

async function collectTargets() {
  const targets = [];
  for (const r of roots) {
    const abs = path.resolve(process.cwd(), r);
    const st = await statSafe(abs);
    if (!st) continue;

    if (st.isDirectory()) {
      const files = await walkDir(abs);
      for (const f of files) if (isEligibleFile(f)) targets.push(f);
    } else if (st.isFile() && isEligibleFile(abs)) {
      targets.push(abs);
    }
  }
  return Array.from(new Set(targets));
}

async function main() {
  const files = await collectTargets();
  const touched = [];

  for (const filePath of files) {
    const buf = await fs.readFile(filePath);
    const enc = detectEncoding(buf);
    const decoded = decode(buf, enc);

    const { changed, text } = sanitize(decoded);
    const encodingNeedsFix = enc !== "utf8";

    if (changed || encodingNeedsFix) {
      touched.push({ filePath, enc, sanitized: changed });
      if (write) {
        if (backup) await fs.writeFile(`${filePath}.bak`, buf);
        await fs.writeFile(filePath, text, "utf8");
      }
    }
  }

  const rel = (p) => path.relative(process.cwd(), p);

  if (check) {
    console.log(touched.length ? `Would fix ${touched.length} file(s):` : "OK: no fixes needed.");
    for (const t of touched) {
      const flags = [
        t.enc !== "utf8" ? `enc=${t.enc}` : null,
        t.sanitized ? "sanitized" : null,
      ].filter(Boolean);
      console.log(` - ${rel(t.filePath)}${flags.length ? ` (${flags.join(", ")})` : ""}`);
    }
    if (touched.length) console.log("\nRun with --write (and optionally --backup) to apply.");
  } else {
    console.log(`Fixed ${touched.length} file(s).`);
    if (verbose) {
      for (const t of touched) console.log(` - ${rel(t.filePath)} (enc=${t.enc}, sanitized=${t.sanitized})`);
    }
  }
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});