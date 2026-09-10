---
layout: page
title: work
permalink: /work/
description: Selected engineering and machine-learning projects.
nav: true
nav_order: 1
---

{% assign flagships = site.projects | where: "tier", "flagship" | sort: "importance" %}
{% assign index_projects = site.projects | where_exp: "p", "p.tier != 'flagship'" %}

<section class="work-flagships">
  <h2 class="work-section-title">Selected work</h2>
  <div class="row row-cols-1 row-cols-md-2">
    {% for project in flagships %}
      {% include projects.liquid %}
    {% endfor %}
  </div>
</section>

<section class="work-index">
  <h2 class="work-section-title">Everything else</h2>
  {% assign categories = "software,simulation,mechanical,leadership" | split: "," %}
  {% for category in categories %}
    {% assign in_category = index_projects | where: "category", category | sort: "importance" %}
    {% if in_category.size > 0 %}
      <h3 class="work-index-category">{{ category }}</h3>
      <div class="work-index-list">
        {% for project in in_category %}
          {% include project_index_row.liquid %}
        {% endfor %}
      </div>
    {% endif %}
  {% endfor %}
</section>
