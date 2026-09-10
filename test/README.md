# Site checks

Assertions against the built site. There is no unit-test framework in this
repo; these checks guard the content rules that are easy to break silently —
venue suppression on the BOCoDe preprint, attribution, and the structured
project fields the portfolio criteria depend on.

Run:

    bundle exec jekyll build && node test/site-checks.mjs

Exits non-zero if any check fails. Checks must be synchronous — an async check would return a Promise before its assertions run, recording a false pass. Add checks in the CHECKS section of `site-checks.mjs`.
