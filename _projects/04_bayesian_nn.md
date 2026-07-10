---
layout: page
title: Bayesian Neural Network for Satellite Imagery
description: Uncertainty-aware satellite image classification with SWA-Gaussian.
img: assets/img/projects/bayesian-nn.png
importance: 4
category: software
---

A neural network that is confidently wrong is worse than one that admits it does not know. That is the whole motivation here. The task was to classify 60 × 60 RGB satellite images into six land-use categories from only **1,800 labelled training images** — a small-data regime where an ordinary network overfits and then reports 99% confidence on images it has effectively never seen anything like. When those predictions feed a decision that matters, the confidence is the dangerous part.

So instead of a single deterministic network I built a **Bayesian Neural Network** with **SWA-Gaussian**. The idea behind SWAG (Maddox et al., 2019) is neat and cheap: as stochastic gradient descent wanders around a good region of weight space near the end of training, you record the trajectory and fit a Gaussian to it, treating that as an approximate posterior over the weights. At test time you sample several networks from that posterior and average their predictions — where they agree you are confident, where they disagree you are not. I implemented **both variants**: SWAG-diagonal, and full SWAG with its low-rank-plus-diagonal covariance that captures correlations between weights the diagonal version throws away.

The measurement I trusted was not raw accuracy but **Expected Calibration Error** — does a set of predictions made at 80% confidence actually come true about 80% of the time? I compared the SWAG posteriors against a temperature-scaled baseline, a simpler and much cheaper recalibration, precisely so I would not fool myself into thinking the Bayesian machinery was earning its keep when a one-parameter fix would have done.

The honest result is a trade, and I like it for being honest: the Bayesian model gives up a little accuracy on the easy images in exchange for far more sober confidence on the ambiguous ones. For anything where you act on the prediction, that is the trade worth making — and it is the same conviction, that a model's stated uncertainty is what decides whether anyone can use it, that runs through my Gaussian-process and Bayesian-optimisation work.

**Stack:** Python, PyTorch &nbsp;·&nbsp; **Tags:** deep learning, uncertainty quantification, calibration
