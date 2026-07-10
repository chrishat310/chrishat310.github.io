---
layout: page
title: Self-Healing HV Capacitors (Hitachi Energy)
description: Multi-physics COMSOL modelling of self-healing high-voltage transformer capacitors.
img: assets/img/projects/hitachi-capacitors.png
importance: 1
category: simulation
---

High-voltage capacitors have a remarkable trick: when the dielectric breaks down at a weak spot, a tiny, controlled discharge vaporises the metallisation around the fault and isolates it, so the device keeps working instead of failing outright. That **self-healing** behaviour is what keeps a transformer capacitor alive in service — and it is genuinely hard to model, because it couples electrostatics, heat, and material change in a fast, local event. My six-month internship at **Hitachi Energy** in Baden-Dättwil was spent building a simulation of it.

I built the **multi-physics finite-element models in COMSOL**, capturing the coupled fields around dielectric breakdown and the post-fault recovery that follows. A full multi-physics solve is faithful but slow — far too slow for a design engineer to run inside a sizing loop. So the piece of work I would point to is the reduced-order model: I developed and fine-tuned a **tunable power-law model** relating self-healing energy to input voltage, and calibrated it against **measured test data** so that engineers could use it without ever launching the full simulation. A lumped model tuned to a test bench is a different species of object from the finite-element model it replaces, but it is the one people actually reach for.

Around the models I wrote the **Python pipelines** that post-process COMSOL's output and turn raw field data into design recommendations, and I **lead-authored an IEEE research paper** on the multi-physics modelling framework alongside two senior researchers. Writing it up with people who had spent careers on high-voltage devices was the part that most sharpened how I present a modelling argument.

The habit this internship drilled into me is to trust the measurement over the simulation. The reduced-order model only earned its keep because it was anchored to the test bench, not to the solver — and whenever the two disagreed, the measurement was right. High-voltage dielectrics were a completely new physics to me on day one; learning to enter an unfamiliar domain and still ship work that hardware would vouch for is the most portable thing I took from it.

**Stack:** COMSOL, Python &nbsp;·&nbsp; **Tags:** multi-physics, high-voltage, R&D
