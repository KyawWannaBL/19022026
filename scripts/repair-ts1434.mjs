import fs from "fs";
import path from "path";

const ROOT = process.cwd();
const logPath = process.argv[2] || "tsc.log";
if (!fs.existsSync(logPath)) {
  console.error(`Log file not found: ${logPath}`);
  process.exit(1);
}

const tscOutput = fs.readFileSync(logPath, "utf8");

function uniq(arr) {
  return [...new Set(arr)];
}

function read(p) {
  return fs.readFileSync(p, "utf8");
}

function write(p, s) {
  fs.mkdirSync(path.dirname(p), { recursive: true });
  fs.writeFileSync(p, s, "utf8");
}

function hasReactImport(src) {
  return /from\s+['"]react['"]/.test(src);
}

function ensureReactHookImport(src) {
  const hooks = ["useState","useEffect","useMemo","useCallback","useRef","useReducer","useContext"];
  const used = hooks.filter((h) => new RegExp(`\\b${h}\\b`).test(src));
  const usesJSX = /<\w+/.test(src);
  const usesReactFC = /\bReact\.FC\b/.test(src);

  if ((used.length || usesJSX || usesReactFC) && !hasReactImport(src)) {
    const named = uniq(used);
    const importLine =
      named.length > 0
        ? `import React, { ${named.join(", ")} } from "react";\n`
        : `import React from "react";\n`;
    return importLine + src;
  }
  return src;
}

function fixMissingImportBrace(src) {
  const lines = src.split(/\r?\n/);
  const firstNonEmptyIdx = lines.findIndex((l) => l.trim() && !l.trim().startsWith("//") && !l.trim().startsWith("/*"));
  if (firstNonEmptyIdx === -1) return src;

  const firstLine = lines[firstNonEmptyIdx].trim();
  const hasCloseFrom = src.includes("} from") && /from\s+['"]/.test(src);

  const looksLikeMidNamedImport =
    /^[A-Za-z_$][\w$]*\s*,\s*$/.test(firstLine) &&
    hasCloseFrom &&
    !/^\s*import\s*\{\s*$/m.test(src);

  if (looksLikeMidNamedImport) {
    lines.splice(firstNonEmptyIdx, 0, "import {");
    return lines.join("\n");
  }

  return src;
}

function stripMangledEOF(src) {
  return src
    .replace(/EOFor.*$/gm, "")
    .replace(/^\s*EOF\s*$/gm, "")
    .replace(/ticsApi\s*$/gm, "");
}

function patchFile(relPath) {
  const abs = path.join(ROOT, relPath);
  if (!fs.existsSync(abs)) return false;

  let src = read(abs);
  const before = src;

  src = stripMangledEOF(src);
  src = fixMissingImportBrace(src);
  src = ensureReactHookImport(src);

  if (src !== before) {
    write(abs, src.endsWith("\n") ? src : src + "\n");
    return true;
  }
  return false;
}

const files = uniq(
  tscOutput
    .split("\n")
    .filter((l) => l.includes("error TS1434"))
    .map((l) => l.split("(")[0].trim())
    .filter(Boolean)
);

let changed = 0;
for (const f of files) {
  if (patchFile(f)) changed++;
}

console.log(`TS1434 targets: ${files.length}`);
console.log(`Patched files: ${changed}`);
