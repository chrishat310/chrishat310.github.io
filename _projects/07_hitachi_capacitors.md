---
layout: page
title: Self-Healing HV Capacitors (Hitachi Energy)
description: Multi-physics COMSOL modelling of self-healing high-voltage transformer capacitors.
img: assets/img/projects/hitachi-capacitors.png
importance: 1
category: simulation
---

High-voltage capacitors have a remarkable trick: when the dielectric breaks down at a weak spot, a tiny, controlled discharge vaporises the metallisation around the fault and isolates it, so the device keeps working instead of failing outright. That **self-healing** behaviour is what keeps a transformer capacitor alive in service — and it is genuinely hard to model, because it couples electrostatics, heat, and material change in a fast, local event. My six-month internship at **Hitachi Energy** in Baden-Dättwil was spent building a simulation of it.

At its core the work was a **coupled electrothermal framework** for modelling self-healing in metallised-film capacitors, built in **COMSOL**. It brought together three pieces that have to talk to each other during a healing event: a **dynamic arc-conductance formulation** for the discharge itself, a **two-dimensional RC transmission-plane representation** of the metallised electrode, and a **thermal model** of heat transfer through the electrode–dielectric stack. With that in place I ran parametric studies that pinned down the main factors governing **how the self-healing energy scales with the applied voltage**, and separated the regime where the metallisation is **melted** away from the one where it is **evaporated** — two physically distinct ways the fault clears. The whole point was to be predictive: a framework an engineer can lean on for design choices and reliability assessment, not a one-off simulation. A model like that is only worth anything if it stays anchored to what the hardware actually does, so I kept it tied to bench measurements throughout.

Around the models I wrote the **Python pipelines** that post-process COMSOL's output and turn raw field data into design recommendations, and I **lead-authored a research paper** on the modelling framework alongside two senior researchers — currently in internal review ahead of journal submission. Writing it up with people who had spent careers on high-voltage devices was the part that most sharpened how I present a modelling argument.

The habit this internship drilled into me is to trust the measurement over the simulation. The framework only earned its keep because it was anchored to the test bench, not to the solver — and whenever the two disagreed, the measurement was right. High-voltage dielectrics were a completely new physics to me on day one; learning to enter an unfamiliar domain and still ship work that hardware would vouch for is the most portable thing I took from it.

**Stack:** COMSOL, Python &nbsp;·&nbsp; **Tags:** multi-physics, high-voltage, R&D
