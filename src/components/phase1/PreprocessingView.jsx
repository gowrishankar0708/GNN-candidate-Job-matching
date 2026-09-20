import React, { useState } from "react";
import { FileText, Cpu, CheckCircle2, UploadCloud, RefreshCw, Layers } from "lucide-react";

export default function PreprocessingView({ candidate, job, onUpdateCustomCandidate }) {
  const [activeTab, setActiveTab] = useState("candidate"); // candidate, job, custom
  const [customText, setCustomText] = useState("");
  const [cleaningStatus, setCleaningStatus] = useState("Complete");

  // Preprocessing stages visualization
  const stages = [
    { name: "Unstructured Document Ingestion", desc: "PDF/DOCX/HTML text extraction", status: "Done" },
    { name: "Text Normalization & Cleaning", desc: "Lowercasing, punctuation stripping, unicode normalization", status: "Done" },
    { name: "Sentence Segmentation & Tokenization", desc: "SpaCy/NLTK token stream creation", status: "Done" },
    { name: "Stopword & Boilerplate Pruning", desc: "Removing non-informative tokens ('the', 'responsible for')", status: "Done" },
    { name: "Entity-Ready Representation", desc: "Clean token sequence ready for LLM extraction", status: "Done" }
  ];

  const currentText = activeTab === "candidate" ? candidate.rawResumeText :
                      activeTab === "job" ? job.rawJobText : customText;

  const wordCount = currentText ? currentText.trim().split(/\s+/).length : 0;
  const charCount = currentText ? currentText.length : 0;
  const sentenceCount = currentText ? (currentText.match(/[.!?]+/g) || []).length : 0;

  const handleApplyCustom = () => {
    if (!customText.trim()) return;
    setCleaningStatus("Processing...");
    setTimeout(() => {
      setCleaningStatus("Complete");
      if (onUpdateCustomCandidate) {
        onUpdateCustomCandidate(customText);
      }
    }, 400);
  };

  return (
    <div className="animate-fade-in">
      <div style={{ marginBottom: "20px" }}>
        <h2 style={{ fontSize: "1.4rem", marginBottom: "6px" }}>Phase 1: Data Collection & Preprocessing</h2>
        <p style={{ fontSize: "0.9rem" }}>
          Ingests unstructured candidate resumes and job postings, standardizing raw text into normalized token sequences for LLM entity extraction and bipartite graph construction.
        </p>
      </div>

      {/* Tabs */}
      <div style={{ display: "flex", gap: "10px", marginBottom: "20px" }}>
        <button
          onClick={() => setActiveTab("candidate")}
          className={`tab-btn ${activeTab === "candidate" ? "active active-phase1" : ""}`}
        >
          <FileText size={15} /> Candidate Resume ({candidate.name})
        </button>
        <button
          onClick={() => setActiveTab("job")}
          className={`tab-btn ${activeTab === "job" ? "active active-phase1" : ""}`}
        >
          <FileText size={15} /> Job Description ({job.company})
        </button>
        <button
          onClick={() => setActiveTab("custom")}
          className={`tab-btn ${activeTab === "custom" ? "active active-phase1" : ""}`}
        >
          <UploadCloud size={15} /> Paste Custom Resume / JD
        </button>
      </div>

      <div className="grid-2" style={{ alignItems: "start" }}>
        {/* Left: Text Viewer & Ingestion Editor */}
        <div className="glass-card">
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "12px" }}>
            <span style={{ fontSize: "0.85rem", fontWeight: 600, color: "var(--text-primary)" }}>
              {activeTab === "candidate" ? `Raw Resume Source: ${candidate.name}` :
               activeTab === "job" ? `Raw Job Posting: ${job.title}` : "Custom Text Ingestion"}
            </span>
            <span className="badge badge-cyan">Status: {cleaningStatus}</span>
          </div>

          {activeTab === "custom" ? (
            <div>
              <textarea
                value={customText}
                onChange={(e) => setCustomText(e.target.value)}
                placeholder="Paste any custom resume text or job description here to run the preprocessing and inductive GNN pipeline..."
                rows={12}
                className="form-textarea"
                style={{ fontFamily: "var(--font-mono)", fontSize: "0.85rem" }}
              />
              <button
                onClick={handleApplyCustom}
                className="btn-primary"
                style={{ marginTop: "12px", width: "100%" }}
              >
                <RefreshCw size={15} /> Run Preprocessing & Extraction Pipeline
              </button>
            </div>
          ) : (
            <div style={{
              background: "var(--bg-surface)",
              padding: "16px",
              borderRadius: "var(--radius-md)",
              border: "1px solid var(--border-subtle)",
              maxHeight: "340px",
              overflowY: "auto",
              fontFamily: "var(--font-mono)",
              fontSize: "0.82rem",
              lineHeight: 1.6,
              color: "var(--text-secondary)",
              whiteSpace: "pre-wrap"
            }}>
              {currentText}
            </div>
          )}

          {/* Document Metrics */}
          <div style={{ display: "flex", gap: "16px", marginTop: "16px", paddingTop: "14px", borderTop: "1px solid var(--border-subtle)", fontSize: "0.8rem", color: "var(--text-muted)" }}>
            <div>Words: <strong style={{ color: "var(--text-primary)" }}>{wordCount}</strong></div>
            <div>Characters: <strong style={{ color: "var(--text-primary)" }}>{charCount}</strong></div>
            <div>Sentences: <strong style={{ color: "var(--text-primary)" }}>{sentenceCount}</strong></div>
            <div>Encoding: <strong style={{ color: "var(--text-primary)" }}>UTF-8 Clean</strong></div>
          </div>
        </div>

        {/* Right: Pipeline Stages Breakdown */}
        <div className="glass-card">
          <h3 style={{ fontSize: "1.1rem", marginBottom: "14px", display: "flex", alignItems: "center", gap: "8px" }}>
            <Layers size={18} color="var(--cyan-primary)" />
            Preprocessing Pipeline Architecture
          </h3>
          <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
            {stages.map((stage, idx) => (
              <div
                key={idx}
                style={{
                  background: "var(--bg-surface)",
                  padding: "12px 16px",
                  borderRadius: "var(--radius-md)",
                  border: "1px solid var(--border-subtle)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between"
                }}
              >
                <div>
                  <div style={{ fontSize: "0.875rem", fontWeight: 600, color: "var(--text-primary)", marginBottom: "2px" }}>
                    {idx + 1}. {stage.name}
                  </div>
                  <div style={{ fontSize: "0.78rem", color: "var(--text-muted)" }}>
                    {stage.desc}
                  </div>
                </div>
                <div style={{ display: "flex", alignItems: "center", gap: "6px", color: "var(--emerald-primary)", fontSize: "0.75rem", fontWeight: 600 }}>
                  <CheckCircle2 size={15} /> {stage.status}
                </div>
              </div>
            ))}
          </div>

          <div style={{ marginTop: "18px", padding: "12px 14px", background: "rgba(6, 182, 212, 0.08)", borderRadius: "var(--radius-md)", border: "1px solid rgba(6, 182, 212, 0.2)", fontSize: "0.8rem", color: "var(--cyan-primary)" }}>
            💡 <strong>Paper Insight:</strong> The authors utilize LLM-guided preprocessing to retain relational context (e.g. distinguishing between "built GraphSAGE" vs "read about GraphSAGE") prior to graph node generation.
          </div>
        </div>
      </div>
    </div>
  );
}
