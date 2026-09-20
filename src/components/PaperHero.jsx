import React, { useState } from "react";
import { BookOpen, ExternalLink, ChevronDown, ChevronUp } from "lucide-react";
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
    <div className="glass-card" style={{ marginBottom: "28px" }}>
      {/* Top Paper Badges */}
      <div style={{ display: "flex", flexWrap: "wrap", alignItems: "center", gap: "8px", marginBottom: "14px" }}>
        <span className="badge badge-cyan">
          <BookOpen size={11} /> {PAPER_METADATA.journal}
        </span>
        <span className="badge badge-violet">
          {PAPER_METADATA.publisher} (2025)
        </span>
        <a
          href={`https://doi.org/${PAPER_METADATA.doi}`}
          target="_blank"
          rel="noopener noreferrer"
          className="badge"
          style={{ background: "var(--bg-surface)", color: "var(--text-secondary)", border: "1px solid var(--border-subtle)", textDecoration: "none" }}
        >
          DOI: {PAPER_METADATA.doi} <ExternalLink size={10} style={{ marginLeft: "3px" }} />
        </a>
        <span className="badge badge-emerald">Balanced Acc: 65.4% (vs 55.0% MLP)</span>
        <span className="badge badge-amber">Minority Recall: 48.9% (vs 8.5% MLP)</span>
      </div>

      {/* Title & Authors */}
      <h1 style={{ fontSize: "1.7rem", lineHeight: 1.3, marginBottom: "8px", fontWeight: 700 }}>
        {PAPER_METADATA.title}
      </h1>
      <p style={{ fontSize: "0.92rem", color: "var(--primary)", marginBottom: "14px", fontWeight: 500 }}>
        {PAPER_METADATA.authors.join(" · ")}
      </p>

      {/* Abstract Toggle */}
      <div style={{ marginBottom: "18px" }}>
        <button
          onClick={() => setShowAbstract(!showAbstract)}
          className="btn-secondary"
          style={{ padding: "6px 14px", fontSize: "0.8rem", borderRadius: "var(--radius-full)" }}
        >
          {showAbstract ? <ChevronUp size={14} /> : <ChevronDown size={14} />}
          {showAbstract ? "Hide Abstract" : "Read Paper Abstract"}
        </button>

        {showAbstract && (
          <div style={{
            marginTop: "12px",
            padding: "16px 20px",
            background: "var(--bg-surface)",
            borderRadius: "var(--radius-md)",
            border: "1px solid var(--border-subtle)",
            fontSize: "0.88rem",
            color: "var(--text-secondary)",
            lineHeight: 1.7
          }}>
            {PAPER_METADATA.abstract}
          </div>
        )}
      </div>

      {/* Pipeline Navigation */}
      <div>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "10px" }}>
          <span style={{ fontSize: "0.78rem", fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.04em", color: "var(--text-muted)" }}>
            System Pipeline (Phase 1 + Phase 2)
          </span>
          <span style={{ fontSize: "0.72rem", color: "var(--text-muted)" }}>
            Click any step to explore
          </span>
        </div>

        <div style={{ display: "flex", gap: "6px", overflowX: "auto", paddingBottom: "6px" }}>
          {pipelineStages.map((stage) => {
            const isActive = activeModule === stage.id;
            const isPhase1 = stage.phase === 1;

            return (
              <button
                key={stage.id}
                onClick={() => onSelectModule(stage.id)}
                style={{
                  whiteSpace: "nowrap",
                  padding: "7px 12px",
                  borderRadius: "var(--radius-md)",
                  fontSize: "0.78rem",
                  fontWeight: isActive ? 600 : 400,
                  background: isActive
                    ? (isPhase1 ? "var(--primary-light)" : "var(--purple-light)")
                    : "var(--bg-surface)",
                  color: isActive
                    ? (isPhase1 ? "var(--primary)" : "var(--purple)")
                    : "var(--text-secondary)",
                  border: isActive
                    ? `1px solid ${isPhase1 ? 'var(--primary-border)' : 'var(--purple-border)'}`
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
