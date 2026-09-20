import React, { useState } from "react";
import { Brain, Tag, Award, Briefcase, GraduationCap, Plus } from "lucide-react";

export default function ExtractionView({ candidate, job }) {
  const [newSkill, setNewSkill] = useState("");
  const [customSkills, setCustomSkills] = useState([]);
  const [activeView, setActiveView] = useState("candidate");

  const handleAddSkill = (e) => {
    e.preventDefault();
    if (!newSkill.trim()) return;
    setCustomSkills([...customSkills, { name: newSkill.trim(), level: 85, category: "Custom" }]);
    setNewSkill("");
  };

  const candidateSkills = [...candidate.hardSkills, ...customSkills];

  return (
    <div className="animate-fade-in">
      <div style={{ marginBottom: "20px" }}>
        <h2 style={{ fontSize: "1.35rem", marginBottom: "6px" }}>Phase 1: LLM-Based Information Extraction</h2>
        <p style={{ fontSize: "0.88rem" }}>
          Transforms unstructured text into structured entities (Skills, Experience, Education, Certifications) for graph construction.
        </p>
      </div>

      <div style={{ display: "flex", gap: "8px", marginBottom: "18px" }}>
        {[
          { key: "candidate", icon: <GraduationCap size={14} />, label: `Candidate Entities (${candidate.name})` },
          { key: "job", icon: <Briefcase size={14} />, label: `Job Requirements (${job.title})` },
          { key: "prompt", icon: <Brain size={14} />, label: "LLM Prompt Schema" }
        ].map(t => (
          <button key={t.key} onClick={() => setActiveView(t.key)}
            className={`tab-btn ${activeView === t.key ? "active active-phase1" : ""}`}>
            {t.icon} {t.label}
          </button>
        ))}
      </div>

      {activeView === "candidate" && (
        <div className="grid-2">
          <div className="glass-card">
            <h3 style={{ fontSize: "1.05rem", marginBottom: "14px", display: "flex", alignItems: "center", gap: "7px" }}>
              <Tag size={16} color="var(--primary)" /> Extracted Hard Skills & Proficiency
            </h3>
            <div style={{ display: "flex", flexWrap: "wrap", gap: "8px", marginBottom: "18px" }}>
              {candidateSkills.map((s, idx) => (
                <div key={idx} style={{
                  background: "var(--bg-surface)", border: "1px solid var(--border-subtle)",
                  padding: "5px 12px", borderRadius: "var(--radius-md)", display: "flex",
                  alignItems: "center", gap: "8px", fontSize: "0.82rem"
                }}>
                  <span style={{ color: "var(--primary)", fontWeight: 500 }}>{s.name}</span>
                  <span style={{ fontSize: "0.7rem", color: "var(--text-muted)", background: "var(--bg-surface-hover)", padding: "1px 6px", borderRadius: "4px" }}>
                    {s.level}%
                  </span>
                </div>
              ))}
            </div>

            <form onSubmit={handleAddSkill} style={{ display: "flex", gap: "8px" }}>
              <input type="text" value={newSkill} onChange={e => setNewSkill(e.target.value)}
                placeholder="Add custom skill..." className="form-input" style={{ fontSize: "0.82rem" }} />
              <button type="submit" className="btn-secondary" style={{ padding: "8px 14px", whiteSpace: "nowrap" }}>
                <Plus size={14} /> Add
              </button>
            </form>

            <h4 style={{ fontSize: "0.92rem", marginTop: "22px", marginBottom: "10px", color: "var(--text-secondary)" }}>
              Extracted Soft Skills
            </h4>
            <div style={{ display: "flex", flexWrap: "wrap", gap: "6px" }}>
              {candidate.softSkills.map((s, idx) => (
                <span key={idx} className="badge badge-violet">{s}</span>
              ))}
            </div>
          </div>

          <div className="glass-card">
            <h3 style={{ fontSize: "1.05rem", marginBottom: "14px", display: "flex", alignItems: "center", gap: "7px" }}>
              <Award size={16} color="var(--amber)" /> Education & Seniority
            </h3>

            {[
              { label: "Degree & Institution", main: candidate.education.degree, sub: `${candidate.education.school} · Graduated ${candidate.education.graduationYear} (GPA: ${candidate.education.gpa})`, color: "var(--primary)" },
              { label: "Total Experience", main: `${candidate.yearsExperience} Years Professional Tenure`, sub: `Primary Domain: ${candidate.domain}`, color: "var(--green)" }
            ].map((item, idx) => (
              <div key={idx} style={{ background: "var(--bg-surface)", padding: "14px", borderRadius: "var(--radius-md)", border: "1px solid var(--border-subtle)", marginBottom: "12px" }}>
                <div style={{ fontSize: "0.72rem", textTransform: "uppercase", color: "var(--text-muted)", marginBottom: "3px" }}>{item.label}</div>
                <div style={{ fontSize: idx === 1 ? "1.1rem" : "0.95rem", fontWeight: 600, color: item.color }}>{item.main}</div>
                <div style={{ fontSize: "0.82rem", color: "var(--text-secondary)", marginTop: "2px" }}>{item.sub}</div>
              </div>
            ))}

            <div style={{ background: "var(--bg-surface)", padding: "14px", borderRadius: "var(--radius-md)", border: "1px solid var(--border-subtle)" }}>
              <div style={{ fontSize: "0.72rem", textTransform: "uppercase", color: "var(--text-muted)", marginBottom: "4px" }}>Work Experience</div>
              {candidate.experienceHistory.map((exp, idx) => (
                <div key={idx} style={{ marginTop: idx > 0 ? "10px" : "2px" }}>
                  <div style={{ fontSize: "0.88rem", fontWeight: 600, color: "var(--text-primary)" }}>{exp.role} @ {exp.company}</div>
                  <div style={{ fontSize: "0.72rem", color: "var(--text-muted)" }}>{exp.period}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {activeView === "job" && (
        <div className="grid-2">
          <div className="glass-card">
            <h3 style={{ fontSize: "1.05rem", marginBottom: "14px", display: "flex", alignItems: "center", gap: "7px" }}>
              <Briefcase size={16} color="var(--purple)" /> Required Skills ({job.requiredSkills.length})
            </h3>
            <div style={{ display: "flex", flexWrap: "wrap", gap: "8px", marginBottom: "18px" }}>
              {job.requiredSkills.map((s, idx) => (
                <div key={idx} style={{
                  background: "var(--bg-surface)", border: "1px solid var(--purple-border)",
                  padding: "5px 12px", borderRadius: "var(--radius-md)", fontSize: "0.82rem",
                  display: "flex", alignItems: "center", gap: "6px"
                }}>
                  <span style={{ color: "var(--purple)", fontWeight: 500 }}>{s.name}</span>
                  <span style={{ fontSize: "0.68rem", color: "var(--text-muted)" }}>W: {s.weight}</span>
                </div>
              ))}
            </div>
            <h4 style={{ fontSize: "0.92rem", marginBottom: "10px", color: "var(--text-secondary)" }}>Preferred Skills</h4>
            <div style={{ display: "flex", flexWrap: "wrap", gap: "6px" }}>
              {job.preferredSkills.map((s, idx) => (<span key={idx} className="badge badge-cyan">{s.name}</span>))}
            </div>
          </div>
          <div className="glass-card">
            <h3 style={{ fontSize: "1.05rem", marginBottom: "14px" }}>Job Parameters</h3>
            {[
              { label: "Minimum Seniority", value: `${job.minExperience}+ Years`, color: "var(--amber)" },
              { label: "Education Requirement", value: job.minDegree, color: "var(--text-primary)" },
              { label: "Department & Location", value: `${job.department} · ${job.location}`, color: "var(--primary)" }
            ].map((p, idx) => (
              <div key={idx} style={{ background: "var(--bg-surface)", padding: "12px", borderRadius: "var(--radius-md)", border: "1px solid var(--border-subtle)", marginBottom: "10px" }}>
                <div style={{ fontSize: "0.72rem", color: "var(--text-muted)" }}>{p.label}</div>
                <div style={{ fontSize: "0.95rem", fontWeight: 600, color: p.color }}>{p.value}</div>
              </div>
            ))}
          </div>
        </div>
      )}

      {activeView === "prompt" && (
        <div className="glass-card">
          <h3 style={{ fontSize: "1.05rem", marginBottom: "10px" }}>LLM Extraction Prompt & Schema</h3>
          <p style={{ fontSize: "0.82rem", color: "var(--text-secondary)", marginBottom: "14px" }}>
            The authors use few-shot structured prompting with frontier LLMs for consistent entity extraction:
          </p>
          <pre style={{
            background: "var(--bg-surface)", padding: "18px", borderRadius: "var(--radius-md)",
            border: "1px solid var(--border-subtle)", fontSize: "0.8rem", color: "var(--text-primary)",
            overflowX: "auto", lineHeight: 1.6
          }}>
{`SYSTEM: You are an expert HR ontology entity extractor.
TASK: Extract entities from the following recruitment document.

OUTPUT SCHEMA:
{
  "entities": {
    "hard_skills": [ {"name": string, "category": string, "proficiency": int} ],
    "soft_skills": [ string ],
    "experience_years": number,
    "degree": string,
    "school": string,
    "domain": string,
    "roles": [ {"title": string, "company": string, "tenure": string} ]
  }
}

RULES:
1. Normalize synonyms (e.g., "PyTorch-Geometric" → "PyTorch Geometric").
2. Separate required vs preferred qualifications.
3. Compute experience duration accurately.`}
          </pre>
        </div>
      )}
    </div>
  );
}
