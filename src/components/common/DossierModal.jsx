import React from "react";
import { X, Printer, CheckCircle2, AlertTriangle, ShieldCheck, Sparkles } from "lucide-react";

export default function DossierModal({ candidate, job, gnnResult, agentData, isOpen, onClose }) {
  if (!isOpen || !candidate || !job || !gnnResult) return null;
  return (
    <div style={{ position: "fixed", inset: 0, backgroundColor: "rgba(0,0,0,0.4)", zIndex: 1000, display: "flex", alignItems: "center", justifyContent: "center", padding: "20px" }}>
      <div style={{ maxWidth: "850px", width: "100%", maxHeight: "90vh", overflowY: "auto", background: "white", border: "1px solid var(--border-medium)", borderRadius: "var(--radius-xl)", padding: "32px", boxShadow: "var(--shadow-lg)" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "24px", borderBottom: "1px solid var(--border-subtle)", paddingBottom: "16px" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
            <span className="badge badge-cyan">Evaluation Report</span>
            <span className="badge badge-violet">Springer 2025 GNN</span>
          </div>
          <div style={{ display: "flex", gap: "8px" }}>
            <button onClick={() => window.print()} className="btn-secondary" style={{ padding: "6px 14px" }}><Printer size={14} /> Print</button>
            <button onClick={onClose} className="btn-secondary" style={{ padding: "6px 10px" }}><X size={15} /></button>
          </div>
        </div>

        <div style={{ display: "flex", gap: "20px", alignItems: "center", marginBottom: "24px", background: "var(--bg-surface)", padding: "18px", borderRadius: "var(--radius-lg)", border: "1px solid var(--border-subtle)" }}>
          <img src={candidate.avatar} alt={candidate.name} style={{ width: "60px", height: "60px", borderRadius: "50%", objectFit: "cover", border: "2px solid var(--primary-border)" }} />
          <div style={{ flex: 1 }}>
            <h2 style={{ fontSize: "1.35rem", marginBottom: "3px" }}>{candidate.name}</h2>
            <p style={{ fontSize: "0.85rem", color: "var(--primary)", fontWeight: 500, marginBottom: "3px" }}>Applying for: <span style={{ color: "var(--text-primary)" }}>{job.title}</span> at <span style={{ color: "var(--purple)" }}>{job.company}</span></p>
            <div style={{ fontSize: "0.78rem", color: "var(--text-muted)" }}>{candidate.location} · {candidate.yearsExperience} yrs · {candidate.education.degree}</div>
          </div>
          <div style={{ textAlign: "center", background: "var(--primary-light)", padding: "12px 20px", borderRadius: "var(--radius-md)", border: "1px solid var(--primary-border)" }}>
            <div style={{ fontSize: "1.8rem", fontWeight: 800, color: "var(--primary)", lineHeight: 1 }}>{gnnResult.matchScore}%</div>
            <div style={{ fontSize: "0.7rem", textTransform: "uppercase", color: "var(--text-muted)", marginTop: "3px" }}>GNN Score</div>
          </div>
        </div>

        <div style={{ marginBottom: "24px" }}>
          <h3 style={{ fontSize: "1.05rem", marginBottom: "12px", display: "flex", alignItems: "center", gap: "7px" }}><Sparkles size={16} color="var(--primary)" /> Benchmark Comparison</h3>
          <div className="grid-3">
            {[
              { label: "Inductive GNN (Ours)", score: gnnResult.matchScore, color: "var(--primary)", sub: "Bal. Acc: 65.4% | Rec: 48.9%" },
              { label: "MLP Baseline", score: gnnResult.mlpBaselineScore, color: "var(--purple)", sub: "Bal. Acc: 55.0% | Rec: 8.5%" },
              { label: "Cosine Similarity", score: gnnResult.cosineBaselineScore, color: "var(--text-muted)", sub: "Bal. Acc: 51.2% | Rec: 6.2%" }
            ].map((m, i) => (
              <div key={i} style={{ background: "var(--bg-surface)", padding: "12px", borderRadius: "var(--radius-md)", border: "1px solid var(--border-subtle)" }}>
                <div style={{ fontSize: "0.78rem", color: "var(--text-muted)" }}>{m.label}</div>
                <div style={{ fontSize: "1.3rem", fontWeight: 700, color: m.color }}>{m.score}%</div>
                <div style={{ fontSize: "0.72rem", color: "var(--text-secondary)", marginTop: "3px" }}>{m.sub}</div>
              </div>
            ))}
          </div>
        </div>

        <div style={{ marginBottom: "24px" }}>
          <h3 style={{ fontSize: "1.05rem", marginBottom: "12px" }}>Skill Alignment</h3>
          <div className="grid-2">
            <div style={{ background: "var(--green-light)", border: "1px solid var(--green-border)", padding: "14px", borderRadius: "var(--radius-md)" }}>
              <div style={{ display: "flex", alignItems: "center", gap: "7px", color: "var(--green)", fontWeight: 600, fontSize: "0.88rem", marginBottom: "8px" }}><CheckCircle2 size={15} /> Matched ({gnnResult.matchedSkills.length})</div>
              <div style={{ display: "flex", flexWrap: "wrap", gap: "5px" }}>{gnnResult.matchedSkills.map((s, i) => <span key={i} className="badge badge-emerald">{s.name}</span>)}</div>
            </div>
            <div style={{ background: "var(--red-light)", border: "1px solid var(--red-border)", padding: "14px", borderRadius: "var(--radius-md)" }}>
              <div style={{ display: "flex", alignItems: "center", gap: "7px", color: "var(--red)", fontWeight: 600, fontSize: "0.88rem", marginBottom: "8px" }}><AlertTriangle size={15} /> Gaps ({gnnResult.missingSkills.length})</div>
              <div style={{ display: "flex", flexWrap: "wrap", gap: "5px" }}>{gnnResult.missingSkills.length > 0 ? gnnResult.missingSkills.map((s, i) => <span key={i} className="badge badge-rose">{s.name}</span>) : <span style={{ fontSize: "0.82rem", color: "var(--text-muted)" }}>Full coverage.</span>}</div>
            </div>
          </div>
        </div>

        {agentData && (
          <div style={{ marginBottom: "24px", background: "var(--bg-surface)", padding: "18px", borderRadius: "var(--radius-lg)", border: "1px solid var(--border-subtle)" }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "10px" }}>
              <h3 style={{ fontSize: "1.05rem", display: "flex", alignItems: "center", gap: "7px" }}><ShieldCheck size={16} color="var(--green)" /> Multi-Agent Consensus</h3>
              <span className="badge" style={{ background: "var(--green-light)", color: "var(--green)", border: "1px solid var(--green-border)" }}>{agentData.consensus.recommendation}</span>
            </div>
            <p style={{ fontSize: "0.85rem", color: "var(--text-secondary)", marginBottom: "14px" }}>{agentData.consensus.summary}</p>
            <div className="grid-2">
              {agentData.agents.map(a => (
                <div key={a.id} style={{ background: "white", padding: "10px", borderRadius: "var(--radius-md)", border: "1px solid var(--border-subtle)" }}>
                  <div style={{ display: "flex", justifyContent: "space-between", fontSize: "0.78rem", marginBottom: "4px" }}>
                    <strong>{a.avatar} {a.name} ({a.role})</strong>
                    <span style={{ color: "var(--text-muted)" }}>{a.verdict}</span>
                  </div>
                  <p style={{ fontSize: "0.78rem", color: "var(--text-secondary)" }}>{a.statement}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        <div style={{ textAlign: "right" }}><button onClick={onClose} className="btn-primary" style={{ padding: "10px 24px" }}>Done</button></div>
      </div>
    </div>
  );
}
