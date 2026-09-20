export const CANDIDATES_DATA = [
  {
    id: "cand_1",
    name: "Alex Chen",
    currentTitle: "Senior Machine Learning & GNN Engineer",
    avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=200",
    location: "San Francisco, CA (Hybrid / Remote)",
    yearsExperience: 6,
    education: {
      degree: "M.S. in Computer Science",
      school: "Stanford University",
      graduationYear: 2020,
      gpa: "3.92/4.0"
    },
    domain: "Graph Machine Learning & Recommendation Systems",
    summary: "Machine Learning Engineer specializing in Inductive Graph Neural Networks (GraphSAGE, GAT, GCN), heterogeneous graph representation, and large-scale embedding pipelines for recommendation and matching systems.",
    hardSkills: [
      { name: "PyTorch", level: 95, category: "Frameworks" },
      { name: "PyTorch Geometric (PyG)", level: 92, category: "Graph ML" },
      { name: "Graph Neural Networks (GNN)", level: 96, category: "Graph ML" },
      { name: "GraphSAGE / GCN / GAT", level: 94, category: "Graph ML" },
      { name: "Python", level: 98, category: "Languages" },
      { name: "Hugging Face & Transformers", level: 88, category: "NLP" },
      { name: "Vector Databases (Milvus / Qdrant)", level: 85, category: "Data" },
      { name: "Docker & Kubernetes", level: 78, category: "DevOps" },
      { name: "SQL & Data Modeling", level: 82, category: "Data" },
      { name: "Distributed Training (Ray / DDP)", level: 84, category: "Infrastructure" }
    ],
    softSkills: [
      "Research Paper Translation",
      "Cross-Functional Mentorship",
      "Technical Architecture Communication",
      "Algorithmic Problem Solving"
    ],
    experienceHistory: [
      {
        company: "RelationalAI Systems",
        role: "Senior Machine Learning Engineer",
        period: "2022 - Present",
        bulletPoints: [
          "Engineered an inductive GraphSAGE candidate-job link prediction service processing 450K graph entities with sub-80ms latency.",
          "Implemented heterogeneous graph representation learning incorporating textual embeddings via BERT-based cross-encoders.",
          "Collaborated with data engineering to scale graph mini-batch sampling on Ray clusters, reducing training time by 42%."
        ]
      },
      {
        company: "Nexus Graph Labs",
        role: "ML Research Engineer",
        period: "2020 - 2022",
        bulletPoints: [
          "Trained bipartite graph convolutional networks for e-commerce user-item recommendations.",
          "Authored 2 workshop papers on inductive node classification under severe class imbalance."
        ]
      }
    ],
    weakBullets: [
      "Worked on machine learning models for user recommendations.",
      "Fixed bugs and improved data loading pipeline speed.",
      "Used PyTorch to run neural network experiments."
    ],
    rawResumeText: `ALEX CHEN
San Francisco, CA | alex.chen@example.io | github.com/alexchen-gnn

PROFESSIONAL SUMMARY
Senior Machine Learning Engineer with 6 years of experience specializing in inductive Graph Neural Networks, heterogeneous graph modeling, and large-scale embedding systems for recommendation and matchmaking engines.

EXPERIENCE
RelationalAI Systems — Senior ML Engineer (2022 - Present)
- Engineered an inductive GraphSAGE candidate-job link prediction service processing 450K graph entities with sub-80ms latency.
- Implemented heterogeneous graph representation learning incorporating textual embeddings via BERT-based cross-encoders.
- Collaborated with data engineering to scale graph mini-batch sampling on Ray clusters, reducing training time by 42%.

Nexus Graph Labs — ML Research Engineer (2020 - 2022)
- Trained bipartite graph convolutional networks for e-commerce user-item recommendations.
- Authored 2 workshop papers on inductive node classification under severe class imbalance.

EDUCATION
Stanford University — M.S. in Computer Science (AI Track), 2020 (GPA 3.92)
UC San Diego — B.S. in Computer Science, 2018

CORE SKILLS
PyTorch, PyTorch Geometric, Graph Neural Networks, GraphSAGE, GCN, Python, Transformers, Vector Databases, Docker, Ray.`,
    vectorCoordinates: [0.82, 0.76], // 2D projection coordinate for embedding space
    atsScore: 92
  },
  {
    id: "cand_2",
    name: "Sarah Jenkins",
    currentTitle: "Staff Cloud & Full-Stack Architect",
    avatar: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=200",
    location: "New York, NY (Remote)",
    yearsExperience: 8,
    education: {
      degree: "B.S. in Software Engineering",
      school: "UC Berkeley",
      graduationYear: 2018,
      gpa: "3.85/4.0"
    },
    domain: "Distributed Cloud Systems & Enterprise Web",
    summary: "Cloud Systems Architect with 8 years of experience building resilient microservices, distributed GraphQL APIs, and high-throughput enterprise web backends on AWS/Kubernetes.",
    hardSkills: [
      { name: "TypeScript / Node.js", level: 96, category: "Languages" },
      { name: "React & Next.js", level: 92, category: "Frontend" },
      { name: "AWS (EKS, Lambda, SQS, RDS)", level: 95, category: "Cloud" },
      { name: "Kubernetes & Terraform", level: 90, category: "DevOps" },
      { name: "Distributed Systems & Microservices", level: 94, category: "Architecture" },
      { name: "PostgreSQL & Redis", level: 91, category: "Data" },
      { name: "GraphQL & REST APIs", level: 93, category: "Backend" },
      { name: "CI/CD & GitOps (ArgoCD)", level: 87, category: "DevOps" }
    ],
    softSkills: [
      "Technical Strategy & Roadmapping",
      "Executive Stakeholder Alignment",
      "Team Leadership (Managed 7 engineers)",
      "Incident Postmortem Facilitation"
    ],
    experienceHistory: [
      {
        company: "FinTech Horizon",
        role: "Staff Cloud Architect",
        period: "2021 - Present",
        bulletPoints: [
          "Architected multi-region Kubernetes platform handling $12M daily transaction volume with 99.995% uptime.",
          "Migrated legacy monolith to 18 containerized microservices orchestrated via Terraform and ArgoCD."
        ]
      }
    ],
    weakBullets: [
      "Wrote microservices in Node and managed AWS cloud infrastructure.",
      "Helped junior developers with pull requests and daily standups."
    ],
    rawResumeText: `SARAH JENKINS
New York, NY | sarah.jenkins@example.com | github.com/sjenkins-cloud

SUMMARY
Staff Cloud & Full-Stack Architect with 8+ years designing zero-downtime distributed systems, Kubernetes clusters, and cloud-native microservices on AWS.

EXPERIENCE
FinTech Horizon — Staff Cloud Architect (2021 - Present)
- Architected multi-region Kubernetes platform handling $12M daily transaction volume with 99.995% uptime.
- Migrated legacy monolith to 18 containerized microservices orchestrated via Terraform and ArgoCD.

EDUCATION
UC Berkeley — B.S. in Software Engineering, 2018

SKILLS
TypeScript, React, Next.js, AWS, Kubernetes, Terraform, PostgreSQL, Redis, GraphQL, Docker.`,
    vectorCoordinates: [-0.65, 0.45],
    atsScore: 88
  },
  {
    id: "cand_3",
    name: "Marcus Vance",
    currentTitle: "Senior Data Scientist (RecSys & NLP)",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=200",
    location: "Austin, TX (Hybrid)",
    yearsExperience: 5,
    education: {
      degree: "Ph.D. in Information Systems",
      school: "University of Michigan",
      graduationYear: 2021,
      gpa: "3.95/4.0"
    },
    domain: "Recommendation Algorithms & NLP",
    summary: "Quantitative Data Scientist specializing in collaborative filtering, matrix factorization, two-tower recommendation architectures, and contextual search ranking.",
    hardSkills: [
      { name: "Python", level: 96, category: "Languages" },
      { name: "RecSys Algorithms (Matrix Factorization)", level: 93, category: "Algorithms" },
      { name: "Scikit-Learn & PyTorch", level: 88, category: "Frameworks" },
      { name: "Apache Spark & PySpark", level: 85, category: "Data" },
      { name: "NLP (TF-IDF, Word2Vec, BERT)", level: 89, category: "NLP" },
      { name: "SQL & Snowflake", level: 90, category: "Data" },
      { name: "A/B Testing & Statistical Inference", level: 94, category: "Analytics" }
    ],
    softSkills: [
      "Experimental Design",
      "Executive Dashboard Reporting",
      "Cross-Functional Data Evangelism"
    ],
    experienceHistory: [
      {
        company: "TalentPulse Analytics",
        role: "Senior Data Scientist",
        period: "2021 - Present",
        bulletPoints: [
          "Developed candidate-job similarity scoring engine using two-tower BERT embeddings, improving applicant click-through rate by 24%.",
          "Designed multi-armed bandit A/B testing framework to optimize job feed ranking algorithms."
        ]
      }
    ],
    weakBullets: [
      "Analyzed job data using SQL and Python.",
      "Built models for matching jobs to users."
    ],
    rawResumeText: `MARCUS VANCE, Ph.D.
Austin, TX | marcus.vance@example.org

SUMMARY
Senior Data Scientist with doctorate in Information Systems. 5 years building recommendation pipelines, statistical matching engines, and search ranking models.

EXPERIENCE
TalentPulse Analytics — Senior Data Scientist (2021 - Present)
- Developed candidate-job similarity scoring engine using two-tower BERT embeddings, improving applicant click-through rate by 24%.
- Designed multi-armed bandit A/B testing framework to optimize job feed ranking algorithms.

EDUCATION
University of Michigan — Ph.D. in Information Systems, 2021
University of Texas — B.S. in Mathematics, 2016

SKILLS
Python, PyTorch, RecSys, Spark, BERT, SQL, A/B Testing, Scikit-Learn.`,
    vectorCoordinates: [0.55, 0.40],
    atsScore: 89
  },
  {
    id: "cand_4",
    name: "Priya Sharma",
    currentTitle: "Senior Frontend Platform Specialist",
    avatar: "https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&q=80&w=200",
    location: "Seattle, WA (Remote)",
    yearsExperience: 5,
    education: {
      degree: "B.Tech in Information Technology",
      school: "National Institute of Technology",
      graduationYear: 2021,
      gpa: "3.88/4.0"
    },
    domain: "Modern Web & Interactive Visualizations",
    summary: "Frontend Platform Engineer passionate about interactive data visualization (D3/Canvas/WebGL), accessible UI component libraries, and web performance optimization.",
    hardSkills: [
      { name: "React & TypeScript", level: 98, category: "Frontend" },
      { name: "D3.js / SVG / HTML5 Canvas", level: 94, category: "Visualization" },
      { name: "CSS Architecture & Design Systems", level: 95, category: "Frontend" },
      { name: "Next.js & Server Components", level: 90, category: "Frontend" },
      { name: "Web Performance & Core Web Vitals", level: 91, category: "Optimization" },
      { name: "State Management (Zustand / Redux)", level: 92, category: "Frontend" }
    ],
    softSkills: [
      "User Experience Empathy",
      "Design-to-Code Precision",
      "Collaborative Code Reviewer"
    ],
    experienceHistory: [
      {
        company: "VividData Systems",
        role: "Senior Frontend Engineer",
        period: "2021 - Present",
        bulletPoints: [
          "Constructed high-performance WebGL graph visualizer rendering 50,000 nodes at 60 FPS in browser.",
          "Maintained enterprise design system utilized across 14 product squads with 99.8% test coverage."
        ]
      }
    ],
    weakBullets: [
      "Built websites and UI components in React.",
      "Fixed CSS styling bugs for mobile browsers."
    ],
    rawResumeText: `PRIYA SHARMA
Seattle, WA | priya.sharma@example.net

SUMMARY
Frontend Platform Specialist with 5 years creating responsive, accessible, high-performance UI systems and data visualization engines.

EXPERIENCE
VividData Systems — Senior Frontend Engineer (2021 - Present)
- Constructed high-performance WebGL graph visualizer rendering 50,000 nodes at 60 FPS in browser.
- Maintained enterprise design system utilized across 14 product squads with 99.8% test coverage.

EDUCATION
National Institute of Technology — B.Tech in IT, 2021

SKILLS
React, TypeScript, D3.js, WebGL, Next.js, CSS Architecture, Performance Optimization.`,
    vectorCoordinates: [-0.70, -0.60],
    atsScore: 85
  },
  {
    id: "cand_5",
    name: "David Kim",
    currentTitle: "Junior MLOps & Infrastructure Engineer",
    avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=200",
    location: "Chicago, IL (Hybrid)",
    yearsExperience: 2,
    education: {
      degree: "B.S. in Computer Engineering",
      school: "University of Illinois Urbana-Champaign",
      graduationYear: 2024,
      gpa: "3.70/4.0"
    },
    domain: "ML Infrastructure & CI/CD Pipelines",
    summary: "Aspiring MLOps engineer with hands-on experience building reproducible machine learning deployment pipelines, containerization with Docker, and automated model tracking.",
    hardSkills: [
      { name: "Docker & Linux Shell", level: 86, category: "DevOps" },
      { name: "Python", level: 84, category: "Languages" },
      { name: "MLflow & Weights & Biases", level: 82, category: "MLOps" },
      { name: "PyTorch Basics", level: 75, category: "Frameworks" },
      { name: "GitHub Actions & CI/CD", level: 85, category: "DevOps" },
      { name: "FastAPI Model Serving", level: 80, category: "Backend" }
    ],
    softSkills: [
      "Continuous Learning",
      "Technical Documentation",
      "Proactive Troubleshooting"
    ],
    experienceHistory: [
      {
        company: "PipelineOps Solutions",
        role: "Associate DevOps / MLOps Engineer",
        period: "2024 - Present",
        bulletPoints: [
          "Configured GitHub Actions CI/CD workflows for automated model regression testing and container packaging.",
          "Integrated MLflow tracking server for 6 internal computer vision and NLP models."
        ]
      }
    ],
    weakBullets: [
      "Worked on Docker containers and fixed bash scripts.",
      "Helped test Python code for machine learning projects."
    ],
    rawResumeText: `DAVID KIM
Chicago, IL | david.kim@example.org

SUMMARY
Junior MLOps Engineer with 2 years of experience in model serving, containerization, and automated CI/CD for AI workloads.

EXPERIENCE
PipelineOps Solutions — Associate MLOps Engineer (2024 - Present)
- Configured GitHub Actions CI/CD workflows for automated model regression testing and container packaging.
- Integrated MLflow tracking server for 6 internal models.

EDUCATION
UIUC — B.S. in Computer Engineering, 2024

SKILLS
Docker, Linux, Python, MLflow, FastAPI, GitHub Actions, PyTorch.`,
    vectorCoordinates: [0.15, -0.75],
    atsScore: 78
  }
];
