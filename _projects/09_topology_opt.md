---
layout: page
title: Topology Optimisation of Damaged Structures
description: Topology optimisation within two-scale damaged structures.
img: assets/img/projects/topology-opt.png
importance: 3
category: simulation
---

Topology optimisation answers a question every structural designer eventually asks: given a volume of space, a set of loads, and a budget of material, where should the material actually go? Rather than starting from a shape and tweaking it, the method starts from a block and lets an optimiser carve away everything that is not pulling its weight, converging on an often organic-looking layout that no one would have drawn by hand. It is one of the most powerful ideas in modern structural design — and almost all of it assumes the material is pristine.

Real materials are not pristine. They carry micro-scale damage — micro-cracks, voids, degraded regions — and that damage changes how stiff and how strong the material is locally. This project investigated **topology optimisation within two-scale damaged structures**: coupling a fine, micro-scale picture of where the material is damaged to the coarse, macro-scale question of where material should be placed. The interesting tension is that the two scales talk to each other. Damage at the micro-scale alters the effective properties the macro-scale optimiser sees, which changes the optimal layout, which in turn changes how the structure is loaded and therefore where damage accumulates.

The reason a two-scale treatment is worth the considerable extra cost is that ignoring it can be actively misleading. An optimiser that assumes undamaged material will happily route load through a region that, once its real degraded properties are accounted for, cannot carry it — producing a layout that looks optimal on paper and is fragile in practice. Resolving the micro-scale explicitly everywhere would be hopelessly expensive, so the point of the two-scale framing is to let the fine-scale damage inform the coarse-scale decision without simulating every micro-crack across the whole part.

For me this project was about learning to think across scales at once, and to be suspicious of any optimisation whose "optimum" quietly depends on an idealisation of the material — a scepticism that has stuck with me in every optimisation problem since.

**Tags:** topology optimisation, multi-scale, structural mechanics
