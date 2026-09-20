import React, { useState } from "react";
import { Cpu, Sliders, Zap, RefreshCw } from "lucide-react";
import { calculateGnnMatch } from "../../utils/gnnSimulator";

export default function GnnEngineView({ candidate, job }) {
  const [architecture, setArchitecture] = useState("GraphSAGE");
  const [layers, setLayers] = useState(2);
  const [aggregator, setAggregator] = useState("mean");
  const [isUnseenNode, setIsUnseenNode] = useState(false);
  const [isInferring, setIsInferring] = useState(false);
  const matchResult = calculateGnnMatch(candidate, job, { architecture, layers, aggregator, isUnseenNode });

  return (
    <div className="animate-fade-in">
      <div style={{ marginBottom: "20px" }}>
        <h2 style={{ fontSize: "1.35rem", marginBottom: "6px" }}>Phase 1: Inductive GNN Model Training & Prediction</h2>
        <p style={{ fontSize: "0.88rem" }}>Executes Inductive GNN inference. The model predicts suitability for seen and unseen nodes without full graph retraining.</p>
      </div>

      <div className="grid-2" style={{ alignItems: "start" }}>
        <div className="glass-card">
          <h3 style={{ fontSize: "1.05rem", marginBottom: "14px", display: "flex", alignItems: "center", gap: "7px" }}><Sliders size={16} color="var(--primary)" /> Architecture Settings</h3>
          <div style={{ display: "flex", flexDirection: "column", gap: "14px" }}>
            <div>
              <label className="form-label">GNN Architecture</label>
              <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "8px" }}>
                {["GraphSAGE", "GCN", "GAT"].map(a => (
                  <button key={a} onClick={() => setArchitecture(a)} style={{
                    padding: "8px", borderRadius: "var(--radius-md)", fontSize: "0.82rem",
                    fontWeight: architecture === a ? 600 : 400,
                    background: architecture === a ? "var(--primary-light)" : "var(--bg-surface)",
                    color: architecture === a ? "var(--primary)" : "var(--text-secondary)",
                    border: architecture === a ? "1px solid var(--primary-border)" : "1px solid var(--border-subtle)", cursor: "pointer"
                  }}>{a} {a === "GraphSAGE" && "★"}</button>
                ))}
              </div>
              <span style={{ fontSize: "0.72rem", color: "var(--text-muted)", marginTop: "3px", display: "block" }}>*GraphSAGE is the paper's benchmark leader.</span>
            </div>
            <div>
              <label className="form-label">Neighborhood Aggregator</label>
              <select value={aggregator} onChange={e => setAggregator(e.target.value)} className="form-select">
                <option value="mean">Mean Aggregator (Optimal)</option>
                <option value="lstm">LSTM Aggregator</option>
                <option value="attention">Multi-Head Attention (GAT)</option>
              </select>
            </div>
            <div>
              <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "5px" }}>
                <label className="form-label" style={{ margin: 0 }}>Message Passing Depth</label>
                <span style={{ fontSize: "0.82rem", fontWeight: 700, color: "var(--primary)" }}>{layers}-Hop</span>
              </div>
              <input type="range" min="1" max="3" value={layers} onChange={e => setLayers(Number(e.target.value))} style={{ width: "100%", accentColor: "var(--primary)" }} />
              <div style={{ display: "flex", justifyContent: "space-between", fontSize: "0.72rem", color: "var(--text-muted)" }}>
                <span>1-Hop</span><span style={{ color: "var(--green)", fontWeight: 600 }}>2-Hop (Optimal 65.4%)</span><span>3-Hop (Over-smoothing)</span>
              </div>
            </div>
            <div style={{ background: "var(--bg-surface)", padding: "12px", borderRadius: "var(--radius-md)", border: "1px solid var(--border-subtle)" }}>
              <label style={{ display: "flex", alignItems: "center", justifyContent: "space-between", cursor: "pointer" }}>
                <div>
                  <div style={{ fontSize: "0.82rem", fontWeight: 600, color: "var(--text-primary)" }}>Inductive Testing Mode</div>
                  <div style={{ fontSize: "0.72rem", color: "var(--text-muted)" }}>Treat candidate as unseen node</div>
                </div>
                <input type="checkbox" checked={isUnseenNode} onChange={e => setIsUnseenNode(e.target.checked)} style={{ width: "18px", height: "18px", accentColor: "var(--primary)" }} />
              </label>
            </div>
            <button onClick={() => { setIsInferring(true); setTimeout(() => setIsInferring(false), 350); }} disabled={isInferring} className="btn-primary" style={{ width: "100%", padding: "12px" }}>
              {isInferring ? <RefreshCw size={15} /> : <Zap size={15} />}
              {isInferring ? "Computing..." : "Execute GNN Forward Pass"}
            </button>
          </div>
        </div>

        <div className="glass-card">
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "14px" }}>
            <h3 style={{ fontSize: "1.05rem", display: "flex", alignItems: "center", gap: "7px" }}><Cpu size={16} color="var(--purple)" /> Prediction Results</h3>
            <span className="badge badge-emerald">{isUnseenNode ? "Inductive (Unseen)" : "Graph-Aware"}</span>
          </div>

          <div style={{ background: "var(--primary-light)", padding: "18px", borderRadius: "var(--radius-lg)", border: "1px solid var(--primary-border)", textAlign: "center", marginBottom: "18px" }}>
            <div style={{ fontSize: "2.8rem", fontWeight: 800, color: "var(--primary)", lineHeight: 1 }}>{matchResult.matchScore}%</div>
            <div style={{ fontSize: "0.82rem", textTransform: "uppercase", color: "var(--text-muted)", marginTop: "5px" }}>Predicted Suitability</div>
            <div style={{ display: "flex", justifyContent: "center", gap: "18px", marginTop: "14px", paddingTop: "12px", borderTop: "1px solid var(--primary-border)", fontSize: "0.82rem" }}>
              <div><span style={{ color: "var(--text-muted)" }}>Skill: </span><strong style={{ color: "var(--green)" }}>{matchResult.skillScore}%</strong></div>
              <div><span style={{ color: "var(--text-muted)" }}>Experience: </span><strong style={{ color: "var(--amber)" }}>{matchResult.experienceScore}%</strong></div>
              <div><span style={{ color: "var(--text-muted)" }}>Domain: </span><strong style={{ color: "var(--purple)" }}>{matchResult.domainScore}%</strong></div>
            </div>
          </div>

          <h4 style={{ fontSize: "0.92rem", marginBottom: "10px", color: "var(--text-secondary)" }}>Forward Pass Trace ({architecture})</h4>
          {[
            { label: "Layer 0: Input Embeddings", right: "h_v^(0) ∈ ℝ^768", desc: "Dense Sentence-BERT representations initialized.", color: "var(--text-secondary)" },
            { label: "Layer 1: 1-Hop Aggregation", right: `${aggregator.toUpperCase()}`, desc: `Direct skills: ${matchResult.matchedSkills.map(s => s.name).slice(0, 3).join(", ") || "None"}`, color: "var(--primary)" },
            ...(layers >= 2 ? [{ label: "Layer 2: 2-Hop Propagation", right: "Co-occurrence", desc: "Structural propagation via transferable skill bridges.", color: "var(--purple)" }] : []),
            { label: "Readout: Link Prediction", right: "σ(W·[h_cand||h_job])", desc: `Suitability output: ${matchResult.matchScore}%`, color: "var(--green)" }
          ].map((step, i) => (
            <div key={i} style={{ background: "var(--bg-surface)", padding: "10px 12px", borderRadius: "var(--radius-md)", border: "1px solid var(--border-subtle)", fontSize: "0.8rem", marginBottom: "8px" }}>
              <div style={{ display: "flex", justifyContent: "space-between", color: "var(--text-muted)" }}><span>{step.label}</span><span>{step.right}</span></div>
              <div style={{ color: step.color, marginTop: "2px" }}>{step.desc}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
