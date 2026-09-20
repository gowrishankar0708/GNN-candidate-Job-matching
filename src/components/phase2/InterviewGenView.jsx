import React, { useState } from "react";
import { MessageSquare, HelpCircle, CheckCircle, RefreshCw, Star, Layers, ChevronDown, ChevronUp } from "lucide-react";

export default function InterviewGenView({ candidate, job }) {
  const [selectedCategory, setSelectedCategory] = useState("all"); // all, technical, behavioral, gap
  const [expandedId, setExpandedId] = useState("q1");

  // Dynamic question generator tailored to candidate + job
  const questions = [
    {
      id: "q1",
      category: "technical",
      badge: "Technical Deep-Dive",
      color: "var(--cyan-primary)",
      question: `In your work at ${candidate.experienceHistory[0]?.company || 'your previous company'}, you worked with Graph Neural Networks. How do you formulate inductive candidate-job matching compared to transductive GCN when new candidates join the platform?`,
      whyAsked: `Tests candidate's hands-on understanding of inductive node aggregation (e.g. GraphSAGE) vs transductive models as required for ${job.title}.`,
      idealAnswer: `Candidate should explain that transductive models require the entire Laplacian matrix during training. Inductive models learn parameter functions W that aggregate sampled local neighbors (1-hop/2-hop). When an unseen candidate arrives, their node embedding is generated on-the-fly from connected skill nodes without retraining.`,
      rubric: [
        "1 pt: Confuses inductive and transductive learning.",
        "3 pts: Explains difference at high level but omits neighborhood sampling.",
        "5 pts: Mentions aggregator functions (Mean/LSTM), mini-batch loaders, and latency tradeoffs."
      ]
    },
    {
      id: "q2",
      category: "system_design",
      badge: "System Architecture",
      color: "var(--violet-primary)",
      question: `How would you architect a real-time candidate recommendation service serving 10M users with sub-100ms P99 latency using PyTorch Geometric and a vector database?`,
      whyAsked: `Validates candidate's distributed systems ability to deploy graph models in high-throughput production at ${job.company}.`,
      idealAnswer: `Ideal response includes offline/online hybrid architecture: offline pre-computation of skill/job subgraph embeddings into Milvus/Qdrant, real-time 1-hop candidate aggregation in Go/C++ Triton inference server, and caching frequent subgraphs in Redis.`,
      rubric: [
        "1 pt: Only mentions basic Python script.",
        "3 pts: Mentions vector database but omits graph inference bottlenecks.",
        "5 pts: Details Triton server, caching layers, HNSW indices, and failover fallbacks."
      ]
    },
    {
      id: "q3",
      category: "behavioral",
      badge: "Behavioral (STAR)",
      color: "var(--amber-primary)",
      question: `Tell me about a time when your machine learning model suffered from extreme class imbalance or unexpected screening bias. How did you diagnose and rectify it?`,
      whyAsked: `Addresses the 95% rejection skew reality highlighted in the Springer 2025 research paper.`,
      idealAnswer: `Candidate should structure response using STAR: Situation (95% rejection data), Task (improve qualified recall), Action (re-weighting loss function, graph structural homophily, focal loss), Result (boosted minority recall significantly).`,
      rubric: [
        "1 pt: Blames data without actionable solution.",
        "3 pts: Uses standard oversampling without evaluating recall.",
        "5 pts: Implements loss re-weighting, structural graph signals, and balanced accuracy metrics."
      ]
    },
    {
      id: "q4",
      category: "gap",
      badge: "Skill Gap Probe",
      color: "var(--rose-primary)",
      question: `The role at ${job.company} requires proficiency in ${job.requiredSkills[job.requiredSkills.length - 1]?.name || 'distributed infrastructure'}. Could you walk us through an analogous technical challenge you tackled and how you would ramp up on this stack?`,
      whyAsked: `Tests candidate's adaptability to bridge the identified skill gap.`,
      idealAnswer: `Candidate demonstrates self-driven learning, citing foundational principles and past instances of mastering new distributed frameworks within weeks.`,
      rubric: [
        "1 pt: Defensive or dismissive of the requirement.",
        "3 pts: States willingness to learn without concrete examples.",
        "5 pts: Demonstrates strong foundational transferability and clear ramp-up plan."
      ]
    }
  ];

  const filteredQuestions = selectedCategory === "all"
    ? questions
    : questions.filter(q => q.category === selectedCategory);

  return (
    <div className="animate-fade-in">
      <div style={{ marginBottom: "20px" }}>
        <h2 style={{ fontSize: "1.4rem", marginBottom: "6px" }}>Phase 2: Personalized Interview Question Generation</h2>
        <p style={{ fontSize: "0.9rem" }}>
          Generates a comprehensive, candidate-specific interview pack based on candidate background, target role requirements, and identified skill gaps, complete with scoring rubrics and sample answers.
        </p>
      </div>

      {/* Filter Tabs */}
      <div style={{ display: "flex", gap: "10px", marginBottom: "20px" }}>
        <button
          onClick={() => setSelectedCategory("all")}
          className={`tab-btn ${selectedCategory === "all" ? "active active-phase2" : ""}`}
        >
          All Questions ({questions.length})
        </button>
        <button
          onClick={() => setSelectedCategory("technical")}
          className={`tab-btn ${selectedCategory === "technical" ? "active active-phase2" : ""}`}
        >
          Technical Deep-Dive
        </button>
        <button
          onClick={() => setSelectedCategory("system_design")}
          className={`tab-btn ${selectedCategory === "system_design" ? "active active-phase2" : ""}`}
        >
          System Architecture
        </button>
        <button
          onClick={() => setSelectedCategory("behavioral")}
          className={`tab-btn ${selectedCategory === "behavioral" ? "active active-phase2" : ""}`}
        >
          Behavioral & Ethics
        </button>
      </div>

      {/* Questions Accordion List */}
      <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
        {filteredQuestions.map((q) => {
          const isExpanded = expandedId === q.id;

          return (
            <div
              key={q.id}
              className="glass-card"
              style={{
                padding: "20px",
                border: isExpanded ? `1px solid ${q.color}` : "1px solid var(--border-subtle)",
                transition: "all var(--transition-normal)"
              }}
            >
              <div
                onClick={() => setExpandedId(isExpanded ? null : q.id)}
                style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", cursor: "pointer" }}
              >
                <div style={{ flex: 1 }}>
                  <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "6px" }}>
                    <span className="badge" style={{ background: "rgba(255, 255, 255, 0.08)", color: q.color, border: `1px solid ${q.color}` }}>
                      {q.badge}
                    </span>
                    <span style={{ fontSize: "0.75rem", color: "var(--text-muted)" }}>Interviewer Guide</span>
                  </div>
                  <h3 style={{ fontSize: "1.05rem", color: "var(--text-primary)", fontWeight: 600, lineHeight: 1.4 }}>
                    {q.question}
                  </h3>
                </div>

                <button className="btn-secondary" style={{ padding: "6px", marginLeft: "12px" }}>
                  {isExpanded ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
                </button>
              </div>

              {/* Collapsible Rubric & Ideal Answer */}
              {isExpanded && (
                <div style={{ marginTop: "16px", paddingTop: "16px", borderTop: "1px solid var(--border-subtle)" }}>
                  {/* Why Asked */}
                  <div style={{ marginBottom: "12px", fontSize: "0.85rem", color: "var(--text-secondary)" }}>
                    <strong style={{ color: "var(--cyan-primary)" }}>Why this is asked: </strong>
                    {q.whyAsked}
                  </div>

                  {/* Ideal Candidate Answer */}
                  <div style={{ background: "var(--bg-surface)", padding: "14px", borderRadius: "var(--radius-md)", border: "1px solid var(--border-subtle)", marginBottom: "14px" }}>
                    <div style={{ fontSize: "0.8rem", textTransform: "uppercase", color: "var(--emerald-primary)", fontWeight: 600, marginBottom: "4px" }}>
                      Expected Ideal Answer Highlights:
                    </div>
                    <p style={{ fontSize: "0.85rem", color: "var(--text-primary)", lineHeight: 1.6 }}>
                      {q.idealAnswer}
                    </p>
                  </div>

                  {/* Scoring Rubric */}
                  <div>
                    <div style={{ fontSize: "0.8rem", textTransform: "uppercase", color: "var(--text-muted)", fontWeight: 600, marginBottom: "8px" }}>
                      Candidate Evaluation Rubric:
                    </div>
                    <div style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
                      {q.rubric.map((r, rIdx) => (
                        <div
                          key={rIdx}
                          style={{
                            fontSize: "0.8rem",
                            color: "var(--text-secondary)",
                            background: "var(--bg-canvas)",
                            padding: "8px 12px",
                            borderRadius: "var(--radius-sm)",
                            borderLeft: `3px solid ${rIdx === 2 ? 'var(--emerald-primary)' : rIdx === 1 ? 'var(--amber-primary)' : 'var(--rose-primary)'}`
                          }}
                        >
                          {r}
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
