import React, { useState } from "react";
import { BarChart3, TrendingUp, AlertTriangle, Award, Users } from "lucide-react";
import { BENCHMARK_METRICS } from "../../data/benchmarkData";
import { CANDIDATES_DATA } from "../../data/candidatesData";
import { calculateGnnMatch } from "../../utils/gnnSimulator";

export default function BenchmarkView({ job, onSelectCandidate }) {
  const [tab, setTab] = useState("accuracy");
  const ranked = CANDIDATES_DATA.map(c => ({ candidate: c, ...calculateGnnMatch(c, job) })).sort((a, b) => b.matchScore - a.matchScore);

  return (
    <div className="animate-fade-in">
      <div style={{ marginBottom: "20px" }}>
        <h2 style={{ fontSize: "1.35rem", marginBottom: "6px" }}>Phase 1: Model Evaluation & Benchmark Results</h2>
        <p style={{ fontSize: "0.88rem" }}>Empirical results from the Springer 2025 paper verifying Inductive GNN performance under severe class imbalance.</p>
      </div>

      <div style={{ display: "flex", gap: "8px", marginBottom: "18px" }}>
        {[
          { key: "accuracy", icon: <BarChart3 size={14} />, label: "Balanced Accuracy" },
          { key: "minority", icon: <AlertTriangle size={14} />, label: "Minority Recall" },
          { key: "roc", icon: <TrendingUp size={14} />, label: "ROC-AUC Curves" },
          { key: "matrix", icon: <Award size={14} />, label: "Confusion Matrix" }
        ].map(t => (<button key={t.key} onClick={() => setTab(t.key)} className={`tab-btn ${tab === t.key ? "active active-phase1" : ""}`}>{t.icon} {t.label}</button>))}
      </div>

      <div className="grid-2" style={{ alignItems: "start" }}>
        <div className="glass-card">
          {tab === "accuracy" && (
            <div>
              <h3 style={{ fontSize: "1.05rem", marginBottom: "10px" }}>Balanced Accuracy Comparison</h3>
              <p style={{ fontSize: "0.82rem", color: "var(--text-secondary)", marginBottom: "16px" }}>Because 95% of applicants are rejected, balanced accuracy averages recall across both classes:</p>
              <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
                {BENCHMARK_METRICS.balancedAccuracy.map((m, i) => (
                  <div key={i}>
                    <div style={{ display: "flex", justifyContent: "space-between", fontSize: "0.82rem", marginBottom: "4px" }}>
                      <strong style={{ color: m.isOurModel ? "var(--primary)" : "var(--text-primary)" }}>{m.model}</strong>
                      <span style={{ fontWeight: 700, color: m.isOurModel ? "var(--primary)" : "var(--text-secondary)" }}>{m.score}%</span>
                    </div>
                    <div style={{ width: "100%", height: "8px", background: "var(--bg-surface-hover)", borderRadius: "var(--radius-full)", overflow: "hidden" }}>
                      <div style={{ width: `${m.score}%`, height: "100%", background: m.isOurModel ? "var(--primary)" : "#d1d5db", borderRadius: "var(--radius-full)" }} />
                    </div>
                  </div>
                ))}
              </div>
              <div style={{ marginTop: "18px", padding: "10px 12px", background: "var(--primary-light)", borderRadius: "var(--radius-md)", border: "1px solid var(--primary-border)", fontSize: "0.78rem", color: "var(--primary)" }}>
                💡 <strong>Finding:</strong> +10.4% absolute gain over MLP baseline.
              </div>
            </div>
          )}
          {tab === "minority" && (
            <div>
              <h3 style={{ fontSize: "1.05rem", marginBottom: "10px" }}>Minority Class Detection (5% Qualified)</h3>
              <div style={{ display: "flex", flexDirection: "column", gap: "14px" }}>
                {BENCHMARK_METRICS.minorityRecall.map((m, i) => (
                  <div key={i} style={{ background: "var(--bg-surface)", padding: "12px", borderRadius: "var(--radius-md)", border: "1px solid var(--border-subtle)" }}>
                    <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "5px" }}>
                      <strong style={{ color: m.isOurModel ? "var(--green)" : "var(--text-primary)" }}>{m.model}</strong>
                      <span style={{ fontSize: "1.1rem", fontWeight: 700, color: m.isOurModel ? "var(--green)" : "var(--red)" }}>{m.recall}%</span>
                    </div>
                    <div style={{ width: "100%", height: "6px", background: "var(--bg-surface-hover)", borderRadius: "var(--radius-full)", overflow: "hidden", marginBottom: "6px" }}>
                      <div style={{ width: `${m.recall}%`, height: "100%", background: m.isOurModel ? "var(--green)" : "#d1d5db", borderRadius: "var(--radius-full)" }} />
                    </div>
                    <p style={{ fontSize: "0.75rem", color: "var(--text-muted)" }}>{m.note}</p>
                  </div>
                ))}
              </div>
              <div style={{ marginTop: "16px", padding: "10px 12px", background: "var(--green-light)", borderRadius: "var(--radius-md)", border: "1px solid var(--green-border)", fontSize: "0.78rem", color: "var(--green)" }}>
                🚀 <strong>5.7x improvement</strong> in qualified candidate identification.
              </div>
            </div>
          )}
          {tab === "roc" && (
            <div>
              <h3 style={{ fontSize: "1.05rem", marginBottom: "10px" }}>ROC-AUC Trajectory</h3>
              <div style={{ background: "var(--bg-surface)", padding: "14px", borderRadius: "var(--radius-md)", border: "1px solid var(--border-subtle)" }}>
                <svg width="100%" height="220" viewBox="0 0 320 220">
                  <line x1="40" y1="20" x2="40" y2="180" stroke="#e5e7eb" />
                  <line x1="40" y1="180" x2="300" y2="180" stroke="#e5e7eb" />
                  <line x1="40" y1="180" x2="300" y2="20" stroke="#e5e7eb" strokeDasharray="3 3" />
                  <path d={`M 40 180 ${BENCHMARK_METRICS.rocCurves.gnn.map(p => `L ${40 + p.fpr * 260} ${180 - p.tpr * 160}`).join(" ")}`} fill="none" stroke="var(--primary)" strokeWidth="3" />
                  <path d={`M 40 180 ${BENCHMARK_METRICS.rocCurves.mlp.map(p => `L ${40 + p.fpr * 260} ${180 - p.tpr * 160}`).join(" ")}`} fill="none" stroke="var(--purple)" strokeWidth="2" strokeDasharray="4 2" />
                  <path d={`M 40 180 ${BENCHMARK_METRICS.rocCurves.cosine.map(p => `L ${40 + p.fpr * 260} ${180 - p.tpr * 160}`).join(" ")}`} fill="none" stroke="#9ca3af" strokeWidth="1.5" strokeDasharray="2 2" />
                </svg>
                <div style={{ display: "flex", justifyContent: "center", gap: "14px", fontSize: "0.72rem", marginTop: "8px" }}>
                  <span style={{ color: "var(--primary)" }}>● GNN (AUC: 0.784)</span>
                  <span style={{ color: "var(--purple)" }}>-- MLP (AUC: 0.621)</span>
                  <span style={{ color: "var(--text-muted)" }}>·· Cosine (AUC: 0.548)</span>
                </div>
              </div>
            </div>
          )}
          {tab === "matrix" && (
            <div>
              <h3 style={{ fontSize: "1.05rem", marginBottom: "10px" }}>Confusion Matrix (1,000 Samples)</h3>
              <p style={{ fontSize: "0.82rem", color: "var(--text-secondary)", marginBottom: "14px" }}>950 Rejected vs 50 Qualified:</p>
              <div className="grid-2" style={{ gap: "10px" }}>
                {[
                  { label: "Inductive GNN", color: "var(--primary)", data: BENCHMARK_METRICS.confusionMatrixData.gnn },
                  { label: "MLP Baseline", color: "var(--purple)", data: BENCHMARK_METRICS.confusionMatrixData.mlp }
                ].map((m, i) => (
                  <div key={i} style={{ background: "var(--bg-surface)", padding: "12px", borderRadius: "var(--radius-md)", border: "1px solid var(--border-subtle)" }}>
                    <div style={{ fontWeight: 600, color: m.color, fontSize: "0.85rem", marginBottom: "8px" }}>{m.label}</div>
                    <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "5px", textAlign: "center", fontSize: "0.78rem" }}>
                      {[
                        { label: "TP", val: `${m.data.truePositives}/50`, bg: "var(--green-light)" },
                        { label: "FP", val: m.data.falsePositives, bg: "var(--red-light)" },
                        { label: "FN", val: m.data.falseNegatives, bg: "var(--red-light)" },
                        { label: "TN", val: `${m.data.trueNegatives}/950`, bg: "var(--green-light)" }
                      ].map((c, j) => (
                        <div key={j} style={{ background: c.bg, padding: "6px", borderRadius: "4px" }}>
                          <div style={{ color: "var(--text-muted)", fontSize: "0.68rem" }}>{c.label}</div>
                          <div style={{ fontSize: "1rem", fontWeight: 700 }}>{c.val}</div>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        <div className="glass-card">
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "12px" }}>
            <h3 style={{ fontSize: "1.05rem", display: "flex", alignItems: "center", gap: "7px" }}><Users size={16} color="var(--primary)" /> Candidate Leaderboard</h3>
            <span className="badge badge-violet">{job.company}</span>
          </div>
          <p style={{ fontSize: "0.8rem", color: "var(--text-secondary)", marginBottom: "12px" }}>Ranked for <strong>{job.title}</strong>:</p>
          <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
            {ranked.map((item, idx) => (
              <div key={item.candidate.id} onClick={() => onSelectCandidate && onSelectCandidate(item.candidate)}
                style={{ background: "var(--bg-surface)", padding: "10px 12px", borderRadius: "var(--radius-md)", border: "1px solid var(--border-subtle)", display: "flex", alignItems: "center", justifyContent: "space-between", cursor: "pointer" }}
                className="glass-card-interactive">
                <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                  <span style={{ width: "22px", height: "22px", borderRadius: "50%", background: idx === 0 ? "var(--primary)" : "var(--bg-surface-hover)", color: idx === 0 ? "white" : "var(--text-secondary)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "0.72rem", fontWeight: 700 }}>{idx + 1}</span>
                  <img src={item.candidate.avatar} alt="" style={{ width: "30px", height: "30px", borderRadius: "50%", objectFit: "cover" }} />
                  <div>
                    <div style={{ fontSize: "0.85rem", fontWeight: 600 }}>{item.candidate.name}</div>
                    <div style={{ fontSize: "0.72rem", color: "var(--text-muted)" }}>{item.candidate.currentTitle}</div>
                  </div>
                </div>
                <div style={{ textAlign: "right" }}>
                  <div style={{ fontSize: "1rem", fontWeight: 700, color: "var(--primary)" }}>{item.matchScore}%</div>
                  <div style={{ fontSize: "0.68rem", color: "var(--text-muted)" }}>GNN Score</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
