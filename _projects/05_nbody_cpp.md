---
layout: page
title: High-Performance C++ N-Body Simulation
description: Barnes-Hut N-body simulation, O(n log n), parallelised with OpenMP.
img: assets/img/projects/nbody.png
importance: 5
category: software
---

The N-body problem is deceptively simple to state — given a set of masses and their initial positions and velocities, follow their motion under mutual gravity — and brutal to compute. Every body pulls on every other, so the naïve force calculation is **O(n²)**: double the bodies and you quadruple the work. Worse, for more than two bodies the system is genuinely chaotic, so tiny integration errors grow exponentially and a sloppy solver drifts into nonsense. Built as the graded project for ETH's high-performance-computing course (with Felix Wegerdt), this simulation had to be both fast and numerically faithful.

Two choices shaped the code. The first was the time integrator. I benchmarked Euler, Verlet, and fourth-order **Runge-Kutta (RK4)**, and settled on RK4 as the default: it evaluates the forces several times per step and blends the slopes, which costs more per step but stays stable at much larger time steps, and — crucially for a chaotic system — keeps energy from drifting. Euler and Verlet are still in the code as selectable options, useful for cheap visualisations and for showing students exactly how a lower-order method bleeds energy.

The second choice was the physics that lets it scale. Since distant clusters of bodies pull almost as if they were a single lumped mass, the **Barnes-Hut** algorithm groups them in an octree and approximates far-away groups instead of summing every pair, which brings the cost down from **O(n²) to O(n log n)**. That is where the simulation stops being a demo and starts handling large systems, and I parallelised the force evaluation itself with **OpenMP** so the per-step work spreads across cores.

I was maybe most deliberate about the software design, because a fast simulation that no one can extend is a dead end. I built the integrators as **compile-time templates rather than a virtual class hierarchy** — you select the integration scheme when you compile, so there is no per-call virtual-function overhead in the hot loop, yet a new scheme can be dropped in without touching the simulation core. The whole thing follows SOLID principles, with the collision handler, the output, and the visualisation each isolated behind their own interface, and a unit-test suite (Google Test) covering the vector maths, force computation, momentum conservation, and each integrator.

The satisfying moment was watching a randomly seeded ten-body run confirm the theory back to us: perturb the initial conditions by a hair and the trajectories diverge exponentially, while shrinking the time step visibly tightens energy conservation. Getting a chaotic system to behave was less about raw speed than about respecting where the numerics could betray you — a lesson I have since met again in every dynamic simulation I have touched.

**Stack:** C++, OpenMP &nbsp;·&nbsp; **Tags:** HPC, parallelism, algorithms
