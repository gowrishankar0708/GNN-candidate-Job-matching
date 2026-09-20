import React, { useState } from "react";
import { UserCheck, Briefcase, FileText, ArrowRight, Printer, Sparkles, TrendingUp, ShieldCheck, Zap } from "lucide-react";
import { calculateGnnMatch } from "../../utils/gnnSimulator";
import { runMultiAgentEvaluation } from "../../utils/agentEngine";
import RadarChart from "../common/RadarChart";
import DossierModal from "../common/DossierModal";

export default function DashboardView({
  candidate,
  job,
  persona,
  onSwitchPersona,
  onNavigateModule
}) {
  const [isDossierOpen, setIsDossierOpen] = useState(false);

  const gnnResult = calculateGnnMatch(candidate, job);
  const agentData = runMultiAgentEvaluation(candidate, job, gnnResult);

  return (
    <div className="animate-fade-in">
      {/* Header with Persona Switcher */}
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "20px", flexWrap: "wrap", gap: "12px" }}>
        <div>
          <h2 style={{ fontSize: "1.4rem", marginBottom: "4px" }}>
            Phase 2: Unified Recruitment Intelligence Dashboard
          </h2>
          <p style={{ fontSize: "0.9rem" }}>
            Real-time integration of Inductive GNN matching, Multi-Agent consensus, Graph RAG, and candidate optimization.
          </p>
        </div>

        {/* Persona Toggle */}
        <div style={{ display: "flex", alignItems: "center", background: "var(--bg-surface)", padding: "4px", borderRadius: "var(--radius-full)", border: "1px solid var(--border-medium)" }}>
          <button
            onClick={() => onSwitchPersona("recruiter")}
            style={{
              padding: "6px 14px",
              borderRadius: "var(--radius-full)",
              fontSize: "0.8rem",
              fontWeight: 600,
              display: "flex",
              alignItems: "center",
              gap: "6px",
              background: persona === "recruiter" ? "var(--violet-primary)" : "transparent",
              color: persona === "recruiter" ? "white" : "var(--text-secondary)",
              cursor: "pointer"
            }}
          >
            <Briefcase size={13} /> Recruiter View
          </button>
          <button
            onClick={() => onSwitchPersona("candidate")}
            style={{
              padding: "6px 14px",
              borderRadius: "var(--radius-full)",
              fontSize: "0.8rem",
              fontWeight: 600,
              display: "flex",
              alignItems: "center",
              gap: "6px",
              background: persona === "candidate" ? "var(--cyan-primary)" : "transparent",
              color: persona === "candidate" ? "#090d16" : "var(--text-secondary)",
              cursor: "pointer"
            }}
          >
            <UserCheck size={13} /> Candidate View
          </button>
        </div>
      </div>

      {/* Hero Match Banner */}
      <div className="glass-card" style={{
        marginBottom: "24px",
        background: "linear-gradient(135deg, rgba(14, 20, 36, 0.95) 0%, rgba(21, 30, 52, 0.95) 100%)",
        border: "1px solid var(--border-medium)",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        flexWrap: "wrap",
        gap: "20px"
      }}>
        <div style={{ display: "flex", alignItems: "center", gap: "20px" }}>
          <img
            src={candidate.avatar}
            alt={candidate.name}
            style={{ width: "64px", height: "64px", borderRadius: "50%", objectFit: "cover", border: "2px solid var(--cyan-primary)" }}
          />
          <div>
            <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
              <h3 style={{ fontSize: "1.3rem" }}>{candidate.name}</h3>
              <span className="badge badge-cyan">{candidate.yearsExperience} yrs exp</span>
            </div>
            <p style={{ fontSize: "0.9rem", color: "var(--cyan-primary)" }}>{candidate.currentTitle}</p>
            <div style={{ fontSize: "0.8rem", color: "var(--text-muted)", marginTop: "2px" }}>
              Matching for <strong style={{ color: "var(--text-primary)" }}>{job.title}</strong> @ <strong style={{ color: "var(--violet-primary)" }}>{job.company}</strong>
            </div>
          </div>
        </div>

        {/* Score & Action Button */}
        <div style={{ display: "flex", alignItems: "center", gap: "24px" }}>
          <div style={{ textAlign: "right" }}>
            <div style={{ fontSize: "2.4rem", fontWeight: 800, color: "var(--cyan-primary)", lineHeight: 1 }}>
              {gnnResult.matchScore}%
            </div>
            <div style={{ fontSize: "0.75rem", textTransform: "uppercase", color: "var(--text-muted)", marginTop: "4px" }}>
              Inductive GNN Fit
            </div>
          </div>

          <button
            onClick={() => setIsDossierOpen(true)}
            className="btn-primary"
            style={{ padding: "12px 20px" }}
          >
            <Printer size={16} /> Export Match Dossier
          </button>
        </div>
      </div>

      {/* Recruiter View Layout */}
      {persona === "recruiter" && (
        <div className="grid-3" style={{ marginBottom: "24px" }}>
          {/* Quick Screen Verdict */}
          <div className="glass-card">
            <h4 style={{ fontSize: "1rem", marginBottom: "10px", display: "flex", alignItems: "center", gap: "6px" }}>
              <ShieldCheck size={16} color="var(--emerald-primary)" />
              Automated Screener Verdict
            </h4>
            <div style={{ fontSize: "1.2rem", fontWeight: 700, color: agentData.consensus.badgeColor, marginBottom: "8px" }}>
              {agentData.consensus.recommendation}
            </div>
            <p style={{ fontSize: "0.82rem", color: "var(--text-secondary)", marginBottom: "14px" }}>
              {agentData.consensus.summary}
            </p>
            <button
              onClick={() => onNavigateModule("multiagent")}
              className="btn-secondary"
              style={{ width: "100%", padding: "8px", fontSize: "0.8rem" }}
            >
              Inspect Agent Deliberation →
            </button>
          </div>

          {/* Springer Benchmark Contrast */}
          <div className="glass-card">
            <h4 style={{ fontSize: "1rem", marginBottom: "10px", display: "flex", alignItems: "center", gap: "6px" }}>
              <TrendingUp size={16} color="var(--cyan-primary)" />
              Model Benchmark vs Baselines
            </h4>
            <div style={{ display: "flex", flexDirection: "column", gap: "8px", marginBottom: "14px", fontSize: "0.8rem" }}>
              <div style={{ display: "flex", justifyContent: "space-between" }}>
                <span>Inductive GNN (Ours):</span>
                <strong style={{ color: "var(--cyan-primary)" }}>{gnnResult.matchScore}%</strong>
              </div>
              <div style={{ display: "flex", justifyContent: "space-between" }}>
                <span>MLP Baseline:</span>
                <strong style={{ color: "var(--violet-primary)" }}>{gnnResult.mlpBaselineScore}%</strong>
              </div>
              <div style={{ display: "flex", justifyContent: "space-between" }}>
                <span>Cosine Similarity:</span>
                <strong style={{ color: "var(--text-muted)" }}>{gnnResult.cosineBaselineScore}%</strong>
              </div>
            </div>
            <button
              onClick={() => onNavigateModule("benchmark")}
              className="btn-secondary"
              style={{ width: "100%", padding: "8px", fontSize: "0.8rem" }}
            >
              View Full Paper Results →
            </button>
          </div>

          {/* Interview Pack Launcher */}
          <div className="glass-card">
            <h4 style={{ fontSize: "1rem", marginBottom: "10px", display: "flex", alignItems: "center", gap: "6px" }}>
              <FileText size={16} color="var(--amber-primary)" />
              Personalized Interview Pack
            </h4>
            <p style={{ fontSize: "0.82rem", color: "var(--text-secondary)", marginBottom: "14px" }}>
              4 tailored questions generated addressing candidate's background at {candidate.experienceHistory[0]?.company || 'past firms'} and {job.title} requirements.
            </p>
            <button
              onClick={() => onNavigateModule("interview")}
              className="btn-secondary"
              style={{ width: "100%", padding: "8px", fontSize: "0.8rem" }}
            >
              Open Interviewer Guide →
            </button>
          </div>
        </div>
      )}

      {/* Candidate View Layout */}
      {persona === "candidate" && (
        <div className="grid-3" style={{ marginBottom: "24px" }}>
          {/* ATS Resume Health */}
          <div className="glass-card">
            <h4 style={{ fontSize: "1rem", marginBottom: "10px", display: "flex", alignItems: "center", gap: "6px" }}>
              <FileText size={16} color="var(--cyan-primary)" />
              ATS Resume Compatibility
            </h4>
            <div style={{ fontSize: "1.8rem", fontWeight: 800, color: "var(--cyan-primary)", marginBottom: "4px" }}>
              {candidate.atsScore || 92} / 100
            </div>
            <p style={{ fontSize: "0.82rem", color: "var(--text-secondary)", marginBottom: "14px" }}>
              3 bullet points can be polished into Google XYZ format for maximum impact.
            </p>
            <button
              onClick={() => onNavigateModule("resume")}
              className="btn-secondary"
              style={{ width: "100%", padding: "8px", fontSize: "0.8rem" }}
            >
              Enhance Resume Bullets →
            </button>
          </div>

          {/* Competency Gap & Upskilling */}
          <div className="glass-card">
            <h4 style={{ fontSize: "1rem", marginBottom: "10px", display: "flex", alignItems: "center", gap: "6px" }}>
              <Zap size={16} color="var(--amber-primary)" />
              Skill Gap & Learning Path
            </h4>
            <div style={{ fontSize: "0.85rem", color: "var(--text-secondary)", marginBottom: "8px" }}>
              Matched Skills: <strong style={{ color: "var(--emerald-primary)" }}>{gnnResult.matchedSkills.length}</strong>
            </div>
            <div style={{ fontSize: "0.85rem", color: "var(--text-secondary)", marginBottom: "14px" }}>
              Missing Requirements: <strong style={{ color: "var(--rose-primary)" }}>{gnnResult.missingSkills.length}</strong>
            </div>
            <button
              onClick={() => onNavigateModule("gap")}
              className="btn-secondary"
              style={{ width: "100%", padding: "8px", fontSize: "0.8rem" }}
            >
              Explore Skill Radar & Path →
            </button>
          </div>

          {/* Interview Preparation */}
          <div className="glass-card">
            <h4 style={{ fontSize: "1rem", marginBottom: "10px", display: "flex", alignItems: "center", gap: "6px" }}>
              <Sparkles size={16} color="var(--violet-primary)" />
              Prepare for {job.company}
            </h4>
            <p style={{ fontSize: "0.82rem", color: "var(--text-secondary)", marginBottom: "14px" }}>
              Practice technical questions and system design challenges expected for this role.
            </p>
            <button
              onClick={() => onNavigateModule("interview")}
              className="btn-secondary"
              style={{ width: "100%", padding: "8px", fontSize: "0.8rem" }}
            >
              Practice Interview Questions →
            </button>
          </div>
        </div>
      )}

      {/* Radar Gap & Fast Overview */}
      <div className="grid-2">
        <div className="glass-card">
          <h4 style={{ fontSize: "1.05rem", marginBottom: "12px" }}>Candidate vs Job Radar Matrix</h4>
          <RadarChart candidate={candidate} job={job} size={300} />
        </div>

        <div className="glass-card">
          <h4 style={{ fontSize: "1.05rem", marginBottom: "12px" }}>Inductive GNN Subgraph Summary</h4>
          <p style={{ fontSize: "0.85rem", color: "var(--text-secondary)", lineHeight: 1.6, marginBottom: "16px" }}>
            The Inductive Graph Neural Network evaluated <strong>{candidate.name}</strong> across 2-hop neighborhood message passing. Key drivers include strong relational alignment in <strong>{candidate.domain}</strong> and verified competency in {candidate.hardSkills.slice(0, 3).map(s => s.name).join(", ")}.
          </p>

          <div style={{ background: "var(--bg-surface)", padding: "14px", borderRadius: "var(--radius-md)", border: "1px solid var(--border-subtle)", marginBottom: "16px" }}>
            <div style={{ fontSize: "0.75rem", textTransform: "uppercase", color: "var(--text-muted)", marginBottom: "4px" }}>
              Target Job Overview
            </div>
            <div style={{ fontSize: "0.95rem", fontWeight: 600, color: "var(--text-primary)" }}>
              {job.title} — {job.company}
            </div>
            <div style={{ fontSize: "0.8rem", color: "var(--cyan-primary)" }}>
              {job.salaryRange} • {job.location}
            </div>
          </div>

          <button
            onClick={() => setIsDossierOpen(true)}
            className="btn-primary"
            style={{ width: "100%", padding: "10px" }}
          >
            Open Full Evaluation Dossier
          </button>
        </div>
      </div>

      {/* Dossier Modal */}
      <DossierModal
        isOpen={isDossierOpen}
        onClose={() => setIsDossierOpen(false)}
        candidate={candidate}
        job={job}
        gnnResult={gnnResult}
        agentData={agentData}
      />
    </div>
  );
}
