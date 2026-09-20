import React, { useState } from "react";
import { Network, Share2, Layers, Cpu } from "lucide-react";
import GraphCanvas from "../common/GraphCanvas";
import { buildGraphData } from "../../utils/gnnSimulator";
import { CANDIDATES_DATA } from "../../data/candidatesData";
import { JOBS_DATA } from "../../data/jobsData";

export default function GraphView({ candidate, job, onSelectCandidate, onSelectJob }) {
  const [inspectedNode, setInspectedNode] = useState(null);

  const graphData = buildGraphData(CANDIDATES_DATA, JOBS_DATA, candidate.id, job.id);

  // Graph topology calculations
  const totalNodes = graphData.nodes.length;
  const totalEdges = graphData.links.length;
  const avgDegree = (totalEdges * 2 / totalNodes).toFixed(1);
  const density = (2 * totalEdges / (totalNodes * (totalNodes - 1))).toFixed(3);

  const handleNodeClick = (node) => {
    setInspectedNode(node);
    if (node.type === "candidate" && node.data && onSelectCandidate) {
      onSelectCandidate(node.data);
    } else if (node.type === "job" && node.data && onSelectJob) {
      onSelectJob(node.data);
    }
  };

  return (
    <div className="animate-fade-in">
      <div style={{ marginBottom: "20px" }}>
        <h2 style={{ fontSize: "1.4rem", marginBottom: "6px" }}>Phase 1: Candidate–Job Graph Construction</h2>
        <p style={{ fontSize: "0.9rem" }}>
          Constructs a heterogeneous bipartite graph connecting candidate nodes and job nodes through shared skill entity hubs, educational credentials, and recruitment interactions.
        </p>
      </div>

      {/* Graph Metrics Ribbon */}
      <div className="grid-4" style={{ marginBottom: "20px" }}>
        <div className="glass-card" style={{ padding: "14px 18px" }}>
          <div style={{ fontSize: "0.75rem", textTransform: "uppercase", color: "var(--text-muted)" }}>Total Graph Nodes</div>
          <div style={{ fontSize: "1.5rem", fontWeight: 700, color: "var(--cyan-primary)" }}>{totalNodes} Entities</div>
          <div style={{ fontSize: "0.75rem", color: "var(--text-secondary)" }}>5 Candidates, 4 Jobs, {totalNodes - 9} Skills</div>
        </div>
        <div className="glass-card" style={{ padding: "14px 18px" }}>
          <div style={{ fontSize: "0.75rem", textTransform: "uppercase", color: "var(--text-muted)" }}>Bipartite Edges</div>
          <div style={{ fontSize: "1.5rem", fontWeight: 700, color: "var(--violet-primary)" }}>{totalEdges} Links</div>
          <div style={{ fontSize: "0.75rem", color: "var(--text-secondary)" }}>has_skill & requires_skill</div>
        </div>
        <div className="glass-card" style={{ padding: "14px 18px" }}>
          <div style={{ fontSize: "0.75rem", textTransform: "uppercase", color: "var(--text-muted)" }}>Average Degree & Density</div>
          <div style={{ fontSize: "1.5rem", fontWeight: 700, color: "var(--emerald-primary)" }}>{avgDegree} deg</div>
          <div style={{ fontSize: "0.75rem", color: "var(--text-secondary)" }}>Graph Density: {density}</div>
        </div>
        <div className="glass-card" style={{ padding: "14px 18px" }}>
          <div style={{ fontSize: "0.75rem", textTransform: "uppercase", color: "var(--text-muted)" }}>Network Structure</div>
          <div style={{ fontSize: "1.5rem", fontWeight: 700, color: "var(--amber-primary)" }}>Heterogeneous</div>
          <div style={{ fontSize: "0.75rem", color: "var(--text-secondary)" }}>Bipartite Inductive Topology</div>
        </div>
      </div>

      {/* Main Interactive Graph Canvas */}
      <div className="glass-card" style={{ padding: "16px", marginBottom: "20px" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "12px" }}>
          <h3 style={{ fontSize: "1.1rem", display: "flex", alignItems: "center", gap: "8px" }}>
            <Network size={18} color="var(--cyan-primary)" />
            Interactive Heterogeneous Bipartite Graph
          </h3>
          <span style={{ fontSize: "0.8rem", color: "var(--text-secondary)" }}>
            Drag nodes to rearrange • Click to inspect 1-hop subgraph • Dotted amber line represents active GNN link
          </span>
        </div>

        <GraphCanvas
          nodes={graphData.nodes}
          links={graphData.links}
          activeCandId={candidate.id}
          activeJobId={job.id}
          onSelectNode={handleNodeClick}
          height={480}
        />
      </div>

      {/* Node Details Inspection */}
      {inspectedNode && (
        <div className="glass-card" style={{ background: "var(--bg-surface-elevated)", border: "1px solid var(--border-medium)" }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
              <span style={{
                width: "12px",
                height: "12px",
                borderRadius: "50%",
                background: inspectedNode.type === "candidate" ? "var(--cyan-primary)" :
                            inspectedNode.type === "job" ? "var(--violet-primary)" : "var(--emerald-primary)"
              }}></span>
              <h4 style={{ fontSize: "1.1rem" }}>{inspectedNode.name}</h4>
              <span className="badge badge-cyan">{inspectedNode.type.toUpperCase()}</span>
            </div>
            <button onClick={() => setInspectedNode(null)} className="btn-secondary" style={{ padding: "4px 10px", fontSize: "0.75rem" }}>
              Close
            </button>
          </div>
          <p style={{ fontSize: "0.85rem", color: "var(--text-secondary)", marginTop: "8px" }}>
            Connected to 1-hop neighbors through relational edges. In the GNN model, this entity's feature vector is dynamically aggregated by its adjacent nodes.
          </p>
        </div>
      )}
    </div>
  );
}
