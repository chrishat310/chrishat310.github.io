---
layout: page
title: EngiOpt — 3D Generative Models (Open Source)
description: Extended generative models to 3D and merged them into the open-source EngiOpt library.
img: assets/img/projects/engiopt.png
importance: 1
category: software
---

Most generative-design research lives in 2D — square images of cross-sections, silhouettes, or slices — because a 2D model is easy to train and easy to look at. Real engineering geometry is not 2D. For my MSc semester project with the **IDEAL Lab** (AI in Engineering Design), the task was to take a family of generative models that had only ever produced 2D fields — GANs, SliceGAN, and a multi-variable Variational Autoencoder — and make them generate proper **3D volumes** of engineering geometry.

The jump from 2D to 3D is not a matter of bolting an extra dimension onto a tensor and hoping. Memory blows up, the convolutions change, and the failure modes are quietly different: a model can look like it is converging while producing 3D blobs that are physically meaningless. SliceGAN was the interesting case — it reconstructs a 3D volume by training the generator against 2D slices taken through it, so getting the slicing geometry and the discriminator right was most of the battle. I re-implemented each model, got them training on 3D engineering geometries, and checked that what came out was actually usable rather than merely plausible.

The part I am most glad I did was refusing to let it stay a private research script. I contributed the whole thing upstream to **[EngiOpt](https://github.com/IDEALLab/EngiOpt)**, the lab's open-source engineering-design optimisation library, as a single maintainer-reviewed pull request ([IDEALLab/EngiOpt #43](https://github.com/IDEALLab/EngiOpt/pull/43)) — roughly 2,100 additions across dozens of commits. That meant iterating the code until it passed the project's `ruff`, `mypy`, and pre-commit checks, then reworking it again to answer a maintainer's review comments. Training runs for the library's models are logged publicly on [Weights & Biases](https://wandb.ai/engibench/engiopt), so the results are reproducible rather than taken on trust.

Working to someone else's CI and review standards was the real lesson. Research code is only useful if another person can pick it up, run it, and build on it — the pull request forced a discipline that a lone notebook never would, and it is the habit I have carried into every codebase since.

**Stack:** Python, PyTorch &nbsp;·&nbsp; **Tags:** generative models, 3D, open source, code review
Supervised by Prof. Mark Fuge and Dr. Florian Felten.
