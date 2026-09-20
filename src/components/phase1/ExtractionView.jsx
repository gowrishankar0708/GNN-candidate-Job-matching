import React, { useState } from "react";
import { Brain, Tag, Award, Briefcase, GraduationCap, Plus, Check } from "lucide-react";

export default function ExtractionView({ candidate, job }) {
  const [newSkill, setNewSkill] = useState("");
  const [customSkills, setCustomSkills] = useState([]);
  const [activeView, setActiveView] = useState("candidate"); // candidate, job, prompt

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
        <h2 style={{ fontSize: "1.4rem", marginBottom: "6px" }}>Phase 1: LLM-Based Information Extraction</h2>
        <p style={{ fontSize: "0.9rem" }}>
          Transforms unstructured textual tokens into rich structured entities (Hard Skills, Soft Skills, Experience Timelines, Education, Certifications) to serve as attributes and nodes for graph construction.
        </p>
      </div>

      {/* Selector Tabs */}
      <div style={{ display: "flex", gap: "10px", marginBottom: "20px" }}>
        <button
          onClick={() => setActiveView("candidate")}
          className={`tab-btn ${activeView === "candidate" ? "active active-phase1" : ""}`}
        >
          <GraduationCap size={15} /> Candidate Extracted Entities ({candidate.name})
        </button>
        <button
          onClick={() => setActiveView("job")}
          className={`tab-btn ${activeView === "job" ? "active active-phase1" : ""}`}
        >
          <Briefcase size={15} /> Job Extracted Requirements ({job.title})
        </button>
        <button
          onClick={() => setActiveView("prompt")}
          className={`tab-btn ${activeView === "prompt" ? "active active-phase1" : ""}`}
        >
          <Brain size={15} /> LLM Extraction Schema & Prompt
        </button>
      </div>

      {activeView === "candidate" && (
        <div className="grid-2">
          {/* Candidate Hard & Soft Skills */}
          <div className="glass-card">
            <h3 style={{ fontSize: "1.1rem", marginBottom: "14px", display: "flex", alignItems: "center", gap: "8px" }}>
              <Tag size={18} color="var(--cyan-primary)" />
              Extracted Hard Skills & Proficiency
            </h3>
            <div style={{ display: "flex", flexWrap: "wrap", gap: "8px", marginBottom: "20px" }}>
              {candidateSkills.map((s, idx) => (
                <div
                  key={idx}
                  style={{
                    background: "var(--bg-surface)",
                    border: "1px solid var(--border-medium)",
                    padding: "6px 12px",
                    borderRadius: "var(--radius-md)",
                    display: "flex",
                    alignItems: "center",
                    gap: "8px",
                    fontSize: "0.85rem"
                  }}
                >
                  <span style={{ color: "var(--cyan-primary)", fontWeight: 500 }}>{s.name}</span>
                  <span style={{ fontSize: "0.7rem", color: "var(--text-muted)", background: "rgba(255,255,255,0.05)", padding: "2px 6px", borderRadius: "4px" }}>
                    {s.level}%
                  </span>
                </div>
              ))}
            </div>

            {/* Add Custom Skill Tag */}
            <form onSubmit={handleAddSkill} style={{ display: "flex", gap: "8px" }}>
              <input
                type="text"
                value={newSkill}
                onChange={e => setNewSkill(e.target.value)}
                placeholder="Add custom extracted skill..."
                className="form-input"
                style={{ fontSize: "0.85rem" }}
              />
              <button type="submit" className="btn-secondary" style={{ padding: "8px 14px", whiteSpace: "nowrap" }}>
                <Plus size={15} /> Add
              </button>
            </form>

            <h4 style={{ fontSize: "0.95rem", marginTop: "24px", marginBottom: "10px", color: "var(--text-secondary)" }}>
              Extracted Soft Skills & Leadership
            </h4>
            <div style={{ display: "flex", flexWrap: "wrap", gap: "6px" }}>
              {candidate.softSkills.map((s, idx) => (
                <span key={idx} className="badge badge-violet">{s}</span>
              ))}
            </div>
          </div>

          {/* Education & Experience Entities */}
          <div className="glass-card">
            <h3 style={{ fontSize: "1.1rem", marginBottom: "14px", display: "flex", alignItems: "center", gap: "8px" }}>
              <Award size={18} color="var(--amber-primary)" />
              Extracted Educational & Seniority Nodes
            </h3>

            <div style={{ background: "var(--bg-surface)", padding: "16px", borderRadius: "var(--radius-md)", border: "1px solid var(--border-subtle)", marginBottom: "16px" }}>
              <div style={{ fontSize: "0.75rem", textTransform: "uppercase", color: "var(--text-muted)", marginBottom: "4px" }}>
                Degree & Institution
              </div>
              <div style={{ fontSize: "1rem", fontWeight: 600, color: "var(--text-primary)" }}>
                {candidate.education.degree}
              </div>
              <div style={{ fontSize: "0.85rem", color: "var(--cyan-primary)" }}>
                {candidate.education.school} • Graduated {candidate.education.graduationYear} (GPA: {candidate.education.gpa})
              </div>
            </div>

            <div style={{ background: "var(--bg-surface)", padding: "16px", borderRadius: "var(--radius-md)", border: "1px solid var(--border-subtle)", marginBottom: "16px" }}>
              <div style={{ fontSize: "0.75rem", textTransform: "uppercase", color: "var(--text-muted)", marginBottom: "4px" }}>
                Total Verified Experience
              </div>
              <div style={{ fontSize: "1.2rem", fontWeight: 700, color: "var(--emerald-primary)" }}>
                {candidate.yearsExperience} Years Professional Tenure
              </div>
              <div style={{ fontSize: "0.85rem", color: "var(--text-secondary)", marginTop: "4px" }}>
                Primary Domain: {candidate.domain}
              </div>
            </div>

            <div style={{ background: "var(--bg-surface)", padding: "16px", borderRadius: "var(--radius-md)", border: "1px solid var(--border-subtle)" }}>
              <div style={{ fontSize: "0.75rem", textTransform: "uppercase", color: "var(--text-muted)", marginBottom: "4px" }}>
                Recent Work Experience Timeline
              </div>
              {candidate.experienceHistory.map((exp, idx) => (
                <div key={idx} style={{ marginTop: idx > 0 ? "10px" : "4px" }}>
                  <div style={{ fontSize: "0.9rem", fontWeight: 600, color: "var(--text-primary)" }}>
                    {exp.role} @ {exp.company}
                  </div>
                  <div style={{ fontSize: "0.75rem", color: "var(--text-muted)" }}>{exp.period}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {activeView === "job" && (
        <div className="grid-2">
          {/* Job Requirements */}
          <div className="glass-card">
            <h3 style={{ fontSize: "1.1rem", marginBottom: "14px", display: "flex", alignItems: "center", gap: "8px" }}>
              <Briefcase size={18} color="var(--violet-primary)" />
              Extracted Required Skills ({job.requiredSkills.length})
            </h3>
            <div style={{ display: "flex", flexWrap: "wrap", gap: "8px", marginBottom: "20px" }}>
              {job.requiredSkills.map((s, idx) => (
                <div
                  key={idx}
                  style={{
                    background: "var(--bg-surface)",
                    border: "1px solid rgba(139, 92, 246, 0.3)",
                    padding: "6px 12px",
                    borderRadius: "var(--radius-md)",
                    fontSize: "0.85rem",
                    display: "flex",
                    alignItems: "center",
                    gap: "6px"
                  }}
                >
                  <span style={{ color: "var(--violet-primary)", fontWeight: 500 }}>{s.name}</span>
                  <span style={{ fontSize: "0.7rem", color: "var(--text-muted)" }}>Weight: {s.weight}</span>
                </div>
              ))}
            </div>

            <h4 style={{ fontSize: "0.95rem", marginBottom: "10px", color: "var(--text-secondary)" }}>
              Preferred / Nice-to-Have Skills ({job.preferredSkills.length})
            </h4>
            <div style={{ display: "flex", flexWrap: "wrap", gap: "6px" }}>
              {job.preferredSkills.map((s, idx) => (
                <span key={idx} className="badge badge-cyan">{s.name}</span>
              ))}
            </div>
          </div>

          {/* Job Constraints & Scope */}
          <div className="glass-card">
            <h3 style={{ fontSize: "1.1rem", marginBottom: "14px" }}>Job Parameters & Constraints</h3>
            <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
              <div style={{ background: "var(--bg-surface)", padding: "14px", borderRadius: "var(--radius-md)", border: "1px solid var(--border-subtle)" }}>
                <div style={{ fontSize: "0.75rem", color: "var(--text-muted)" }}>Minimum Seniority Threshold</div>
                <div style={{ fontSize: "1.1rem", fontWeight: 700, color: "var(--amber-primary)" }}>{job.minExperience}+ Years Experience</div>
              </div>
              <div style={{ background: "var(--bg-surface)", padding: "14px", borderRadius: "var(--radius-md)", border: "1px solid var(--border-subtle)" }}>
                <div style={{ fontSize: "0.75rem", color: "var(--text-muted)" }}>Minimum Education Prerequisite</div>
                <div style={{ fontSize: "1rem", fontWeight: 600, color: "var(--text-primary)" }}>{job.minDegree}</div>
              </div>
              <div style={{ background: "var(--bg-surface)", padding: "14px", borderRadius: "var(--radius-md)", border: "1px solid var(--border-subtle)" }}>
                <div style={{ fontSize: "0.75rem", color: "var(--text-muted)" }}>Department & Location</div>
                <div style={{ fontSize: "0.95rem", color: "var(--cyan-primary)" }}>{job.department} • {job.location}</div>
              </div>
            </div>
          </div>
        </div>
      )}

      {activeView === "prompt" && (
        <div className="glass-card">
          <h3 style={{ fontSize: "1.1rem", marginBottom: "12px" }}>LLM Information Extraction Prompt & Schema</h3>
          <p style={{ fontSize: "0.85rem", color: "var(--text-secondary)", marginBottom: "16px" }}>
            The authors use few-shot structured prompting with frontier LLMs to extract exact entity graphs with consistent ontology normalization:
          </p>
          <pre style={{
            background: "var(--bg-canvas)",
            padding: "18px",
            borderRadius: "var(--radius-md)",
            border: "1px solid var(--border-subtle)",
            fontSize: "0.82rem",
            color: "var(--cyan-primary)",
            overflowX: "auto",
            lineHeight: 1.6
          }}>
{`SYSTEM: You are an expert HR ontology entity extractor.
TASK: Extract entities from the following recruitment document into JSON format.

OUTPUT SCHEMA:
{
  "entities": {
    "hard_skills": [ {"name": string, "category": string, "proficiency": integer} ],
    "soft_skills": [ string ],
    "experience_years": number,
    "degree": string,
    "school": string,
    "domain": string,
    "roles": [ {"title": string, "company": string, "tenure": string} ]
  }
}

RULES:
1. Normalize synonyms (e.g., "PyTorch-Geometric", "PyG" -> "PyTorch Geometric").
2. Separate explicit requirements from preferred qualifications.
3. Compute experience duration accurately from dates.`}
          </pre>
        </div>
      )}
    </div>
  );
}
