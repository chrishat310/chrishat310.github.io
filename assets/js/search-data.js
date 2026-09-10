// get the ninja-keys element
const ninja = document.querySelector('ninja-keys');

// add the home and posts menu items
ninja.data = [{
    id: "nav-about",
    title: "about",
    section: "Navigation",
    handler: () => {
      window.location.href = "/";
    },
  },{id: "nav-work",
          title: "work",
          description: "Selected engineering and machine-learning projects.",
          section: "Navigation",
          handler: () => {
            window.location.href = "/work/";
          },
        },{id: "nav-publications",
          title: "publications",
          description: "Preprint and in-submission work in Bayesian optimisation for engineering design.",
          section: "Navigation",
          handler: () => {
            window.location.href = "/publications/";
          },
        },{id: "nav-cv",
          title: "CV",
          description: "Curriculum vitae — education, research, and engineering experience. Download the full PDF using the button above.",
          section: "Navigation",
          handler: () => {
            window.location.href = "/cv/";
          },
        },{id: "projects-engiopt-3d-generative-models-open-source",
          title: 'EngiOpt — 3D Generative Models (Open Source)',
          description: "Extended generative models to 3D and merged them into the open-source EngiOpt library.",
          section: "Projects",handler: () => {
              window.location.href = "/projects/01_engiopt/";
            },},{id: "projects-mixed-variable-bayesian-optimization-mit-thesis",
          title: 'Mixed-Variable Bayesian Optimization (MIT Thesis)',
          description: "Mixed-variable Bayesian optimisation with Prior Fitted Networks for engineering design.",
          section: "Projects",handler: () => {
              window.location.href = "/projects/02_mixed_var_bo/";
            },},{id: "projects-bayesian-optimisation-of-drug-candidate-features",
          title: 'Bayesian Optimisation of Drug-Candidate Features',
          description: "Optimised predicted bioavailability under synthesizability constraints.",
          section: "Projects",handler: () => {
              window.location.href = "/projects/03_bayesopt_drug/";
            },},{id: "projects-bayesian-neural-network-for-satellite-imagery",
          title: 'Bayesian Neural Network for Satellite Imagery',
          description: "Uncertainty-aware satellite image classification with SWA-Gaussian.",
          section: "Projects",handler: () => {
              window.location.href = "/projects/04_bayesian_nn/";
            },},{id: "projects-high-performance-c-n-body-simulation",
          title: 'High-Performance C++ N-Body Simulation',
          description: "Barnes-Hut N-body simulation, O(n log n), parallelised with OpenMP.",
          section: "Projects",handler: () => {
              window.location.href = "/projects/05_nbody_cpp/";
            },},{id: "projects-gaussian-process-air-quality-prediction",
          title: 'Gaussian Process Air-Quality Prediction',
          description: "Gaussian Process model for PM2.5 prediction in residential areas.",
          section: "Projects",handler: () => {
              window.location.href = "/projects/06_gp_pm25/";
            },},{id: "projects-self-healing-hv-capacitors-hitachi-energy",
          title: 'Self-Healing HV Capacitors (Hitachi Energy)',
          description: "Multi-physics COMSOL modelling of self-healing high-voltage transformer capacitors.",
          section: "Projects",handler: () => {
              window.location.href = "/projects/07_hitachi_capacitors/";
            },},{id: "projects-x-ray-ct-of-fracture-in-heterogeneous-materials",
          title: 'X-ray CT of Fracture in Heterogeneous Materials',
          description: "X-ray computed tomography of fracture, with HPC data pipelines.",
          section: "Projects",handler: () => {
              window.location.href = "/projects/08_xray_ct/";
            },},{id: "projects-topology-optimisation-of-damaged-structures",
          title: 'Topology Optimisation of Damaged Structures',
          description: "Topology optimisation within two-scale damaged structures.",
          section: "Projects",handler: () => {
              window.location.href = "/projects/09_topology_opt/";
            },},{id: "projects-aircraft-battery-pack-cooling-system",
          title: 'Aircraft Battery-Pack Cooling System',
          description: "Lightweight auxiliary battery-pack cooling system in Siemens NX (~30% lighter).",
          section: "Projects",handler: () => {
              window.location.href = "/projects/10_axalp_cooling/";
            },},{id: "projects-swiss-solar-boat-carbon-fibre-foil",
          title: 'Swiss Solar Boat — Carbon-Fibre Foil',
          description: "Carbon-fibre lateral foil; 2nd place, Monaco Energy Boat Challenge 2022.",
          section: "Projects",handler: () => {
              window.location.href = "/projects/11_solar_boat/";
            },},{id: "projects-nova-electric-racing-bike-chassis",
          title: 'NOVA Electric Racing — Bike Chassis',
          description: "Lead chassis engineer for an electric racing-bike prototype.",
          section: "Projects",handler: () => {
              window.location.href = "/projects/12_nova_chassis/";
            },},{id: "projects-acentauri-solar-racing-mechanical-system-advisor",
          title: 'aCentauri Solar Racing — Mechanical System Advisor',
          description: "Advised a solar-car team preparing for the 3000 km BWSC 2025.",
          section: "Projects",handler: () => {
              window.location.href = "/projects/13_acentauri/";
            },},{id: "projects-multi-objective-optimization-of-ev-battery-enclosures",
          title: 'Multi-Objective Optimization of EV Battery Enclosures',
          description: "Parametric design driving automated FEA inside a multi-objective optimisation loop.",
          section: "Projects",handler: () => {
              window.location.href = "/projects/14_battery_enclosure_opt/";
            },},{id: "projects-stiffened-composite-panel-optimization",
          title: 'Stiffened Composite Panel Optimization',
          description: "MATLAB sizing of a stiffened composite panel under compression.",
          section: "Projects",handler: () => {
              window.location.href = "/projects/15_composite_panel/";
            },},{id: "projects-probabilistic-load-forecasting-gefcom2014",
          title: 'Probabilistic Load Forecasting — GEFCom2014',
          description: "Month-ahead hourly electricity load as 99-quantile predictive distributions.",
          section: "Projects",handler: () => {
              window.location.href = "/projects/16_load_forecasting/";
            },},{id: "projects-cad-to-cad-retrieval",
          title: 'CAD-to-CAD Retrieval',
          description: "Shape retrieval over a 1,008-part b-rep corpus with a four-family evaluation.",
          section: "Projects",handler: () => {
              window.location.href = "/projects/17_cad_retrieval/";
            },},{id: "projects-spectral-and-modal-analysis-of-aluminium-plates",
          title: 'Spectral and Modal Analysis of Aluminium Plates',
          description: "Reconstructive testing to identify critical resonance frequencies.",
          section: "Projects",handler: () => {
              window.location.href = "/projects/18_modal_analysis/";
            },},{
        id: 'social-cv',
        title: 'CV',
        section: 'Socials',
        handler: () => {
          window.open("/assets/pdf/CV_ChristopheHatterer.pdf", "_blank");
        },
      },{
        id: 'social-email',
        title: 'email',
        section: 'Socials',
        handler: () => {
          window.open("mailto:%63%68%72%69%73%74%6F%70%68%65@%68%61%74%74%65%72%65%72.%6E%65%74", "_blank");
        },
      },{
        id: 'social-github',
        title: 'GitHub',
        section: 'Socials',
        handler: () => {
          window.open("https://github.com/chrishat310", "_blank");
        },
      },{
        id: 'social-linkedin',
        title: 'LinkedIn',
        section: 'Socials',
        handler: () => {
          window.open("https://www.linkedin.com/in/christophehahatterer", "_blank");
        },
      },{
        id: 'social-rss',
        title: 'RSS Feed',
        section: 'Socials',
        handler: () => {
          window.open("/feed.xml", "_blank");
        },
      },{
      id: 'light-theme',
      title: 'Change theme to light',
      description: 'Change the theme of the site to Light',
      section: 'Theme',
      handler: () => {
        setThemeSetting("light");
      },
    },
    {
      id: 'dark-theme',
      title: 'Change theme to dark',
      description: 'Change the theme of the site to Dark',
      section: 'Theme',
      handler: () => {
        setThemeSetting("dark");
      },
    },
    {
      id: 'system-theme',
      title: 'Use system default theme',
      description: 'Change the theme of the site to System Default',
      section: 'Theme',
      handler: () => {
        setThemeSetting("system");
      },
    },];
