---
layout: page
title: Mixed-Variable Bayesian Optimization (MIT Thesis)
description: Bayesian optimisation over mixed variables with foundation-model surrogates.
img: assets/img/projects/mixed-var-bo.png
importance: 2
category: software
---

My master's thesis at **MIT's DeCoDe Lab**, _Mixed-Variable Bayesian Optimization for Engineering Problems with Tabular Foundation Models_, studies **mixed-variable Bayesian optimisation** for engineering design using tabular foundation-model surrogates.

The codebase (`mvbo`) is a packaged, tested Python library: roughly 3,000 lines of `pytest` tests, `ruff` and `mypy` in the loop, a registry-based architecture for surrogates / acquisitions / encodings, Hydra configuration, Weights & Biases experiment tracking, and SLURM / `submitit` orchestration on HPC clusters.

**Stack:** Python, PyTorch, BoTorch, GPyTorch &nbsp;·&nbsp; **Tags:** Bayesian optimisation, foundation models, HPC, software architecture
Supervised by Prof. Faez Ahmed and Prof. Mark Fuge.
