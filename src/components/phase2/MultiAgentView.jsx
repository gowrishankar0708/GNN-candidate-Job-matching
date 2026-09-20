import React, { useState } from "react";
import { ShieldCheck, Sparkles, RefreshCw } from "lucide-react";
import { runMultiAgentEvaluation } from "../../utils/agentEngine";
import { calculateGnnMatch } from "../../utils/gnnSimulator";

export default function MultiAgentView({ candidate, job }) {
  const [isDebating, setIsDebating] = useState(false);
  const [activeTab, setActiveTab] = useState("agents");
  const gnnResult = calculateGnnMatch(candidate, job);
  const agentData = runMultiAgentEvaluation(candidate, job, gnnResult);

  return (
    <div className="animate-fade-in">
      <div style={{ marginBottom: "20px" }}>
        <h2 style={{ fontSize: "1.35rem", marginBottom: "6px" }}>Phase 2: Multi-Agent Recruitment & Explainability (XAI)</h2>
        <p style={{ fontSize: "0.88rem" }}>4 specialized agents evaluate and explain GNN predictions through subgraph attribution.</p>
      </div>

      <div style={{ display: "flex", gap: "8px", marginBottom: "18px" }}>
        <button onClick={() => setActiveTab("agents")} className={`tab-btn ${activeTab === "agents" ? "active active-phase2" : ""}`}><ShieldCheck size={14} /> 4 Agents & Consensus</button>
        <button onClick={() => setActiveTab("xai")} className={`tab-btn ${activeTab === "xai" ? "active active-phase2" : ""}`}><Sparkles size={14} /> XAI Attribution</button>
      </div>

      {activeTab === "agents" && (
        <div>
          <div className="glass-card" style={{ marginBottom: "20px" }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "10px" }}>
              <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                <span style={{ fontSize: "1.4rem" }}>🤝</span>
                <div>
                  <h3 style={{ fontSize: "1.1rem" }}>Multi-Agent Consensus</h3>
                  <p style={{ fontSize: "0.78rem", color: "var(--text-muted)" }}>Screener, Technical, Career Coach, Fairness Auditor</p>
                </div>
              </div>
              <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                <span className="badge badge-emerald" style={{ fontSize: "0.82rem", padding: "5px 12px" }}>{agentData.consensus.recommendation}</span>
                <button onClick={() => { setIsDebating(true); setTimeout(() => setIsDebating(false), 600); }} disabled={isDebating} className="btn-secondary" style={{ padding: "5px 10px", fontSize: "0.78rem" }}>
                  <RefreshCw size={13} /> {isDebating ? "Deliberating..." : "Re-run"}
                </button>
              </div>
            </div>
            <p style={{ fontSize: "0.88rem", color: "var(--text-secondary)", lineHeight: 1.6 }}>{agentData.consensus.summary}</p>
          </div>

          <div className="grid-2">
            {agentData.agents.map(a => (
              <div key={a.id} className="glass-card" style={{ borderLeft: `4px solid ${a.color}` }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "8px" }}>
                  <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                    <span style={{ fontSize: "1.3rem" }}>{a.avatar}</span>
                    <div>
                      <h4 style={{ fontSize: "0.95rem" }}>{a.name}</h4>
                      <div style={{ fontSize: "0.72rem", color: "var(--text-muted)", fontWeight: 500 }}>{a.role}</div>
                    </div>
                  </div>
                  <span className="badge" style={{ background: "var(--bg-surface)", border: "1px solid var(--border-subtle)" }}>{a.verdict}</span>
                </div>
                <p style={{ fontSize: "0.82rem", color: "var(--text-secondary)", lineHeight: 1.6, fontStyle: "italic" }}>"{a.statement}"</p>
                <div style={{ display: "flex", justifyContent: "space-between", marginTop: "12px", paddingTop: "10px", borderTop: "1px solid var(--border-subtle)", fontSize: "0.72rem", color: "var(--text-muted)" }}>
                  <span>Confidence: <strong style={{ color: "var(--text-primary)" }}>{a.confidence}%</strong></span>
                  <span style={{ color: "var(--green)" }}>✓ Complete</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {activeTab === "xai" && (
        <div className="glass-card">
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "14px" }}>
            <h3 style={{ fontSize: "1.05rem", display: "flex", alignItems: "center", gap: "7px" }}><Sparkles size={16} color="var(--primary)" /> GNN Feature Attribution</h3>
            <span className="badge badge-cyan">GNNExplainer</span>
          </div>
          <p style={{ fontSize: "0.82rem", color: "var(--text-secondary)", marginBottom: "18px" }}>
            Each bar shows how much a feature contributed to the match score ({gnnResult.matchScore}%):
          </p>
          <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
            {gnnResult.attributions.map((attr, i) => (
              <div key={i} style={{ background: "var(--bg-surface)", padding: "14px", borderRadius: "var(--radius-md)", border: "1px solid var(--border-subtle)" }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "8px" }}>
                  <div>
                    <strong style={{ fontSize: "0.92rem" }}>{attr.feature}</strong>
                    <div style={{ fontSize: "0.75rem", color: "var(--text-muted)" }}>{attr.description}</div>
                  </div>
                  <span className="badge" style={{ background: attr.impact === "positive" ? "var(--green-light)" : "var(--red-light)", color: attr.impact === "positive" ? "var(--green)" : "var(--red)", border: `1px solid ${attr.impact === "positive" ? 'var(--green-border)' : 'var(--red-border)'}` }}>
                    {attr.impact === "positive" ? "+ Positive" : "- Penalty"}
                  </span>
                </div>
                <div style={{ width: "100%", height: "6px", background: "var(--bg-surface-hover)", borderRadius: "var(--radius-full)", overflow: "hidden" }}>
                  <div style={{ width: `${attr.importance}%`, height: "100%", background: attr.impact === "positive" ? "var(--green)" : "var(--red)", borderRadius: "var(--radius-full)" }} />
                </div>
                <div style={{ display: "flex", justifyContent: "space-between", fontSize: "0.68rem", color: "var(--text-muted)", marginTop: "3px" }}>
                  <span>Weight: {attr.importance}%</span><span>Edge mask attribution</span>
                </div>
              </div>
            ))}
          </div>
          <div style={{ marginTop: "18px", padding: "12px", background: "var(--primary-light)", borderRadius: "var(--radius-md)", border: "1px solid var(--primary-border)", fontSize: "0.8rem", color: "var(--text-secondary)", lineHeight: 1.6 }}>
            ⚖️ <strong>Fairness:</strong> All attributions are based on skill topology and subgraph competence. No demographic signals influence GNN scoring.
          </div>
        </div>
      )}
    </div>
  );
}
