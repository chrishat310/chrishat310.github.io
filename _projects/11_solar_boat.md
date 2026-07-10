---
layout: page
title: Swiss Solar Boat — Carbon-Fibre Foil
description: Carbon-fibre lateral foil; 2nd place, Monaco Energy Boat Challenge 2022.
img: assets/img/projects/solar-boat.png
importance: 2
category: mechanical
---

A solar boat has almost no power to spare, so the whole engineering problem is drag. **[Swiss Solar Boat](https://www.swisssolarboat.ch/)**, the EPFL student team I joined as a Structural Engineer, attacks it the way the fastest boats do: lift the hull clean out of the water on hydrofoils, so at speed the boat flies on thin blades instead of dragging a wetted hull. The design uses a set of T-shaped foils to be both efficient and stable at once, and we took it to the **Monaco Energy Boat Challenge**, an international competition where student and industry teams race energy-constrained boats.

My part was a **carbon-fibre lateral foil**, and my role sat mostly at the two ends of its life: **structural sizing** and **manufacturing**. I sized the foil against its load cases and optimised the shape through **CFD and FEA** to trade hydrodynamic performance against structural strength, then carried it all the way through to a physical part — hands-on composite work rather than a drawing handed off to someone else. A foil lives in the worst of both worlds: it has to be slender enough not to spoil the flow, yet stiff and strong enough to carry the entire weight of the boat through a bending load at the root. Getting that balance right on paper was only half the job; the foil then shaved roughly **12% off the boat's weight**, which on a vehicle this power-starved is a direct speed gain.

The manufacturing was its own education. Carbon-fibre parts of this quality are not machined, they are laid up in **negative moulds**, so producing the foil meant CNC-machining the moulds, post-processing them, and then doing the layup and cure — a long, exacting, and costly process where a single flaw in the mould prints itself onto every part that comes out of it. That is where I learned how much of a composite part's fate is decided before any fibre is laid, and how design-for-manufacture is not an afterthought but a constraint you carry from the first sketch.

<div class="row justify-content-center">
    <div class="col-sm-6 mt-3 mt-md-0">
        {% include figure.liquid loading="eager" path="assets/img/projects/solar-boat-fig1.png" class="img-fluid rounded z-depth-1" zoomable=true %}
    </div>
    <div class="col-sm-6 mt-3 mt-md-0">
        {% include figure.liquid loading="eager" path="assets/img/projects/solar-boat-fig2.png" class="img-fluid rounded z-depth-1" zoomable=true %}
    </div>
</div>
<div class="caption">
    The lateral foil coming out of manufacturing (left) and the long CNC-machined negative mould it is laid up in (right) — the mould whose every flaw prints onto the finished part.
</div>

It paid off on the water: the team took **2nd place (silver in the solar class) at the 2022 Monaco Energy Boat Challenge**, and won the championship race — a series of head-to-head duels through the yacht club harbour that tests speed and manoeuvrability rather than a single time trial. Watching a part I had designed hold up under real racing loads, in real water, is a very different kind of validation from a passing FEA plot, and it is the reason I keep coming back to hardware.

**Tags:** composites, hydrofoil, CFD/FEA
