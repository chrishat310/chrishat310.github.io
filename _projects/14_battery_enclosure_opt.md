---
layout: flagship
title: Multi-Objective Optimization of EV Battery Enclosures
description: Parametric design driving automated FEA inside a multi-objective optimisation loop.
img: assets/img/projects/battery-enclosure.png
tier: flagship
category: simulation
objective: >
  Optimise an electric-vehicle battery enclosure against competing
  objectives, with the structural evaluation driven automatically by finite
  element analysis rather than by hand.
role: >
  Built the automation that closes the optimisation loop: wrote Fortran user
  subroutines for Abaqus, generated and edited Abaqus input decks
  programmatically alongside Nastran bulk-data scripting, and automated job
  submission and output parsing so objectives feed straight back to the
  optimiser.
methods: [NSGA, Abaqus, Fortran, Nastran, FEA, Python]
figures:
  - path: assets/img/projects/battery-enclosure.png
    caption: >
      Pareto front from the NSGA search: penetration resistance versus
      specific energy absorption, coloured along the front.
  - path: assets/img/projects/battery-enclosure-fig1.png
    caption: >
      Design-space exploration over all evaluated designs, coloured by each
      design variable — sheet thicknesses and materials, core height, angle
      and element count.
importance: 3
---

An electric vehicle's battery enclosure has one job that never gets easier: in a crash it has to soak up energy and keep anything from punching through to the cells, because a breached battery is a fire. But it also has to be light, and those two demands pull in opposite directions — more material means more protection and more mass. This project treats a **sandwich-panel enclosure** as exactly that tug-of-war, trading **specific energy absorption** against **penetration resistance**.

The obstacle is that evaluating a single design means running a full crash finite-element simulation, which is far too slow and fiddly to drive by hand across the hundreds of candidates an optimiser wants to see. So the first real piece of work was automation: I wrapped **ABAQUS** penetration simulations in **Python scripting** so that a design vector goes in, a mesh is built, the crash is solved, and the performance metrics come back out, with no human in the loop. Only once that pipeline was reliable could I put a **pymoo NSGA** multi-objective optimiser on top of it and let the search run.

What makes the design space genuinely awkward — and, for me, the most interesting part — is that it mixes **continuous and discrete variables**. The thicknesses of the top, middle and bottom sheets and the core geometry (height, angle, number of core elements) are continuous, but the material of each sheet is a discrete choice among **TRIP780** steel, **AA7020** aluminium and **MARS300** armour steel. You cannot smoothly interpolate between "steel" and "aluminium," so the optimiser has to reason over a space that is part landscape and part menu — the same mixed-variable difficulty I went on to make the subject of my MIT thesis.

The output is not a single "best" enclosure but a **Pareto front** — a curve of designs where you cannot buy more penetration resistance without paying in energy absorption or weight. I find that the honest answer to this kind of problem: it hands the engineer the genuine trade-off to choose from rather than pretending one number settles it, and the design-space maps show _why_ each design sits where it does.

The lasting takeaway was that automating the simulation was not a convenience but the whole enabling step: once a crash FE run is a callable function, optimisation over it stops being a heroic manual effort and becomes a loop you can trust — a pattern I have reused every time an expensive simulator sits inside a search.

**Stack:** Python, ABAQUS, pymoo &nbsp;·&nbsp; **Tags:** FEM, crashworthiness, multi-objective optimisation
