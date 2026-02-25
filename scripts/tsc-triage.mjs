import fs from "node:fs";

function parseArgs(argv) {
  const args = argv.slice(2);
  const fileIdx = args.indexOf("--file");
  const file = fileIdx >= 0 ? args[fileIdx + 1] : null;
  return { file: file ?? args[0] ?? "tsc.log" };
}

function topN(map, n = 20) {
  return [...map.entries()].sort((a, b) => b[1] - a[1]).slice(0, n);
}

function inc(map, key) {
  map.set(key, (map.get(key) ?? 0) + 1);
}

function extractFilePath(line) {
  const m = line.match(/^([^(:]+)\(\d+,\d+\):\s+error\s+TS\d{4}:/);
  return m ? m[1] : null;
}

function main() {
  const { file } = parseArgs(process.argv);

  if (!fs.existsSync(file)) {
    console.error(`tsc log not found: ${file}`);
    process.exit(1);
  }

  const text = fs.readFileSync(file, "utf8");
  const lines = text.split(/\r?\n/);

  const totals = new Map();
  const errorsByFile = new Map();

  const ts2305ByModule = new Map();
  const ts2305BySymbol = new Map();
  const ts2614ByModule = new Map();
  const ts2339ByProp = new Map();

  const ts2300Samples = [];
  const ts2451Samples = [];
  const firstErrors = [];

  for (const line of lines) {
    const codeMatch = line.match(/error (TS\d{4}):/);
    if (codeMatch) {
      inc(totals, codeMatch[1]);
      const fp = extractFilePath(line);
      if (fp) inc(errorsByFile, fp);
      if (firstErrors.length < 40) firstErrors.push(line);
    }

    const m2305 = line.match(/error TS2305: Module '([^']+)' has no exported member '([^']+)'/);
    if (m2305) {
      inc(ts2305ByModule, m2305[1]);
      inc(ts2305BySymbol, `${m2305[1]} :: ${m2305[2]}`);
      continue;
    }

    const m2614 = line.match(/error TS2614: Module '([^']+)' has no default export/);
    if (m2614) {
      inc(ts2614ByModule, m2614[1]);
      continue;
    }

    const m2339 = line.match(/error TS2339: Property '([^']+)' does not exist on type/);
    if (m2339) {
      inc(ts2339ByProp, m2339[1]);
      continue;
    }

    if (line.includes("error TS2300:")) {
      if (ts2300Samples.length < 30) ts2300Samples.push(line);
      continue;
    }

    if (line.includes("error TS2451:")) {
      if (ts2451Samples.length < 30) ts2451Samples.push(line);
    }
  }

  console.log("\n# First 40 errors (quick sanity)");
  for (const s of firstErrors) console.log(s);

  console.log("\n# Top error codes");
  for (const [k, v] of topN(totals, 15)) console.log(`${String(v).padStart(5)} ${k}`);

  console.log("\n# Top files by error count");
  for (const [k, v] of topN(errorsByFile, 20)) console.log(`${String(v).padStart(5)} ${k}`);

  console.log("\n# TS2305 - top missing symbols (module :: symbol)");
  for (const [k, v] of topN(ts2305BySymbol, 25)) console.log(`${String(v).padStart(5)} ${k}`);

  console.log("\n# TS2614 - top modules (default export mismatch)");
  for (const [k, v] of topN(ts2614ByModule, 20)) console.log(`${String(v).padStart(5)} ${k}`);

  console.log("\n# TS2339 - top missing properties");
  for (const [k, v] of topN(ts2339ByProp, 25)) console.log(`${String(v).padStart(5)} ${k}`);

  console.log("\n# TS2300 samples (duplicate identifier) - first 30 lines");
  for (const s of ts2300Samples) console.log(s);

  console.log("\n# TS2451 samples (redeclared variable) - first 30 lines");
  for (const s of ts2451Samples) console.log(s);
}

main();
