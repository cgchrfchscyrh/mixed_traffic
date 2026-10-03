import { spawnSync } from "node:child_process";
import { readFile, writeFile, mkdir, readdir } from "node:fs/promises";
// A scoped, expiring review, not a blanket audit bypass. See SECURITY.md.
const reviewed = new Map([
  [
    "https://github.com/advisories/GHSA-ch52-4w7c-c8xp",
    {
      package: "http-cache-semantics",
      version: "4.2.0",
      expires: "2026-11-03T00:00:00Z",
      reason:
        "Only Astro's remote-image build cache imports this package. All media are local public assets, and only static dist files are deployed; there is no shared authenticated cache or Node server.",
    },
  ],
]);
const run = spawnSync("npm", ["audit", "--json"], { encoding: "utf8" });
let audit;
try {
  audit = JSON.parse(run.stdout);
} catch {
  throw new Error("npm audit did not return JSON: " + run.stderr);
}
await mkdir("reports", { recursive: true });
await writeFile(
  "reports/security-audit.json",
  JSON.stringify(audit, null, 2) + "\n",
);
if (audit.error || ![0, 1].includes(run.status))
  throw new Error(
    "npm audit could not complete: " +
      JSON.stringify(audit.error || run.stderr),
  );
const findings = Object.values(audit.vulnerabilities || {});
const direct = findings.flatMap((v) =>
  v.via.filter((v) => typeof v === "object"),
);
const unreviewed = direct.filter((v) => !reviewed.has(v.url));
if (findings.length && direct.length === 0)
  throw new Error("Audit has unresolved findings without advisory details");
const lock = JSON.parse(await readFile("package-lock.json", "utf8"));
const config = await readFile("astro.config.ts", "utf8");
const guardErrors = [];
if (!/output:\s*["']static["']/.test(config) || /\badapter\s*:/.test(config))
  guardErrors.push("Review requires static output without a server adapter");
async function sourceFiles(dir) {
  const files = [];
  for (const entry of await readdir(dir, { withFileTypes: true })) {
    const path = dir + "/" + entry.name;
    if (entry.isDirectory()) files.push(...(await sourceFiles(path)));
    else files.push(path);
  }
  return files;
}
for (const file of await sourceFiles("src")) {
  const text = await readFile(file, "utf8");
  if (/astro:assets|prerender\s*=\s*false|\bfetch\s*\(/.test(text))
    guardErrors.push(
      file +
        ": image processing, fetch, or dynamic route requires a new review",
    );
}
const accepted = [];
for (const item of direct) {
  const review = reviewed.get(item.url);
  if (!review) continue;
  if (Date.now() >= Date.parse(review.expires))
    guardErrors.push(item.url + ": security review expired");
  if (
    lock.packages["node_modules/" + review.package]?.version !== review.version
  )
    guardErrors.push(item.url + ": package version changed; reassess advisory");
  accepted.push({ advisory: item.url, ...review });
}
const report = {
  date: new Date().toISOString(),
  dependencyFindings: audit.metadata?.vulnerabilities,
  reviewedAdvisories: accepted,
  unreviewedAdvisories: unreviewed.map((v) => v.url),
  guardErrors,
  scope:
    "Static GitHub Pages deployment; raw npm audit findings remain recorded.",
};
await writeFile(
  "reports/security-review.json",
  JSON.stringify(report, null, 2) + "\n",
);
console.log(JSON.stringify(report, null, 2));
if (unreviewed.length || guardErrors.length)
  throw new Error(
    "Security review failed; inspect reports/security-review.json",
  );
