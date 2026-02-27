import fs from "fs";
import path from "path";

const logPath = process.argv[2] || "tsc.log";
if (!fs.existsSync(logPath)) {
  console.error(`Log not found: ${logPath}`);
  process.exit(1);
}

const ROOT = process.cwd();
const log = fs.readFileSync(logPath, "utf8");

// Syntax-level error codes that usually mean “file is corrupted / not parseable”
const SYNTAX_CODES = new Set([
  "TS1005", "TS1109", "TS1127", "TS1128", "TS1161", "TS1434", "TS1435", "TS2657"
]);

function toPascalCase(name) {
  return name
    .replace(/\.[^.]+$/, "")               // drop extension
    .replace(/[^a-zA-Z0-9]+/g, " ")        // separators -> spaces
    .trim()
    .split(/\s+/)
    .map(s => s ? (s[0].toUpperCase() + s.slice(1)) : "")
    .join("") || "Page";
}

function isTargetFile(f) {
  return (
    (f.startsWith("src/pages/") || f.startsWith("src/panels/")) &&
    (f.endsWith(".tsx") || f.endsWith(".ts"))
  );
}

const files = new Map(); // file -> Set(codes)

for (const line of log.split("\n")) {
  const m = line.match(/^(.+)\(\d+,\d+\):\s+error\s+(TS\d+):/);
  if (!m) continue;
  const file = m[1].trim();
  const code = m[2].trim();
  if (!isTargetFile(file)) continue;
  if (!SYNTAX_CODES.has(code)) continue;

  if (!files.has(file)) files.set(file, new Set());
  files.get(file).add(code);
}

const backupRoot = path.join(ROOT, "__broken_backup__");
let stubbed = 0;

for (const rel of files.keys()) {
  const abs = path.join(ROOT, rel);
  if (!fs.existsSync(abs)) continue;

  // backup
  const backupAbs = path.join(backupRoot, rel);
  fs.mkdirSync(path.dirname(backupAbs), { recursive: true });
  fs.copyFileSync(abs, backupAbs);

  const base = path.basename(rel);
  const compName = toPascalCase(base);
  const label = rel.replace(/^src\//, "");

  let content = "";

  if (rel.endsWith(".ts")) {
    // safest TS stub
    content = `// Auto-stubbed due to syntax errors (${[...files.get(rel)].join(", ")}).\n` +
              `// Original saved at: __broken_backup__/${rel}\n` +
              `export {};\n`;
  } else {
    // TSX page/panel stub
    content =
      `import React from "react";\n\n` +
      `// Auto-stubbed due to syntax errors (${[...files.get(rel)].join(", ")}).\n` +
      `// Original saved at: __broken_backup__/${rel}\n\n` +
      `export default function ${compName}() {\n` +
      `  return <div className="p-4">${label}</div>;\n` +
      `}\n`;
  }

  fs.writeFileSync(abs, content, "utf8");
  stubbed++;
}

console.log(`Targets found: ${files.size}`);
console.log(`Stubbed (with backups): ${stubbed}`);
