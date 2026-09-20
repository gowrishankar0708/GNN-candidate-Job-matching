import React from "react";
import { X, Printer, Download, CheckCircle2, AlertTriangle, ShieldCheck, Sparkles } from "lucide-react";

export default function DossierModal({ candidate, job, gnnResult, agentData, isOpen, onClose }) {
  if (!isOpen || !candidate || !job || !gnnResult) return null;

  const handlePrint = () => {
    window.print();
  };

  return (
    <div style={{
      position: "fixed",
      inset: 0,
      backgroundColor: "rgba(9, 13, 22, 0.85)",
      backdropFilter: "blur(12px)",
      zIndex: 1000,
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      padding: "20px"
    }}>
      <div className="glass-card" style={{
        maxWidth: "850px",
        width: "100%",
        maxHeight: "90vh",
        overflowY: "auto",
        background: "var(--bg-surface-elevated)",
        border: "1px solid var(--border-medium)",
        borderRadius: "var(--radius-xl)",
        padding: "32px",
        boxShadow: "var(--shadow-lg)"
      }}>
        {/* Modal Top Actions */}
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "24px", borderBottom: "1px solid var(--border-subtle)", paddingBottom: "16px" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
            <span className="badge badge-cyan">Dossier Evaluation Report</span>
            <span className="badge badge-violet">Springer 2025 GNN Inductive Engine</span>
          </div>
          <div style={{ display: "flex", gap: "8px" }}>
            <button onClick={handlePrint} className="btn-secondary" style={{ padding: "6px 14px" }}>
              <Printer size={15} /> Print / Save PDF
            </button>
            <button onClick={onClose} className="btn-secondary" style={{ padding: "6px 10px" }}>
              <X size={16} />
            </button>
          </div>
        </div>

        {/* Dossier Header */}
        <div style={{ display: "flex", gap: "24px", alignItems: "center", marginBottom: "28px", background: "var(--bg-surface)", padding: "20px", borderRadius: "var(--radius-lg)", border: "1px solid var(--border-subtle)" }}>
          <img
            src={candidate.avatar}
            alt={candidate.name}
            style={{ width: "70px", height: "70px", borderRadius: "50%", objectFit: "cover", border: "2px solid var(--cyan-primary)" }}
          />
          <div style={{ flex: 1 }}>
            <h2 style={{ fontSize: "1.5rem", marginBottom: "4px" }}>{candidate.name}</h2>
            <p style={{ color: "var(--cyan-primary)", fontWeight: 500, marginBottom: "4px" }}>
              Applying for: <span style={{ color: "var(--text-primary)" }}>{job.title}</span> at <span style={{ color: "var(--violet-primary)" }}>{job.company}</span>
            </p>
            <div style={{ display: "flex", gap: "12px", fontSize: "0.8rem", color: "var(--text-muted)" }}>
              <span>{candidate.location}</span>
              <span>•</span>
              <span>{candidate.yearsExperience} yrs Experience</span>
              <span>•</span>
              <span>{candidate.education.degree}</span>
            </div>
          </div>

          {/* Overall Match Score */}
          <div style={{ textAlign: "center", background: "var(--bg-canvas)", padding: "14px 22px", borderRadius: "var(--radius-md)", border: "1px solid var(--border-medium)" }}>
            <div style={{ fontSize: "2rem", fontWeight: 800, color: "var(--cyan-primary)", lineHeight: 1 }}>
              {gnnResult.matchScore}%
            </div>
            <div style={{ fontSize: "0.75rem", textTransform: "uppercase", color: "var(--text-muted)", marginTop: "4px" }}>
              Inductive GNN Score
            </div>
          </div>
        </div>

        {/* Inductive GNN Breakdown vs Baseline */}
        <div style={{ marginBottom: "28px" }}>
          <h3 style={{ fontSize: "1.1rem", marginBottom: "14px", display: "flex", alignItems: "center", gap: "8px" }}>
            <Sparkles size={18} color="var(--cyan-primary)" />
            Inductive Link Prediction & Benchmark Contrast
          </h3>
          <div className="grid-3" style={{ marginBottom: "14px" }}>
            <div style={{ background: "var(--bg-surface)", padding: "14px", borderRadius: "var(--radius-md)", border: "1px solid var(--border-subtle)" }}>
              <div style={{ fontSize: "0.8rem", color: "var(--text-muted)" }}>Inductive GNN (Ours)</div>
              <div style={{ fontSize: "1.4rem", fontWeight: 700, color: "var(--cyan-primary)" }}>{gnnResult.matchScore}%</div>
              <div style={{ fontSize: "0.75rem", color: "var(--text-secondary)", marginTop: "4px" }}>Balanced Acc: 65.4% | Rec: 48.9%</div>
            </div>
            <div style={{ background: "var(--bg-surface)", padding: "14px", borderRadius: "var(--radius-md)", border: "1px solid var(--border-subtle)" }}>
              <div style={{ fontSize: "0.8rem", color: "var(--text-muted)" }}>MLP Baseline</div>
              <div style={{ fontSize: "1.4rem", fontWeight: 700, color: "var(--violet-primary)" }}>{gnnResult.mlpBaselineScore}%</div>
              <div style={{ fontSize: "0.75rem", color: "var(--text-secondary)", marginTop: "4px" }}>Balanced Acc: 55.0% | Rec: 8.5%</div>
            </div>
            <div style={{ background: "var(--bg-surface)", padding: "14px", borderRadius: "var(--radius-md)", border: "1px solid var(--border-subtle)" }}>
              <div style={{ fontSize: "0.8rem", color: "var(--text-muted)" }}>Cosine Similarity</div>
              <div style={{ fontSize: "1.4rem", fontWeight: 700, color: "var(--text-muted)" }}>{gnnResult.cosineBaselineScore}%</div>
              <div style={{ fontSize: "0.75rem", color: "var(--text-secondary)", marginTop: "4px" }}>Balanced Acc: 51.2% | Rec: 6.2%</div>
            </div>
          </div>
          <p style={{ fontSize: "0.85rem", color: "var(--text-secondary)" }}>
            *The Inductive GNN outperforms standard neural baselines by explicitly modeling relational 2-hop skill dependencies and overcoming the 95% rejection class imbalance.
          </p>
        </div>

        {/* Skill Alignment & Gaps */}
        <div style={{ marginBottom: "28px" }}>
          <h3 style={{ fontSize: "1.1rem", marginBottom: "14px" }}>Skill Alignment Breakdown</h3>
          <div className="grid-2">
            <div style={{ background: "rgba(16, 185, 129, 0.06)", border: "1px solid rgba(16, 185, 129, 0.2)", padding: "16px", borderRadius: "var(--radius-md)" }}>
              <div style={{ display: "flex", alignItems: "center", gap: "8px", color: "var(--emerald-primary)", fontWeight: 600, fontSize: "0.9rem", marginBottom: "8px" }}>
                <CheckCircle2 size={16} /> Matched Competencies ({gnnResult.matchedSkills.length})
              </div>
              <div style={{ display: "flex", flexWrap: "wrap", gap: "6px" }}>
                {gnnResult.matchedSkills.map((s, idx) => (
                  <span key={idx} className="badge badge-emerald">{s.name}</span>
                ))}
              </div>
            </div>

            <div style={{ background: "rgba(244, 63, 94, 0.06)", border: "1px solid rgba(244, 63, 94, 0.2)", padding: "16px", borderRadius: "var(--radius-md)" }}>
              <div style={{ display: "flex", alignItems: "center", gap: "8px", color: "var(--rose-primary)", fontWeight: 600, fontSize: "0.9rem", marginBottom: "8px" }}>
                <AlertTriangle size={16} /> Missing Critical Gaps ({gnnResult.missingSkills.length})
              </div>
              <div style={{ display: "flex", flexWrap: "wrap", gap: "6px" }}>
                {gnnResult.missingSkills.length > 0 ? (
                  gnnResult.missingSkills.map((s, idx) => (
                    <span key={idx} className="badge badge-rose">{s.name}</span>
                  ))
                ) : (
                  <span style={{ fontSize: "0.85rem", color: "var(--text-muted)" }}>None detected. Full skill coverage.</span>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Multi-Agent Recommendation */}
        {agentData && (
          <div style={{ marginBottom: "24px", background: "var(--bg-surface)", padding: "20px", borderRadius: "var(--radius-lg)", border: "1px solid var(--border-subtle)" }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "12px" }}>
              <h3 style={{ fontSize: "1.1rem", display: "flex", alignItems: "center", gap: "8px" }}>
                <ShieldCheck size={18} color="var(--emerald-primary)" />
                Multi-Agent Autonomous Recruiter Consensus
              </h3>
              <span className="badge" style={{ background: "rgba(16, 185, 129, 0.15)", color: agentData.consensus.badgeColor, border: `1px solid ${agentData.consensus.badgeColor}` }}>
                {agentData.consensus.recommendation}
              </span>
            </div>
            <p style={{ fontSize: "0.9rem", color: "var(--text-secondary)", marginBottom: "16px" }}>
              {agentData.consensus.summary}
            </p>
            <div className="grid-2">
              {agentData.agents.map(agent => (
                <div key={agent.id} style={{ background: "var(--bg-surface-elevated)", padding: "12px", borderRadius: "var(--radius-md)", border: "1px solid var(--border-subtle)" }}>
                  <div style={{ display: "flex", justifyContent: "space-between", fontSize: "0.8rem", marginBottom: "4px" }}>
                    <strong style={{ color: agent.color }}>{agent.avatar} {agent.name} ({agent.role})</strong>
                    <span style={{ color: "var(--text-muted)" }}>{agent.verdict}</span>
                  </div>
                  <p style={{ fontSize: "0.8rem", color: "var(--text-secondary)" }}>{agent.statement}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        <div style={{ textAlign: "right", marginTop: "24px" }}>
          <button onClick={onClose} className="btn-primary" style={{ padding: "10px 24px" }}>
            Done
          </button>
        </div>
      </div>
    </div>
  );
}
