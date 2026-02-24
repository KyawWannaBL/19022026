// file: scripts/deps-doctor.mjs
import { spawn } from "node:child_process";
import fs from "node:fs";
import path from "node:path";

const DEV_HINTS = new Set([
  "vitest",
  "jsdom",
  "@testing-library/react",
  "@testing-library/user-event",
  "@testing-library/jest-dom",
  "typescript",
  "eslint",
  "prettier",
  "vite",
]);

function loadPackageJson(cwd) {
  return JSON.parse(fs.readFileSync(path.join(cwd, "package.json"), "utf8"));
}

function readStdin() {
  return new Promise((resolve) => {
    let data = "";
    process.stdin.setEncoding("utf8");
    process.stdin.on("data", (chunk) => (data += chunk));
    process.stdin.on("end", () => resolve(data));
  });
}

function isIgnorableSpecifier(spec) {
  return (
    !spec ||
    spec.startsWith("./") ||
    spec.startsWith("../") ||
    spec.startsWith("@/") ||
    spec.startsWith("node:") ||
    spec.startsWith("virtual:") ||
    spec.endsWith(".css") ||
    spec.endsWith(".scss")
  );
}

function specToPackageName(spec) {
  if (isIgnorableSpecifier(spec)) return null;

  if (spec.startsWith("@")) {
    const parts = spec.split("/");
    return parts.length >= 2 ? `${parts[0]}/${parts[1]}` : spec;
  }
  return spec.split("/")[0];
}

function parseMissingFromTsc(output) {
  const missingModules = new Set();
  const missingTypeLibs = new Set();

  const re2307 = /error TS2307: Cannot find module '([^']+)'/g;
  for (const m of output.matchAll(re2307)) missingModules.add(m[1]);

  const re2688 = /error TS2688: Cannot find type definition file for '([^']+)'/g;
  for (const m of output.matchAll(re2688)) missingTypeLibs.add(m[1]);

  return { missingModules, missingTypeLibs };
}

function classifyInstallTarget(pkgName, reason) {
  if (!pkgName) return { kind: "skip" };
  if (pkgName.startsWith("@types/")) return { kind: "dev" };
  if (DEV_HINTS.has(pkgName)) return { kind: "dev" };
  if (reason === "typeLib") return { kind: "dev" };
  return { kind: "dep" };
}

function typeLibToPackage(typeLib) {
  if (!typeLib) return null;
  if (typeLib === "vite/client") return null;
  if (typeLib.includes("/")) return typeLib.split("/")[0]; // vitest/globals -> vitest
  return `@types/${typeLib}`;
}

function dedupeAndFilterAgainstPackageJson(pkgs, packageJson) {
  const deps = packageJson.dependencies ?? {};
  const devDeps = packageJson.devDependencies ?? {};
  return [...new Set(pkgs)]
    .filter(Boolean)
    .filter((p) => !deps[p] && !devDeps[p])
    .sort();
}

function run(cmd, args) {
  return new Promise((resolve, reject) => {
    const child = spawn(cmd, args, {
      stdio: "inherit",
      shell: process.platform === "win32",
    });
    child.on("exit", (code) => (code === 0 ? resolve() : reject(new Error(`${cmd} exited ${code}`))));
  });
}

function parseArgs(argv) {
  const args = argv.slice(3);
  const install = args.includes("--install");
  const apply = args.includes("--apply");
  const fileIdx = args.indexOf("--file");
  const file = fileIdx >= 0 ? args[fileIdx + 1] : null;
  return { install, apply, file };
}

async function cmdMissing({ install, file }) {
  const cwd = process.cwd();
  const packageJson = loadPackageJson(cwd);

  const input =
    file && fs.existsSync(file)
      ? fs.readFileSync(file, "utf8")
      : await readStdin();

  if (!input.trim()) {
    console.error("No input. Provide --file tsc.log or pipe tsc output.");
    process.exit(1);
  }

  const { missingModules, missingTypeLibs } = parseMissingFromTsc(input);

  const depPkgs = [];
  const devPkgs = [];

  for (const spec of missingModules) {
    const pkgName = specToPackageName(spec);
    if (!pkgName) continue;
    const { kind } = classifyInstallTarget(pkgName, "module");
    if (kind === "dev") devPkgs.push(pkgName);
    if (kind === "dep") depPkgs.push(pkgName);
  }

  for (const lib of missingTypeLibs) {
    const pkgName = typeLibToPackage(lib);
    if (!pkgName) continue;
    const { kind } = classifyInstallTarget(pkgName, "typeLib");
    if (kind === "dev") devPkgs.push(pkgName);
    if (kind === "dep") depPkgs.push(pkgName);
  }

  const depsToAdd = dedupeAndFilterAgainstPackageJson(depPkgs, packageJson);
  const devToAdd = dedupeAndFilterAgainstPackageJson(devPkgs, packageJson);

  if (!depsToAdd.length && !devToAdd.length) {
    console.log("No missing packages detected (or already installed).");
    return;
  }

  if (depsToAdd.length) {
    console.log("\n# Install dependencies:");
    console.log(`pnpm add ${depsToAdd.join(" ")}`);
  }
  if (devToAdd.length) {
    console.log("\n# Install devDependencies:");
    console.log(`pnpm add -D ${devToAdd.join(" ")}`);
  }

  if (!install) return;

  if (depsToAdd.length) await run("pnpm", ["add", ...depsToAdd]);
  if (devToAdd.length) await run("pnpm", ["add", "-D", ...devToAdd]);
}

async function cmdPrune({ apply }) {
  const cwd = process.cwd();
  const packageJson = loadPackageJson(cwd);

  const json = await new Promise((resolve, reject) => {
    const child = spawn("pnpm", ["dlx", "depcheck", "--json"], {
      shell: process.platform === "win32",
      stdio: ["ignore", "pipe", "inherit"],
    });

    let out = "";
    child.stdout.setEncoding("utf8");
    child.stdout.on("data", (c) => (out += c));
    child.on("exit", (code) => (code === 0 ? resolve(out) : reject(new Error(`depcheck exited ${code}`))));
  });

  const parsed = JSON.parse(json);
  const unusedDeps = (parsed.dependencies ?? []).sort();
  const unusedDevDeps = (parsed.devDependencies ?? []).sort();

  const safeUnusedDeps = unusedDeps.filter((p) => (packageJson.dependencies ?? {})[p]);
  const safeUnusedDev = unusedDevDeps.filter((p) => (packageJson.devDependencies ?? {})[p]);

  console.log("\n# depcheck unused dependencies:");
  console.log(safeUnusedDeps.length ? safeUnusedDeps.join("\n") : "(none)");

  console.log("\n# depcheck unused devDependencies:");
  console.log(safeUnusedDev.length ? safeUnusedDev.join("\n") : "(none)");

  if (!safeUnusedDeps.length && !safeUnusedDev.length) return;

  console.log("\n# Suggested remove commands (review first):");
  if (safeUnusedDeps.length) console.log(`pnpm remove ${safeUnusedDeps.join(" ")}`);
  if (safeUnusedDev.length) console.log(`pnpm remove -D ${safeUnusedDev.join(" ")}`);

  if (!apply) return;

  if (safeUnusedDeps.length) await run("pnpm", ["remove", ...safeUnusedDeps]);
  if (safeUnusedDev.length) await run("pnpm", ["remove", "-D", ...safeUnusedDev]);
}

async function main() {
  const sub = process.argv[2];
  const { install, apply, file } = parseArgs(process.argv);

  if (sub === "missing") return cmdMissing({ install, file });
  if (sub === "prune") return cmdPrune({ apply });

  console.log(`Usage:
  pnpm -s tsc --noEmit --pretty false --noErrorTruncation > tsc.log 2>&1 || true
  node scripts/deps-doctor.mjs missing --file tsc.log [--install]

  node scripts/deps-doctor.mjs prune [--apply]
`);
  process.exit(1);
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});