export const SKILL_ONTOLOGY = [
  {
    id: "ont_gnn",
    name: "Graph Neural Networks (GNN)",
    category: "Graph Machine Learning",
    parent: "Deep Learning",
    relatedSkills: ["PyTorch Geometric", "DGL", "GraphSAGE", "GCN", "GAT", "Link Prediction"],
    marketDemand: "Exponential (94/100)",
    avgSalaryImpact: "+28%",
    prerequisites: ["Linear Algebra", "Graph Theory", "PyTorch", "Message Passing Basics"],
    description: "Deep learning architectures operating directly on non-Euclidean graph-structured data via neighborhood message passing."
  },
  {
    id: "ont_inductive",
    name: "Inductive Learning for Graphs",
    category: "Graph Machine Learning",
    parent: "Graph Neural Networks (GNN)",
    relatedSkills: ["GraphSAGE", "Neighborhood Sampling", "Zero-Shot Link Prediction", "Embedding Generation"],
    marketDemand: "High (89/100)",
    avgSalaryImpact: "+25%",
    prerequisites: ["Graph Neural Networks (GNN)", "Mini-batch Graph Training"],
    description: "Techniques allowing GNNs to generalize to unseen nodes (new candidates or new job postings) without retraining the entire graph."
  },
  {
    id: "ont_pyg",
    name: "PyTorch Geometric (PyG)",
    category: "Frameworks",
    parent: "PyTorch",
    relatedSkills: ["DGL", "PyTorch", "CUDA", "Sparse Tensors", "NeighborLoader"],
    marketDemand: "High (91/100)",
    avgSalaryImpact: "+22%",
    prerequisites: ["PyTorch", "Python", "Tensors"],
    description: "Industry-standard library for deep learning on irregular input data such as graphs, point clouds, and manifolds."
  },
  {
    id: "ont_recsys",
    name: "Recommendation Systems (RecSys)",
    category: "Applied AI",
    parent: "Machine Learning",
    relatedSkills: ["Collaborative Filtering", "Two-Tower Networks", "Matrix Factorization", "Bipartite Matching"],
    marketDemand: "Very High (93/100)",
    avgSalaryImpact: "+24%",
    prerequisites: ["Probability & Statistics", "Python", "Matrix Decompositions"],
    description: "Algorithms designed to suggest relevant items (jobs, products, content) to users based on behavioral and relational history."
  },
  {
    id: "ont_k8s",
    name: "Kubernetes & Cloud Infrastructure",
    category: "DevOps & Cloud",
    parent: "Cloud Computing",
    relatedSkills: ["Docker", "Terraform", "AWS EKS", "ArgoCD", "Helm", "Microservices"],
    marketDemand: "Very High (95/100)",
    avgSalaryImpact: "+30%",
    prerequisites: ["Linux", "Networking", "Containerization"],
    description: "Automated container deployment, scaling, and operational management platform for distributed cloud architectures."
  },
  {
    id: "ont_react",
    name: "React & Modern Web Architecture",
    category: "Frontend Platform",
    parent: "Software Engineering",
    relatedSkills: ["TypeScript", "Next.js", "State Management", "WebGL", "D3.js", "Performance Optimization"],
    marketDemand: "Ubiquitous (96/100)",
    avgSalaryImpact: "+20%",
    prerequisites: ["JavaScript", "HTML/CSS", "DOM API"],
    description: "Component-driven declarative frontend UI architecture powering modern reactive single-page and server-rendered web applications."
  }
];

export const RAG_KNOWLEDGE_BASE = [
  {
    id: "rag_1",
    title: "Inductive vs Transductive Learning in Candidate-Job Matching",
    tags: ["Inductive Learning", "GraphSAGE", "Springer 2025", "Recruitment Analytics"],
    content: `In recruitment platforms, candidate-job matching is inherently dynamic: new job descriptions and candidate resumes arrive continuously.
Traditional transductive GNNs (like vanilla GCN) require the entire graph adjacency matrix during training and fail when new, unseen nodes appear.
The Springer 2025 paper solves this via an Inductive Learning framework (using neighbor aggregation akin to GraphSAGE). By learning aggregator functions rather than fixed node embeddings, the model can instantly compute embeddings for brand-new candidates or jobs by aggregating features from their local connected subgraphs, achieving 65.4% balanced accuracy without retraining.`,
    citation: "Frazzetto et al., Data Science and Engineering (Springer 2025)"
  },
  {
    id: "rag_2",
    title: "Overcoming 95% Rejection Skew in Human Resources Data",
    tags: ["Class Imbalance", "Minority Class Detection", "Balanced Accuracy", "HR Analytics"],
    content: `A core challenge identified in HR machine learning is extreme class imbalance: on average, 95% of candidate applications are rejected, leaving only ~5% qualified hires.
Standard Multi-Layer Perceptrons (MLPs) suffer severely in this regime, scoring an abysmal 8.5% recall on the minority qualified class because they optimize for majority negative predictions.
By contrast, GNNs leverage structural relational homophily: qualified candidates connect to required skills and analogous past job nodes. This structural signal allows the GNN to achieve 48.9% recall on qualified talent—a 5.7x improvement over standard neural baselines.`,
    citation: "Data Science and Engineering, Vol. 10, Issue 2, 2025"
  },
  {
    id: "rag_3",
    title: "Graph RAG: Combining Vector Similarity with Relational Knowledge Graphs",
    tags: ["Graph RAG", "Knowledge Graph", "Ontology", "Hybrid Retrieval"],
    content: `While standard vector RAG computes semantic similarity using cosine distance over text embeddings, it misses multi-hop relational dependencies (e.g., whether 'Graph Neural Networks' fulfills a prerequisite for 'Inductive Link Prediction').
Graph RAG unites dense vector embeddings with explicit ontological graphs. When a recruiter or candidate queries the system, the engine traverses entity relationships (candidate -> skills -> job -> domain) to produce explainable, hallucination-free career advice and interview questions.`,
    citation: "Phase 2 Proposed Enhancement Architecture"
  },
  {
    id: "rag_4",
    title: "The Google XYZ / STAR Formula for Resume Bullet Optimization",
    tags: ["Resume Optimization", "ATS", "STAR Method", "Career Coaching"],
    content: `Top tech recruiters and ATS systems screen resumes using the Google XYZ Formula: 'Accomplished [X] as measured by [Y], by doing [Z]'.
Weak bullet points (e.g., 'Worked on machine learning models') fail ATS relevance checks and lack quantifiable impact.
The AI Resume Enhancer systematically restructures raw experience into:
- Action verb + exact technology (e.g., 'Engineered an inductive GraphSAGE link prediction service')
- Quantitative scope (e.g., 'processing 450K graph entities with sub-80ms latency')
- Business outcome (e.g., 'reducing training turnaround time by 42% on distributed clusters').`,
    citation: "Phase 2 Recruitment Intelligence Suite"
  }
];
