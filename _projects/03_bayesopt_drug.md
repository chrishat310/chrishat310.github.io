---
layout: page
title: Bayesian Optimisation of Drug-Candidate Features
description: Optimised predicted bioavailability under synthesizability constraints.
img: assets/img/projects/bayesopt-drug.png
importance: 3
category: software
---

A project applying **Bayesian optimisation** to drug-candidate design: optimising predicted **bioavailability** while respecting **synthesizability** constraints. It demonstrates constrained, sample-efficient search over expensive black-box objectives.

I model the problem with **two separate Gaussian processes**: the objective GP uses a DotProduct × Matérn (ν = 2.5) kernel with a WhiteKernel noise term, while a second GP models the synthesizability constraint against a hard safety threshold of 4. Candidates are proposed by a **penalized acquisition function** — a UCB-style criterion (β = 2.0) discounted by the predicted constraint violation (penalty weight λ ≈ 2.2) — optimised at each iteration with **L-BFGS-B** restarts.

<div class="row justify-content-center">
    <div class="col-sm-9 mt-3 mt-md-0">
        {% include figure.liquid loading="eager" path="assets/img/projects/bayesopt-drug-fig1.png" class="img-fluid rounded z-depth-1" zoomable=true %}
    </div>
</div>
<div class="caption">
    Posterior means of the two GPs on a 1D test problem: objective (green), synthesizability constraint (red), and the safety threshold (dashed). Samples concentrate where the objective is promising and the constraint stays safely below the threshold.
</div>

**Stack:** Python, scikit-learn &nbsp;·&nbsp; **Tags:** Bayesian optimisation, cheminformatics, constrained optimisation
