#!/usr/bin/env node
// Verification harness for the built Jekyll site.
// Run: bundle exec jekyll build && node test/site-checks.mjs
// Each task in the implementation plan appends checks to the CHECKS section.

import { readFileSync, existsSync, readdirSync, statSync } from "node:fs";
import { join } from "node:path";

const SITE = "_site";
const results = [];

function check(name, fn) {
  try {
    const result = fn();
    if (result && typeof result.then === "function") {
      results.push({ name, ok: false, message: "checks must be synchronous; async checks report false pass before assertions run" });
    } else {
      results.push({ name, ok: true });
    }
  } catch (err) {
    results.push({ name, ok: false, message: err.message });
  }
}

function site(relPath) {
  const full = join(SITE, relPath);
  if (!existsSync(full)) throw new Error(`missing built file: ${relPath}`);
  return readFileSync(full, "utf8");
}

function siteExists(relPath) {
  return existsSync(join(SITE, relPath));
}

function walk(dir, out = []) {
  for (const entry of readdirSync(dir)) {
    const full = join(dir, entry);
    if (statSync(full).isDirectory()) walk(full, out);
    else if (full.endsWith(".html")) out.push(full);
  }
  return out;
}

let _allHtml = null;
function allHtml() {
  if (_allHtml === null) {
    _allHtml = walk(SITE)
      .map((f) => readFileSync(f, "utf8"))
      .join("\n");
  }
  return _allHtml;
}

function assert(condition, message) {
  if (!condition) throw new Error(message);
}

function contains(haystack, needle, message) {
  assert(haystack.includes(needle), message ?? `expected to find: ${needle}`);
}

function absent(haystack, needle, message) {
  assert(!haystack.includes(needle), message ?? `expected NOT to find: ${needle}`);
}

// ---------------------------------------------------------------- CHECKS

check("site builds and has a home page", () => {
  assert(siteExists("index.html"), "_site/index.html not found — did jekyll build run?");
});

// Guard against accidental attribution of third-party work. The repository sits in the owner's
// GitHub namespace but is not their authorship; this check protects that boundary. If GIT-BO
// ever becomes a legitimate citation, narrow this check to only the chrishat310/GITBO path
// rather than removing it entirely.
check("GITBO does not appear anywhere in built output", () => {
  absent(allHtml(), "GITBO", "GITBO is not the owner's work and must not be listed");
  absent(allHtml(), "GIT-BO", "GIT-BO is not the owner's work and must not be listed");
});

check("flagship page renders structured fields", () => {
  const html = site("projects/02_mixed_var_bo/index.html");
  contains(html, "proj-meta", "flagship layout did not render the structured meta block");
  contains(html, "Objective", "objective label missing");
  contains(html, "Contribution", "contribution label missing");
  contains(html, "Result", "result label missing");
});

// ------------------------------------------------------------- END CHECKS

let failed = 0;
for (const r of results) {
  if (r.ok) {
    console.log(`  PASS  ${r.name}`);
  } else {
    failed++;
    console.log(`  FAIL  ${r.name}\n        ${r.message}`);
  }
}
console.log(`\n${results.length - failed}/${results.length} checks passed`);
process.exit(failed > 0 ? 1 : 0);
