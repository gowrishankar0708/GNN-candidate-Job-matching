import React from "react";
import { Network, User, Briefcase, ChevronDown, Sparkles } from "lucide-react";
import { CANDIDATES_DATA } from "../data/candidatesData";
import { JOBS_DATA } from "../data/jobsData";

export default function Navigation({
  activeCandidate,
  onSelectCandidate,
  activeJob,
  onSelectJob,
  activePhase,
  onSelectPhase,
  persona,
  onTogglePersona
}) {
  return (
    <header style={{
      position: "sticky",
      top: 0,
      zIndex: 100,
      background: "rgba(9, 13, 22, 0.85)",
      backdropFilter: "blur(16px)",
      WebkitBackdropFilter: "blur(16px)",
      borderBottom: "1px solid var(--border-subtle)",
      padding: "12px 24px",
      marginBottom: "24px"
    }}>
      <div style={{
        maxWidth: "1400px",
        margin: "0 auto",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        flexWrap: "wrap",
        gap: "14px"
      }}>
        {/* Brand & Springer 2025 Tag */}
        <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
          <div style={{
            width: "36px",
            height: "36px",
            borderRadius: "var(--radius-md)",
            background: "linear-gradient(135deg, var(--cyan-primary) 0%, var(--violet-primary) 100%)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            color: "white",
            boxShadow: "0 0 16px rgba(6, 182, 212, 0.35)"
          }}>
            <Network size={20} />
          </div>

          <div>
            <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
              <span style={{ fontFamily: "var(--font-heading)", fontWeight: 800, fontSize: "1.1rem", color: "var(--text-primary)" }}>
                GNN Candidate-Job Matching
              </span>
              <span className="badge badge-cyan" style={{ fontSize: "0.65rem", padding: "2px 8px" }}>
                Springer 2025
              </span>
            </div>
            <div style={{ fontSize: "0.72rem", color: "var(--text-muted)" }}>
              Data Science and Engineering • Inductive Learning Engine
            </div>
          </div>
        </div>

        {/* Global Selectors: Candidate & Job */}
        <div style={{ display: "flex", alignItems: "center", gap: "12px", flexWrap: "wrap" }}>
          {/* Candidate Dropdown */}
          <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
            <User size={14} color="var(--cyan-primary)" />
            <select
              value={activeCandidate.id}
              onChange={e => {
                const found = CANDIDATES_DATA.find(c => c.id === e.target.value);
                if (found) onSelectCandidate(found);
              }}
              className="form-select"
              style={{ width: "190px", padding: "6px 10px", fontSize: "0.82rem" }}
            >
              {CANDIDATES_DATA.map(c => (
                <option key={c.id} value={c.id}>
                  {c.name} ({c.currentTitle.split(" ")[0]}...)
                </option>
              ))}
            </select>
          </div>

          {/* Job Dropdown */}
          <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
            <Briefcase size={14} color="var(--violet-primary)" />
            <select
              value={activeJob.id}
              onChange={e => {
                const found = JOBS_DATA.find(j => j.id === e.target.value);
                if (found) onSelectJob(found);
              }}
              className="form-select"
              style={{ width: "210px", padding: "6px 10px", fontSize: "0.82rem" }}
            >
              {JOBS_DATA.map(j => (
                <option key={j.id} value={j.id}>
                  {j.company} - {j.title.slice(0, 18)}...
                </option>
              ))}
            </select>
          </div>

          {/* Phase 1 vs Phase 2 Toggle */}
          <div style={{ display: "flex", background: "var(--bg-surface)", padding: "3px", borderRadius: "var(--radius-md)", border: "1px solid var(--border-subtle)" }}>
            <button
              onClick={() => onSelectPhase(1)}
              style={{
                padding: "6px 12px",
                borderRadius: "var(--radius-sm)",
                fontSize: "0.78rem",
                fontWeight: activePhase === 1 ? 700 : 500,
                background: activePhase === 1 ? "rgba(6, 182, 212, 0.2)" : "transparent",
                color: activePhase === 1 ? "var(--cyan-primary)" : "var(--text-secondary)",
                border: activePhase === 1 ? "1px solid var(--cyan-primary)" : "1px solid transparent",
                cursor: "pointer"
              }}
            >
              Phase 1: Paper
            </button>
            <button
              onClick={() => onSelectPhase(2)}
              style={{
                padding: "6px 12px",
                borderRadius: "var(--radius-sm)",
                fontSize: "0.78rem",
                fontWeight: activePhase === 2 ? 700 : 500,
                background: activePhase === 2 ? "rgba(139, 92, 246, 0.2)" : "transparent",
                color: activePhase === 2 ? "var(--violet-primary)" : "var(--text-secondary)",
                border: activePhase === 2 ? "1px solid var(--violet-primary)" : "1px solid transparent",
                cursor: "pointer"
              }}
            >
              Phase 2: Enhancements
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}
