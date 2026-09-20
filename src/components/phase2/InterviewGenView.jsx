import React, { useState } from "react";
import { ChevronDown, ChevronUp } from "lucide-react";

export default function InterviewGenView({ candidate, job }) {
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [expandedId, setExpandedId] = useState("q1");

  const questions = [
    { id: "q1", category: "technical", badge: "Technical Deep-Dive", color: "var(--primary)", question: `In your work at ${candidate.experienceHistory[0]?.company || 'your previous company'}, you worked with Graph Neural Networks. How do you formulate inductive matching compared to transductive GCN?`, whyAsked: `Tests inductive node aggregation understanding for ${job.title}.`, idealAnswer: "Candidate should explain transductive vs inductive models, aggregator functions, and mini-batch loaders.", rubric: ["1 pt: Confuses inductive/transductive.", "3 pts: High-level difference but omits sampling.", "5 pts: Mentions aggregators, latency tradeoffs."] },
    { id: "q2", category: "system_design", badge: "System Architecture", color: "var(--purple)", question: "How would you architect a real-time candidate recommendation service serving 10M users with sub-100ms latency?", whyAsked: `Validates distributed systems ability for ${job.company}.`, idealAnswer: "Offline subgraph pre-computation, Triton inference server, Redis caching, Milvus HNSW.", rubric: ["1 pt: Basic Python script only.", "3 pts: Mentions vector DB but omits graph inference.", "5 pts: Full architecture with caching, failover."] },
    { id: "q3", category: "behavioral", badge: "Behavioral (STAR)", color: "var(--amber)", question: "Tell me about a time your model suffered from extreme class imbalance. How did you diagnose and fix it?", whyAsked: "Addresses the 95% rejection skew from the Springer 2025 paper.", idealAnswer: "STAR: Situation (95% rejection), Task (improve recall), Action (re-weighting, focal loss), Result.", rubric: ["1 pt: Blames data without solution.", "3 pts: Standard oversampling only.", "5 pts: Loss re-weighting, structural graph signals, balanced accuracy."] },
    { id: "q4", category: "gap", badge: "Skill Gap Probe", color: "var(--red)", question: `The role requires ${job.requiredSkills[job.requiredSkills.length - 1]?.name || 'advanced skills'}. Walk us through how you'd ramp up.`, whyAsked: "Tests adaptability to bridge skill gaps.", idealAnswer: "Demonstrates self-driven learning with concrete prior examples.", rubric: ["1 pt: Defensive or dismissive.", "3 pts: Willing but no examples.", "5 pts: Strong transferability, clear ramp-up plan."] }
  ];

  const filtered = selectedCategory === "all" ? questions : questions.filter(q => q.category === selectedCategory);

  return (
    <div className="animate-fade-in">
      <div style={{ marginBottom: "20px" }}>
        <h2 style={{ fontSize: "1.35rem", marginBottom: "6px" }}>Phase 2: Personalized Interview Question Generation</h2>
        <p style={{ fontSize: "0.88rem" }}>Generates candidate-specific interview packs with scoring rubrics and sample answers.</p>
      </div>

      <div style={{ display: "flex", gap: "8px", marginBottom: "18px" }}>
        {[{ key: "all", label: `All (${questions.length})` }, { key: "technical", label: "Technical" }, { key: "system_design", label: "System Design" }, { key: "behavioral", label: "Behavioral" }].map(t => (
          <button key={t.key} onClick={() => setSelectedCategory(t.key)} className={`tab-btn ${selectedCategory === t.key ? "active active-phase2" : ""}`}>{t.label}</button>
        ))}
      </div>

      <div style={{ display: "flex", flexDirection: "column", gap: "14px" }}>
        {filtered.map(q => {
          const isExp = expandedId === q.id;
          return (
            <div key={q.id} className="glass-card" style={{ padding: "18px", borderLeft: isExp ? `4px solid ${q.color}` : "4px solid transparent" }}>
              <div onClick={() => setExpandedId(isExp ? null : q.id)} style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", cursor: "pointer" }}>
                <div style={{ flex: 1 }}>
                  <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "5px" }}>
                    <span className="badge" style={{ background: "var(--bg-surface)", color: q.color, border: `1px solid var(--border-subtle)` }}>{q.badge}</span>
                  </div>
                  <h3 style={{ fontSize: "1rem", fontWeight: 600, lineHeight: 1.4 }}>{q.question}</h3>
                </div>
                <button className="btn-secondary" style={{ padding: "5px", marginLeft: "10px" }}>{isExp ? <ChevronUp size={15} /> : <ChevronDown size={15} />}</button>
              </div>
              {isExp && (
                <div style={{ marginTop: "14px", paddingTop: "14px", borderTop: "1px solid var(--border-subtle)" }}>
                  <div style={{ marginBottom: "10px", fontSize: "0.82rem", color: "var(--text-secondary)" }}><strong style={{ color: "var(--primary)" }}>Why asked: </strong>{q.whyAsked}</div>
                  <div style={{ background: "var(--bg-surface)", padding: "12px", borderRadius: "var(--radius-md)", border: "1px solid var(--border-subtle)", marginBottom: "12px" }}>
                    <div style={{ fontSize: "0.75rem", textTransform: "uppercase", color: "var(--green)", fontWeight: 600, marginBottom: "3px" }}>Expected Answer:</div>
                    <p style={{ fontSize: "0.82rem", color: "var(--text-primary)", lineHeight: 1.6 }}>{q.idealAnswer}</p>
                  </div>
                  <div>
                    <div style={{ fontSize: "0.75rem", textTransform: "uppercase", color: "var(--text-muted)", fontWeight: 600, marginBottom: "6px" }}>Rubric:</div>
                    <div style={{ display: "flex", flexDirection: "column", gap: "5px" }}>
                      {q.rubric.map((r, ri) => (
                        <div key={ri} style={{ fontSize: "0.78rem", color: "var(--text-secondary)", background: "var(--bg-surface)", padding: "7px 10px", borderRadius: "var(--radius-sm)", borderLeft: `3px solid ${ri === 2 ? 'var(--green)' : ri === 1 ? 'var(--amber)' : 'var(--red)'}` }}>{r}</div>
                      ))}
                    </div>
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
