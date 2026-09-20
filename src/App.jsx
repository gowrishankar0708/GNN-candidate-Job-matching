import React, { useState } from "react";
import Navigation from "./components/Navigation";
import PaperHero from "./components/PaperHero";

// Phase 1 Components
import PreprocessingView from "./components/phase1/PreprocessingView";
import ExtractionView from "./components/phase1/ExtractionView";
import EmbeddingView from "./components/phase1/EmbeddingView";
import GraphView from "./components/phase1/GraphView";
import GnnEngineView from "./components/phase1/GnnEngineView";
import BenchmarkView from "./components/phase1/BenchmarkView";

// Phase 2 Components
import KnowledgeBaseView from "./components/phase2/KnowledgeBaseView";
import ResumeEnhancerView from "./components/phase2/ResumeEnhancerView";
import SkillGapView from "./components/phase2/SkillGapView";
import InterviewGenView from "./components/phase2/InterviewGenView";
import MultiAgentView from "./components/phase2/MultiAgentView";
import DashboardView from "./components/phase2/DashboardView";

// Data
import { CANDIDATES_DATA } from "./data/candidatesData";
import { JOBS_DATA } from "./data/jobsData";

export default function App() {
  const [activeCandidate, setActiveCandidate] = useState(CANDIDATES_DATA[0]);
  const [activeJob, setActiveJob] = useState(JOBS_DATA[0]);
  const [activeModule, setActiveModule] = useState("dashboard");
  const [activePhase, setActivePhase] = useState(2);
  const [persona, setPersona] = useState("recruiter");

  const handleSelectModule = (moduleId) => {
    setActiveModule(moduleId);
    // Auto sync phase
    const phase1Modules = ["preprocessing", "extraction", "embedding", "graph", "gnn", "benchmark"];
    if (phase1Modules.includes(moduleId)) {
      setActivePhase(1);
    } else {
      setActivePhase(2);
    }
    window.scrollTo({ top: 120, behavior: "smooth" });
  };

  const handleSelectPhase = (phaseNumber) => {
    setActivePhase(phaseNumber);
    if (phaseNumber === 1) {
      setActiveModule("graph"); // default to graph view for phase 1
    } else {
      setActiveModule("dashboard"); // default to dashboard for phase 2
    }
  };

  const handleUpdateCustomCandidate = (customText) => {
    // Generate custom candidate representation from pasted text
    const customCand = {
      ...activeCandidate,
      id: "cand_custom",
      name: "Custom Candidate (Ingested)",
      rawResumeText: customText,
      currentTitle: "Candidate (Custom Ingestion)",
      yearsExperience: 4,
      hardSkills: [
        { name: "Python", level: 90, category: "Languages" },
        { name: "Machine Learning", level: 85, category: "Core" },
        { name: "Data Engineering", level: 80, category: "Data" },
        { name: "Cloud Tools", level: 75, category: "DevOps" }
      ],
      vectorCoordinates: [0.70, 0.65],
      atsScore: 86
    };
    setActiveCandidate(customCand);
  };

  return (
    <div style={{ minHeight: "100vh", display: "flex", flexDirection: "column" }}>
      {/* Top Navigation */}
      <Navigation
        activeCandidate={activeCandidate}
        onSelectCandidate={setActiveCandidate}
        activeJob={activeJob}
        onSelectJob={setActiveJob}
        activePhase={activePhase}
        onSelectPhase={handleSelectPhase}
        persona={persona}
        onTogglePersona={() => setPersona(p => p === "recruiter" ? "candidate" : "recruiter")}
      />

      {/* Main Content Area */}
      <main style={{ flex: 1, maxWidth: "1400px", width: "100%", margin: "0 auto", padding: "0 24px 60px" }}>
        {/* Paper Header & Pipeline Navigation */}
        <PaperHero
          activeModule={activeModule}
          onSelectModule={handleSelectModule}
        />

        {/* Dynamic Module Rendering */}
        <div style={{ minHeight: "500px" }}>
          {/* Phase 1: Existing Paper */}
          {activeModule === "preprocessing" && (
            <PreprocessingView
              candidate={activeCandidate}
              job={activeJob}
              onUpdateCustomCandidate={handleUpdateCustomCandidate}
            />
          )}

          {activeModule === "extraction" && (
            <ExtractionView
              candidate={activeCandidate}
              job={activeJob}
            />
          )}

          {activeModule === "embedding" && (
            <EmbeddingView
              candidate={activeCandidate}
              job={activeJob}
            />
          )}

          {activeModule === "graph" && (
            <GraphView
              candidate={activeCandidate}
              job={activeJob}
              onSelectCandidate={setActiveCandidate}
              onSelectJob={setActiveJob}
            />
          )}

          {activeModule === "gnn" && (
            <GnnEngineView
              candidate={activeCandidate}
              job={activeJob}
            />
          )}

          {activeModule === "benchmark" && (
            <BenchmarkView
              job={activeJob}
              onSelectCandidate={setActiveCandidate}
            />
          )}

          {/* Phase 2: Proposed Enhancements */}
          {activeModule === "knowledge" && (
            <KnowledgeBaseView />
          )}

          {activeModule === "resume" && (
            <ResumeEnhancerView
              candidate={activeCandidate}
            />
          )}

          {activeModule === "gap" && (
            <SkillGapView
              candidate={activeCandidate}
              job={activeJob}
            />
          )}

          {activeModule === "interview" && (
            <InterviewGenView
              candidate={activeCandidate}
              job={activeJob}
            />
          )}

          {activeModule === "multiagent" && (
            <MultiAgentView
              candidate={activeCandidate}
              job={activeJob}
            />
          )}

          {activeModule === "dashboard" && (
            <DashboardView
              candidate={activeCandidate}
              job={activeJob}
              persona={persona}
              onSwitchPersona={setPersona}
              onNavigateModule={handleSelectModule}
            />
          )}
        </div>
      </main>

      {/* Footer */}
      <footer style={{
        background: "var(--bg-surface)",
        borderTop: "1px solid var(--border-subtle)",
        padding: "24px",
        textAlign: "center",
        fontSize: "0.82rem",
        color: "var(--text-muted)"
      }}>
        <div style={{ maxWidth: "1400px", margin: "0 auto", display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: "12px" }}>
          <div>
            <strong>GNN Candidate-Job Matching Platform</strong> • Based on <em>Data Science and Engineering</em> (Springer 2025)
          </div>
          <div>
            Authors: Paolo Frazzetto, Muhammad Uzair Ul Haq, Flavia Fabris, Alessandro Sperduti
          </div>
          <div>
            DOI: <a href="https://doi.org/10.1007/s41019-025-00293-y" target="_blank" rel="noopener noreferrer">10.1007/s41019-025-00293-y</a>
          </div>
        </div>
      </footer>
    </div>
  );
}
