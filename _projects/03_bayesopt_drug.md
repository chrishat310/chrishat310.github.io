---
layout: page
title: Bayesian Optimisation of Drug-Candidate Features
description: Optimised predicted bioavailability under synthesizability constraints.
img: assets/img/projects/bayesopt-drug.png
importance: 3
category: software
---

Searching for a good drug candidate is a textbook case of an expensive black-box objective: each molecule you actually want to evaluate costs real synthesis and assay time, and the response surface is bumpy and unforgiving. The twist that makes it more than a toy is the constraint. It is no use finding a molecule with wonderful predicted **bioavailability** if no chemist can plausibly make it — so the search has to respect **synthesizability** at the same time. This project applies **Bayesian optimisation** to exactly that trade-off: sample-efficient search over an expensive objective, under a hard feasibility constraint.

The design decision I settled on was to model objective and constraint separately rather than folding them into one score. I use **two independent Gaussian processes**: the objective GP predicts bioavailability with a DotProduct × Matérn (ν = 2.5) kernel plus a WhiteKernel noise term, while a second GP models synthesizability against a hard safety threshold of 4. Keeping them apart matters — it lets the acquisition step reason about "is this design good?" and "is this design feasible?" as two questions with their own uncertainty, instead of blurring them into a single number that hides why a point was rejected.

Candidates are then proposed by a **penalized acquisition function**: a UCB-style criterion (β = 2.0) that rewards promising, uncertain regions, discounted by the predicted constraint violation (penalty weight λ ≈ 2.2). At each iteration I optimise it with several **L-BFGS-B** restarts so the search does not get trapped in a poor local optimum of the acquisition surface itself.

<div class="row justify-content-center">
    <div class="col-sm-9 mt-3 mt-md-0">
        {% include figure.liquid loading="eager" path="assets/img/projects/bayesopt-drug-fig1.png" class="img-fluid rounded z-depth-1" zoomable=true %}
    </div>
</div>
<div class="caption">
    Posterior means of the two GPs on a 1D test problem: objective (green), synthesizability constraint (red), and the safety threshold (dashed). Samples concentrate where the objective is promising and the constraint stays safely below the threshold.
</div>

The penalty weight λ is the knob that decides the whole character of the search: set it too low and the optimiser cheerfully proposes molecules no one can synthesise; too high and it hugs the safe interior and never explores the promising edge. Tuning that balance — buying exploration without buying infeasibility — is the part that carried straight over into the constrained, mixed-variable optimisation of my later thesis work.

**Stack:** Python, scikit-learn &nbsp;·&nbsp; **Tags:** Bayesian optimisation, cheminformatics, constrained optimisation
