---
layout: page
title: Stiffened Composite Panel Optimization
description: MATLAB sizing of a stiffened composite panel under compression.
img: assets/img/projects/composite-panel.png
importance: 4
category: mechanical
---

A structural sizing study of a **1 m × 0.48 m stiffened composite panel** under 7 kN compression, optimised in **MATLAB** for minimum weight. I compared **I-, T- and Hat-section stiffeners**, computing laminate on-axis properties for each layup and checking every candidate design against **first-ply failure**, stiffener **crippling**, **local skin buckling** and **column buckling**.

<div class="row justify-content-center">
    <div class="col-sm-8 mt-3 mt-md-0">
        {% include figure.liquid loading="eager" path="assets/img/projects/composite-panel-fig1.png" class="img-fluid rounded z-depth-1" zoomable=true %}
    </div>
</div>
<div class="caption">
    Sizing the I-stiffened design: loading ratio, buckling conditions and weight ratio versus the scaling factor — the lightest feasible design sits where the buckling conditions cross the failure line.
</div>

The code is public at [github.com/chrishat310/DASC_A2_A](https://github.com/chrishat310/DASC_A2_A).

**Stack:** MATLAB &nbsp;·&nbsp; **Tags:** composites, buckling, structural sizing
