export const JOBS_DATA = [
  {
    id: "job_1",
    title: "Lead AI & Graph Systems Engineer",
    company: "NeuralScale Labs",
    logo: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&q=80&w=120",
    location: "San Francisco, CA (Hybrid)",
    salaryRange: "$195,000 - $240,000 + Equity",
    department: "Applied AI Research",
    minExperience: 5,
    minDegree: "M.S. in Computer Science / AI",
    domain: "Graph Machine Learning & Recommendation Systems",
    overview: "We are seeking a Lead AI Engineer to architect our next-generation Inductive Graph Neural Network (GNN) matching platform. You will spearhead graph representation learning, sub-graph neighborhood aggregation, and low-latency link prediction engines.",
    requiredSkills: [
      { name: "Graph Neural Networks (GNN)", weight: 1.0, category: "Graph ML" },
      { name: "PyTorch Geometric (PyG)", weight: 0.95, category: "Graph ML" },
      { name: "GraphSAGE / GCN / GAT", weight: 0.95, category: "Graph ML" },
      { name: "PyTorch", weight: 0.9, category: "Frameworks" },
      { name: "Python", weight: 0.85, category: "Languages" },
      { name: "Vector Databases (Milvus / Qdrant)", weight: 0.8, category: "Data" },
      { name: "Distributed Training (Ray / DDP)", weight: 0.75, category: "Infrastructure" }
    ],
    preferredSkills: [
      { name: "Hugging Face & Transformers", weight: 0.7, category: "NLP" },
      { name: "Docker & Kubernetes", weight: 0.65, category: "DevOps" },
      { name: "Inductive Learning Research Experience", weight: 0.85, category: "Research" }
    ],
    responsibilities: [
      "Architect inductive bipartite graph neural network pipelines connecting candidates and job openings.",
      "Design neighborhood sampling routines capable of sub-100ms inference on 1M+ node heterogeneous graphs.",
      "Deploy models to production using PyTorch C++ / Triton inference server and vector databases.",
      "Collaborate with product and talent teams to explain GNN predictions and ensure algorithmic fairness."
    ],
    rawJobText: `JOB TITLE: Lead AI & Graph Systems Engineer
COMPANY: NeuralScale Labs
LOCATION: San Francisco, CA (Hybrid)
SALARY: $195k - $240k

ABOUT THE ROLE:
NeuralScale Labs is building frontier candidate-job matching technology using Inductive Graph Neural Networks. We are seeking a Lead AI Engineer with deep expertise in PyTorch Geometric, GraphSAGE, and heterogeneous graph embeddings.

RESPONSIBILITIES:
- Architect inductive bipartite graph neural network pipelines connecting candidates and jobs.
- Design neighborhood sampling routines capable of sub-100ms inference on 1M+ node graphs.
- Deploy models using PyTorch, Triton, Ray, and Vector Databases.

REQUIREMENTS:
- M.S. or Ph.D. in Computer Science, Machine Learning, or related field.
- 5+ years of production experience in machine learning.
- Hands-on mastery of PyTorch, PyG, GraphSAGE/GCN/GAT, and distributed graph training.
- Strong publication or production record in graph learning or recommendation systems.`,
    vectorCoordinates: [0.85, 0.78]
  },
  {
    id: "job_2",
    title: "Staff Cloud Infrastructure & Distributed Systems Architect",
    company: "FinTech Horizon",
    logo: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&q=80&w=120",
    location: "New York, NY (Remote)",
    salaryRange: "$210,000 - $265,000 + Equity",
    department: "Core Cloud Platform",
    minExperience: 7,
    minDegree: "B.S. in Computer Science / Software Engineering",
    domain: "Distributed Cloud Systems & Enterprise Web",
    overview: "Looking for a Staff Cloud Architect to lead the design and evolution of our mission-critical distributed platform. You will steer cloud reliability, multi-region Kubernetes clusters, and zero-trust security infrastructure.",
    requiredSkills: [
      { name: "AWS (EKS, Lambda, SQS, RDS)", weight: 1.0, category: "Cloud" },
      { name: "Kubernetes & Terraform", weight: 0.95, category: "DevOps" },
      { name: "Distributed Systems & Microservices", weight: 0.95, category: "Architecture" },
      { name: "TypeScript / Node.js", weight: 0.85, category: "Languages" },
      { name: "PostgreSQL & Redis", weight: 0.85, category: "Data" },
      { name: "CI/CD & GitOps (ArgoCD)", weight: 0.8, category: "DevOps" }
    ],
    preferredSkills: [
      { name: "GraphQL & REST APIs", weight: 0.75, category: "Backend" },
      { name: "React & Next.js", weight: 0.6, category: "Frontend" },
      { name: "FinTech Compliance (SOC2, PCI-DSS)", weight: 0.7, category: "Compliance" }
    ],
    responsibilities: [
      "Drive architectural strategy for our multi-cloud Kubernetes deployment across AWS US-East and EU-West.",
      "Lead high-scale database partitioning and caching strategies with Redis and Aurora PostgreSQL.",
      "Mentor senior engineers on distributed consensus, resilience patterns, and observability."
    ],
    rawJobText: `JOB TITLE: Staff Cloud Infrastructure & Distributed Systems Architect
COMPANY: FinTech Horizon
LOCATION: New York, NY (Remote)
SALARY: $210k - $265k

OVERVIEW:
Seeking an experienced Staff Cloud Architect to guide our financial cloud platform handling high-volume transactions.

REQUIREMENTS:
- 7+ years of architectural experience in distributed systems.
- Deep expertise in AWS, Kubernetes, Terraform, microservices, and PostgreSQL.
- Proven experience with GitOps, CI/CD, and high availability systems.`,
    vectorCoordinates: [-0.68, 0.48]
  },
  {
    id: "job_3",
    title: "Staff Recommendation & Search Ranking Scientist",
    company: "TalentPulse Analytics",
    logo: "https://images.unsplash.com/photo-1557804506-669a67965ba0?auto=format&fit=crop&q=80&w=120",
    location: "Austin, TX (Hybrid)",
    salaryRange: "$185,000 - $230,000 + Equity",
    department: "Data Science & Ranking",
    minExperience: 4,
    minDegree: "Ph.D. or M.S. in Info Systems, Math, or CS",
    domain: "Recommendation Algorithms & NLP",
    overview: "Join TalentPulse to lead our statistical matchmaking and recommendation algorithms. You will design two-tower embeddings, personalized contextual ranking, and multi-objective optimization algorithms.",
    requiredSkills: [
      { name: "RecSys Algorithms (Matrix Factorization)", weight: 1.0, category: "Algorithms" },
      { name: "Python", weight: 0.95, category: "Languages" },
      { name: "NLP (TF-IDF, Word2Vec, BERT)", weight: 0.9, category: "NLP" },
      { name: "Apache Spark & PySpark", weight: 0.85, category: "Data" },
      { name: "A/B Testing & Statistical Inference", weight: 0.85, category: "Analytics" },
      { name: "SQL & Snowflake", weight: 0.8, category: "Data" }
    ],
    preferredSkills: [
      { name: "Scikit-Learn & PyTorch", weight: 0.75, category: "Frameworks" },
      { name: "Graph Neural Networks (GNN)", weight: 0.7, category: "Graph ML" }
    ],
    responsibilities: [
      "Develop candidate ranking models optimizing for both recruiter engagement and candidate satisfaction.",
      "Conduct offline evaluations and online A/B experimentation for recommendation feeds.",
      "Scale two-tower embedding search for sub-second retrieval over millions of candidates."
    ],
    rawJobText: `JOB TITLE: Staff Recommendation & Search Ranking Scientist
COMPANY: TalentPulse Analytics
LOCATION: Austin, TX (Hybrid)
SALARY: $185k - $230k

OVERVIEW:
Drive talent recommendation algorithms using modern machine learning, two-tower embedding models, and collaborative filtering.

REQUIREMENTS:
- Ph.D. or M.S. with 4+ years in recommendation systems or search ranking.
- Strong knowledge of PyTorch, Spark, NLP embeddings, and A/B test methodologies.`,
    vectorCoordinates: [0.58, 0.42]
  },
  {
    id: "job_4",
    title: "Senior Frontend Platform & Visualizations Architect",
    company: "WebCore Systems",
    logo: "https://images.unsplash.com/photo-1542744094-3a31f272c490?auto=format&fit=crop&q=80&w=120",
    location: "Seattle, WA (Remote)",
    salaryRange: "$170,000 - $215,000 + Equity",
    department: "Design Systems & UI Platform",
    minExperience: 4,
    minDegree: "B.S. in Computer Science or equivalent",
    domain: "Modern Web & Interactive Visualizations",
    overview: "We need a Senior Frontend Platform Architect to pioneer our interactive graph visualization dashboards, responsive design systems, and WebGL rendering pipelines.",
    requiredSkills: [
      { name: "React & TypeScript", weight: 1.0, category: "Frontend" },
      { name: "D3.js / SVG / HTML5 Canvas", weight: 0.95, category: "Visualization" },
      { name: "CSS Architecture & Design Systems", weight: 0.9, category: "Frontend" },
      { name: "Web Performance & Core Web Vitals", weight: 0.85, category: "Optimization" },
      { name: "State Management (Zustand / Redux)", weight: 0.8, category: "Frontend" }
    ],
    preferredSkills: [
      { name: "Next.js & Server Components", weight: 0.75, category: "Frontend" },
      { name: "Three.js / WebGL", weight: 0.8, category: "Visualization" }
    ],
    responsibilities: [
      "Build high-performance interactive force-directed graph visualizers with WebGL/Canvas.",
      "Standardize accessible component design patterns across all enterprise engineering teams.",
      "Optimize browser rendering budgets and bundle sizes for instant load times."
    ],
    rawJobText: `JOB TITLE: Senior Frontend Platform & Visualizations Architect
COMPANY: WebCore Systems
LOCATION: Seattle, WA (Remote)
SALARY: $170k - $215k

OVERVIEW:
Lead interactive data visualization and web application performance for enterprise analytics dashboards.

REQUIREMENTS:
- 4+ years of advanced React, TypeScript, D3/Canvas, and CSS architecture experience.
- Experience rendering massive graphs and complex interactive data tables in the browser.`,
    vectorCoordinates: [-0.72, -0.62]
  }
];
