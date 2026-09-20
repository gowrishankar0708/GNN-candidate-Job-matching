import React from "react";
import { CheckCircle2, AlertTriangle, Zap, Clock } from "lucide-react";
import RadarChart from "../common/RadarChart";
import { calculateGnnMatch } from "../../utils/gnnSimulator";

export default function SkillGapView({ candidate, job }) {
  const gnnResult = calculateGnnMatch(candidate, job);
  const roadmap = [
    { step: 1, title: "Master Inductive Graph Representation", duration: "2 Weeks", focus: "GraphSAGE NeighborLoader & HeteroData in PyG", resource: "PyG Docs & Frazzetto et al. (2025)", impact: "+14% Uplift" },
    { step: 2, title: "Distributed Graph Sampling & Scaling", duration: "3 Weeks", focus: "2-hop sampling over 1M+ nodes with Ray", resource: "Ray Train & DGL Guide", impact: "+8% Uplift" },
    { step: 3, title: "Vector DB & Graph Search Integration", duration: "2 Weeks", focus: "Milvus/Qdrant HNSW with GNN embeddings", resource: "Advanced RecSys Standards", impact: "+6% Uplift" }
  ];

  return (
    <div className="animate-fade-in">
      <div style={{ marginBottom: "20px" }}>
        <h2 style={{ fontSize: "1.35rem", marginBottom: "6px" }}>Phase 2: Skill Gap Identification & Career Roadmap</h2>
        <p style={{ fontSize: "0.88rem" }}>Multi-dimensional radar analysis comparing candidate proficiencies with job requirements.</p>
      </div>

      <div className="grid-2" style={{ alignItems: "start", marginBottom: "20px" }}>
        <div className="glass-card">
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "14px" }}>
            <h3 style={{ fontSize: "1.05rem" }}>Competency Radar</h3>
            <span className="badge badge-cyan">{candidate.name} vs {job.title}</span>
          </div>
          <RadarChart candidate={candidate} job={job} size={340} />
        </div>

        <div className="glass-card">
          <h3 style={{ fontSize: "1.05rem", marginBottom: "14px" }}>Categorized Breakdown</h3>
          <div style={{ marginBottom: "14px", background: "var(--green-light)", border: "1px solid var(--green-border)", padding: "12px", borderRadius: "var(--radius-md)" }}>
            <div style={{ display: "flex", alignItems: "center", gap: "7px", color: "var(--green)", fontWeight: 600, fontSize: "0.85rem", marginBottom: "8px" }}><CheckCircle2 size={15} /> Matched Skills ({gnnResult.matchedSkills.length})</div>
            <div style={{ display: "flex", flexWrap: "wrap", gap: "5px" }}>{gnnResult.matchedSkills.map((s, i) => <span key={i} className="badge badge-emerald">{s.name}</span>)}</div>
          </div>
          <div style={{ marginBottom: "14px", background: "var(--red-light)", border: "1px solid var(--red-border)", padding: "12px", borderRadius: "var(--radius-md)" }}>
            <div style={{ display: "flex", alignItems: "center", gap: "7px", color: "var(--red)", fontWeight: 600, fontSize: "0.85rem", marginBottom: "8px" }}><AlertTriangle size={15} /> Missing ({gnnResult.missingSkills.length})</div>
            <div style={{ display: "flex", flexWrap: "wrap", gap: "5px" }}>{gnnResult.missingSkills.length > 0 ? gnnResult.missingSkills.map((s, i) => <span key={i} className="badge badge-rose">{s.name}</span>) : <span style={{ fontSize: "0.82rem", color: "var(--text-muted)" }}>None. Full coverage.</span>}</div>
          </div>
          <div style={{ background: "var(--amber-light)", border: "1px solid var(--amber-border)", padding: "12px", borderRadius: "var(--radius-md)" }}>
            <div style={{ display: "flex", alignItems: "center", gap: "7px", color: "var(--amber)", fontWeight: 600, fontSize: "0.85rem", marginBottom: "8px" }}><Zap size={15} /> Transferable Strengths</div>
            <div style={{ display: "flex", flexWrap: "wrap", gap: "5px" }}>{candidate.hardSkills.slice(0, 4).map((s, i) => <span key={i} className="badge badge-amber">{s.name}</span>)}</div>
          </div>
        </div>
      </div>

      <div className="glass-card">
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "14px" }}>
          <h3 style={{ fontSize: "1.05rem", display: "flex", alignItems: "center", gap: "7px" }}><Clock size={16} color="var(--purple)" /> Personalized Upskilling Roadmap</h3>
          <span className="badge badge-violet">Est. ~7 Weeks</span>
        </div>
        <div className="grid-3">
          {roadmap.map(item => (
            <div key={item.step} style={{ background: "var(--bg-surface)", padding: "14px", borderRadius: "var(--radius-md)", border: "1px solid var(--border-subtle)" }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "6px" }}>
                <span className="badge badge-cyan">Step {item.step}</span>
                <span style={{ fontSize: "0.72rem", color: "var(--text-muted)" }}>{item.duration}</span>
              </div>
              <h4 style={{ fontSize: "0.92rem", marginBottom: "4px" }}>{item.title}</h4>
              <p style={{ fontSize: "0.78rem", color: "var(--text-secondary)", marginBottom: "8px" }}>{item.focus}</p>
              <div style={{ fontSize: "0.72rem", color: "var(--green)", fontWeight: 600 }}>{item.impact}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
