import React, { useState } from "react";
import { Sparkles, CheckCircle, AlertCircle, ArrowRight, Wand2, FileText, Check } from "lucide-react";

export default function ResumeEnhancerView({ candidate }) {
  const [customBullet, setCustomBullet] = useState("");
  const [enhancedResult, setEnhancedResult] = useState(null);
  const [copiedIdx, setCopiedIdx] = useState(null);

  // Pre-configured before-and-after bullet transformations
  const bulletPairs = [
    {
      before: "Worked on machine learning models for user recommendations.",
      after: "Engineered an inductive GraphSAGE link prediction service processing 450K graph entities with sub-80ms latency, improving applicant click-through rate by 34% (Google XYZ Format).",
      category: "Machine Learning / Graph"
    },
    {
      before: "Fixed bugs and improved data loading pipeline speed.",
      after: "Refactored PyTorch DataLoader with Ray distributed actor pools, cutting GPU idle time by 42% and accelerating epoch turnaround by 1.8x.",
      category: "Performance Optimization"
    },
    {
      before: "Helped junior developers with pull requests and daily standups.",
      after: "Mentored 4 junior engineers on distributed graph architectures, resulting in zero critical production rollbacks and 100% on-time sprint velocity.",
      category: "Leadership / Mentorship"
    }
  ];

  const handleEnhanceCustom = (e) => {
    e.preventDefault();
    if (!customBullet.trim()) return;

    // Simulate AI transformation into Google XYZ format
    const transformed = `Architected ${customBullet.trim().replace(/\.$/, "")} leveraging high-throughput distributed pipelines, achieving a 38% reduction in latency and boosting system reliability to 99.98%.`;
    setEnhancedResult(transformed);
  };

  const copyToClipboard = (text, idx) => {
    navigator.clipboard.writeText(text);
    setCopiedIdx(idx);
    setTimeout(() => setCopiedIdx(null), 2000);
  };

  return (
    <div className="animate-fade-in">
      <div style={{ marginBottom: "20px" }}>
        <h2 style={{ fontSize: "1.4rem", marginBottom: "6px" }}>Phase 2: Resume Analysis & Improvement Engine</h2>
        <p style={{ fontSize: "0.9rem" }}>
          Performs automated ATS compatibility audits, readability scoring, and transforms weak bullet points into high-impact Google XYZ and STAR formatted achievements.
        </p>
      </div>

      {/* Top ATS Audit Scores */}
      <div className="grid-4" style={{ marginBottom: "24px" }}>
        <div className="glass-card" style={{ padding: "16px 20px" }}>
          <div style={{ fontSize: "0.75rem", textTransform: "uppercase", color: "var(--text-muted)" }}>ATS Match Score</div>
          <div style={{ fontSize: "1.8rem", fontWeight: 800, color: "var(--cyan-primary)" }}>{candidate.atsScore || 92} / 100</div>
          <div style={{ fontSize: "0.75rem", color: "var(--emerald-primary)", fontWeight: 600 }}>Top 5% ATS Compatibility</div>
        </div>
        <div className="glass-card" style={{ padding: "16px 20px" }}>
          <div style={{ fontSize: "0.75rem", textTransform: "uppercase", color: "var(--text-muted)" }}>Quantified Metrics</div>
          <div style={{ fontSize: "1.8rem", fontWeight: 800, color: "var(--violet-primary)" }}>88%</div>
          <div style={{ fontSize: "0.75rem", color: "var(--text-secondary)" }}>High metric density</div>
        </div>
        <div className="glass-card" style={{ padding: "16px 20px" }}>
          <div style={{ fontSize: "0.75rem", textTransform: "uppercase", color: "var(--text-muted)" }}>Action Verb Strength</div>
          <div style={{ fontSize: "1.8rem", fontWeight: 800, color: "var(--emerald-primary)" }}>94%</div>
          <div style={{ fontSize: "0.75rem", color: "var(--text-secondary)" }}>Active voice dominance</div>
        </div>
        <div className="glass-card" style={{ padding: "16px 20px" }}>
          <div style={{ fontSize: "0.75rem", textTransform: "uppercase", color: "var(--text-muted)" }}>Readability Grade</div>
          <div style={{ fontSize: "1.8rem", fontWeight: 800, color: "var(--amber-primary)" }}>Grade 11</div>
          <div style={{ fontSize: "0.75rem", color: "var(--text-secondary)" }}>Clear technical clarity</div>
        </div>
      </div>

      {/* Bullet Point Transformer */}
      <div className="glass-card" style={{ marginBottom: "24px" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "16px" }}>
          <h3 style={{ fontSize: "1.1rem", display: "flex", alignItems: "center", gap: "8px" }}>
            <Wand2 size={18} color="var(--cyan-primary)" />
            AI Resume Bullet Enhancer (Google XYZ Formula: Accomplished [X], Measured by [Y], by Doing [Z])
          </h3>
          <span className="badge badge-cyan">Automated Polish</span>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
          {bulletPairs.map((pair, idx) => (
            <div
              key={idx}
              style={{
                background: "var(--bg-surface)",
                padding: "16px",
                borderRadius: "var(--radius-md)",
                border: "1px solid var(--border-subtle)"
              }}
            >
              <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "8px" }}>
                <span className="badge badge-violet" style={{ fontSize: "0.7rem" }}>{pair.category}</span>
                <button
                  onClick={() => copyToClipboard(pair.after, idx)}
                  className="btn-secondary"
                  style={{ padding: "4px 10px", fontSize: "0.75rem" }}
                >
                  {copiedIdx === idx ? <Check size={12} color="var(--emerald-primary)" /> : null}
                  {copiedIdx === idx ? "Copied!" : "Copy Enhanced Bullet"}
                </button>
              </div>

              {/* Before */}
              <div style={{ display: "flex", alignItems: "flex-start", gap: "10px", marginBottom: "10px", color: "var(--rose-primary)", fontSize: "0.85rem" }}>
                <span style={{ fontWeight: 700, minWidth: "60px" }}>Before:</span>
                <span style={{ color: "var(--text-secondary)", textDecoration: "line-through" }}>{pair.before}</span>
              </div>

              {/* After */}
              <div style={{ display: "flex", alignItems: "flex-start", gap: "10px", color: "var(--emerald-primary)", fontSize: "0.9rem" }}>
                <span style={{ fontWeight: 700, minWidth: "60px" }}>Enhanced:</span>
                <span style={{ color: "var(--text-primary)", fontWeight: 500 }}>{pair.after}</span>
              </div>
            </div>
          ))}
        </div>

        {/* Custom Bullet Input */}
        <div style={{ marginTop: "24px", paddingTop: "20px", borderTop: "1px solid var(--border-subtle)" }}>
          <h4 style={{ fontSize: "0.95rem", marginBottom: "10px", color: "var(--text-secondary)" }}>
            Try Enhancing Your Own Bullet Point:
          </h4>
          <form onSubmit={handleEnhanceCustom} style={{ display: "flex", gap: "10px" }}>
            <input
              type="text"
              value={customBullet}
              onChange={e => setCustomBullet(e.target.value)}
              placeholder="e.g. Worked on AWS cloud infrastructure and fixed bugs..."
              className="form-input"
            />
            <button type="submit" className="btn-primary" style={{ padding: "0 20px", whiteSpace: "nowrap" }}>
              <Sparkles size={15} /> Polish Bullet
            </button>
          </form>

          {enhancedResult && (
            <div style={{ marginTop: "14px", padding: "14px", background: "rgba(6, 182, 212, 0.1)", borderRadius: "var(--radius-md)", border: "1px solid var(--cyan-primary)" }}>
              <div style={{ fontSize: "0.75rem", textTransform: "uppercase", color: "var(--cyan-primary)", fontWeight: 600, marginBottom: "4px" }}>
                AI Enhanced Output:
              </div>
              <p style={{ fontSize: "0.9rem", color: "var(--text-primary)" }}>{enhancedResult}</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
