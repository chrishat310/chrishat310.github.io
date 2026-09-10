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
  - {label: Corpus, value: "1,008 parts"}
  - {label: Gold set, value: 277 pairs}
  - {label: Precision@5, value: 0.387}
importance: 6
---

Retrieval over CAD geometry has an evaluation problem before it has a modelling problem. "Similar" is not defined anywhere in a b-rep file, so any number you report is only as good as the definition of similarity you can defend.

The retrieval itself is deliberately classical: shape-distribution (D2) descriptors alongside scalar geometry features, with exact k-nearest-neighbour search over a 1,008-part corpus. No learned representation — which makes the result a floor rather than a ceiling, and makes it interpretable.

Most of the work went into the evaluation, not the retrieval. I used four independent evidence families: self-retrieval, stability under resampling of the descriptor, an independent construction-label referee, and a distance-based confidence gauge. Four families that can disagree is a stronger instrument than one metric that cannot. Against a hand-labelled 277-pair gold set the system reaches precision@5 of 0.387 — a modest number, honestly measured, on a task where a flattering number would have been easy to produce.
