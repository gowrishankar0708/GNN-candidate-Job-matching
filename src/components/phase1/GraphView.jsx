import React, { useState } from "react";
import { Network } from "lucide-react";
import GraphCanvas from "../common/GraphCanvas";
import { buildGraphData } from "../../utils/gnnSimulator";
import { CANDIDATES_DATA } from "../../data/candidatesData";
import { JOBS_DATA } from "../../data/jobsData";

export default function GraphView({ candidate, job, onSelectCandidate, onSelectJob }) {
  const [inspectedNode, setInspectedNode] = useState(null);
  const graphData = buildGraphData(CANDIDATES_DATA, JOBS_DATA, candidate.id, job.id);
  const totalNodes = graphData.nodes.length, totalEdges = graphData.links.length;
  const avgDegree = (totalEdges * 2 / totalNodes).toFixed(1);

  const handleNodeClick = (node) => {
    setInspectedNode(node);
    if (node.type === "candidate" && node.data && onSelectCandidate) onSelectCandidate(node.data);
    else if (node.type === "job" && node.data && onSelectJob) onSelectJob(node.data);
  };

  return (
    <div className="animate-fade-in">
      <div style={{ marginBottom: "20px" }}>
        <h2 style={{ fontSize: "1.35rem", marginBottom: "6px" }}>Phase 1: Candidate–Job Graph Construction</h2>
        <p style={{ fontSize: "0.88rem" }}>Constructs a heterogeneous bipartite graph connecting candidates and jobs through shared skill entities.</p>
      </div>

      <div className="grid-4" style={{ marginBottom: "18px" }}>
        {[
          { label: "Graph Nodes", value: `${totalNodes} Entities`, sub: `5 Candidates, 4 Jobs, ${totalNodes - 9} Skills`, color: "var(--primary)" },
          { label: "Bipartite Edges", value: `${totalEdges} Links`, sub: "has_skill & requires_skill", color: "var(--purple)" },
          { label: "Average Degree", value: `${avgDegree} deg`, sub: `Density: ${(2 * totalEdges / (totalNodes * (totalNodes - 1))).toFixed(3)}`, color: "var(--green)" },
          { label: "Structure", value: "Heterogeneous", sub: "Bipartite Inductive Topology", color: "var(--amber)" }
        ].map((m, i) => (
          <div key={i} className="glass-card" style={{ padding: "14px 16px" }}>
            <div style={{ fontSize: "0.72rem", textTransform: "uppercase", color: "var(--text-muted)" }}>{m.label}</div>
            <div style={{ fontSize: "1.35rem", fontWeight: 700, color: m.color }}>{m.value}</div>
            <div style={{ fontSize: "0.72rem", color: "var(--text-secondary)" }}>{m.sub}</div>
          </div>
        ))}
      </div>

      <div className="glass-card" style={{ padding: "14px", marginBottom: "18px" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "10px" }}>
          <h3 style={{ fontSize: "1.05rem", display: "flex", alignItems: "center", gap: "7px" }}><Network size={16} color="var(--primary)" /> Interactive Bipartite Graph</h3>
          <span style={{ fontSize: "0.75rem", color: "var(--text-muted)" }}>Drag nodes · Click to inspect · Amber = GNN link</span>
        </div>
        <GraphCanvas nodes={graphData.nodes} links={graphData.links} activeCandId={candidate.id} activeJobId={job.id} onSelectNode={handleNodeClick} height={480} />
      </div>

      {inspectedNode && (
        <div className="glass-card" style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
            <span style={{ width: "10px", height: "10px", borderRadius: "50%", background: inspectedNode.type === "candidate" ? "var(--primary)" : inspectedNode.type === "job" ? "var(--purple)" : "var(--green)" }}></span>
            <h4 style={{ fontSize: "1rem" }}>{inspectedNode.name}</h4>
            <span className="badge badge-cyan">{inspectedNode.type.toUpperCase()}</span>
          </div>
          <button onClick={() => setInspectedNode(null)} className="btn-secondary" style={{ padding: "4px 10px", fontSize: "0.72rem" }}>Close</button>
        </div>
      )}
    </div>
  );
}
