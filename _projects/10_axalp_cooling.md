---
layout: page
title: Aircraft Battery-Pack Cooling System
description: Lightweight auxiliary battery-pack cooling system in Siemens NX (~30% lighter).
img: assets/img/projects/axalp-cooling.png
importance: 1
category: mechanical
---

On an aircraft, every kilogram you add to cool a battery is a kilogram you cannot spend on anything else, so a cooling system is really an argument about weight. During my internship at **Axalp Technologies**, I led the **end-to-end development** of a lightweight **liquid-cooled system** for an aircraft auxiliary battery pack in **Siemens NX** — from scoping the requirements through to integration testing — and got the pack roughly **30% lighter** than the starting point. The cooling tubes that thread between the individual battery cells were the heart of it: I made them from a tri-layer plastic–aluminium–plastic laminate — the same sandwich a Capri-Sun pouch is built from — which is tough, very light, and easy to weld into thin tubes. The clamping interface that joins each feeder tube to its cooling tube I borrowed from an unlikely place: the way a cork seats into the neck of a wine bottle. None of that was allowed to compromise safety, so I ran a **full impact simulation** against the relevant aviation regulations, validating that the lighter structure still survived crash loading with structural FEA in NX Nastran. Owning it from requirements to test meant living with every trade-off myself: a lighter bracket that fails a crash case is not lighter, it is just wrong, and the discipline of chasing weight without giving up structural margin is the part I valued most.

Alongside the cooling work I built dynamic simulation models of aircraft **landing-gear kinematics** — non-linear dynamic FEA (Simcenter / NX Nastran via FEMAP) for a hypersonic UAV. This is where the internship taught me its sharpest lesson. The transient solve came out unstable, and the tempting response is to blame the model. Instead I rebuilt the analysis in **Python** and worked on the numerics directly, tuning the numerical dissipation until stability improved by **45%**. The instability had never been in the physics — the solver defaults had quietly encoded an assumption nobody had checked, and the fix was to stop trusting the default and understand what the integrator was actually doing.

That episode changed how I approach any simulation. Fixing the numerics did more for the model's trustworthiness than piling on extra fidelity ever would have, and I now treat a solver's defaults as choices to be interrogated rather than settings to be accepted.

The other thing worth saying is that COMSOL, Siemens NX, and FEMAP were all new to me when I arrived. Becoming productive in an unfamiliar CAE toolchain within weeks — enough to ship validated hardware from it — is a habit I have leaned on in every role since.

**Stack:** Siemens NX &nbsp;·&nbsp; **Tags:** CAD, thermal management, aerospace
