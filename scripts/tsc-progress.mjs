import fs from "node:fs";
import path from "node:path";
import { spawnSync } from "node:child_process";

// Usage: node scripts/tsc-progress.mjs --write tsc.log

function parseArgs(argv) {
  const args = argv.slice(2);
  const get = (flag, fallback = null) => {
    const i = args.indexOf(flag);
    if (i === -1) return fallback;
    const v = args[i + 1];
    if (!v || v.startsWith("--")) return fallback;
    return v;
  };

  const has = (flag) => args.includes(flag);

  return {
    file: get("--file"),
    write: get("--write"),
    cmd: get("--cmd") ?? "npx tsc --noEmit --pretty false",
    maxFiles: Number(get("--max-files", "15")),
    maxCodes: Number(get("--max-codes", "15")),
    json: has("--json"),
    noRun: has("--no-run"),
  };
}

// ... (rest of the functions: topN, inc, runCommand, parseTscOutput, main)
// Ensure no code exists above the first 'import' line!