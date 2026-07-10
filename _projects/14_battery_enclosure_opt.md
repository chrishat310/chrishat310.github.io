---
layout: page
title: Multi-Objective Optimization of EV Battery Enclosures
description: NSGA optimisation of a sandwich-panel battery enclosure with automated ABAQUS crash FE.
img: assets/img/projects/battery-enclosure.png
importance: 4
category: simulation
---

A crashworthiness project on EV **battery enclosures**: a sandwich panel that must absorb crash energy without letting anything penetrate through to the cells. I automated **ABAQUS** penetration finite-element simulations with Python scripting and wrapped them in a **pymoo NSGA** multi-objective optimisation, trading off **specific energy absorption** against **penetration resistance**.

The design space mixes continuous and discrete variables: thicknesses of the top, middle and bottom sheets, the core geometry (height, angle, number of core elements), and the material of each sheet — chosen among **TRIP780** steel, **AA7020** aluminium and **MARS300** armour steel.

<div class="row justify-content-center">
    <div class="col-sm-10 mt-3 mt-md-0">
        {% include figure.liquid loading="eager" path="assets/img/projects/battery-enclosure.png" class="img-fluid rounded z-depth-1" zoomable=true %}
    </div>
</div>
<div class="caption">
    Pareto front from the NSGA search: penetration resistance versus specific energy absorption, colored along the front.
</div>

<div class="row justify-content-center">
    <div class="col-sm-11 mt-3 mt-md-0">
        {% include figure.liquid loading="eager" path="assets/img/projects/battery-enclosure-fig1.png" class="img-fluid rounded z-depth-1" zoomable=true %}
    </div>
</div>
<div class="caption">
    Design-space exploration over all evaluated designs, colored by each design variable — sheet thicknesses and materials, core height, angle and element count.
</div>

**Stack:** Python, ABAQUS, pymoo &nbsp;·&nbsp; **Tags:** FEM, crashworthiness, multi-objective optimisation
