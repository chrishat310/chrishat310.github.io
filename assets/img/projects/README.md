# Project thumbnails

Generated scientific-visual thumbnails for each project card. One cohesive design
system: deep-neutral card background (reads on both light and dark site themes),
a blue sequential + accent palette, an inset frame with corner registration ticks.
Each image is ~1200x900 px (4:3). Content is genuinely computed where practical
(real GP posteriors, a real SIMP topology-optimization solve, potential-flow
streamlines, an N-body spiral with a Barnes-Hut quadtree, Laplace/Poisson fields,
a small truss FEM).

Some cards now use **real figures** extracted from Christophe's own presentations
(engineering portfolio, MIT thesis figures) or exported from his local project
repos. The rest remain **generated** scientific-visual thumbnails. The `Source`
column below records which is which.

| File                     | Project                                               | Source                                                                                                                                    |
| ------------------------ | ----------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------- |
| `engiopt.png`            | EngiOpt — 3D Generative Models (Open Source)          | generated                                                                                                                                 |
| `mixed-var-bo.png`       | Mixed-Variable Bayesian Optimization (MIT Thesis)     | real — thesis figure (TFM Figures.pdf p.1: "Car(x3) Mazda D=222" average-regret BO comparison)                                            |
| `bayesopt-drug.png`      | Bayesian Optimisation of Drug-Candidate Features      | generated                                                                                                                                 |
| `bayesian-nn.png`        | Bayesian Neural Network for Satellite Imagery         | generated                                                                                                                                 |
| `nbody.png`              | High-Performance C++ N-Body Simulation                | generated (presentation's real 3D plots were t=0 snapshots with empty axes — weaker than the generated graphic)                           |
| `gp-pm25.png`            | Gaussian Process Air-Quality Prediction               | real — measured PM2.5 city map (gaussian-process-air-quality repo, `assets/pm25_by_city_area.png`, padded to 4:3)                         |
| `hitachi-capacitors.png` | Self-Healing HV Capacitors (Hitachi Energy)           | generated (real Abaqus figures rejected on confidentiality grounds — revealed part geometry + design/test parameters)                     |
| `xray-ct.png`            | X-ray CT of Fracture in Heterogeneous Materials       | real — CT slice of mortar specimen (CompMechEuler repo, `Experiments/unstructured/individual_plots/RawData.png`, specimen crop, denoised) |
| `topology-opt.png`       | Topology Optimisation of Damaged Structures           | generated                                                                                                                                 |
| `axalp-cooling.png`      | Aircraft Battery-Pack Cooling System                  | generated                                                                                                                                 |
| `solar-boat.png`         | Swiss Solar Boat — Carbon-Fibre Foil                  | real — CAD render (Engineering Portfolio.pdf p.2: full boat with T-hydrofoils)                                                            |
| `nova-chassis.png`       | NOVA Electric Racing — Bike Chassis                   | real — CAD render (Engineering Portfolio.pdf p.2: full motorcycle)                                                                        |
| `acentauri.png`          | aCentauri Solar Racing — Mechanical System Advisor    | generated                                                                                                                                 |
| `battery-enclosure.png`  | Multi-Objective Optimization of EV Battery Enclosures | real — NSGA 3D Pareto front (DBM-Final-Project repo, `.../DL_0/3D_pareto_front.png`, cropped + padded to 4:3)                             |
| `composite-panel.png`    | Stiffened Composite Panel Optimization                | real — I-stiffener section plot (DASC_A2_A repo, `Istiffener.png`, composited on the design system's #14161b card with corner ticks)      |

## Inline figures (used inside project pages, not as card thumbnails)

| File                         | Project                                               | Source                                                                                                                                      |
| ---------------------------- | ----------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------- |
| `bayesopt-drug-fig1.png`     | Bayesian Optimisation of Drug-Candidate Features      | real — objective/constraint GP posteriors with safety threshold (Task_3_PAI repo, `test.png`)                                               |
| `gp-pm25-fig1.png`           | Gaussian Process Air-Quality Prediction               | real — PM2.5 distribution histogram (gaussian-process-air-quality repo, `assets/pm25_distribution.png`)                                     |
| `xray-ct-fig1.png`           | X-ray CT of Fracture in Heterogeneous Materials       | real — 3×3 CT segmentation/distance-field pipeline (CompMechEuler repo, `Experiments/unstructured/visualization.png`, downscaled)           |
| `xray-ct-fig2.png`           | X-ray CT of Fracture in Heterogeneous Materials       | real — repeat-scan grey-level residuals (CompMechEuler repo, `Exploration/WST_CUB_REF/02_02_25/REF2_3D_enhanced_residuals.png`, downscaled) |
| `mixed-var-bo-fig1.png`      | Mixed-Variable Bayesian Optimization (MIT Thesis)     | real — TFM base+residual surrogate method diagram (TFM Figures.pdf p.1 embedded image)                                                      |
| `battery-enclosure-fig1.png` | Multi-Objective Optimization of EV Battery Enclosures | real — design-space scatter grid colored by design variable (DBM-Final-Project repo, `Results/parameter_all data.png`)                      |
| `composite-panel-fig1.png`   | Stiffened Composite Panel Optimization                | real — sizing-factor constraint plot (DASC_A2_A repo, `optimalfactor.png`)                                                                  |

## Replacing a generated graphic with a real photo/render

To swap in a real photo or render, overwrite the file keeping the same filename
(e.g. replace `axalp-cooling.png` with your own image saved as `axalp-cooling.png`).
The project front matter references the filename, so no other change is needed. If
you use a different extension (`.jpg`), update the `img:` line in the matching
`_projects/*.md` file to point at the new filename.

Regeneration script: `scratchpad/gen.py` (from the session that created these).
