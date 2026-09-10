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
