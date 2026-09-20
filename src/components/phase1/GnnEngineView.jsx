import React, { useState } from "react";
import { Cpu, Play, CheckCircle, Sliders, RefreshCw, Zap, Layers, AlertCircle } from "lucide-react";
import { calculateGnnMatch } from "../../utils/gnnSimulator";

export default function GnnEngineView({ candidate, job }) {
  const [architecture, setArchitecture] = useState("GraphSAGE");
  const [layers, setLayers] = useState(2);
  const [aggregator, setAggregator] = useState("mean");
  const [isUnseenNode, setIsUnseenNode] = useState(false);
  const [isInferring, setIsInferring] = useState(false);

  const matchResult = calculateGnnMatch(candidate, job, {
    architecture,
    layers,
    aggregator,
    isUnseenNode
  });

  const handleRunInference = () => {
    setIsInferring(true);
    setTimeout(() => {
      setIsInferring(false);
    }, 350);
  };

  return (
    <div className="animate-fade-in">
      <div style={{ marginBottom: "20px" }}>
        <h2 style={{ fontSize: "1.4rem", marginBottom: "6px" }}>Phase 1: Inductive GNN Model Training & Prediction</h2>
        <p style={{ fontSize: "0.9rem" }}>
          Executes Inductive Graph Neural Network inference across the candidate-job bipartite graph. By learning aggregator functions over local subgraphs, the model predicts suitability for seen and unseen nodes without full graph retraining.
        </p>
      </div>

      <div className="grid-2" style={{ alignItems: "start" }}>
        {/* Left: Hyperparameters & Inductive Controls */}
        <div className="glass-card">
          <h3 style={{ fontSize: "1.1rem", marginBottom: "16px", display: "flex", alignItems: "center", gap: "8px" }}>
            <Sliders size={18} color="var(--cyan-primary)" />
            GNN Architecture & Inductive Settings
          </h3>

          <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
            {/* Architecture Selector */}
            <div>
              <label className="form-label">GNN Convolution Architecture</label>
              <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "8px" }}>
                {["GraphSAGE", "GCN", "GAT"].map(arch => (
                  <button
                    key={arch}
                    onClick={() => setArchitecture(arch)}
                    style={{
                      padding: "8px",
                      borderRadius: "var(--radius-md)",
                      fontSize: "0.85rem",
                      fontWeight: architecture === arch ? 600 : 400,
                      background: architecture === arch ? "rgba(6, 182, 212, 0.2)" : "var(--bg-surface)",
                      color: architecture === arch ? "var(--cyan-primary)" : "var(--text-secondary)",
                      border: architecture === arch ? "1px solid var(--cyan-primary)" : "1px solid var(--border-subtle)",
                      cursor: "pointer"
                    }}
                  >
                    {arch} {arch === "GraphSAGE" && "★"}
                  </button>
                ))}
              </div>
              <span style={{ fontSize: "0.75rem", color: "var(--text-muted)", marginTop: "4px", display: "block" }}>
                *GraphSAGE is the paper's benchmark leader for inductive candidate-job matching.
              </span>
            </div>

            {/* Aggregator Function */}
            <div>
              <label className="form-label">Neighborhood Aggregator</label>
              <select
                value={aggregator}
                onChange={e => setAggregator(e.target.value)}
                className="form-select"
              >
                <option value="mean">Mean Aggregator (Optimal Speed & Accuracy)</option>
                <option value="lstm">LSTM Aggregator (Sequential Expressiveness)</option>
                <option value="attention">Multi-Head Attention (GAT Weights)</option>
              </select>
            </div>

            {/* Number of Message Passing Layers (Hops) */}
            <div>
              <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "6px" }}>
                <label className="form-label" style={{ margin: 0 }}>Message Passing Depth (Layers / Hops)</label>
                <span style={{ fontSize: "0.85rem", fontWeight: 700, color: "var(--cyan-primary)" }}>{layers}-Hop</span>
              </div>
              <input
                type="range"
                min="1"
                max="3"
                value={layers}
                onChange={e => setLayers(Number(e.target.value))}
                style={{ width: "100%", accentColor: "var(--cyan-primary)" }}
              />
              <div style={{ display: "flex", justifyContent: "space-between", fontSize: "0.75rem", color: "var(--text-muted)" }}>
                <span>1-Hop (Direct Skills)</span>
                <span style={{ color: "var(--emerald-primary)", fontWeight: 600 }}>2-Hop (Paper Optimal 65.4%)</span>
                <span>3-Hop (Over-smoothing)</span>
              </div>
            </div>

            {/* Inductive Mode Toggle */}
            <div style={{ background: "var(--bg-surface)", padding: "14px", borderRadius: "var(--radius-md)", border: "1px solid var(--border-subtle)" }}>
              <label style={{ display: "flex", alignItems: "center", justifyContent: "space-between", cursor: "pointer" }}>
                <div>
                  <div style={{ fontSize: "0.85rem", fontWeight: 600, color: "var(--text-primary)" }}>
                    Inductive Testing Mode
                  </div>
                  <div style={{ fontSize: "0.75rem", color: "var(--text-muted)" }}>
                    Treat current candidate as brand-new unseen node without retraining
                  </div>
                </div>
                <input
                  type="checkbox"
                  checked={isUnseenNode}
                  onChange={e => setIsUnseenNode(e.target.checked)}
                  style={{ width: "18px", height: "18px", accentColor: "var(--cyan-primary)" }}
                />
              </label>
            </div>

            {/* Trigger Button */}
            <button
              onClick={handleRunInference}
              disabled={isInferring}
              className="btn-primary"
              style={{ width: "100%", padding: "12px" }}
            >
              {isInferring ? <RefreshCw className="animate-spin" size={16} /> : <Zap size={16} />}
              {isInferring ? "Computing Message Passing..." : "Execute Inductive GNN Forward Pass"}
            </button>
          </div>
        </div>

        {/* Right: Live Prediction Output & Aggregation Trace */}
        <div className="glass-card">
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "16px" }}>
            <h3 style={{ fontSize: "1.1rem", display: "flex", alignItems: "center", gap: "8px" }}>
              <Cpu size={18} color="var(--violet-primary)" />
              Inductive Prediction & Link Probability
            </h3>
            <span className="badge badge-emerald">
              {isUnseenNode ? "Inductive (Unseen Node)" : "Transductive / Graph-Aware"}
            </span>
          </div>

          {/* Main Score Display */}
          <div style={{ background: "var(--bg-surface)", padding: "20px", borderRadius: "var(--radius-lg)", border: "1px solid var(--border-medium)", textAlign: "center", marginBottom: "20px" }}>
            <div style={{ fontSize: "3rem", fontWeight: 800, color: "var(--cyan-primary)", lineHeight: 1 }}>
              {matchResult.matchScore}%
            </div>
            <div style={{ fontSize: "0.85rem", textTransform: "uppercase", color: "var(--text-muted)", marginTop: "6px", letterSpacing: "0.05em" }}>
              Predicted Candidate-Job Suitability Probability
            </div>

            <div style={{ display: "flex", justifyContent: "center", gap: "20px", marginTop: "16px", paddingTop: "14px", borderTop: "1px solid var(--border-subtle)", fontSize: "0.85rem" }}>
              <div>
                <span style={{ color: "var(--text-muted)" }}>Skill Overlap: </span>
                <strong style={{ color: "var(--emerald-primary)" }}>{matchResult.skillScore}%</strong>
              </div>
              <div>
                <span style={{ color: "var(--text-muted)" }}>Experience Fit: </span>
                <strong style={{ color: "var(--amber-primary)" }}>{matchResult.experienceScore}%</strong>
              </div>
              <div>
                <span style={{ color: "var(--text-muted)" }}>Domain Match: </span>
                <strong style={{ color: "var(--violet-primary)" }}>{matchResult.domainScore}%</strong>
              </div>
            </div>
          </div>

          {/* Forward Pass Trace (Layers) */}
          <h4 style={{ fontSize: "0.95rem", marginBottom: "12px", color: "var(--text-secondary)" }}>
            Computational Forward Pass Trace ({architecture})
          </h4>
          <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
            <div style={{ background: "var(--bg-canvas)", padding: "10px 14px", borderRadius: "var(--radius-md)", border: "1px solid var(--border-subtle)", fontSize: "0.82rem" }}>
              <div style={{ display: "flex", justifyContent: "space-between", color: "var(--text-muted)" }}>
                <span>Layer 0: Input Embeddings</span>
                <span>h_v^(0) ∈ ℝ^768</span>
              </div>
              <div style={{ color: "var(--text-primary)", marginTop: "2px" }}>
                Dense Sentence-BERT token representations initialized for candidate and job entities.
              </div>
            </div>

            <div style={{ background: "var(--bg-canvas)", padding: "10px 14px", borderRadius: "var(--radius-md)", border: "1px solid var(--border-subtle)", fontSize: "0.82rem" }}>
              <div style={{ display: "flex", justifyContent: "space-between", color: "var(--text-muted)" }}>
                <span>Layer 1: 1-Hop Neighbor Aggregation</span>
                <span>{aggregator.toUpperCase()} Aggregation</span>
              </div>
              <div style={{ color: "var(--cyan-primary)", marginTop: "2px" }}>
                Direct skill entities aggregated: {matchResult.matchedSkills.map(s => s.name).slice(0, 3).join(", ") || "None"}
              </div>
            </div>

            {layers >= 2 && (
              <div style={{ background: "var(--bg-canvas)", padding: "10px 14px", borderRadius: "var(--radius-md)", border: "1px solid var(--border-subtle)", fontSize: "0.82rem" }}>
                <div style={{ display: "flex", justifyContent: "space-between", color: "var(--text-muted)" }}>
                  <span>Layer 2: 2-Hop Relational Propagation</span>
                  <span>Co-occurrence Mapping</span>
                </div>
                <div style={{ color: "var(--violet-primary)", marginTop: "2px" }}>
                  Structural propagation incorporates adjacent roles and transferable skill bridges.
                </div>
              </div>
            )}

            <div style={{ background: "var(--bg-canvas)", padding: "10px 14px", borderRadius: "var(--radius-md)", border: "1px solid var(--border-subtle)", fontSize: "0.82rem" }}>
              <div style={{ display: "flex", justifyContent: "space-between", color: "var(--text-muted)" }}>
                <span>Readout: Link Prediction Head</span>
                <span>σ(W · [h_cand || h_job])</span>
              </div>
              <div style={{ color: "var(--emerald-primary)", fontWeight: 600, marginTop: "2px" }}>
                Binary suitability classification output: {matchResult.matchScore}%
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
