import React, { useState } from "react";
import { Sparkles, Info } from "lucide-react";
import { CANDIDATES_DATA } from "../../data/candidatesData";
import { JOBS_DATA } from "../../data/jobsData";

export default function EmbeddingView({ candidate, job }) {
  const [selectedPoint, setSelectedPoint] = useState(null);

  const projectionPoints = [
    ...CANDIDATES_DATA.map(c => ({ id: c.id, name: c.name, type: "candidate", x: c.vectorCoordinates[0], y: c.vectorCoordinates[1], color: c.id === candidate.id ? "var(--primary)" : "#93c5fd", subtitle: c.currentTitle })),
    ...JOBS_DATA.map(j => ({ id: j.id, name: j.title, type: "job", x: j.vectorCoordinates[0], y: j.vectorCoordinates[1], color: j.id === job.id ? "var(--purple)" : "#c4b5fd", subtitle: j.company })),
    { id: "s1", name: "Graph Neural Networks", type: "skill", x: 0.78, y: 0.82, color: "var(--green)", subtitle: "Graph ML Cluster" },
    { id: "s2", name: "PyTorch Geometric", type: "skill", x: 0.88, y: 0.72, color: "var(--green)", subtitle: "Graph ML Cluster" },
    { id: "s3", name: "AWS & Kubernetes", type: "skill", x: -0.62, y: 0.52, color: "var(--green)", subtitle: "Cloud Cluster" },
    { id: "s4", name: "React & TypeScript", type: "skill", x: -0.68, y: -0.55, color: "var(--green)", subtitle: "Frontend Cluster" },
    { id: "s5", name: "Recommendation Algorithms", type: "skill", x: 0.60, y: 0.38, color: "var(--green)", subtitle: "RecSys Cluster" }
  ];

  const svgWidth = 420, svgHeight = 360;
  const toSvgX = (x) => ((x + 1) / 2) * (svgWidth - 60) + 30;
  const toSvgY = (y) => ((-y + 1) / 2) * (svgHeight - 60) + 30;

  return (
    <div className="animate-fade-in">
      <div style={{ marginBottom: "20px" }}>
        <h2 style={{ fontSize: "1.35rem", marginBottom: "6px" }}>Phase 1: Embedding Generation & Semantic Space</h2>
        <p style={{ fontSize: "0.88rem" }}>
          Generates 768-dimensional Sentence-BERT vectors. These vectors populate node feature matrices before GNN propagation.
        </p>
      </div>

      <div className="grid-2">
        <div className="glass-card">
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "12px" }}>
            <h3 style={{ fontSize: "1.05rem", display: "flex", alignItems: "center", gap: "7px" }}>
              <Sparkles size={16} color="var(--primary)" /> 2D Semantic Projection (t-SNE)
            </h3>
            <span className="badge badge-cyan">768-Dim → 2D</span>
          </div>
          <p style={{ fontSize: "0.8rem", color: "var(--text-secondary)", marginBottom: "12px" }}>
            Click points to inspect. Notice how Alex Chen clusters near NeuralScale's AI role.
          </p>
          <div style={{ background: "var(--bg-surface)", borderRadius: "var(--radius-md)", border: "1px solid var(--border-subtle)", padding: "8px" }}>
            <svg width="100%" height={svgHeight} viewBox={`0 0 ${svgWidth} ${svgHeight}`}>
              <line x1={toSvgX(0)} y1="10" x2={toSvgX(0)} y2={svgHeight - 10} stroke="#e5e7eb" strokeDasharray="3 3" />
              <line x1="10" y1={toSvgY(0)} x2={svgWidth - 10} y2={toSvgY(0)} stroke="#e5e7eb" strokeDasharray="3 3" />
              {(() => {
                const cPt = projectionPoints.find(p => p.id === candidate.id);
                const jPt = projectionPoints.find(p => p.id === job.id);
                if (!cPt || !jPt) return null;
                return <line x1={toSvgX(cPt.x)} y1={toSvgY(cPt.y)} x2={toSvgX(jPt.x)} y2={toSvgY(jPt.y)} stroke="var(--amber)" strokeWidth="2" strokeDasharray="5 4" />;
              })()}
              {projectionPoints.map((pt) => {
                const cx = toSvgX(pt.x), cy = toSvgY(pt.y);
                const isHighlighted = pt.id === candidate.id || pt.id === job.id || (selectedPoint && selectedPoint.id === pt.id);
                return (
                  <g key={pt.id} onClick={() => setSelectedPoint(pt)} style={{ cursor: "pointer" }}>
                    {isHighlighted && <circle cx={cx} cy={cy} r="14" fill={pt.color} opacity="0.2" />}
                    <circle cx={cx} cy={cy} r={isHighlighted ? 7 : 5} fill={pt.color} stroke="white" strokeWidth="2" />
                    <text x={cx} y={cy - 10} textAnchor="middle" fill={isHighlighted ? "#111827" : "#6b7280"} fontSize={isHighlighted ? "10" : "8"} fontWeight={isHighlighted ? "bold" : "normal"}>{pt.name}</text>
                  </g>
                );
              })}
            </svg>
          </div>
          {selectedPoint && (
            <div style={{ marginTop: "10px", padding: "10px 12px", background: "var(--bg-surface)", borderRadius: "var(--radius-md)", border: "1px solid var(--border-medium)", fontSize: "0.82rem" }}>
              <strong style={{ color: "var(--text-primary)" }}>{selectedPoint.name}</strong>
              <span style={{ color: "var(--text-muted)", marginLeft: "8px" }}>({selectedPoint.subtitle})</span>
              <div style={{ fontSize: "0.72rem", color: "var(--text-secondary)", marginTop: "2px" }}>Coordinates: [{selectedPoint.x.toFixed(2)}, {selectedPoint.y.toFixed(2)}]</div>
            </div>
          )}
        </div>

        <div className="glass-card">
          <h3 style={{ fontSize: "1.05rem", marginBottom: "14px" }}>Cosine Similarity Matrix</h3>
          <div style={{ overflowX: "auto", marginBottom: "18px" }}>
            <table style={{ width: "100%", fontSize: "0.78rem", borderCollapse: "collapse" }}>
              <thead>
                <tr style={{ borderBottom: "2px solid var(--border-subtle)", color: "var(--text-muted)" }}>
                  <th style={{ padding: "8px", textAlign: "left" }}>Candidate \ Job</th>
                  {JOBS_DATA.map(j => (<th key={j.id} style={{ padding: "8px", textAlign: "center" }}>{j.company}</th>))}
                </tr>
              </thead>
              <tbody>
                {CANDIDATES_DATA.map(c => {
                  const isCurrent = c.id === candidate.id;
                  return (
                    <tr key={c.id} style={{ borderBottom: "1px solid var(--border-subtle)", background: isCurrent ? "var(--primary-light)" : "transparent" }}>
                      <td style={{ padding: "8px", fontWeight: isCurrent ? 600 : 400, color: isCurrent ? "var(--primary)" : "var(--text-primary)" }}>{c.name}</td>
                      {JOBS_DATA.map(j => {
                        const dist = Math.hypot(c.vectorCoordinates[0] - j.vectorCoordinates[0], c.vectorCoordinates[1] - j.vectorCoordinates[1]);
                        const sim = Math.max(0.1, (1 - dist / 2.2)).toFixed(2);
                        return (
                          <td key={j.id} style={{ padding: "8px", textAlign: "center", fontFamily: "var(--font-mono)", color: parseFloat(sim) > 0.8 ? "var(--green)" : "var(--text-secondary)", fontWeight: parseFloat(sim) > 0.8 ? 700 : 400 }}>
                            {sim}
                          </td>
                        );
                      })}
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>

          <div style={{ padding: "14px", background: "var(--purple-light)", borderRadius: "var(--radius-md)", border: "1px solid var(--purple-border)" }}>
            <h4 style={{ fontSize: "0.92rem", color: "var(--purple)", marginBottom: "6px", display: "flex", alignItems: "center", gap: "6px" }}>
              <Info size={14} /> Why Embeddings Alone Are Insufficient
            </h4>
            <p style={{ fontSize: "0.8rem", color: "var(--text-secondary)", lineHeight: 1.6 }}>
              Cosine Similarity achieves only <strong>51.2% Balanced Accuracy</strong> and <strong>6.2% Recall</strong> on qualified candidates. Embeddings capture surface semantics but ignore multi-hop relational co-occurrences. This motivates constructing explicit bipartite graphs.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
