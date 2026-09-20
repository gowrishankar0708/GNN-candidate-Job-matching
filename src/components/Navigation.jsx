import React from "react";
import { Network, User, Briefcase } from "lucide-react";
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
      background: "rgba(255, 255, 255, 0.95)",
      backdropFilter: "blur(8px)",
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
        {/* Brand */}
        <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
          <div style={{
            width: "36px",
            height: "36px",
            borderRadius: "var(--radius-md)",
            background: "var(--primary)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            color: "white"
          }}>
            <Network size={20} />
          </div>
          <div>
            <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
              <span style={{ fontFamily: "var(--font-heading)", fontWeight: 700, fontSize: "1.05rem", color: "var(--text-primary)" }}>
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

        {/* Global Selectors */}
        <div style={{ display: "flex", alignItems: "center", gap: "12px", flexWrap: "wrap" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
            <User size={14} color="var(--primary)" />
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

          <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
            <Briefcase size={14} color="var(--purple)" />
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

          {/* Phase Toggle */}
          <div style={{ display: "flex", background: "var(--bg-surface)", padding: "3px", borderRadius: "var(--radius-md)", border: "1px solid var(--border-subtle)" }}>
            <button
              onClick={() => onSelectPhase(1)}
              style={{
                padding: "6px 12px",
                borderRadius: "var(--radius-sm)",
                fontSize: "0.78rem",
                fontWeight: activePhase === 1 ? 600 : 400,
                background: activePhase === 1 ? "var(--primary-light)" : "transparent",
                color: activePhase === 1 ? "var(--primary)" : "var(--text-secondary)",
                border: activePhase === 1 ? "1px solid var(--primary-border)" : "1px solid transparent",
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
                fontWeight: activePhase === 2 ? 600 : 400,
                background: activePhase === 2 ? "var(--purple-light)" : "transparent",
                color: activePhase === 2 ? "var(--purple)" : "var(--text-secondary)",
                border: activePhase === 2 ? "1px solid var(--purple-border)" : "1px solid transparent",
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
