---
layout: page
title: X-ray CT of Fracture in Heterogeneous Materials
description: X-ray computed tomography of fracture, with HPC data pipelines.
img: assets/img/projects/xray-ct.png
importance: 2
category: simulation
---

As a Research Assistant in ETH's **Computational Mechanics Group**, I studied **fracture propagation** in mortar via **X-ray computed tomography** with in-situ testing of wedge-splitting-test specimens and **digital volume correlation** (DVC, using the SPAM library). I built a **Python data-processing pipeline** on SLURM-managed HPC clusters to handle the large CT datasets.

The pipeline segments each CT volume into its phases — matrix, aggregates, and pores — and computes distance fields from the segmented phases, which are then used to project an **unstructured finite-element mesh** directly from the CT data:

<div class="row justify-content-center">
    <div class="col-sm-10 mt-3 mt-md-0">
        {% include figure.liquid loading="eager" path="assets/img/projects/xray-ct-fig1.png" class="img-fluid rounded z-depth-1" zoomable=true %}
    </div>
</div>
<div class="caption">
    Segmentation pipeline on a horizontal CT slice: raw and masked data, identified pores, aggregates and phases, and the distance fields feeding the FE mesh projection.
</div>

On the DVC side, I characterised the measurement itself before trusting it: repeat reference scans establish the grey-level noise floor, and a **half-window-size parameter study** (hws 5 → 120) maps the trade-off between spatial resolution of the displacement field and correlation robustness.

<div class="row justify-content-center">
    <div class="col-sm-12 mt-3 mt-md-0">
        {% include figure.liquid loading="eager" path="assets/img/projects/xray-ct-fig2.png" class="img-fluid rounded z-depth-1" zoomable=true %}
    </div>
</div>
<div class="caption">
    Repeat scans of a wedge-splitting specimen and their grey-level residuals, used to quantify scan-to-scan noise before correlating loaded states.
</div>

**Stack:** Python, SPAM, HPC &nbsp;·&nbsp; **Tags:** imaging, fracture mechanics, digital volume correlation, data pipelines
Supervised by Prof. Laura De Lorenzis and Dr. Pietro Carrara.
