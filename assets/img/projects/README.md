# Project thumbnails

Generated scientific-visual thumbnails for each project card. One cohesive design
system: deep-neutral card background (reads on both light and dark site themes),
a blue sequential + accent palette, an inset frame with corner registration ticks.
Each image is ~1200x900 px (4:3). Content is genuinely computed where practical
(real GP posteriors, a real SIMP topology-optimization solve, potential-flow
streamlines, an N-body spiral with a Barnes-Hut quadtree, Laplace/Poisson fields,
a small truss FEM).

Some cards now use **real figures** extracted from Christophe's own presentations
(engineering portfolio, MIT thesis figures). The rest remain **generated**
scientific-visual thumbnails. The `Source` column below records which is which.

| File | Project | Source |
|------|---------|--------|
| `engiopt.png` | EngiOpt — 3D Generative Models (Open Source) | generated |
| `mixed-var-bo.png` | Mixed-Variable Bayesian Optimization (MIT Thesis) | real — thesis figure (TFM Figures.pdf p.1: "Car(x3) Mazda D=222" average-regret BO comparison) |
| `bayesopt-drug.png` | Bayesian Optimisation of Drug-Candidate Features | generated |
| `bayesian-nn.png` | Bayesian Neural Network for Satellite Imagery | generated |
| `nbody.png` | High-Performance C++ N-Body Simulation | generated (presentation's real 3D plots were t=0 snapshots with empty axes — weaker than the generated graphic) |
| `gp-pm25.png` | Gaussian Process Air-Quality Prediction | generated |
| `hitachi-capacitors.png` | Self-Healing HV Capacitors (Hitachi Energy) | generated (real Abaqus figures rejected on confidentiality grounds — revealed part geometry + design/test parameters) |
| `xray-ct.png` | X-ray CT of Fracture in Heterogeneous Materials | generated |
| `topology-opt.png` | Topology Optimisation of Damaged Structures | generated |
| `axalp-cooling.png` | Aircraft Battery-Pack Cooling System | generated |
| `solar-boat.png` | Swiss Solar Boat — Carbon-Fibre Foil | real — CAD render (Engineering Portfolio.pdf p.2: full boat with T-hydrofoils) |
| `nova-chassis.png` | NOVA Electric Racing — Bike Chassis | real — CAD render (Engineering Portfolio.pdf p.2: full motorcycle) |
| `acentauri.png` | aCentauri Solar Racing — Mechanical System Advisor | generated |

## Replacing a generated graphic with a real photo/render

To swap in a real photo or render, overwrite the file keeping the same filename
(e.g. replace `axalp-cooling.png` with your own image saved as `axalp-cooling.png`).
The project front matter references the filename, so no other change is needed. If
you use a different extension (`.jpg`), update the `img:` line in the matching
`_projects/*.md` file to point at the new filename.

Regeneration script: `scratchpad/gen.py` (from the session that created these).
