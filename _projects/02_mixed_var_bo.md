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

Engineering design is full of expensive questions. Every time you want to know how a candidate design performs, you might have to run a finite-element crash simulation, a CFD solve, or a physical test — minutes to hours per evaluation. You cannot afford to try thousands of designs, so you have to be clever about which handful you try next. That is the problem my master's thesis at **MIT's DeCoDe Lab** — _Mixed-Variable Bayesian Optimization for Engineering Problems with Tabular Foundation Models_ — is built around: **mixed-variable Bayesian optimisation**, where the design space is an awkward mixture of continuous knobs (a thickness, an angle) and discrete choices (which material, how many ribs).

What makes this timely is the surrogate. Classical Bayesian optimisation leans on a Gaussian process, which is elegant but struggles with mixed variables and does not transfer knowledge across problems. I build instead on **tabular foundation models** — networks pre-trained on huge numbers of synthetic tabular tasks that can produce a calibrated predictive distribution for a new dataset in a single forward pass, no per-problem retraining. The trick I work with is to keep that foundation model frozen and wrap a small learned correction around it:

A thesis like this only means something if the numbers are trustworthy, so I spent as much effort on the evaluation as on the method: a theoretical mixed-variable benchmark split of my own, feeding a paper in preparation, plus nine curated engineering-design benchmarks so that different methods can be compared on a common footing rather than each author's favourite toy problem.

The codebase (`mvbo`) is a packaged, tested Python library rather than a pile of experiment scripts: roughly 3,000 lines of `pytest` tests, `ruff` and `mypy` in the loop, a registry-based architecture for surrogates / acquisitions / encodings, Hydra configuration, Weights & Biases experiment tracking, and SLURM / `submitit` orchestration on HPC clusters. That structure was not gold-plating — running hundreds of optimisation trials across nine benchmarks on a cluster is only reproducible if the configuration and the logging are disciplined from the start.

Coming to machine learning from mechanical engineering, the thing I care about most here is that the surrogate's uncertainty is honest. A model whose failure mode is a wrong answer about a real device is a very different object from one whose failure mode is a slightly worse validation loss, and how certain the surrogate is decides whether an engineer can actually act on what it says.

**Stack:** Python, PyTorch, BoTorch, GPyTorch &nbsp;·&nbsp; **Tags:** Bayesian optimisation, foundation models, HPC, software architecture
Supervised by Prof. Faez Ahmed and Prof. Mark Fuge.

The work behind this project appears in [Mixed & Matched: Surrogate or Search for Mixed-Variable Bayesian Optimization in Engineering Design](/publications/), currently in submission.
