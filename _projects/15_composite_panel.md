---
layout: page
title: Stiffened Composite Panel Optimization
description: MATLAB sizing of a stiffened composite panel under compression.
img: assets/img/projects/composite-panel.png
importance: 4
category: mechanical
---

Sizing an aircraft-style composite panel is a satisfying puzzle because the failure modes fight each other. A **1 m × 0.48 m stiffened composite panel** carrying **7 kN of compression** can give way in several completely different ways, and a design that comfortably beats one of them often walks straight into another. Make the skin thinner to save weight and it buckles between the stiffeners; make the stiffeners taller and their thin flanges cripple; get the whole thing too slender and it buckles as a column like an over-loaded ruler. My goal was the lightest panel that survives all of them at once, sized in **MATLAB**.

The first decision was the stiffener cross-section, so I compared **I-, T- and Hat-section** stiffeners head to head. Each puts material in a different place and so trades the failure modes differently — a Hat section is torsionally stiff and closes a cell against the skin, an I-section is efficient in bending but exposes flanges to crippling — and there is no way to know which wins without sizing all three to the same load and weighing the result.

For every candidate I computed the laminate's on-axis properties from its layup — a composite's stiffness is not a material constant but something you design by choosing ply angles and stacking order — and then checked the design against the full set of limits: **first-ply failure**, stiffener **crippling**, **local skin buckling** and **column buckling**. A design counts only if it clears all four.

<div class="row justify-content-center">
    <div class="col-sm-8 mt-3 mt-md-0">
        {% include figure.liquid loading="eager" path="assets/img/projects/composite-panel-fig1.png" class="img-fluid rounded z-depth-1" zoomable=true %}
    </div>
</div>
<div class="caption">
    Sizing the I-stiffened design: loading ratio, buckling conditions and weight ratio versus the scaling factor — the lightest feasible design sits where the buckling conditions cross the failure line.
</div>

The plot captures the lesson of the whole exercise. The lightest feasible design does not sit safely away from failure — it sits exactly where the buckling curve crosses the failure line, right at the edge of feasibility. Push the scaling factor any lower to save more weight and the panel becomes unsafe; any higher and you are carrying metal you do not need. The optimum in a weight-critical structure lives on the boundary, and good sizing is the art of finding that boundary precisely rather than hiding behind a fat margin.

The code is public at [github.com/chrishat310/DASC_A2_A](https://github.com/chrishat310/DASC_A2_A).

**Stack:** MATLAB &nbsp;·&nbsp; **Tags:** composites, buckling, structural sizing
