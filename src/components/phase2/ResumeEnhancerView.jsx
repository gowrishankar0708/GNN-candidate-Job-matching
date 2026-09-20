import React, { useState } from "react";
import { Sparkles, Wand2, Check } from "lucide-react";

export default function ResumeEnhancerView({ candidate }) {
  const [customBullet, setCustomBullet] = useState("");
  const [enhancedResult, setEnhancedResult] = useState(null);
  const [copiedIdx, setCopiedIdx] = useState(null);

  const bulletPairs = [
    { before: "Worked on machine learning models for user recommendations.", after: "Engineered an inductive GraphSAGE link prediction service processing 450K graph entities with sub-80ms latency, improving applicant click-through rate by 34%.", category: "Machine Learning" },
    { before: "Fixed bugs and improved data loading pipeline speed.", after: "Refactored PyTorch DataLoader with Ray distributed actor pools, cutting GPU idle time by 42% and accelerating epoch turnaround by 1.8x.", category: "Performance" },
    { before: "Helped junior developers with pull requests and daily standups.", after: "Mentored 4 junior engineers on distributed graph architectures, resulting in zero critical production rollbacks and 100% on-time sprint velocity.", category: "Leadership" }
  ];

  const copyToClipboard = (text, idx) => { navigator.clipboard.writeText(text); setCopiedIdx(idx); setTimeout(() => setCopiedIdx(null), 2000); };

  return (
    <div className="animate-fade-in">
      <div style={{ marginBottom: "20px" }}>
        <h2 style={{ fontSize: "1.35rem", marginBottom: "6px" }}>Phase 2: Resume Analysis & Improvement</h2>
        <p style={{ fontSize: "0.88rem" }}>ATS compatibility audits and AI-powered bullet point enhancement using the Google XYZ formula.</p>
      </div>

      <div className="grid-4" style={{ marginBottom: "20px" }}>
        {[
          { label: "ATS Score", value: `${candidate.atsScore || 92}/100`, sub: "Top 5% Compatibility", color: "var(--primary)" },
          { label: "Metrics Density", value: "88%", sub: "High quantification", color: "var(--purple)" },
          { label: "Action Verbs", value: "94%", sub: "Active voice dominant", color: "var(--green)" },
          { label: "Readability", value: "Grade 11", sub: "Clear technical level", color: "var(--amber)" }
        ].map((m, i) => (
          <div key={i} className="glass-card" style={{ padding: "14px 16px" }}>
            <div style={{ fontSize: "0.72rem", textTransform: "uppercase", color: "var(--text-muted)" }}>{m.label}</div>
            <div style={{ fontSize: "1.6rem", fontWeight: 800, color: m.color }}>{m.value}</div>
            <div style={{ fontSize: "0.72rem", color: "var(--text-secondary)" }}>{m.sub}</div>
          </div>
        ))}
      </div>

      <div className="glass-card" style={{ marginBottom: "20px" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "14px" }}>
          <h3 style={{ fontSize: "1.05rem", display: "flex", alignItems: "center", gap: "7px" }}><Wand2 size={16} color="var(--primary)" /> AI Bullet Enhancer (Google XYZ)</h3>
          <span className="badge badge-cyan">Automated Polish</span>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: "14px" }}>
          {bulletPairs.map((pair, idx) => (
            <div key={idx} style={{ background: "var(--bg-surface)", padding: "14px", borderRadius: "var(--radius-md)", border: "1px solid var(--border-subtle)" }}>
              <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "8px" }}>
                <span className="badge badge-violet">{pair.category}</span>
                <button onClick={() => copyToClipboard(pair.after, idx)} className="btn-secondary" style={{ padding: "3px 10px", fontSize: "0.72rem" }}>
                  {copiedIdx === idx ? <><Check size={11} color="var(--green)" /> Copied!</> : "Copy Enhanced"}
                </button>
              </div>
              <div style={{ display: "flex", alignItems: "flex-start", gap: "8px", marginBottom: "8px", fontSize: "0.82rem" }}>
                <span style={{ fontWeight: 700, minWidth: "55px", color: "var(--red)" }}>Before:</span>
                <span style={{ color: "var(--text-muted)", textDecoration: "line-through" }}>{pair.before}</span>
              </div>
              <div style={{ display: "flex", alignItems: "flex-start", gap: "8px", fontSize: "0.85rem" }}>
                <span style={{ fontWeight: 700, minWidth: "55px", color: "var(--green)" }}>After:</span>
                <span style={{ color: "var(--text-primary)", fontWeight: 500 }}>{pair.after}</span>
              </div>
            </div>
          ))}
        </div>

        <div style={{ marginTop: "20px", paddingTop: "18px", borderTop: "1px solid var(--border-subtle)" }}>
          <h4 style={{ fontSize: "0.92rem", marginBottom: "8px", color: "var(--text-secondary)" }}>Try Your Own Bullet Point:</h4>
          <form onSubmit={e => { e.preventDefault(); if (!customBullet.trim()) return; setEnhancedResult(`Architected ${customBullet.trim().replace(/\.$/, "")} leveraging distributed pipelines, achieving a 38% latency reduction and 99.98% reliability.`); }} style={{ display: "flex", gap: "8px" }}>
            <input type="text" value={customBullet} onChange={e => setCustomBullet(e.target.value)} placeholder="e.g. Worked on AWS cloud infrastructure..." className="form-input" />
            <button type="submit" className="btn-primary" style={{ padding: "0 18px", whiteSpace: "nowrap" }}><Sparkles size={14} /> Polish</button>
          </form>
          {enhancedResult && (
            <div style={{ marginTop: "12px", padding: "12px", background: "var(--primary-light)", borderRadius: "var(--radius-md)", border: "1px solid var(--primary-border)" }}>
              <div style={{ fontSize: "0.72rem", textTransform: "uppercase", color: "var(--primary)", fontWeight: 600, marginBottom: "3px" }}>Enhanced:</div>
              <p style={{ fontSize: "0.88rem", color: "var(--text-primary)" }}>{enhancedResult}</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
