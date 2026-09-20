import React from "react";
import { CheckCircle2, AlertTriangle, ArrowRight, BookOpen, Clock, Zap } from "lucide-react";
import RadarChart from "../common/RadarChart";
import { calculateGnnMatch } from "../../utils/gnnSimulator";

export default function SkillGapView({ candidate, job }) {
  const gnnResult = calculateGnnMatch(candidate, job);

  // Recommended learning roadmap milestones to close any gaps
  const learningRoadmap = [
    {
      step: 1,
      title: "Master Inductive Graph Representation Learning",
      duration: "2 Weeks",
      focus: "GraphSAGE NeighborLoader & HeteroData in PyTorch Geometric",
      resource: "PyTorch Geometric Docs & Frazzetto et al. (Springer 2025)",
      impact: "+14% GNN Match Uplift"
    },
    {
      step: 2,
      title: "Distributed Graph Sampling & Ray Scaling",
      duration: "3 Weeks",
      focus: "Scaling 2-hop neighborhood message passing over 1M+ nodes",
      resource: "Ray Train & DGL Distributed Guide",
      impact: "+8% GNN Match Uplift"
    },
    {
      step: 3,
      title: "Vector DB & Hybrid Graph Search Integration",
      duration: "2 Weeks",
      focus: "Milvus / Qdrant HNSW indexing coupled with GNN subgraph embeddings",
      resource: "Advanced RecSys Engineering Standards",
      impact: "+6% GNN Match Uplift"
    }
  ];

  return (
    <div className="animate-fade-in">
      <div style={{ marginBottom: "20px" }}>
        <h2 style={{ fontSize: "1.4rem", marginBottom: "6px" }}>Phase 2: Skill Gap Identification & Career Roadmap</h2>
        <p style={{ fontSize: "0.9rem" }}>
          Performs multi-dimensional competency radar analysis comparing candidate proficiencies with target job requirements, pinpointing critical gaps and generating tailored upskilling paths.
        </p>
      </div>

      <div className="grid-2" style={{ alignItems: "start", marginBottom: "24px" }}>
        {/* Left: SVG Radar Chart */}
        <div className="glass-card">
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "16px" }}>
            <h3 style={{ fontSize: "1.1rem" }}>Competency Radar Analysis</h3>
            <span className="badge badge-cyan">{candidate.name} vs {job.title}</span>
          </div>

          <RadarChart candidate={candidate} job={job} size={340} />

          <p style={{ fontSize: "0.8rem", color: "var(--text-secondary)", textAlign: "center", marginTop: "14px" }}>
            The polygon overlap illustrates structural alignment across core engineering, machine learning, and architectural dimensions.
          </p>
        </div>

        {/* Right: Categorized Gap Breakdown */}
        <div className="glass-card">
          <h3 style={{ fontSize: "1.1rem", marginBottom: "16px" }}>Categorized Competency Breakdown</h3>

          {/* Matched Skills */}
          <div style={{ marginBottom: "16px", background: "rgba(16, 185, 129, 0.08)", border: "1px solid rgba(16, 185, 129, 0.25)", padding: "14px", borderRadius: "var(--radius-md)" }}>
            <div style={{ display: "flex", alignItems: "center", gap: "8px", color: "var(--emerald-primary)", fontWeight: 600, fontSize: "0.9rem", marginBottom: "8px" }}>
              <CheckCircle2 size={16} /> Matched Core Skills ({gnnResult.matchedSkills.length})
            </div>
            <div style={{ display: "flex", flexWrap: "wrap", gap: "6px" }}>
              {gnnResult.matchedSkills.map((s, idx) => (
                <span key={idx} className="badge badge-emerald">{s.name}</span>
              ))}
            </div>
          </div>

          {/* Missing Skills */}
          <div style={{ marginBottom: "16px", background: "rgba(244, 63, 94, 0.08)", border: "1px solid rgba(244, 63, 94, 0.25)", padding: "14px", borderRadius: "var(--radius-md)" }}>
            <div style={{ display: "flex", alignItems: "center", gap: "8px", color: "var(--rose-primary)", fontWeight: 600, fontSize: "0.9rem", marginBottom: "8px" }}>
              <AlertTriangle size={16} /> Critical Missing Requirements ({gnnResult.missingSkills.length})
            </div>
            <div style={{ display: "flex", flexWrap: "wrap", gap: "6px" }}>
              {gnnResult.missingSkills.length > 0 ? (
                gnnResult.missingSkills.map((s, idx) => (
                  <span key={idx} className="badge badge-rose">{s.name}</span>
                ))
              ) : (
                <span style={{ fontSize: "0.85rem", color: "var(--text-muted)" }}>None. Full requirements satisfied.</span>
              )}
            </div>
          </div>

          {/* Transferable Skills */}
          <div style={{ background: "rgba(245, 158, 11, 0.08)", border: "1px solid rgba(245, 158, 11, 0.25)", padding: "14px", borderRadius: "var(--radius-md)" }}>
            <div style={{ display: "flex", alignItems: "center", gap: "8px", color: "var(--amber-primary)", fontWeight: 600, fontSize: "0.9rem", marginBottom: "8px" }}>
              <Zap size={16} /> Transferable & Adjacent Strengths
            </div>
            <div style={{ display: "flex", flexWrap: "wrap", gap: "6px" }}>
              {candidate.hardSkills.slice(0, 4).map((s, idx) => (
                <span key={idx} className="badge badge-amber">{s.name}</span>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Tailored Learning Roadmap */}
      <div className="glass-card">
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "16px" }}>
          <h3 style={{ fontSize: "1.1rem", display: "flex", alignItems: "center", gap: "8px" }}>
            <Clock size={18} color="var(--violet-primary)" />
            Personalized Career Upskilling Roadmap
          </h3>
          <span className="badge badge-violet">Estimated Time: ~7 Weeks to Full Match</span>
        </div>

        <div className="grid-3">
          {learningRoadmap.map((item) => (
            <div
              key={item.step}
              style={{
                background: "var(--bg-surface)",
                padding: "16px",
                borderRadius: "var(--radius-md)",
                border: "1px solid var(--border-subtle)",
                position: "relative"
              }}
            >
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "8px" }}>
                <span className="badge badge-cyan">Step {item.step}</span>
                <span style={{ fontSize: "0.75rem", color: "var(--text-muted)" }}>{item.duration}</span>
              </div>
              <h4 style={{ fontSize: "0.95rem", marginBottom: "6px", color: "var(--text-primary)" }}>{item.title}</h4>
              <p style={{ fontSize: "0.8rem", color: "var(--text-secondary)", marginBottom: "10px" }}>{item.focus}</p>
              <div style={{ fontSize: "0.75rem", color: "var(--emerald-primary)", fontWeight: 600 }}>
                {item.impact}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
