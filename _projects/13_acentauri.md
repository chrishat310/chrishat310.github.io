---
layout: page
title: aCentauri Solar Racing — Mechanical System Advisor
description: Advised a solar-car team preparing for the 3000 km BWSC 2025.
img: assets/img/projects/acentauri.png
importance: 1
category: leadership
---

**[aCentauri Solar Racing](https://www.acentauri.ch/)** is an ETH Zürich student team, based in Dübendorf, that designs and builds solar race cars — vehicles engineered to cross the Australian outback at highway speeds on roughly the power of a household appliance. Their target was the **Bridgestone World Solar Challenge 2025**, a **3000 km** solar endurance race, and I came in as **Mechanical System Advisor** to a group of **20+ members** spread across Aerodynamics, Mechanical, and Structures.

The role was deliberately advisory rather than hands-on, which was itself the lesson. On a student team, the temptation is to fix the interesting problem yourself; the more useful thing is to make twenty people's separate efforts add up to one car. A 3000 km race rewards nothing you can point to on a single component — it is won or lost on how the aerodynamics, structure, and mechanical systems agree with each other over three days of driving. So the value I could add was mostly at the seams.

A lot of the advising was about workflow rather than any single calculation: how the sub-teams should actually work through **Simcenter** and **NX**, and how CAD corrections should flow back through the model so that a fix in one place did not quietly break another. Some of the most consequential decisions looked almost trivial from the outside — naming conventions, folder and file structures — but at the scale of twenty people editing a shared car, those conventions are the difference between a model everyone can find their way around and one that dissolves into chaos.

Concretely, I introduced the practices a young team needs to behave like an engineering organisation: **GANTT-based scheduling** so the three sub-teams' deadlines actually lined up, **budgeting** of around **CHF 150K**, and **systems-engineering** methods for tracking requirements and interfaces. On the technical side I refined the solar car's **Simcenter global finite-element model (GFEM)** — integrating components into a single model, refining the mesh in the regions that decide the result, adding load cases with more honest boundary conditions, and evaluating composite layups — so the team's structural decisions rested on a model they could trust rather than a collection of local ones.

It came together: the car made it to Australia and took the start line of the Bridgestone World Solar Challenge — a genuinely wonderful result for a team this young to reach on so short a timeline.

Advising rather than building sharpened a distinction I now take seriously: the hardest part of a large project is rarely any single calculation, it is keeping the whole system coherent while twenty people change their parts underneath you. Teaching a team to see its own interfaces turned out to be worth more than any one analysis I could have run for them.

**Tags:** leadership, systems engineering, solar racing
