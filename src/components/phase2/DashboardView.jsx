import React, { useState } from "react";
import { UserCheck, Briefcase, FileText, Printer, Sparkles, TrendingUp, ShieldCheck, Zap } from "lucide-react";
import { calculateGnnMatch } from "../../utils/gnnSimulator";
import { runMultiAgentEvaluation } from "../../utils/agentEngine";
import RadarChart from "../common/RadarChart";
import DossierModal from "../common/DossierModal";

export default function DashboardView({ candidate, job, persona, onSwitchPersona, onNavigateModule }) {
  const [isDossierOpen, setIsDossierOpen] = useState(false);
  const gnnResult = calculateGnnMatch(candidate, job);
  const agentData = runMultiAgentEvaluation(candidate, job, gnnResult);

  return (
    <div className="animate-fade-in">
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "20px", flexWrap: "wrap", gap: "12px" }}>
        <div>
          <h2 style={{ fontSize: "1.35rem", marginBottom: "4px" }}>Phase 2: Unified Recruitment Dashboard</h2>
          <p style={{ fontSize: "0.88rem" }}>Real-time GNN matching, Multi-Agent consensus, and candidate optimization.</p>
        </div>
        <div style={{ display: "flex", background: "var(--bg-surface)", padding: "3px", borderRadius: "var(--radius-full)", border: "1px solid var(--border-subtle)" }}>
          <button onClick={() => onSwitchPersona("recruiter")} style={{ padding: "6px 14px", borderRadius: "var(--radius-full)", fontSize: "0.78rem", fontWeight: 600, display: "flex", alignItems: "center", gap: "5px", background: persona === "recruiter" ? "var(--primary)" : "transparent", color: persona === "recruiter" ? "white" : "var(--text-secondary)", cursor: "pointer" }}>
            <Briefcase size={12} /> Recruiter
          </button>
          <button onClick={() => onSwitchPersona("candidate")} style={{ padding: "6px 14px", borderRadius: "var(--radius-full)", fontSize: "0.78rem", fontWeight: 600, display: "flex", alignItems: "center", gap: "5px", background: persona === "candidate" ? "var(--primary)" : "transparent", color: persona === "candidate" ? "white" : "var(--text-secondary)", cursor: "pointer" }}>
            <UserCheck size={12} /> Candidate
          </button>
        </div>
      </div>

      {/* Match Banner */}
      <div className="glass-card" style={{ marginBottom: "20px", display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: "18px" }}>
        <div style={{ display: "flex", alignItems: "center", gap: "18px" }}>
          <img src={candidate.avatar} alt="" style={{ width: "58px", height: "58px", borderRadius: "50%", objectFit: "cover", border: "2px solid var(--primary-border)" }} />
          <div>
            <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
              <h3 style={{ fontSize: "1.2rem" }}>{candidate.name}</h3>
              <span className="badge badge-cyan">{candidate.yearsExperience} yrs</span>
            </div>
            <p style={{ fontSize: "0.85rem", color: "var(--primary)" }}>{candidate.currentTitle}</p>
            <div style={{ fontSize: "0.78rem", color: "var(--text-muted)", marginTop: "2px" }}>→ <strong>{job.title}</strong> @ <strong style={{ color: "var(--purple)" }}>{job.company}</strong></div>
          </div>
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: "20px" }}>
          <div style={{ textAlign: "right" }}>
            <div style={{ fontSize: "2.2rem", fontWeight: 800, color: "var(--primary)", lineHeight: 1 }}>{gnnResult.matchScore}%</div>
            <div style={{ fontSize: "0.72rem", textTransform: "uppercase", color: "var(--text-muted)" }}>GNN Fit</div>
          </div>
          <button onClick={() => setIsDossierOpen(true)} className="btn-primary" style={{ padding: "10px 18px" }}><Printer size={15} /> Export Dossier</button>
        </div>
      </div>

      {/* Cards grid */}
      <div className="grid-3" style={{ marginBottom: "20px" }}>
        {persona === "recruiter" ? (
          <>
            <div className="glass-card">
              <h4 style={{ fontSize: "0.95rem", marginBottom: "8px", display: "flex", alignItems: "center", gap: "5px" }}><ShieldCheck size={15} color="var(--green)" /> Screener Verdict</h4>
              <div style={{ fontSize: "1.05rem", fontWeight: 700, color: "var(--green)", marginBottom: "6px" }}>{agentData.consensus.recommendation}</div>
              <p style={{ fontSize: "0.78rem", color: "var(--text-secondary)", marginBottom: "12px" }}>{agentData.consensus.summary}</p>
              <button onClick={() => onNavigateModule("multiagent")} className="btn-secondary" style={{ width: "100%", padding: "7px", fontSize: "0.78rem" }}>Agent Details →</button>
            </div>
            <div className="glass-card">
              <h4 style={{ fontSize: "0.95rem", marginBottom: "8px", display: "flex", alignItems: "center", gap: "5px" }}><TrendingUp size={15} color="var(--primary)" /> Benchmarks</h4>
              <div style={{ fontSize: "0.78rem", color: "var(--text-secondary)", marginBottom: "12px" }}>
                {[{ l: "GNN (Ours)", v: gnnResult.matchScore, c: "var(--primary)" }, { l: "MLP Baseline", v: gnnResult.mlpBaselineScore, c: "var(--purple)" }, { l: "Cosine Sim", v: gnnResult.cosineBaselineScore, c: "var(--text-muted)" }].map((m, i) => (
                  <div key={i} style={{ display: "flex", justifyContent: "space-between", marginBottom: "4px" }}><span>{m.l}:</span><strong style={{ color: m.c }}>{m.v}%</strong></div>
                ))}
              </div>
              <button onClick={() => onNavigateModule("benchmark")} className="btn-secondary" style={{ width: "100%", padding: "7px", fontSize: "0.78rem" }}>Paper Results →</button>
            </div>
            <div className="glass-card">
              <h4 style={{ fontSize: "0.95rem", marginBottom: "8px", display: "flex", alignItems: "center", gap: "5px" }}><FileText size={15} color="var(--amber)" /> Interview Pack</h4>
              <p style={{ fontSize: "0.78rem", color: "var(--text-secondary)", marginBottom: "12px" }}>4 tailored questions for {candidate.name} targeting {job.title}.</p>
              <button onClick={() => onNavigateModule("interview")} className="btn-secondary" style={{ width: "100%", padding: "7px", fontSize: "0.78rem" }}>Open Guide →</button>
            </div>
          </>
        ) : (
          <>
            <div className="glass-card">
              <h4 style={{ fontSize: "0.95rem", marginBottom: "8px", display: "flex", alignItems: "center", gap: "5px" }}><FileText size={15} color="var(--primary)" /> ATS Resume Score</h4>
              <div style={{ fontSize: "1.6rem", fontWeight: 800, color: "var(--primary)", marginBottom: "4px" }}>{candidate.atsScore || 92}/100</div>
              <p style={{ fontSize: "0.78rem", color: "var(--text-secondary)", marginBottom: "12px" }}>3 bullets can be polished with Google XYZ formula.</p>
              <button onClick={() => onNavigateModule("resume")} className="btn-secondary" style={{ width: "100%", padding: "7px", fontSize: "0.78rem" }}>Enhance Resume →</button>
            </div>
            <div className="glass-card">
              <h4 style={{ fontSize: "0.95rem", marginBottom: "8px", display: "flex", alignItems: "center", gap: "5px" }}><Zap size={15} color="var(--amber)" /> Skill Gap</h4>
              <div style={{ fontSize: "0.82rem", color: "var(--text-secondary)", marginBottom: "4px" }}>Matched: <strong style={{ color: "var(--green)" }}>{gnnResult.matchedSkills.length}</strong></div>
              <div style={{ fontSize: "0.82rem", color: "var(--text-secondary)", marginBottom: "12px" }}>Missing: <strong style={{ color: "var(--red)" }}>{gnnResult.missingSkills.length}</strong></div>
              <button onClick={() => onNavigateModule("gap")} className="btn-secondary" style={{ width: "100%", padding: "7px", fontSize: "0.78rem" }}>Skill Radar →</button>
            </div>
            <div className="glass-card">
              <h4 style={{ fontSize: "0.95rem", marginBottom: "8px", display: "flex", alignItems: "center", gap: "5px" }}><Sparkles size={15} color="var(--purple)" /> Interview Prep</h4>
              <p style={{ fontSize: "0.78rem", color: "var(--text-secondary)", marginBottom: "12px" }}>Practice technical and behavioral questions for {job.company}.</p>
              <button onClick={() => onNavigateModule("interview")} className="btn-secondary" style={{ width: "100%", padding: "7px", fontSize: "0.78rem" }}>Practice →</button>
            </div>
          </>
        )}
      </div>

      <div className="grid-2">
        <div className="glass-card">
          <h4 style={{ fontSize: "1rem", marginBottom: "10px" }}>Competency Radar</h4>
          <RadarChart candidate={candidate} job={job} size={300} />
        </div>
        <div className="glass-card">
          <h4 style={{ fontSize: "1rem", marginBottom: "10px" }}>GNN Subgraph Summary</h4>
          <p style={{ fontSize: "0.82rem", color: "var(--text-secondary)", lineHeight: 1.6, marginBottom: "14px" }}>
            The Inductive GNN evaluated <strong>{candidate.name}</strong> across 2-hop message passing. Key drivers: <strong>{candidate.domain}</strong> alignment and proficiency in {candidate.hardSkills.slice(0, 3).map(s => s.name).join(", ")}.
          </p>
          <div style={{ background: "var(--bg-surface)", padding: "12px", borderRadius: "var(--radius-md)", border: "1px solid var(--border-subtle)", marginBottom: "14px" }}>
            <div style={{ fontSize: "0.72rem", textTransform: "uppercase", color: "var(--text-muted)", marginBottom: "3px" }}>Target Job</div>
            <div style={{ fontSize: "0.92rem", fontWeight: 600 }}>{job.title} — {job.company}</div>
            <div style={{ fontSize: "0.78rem", color: "var(--primary)" }}>{job.salaryRange} · {job.location}</div>
          </div>
          <button onClick={() => setIsDossierOpen(true)} className="btn-primary" style={{ width: "100%", padding: "10px" }}>Open Full Dossier</button>
        </div>
      </div>

      <DossierModal isOpen={isDossierOpen} onClose={() => setIsDossierOpen(false)} candidate={candidate} job={job} gnnResult={gnnResult} agentData={agentData} />
    </div>
  );
}
