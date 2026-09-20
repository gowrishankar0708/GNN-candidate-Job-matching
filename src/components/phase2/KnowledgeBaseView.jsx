import React, { useState } from "react";
import { Search, BookOpen, GitBranch, Sparkles } from "lucide-react";
import { queryKnowledgeBase } from "../../utils/ragEngine";

export default function KnowledgeBaseView() {
  const [query, setQuery] = useState("How does inductive learning solve unseen candidates?");
  const [searchResult, setSearchResult] = useState(() => queryKnowledgeBase("How does inductive learning solve unseen candidates?"));
  const sampleQueries = ["How does inductive learning solve unseen candidates?", "Why does 95% rejection class imbalance break MLP models?", "What are the prerequisites for Graph Neural Networks?", "How does Graph RAG differ from standard vector RAG?", "Google XYZ resume bullet formula"];
  const handleSearch = (q) => { setQuery(q); setSearchResult(queryKnowledgeBase(q)); };

  return (
    <div className="animate-fade-in">
      <div style={{ marginBottom: "20px" }}>
        <h2 style={{ fontSize: "1.35rem", marginBottom: "6px" }}>Phase 2: Recruitment Knowledge Base & Retrieval (Graph RAG)</h2>
        <p style={{ fontSize: "0.88rem" }}>Unites vector search with structural recruitment ontology for verifiable career intelligence.</p>
      </div>

      <div className="glass-card" style={{ marginBottom: "20px" }}>
        <div style={{ display: "flex", gap: "8px", marginBottom: "10px" }}>
          <div style={{ position: "relative", flex: 1 }}>
            <Search size={16} style={{ position: "absolute", left: "12px", top: "11px", color: "var(--text-muted)" }} />
            <input type="text" value={query} onChange={e => setQuery(e.target.value)} onKeyDown={e => e.key === "Enter" && handleSearch(query)} placeholder="Query recruitment ontology..." className="form-input" style={{ paddingLeft: "38px" }} />
          </div>
          <button onClick={() => handleSearch(query)} className="btn-primary" style={{ padding: "0 18px" }}>Search</button>
        </div>
        <div style={{ display: "flex", flexWrap: "wrap", alignItems: "center", gap: "6px" }}>
          <span style={{ fontSize: "0.72rem", color: "var(--text-muted)" }}>Suggestions:</span>
          {sampleQueries.map((q, i) => (<button key={i} onClick={() => handleSearch(q)} style={{ background: "var(--bg-surface)", border: "1px solid var(--border-subtle)", borderRadius: "var(--radius-full)", padding: "2px 10px", fontSize: "0.72rem", color: "var(--text-secondary)", cursor: "pointer" }}>{q}</button>))}
        </div>
      </div>

      <div className="glass-card" style={{ marginBottom: "20px" }}>
        <div style={{ display: "flex", alignItems: "center", gap: "7px", marginBottom: "8px" }}>
          <Sparkles size={16} color="var(--purple)" />
          <h3 style={{ fontSize: "1.05rem" }}>Synthesized Response</h3>
          <span className="badge badge-violet">Hybrid Vector + Graph</span>
        </div>
        <p style={{ fontSize: "0.88rem", color: "var(--text-primary)", lineHeight: 1.7 }}>{searchResult.answer}</p>
      </div>

      <div className="grid-2">
        <div className="glass-card">
          <h3 style={{ fontSize: "1.05rem", marginBottom: "12px", display: "flex", alignItems: "center", gap: "7px" }}><GitBranch size={16} color="var(--green)" /> Matched Ontology Entities</h3>
          <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
            {searchResult.matchedOntology.map(n => (
              <div key={n.id} style={{ background: "var(--bg-surface)", padding: "12px", borderRadius: "var(--radius-md)", border: "1px solid var(--border-subtle)" }}>
                <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "4px" }}>
                  <strong style={{ fontSize: "0.92rem", color: "var(--green)" }}>{n.name}</strong>
                  <span className="badge badge-emerald">{n.avgSalaryImpact}</span>
                </div>
                <div style={{ fontSize: "0.72rem", color: "var(--text-muted)", marginBottom: "6px" }}>{n.category} · {n.marketDemand}</div>
                <p style={{ fontSize: "0.8rem", color: "var(--text-secondary)", marginBottom: "6px" }}>{n.description}</p>
                <div style={{ fontSize: "0.72rem", color: "var(--text-muted)" }}><strong>Prerequisites:</strong> {n.prerequisites.join(" → ")}</div>
              </div>
            ))}
          </div>
        </div>
        <div className="glass-card">
          <h3 style={{ fontSize: "1.05rem", marginBottom: "12px", display: "flex", alignItems: "center", gap: "7px" }}><BookOpen size={16} color="var(--primary)" /> Knowledge Documents</h3>
          <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
            {searchResult.results.map(d => (
              <div key={d.id} style={{ background: "var(--bg-surface)", padding: "12px", borderRadius: "var(--radius-md)", border: "1px solid var(--border-subtle)" }}>
                <div style={{ fontSize: "0.92rem", fontWeight: 600, color: "var(--text-primary)", marginBottom: "4px" }}>{d.title}</div>
                <div style={{ display: "flex", flexWrap: "wrap", gap: "4px", marginBottom: "6px" }}>
                  {d.tags.map((t, i) => <span key={i} className="badge badge-cyan" style={{ fontSize: "0.62rem", padding: "1px 6px" }}>{t}</span>)}
                </div>
                <p style={{ fontSize: "0.8rem", color: "var(--text-secondary)", lineHeight: 1.6, marginBottom: "6px" }}>{d.content}</p>
                <div style={{ fontSize: "0.7rem", color: "var(--primary)" }}>Citation: {d.citation}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
