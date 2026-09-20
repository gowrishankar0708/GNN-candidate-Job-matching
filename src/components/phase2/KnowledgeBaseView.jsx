import React, { useState } from "react";
import { Search, Database, BookOpen, GitBranch, ArrowRight, Sparkles, ExternalLink } from "lucide-react";
import { queryKnowledgeBase } from "../../utils/ragEngine";
import { SKILL_ONTOLOGY, RAG_KNOWLEDGE_BASE } from "../../data/ontologyData";

export default function KnowledgeBaseView() {
  const [query, setQuery] = useState("How does inductive learning solve unseen candidates?");
  const [searchResult, setSearchResult] = useState(() => queryKnowledgeBase("How does inductive learning solve unseen candidates?"));

  const sampleQueries = [
    "How does inductive learning solve unseen candidates?",
    "Why does 95% rejection class imbalance break MLP models?",
    "What are the prerequisites for Graph Neural Networks?",
    "How does Graph RAG differ from standard vector RAG?",
    "Google XYZ resume bullet formula"
  ];

  const handleSearch = (q) => {
    setQuery(q);
    setSearchResult(queryKnowledgeBase(q));
  };

  return (
    <div className="animate-fade-in">
      <div style={{ marginBottom: "20px" }}>
        <h2 style={{ fontSize: "1.4rem", marginBottom: "6px" }}>Phase 2: Recruitment Knowledge Base & Retrieval System (Graph RAG)</h2>
        <p style={{ fontSize: "0.9rem" }}>
          Unites vector search with structural recruitment ontology and graph traversal. Powers recruitment insights, career advice, and interview generation with verifiable citations.
        </p>
      </div>

      {/* Query Search Bar */}
      <div className="glass-card" style={{ marginBottom: "24px" }}>
        <div style={{ display: "flex", gap: "10px", marginBottom: "12px" }}>
          <div style={{ position: "relative", flex: 1 }}>
            <Search size={18} style={{ position: "absolute", left: "14px", top: "12px", color: "var(--text-muted)" }} />
            <input
              type="text"
              value={query}
              onChange={e => setQuery(e.target.value)}
              onKeyDown={e => e.key === "Enter" && handleSearch(query)}
              placeholder="Query recruitment ontology, GNN paper knowledge, or skill pathways..."
              className="form-input"
              style={{ paddingLeft: "42px" }}
            />
          </div>
          <button
            onClick={() => handleSearch(query)}
            className="btn-primary"
            style={{ padding: "0 20px" }}
          >
            Graph RAG Query
          </button>
        </div>

        {/* Suggested Queries */}
        <div style={{ display: "flex", flexWrap: "wrap", alignItems: "center", gap: "8px" }}>
          <span style={{ fontSize: "0.75rem", color: "var(--text-muted)", textTransform: "uppercase" }}>Try queries:</span>
          {sampleQueries.map((q, idx) => (
            <button
              key={idx}
              onClick={() => handleSearch(q)}
              style={{
                background: "var(--bg-surface)",
                border: "1px solid var(--border-subtle)",
                borderRadius: "var(--radius-full)",
                padding: "3px 10px",
                fontSize: "0.75rem",
                color: "var(--text-secondary)",
                cursor: "pointer"
              }}
            >
              {q}
            </button>
          ))}
        </div>
      </div>

      {/* Synthesized Answer Box */}
      <div className="glass-card" style={{ marginBottom: "24px", background: "var(--bg-surface-elevated)", border: "1px solid var(--border-medium)" }}>
        <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "10px" }}>
          <Sparkles size={18} color="var(--violet-primary)" />
          <h3 style={{ fontSize: "1.1rem", color: "var(--text-primary)" }}>
            Synthesized Graph RAG Response
          </h3>
          <span className="badge badge-violet">Hybrid Vector + Graph Traversal</span>
        </div>
        <p style={{ fontSize: "0.92rem", color: "var(--text-primary)", lineHeight: 1.7 }}>
          {searchResult.answer}
        </p>
      </div>

      <div className="grid-2">
        {/* Left: Connected Ontology Nodes */}
        <div className="glass-card">
          <h3 style={{ fontSize: "1.1rem", marginBottom: "14px", display: "flex", alignItems: "center", gap: "8px" }}>
            <GitBranch size={18} color="var(--emerald-primary)" />
            Matched Ontology Entities & Career Bridges
          </h3>

          <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
            {searchResult.matchedOntology.map((node) => (
              <div
                key={node.id}
                style={{
                  background: "var(--bg-surface)",
                  padding: "14px",
                  borderRadius: "var(--radius-md)",
                  border: "1px solid var(--border-subtle)"
                }}
              >
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "4px" }}>
                  <strong style={{ fontSize: "0.95rem", color: "var(--emerald-primary)" }}>{node.name}</strong>
                  <span className="badge badge-emerald">{node.avgSalaryImpact}</span>
                </div>
                <div style={{ fontSize: "0.75rem", color: "var(--text-muted)", marginBottom: "8px" }}>
                  Category: {node.category} • Demand: {node.marketDemand}
                </div>
                <p style={{ fontSize: "0.82rem", color: "var(--text-secondary)", marginBottom: "8px" }}>
                  {node.description}
                </p>
                <div style={{ fontSize: "0.75rem", color: "var(--text-muted)" }}>
                  <strong>Prerequisites: </strong> {node.prerequisites.join(" → ")}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right: Knowledge Base Articles & Paper Citations */}
        <div className="glass-card">
          <h3 style={{ fontSize: "1.1rem", marginBottom: "14px", display: "flex", alignItems: "center", gap: "8px" }}>
            <BookOpen size={18} color="var(--cyan-primary)" />
            Retrieved Knowledge Documents
          </h3>

          <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
            {searchResult.results.map((doc) => (
              <div
                key={doc.id}
                style={{
                  background: "var(--bg-surface)",
                  padding: "14px",
                  borderRadius: "var(--radius-md)",
                  border: "1px solid var(--border-subtle)"
                }}
              >
                <div style={{ fontSize: "0.95rem", fontWeight: 600, color: "var(--text-primary)", marginBottom: "4px" }}>
                  {doc.title}
                </div>
                <div style={{ display: "flex", flexWrap: "wrap", gap: "4px", marginBottom: "8px" }}>
                  {doc.tags.map((t, idx) => (
                    <span key={idx} className="badge badge-cyan" style={{ fontSize: "0.65rem", padding: "2px 6px" }}>{t}</span>
                  ))}
                </div>
                <p style={{ fontSize: "0.82rem", color: "var(--text-secondary)", lineHeight: 1.6, marginBottom: "8px" }}>
                  {doc.content}
                </p>
                <div style={{ fontSize: "0.72rem", color: "var(--cyan-primary)" }}>
                  Citation: {doc.citation}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
