---
layout: page
title: X-ray CT of Fracture in Heterogeneous Materials
description: X-ray computed tomography of fracture, with HPC data pipelines.
img: assets/img/projects/xray-ct.png
importance: 2
category: simulation
---

Mortar looks like a uniform grey block until you crack it, at which point it is anything but: a crack does not run in a clean line but weaves around hard aggregate grains and dives into pores, and where it goes depends on the material's internal structure. To study that, you have to see inside the specimen while it fails. As a Research Assistant in ETH's **Computational Mechanics Group**, I studied **fracture propagation** in mortar by combining **X-ray computed tomography** with in-situ wedge-splitting tests and **digital volume correlation** (DVC, using the SPAM library) — loading a specimen a little, scanning it, and tracking how the internal displacement field evolves toward failure.

Part of the job was upstream of the scanner: I designed components for a torsional crack-propagation rig, iterating them for reliability and flexibility so the experiment could actually produce clean, repeatable specimens. A tomography study is only as good as the mechanical test feeding it.

The CT datasets are large enough that they cannot be handled by hand, so I built a **Python data-processing pipeline** on SLURM-managed HPC clusters. It segments each CT volume into its constituent phases — matrix, aggregates, and pores — and computes distance fields from those segmentations, which are then used to project an **unstructured finite-element mesh directly from the imaged material**. That last step is the payoff: the simulation mesh comes from the real internal geometry of the specimen rather than an idealised drawing of it.

<div class="row justify-content-center">
    <div class="col-sm-10 mt-3 mt-md-0">
        {% include figure.liquid loading="eager" path="assets/img/projects/xray-ct-fig1.png" class="img-fluid rounded z-depth-1" zoomable=true %}
    </div>
</div>
<div class="caption">
    Segmentation pipeline on a horizontal CT slice: raw and masked data, identified pores, aggregates and phases, and the distance fields feeding the FE mesh projection.
</div>

Before trusting any measured displacement, I characterised the measurement itself. Repeat reference scans of an unloaded specimen establish the grey-level noise floor — how much the scanner disagrees with itself between two identical scans — and a **half-window-size parameter study** (hws 5 → 120) maps the trade-off at the heart of DVC: a small correlation window resolves the displacement field finely but is noisy, a large one is robust but blurs detail.

<div class="row justify-content-center">
    <div class="col-sm-12 mt-3 mt-md-0">
        {% include figure.liquid loading="eager" path="assets/img/projects/xray-ct-fig2.png" class="img-fluid rounded z-depth-1" zoomable=true %}
    </div>
</div>
<div class="caption">
    Repeat scans of a wedge-splitting specimen and their grey-level residuals, used to quantify scan-to-scan noise before correlating loaded states.
</div>

Working with CT data taught me something I have carried into every measurement problem since: an instrument's artefacts are rarely just noise to be filtered away — more often they are physics I had not yet modelled. Quantifying the noise floor first, before believing a single displacement number, is what separated a real result from a plausible-looking picture.

**Stack:** Python, SPAM, HPC &nbsp;·&nbsp; **Tags:** imaging, fracture mechanics, digital volume correlation, data pipelines
Supervised by Prof. Laura De Lorenzis and Dr. Pietro Carrara.
