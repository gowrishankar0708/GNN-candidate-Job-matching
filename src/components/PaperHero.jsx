import React, { useState } from "react";
import { BookOpen, ExternalLink, ChevronDown, ChevronUp, Network, Cpu, Database, CheckCircle, Sparkles } from "lucide-react";
import { PAPER_METADATA } from "../data/benchmarkData";

export default function PaperHero({ activeModule, onSelectModule }) {
  const [showAbstract, setShowAbstract] = useState(false);

  const pipelineStages = [
    { id: "preprocessing", label: "1. Data & Preprocessing", phase: 1 },
    { id: "extraction", label: "2. LLM Extraction", phase: 1 },
    { id: "embedding", label: "3. Embedding Generation", phase: 1 },
    { id: "graph", label: "4. Bipartite Graph", phase: 1 },
    { id: "gnn", label: "5. Inductive GNN", phase: 1 },
    { id: "benchmark", label: "6. Model Evaluation", phase: 1 },
    { id: "knowledge", label: "7. Graph RAG", phase: 2 },
    { id: "resume", label: "8. Resume Enhancer", phase: 2 },
    { id: "gap", label: "9. Skill Gap Radar", phase: 2 },
    { id: "interview", label: "10. Interview Gen", phase: 2 },
    { id: "multiagent", label: "11. Multi-Agent & XAI", phase: 2 },
    { id: "dashboard", label: "12. Final Dashboard", phase: 2 }
  ];

  return (
    <div className="glass-card" style={{ marginBottom: "28px", border: "1px solid var(--border-medium)", position: "relative", overflow: "hidden" }}>
      {/* Background subtle neon glow */}
      <div style={{
        position: "absolute",
        top: "-80px",
        right: "-80px",
        width: "300px",
        height: "300px",
        borderRadius: "50%",
        background: "radial-gradient(circle, rgba(139, 92, 246, 0.15) 0%, rgba(6, 182, 212, 0.05) 50%, transparent 70%)",
        pointerEvents: "none"
      }} />

      {/* Top Paper Badges */}
      <div style={{ display: "flex", flexWrap: "wrap", alignItems: "center", gap: "10px", marginBottom: "16px" }}>
        <span className="badge badge-cyan">
          <BookOpen size={12} /> {PAPER_METADATA.journal}
        </span>
        <span className="badge badge-violet">
          {PAPER_METADATA.publisher} (2025)
        </span>
        <a
          href={`https://doi.org/${PAPER_METADATA.doi}`}
          target="_blank"
          rel="noopener noreferrer"
          className="badge"
          style={{ background: "rgba(255, 255, 255, 0.06)", color: "var(--text-secondary)", border: "1px solid var(--border-subtle)" }}
        >
          DOI: {PAPER_METADATA.doi} <ExternalLink size={10} style={{ marginLeft: "4px" }} />
        </a>
        <span className="badge badge-emerald">
          Balanced Acc: 65.4% (vs 55.0% MLP)
        </span>
        <span className="badge badge-amber">
          Minority Recall: 48.9% (vs 8.5% MLP)
        </span>
      </div>

      {/* Title & Authors */}
      <h1 style={{ fontSize: "1.85rem", lineHeight: 1.25, marginBottom: "10px", fontWeight: 800 }}>
        {PAPER_METADATA.title}
      </h1>
      <p style={{ fontSize: "0.95rem", color: "var(--cyan-primary)", marginBottom: "16px", fontWeight: 500 }}>
        {PAPER_METADATA.authors.join(" • ")}
      </p>

      {/* Abstract Toggle */}
      <div style={{ marginBottom: "20px" }}>
        <button
          onClick={() => setShowAbstract(!showAbstract)}
          className="btn-secondary"
          style={{ padding: "6px 14px", fontSize: "0.8rem", borderRadius: "var(--radius-full)" }}
        >
          {showAbstract ? <ChevronUp size={14} /> : <ChevronDown size={14} />}
          {showAbstract ? "Hide Academic Abstract" : "Read Springer Paper Abstract"}
        </button>

        {showAbstract && (
          <div style={{
            marginTop: "12px",
            padding: "16px 20px",
            background: "var(--bg-surface)",
            borderRadius: "var(--radius-md)",
            border: "1px solid var(--border-subtle)",
            fontSize: "0.9rem",
            color: "var(--text-secondary)",
            lineHeight: 1.7
          }}>
            {PAPER_METADATA.abstract}
          </div>
        )}
      </div>

      {/* End-to-End Pipeline Navigation Bar */}
      <div>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "10px" }}>
          <span style={{ fontSize: "0.8rem", fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.05em", color: "var(--text-muted)" }}>
            Interactive System Flow (Phase 1 Paper + Phase 2 Enhancements)
          </span>
          <span style={{ fontSize: "0.75rem", color: "var(--cyan-primary)" }}>
            Click any step to inspect module
          </span>
        </div>

        <div style={{
          display: "flex",
          gap: "8px",
          overflowX: "auto",
          paddingBottom: "8px"
        }}>
          {pipelineStages.map((stage) => {
            const isActive = activeModule === stage.id;
            const isPhase1 = stage.phase === 1;

            return (
              <button
                key={stage.id}
                onClick={() => onSelectModule(stage.id)}
                style={{
                  whiteSpace: "nowrap",
                  padding: "8px 14px",
                  borderRadius: "var(--radius-md)",
                  fontSize: "0.8rem",
                  fontWeight: isActive ? 600 : 500,
                  background: isActive
                    ? (isPhase1 ? "rgba(6, 182, 212, 0.2)" : "rgba(139, 92, 246, 0.2)")
                    : "var(--bg-surface)",
                  color: isActive
                    ? (isPhase1 ? "var(--cyan-primary)" : "var(--violet-primary)")
                    : "var(--text-secondary)",
                  border: isActive
                    ? `1px solid ${isPhase1 ? 'var(--cyan-primary)' : 'var(--violet-primary)'}`
                    : "1px solid var(--border-subtle)",
                  cursor: "pointer",
                  transition: "all var(--transition-fast)"
                }}
              >
                {stage.label}
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}
