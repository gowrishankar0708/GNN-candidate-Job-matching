import React, { useState } from "react";
import { BarChart3, TrendingUp, AlertTriangle, CheckCircle2, Award, Users } from "lucide-react";
import { BENCHMARK_METRICS } from "../../data/benchmarkData";
import { CANDIDATES_DATA } from "../../data/candidatesData";
import { calculateGnnMatch } from "../../utils/gnnSimulator";

export default function BenchmarkView({ job, onSelectCandidate }) {
  const [activeMetricTab, setActiveMetricTab] = useState("accuracy"); // accuracy, minority, roc, matrix

  // Calculate matching leaderboard for all candidates against current job
  const rankedCandidates = CANDIDATES_DATA.map(c => {
    const res = calculateGnnMatch(c, job);
    return {
      candidate: c,
      ...res
    };
  }).sort((a, b) => b.matchScore - a.matchScore);

  return (
    <div className="animate-fade-in">
      <div style={{ marginBottom: "20px" }}>
        <h2 style={{ fontSize: "1.4rem", marginBottom: "6px" }}>Phase 1: Model Evaluation & Benchmark Results</h2>
        <p style={{ fontSize: "0.9rem" }}>
          Empirical evaluation results from the Springer 2025 paper verifying Inductive GNN performance against standard machine learning baselines under severe recruitment class imbalance.
        </p>
      </div>

      {/* Metric Selector Tabs */}
      <div style={{ display: "flex", gap: "10px", marginBottom: "20px" }}>
        <button
          onClick={() => setActiveMetricTab("accuracy")}
          className={`tab-btn ${activeMetricTab === "accuracy" ? "active active-phase1" : ""}`}
        >
          <BarChart3 size={15} /> Balanced Accuracy (65.4% vs 55.0%)
        </button>
        <button
          onClick={() => setActiveMetricTab("minority")}
          className={`tab-btn ${activeMetricTab === "minority" ? "active active-phase1" : ""}`}
        >
          <AlertTriangle size={15} /> 95% Rejection Skew & Minority Recall
        </button>
        <button
          onClick={() => setActiveMetricTab("roc")}
          className={`tab-btn ${activeMetricTab === "roc" ? "active active-phase1" : ""}`}
        >
          <TrendingUp size={15} /> ROC-AUC Curves
        </button>
        <button
          onClick={() => setActiveMetricTab("matrix")}
          className={`tab-btn ${activeMetricTab === "matrix" ? "active active-phase1" : ""}`}
        >
          <Award size={15} /> Confusion Matrix (GNN vs MLP)
        </button>
      </div>

      {/* Main Benchmark Display */}
      <div className="grid-2" style={{ marginBottom: "24px", alignItems: "start" }}>
        {/* Left: Tab Content */}
        <div className="glass-card">
          {activeMetricTab === "accuracy" && (
            <div>
              <h3 style={{ fontSize: "1.1rem", marginBottom: "12px" }}>Balanced Accuracy Across Models</h3>
              <p style={{ fontSize: "0.85rem", color: "var(--text-secondary)", marginBottom: "18px" }}>
                Because 95% of job applicants are rejected, standard accuracy is misleading. Balanced accuracy averages recall across both classes:
              </p>

              <div style={{ display: "flex", flexDirection: "column", gap: "14px" }}>
                {BENCHMARK_METRICS.balancedAccuracy.map((item, idx) => (
                  <div key={idx}>
                    <div style={{ display: "flex", justifyContent: "space-between", fontSize: "0.85rem", marginBottom: "4px" }}>
                      <strong style={{ color: item.isOurModel ? "var(--cyan-primary)" : "var(--text-primary)" }}>
                        {item.model}
                      </strong>
                      <span style={{ fontWeight: 700, color: item.isOurModel ? "var(--cyan-primary)" : "var(--text-secondary)" }}>
                        {item.score}%
                      </span>
                    </div>
                    <div style={{ width: "100%", height: "10px", background: "var(--bg-canvas)", borderRadius: "var(--radius-full)", overflow: "hidden" }}>
                      <div
                        style={{
                          width: `${item.score}%`,
                          height: "100%",
                          background: item.isOurModel
                            ? "linear-gradient(90deg, var(--cyan-primary), var(--violet-primary))"
                            : item.color,
                          borderRadius: "var(--radius-full)"
                        }}
                      />
                    </div>
                  </div>
                ))}
              </div>

              <div style={{ marginTop: "20px", padding: "12px", background: "rgba(6, 182, 212, 0.08)", borderRadius: "var(--radius-md)", border: "1px solid rgba(6, 182, 212, 0.2)", fontSize: "0.8rem", color: "var(--cyan-primary)" }}>
                💡 <strong>Key Paper Finding:</strong> The Inductive GNN delivers a <strong>+10.4% absolute gain</strong> in balanced accuracy over the MLP baseline, demonstrating that graph relational modeling is essential for recruitment.
              </div>
            </div>
          )}

          {activeMetricTab === "minority" && (
            <div>
              <h3 style={{ fontSize: "1.1rem", marginBottom: "12px" }}>Minority Class (Qualified Candidates) Detection</h3>
              <p style={{ fontSize: "0.85rem", color: "var(--text-secondary)", marginBottom: "18px" }}>
                In real-world HR, only ~5% of applicants are qualified. Standard neural networks collapse to predicting the majority negative class:
              </p>

              <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
                {BENCHMARK_METRICS.minorityRecall.map((item, idx) => (
                  <div key={idx} style={{ background: "var(--bg-surface)", padding: "14px", borderRadius: "var(--radius-md)", border: "1px solid var(--border-subtle)" }}>
                    <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "6px" }}>
                      <strong style={{ color: item.isOurModel ? "var(--emerald-primary)" : "var(--text-primary)" }}>
                        {item.model}
                      </strong>
                      <span style={{ fontSize: "1.2rem", fontWeight: 700, color: item.color }}>
                        {item.recall}% Recall
                      </span>
                    </div>
                    <div style={{ width: "100%", height: "8px", background: "var(--bg-canvas)", borderRadius: "var(--radius-full)", overflow: "hidden", marginBottom: "8px" }}>
                      <div style={{ width: `${item.recall}%`, height: "100%", background: item.color, borderRadius: "var(--radius-full)" }} />
                    </div>
                    <p style={{ fontSize: "0.78rem", color: "var(--text-muted)" }}>{item.note}</p>
                  </div>
                ))}
              </div>

              <div style={{ marginTop: "18px", padding: "12px", background: "rgba(16, 185, 129, 0.08)", borderRadius: "var(--radius-md)", border: "1px solid rgba(16, 185, 129, 0.2)", fontSize: "0.8rem", color: "var(--emerald-primary)" }}>
                🚀 <strong>5.7x Improvement:</strong> The GNN captures 48.9% of qualified hires compared to just 8.5% for MLP, virtually eliminating candidate screening blindness.
              </div>
            </div>
          )}

          {activeMetricTab === "roc" && (
            <div>
              <h3 style={{ fontSize: "1.1rem", marginBottom: "12px" }}>ROC-AUC Trajectory</h3>
              <p style={{ fontSize: "0.85rem", color: "var(--text-secondary)", marginBottom: "14px" }}>
                True Positive Rate vs False Positive Rate across classification thresholds:
              </p>

              <div style={{ background: "var(--bg-canvas)", padding: "16px", borderRadius: "var(--radius-md)", border: "1px solid var(--border-subtle)" }}>
                <svg width="100%" height="240" viewBox="0 0 320 220">
                  {/* Grid Lines */}
                  <line x1="40" y1="20" x2="40" y2="180" stroke="rgba(255,255,255,0.1)" />
                  <line x1="40" y1="180" x2="300" y2="180" stroke="rgba(255,255,255,0.1)" />
                  {/* Diagonal random baseline */}
                  <line x1="40" y1="180" x2="300" y2="20" stroke="rgba(255,255,255,0.15)" strokeDasharray="3 3" />

                  {/* GNN Curve */}
                  <path
                    d={`M 40 180 ${BENCHMARK_METRICS.rocCurves.gnn.map(p => `L ${40 + p.fpr * 260} ${180 - p.tpr * 160}`).join(" ")}`}
                    fill="none"
                    stroke="var(--cyan-primary)"
                    strokeWidth="3"
                  />

                  {/* MLP Curve */}
                  <path
                    d={`M 40 180 ${BENCHMARK_METRICS.rocCurves.mlp.map(p => `L ${40 + p.fpr * 260} ${180 - p.tpr * 160}`).join(" ")}`}
                    fill="none"
                    stroke="var(--violet-primary)"
                    strokeWidth="2"
                    strokeDasharray="4 2"
                  />

                  {/* Cosine Curve */}
                  <path
                    d={`M 40 180 ${BENCHMARK_METRICS.rocCurves.cosine.map(p => `L ${40 + p.fpr * 260} ${180 - p.tpr * 160}`).join(" ")}`}
                    fill="none"
                    stroke="var(--text-muted)"
                    strokeWidth="1.5"
                    strokeDasharray="2 2"
                  />
                </svg>

                <div style={{ display: "flex", justifyContent: "center", gap: "16px", fontSize: "0.75rem", marginTop: "10px" }}>
                  <span style={{ color: "var(--cyan-primary)" }}>● Inductive GNN (AUC: 0.784)</span>
                  <span style={{ color: "var(--violet-primary)" }}>-- MLP Baseline (AUC: 0.621)</span>
                  <span style={{ color: "var(--text-muted)" }}>·· Cosine Sim (AUC: 0.548)</span>
                </div>
              </div>
            </div>
          )}

          {activeMetricTab === "matrix" && (
            <div>
              <h3 style={{ fontSize: "1.1rem", marginBottom: "12px" }}>Confusion Matrix (1,000 Applicant Sample)</h3>
              <p style={{ fontSize: "0.85rem", color: "var(--text-secondary)", marginBottom: "16px" }}>
                Evaluating under realistic 950 Rejected vs 50 Qualified Candidates:
              </p>

              <div className="grid-2" style={{ gap: "12px" }}>
                {/* GNN Matrix */}
                <div style={{ background: "var(--bg-surface)", padding: "14px", borderRadius: "var(--radius-md)", border: "1px solid var(--border-medium)" }}>
                  <div style={{ fontWeight: 600, color: "var(--cyan-primary)", fontSize: "0.9rem", marginBottom: "8px" }}>
                    Inductive GNN (Ours)
                  </div>
                  <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "6px", textAlign: "center", fontSize: "0.8rem" }}>
                    <div style={{ background: "rgba(16, 185, 129, 0.15)", padding: "8px", borderRadius: "4px" }}>
                      <div style={{ color: "var(--text-muted)", fontSize: "0.7rem" }}>True Positives</div>
                      <div style={{ fontSize: "1.1rem", fontWeight: 700, color: "var(--emerald-primary)" }}>
                        {BENCHMARK_METRICS.confusionMatrixData.gnn.truePositives} / 50
                      </div>
                    </div>
                    <div style={{ background: "rgba(244, 63, 94, 0.15)", padding: "8px", borderRadius: "4px" }}>
                      <div style={{ color: "var(--text-muted)", fontSize: "0.7rem" }}>False Positives</div>
                      <div style={{ fontSize: "1.1rem", fontWeight: 700, color: "var(--rose-primary)" }}>
                        {BENCHMARK_METRICS.confusionMatrixData.gnn.falsePositives}
                      </div>
                    </div>
                    <div style={{ background: "rgba(244, 63, 94, 0.15)", padding: "8px", borderRadius: "4px" }}>
                      <div style={{ color: "var(--text-muted)", fontSize: "0.7rem" }}>False Negatives</div>
                      <div style={{ fontSize: "1.1rem", fontWeight: 700, color: "var(--rose-primary)" }}>
                        {BENCHMARK_METRICS.confusionMatrixData.gnn.falseNegatives}
                      </div>
                    </div>
                    <div style={{ background: "rgba(16, 185, 129, 0.15)", padding: "8px", borderRadius: "4px" }}>
                      <div style={{ color: "var(--text-muted)", fontSize: "0.7rem" }}>True Negatives</div>
                      <div style={{ fontSize: "1.1rem", fontWeight: 700, color: "var(--emerald-primary)" }}>
                        {BENCHMARK_METRICS.confusionMatrixData.gnn.trueNegatives} / 950
                      </div>
                    </div>
                  </div>
                </div>

                {/* MLP Matrix */}
                <div style={{ background: "var(--bg-surface)", padding: "14px", borderRadius: "var(--radius-md)", border: "1px solid var(--border-subtle)" }}>
                  <div style={{ fontWeight: 600, color: "var(--violet-primary)", fontSize: "0.9rem", marginBottom: "8px" }}>
                    MLP Baseline
                  </div>
                  <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "6px", textAlign: "center", fontSize: "0.8rem" }}>
                    <div style={{ background: "rgba(244, 63, 94, 0.15)", padding: "8px", borderRadius: "4px" }}>
                      <div style={{ color: "var(--text-muted)", fontSize: "0.7rem" }}>True Positives</div>
                      <div style={{ fontSize: "1.1rem", fontWeight: 700, color: "var(--rose-primary)" }}>
                        {BENCHMARK_METRICS.confusionMatrixData.mlp.truePositives} / 50
                      </div>
                    </div>
                    <div style={{ background: "rgba(16, 185, 129, 0.15)", padding: "8px", borderRadius: "4px" }}>
                      <div style={{ color: "var(--text-muted)", fontSize: "0.7rem" }}>False Positives</div>
                      <div style={{ fontSize: "1.1rem", fontWeight: 700, color: "var(--emerald-primary)" }}>
                        {BENCHMARK_METRICS.confusionMatrixData.mlp.falsePositives}
                      </div>
                    </div>
                    <div style={{ background: "rgba(244, 63, 94, 0.15)", padding: "8px", borderRadius: "4px" }}>
                      <div style={{ color: "var(--text-muted)", fontSize: "0.7rem" }}>False Negatives</div>
                      <div style={{ fontSize: "1.1rem", fontWeight: 700, color: "var(--rose-primary)" }}>
                        {BENCHMARK_METRICS.confusionMatrixData.mlp.falseNegatives}
                      </div>
                    </div>
                    <div style={{ background: "rgba(16, 185, 129, 0.15)", padding: "8px", borderRadius: "4px" }}>
                      <div style={{ color: "var(--text-muted)", fontSize: "0.7rem" }}>True Negatives</div>
                      <div style={{ fontSize: "1.1rem", fontWeight: 700, color: "var(--emerald-primary)" }}>
                        {BENCHMARK_METRICS.confusionMatrixData.mlp.trueNegatives} / 950
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Right: Live Inductive Ranked Leaderboard for Active Job */}
        <div className="glass-card">
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "14px" }}>
            <h3 style={{ fontSize: "1.1rem", display: "flex", alignItems: "center", gap: "8px" }}>
              <Users size={18} color="var(--cyan-primary)" />
              Candidate Suitability Leaderboard
            </h3>
            <span className="badge badge-violet">{job.company}</span>
          </div>

          <p style={{ fontSize: "0.82rem", color: "var(--text-secondary)", marginBottom: "14px" }}>
            Ranked candidate matches for <strong>{job.title}</strong> computed via Inductive GNN:
          </p>

          <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
            {rankedCandidates.map((item, idx) => (
              <div
                key={item.candidate.id}
                onClick={() => onSelectCandidate && onSelectCandidate(item.candidate)}
                style={{
                  background: "var(--bg-surface)",
                  padding: "12px 14px",
                  borderRadius: "var(--radius-md)",
                  border: "1px solid var(--border-subtle)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  cursor: "pointer",
                  transition: "all var(--transition-fast)"
                }}
                className="glass-card-interactive"
              >
                <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
                  <span style={{
                    width: "22px",
                    height: "22px",
                    borderRadius: "50%",
                    background: idx === 0 ? "var(--cyan-primary)" : "var(--bg-surface-elevated)",
                    color: idx === 0 ? "#090d16" : "var(--text-secondary)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontSize: "0.75rem",
                    fontWeight: 700
                  }}>
                    {idx + 1}
                  </span>
                  <img
                    src={item.candidate.avatar}
                    alt={item.candidate.name}
                    style={{ width: "34px", height: "34px", borderRadius: "50%", objectFit: "cover" }}
                  />
                  <div>
                    <div style={{ fontSize: "0.875rem", fontWeight: 600, color: "var(--text-primary)" }}>
                      {item.candidate.name}
                    </div>
                    <div style={{ fontSize: "0.75rem", color: "var(--text-muted)" }}>
                      {item.candidate.currentTitle}
                    </div>
                  </div>
                </div>

                <div style={{ textAlign: "right" }}>
                  <div style={{ fontSize: "1.1rem", fontWeight: 700, color: "var(--cyan-primary)" }}>
                    {item.matchScore}%
                  </div>
                  <div style={{ fontSize: "0.7rem", color: "var(--text-muted)" }}>
                    GNN Score
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
