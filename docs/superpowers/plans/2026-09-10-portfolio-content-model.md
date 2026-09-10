# Portfolio Content Model Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Restructure chrishat310.github.io around four flagship projects plus a compact index, with the portfolio criteria expressed as structured frontmatter fields, three new project pages, and a publications section.

**Architecture:** al-folio Jekyll site. Each project's objective, contribution, methods, result and metrics move from prose into named frontmatter fields, rendered by a new `flagship` layout. Existing narrative prose is preserved verbatim beneath the structured head. Publications use the jekyll-scholar bibliography already configured in the Gemfile. Verification is a Node script asserting against the built `_site` output, since the repo has no test framework.

**Tech Stack:** Jekyll 4 + al-folio, Liquid templates, SCSS, jekyll-scholar, Node 20 (verification only, no new npm dependencies).

**Spec:** `docs/superpowers/specs/2026-09-10-portfolio-refresh-design.md`

## Global Constraints

- **Truth-first.** No fact, metric, tool, outcome, or ownership claim may be added unless it already appears in `cv.md` (at `/mnt/c/Users/chris/Documents/GitHub/CV_Makeup/career-ops/cv.md`), an existing file in this repo, or the spec. If a field cannot be filled from those sources, leave it out and flag it — never invent a plausible value.
- **AAAI venue suppression.** The string `AAAI` must not appear anywhere in built output. BOCoDe is presented as an arXiv preprint with no venue named.
- **Hitachi confidentiality.** No figure, plot, geometry, or numerical result originating from the Hitachi Energy internship enters the site.
- **Author names.** Use the initials exactly as they appear in `cv.md`. Do not expand initials into full first names.
- **Spelling:** British/Swiss-English — `optimise`, `behaviour`, `modelling`, `analyse`.
- **Dates:** `MMM YYYY – MMM YYYY` (e.g. `Sep 2020 – Sep 2023`).
- **No emoji** in site content.
- **Do not rewrite existing narrative prose.** It is preserved as-is below the structured head. Only frontmatter is added and the closing `**Stack:**` / `**Tags:**` lines are removed where they duplicate new fields.
- **Build artefacts** (`_site/`, `.jekyll-cache/`) are never committed.

---

### Task 1: Bootstrap the local build and verification harness

Nothing in this plan can be verified until Jekyll builds locally. `bundle` is not installed; Ruby 3.2.3 and gem 3.4.20 are present.

**Files:**
- Create: `test/site-checks.mjs`
- Create: `test/README.md`
- Modify: `.gitignore`

**Interfaces:**
- Consumes: nothing
- Produces: `node test/site-checks.mjs` — exits 0 when all checks pass, 1 otherwise. Later tasks add checks by appending `check(name, fn)` calls to the `CHECKS` section of `test/site-checks.mjs`. Helpers available to those checks: `site(relPath)` returns built file contents as a string, `siteExists(relPath)` returns boolean, `allHtml()` returns the concatenated text of every `.html` file in `_site`.

- [ ] **Step 1: Install bundler into the user gem directory**

No sudo required.

```bash
cd /mnt/c/Users/chris/Documents/GitHub/Psych17101.github.io
gem install --user-install bundler
export PATH="$(ruby -e 'puts Gem.user_dir')/bin:$PATH"
bundle --version
```

Expected: `Bundler version 2.x.x`

If `bundle` is still not found, print `$(ruby -e 'puts Gem.user_dir')/bin` and add it to PATH explicitly.

- [ ] **Step 2: Install the project's gems locally**

```bash
bundle config set --local path vendor/bundle
bundle install
```

Expected: ends with `Bundle complete!`. This takes several minutes on first run.

If native extensions fail to compile, install build tooling: `sudo apt-get install -y build-essential ruby-dev zlib1g-dev`.

- [ ] **Step 3: Verify the site builds before any changes**

```bash
bundle exec jekyll build
```

Expected: `done in N seconds.` and `_site/index.html` exists.

This is the baseline. If it fails here, stop and fix the build before touching content — a later failure would otherwise be indistinguishable from one this task introduced.

- [ ] **Step 4: Write the verification harness**

Create `test/site-checks.mjs`:

```js
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
    fn();
    results.push({ name, ok: true });
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
```

- [ ] **Step 5: Write the harness usage note**

Create `test/README.md`:

```markdown
# Site checks

Assertions against the built site. There is no unit-test framework in this
repo; these checks guard the content rules that are easy to break silently —
venue suppression on the BOCoDe preprint, attribution, and the structured
project fields the portfolio criteria depend on.

Run:

    bundle exec jekyll build && node test/site-checks.mjs

Exits non-zero if any check fails. Add checks in the CHECKS section of
`site-checks.mjs`.
```

- [ ] **Step 6: Ignore local gem installs**

Add to `.gitignore`:

```
vendor/bundle
.bundle/config
```

- [ ] **Step 7: Run the harness to verify it passes**

```bash
bundle exec jekyll build && node test/site-checks.mjs
```

Expected:
```
  PASS  site builds and has a home page

1/1 checks passed
```

- [ ] **Step 8: Commit**

```bash
git add test/site-checks.mjs test/README.md .gitignore
git commit -m "test: add built-site verification harness

No test framework exists in this repo. These checks assert against _site
output to guard content rules that break silently — venue suppression,
attribution, and structured project fields.

Co-Authored-By: Claude Opus 5 <noreply@anthropic.com>"
```

---

### Task 2: Remove GITBO from the public repositories list

`_data/repositories.yml` publicly lists `chrishat310/GITBO` among the owner's repositories. The owner has confirmed it is not his work. This is an attribution correction, not tidying.

**Files:**
- Modify: `_data/repositories.yml`
- Modify: `test/site-checks.mjs`

**Interfaces:**
- Consumes: `check`, `allHtml`, `absent` from Task 1
- Produces: nothing consumed by later tasks

- [ ] **Step 1: Write the failing check**

In `test/site-checks.mjs`, inside the CHECKS section, after the existing home page check:

```js
check("GITBO does not appear anywhere in built output", () => {
  absent(allHtml(), "GITBO", "GITBO is not the owner's work and must not be listed");
  absent(allHtml(), "GIT-BO", "GIT-BO is not the owner's work and must not be listed");
});
```

- [ ] **Step 2: Run the check to verify it fails**

```bash
bundle exec jekyll build && node test/site-checks.mjs
```

Expected: `FAIL  GITBO does not appear anywhere in built output` with message `GITBO is not the owner's work and must not be listed`.

If this check unexpectedly PASSES, stop — it means the repositories page is not being built, and the removal below would be a no-op that hides the real problem.

- [ ] **Step 3: Remove the entry**

In `_data/repositories.yml`, delete the `chrishat310/GITBO` line so `github_repos` reads:

```yaml
github_repos:
  - IDEALLab/EngiOpt
  - chrishat310/chrishat310.github.io
  - chrishat310/GeoMod_ToolKit
```

Leave `github_users` and `repo_description_lines_max` unchanged.

- [ ] **Step 4: Run the check to verify it passes**

```bash
bundle exec jekyll build && node test/site-checks.mjs
```

Expected: `PASS  GITBO does not appear anywhere in built output`, 2/2 checks passed.

- [ ] **Step 5: Commit**

```bash
git add _data/repositories.yml test/site-checks.mjs
git commit -m "fix: remove GITBO from public repositories list

The repo sits on the owner's GitHub and reads as a credential, but the
work is not his. Listing it publicly is an attribution risk. Guarded by
a check so it cannot return silently.

Co-Authored-By: Claude Opus 5 <noreply@anthropic.com>"
```

---

### Task 3: Flagship layout and structured field schema

Introduces the content model. Piloted on one project so the schema is proven before it is applied four times.

**Files:**
- Create: `_layouts/flagship.liquid`
- Create: `_includes/project_meta.liquid`
- Create: `_sass/_projects-structured.scss`
- Modify: `assets/css/main.scss`
- Modify: `_projects/02_mixed_var_bo.md`
- Modify: `test/site-checks.mjs`

**Interfaces:**
- Consumes: `check`, `site`, `contains` from Task 1
- Produces: the frontmatter schema below, consumed by Tasks 4, 6 and 7. Field names are fixed: `tier`, `objective`, `role`, `methods`, `result`, `metrics` (list of `{label, value}`), `figures` (list of `{path, caption}`).

**The schema** (reference for all later tasks):

```yaml
---
layout: flagship          # flagship tier only; index tier keeps layout: page
title: <project title>
description: <one line, used on cards>
img: assets/img/projects/<slug>.png
tier: flagship            # or: index
category: software | simulation | mechanical | leadership
objective: >              # what the work had to achieve
role: >                   # the owner's specific contribution
methods: [Python, PyTorch]
result: >                 # outcome, evaluated against the objective
metrics:                  # optional; renders as a stat row
  - {label: Validated to, value: 2.5× working load}
figures:                  # flagships: 3 minimum
  - {path: assets/img/projects/<file>.png, caption: <caption>}
importance: 1
---
```

- [ ] **Step 1: Write the failing check**

In `test/site-checks.mjs`, in the CHECKS section:

```js
check("flagship page renders structured fields", () => {
  const html = site("projects/02_mixed_var_bo/index.html");
  contains(html, "proj-meta", "flagship layout did not render the structured meta block");
  contains(html, "Objective", "objective label missing");
  contains(html, "Contribution", "contribution label missing");
  contains(html, "Result", "result label missing");
});
```

- [ ] **Step 2: Run the check to verify it fails**

```bash
bundle exec jekyll build && node test/site-checks.mjs
```

Expected: `FAIL  flagship page renders structured fields` — either `missing built file` or `flagship layout did not render the structured meta block`.

- [ ] **Step 3: Create the structured meta include**

Create `_includes/project_meta.liquid`:

```liquid
<div class="proj-meta">
  {% if page.objective %}
    <div class="proj-meta-row">
      <span class="proj-meta-label">Objective</span>
      <div class="proj-meta-value">{{ page.objective | markdownify | remove: '<p>' | remove: '</p>' }}</div>
    </div>
  {% endif %}
  {% if page.role %}
    <div class="proj-meta-row">
      <span class="proj-meta-label">Contribution</span>
      <div class="proj-meta-value">{{ page.role | markdownify | remove: '<p>' | remove: '</p>' }}</div>
    </div>
  {% endif %}
  {% if page.result %}
    <div class="proj-meta-row">
      <span class="proj-meta-label">Result</span>
      <div class="proj-meta-value">{{ page.result | markdownify | remove: '<p>' | remove: '</p>' }}</div>
    </div>
  {% endif %}
  {% if page.methods and page.methods.size > 0 %}
    <div class="proj-meta-row">
      <span class="proj-meta-label">Methods</span>
      <div class="proj-meta-value">
        {% for m in page.methods %}<span class="proj-method">{{ m }}</span>{% endfor %}
      </div>
    </div>
  {% endif %}
</div>

{% if page.metrics and page.metrics.size > 0 %}
  <div class="proj-metrics">
    {% for metric in page.metrics %}
      <div class="proj-metric">
        <span class="proj-metric-value">{{ metric.value }}</span>
        <span class="proj-metric-label">{{ metric.label }}</span>
      </div>
    {% endfor %}
  </div>
{% endif %}
```

- [ ] **Step 4: Create the flagship layout**

Create `_layouts/flagship.liquid`:

```liquid
---
layout: default
---
<div class="post">
  <header class="post-header">
    <h1 class="post-title">{{ page.title }}</h1>
    <p class="post-description">{{ page.description }}</p>
  </header>

  <article>
    {% include project_meta.liquid %}

    {% if page.figures and page.figures.size > 0 %}
      <div class="proj-figures">
        {% for fig in page.figures %}
          <figure class="proj-figure">
            {% include figure.liquid loading="eager" path=fig.path class="img-fluid rounded z-depth-1" zoomable=true %}
            <figcaption>{{ fig.caption }}</figcaption>
          </figure>
        {% endfor %}
      </div>
    {% endif %}

    <div class="proj-narrative">
      {{ content }}
    </div>
  </article>
</div>
```

- [ ] **Step 5: Create the stylesheet**

Create `_sass/_projects-structured.scss`:

```scss
.proj-meta {
  display: grid;
  gap: 0;
  margin: 1.5rem 0;
  border-top: 1px solid var(--global-divider-color);
}

.proj-meta-row {
  display: grid;
  grid-template-columns: 8rem 1fr;
  gap: 1rem;
  padding: 0.75rem 0;
  border-bottom: 1px solid var(--global-divider-color);

  @media (max-width: 576px) {
    grid-template-columns: 1fr;
    gap: 0.25rem;
  }
}

.proj-meta-label {
  font-size: 0.75rem;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  color: var(--global-text-color-light);
  padding-top: 0.15rem;
}

.proj-meta-value {
  color: var(--global-text-color);
}

.proj-method {
  display: inline-block;
  font-size: 0.8rem;
  padding: 0.1rem 0.5rem;
  margin: 0 0.3rem 0.3rem 0;
  border: 1px solid var(--global-divider-color);
  border-radius: 3px;
  color: var(--global-text-color-light);
}

.proj-metrics {
  display: flex;
  flex-wrap: wrap;
  gap: 2rem;
  margin: 1.5rem 0;
  padding: 1rem 0;
  border-bottom: 1px solid var(--global-divider-color);
}

.proj-metric {
  display: flex;
  flex-direction: column;
}

.proj-metric-value {
  font-size: 1.5rem;
  font-weight: 600;
  color: var(--global-theme-color);
  line-height: 1.1;
}

.proj-metric-label {
  font-size: 0.75rem;
  letter-spacing: 0.06em;
  text-transform: uppercase;
  color: var(--global-text-color-light);
  margin-top: 0.2rem;
}

.proj-figures {
  display: grid;
  gap: 1.5rem;
  margin: 1.5rem 0;
}

.proj-figure figcaption {
  font-size: 0.85rem;
  color: var(--global-text-color-light);
  margin-top: 0.5rem;
}
```

- [ ] **Step 6: Import the stylesheet**

In `assets/css/main.scss`, add alongside the other `@import` lines for `_sass` partials:

```scss
@import "projects-structured";
```

Place it after the existing partial imports so its rules win any tie.

- [ ] **Step 7: Apply the schema to the pilot project**

In `_projects/02_mixed_var_bo.md`, replace the frontmatter block only. Leave every line of prose below it untouched.

All field values below must be verified against the existing prose in that file and against `cv.md` before writing. If the file's prose does not support a value, leave the field out rather than filling it.

```yaml
---
layout: flagship
title: Mixed-Variable Bayesian Optimization (MIT Thesis)
description: Mixed-variable Bayesian optimisation with Prior Fitted Networks for engineering design.
img: assets/img/projects/mixed-var-bo.png
tier: flagship
category: software
objective: >
  Make Bayesian optimisation work on engineering design problems whose
  variables are mixed — continuous dimensions alongside discrete and
  categorical choices — where standard surrogates assume continuity.
role: >
  MSc thesis at MIT's DeCoDe Lab.
methods: [Python, PyTorch, Bayesian Optimisation, Prior Fitted Networks]
figures:
  - path: assets/img/projects/mixed-var-bo-fig1.png
    caption: >
      Frozen tabular foundation models as surrogates: a base model produces
      mean, variance and quantile statistics that augment the input of a
      residual model, whose learned correction is added to the base prediction.
importance: 1
---
```

That caption is the one already present in the file's existing `<div class="caption">` block. After moving it into frontmatter, delete the now-duplicated figure include and caption block from the prose so the figure is not rendered twice.

`result` and `metrics` are deliberately omitted here. Fill them only from what the existing prose or `cv.md` actually states. If the thesis outcome is not stated in either, leave both fields out and report it in the task summary — do not invent a result.

- [ ] **Step 8: Run the check to verify it passes**

```bash
bundle exec jekyll build && node test/site-checks.mjs
```

Expected: `PASS  flagship page renders structured fields`, 3/3 checks passed.

Then open `_site/projects/02_mixed_var_bo/index.html` and confirm the narrative prose still appears in full below the structured block.

- [ ] **Step 10: Commit**

```bash
git add _layouts/flagship.liquid _includes/project_meta.liquid _sass/_projects-structured.scss assets/css/main.scss _projects/02_mixed_var_bo.md test/site-checks.mjs
git commit -m "feat: add flagship layout with structured project fields

Moves objective, contribution, methods and result out of prose into named
frontmatter fields so a reviewer can extract them in a 30-second skim, and
so the same data can drive the PDF portfolio later. Narrative prose is
preserved verbatim below the structured head.

Piloted on the mixed-variable BO project.

Co-Authored-By: Claude Opus 5 <noreply@anthropic.com>"
```

---

### Task 4: Apply the flagship schema to the remaining three flagships

**Files:**
- Modify: `_projects/01_engiopt.md`
- Modify: `_projects/14_battery_enclosure_opt.md`
- Modify: `_projects/12_nova_chassis.md`
- Modify: `test/site-checks.mjs`

**Interfaces:**
- Consumes: the schema and `flagship` layout from Task 3
- Produces: four pages with `tier: flagship`, consumed by Task 5's work page

- [ ] **Step 1: Write the failing checks**

In `test/site-checks.mjs`, CHECKS section:

```js
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
});
```

- [ ] **Step 2: Run the checks to verify they fail**

```bash
bundle exec jekyll build && node test/site-checks.mjs
```

Expected: `FAIL  all four flagships use the flagship layout` and `FAIL  NOVA states its validated load factor`.

- [ ] **Step 3: Convert EngiOpt**

In `_projects/01_engiopt.md`, replace the frontmatter. Prose untouched. Values below are drawn from the existing prose in that file — verify each before writing.

```yaml
---
layout: flagship
title: EngiOpt — 3D Generative Models (Open Source)
description: Extended generative models to 3D and merged them into the open-source EngiOpt library.
img: assets/img/projects/engiopt.png
tier: flagship
category: software
objective: >
  Take a family of generative models that had only ever produced 2D fields —
  GANs, SliceGAN, and a multi-variable Variational Autoencoder — and make
  them generate usable 3D volumes of engineering geometry.
role: >
  Re-implemented each model for 3D, trained them on engineering geometries,
  and contributed the work upstream as a single maintainer-reviewed pull
  request, iterating until it passed the project's ruff, mypy and pre-commit
  checks and answered review comments.
methods: [Python, PyTorch, GANs, SliceGAN, VAE]
result: >
  Merged into EngiOpt, the IDEAL Lab's open-source engineering-design
  optimisation library, as pull request #43. Training runs for the library's
  models are logged publicly on Weights & Biases.
metrics:
  - {label: Additions merged, value: ~2,100}
  - {label: Pull request, value: IDEALLab/EngiOpt #43}
importance: 2
---
```

The `figures` key is omitted deliberately. This file contains **zero** `figure.liquid` includes — its only image is the card thumbnail at `assets/img/projects/engiopt.png`, and there is no existing caption to reuse. The flagship minimum is three figures, so this page ships short.

Report the shortfall in the task summary. Do not fabricate figures and do not promote the thumbnail into the figure list to make the count look better — it is a card image, not evidence.

- [ ] **Step 4: Convert the battery enclosure project**

In `_projects/14_battery_enclosure_opt.md`, replace the frontmatter. Prose untouched. Cross-check every value against the prose in that file and the `cv.md` entry, which reads: *"Multi-objective NSGA optimisation of battery enclosures — parametric design driving automated FEA inside the optimisation loop: wrote Fortran user subroutines for Abaqus, generated and edited Abaqus input decks programmatically alongside Nastran bulk-data scripting, and automated job submission and output parsing to feed objectives back to the optimiser."*

```yaml
---
layout: flagship
title: Multi-Objective Optimization of EV Battery Enclosures
description: Parametric design driving automated FEA inside a multi-objective optimisation loop.
img: assets/img/projects/battery-enclosure.png
tier: flagship
category: simulation
objective: >
  Optimise an electric-vehicle battery enclosure against competing
  objectives, with the structural evaluation driven automatically by finite
  element analysis rather than by hand.
role: >
  Built the automation that closes the optimisation loop: wrote Fortran user
  subroutines for Abaqus, generated and edited Abaqus input decks
  programmatically alongside Nastran bulk-data scripting, and automated job
  submission and output parsing so objectives feed straight back to the
  optimiser.
methods: [NSGA, Abaqus, Fortran, Nastran, FEA, Python]
figures:
  - path: assets/img/projects/battery-enclosure.png
    caption: >
      Pareto front from the NSGA search: penetration resistance versus
      specific energy absorption, coloured along the front.
  - path: assets/img/projects/battery-enclosure-fig1.png
    caption: >
      Design-space exploration over all evaluated designs, coloured by each
      design variable — sheet thicknesses and materials, core height, angle
      and element count.
importance: 3
---
```

Both captions are the ones already in the file's `<div class="caption">` blocks, with `colored` corrected to `coloured` per the British-spelling constraint. After moving them into frontmatter, delete the duplicated figure includes and caption blocks from the prose.

`result` is omitted. Fill it only if the existing prose states an outcome — otherwise report it as a gap.

- [ ] **Step 5: Convert NOVA**

In `_projects/12_nova_chassis.md`, replace the frontmatter. Prose untouched.

The `result` value below was confirmed factual by the owner on 2026-09-10: 2.5× working load under a dynamic load case. The `dynamic` qualifier is load-bearing and must not be dropped or softened to a generic "load test".

```yaml
---
layout: flagship
title: NOVA Electric Racing — Bike Chassis
description: Lead chassis engineer for an electric racing-bike prototype.
img: assets/img/projects/nova-chassis.png
tier: flagship
category: mechanical
objective: >
  A frame that carries a rider, a heavy battery and racing loads without
  adding weight it does not need.
role: >
  Lead Chassis Engineer, leading a team of six. Ran FEM analysis across 20+
  components, iterating geometry against the load cases the frame had to
  survive, and developed the outer shell and seat in flax-fibre composite,
  fabricating the negative moulds directly.
methods: [Ansys, FEM, Composites, CAD]
result: >
  Validated to 2.5× working load under a dynamic load case, then passed
  ride-along testing on the prototype.
metrics:
  - {label: Validated to, value: 2.5× working load (dynamic)}
  - {label: Components analysed, value: 20+}
  - {label: Team led, value: 6}
figures:
  - path: assets/img/projects/nova-chassis-fig1.png
    caption: >
      Ansys FEM stress result for one of the chassis components, one of the
      20+ parts sized for the frame.
  - path: assets/img/projects/nova-chassis-fig2.png
    caption: CAD of the swingarm.
importance: 4
---
```

The file currently carries both images in one two-column row under a single combined caption reading *"Ansys FEM stress result for one of the chassis components (left) and CAD of the swingarm (right), one of the 20+ parts sized for the frame."* Split it as above, since the flagship layout renders each figure with its own caption. Delete the original figure row and caption block from the prose.

- [ ] **Step 6: Run the checks to verify they pass**

```bash
bundle exec jekyll build && node test/site-checks.mjs
```

Expected: `PASS  all four flagships use the flagship layout` and `PASS  NOVA states its validated load factor`, 5/5 checks passed.

- [ ] **Step 7: Commit**

```bash
git add _projects/01_engiopt.md _projects/12_nova_chassis.md _projects/14_battery_enclosure_opt.md test/site-checks.mjs
git commit -m "feat: convert remaining flagships to structured schema

EngiOpt, battery enclosure and NOVA. NOVA now states its validated result
(2.5x working load, dynamic case), which the portfolio criteria require and
the page previously left qualitative.

Co-Authored-By: Claude Opus 5 <noreply@anthropic.com>"
```

---

### Task 5: Tiered work page and navigation

Replaces the flat 15-card grid with a flagship tier and a compact index, and collapses the nav to `work · publications · cv`.

**Files:**
- Create: `_pages/work.md`
- Create: `_includes/project_index_row.liquid`
- Delete: `_pages/projects.md`
- Modify: `_pages/repositories.md`
- Modify: `_sass/_projects-structured.scss`
- Modify: `test/site-checks.mjs`

**Interfaces:**
- Consumes: `tier` frontmatter from Tasks 3 and 4
- Produces: `/work/` as the canonical project listing. Projects with `tier: flagship` render as large cards; everything else renders as index rows grouped by `category`.

- [ ] **Step 1: Write the failing checks**

```js
check("work page separates flagship and index tiers", () => {
  const html = site("work/index.html");
  contains(html, "work-flagships", "flagship section missing from /work/");
  contains(html, "work-index", "index section missing from /work/");
  contains(html, "NOVA Electric Racing", "NOVA should appear in the flagship tier");
});

check("repositories page is not in the nav", () => {
  const html = site("index.html");
  absent(html, 'href="/repositories/"', "repositories should no longer be a nav item");
});
```

- [ ] **Step 2: Run the checks to verify they fail**

```bash
bundle exec jekyll build && node test/site-checks.mjs
```

Expected: both FAIL — `missing built file: work/index.html` and the repositories nav assertion.

- [ ] **Step 3: Create the index row include**

Create `_includes/project_index_row.liquid`:

```liquid
<a class="work-index-row" href="{{ project.url | relative_url }}">
  <span class="work-index-title">{{ project.title }}</span>
  <span class="work-index-desc">{{ project.description }}</span>
</a>
```

- [ ] **Step 4: Create the work page**

Create `_pages/work.md`:

```liquid
---
layout: page
title: work
permalink: /work/
description: Selected engineering and machine-learning projects.
nav: true
nav_order: 1
---

{% assign flagships = site.projects | where: "tier", "flagship" | sort: "importance" %}
{% assign index_projects = site.projects | where_exp: "p", "p.tier != 'flagship'" %}

<section class="work-flagships">
  <h2 class="work-section-title">Selected work</h2>
  <div class="row row-cols-1 row-cols-md-2">
    {% for project in flagships %}
      {% include projects.liquid %}
    {% endfor %}
  </div>
</section>

<section class="work-index">
  <h2 class="work-section-title">Everything else</h2>
  {% assign categories = "software,simulation,mechanical,leadership" | split: "," %}
  {% for category in categories %}
    {% assign in_category = index_projects | where: "category", category | sort: "importance" %}
    {% if in_category.size > 0 %}
      <h3 class="work-index-category">{{ category }}</h3>
      <div class="work-index-list">
        {% for project in in_category %}
          {% include project_index_row.liquid %}
        {% endfor %}
      </div>
    {% endif %}
  {% endfor %}
</section>
```

- [ ] **Step 5: Remove the old projects page and the repositories nav entry**

```bash
git rm _pages/projects.md
```

In `_pages/repositories.md`, set `nav: false` in the frontmatter, leaving the rest of the file unchanged. The page still builds and remains reachable by URL; it simply leaves the navigation bar.

- [ ] **Step 6: Promote the Swiss Solar Boat index entry**

The spec calls Swiss Solar Boat a "promoted index entry". Index rows sort by `importance` within each category, so promotion has one concrete mechanism: make it sort first under `mechanical`.

Current mechanical ordering is Axalp cooling (1), solar boat (2), composite panel (4). Since NOVA has left this category for the flagship tier, renumber so solar boat leads:

- `_projects/11_solar_boat.md` → `importance: 1`
- `_projects/10_axalp_cooling.md` → `importance: 2`
- `_projects/15_composite_panel.md` → unchanged at `4`

Change only the `importance` line in each file. This is the entire mechanism of "promotion" in this plan — the visual treatment of index rows is uniform, and any further emphasis belongs to Plan 2.

- [ ] **Step 7: Style the tiers**

Append to `_sass/_projects-structured.scss`:

```scss
.work-section-title {
  margin-top: 2rem;
  margin-bottom: 1rem;
}

.work-index-category {
  font-size: 0.8rem;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  color: var(--global-text-color-light);
  margin: 1.5rem 0 0.5rem;
}

.work-index-list {
  display: grid;
  gap: 0;
  border-top: 1px solid var(--global-divider-color);
}

.work-index-row {
  display: grid;
  grid-template-columns: minmax(12rem, 20rem) 1fr;
  gap: 1rem;
  padding: 0.7rem 0;
  border-bottom: 1px solid var(--global-divider-color);
  color: inherit;
  text-decoration: none;

  &:hover .work-index-title {
    color: var(--global-theme-color);
  }

  @media (max-width: 576px) {
    grid-template-columns: 1fr;
    gap: 0.15rem;
  }
}

.work-index-title {
  font-weight: 500;
}

.work-index-desc {
  color: var(--global-text-color-light);
  font-size: 0.9rem;
}
```

- [ ] **Step 8: Run the checks to verify they pass**

```bash
bundle exec jekyll build && node test/site-checks.mjs
```

Expected: `PASS  work page separates flagship and index tiers` and `PASS  repositories page is not in the nav`, 7/7 checks passed.

- [ ] **Step 9: Fix inbound links to the old projects page**

```bash
grep -rn "/projects/" _pages _projects _includes _layouts _config.yml | grep -v "assets/img/projects"
```

Update every hit to `/work/`. The about page links to `/projects/` in its closing paragraph and must be changed.

Rebuild and re-run the checks after editing.

- [ ] **Step 10: Commit**

```bash
git add _pages/work.md _includes/project_index_row.liquid _sass/_projects-structured.scss _pages/repositories.md _pages/about.md test/site-checks.mjs
git add -u
git commit -m "feat: tier the work page into flagships and index

Replaces the flat 15-card grid. Four flagships get card treatment; the rest
become a compact index grouped by category, so a reviewer can tell which
projects are being put forward. Repositories leaves the nav.

Co-Authored-By: Claude Opus 5 <noreply@anthropic.com>"
```

---

### Task 6: Three new project pages from cv.md

Adds GEFCom2014, CAD-to-CAD retrieval, and spectral/modal analysis. Content comes from `cv.md` at `/mnt/c/Users/chris/Documents/GitHub/CV_Makeup/career-ops/cv.md`, section `## Projects`.

**Files:**
- Create: `_projects/16_load_forecasting.md`
- Create: `_projects/17_cad_retrieval.md`
- Create: `_projects/18_modal_analysis.md`
- Modify: `test/site-checks.mjs`

**Interfaces:**
- Consumes: the index-tier schema from Task 5
- Produces: three index-tier pages under `software` and `simulation`

- [ ] **Step 1: Write the failing check**

```js
check("three new projects exist in the index tier", () => {
  for (const slug of ["16_load_forecasting", "17_cad_retrieval", "18_modal_analysis"]) {
    assert(siteExists(`projects/${slug}/index.html`), `missing new project page: ${slug}`);
  }
  const work = site("work/index.html");
  contains(work, "Probabilistic Load Forecasting", "load forecasting missing from /work/");
  contains(work, "CAD-to-CAD Retrieval", "CAD retrieval missing from /work/");
});
```

- [ ] **Step 2: Run the check to verify it fails**

```bash
bundle exec jekyll build && node test/site-checks.mjs
```

Expected: `FAIL  three new projects exist in the index tier` — `missing new project page: 16_load_forecasting`.

- [ ] **Step 3: Create the load forecasting page**

Create `_projects/16_load_forecasting.md`. Every claim below traces to the `cv.md` bullet; add nothing beyond it.

```markdown
---
layout: page
title: Probabilistic Load Forecasting — GEFCom2014
description: Month-ahead hourly electricity load as 99-quantile predictive distributions.
tier: index
category: software
objective: >
  Produce month-ahead hourly electricity load forecasts as full predictive
  distributions rather than point estimates, scored by pinball loss.
role: >
  Built and benchmarked gradient-boosted quantile models and weather-scenario
  ensembles against a conditional-climatology baseline, with three-layer
  leakage guards and calibration and coverage analysis, evaluated over a
  15-fold rolling-origin backtest.
methods: [Python, Quantile Regression, Gradient Boosting, Backtesting]
result: >
  Denied forecast-month weather, the learned models were statistically
  indistinguishable from the baseline (p = 0.89) — isolating weather-forecast
  error from load-model error.
metrics:
  - {label: Quantiles predicted, value: 99}
  - {label: Backtest, value: 15-fold rolling origin}
  - {label: vs baseline, value: p = 0.89}
importance: 5
---

Forecasting electricity load a month ahead is not really a forecasting problem — it is a weather problem wearing a forecasting problem's clothes. The GEFCom2014 task asks for hourly load over a month, and the honest question is how much of any model's apparent skill is the model and how much is the weather data it was handed.

The forecasts are distributions, not numbers: 99 quantiles per hour, scored by pinball loss. I benchmarked gradient-boosted quantile models and weather-scenario ensembles against a conditional-climatology baseline, over a 15-fold rolling-origin backtest, with three separate layers of leakage guards — because in a task like this, leakage is the difference between a result and an artefact.

The interesting outcome was a negative one. Denied forecast-month weather, the learned models were statistically indistinguishable from the conditional-climatology baseline (p = 0.89). That is not a failed experiment; it is the experiment working. It cleanly separates weather-forecast error from load-model error, and it says something specific about where effort in this task is actually worth spending.
```

- [ ] **Step 4: Create the CAD retrieval page**

Create `_projects/17_cad_retrieval.md`:

```markdown
---
layout: page
title: CAD-to-CAD Retrieval
description: Shape retrieval over a 1,008-part b-rep corpus with a four-family evaluation.
tier: index
category: software
objective: >
  Retrieve geometrically similar CAD parts from a b-rep corpus, and establish
  how far the retrieval could actually be trusted.
role: >
  Built shape-distribution (D2) descriptors plus scalar geometry features with
  exact k-nearest-neighbour retrieval, then evaluated it with four independent
  evidence families — self-retrieval, stability under resampling, an
  independent construction-label referee, and a distance-based confidence
  gauge — against a hand-labelled gold set.
methods: [Python, B-rep, Shape Descriptors, k-NN]
result: >
  Precision@5 of 0.387 on a hand-labelled 277-pair gold set.
metrics:
  - {label: Corpus, value: 1,008 parts}
  - {label: Gold set, value: 277 pairs}
  - {label: Precision@5, value: 0.387}
importance: 6
---

Retrieval over CAD geometry has an evaluation problem before it has a modelling problem. "Similar" is not defined anywhere in a b-rep file, so any number you report is only as good as the definition of similarity you can defend.

The retrieval itself is deliberately classical: shape-distribution (D2) descriptors alongside scalar geometry features, with exact k-nearest-neighbour search over a 1,008-part corpus. No learned representation — which makes the result a floor rather than a ceiling, and makes it interpretable.

Most of the work went into the evaluation, not the retrieval. I used four independent evidence families: self-retrieval, stability under resampling of the descriptor, an independent construction-label referee, and a distance-based confidence gauge. Four families that can disagree is a stronger instrument than one metric that cannot. Against a hand-labelled 277-pair gold set the system reaches precision@5 of 0.387 — a modest number, honestly measured, on a task where a flattering number would have been easy to produce.
```

- [ ] **Step 5: Create the modal analysis page**

Create `_projects/18_modal_analysis.md`:

```markdown
---
layout: page
title: Spectral and Modal Analysis of Aluminium Plates
description: Reconstructive testing to identify critical resonance frequencies.
tier: index
category: simulation
objective: >
  Identify the critical resonance frequencies of aluminium plates through
  experimental testing.
role: >
  Ran spectral and modal analysis through reconstructive testing, extracting
  the resonance frequencies that matter for the structure's behaviour.
methods: [Modal Analysis, Spectral Analysis, Experimental Testing]
importance: 7
---

Every structure has frequencies at which it would rather not be excited. Finding them on paper is one exercise; finding them on a real plate, with real boundary conditions and a real excitation, is a different one — and the two do not always agree.

This project used reconstructive testing on aluminium plates to identify the critical resonance frequencies experimentally, through spectral and modal analysis. It is the only piece of experimental validation in this portfolio, and it is the one that most directly taught me why a passing simulation is a hypothesis rather than a result.
```

Note: this page has no figure and no quantified result, because `cv.md` provides neither. Report both gaps in the task summary. Do not invent a frequency value.

- [ ] **Step 6: Run the check to verify it passes**

```bash
bundle exec jekyll build && node test/site-checks.mjs
```

Expected: `PASS  three new projects exist in the index tier`, 8/8 checks passed.

- [ ] **Step 7: Commit**

```bash
git add _projects/16_load_forecasting.md _projects/17_cad_retrieval.md _projects/18_modal_analysis.md test/site-checks.mjs
git commit -m "feat: add three projects from cv.md

GEFCom2014 probabilistic load forecasting, CAD-to-CAD retrieval, and
spectral/modal analysis — all present in cv.md but absent from the site.
Adds the portfolio's only experimental-validation work.

Co-Authored-By: Claude Opus 5 <noreply@anthropic.com>"
```

---

### Task 7: Publications section

`_bibliography/papers.bib` is currently 0 bytes and jekyll-scholar is already in the Gemfile. The AAAI venue must not appear in output.

**Files:**
- Modify: `_bibliography/papers.bib`
- Create: `_pages/publications.md`
- Modify: `_projects/02_mixed_var_bo.md`
- Modify: `test/site-checks.mjs`

**Interfaces:**
- Consumes: jekyll-scholar's `{% bibliography %}` tag, already configured in `_config.yml`
- Produces: `/publications/` in the nav

- [ ] **Step 1: Write the failing checks**

The venue check is the important one and must run across the whole site, not just the publications page.

```js
check("publications page lists both papers", () => {
  const html = site("publications/index.html");
  contains(html, "BOCoDe", "BOCoDe missing from publications");
  contains(html, "Mixed", "Mixed & Matched missing from publications");
});

check("AAAI is never named in built output", () => {
  absent(
    allHtml(),
    "AAAI",
    "AAAI policy forbids non-anonymous online material naming the venue — summary-rejection risk"
  );
});
```

- [ ] **Step 2: Run the checks to verify the publications one fails**

```bash
bundle exec jekyll build && node test/site-checks.mjs
```

Expected: `FAIL  publications page lists both papers` (missing built file). The AAAI check should already PASS — that is correct and it is there as a regression guard, not a red-to-green step.

- [ ] **Step 3: Populate the bibliography**

Write `_bibliography/papers.bib`. Author names use the initials exactly as given in `cv.md` — do not expand them.

Note that BOCoDe carries **no `journal` naming a conference or venue**. It is an arXiv preprint and nothing more until the decision is out.

```bibtex
@article{yu2026bocode,
  title         = {BOCoDe: Engineering-Centered Benchmarking for Bayesian Optimization},
  author        = {Yu, R. T.-Y. and Hatterer, C. and Narayanan, A. and Picard, C. and Ahmed, F.},
  year          = {2026},
  eprint        = {2608.15073},
  archivePrefix = {arXiv},
  journal       = {arXiv preprint arXiv:2608.15073},
  url           = {https://arxiv.org/abs/2608.15073},
  abbr          = {preprint},
  selected      = {true}
}

@article{hatterer2026mixed,
  title    = {Mixed \& Matched: Surrogate or Search for Mixed-Variable Bayesian Optimization in Engineering Design},
  author   = {Hatterer, C. and Yu, R. T.-Y. and Ahmed, F.},
  year     = {2026},
  journal  = {Manuscript in submission, Transactions on Machine Learning Research (TMLR)},
  abbr     = {TMLR},
  selected = {true}
}
```

- [ ] **Step 4: Create the publications page**

Create `_pages/publications.md`:

```liquid
---
layout: page
permalink: /publications/
title: publications
description: Peer-reviewed and preprint work in Bayesian optimisation for engineering design.
nav: true
nav_order: 2
---

<div class="publications">
  {% bibliography %}
</div>
```

- [ ] **Step 5: Link the thesis project to its paper**

In `_projects/02_mixed_var_bo.md`, append this line to the end of the prose:

```markdown
The work behind this project appears in [Mixed & Matched: Surrogate or Search for Mixed-Variable Bayesian Optimization in Engineering Design](/publications/), currently in submission.
```

- [ ] **Step 6: Run the checks to verify they pass**

```bash
bundle exec jekyll build && node test/site-checks.mjs
```

Expected: `PASS  publications page lists both papers` and `PASS  AAAI is never named in built output`, 10/10 checks passed.

If the bibliography renders empty, confirm `scholar:` settings in `_config.yml` point at `_bibliography` and that `bibliography: papers.bib` matches the filename.

- [ ] **Step 7: Verify nav ordering**

Open `_site/index.html` and confirm the nav reads `work · publications · cv`. `work` is `nav_order: 1`, `publications` is `2`; check `_pages/cv.md` has a higher `nav_order` than both and adjust it if not.

- [ ] **Step 8: Commit**

```bash
git add _bibliography/papers.bib _pages/publications.md _projects/02_mixed_var_bo.md test/site-checks.mjs
git commit -m "feat: add publications section

Two papers that were in cv.md but nowhere on the site. BOCoDe ships as an
arXiv preprint with no venue named — AAAI policy forbids non-anonymous
online material stating the submission, on pain of summary rejection. A
check now guards this across all built output.

Co-Authored-By: Claude Opus 5 <noreply@anthropic.com>"
```

---

### Task 8: Update the about page and close out

**Files:**
- Modify: `_pages/about.md`
- Modify: `test/site-checks.mjs`

**Interfaces:**
- Consumes: `/work/` and `/publications/` from Tasks 5 and 7
- Produces: nothing

- [ ] **Step 1: Write the failing check**

```js
check("about page points at work and publications", () => {
  const html = site("index.html");
  contains(html, "/work/", "about page should link to /work/");
  contains(html, "/publications/", "about page should link to /publications/");
});
```

- [ ] **Step 2: Run the check to verify it fails**

```bash
bundle exec jekyll build && node test/site-checks.mjs
```

Expected: `FAIL  about page points at work and publications`.

- [ ] **Step 3: Update the closing paragraph**

In `_pages/about.md`, replace the final paragraph. Everything above it stays as written.

```markdown
This site collects my work across **software &amp; ML**, **simulation &amp; modelling**, **mechanical &amp; hardware**, and **team leadership**. Start with the four projects on the [work](/work/) page, see [publications](/publications/), or read my [CV](/cv/).
```

- [ ] **Step 4: Update the subtitle for the industry audience**

In `_pages/about.md` frontmatter, replace the `subtitle` line:

```yaml
subtitle: MSc Computational Science &amp; Engineering, ETH Zürich · MIT thesis · machine learning for engineering design
```

- [ ] **Step 5: Run the full suite**

```bash
bundle exec jekyll build && node test/site-checks.mjs
```

Expected: 11/11 checks passed.

- [ ] **Step 6: Verify the site by eye**

```bash
bundle exec jekyll serve --livereload
```

Open `http://localhost:4000` and confirm:
- Nav reads `work · publications · cv`
- `/work/` shows four flagship cards, then a grouped index
- Each flagship page shows Objective / Contribution / Result / Methods above the narrative
- NOVA shows the three metric tiles
- `/publications/` lists both papers and names no venue for BOCoDe
- No page 404s

- [ ] **Step 7: Commit**

```bash
git add _pages/about.md test/site-checks.mjs
git commit -m "feat: point about page at the new work and publications pages

Co-Authored-By: Claude Opus 5 <noreply@anthropic.com>"
```

---

## Deferred to later plans

- **Plan 2 — Register C theme and filterable index.** Gradient hero confined to its band, accent sampled from the owner's figures, engineering type pairing, scroll-reveal motion with `prefers-reduced-motion` honoured, dark variant, and filtering of the index by method/stack/domain.
- **Plan 3 — Bayesian optimisation demo.** Canvas teaser on the landing page, full interactive version on the mixed-variable BO project page, static fallback.
- **Plan 4 — PDF pipeline.** `/portfolio/print/` route, flat print stylesheet, `generate-portfolio-pdf.mjs` via Playwright.

## Known gaps to report on completion

These are content shortfalls that this plan surfaces but cannot fix, because filling them would mean inventing facts:

1. **EngiOpt has one figure**; the flagship minimum is three.
2. **Battery enclosure has no stated result** — two figures, but no outcome sentence in the existing prose.
3. **Mixed-variable BO may have no stated result** — check the prose; if absent, the owner must supply it.
4. **Modal analysis has no figure and no quantified result.**
5. **Hitachi remains figureless by design** and is now an index page (spec §8).
