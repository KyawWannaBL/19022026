import fs from "node:fs";
import path from "node:path";
// Usage examples:
//   node scripts/tsc-progress.mjs
//   node scripts/tsc-progress.mjs --write tsc.log
//   node scripts/tsc-progress.mjs --file tsc.log
//   node scripts/tsc-progress.mjs --cmd "pnpm -s tsc --noEmit --pretty false --noErrorTruncation" --write tsc.log
//   node scripts/tsc-progress.mjs --json

import fs from "node:fs";
import path from "node:path";
import { spawnSync } from "node:child_process";

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
    cmd:
      get("--cmd") ??
      "pnpm -s tsc --noEmit --pretty false --noErrorTruncation",
    maxFiles: Number(get("--max-files", "15")),
    maxCodes: Number(get("--max-codes", "15")),
    json: has("--json"),
    noRun: has("--no-run"),
  };
}

function topN(map, n) {
  return [...map.entries()].sort((a, b) => b[1] - a[1]).slice(0, n);
}

function inc(map, key, by = 1) {
  map.set(key, (map.get(key) ?? 0) + by);
}

function runCommand(cmd) {
  const res = spawnSync(cmd, {
    shell: true,
    encoding: "utf8",
    stdio: ["ignore", "pipe", "pipe"],
  });

  const out = `${res.stdout ?? ""}${res.stderr ?? ""}`;
  return { out, code: res.status ?? 0 };
}

function parseTscOutput(text) {
  const byCode = new Map();
  const byFile = new Map();
  const samples = [];

  const lines = text.split(/\r?\n/);

  for (const line of lines) {
    // file-based: src/foo.tsx(12,3): error TS2339: ...
    const mFile = line.match(/^(.+?)\(\d+,\d+\):\s+error\s+(TS\d{4}):\s+(.*)$/);
    if (mFile) {
      const file = mFile[1];
      const code = mFile[2];
      inc(byFile, file);
      inc(byCode, code);
      if (samples.length < 30) samples.push(line);
      continue;
    }

    // global: error TS2688: Cannot find type definition file...
    const mGlobal = line.match(/^error\s+(TS\d{4}):\s+(.*)$/);
    if (mGlobal) {
      const code = mGlobal[1];
      inc(byFile, "(global)");
      inc(byCode, code);
      if (samples.length < 30) samples.push(line);
      continue;
    }
  }

  const total = [...byCode.values()].reduce((a, b) => a + b, 0);
  const files = byFile.size - (byFile.has("(global)") ? 1 : 0);

  return { total, files, byCode, byFile, samples };
}

function main() {
  const opts = parseArgs(process.argv);

  let text = "";
  let exitCode = 0;

  if (opts.file) {
    const p = path.resolve(opts.file);
    if (!fs.existsSync(p)) {
      console.error(`File not found: ${p}`);
      process.exit(2);
    }
    text = fs.readFileSync(p, "utf8");
  } else {
    if (opts.noRun) {
      console.error("No --file provided and --no-run specified.");
      process.exit(2);
    }
    const res = runCommand(opts.cmd);
    text = res.out;
    exitCode = res.code;

    if (opts.write) {
      fs.mkdirSync(path.dirname(path.resolve(opts.write)), { recursive: true });
      fs.writeFileSync(path.resolve(opts.write), text, "utf8");
    }
  }

  const report = parseTscOutput(text);

  if (opts.json) {
    const out = {
      totalErrors: report.total,
      fileCount: report.files,
      topCodes: topN(report.byCode, opts.maxCodes).map(([code, count]) => ({ code, count })),
      topFiles: topN(report.byFile, opts.maxFiles).map(([file, count]) => ({ file, count })),
      samples: report.samples,
    };
    console.log(JSON.stringify(out, null, 2));
    process.exit(exitCode ? 1 : 0);
  }

  console.log(`# TypeScript error summary`);
  console.log(`Total errors: ${report.total}`);
  console.log(`Files with errors: ${report.files}${report.byFile.has("(global)") ? " (+ global)" : ""}`);

  console.log(`\n# Top error codes`);
  for (const [code, count] of topN(report.byCode, opts.maxCodes)) {
    console.log(`${String(count).padStart(6)} ${code}`);
  }

  console.log(`\n# Top files by error count`);
  for (const [file, count] of topN(report.byFile, opts.maxFiles)) {
    console.log(`${String(count).padStart(6)} ${file}`);
  }

  console.log(`\n# Samples (first ${report.samples.length})`);
  for (const s of report.samples) console.log(s);

  process.exit(exitCode ? 1 : 0);
}

main();) 
