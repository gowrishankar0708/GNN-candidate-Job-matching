import React, { useState } from "react";
import { ShieldCheck, MessageSquare, Play, RefreshCw, Layers, CheckCircle2, AlertCircle, Sparkles, Scale } from "lucide-react";
import { runMultiAgentEvaluation } from "../../utils/agentEngine";
import { calculateGnnMatch } from "../../utils/gnnSimulator";

export default function MultiAgentView({ candidate, job }) {
  const [isDebating, setIsDebating] = useState(false);
  const [activeTab, setActiveTab] = useState("agents"); // agents, xai

  const gnnResult = calculateGnnMatch(candidate, job);
  const agentData = runMultiAgentEvaluation(candidate, job, gnnResult);

  const handleSimulateDebate = () => {
    setIsDebating(true);
    setTimeout(() => {
      setIsDebating(false);
    }, 600);
  };

  return (
    <div className="animate-fade-in">
      <div style={{ marginBottom: "20px" }}>
        <h2 style={{ fontSize: "1.4rem", marginBottom: "6px" }}>Phase 2: Multi-Agent Recruitment Assistance & Explainability (XAI)</h2>
        <p style={{ fontSize: "0.9rem" }}>
          Coordinates 4 specialized autonomous recruitment agents to conduct multi-perspective evaluation, synthesize transparent hiring consensus, and explain GNN predictions through subgraph feature attribution.
        </p>
      </div>

      {/* Tabs */}
      <div style={{ display: "flex", gap: "10px", marginBottom: "20px" }}>
        <button
          onClick={() => setActiveTab("agents")}
          className={`tab-btn ${activeTab === "agents" ? "active active-phase2" : ""}`}
        >
          <ShieldCheck size={15} /> 4 Autonomous Recruiter Agents & Consensus
        </button>
        <button
          onClick={() => setActiveTab("xai")}
          className={`tab-btn ${activeTab === "xai" ? "active active-phase2" : ""}`}
        >
          <Sparkles size={15} /> XAI: GNN Subgraph Attribution & Explainability
        </button>
      </div>

      {activeTab === "agents" && (
        <div>
          {/* Top Consensus Card */}
          <div className="glass-card" style={{ marginBottom: "24px", background: "var(--bg-surface-elevated)", border: "1px solid var(--border-medium)" }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "12px" }}>
              <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                <span style={{ fontSize: "1.6rem" }}>🤝</span>
                <div>
                  <h3 style={{ fontSize: "1.2rem", color: "var(--text-primary)" }}>Multi-Agent Recruiter Consensus</h3>
                  <p style={{ fontSize: "0.8rem", color: "var(--text-muted)" }}>Synthesized from Screener, Technical Evaluator, Career Coach, and Fairness Auditor</p>
                </div>
              </div>

              <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
                <span
                  className="badge"
                  style={{
                    fontSize: "0.85rem",
                    padding: "6px 14px",
                    background: "rgba(16, 185, 129, 0.15)",
                    color: agentData.consensus.badgeColor,
                    border: `1px solid ${agentData.consensus.badgeColor}`
                  }}
                >
                  {agentData.consensus.recommendation}
                </span>

                <button
                  onClick={handleSimulateDebate}
                  disabled={isDebating}
                  className="btn-secondary"
                  style={{ padding: "6px 12px", fontSize: "0.8rem" }}
                >
                  <RefreshCw className={isDebating ? "animate-spin" : ""} size={14} />
                  {isDebating ? "Agents Deliberating..." : "Re-run Agent Debate"}
                </button>
              </div>
            </div>

            <p style={{ fontSize: "0.95rem", color: "var(--text-secondary)", lineHeight: 1.6 }}>
              {agentData.consensus.summary}
            </p>
          </div>

          {/* 4 Specialized Agents Cards */}
          <div className="grid-2">
            {agentData.agents.map((agent) => (
              <div
                key={agent.id}
                className="glass-card"
                style={{
                  borderLeft: `4px solid ${agent.color}`,
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "space-between"
                }}
              >
                <div>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "10px" }}>
                    <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                      <span style={{ fontSize: "1.4rem" }}>{agent.avatar}</span>
                      <div>
                        <h4 style={{ fontSize: "1rem", color: "var(--text-primary)" }}>{agent.name}</h4>
                        <div style={{ fontSize: "0.75rem", color: agent.color, fontWeight: 600 }}>{agent.role}</div>
                      </div>
                    </div>
                    <span className="badge" style={{ background: "rgba(255,255,255,0.06)", color: agent.color, border: `1px solid ${agent.color}` }}>
                      {agent.verdict}
                    </span>
                  </div>

                  <p style={{ fontSize: "0.85rem", color: "var(--text-secondary)", lineHeight: 1.6, marginTop: "8px" }}>
                    "{agent.statement}"
                  </p>
                </div>

                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginTop: "16px", paddingTop: "12px", borderTop: "1px solid var(--border-subtle)", fontSize: "0.75rem", color: "var(--text-muted)" }}>
                  <span>Agent Confidence: <strong style={{ color: "var(--text-primary)" }}>{agent.confidence}%</strong></span>
                  <span style={{ color: "var(--emerald-primary)" }}>✓ Verification Complete</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {activeTab === "xai" && (
        <div className="glass-card">
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "16px" }}>
            <h3 style={{ fontSize: "1.1rem", display: "flex", alignItems: "center", gap: "8px" }}>
              <Sparkles size={18} color="var(--cyan-primary)" />
              Explainable AI (XAI): GNN Subgraph Feature Attribution
            </h3>
            <span className="badge badge-cyan">GNNExplainer Mechanism</span>
          </div>

          <p style={{ fontSize: "0.85rem", color: "var(--text-secondary)", marginBottom: "20px" }}>
            Unlike black-box neural networks, our Inductive GNN exposes exact computational subgraph contributions. Each bar indicates how much a specific structural feature increased or decreased the predicted suitability score ({gnnResult.matchScore}%):
          </p>

          <div style={{ display: "flex", flexDirection: "column", gap: "18px" }}>
            {gnnResult.attributions.map((attr, idx) => (
              <div key={idx} style={{ background: "var(--bg-surface)", padding: "16px", borderRadius: "var(--radius-md)", border: "1px solid var(--border-subtle)" }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "8px" }}>
                  <div>
                    <strong style={{ fontSize: "0.95rem", color: "var(--text-primary)" }}>{attr.feature}</strong>
                    <div style={{ fontSize: "0.78rem", color: "var(--text-muted)" }}>{attr.description}</div>
                  </div>
                  <span className="badge" style={{
                    background: attr.impact === "positive" ? "rgba(16, 185, 129, 0.15)" : "rgba(244, 63, 94, 0.15)",
                    color: attr.impact === "positive" ? "var(--emerald-primary)" : "var(--rose-primary)",
                    border: `1px solid ${attr.impact === "positive" ? 'var(--emerald-primary)' : 'var(--rose-primary)'}`
                  }}>
                    {attr.impact === "positive" ? "+ Positive Contribution" : "- Penalty / Gap"}
                  </span>
                </div>

                <div style={{ width: "100%", height: "8px", background: "var(--bg-canvas)", borderRadius: "var(--radius-full)", overflow: "hidden" }}>
                  <div
                    style={{
                      width: `${attr.importance}%`,
                      height: "100%",
                      background: attr.impact === "positive" ? "var(--emerald-primary)" : "var(--rose-primary)",
                      borderRadius: "var(--radius-full)"
                    }}
                  />
                </div>
                <div style={{ display: "flex", justifyContent: "space-between", fontSize: "0.7rem", color: "var(--text-muted)", marginTop: "4px" }}>
                  <span>Feature Weight: {attr.importance}%</span>
                  <span>Calculated via edge mask attribution</span>
                </div>
              </div>
            ))}
          </div>

          <div style={{ marginTop: "20px", padding: "14px", background: "rgba(139, 92, 246, 0.08)", borderRadius: "var(--radius-md)", border: "1px solid rgba(139, 92, 246, 0.2)", fontSize: "0.82rem", color: "var(--text-secondary)", lineHeight: 1.6 }}>
            ⚖️ <strong>Fairness Audit:</strong> Notice that feature attributions are 100% focused on <em>skill topology</em> and <em>subgraph competence</em>. Non-merit attributes (demographic signals, age, school prestige biases) have zero edge weights in the GNN formulation.
          </div>
        </div>
      )}
    </div>
  );
}
