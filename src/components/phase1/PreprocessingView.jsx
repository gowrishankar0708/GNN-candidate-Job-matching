import React, { useState } from "react";
import { FileText, CheckCircle2, UploadCloud, RefreshCw, Layers } from "lucide-react";

export default function PreprocessingView({ candidate, job, onUpdateCustomCandidate }) {
  const [activeTab, setActiveTab] = useState("candidate");
  const [customText, setCustomText] = useState("");
  const [cleaningStatus, setCleaningStatus] = useState("Complete");

  const stages = [
    { name: "Unstructured Document Ingestion", desc: "PDF/DOCX/HTML text extraction", status: "Done" },
    { name: "Text Normalization & Cleaning", desc: "Lowercasing, punctuation stripping, unicode normalization", status: "Done" },
    { name: "Sentence Segmentation & Tokenization", desc: "SpaCy/NLTK token stream creation", status: "Done" },
    { name: "Stopword & Boilerplate Pruning", desc: "Removing non-informative tokens", status: "Done" },
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
      if (onUpdateCustomCandidate) onUpdateCustomCandidate(customText);
    }, 400);
  };

  return (
    <div className="animate-fade-in">
      <div style={{ marginBottom: "20px" }}>
        <h2 style={{ fontSize: "1.35rem", marginBottom: "6px" }}>Phase 1: Data Collection & Preprocessing</h2>
        <p style={{ fontSize: "0.88rem" }}>
          Ingests unstructured candidate resumes and job postings, standardizing raw text into normalized token sequences for LLM entity extraction.
        </p>
      </div>

      {/* Tabs */}
      <div style={{ display: "flex", gap: "8px", marginBottom: "18px" }}>
        {[
          { key: "candidate", icon: <FileText size={14} />, label: `Candidate Resume (${candidate.name})` },
          { key: "job", icon: <FileText size={14} />, label: `Job Description (${job.company})` },
          { key: "custom", icon: <UploadCloud size={14} />, label: "Paste Custom Text" }
        ].map(t => (
          <button key={t.key} onClick={() => setActiveTab(t.key)}
            className={`tab-btn ${activeTab === t.key ? "active active-phase1" : ""}`}>
            {t.icon} {t.label}
          </button>
        ))}
      </div>

      <div className="grid-2" style={{ alignItems: "start" }}>
        <div className="glass-card">
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "12px" }}>
            <span style={{ fontSize: "0.85rem", fontWeight: 600, color: "var(--text-primary)" }}>
              {activeTab === "candidate" ? `Raw Resume: ${candidate.name}` :
               activeTab === "job" ? `Job Posting: ${job.title}` : "Custom Text Ingestion"}
            </span>
            <span className="badge badge-emerald">Status: {cleaningStatus}</span>
          </div>

          {activeTab === "custom" ? (
            <div>
              <textarea value={customText} onChange={e => setCustomText(e.target.value)}
                placeholder="Paste any custom resume or job description here..."
                rows={12} className="form-textarea"
                style={{ fontFamily: "var(--font-mono)", fontSize: "0.82rem" }} />
              <button onClick={handleApplyCustom} className="btn-primary" style={{ marginTop: "12px", width: "100%" }}>
                <RefreshCw size={14} /> Run Preprocessing Pipeline
              </button>
            </div>
          ) : (
            <div style={{
              background: "var(--bg-surface)", padding: "16px", borderRadius: "var(--radius-md)",
              border: "1px solid var(--border-subtle)", maxHeight: "340px", overflowY: "auto",
              fontFamily: "var(--font-mono)", fontSize: "0.8rem", lineHeight: 1.65,
              color: "var(--text-secondary)", whiteSpace: "pre-wrap"
            }}>
              {currentText}
            </div>
          )}

          <div style={{ display: "flex", gap: "16px", marginTop: "14px", paddingTop: "12px", borderTop: "1px solid var(--border-subtle)", fontSize: "0.78rem", color: "var(--text-muted)" }}>
            <div>Words: <strong style={{ color: "var(--text-primary)" }}>{wordCount}</strong></div>
            <div>Characters: <strong style={{ color: "var(--text-primary)" }}>{charCount}</strong></div>
            <div>Sentences: <strong style={{ color: "var(--text-primary)" }}>{sentenceCount}</strong></div>
          </div>
        </div>

        <div className="glass-card">
          <h3 style={{ fontSize: "1.05rem", marginBottom: "14px", display: "flex", alignItems: "center", gap: "8px" }}>
            <Layers size={17} color="var(--primary)" /> Preprocessing Pipeline
          </h3>
          <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
            {stages.map((stage, idx) => (
              <div key={idx} style={{
                background: "var(--bg-surface)", padding: "12px 14px", borderRadius: "var(--radius-md)",
                border: "1px solid var(--border-subtle)", display: "flex", alignItems: "center", justifyContent: "space-between"
              }}>
                <div>
                  <div style={{ fontSize: "0.85rem", fontWeight: 600, color: "var(--text-primary)", marginBottom: "2px" }}>
                    {idx + 1}. {stage.name}
                  </div>
                  <div style={{ fontSize: "0.75rem", color: "var(--text-muted)" }}>{stage.desc}</div>
                </div>
                <div style={{ display: "flex", alignItems: "center", gap: "5px", color: "var(--green)", fontSize: "0.72rem", fontWeight: 600 }}>
                  <CheckCircle2 size={14} /> {stage.status}
                </div>
              </div>
            ))}
          </div>

          <div style={{ marginTop: "16px", padding: "12px", background: "var(--primary-light)", borderRadius: "var(--radius-md)", border: "1px solid var(--primary-border)", fontSize: "0.8rem", color: "var(--primary)" }}>
            💡 <strong>Paper Insight:</strong> The authors utilize LLM-guided preprocessing to retain relational context prior to graph node generation.
          </div>
        </div>
      </div>
    </div>
  );
}
