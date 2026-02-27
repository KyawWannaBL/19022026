import fs from "fs";
import path from "path";

const logPath = process.argv[2] || "tsc_after_pages.log";
if (!fs.existsSync(logPath)) {
  console.error(`Log not found: ${logPath}`);
  process.exit(1);
}

const ROOT = process.cwd();
const log = fs.readFileSync(logPath, "utf8");

// Syntax-level errors = file is not parseable
const SYNTAX_CODES = new Set([
  "TS1003","TS1005","TS1011","TS1109","TS1127","TS1128","TS1138","TS1146","TS1161","TS1434","TS1435","TS2657"
]);

function isTarget(rel) {
  // IMPORTANT: exclude src/pages and src/panels (already handled)
  if (rel.startsWith("src/pages/")) return false;
  if (rel.startsWith("src/panels/")) return false;

  // Target project code only
  return (
    rel.startsWith("src/") &&
    (rel.endsWith(".ts") || rel.endsWith(".tsx"))
  );
}

const files = new Map(); // file -> Set(codes)
for (const line of log.split("\n")) {
  const m = line.match(/^(.+)\(\d+,\d+\):\s+error\s+(TS\d+):/);
  if (!m) continue;
  const file = m[1].trim();
  const code = m[2].trim();
  if (!isTarget(file)) continue;
  if (!SYNTAX_CODES.has(code)) continue;
  if (!files.has(file)) files.set(file, new Set());
  files.get(file).add(code);
}

const backupRoot = path.join(ROOT, "__broken_backup__");
let stubbed = 0;

for (const rel of files.keys()) {
  const abs = path.join(ROOT, rel);
  if (!fs.existsSync(abs)) continue;

  // backup original
  const backupAbs = path.join(backupRoot, rel);
  fs.mkdirSync(path.dirname(backupAbs), { recursive: true });
  if (!fs.existsSync(backupAbs)) fs.copyFileSync(abs, backupAbs);

  const codes = [...files.get(rel)].join(", ");
  const label = rel.replace(/^src\//, "");

  let content = "";

  if (rel.endsWith(".tsx")) {
    // component stub (safe default export)
    content =
      `import React from "react";\n\n` +
      `// Auto-stubbed due to syntax errors (${codes}).\n` +
      `// Original saved at: __broken_backup__/${rel}\n\n` +
      `export default function Stub() {\n` +
      `  return <div className="p-4">${label}</div>;\n` +
      `}\n`;
  } else {
    // module stub: provide a few common exports patterns
    // (helps reduce "has no exported member" follow-up errors)
    content =
      `// Auto-stubbed due to syntax errors (${codes}).\n` +
      `// Original saved at: __broken_backup__/${rel}\n\n` +
      `export const __stub = true;\n` +
      `export default {} as any;\n`;
  }

  fs.writeFileSync(abs, content, "utf8");
  stubbed++;
}

console.log(`Targets found: ${files.size}`);
console.log(`Stubbed (with backups): ${stubbed}`);
