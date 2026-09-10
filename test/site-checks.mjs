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


check("flagship page renders structured fields", () => {
  const html = site("projects/02_mixed_var_bo/index.html");
  contains(html, "proj-meta", "flagship layout did not render the structured meta block");
  contains(html, "Objective", "objective label missing");
  contains(html, "Contribution", "contribution label missing");
  // This project's frontmatter carries no `result:` field by design: the only fact on
  // record (TMLR submission status) is process metadata, not an outcome evaluated against
  // the objective, so the page ships with no stated result rather than a mislabelled one.
  absent(html, "proj-meta-label\">Result<", "result label should not render when page.result is absent");
});

check("all four flagships use the flagship layout", () => {
  for (const slug of [
    "01_engiopt",
    "02_mixed_var_bo",
    "12_nova_chassis",
    "14_battery_enclosure_opt",
  ]) {
    const html = site(`projects/${slug}/index.html`);
    contains(html, "proj-meta", `${slug} is not rendering the flagship meta block`);
  }
});

check("NOVA states its validated load factor", () => {
  const html = site("projects/12_nova_chassis/index.html");
  contains(html, "2.5", "NOVA must state the 2.5x working load result");
  // Task 3 proved the Result row is correctly omitted when page.result is absent (see the
  // mixed-var-bo check above). NOVA has a result, so this is the missing other direction:
  // proof the row actually renders when the field is present.
  contains(html, "proj-meta-label\">Result<", "NOVA has a result field and must render the Result row");
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
