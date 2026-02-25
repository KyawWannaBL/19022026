// scripts/repair-project.mjs
// Usage:
//   node scripts/repair-project.mjs --check src
//   node scripts/repair-project.mjs --write --backup src
//
// What it fixes:
// - UTF-16/NUL/BOM/zero-width/NBSP
// - Markdown fences/headings/hrules
// - Leading junk prefixes before import/export/JSX even without spaces (•import, -export, |<div)
// - Auto-wraps "object-body-only" modules into: export const <NAME> = { ... } as const;
//   - <NAME> is inferred from repo imports; fallback is camelCase filename.

import { promises as fs } from "node:fs";
import path from "node:path";
import { TextDecoder } from "node:util";

const args = process.argv.slice(2);
const write = args.includes("--write");
const check = args.includes("--check") || !write;
const backup = args.includes("--backup");
const roots = args.filter((a) => !a.startsWith("--"));
if (!roots.length) roots.push("src");

const EXTENSIONS = new Set([".ts", ".tsx"]);
const STARTERS =
  "(import|export|const|let|var|function|class|interface|type|enum|return|if|for|while|switch|try|catch|finally|throw|break|continue|async|await|new|describe|it|test|expect|beforeAll|afterAll|beforeEach|afterEach)";

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
    .replace(/[\u201C\u201D]/g, '"')
    .replace(/[\u2018\u2019]/g, "'");
}

function toCamelCaseFilename(filePath) {
  const base = path.basename(filePath).replace(/\.(ts|tsx)$/i, "");
  const cleaned = base.replace(/[^a-zA-Z0-9]+/g, " ").trim();
  const parts = cleaned.split(/\s+/).filter(Boolean);
  if (!parts.length) return "data";
  const [first, ...rest] = parts;
  return first.toLowerCase() + rest.map((p) => p[0].toUpperCase() + p.slice(1).toLowerCase()).join("");
}

function sanitize(text) {
  const original = text;
  let s = text;

  s = s
    .replace(/\u0000/g, "")
    .replace(/^\uFEFF/, "")
    .replace(/[\uFEFF\u200B\u200C\u200D]/g, "")
    .replace(/\u00A0/g, " ")
    .replace(/[\u2028\u2029]/g, "\n");

  s = s.replace(/^ï»¿/, ""); // BOM rendered as text

  s = normalizeQuotes(s);

  // Remove markdown fences/headings/hrules
  s = s.replace(/^\s*```[\w-]*\s*$/gm, "");
  s = s.replace(/^\s*(?:-{3,}|\*{3,}|_{3,})\s*$/gm, "");
  s = s.replace(/^\s*#{1,6}\s+.*$/gm, "");

  // STRONG prefix stripper (handles •import, -export, |<div, │import, >export, +import)
  // Only strips when the remaining text starts with a TS starter or JSX "<".
  const prefixRe = new RegExp(
    String.raw`^(\s*)(?:[|│¦>•●◦▪▫–—+\-]+)+\s*(?=(?:${STARTERS})\b|<)`,
    "gm",
  );
  s = s.replace(prefixRe, "$1");

  // Also strip bullets even if there is no whitespace: "•import"
  const tightBulletRe = new RegExp(
    String.raw`^(\s*)(?:[•●◦▪▫–—>]+)(?=(?:${STARTERS})\b|<)`,
    "gm",
  );
  s = s.replace(tightBulletRe, "$1");

  return { changed: s !== original, text: s };
}

function looksLikeObjectBodyOnly(text) {
  // If it already has imports/exports or braces, it's not "body only"
  if (/\b(import|export|const|let|var|function|class)\b/.test(text)) return false;
  if (/[{}]/.test(text)) return false;

  const lines = text.split(/\r?\n/).map((l) => l.trim()).filter((l) => l && !l.startsWith("//"));
  if (lines.length < 5) return false;

  const propRe = /^(?:"[^"]+"|'[^']+'|[A-Za-z_$][\w$]*)\s*:\s*.+,?$/;
  const propLines = lines.filter((l) => propRe.test(l)).length;

  return propLines / lines.length >= 0.6; // majority looks like key:value lines
}

function buildImportIndex(allTexts) {
  // Map from import source (string) -> Set of imported names
  const map = new Map();

  const namedRe = /import\s*{\s*([^}]+)\s*}\s*from\s*["']([^"']+)["']/g;
  const defaultRe = /import\s+([A-Za-z_$][\w$]*)\s+from\s*["']([^"']+)["']/g;

  for (const t of allTexts) {
    let m;
    while ((m = namedRe.exec(t))) {
      const names = m[1]
        .split(",")
        .map((x) => x.trim().split(/\s+as\s+/i)[0].trim())
        .filter(Boolean);
      const src = m[2];
      const set = map.get(src) ?? new Set();
      for (const n of names) set.add(n);
      map.set(src, set);
    }
    while ((m = defaultRe.exec(t))) {
      const name = m[1].trim();
      const src = m[2];
      const set = map.get(src) ?? new Set();
      set.add(name);
      map.set(src, set);
    }
  }

  return map;
}

function inferExportName(filePath, importIndex) {
  const norm = filePath.replace(/\\/g, "/");
  const relNoExt = norm.replace(/^.*\/src\//, "src/").replace(/\.(ts|tsx)$/i, "");
  const tailCandidates = [
    relNoExt.replace(/^src\//, ""), // lib/translations
    relNoExt, // src/lib/translations
    relNoExt.replace(/^src\//, "@/"), // @/lib/translations
  ];

  for (const [src, names] of importIndex.entries()) {
    for (const tail of tailCandidates) {
      if (src.endsWith(tail)) {
        const first = [...names][0];
        if (first) return first;
      }
    }
  }

  // reasonable fallbacks
  const base = path.basename(filePath).toLowerCase();
  if (base === "translations.ts") return "TRANSLATIONS";
  if (base === "images.ts") return "IMAGES";
  if (base === "capacitor.config.ts") return "config";
  return toCamelCaseFilename(filePath);
}

function wrapObjectBody(filePath, bodyText, exportName) {
  const isCapacitor = path.basename(filePath).toLowerCase() === "capacitor.config.ts";
  if (isCapacitor) {
    return `import type { CapacitorConfig } from "@capacitor/cli";\n\nconst config: CapacitorConfig = {\n${bodyText}\n};\n\nexport default config;\n`;
  }
  // regular TS module
  const suffix = exportName === exportName.toUpperCase() ? " as const" : "";
  return `export const ${exportName} = {\n${bodyText}\n}${suffix};\n`;
}

async function main() {
  // collect files
  const files = [];
  for (const r of roots) {
    const abs = path.resolve(process.cwd(), r);
    const st = await statSafe(abs);
    if (!st) continue;
    if (st.isDirectory()) {
      const walked = await walkDir(abs);
      for (const f of walked) if (isEligibleFile(f)) files.push(f);
    } else if (st.isFile() && isEligibleFile(abs)) {
      files.push(abs);
    }
  }

  // read all texts once (for import index)
  const decodedTexts = [];
  const rawByPath = new Map();
  const encByPath = new Map();

  for (const f of files) {
    const buf = await fs.readFile(f);
    rawByPath.set(f, buf);
    const enc = detectEncoding(buf);
    encByPath.set(f, enc);
    decodedTexts.push(decode(buf, enc));
  }

  const importIndex = buildImportIndex(decodedTexts);

  const touched = [];

  for (let i = 0; i < files.length; i++) {
    const filePath = files[i];
    const buf = rawByPath.get(filePath);
    const enc = encByPath.get(filePath);
    const decoded = decode(buf, enc);

    const san = sanitize(decoded);
    let out = san.text;

    // object-body-only wrapper
    if (looksLikeObjectBodyOnly(out)) {
      const name = inferExportName(filePath, importIndex);
      out = wrapObjectBody(filePath, out.trimEnd(), name);
    }

    const needsEncodingFix = enc !== "utf8";
    const changed = out !== decoded || needsEncodingFix;

    if (changed) {
      touched.push(filePath);
      if (write) {
        if (backup) await fs.writeFile(`${filePath}.bak`, buf);
        await fs.writeFile(filePath, out, "utf8");
      }
    }
  }

  if (check) {
    console.log(touched.length ? `Would fix ${touched.length} file(s).` : "OK: no fixes needed.");
    for (const f of touched) console.log(` - ${path.relative(process.cwd(), f)}`);
    if (touched.length) console.log("\nRun with --write (and optionally --backup) to apply.");
  } else {
    console.log(`Fixed ${touched.length} file(s).`);
  }
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});