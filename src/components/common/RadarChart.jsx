import React from "react";

/**
 * Reusable SVG Radar Chart component for Skill Gap Analysis
 */
export default function RadarChart({ candidate, job, size = 320 }) {
  if (!candidate || !job) return null;

  // 6 Core Skill Axes for Matching
  const axes = [
    { label: "Core Domain Mastery", candVal: 92, jobVal: 90 },
    { label: "Frameworks & PyTorch", candVal: 88, jobVal: 85 },
    { label: "Distributed Systems", candVal: 76, jobVal: 80 },
    { label: "Experience & Seniority", candVal: Math.min(100, Math.round((candidate.yearsExperience / job.minExperience) * 85)), jobVal: 85 },
    { label: "Research / Algo Depth", candVal: 94, jobVal: 88 },
    { label: "Communication & Soft", candVal: 85, jobVal: 75 }
  ];

  const center = size / 2;
  const radius = (size / 2) - 45;
  const numAxes = axes.length;
  const angleSlice = (Math.PI * 2) / numAxes;

  // Generate polygon points
  const getCoordinates = (value, index) => {
    const r = (value / 100) * radius;
    const angle = index * angleSlice - Math.PI / 2;
    const x = center + r * Math.cos(angle);
    const y = center + r * Math.sin(angle);
    return { x, y };
  };

  const candidatePoints = axes
    .map((axis, i) => {
      const { x, y } = getCoordinates(axis.candVal, i);
      return `${x},${y}`;
    })
    .join(" ");

  const jobPoints = axes
    .map((axis, i) => {
      const { x, y } = getCoordinates(axis.jobVal, i);
      return `${x},${y}`;
    })
    .join(" ");

  // Concentric levels (20%, 40%, 60%, 80%, 100%)
  const levels = [0.2, 0.4, 0.6, 0.8, 1.0];

  return (
    <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
      <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
        {/* Concentric Grid Polygons */}
        {levels.map((lvl, lIdx) => {
          const gridPoints = axes
            .map((_, i) => {
              const r = lvl * radius;
              const angle = i * angleSlice - Math.PI / 2;
              const x = center + r * Math.cos(angle);
              const y = center + r * Math.sin(angle);
              return `${x},${y}`;
            })
            .join(" ");

          return (
            <polygon
              key={`grid-${lIdx}`}
              points={gridPoints}
              fill="none"
              stroke="rgba(255, 255, 255, 0.08)"
              strokeWidth="1"
            />
          );
        })}

        {/* Axis Lines & Labels */}
        {axes.map((axis, i) => {
          const angle = i * angleSlice - Math.PI / 2;
          const lineX = center + radius * Math.cos(angle);
          const lineY = center + radius * Math.sin(angle);
          const labelX = center + (radius + 22) * Math.cos(angle);
          const labelY = center + (radius + 22) * Math.sin(angle);

          return (
            <g key={`axis-${i}`}>
              <line
                x1={center}
                y1={center}
                x2={lineX}
                y2={lineY}
                stroke="rgba(255, 255, 255, 0.12)"
                strokeWidth="1"
              />
              <text
                x={labelX}
                y={labelY}
                textAnchor="middle"
                dominantBaseline="central"
                fill="var(--text-secondary)"
                fontSize="9"
                fontFamily="var(--font-heading)"
                fontWeight="500"
              >
                {axis.label}
              </text>
            </g>
          );
        })}

        {/* Job Requirement Polygon (Violet outline) */}
        <polygon
          points={jobPoints}
          fill="rgba(139, 92, 246, 0.15)"
          stroke="var(--violet-primary)"
          strokeWidth="2"
          strokeDasharray="4 3"
        />

        {/* Candidate Polygon (Cyan filled) */}
        <polygon
          points={candidatePoints}
          fill="rgba(6, 182, 212, 0.28)"
          stroke="var(--cyan-primary)"
          strokeWidth="2.5"
        />

        {/* Candidate Vertex Points */}
        {axes.map((axis, i) => {
          const { x, y } = getCoordinates(axis.candVal, i);
          return (
            <circle
              key={`cand-pt-${i}`}
              cx={x}
              cy={y}
              r="4"
              fill="var(--cyan-primary)"
              stroke="#090d16"
              strokeWidth="2"
            />
          );
        })}
      </svg>

      {/* Legend */}
      <div style={{ display: "flex", gap: "18px", marginTop: "10px", fontSize: "0.8rem" }}>
        <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
          <span style={{ width: "12px", height: "12px", borderRadius: "2px", background: "var(--cyan-primary)" }}></span>
          <span style={{ color: "var(--text-primary)" }}>{candidate.name} (Candidate)</span>
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
          <span style={{ width: "12px", height: "12px", borderRadius: "2px", border: "2px dashed var(--violet-primary)" }}></span>
          <span style={{ color: "var(--text-secondary)" }}>{job.title} (Requirement)</span>
        </div>
      </div>
    </div>
  );
}
