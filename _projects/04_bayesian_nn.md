---
layout: page
title: Bayesian Neural Network for Satellite Imagery
description: Uncertainty-aware satellite image classification with SWA-Gaussian.
img: assets/img/projects/bayesian-nn.png
importance: 4
category: software
---

Built a **Bayesian Neural Network** using **SWA-Gaussian** for satellite image classification, quantifying predictive uncertainty to reduce false positives in critical decisions.

The task: classifying 60 × 60 RGB satellite images into six land-use categories from only 1,800 labeled training images — a small-data setting where a plain network is confidently wrong far too often. I implemented both variants of **SWAG** (Maddox et al., 2019): SWAG-diagonal and full SWAG with its low-rank-plus-diagonal covariance, sampling networks from the fitted weight posterior and averaging their predictions at test time.

Calibration was assessed with the **Expected Calibration Error**, comparing the SWAG posteriors against a temperature-scaled baseline. The Bayesian model gives up a little accuracy on easy images in exchange for much more honest confidence on ambiguous ones — exactly what you want before acting on a prediction.

**Stack:** Python, PyTorch &nbsp;·&nbsp; **Tags:** deep learning, uncertainty quantification, calibration
