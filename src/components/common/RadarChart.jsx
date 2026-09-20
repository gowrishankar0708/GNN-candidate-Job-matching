import React from "react";

export default function RadarChart({ candidate, job, size = 320 }) {
  if (!candidate || !job) return null;
  const axes = [
    { label: "Core Domain", candVal: 92, jobVal: 90 },
    { label: "Frameworks", candVal: 88, jobVal: 85 },
    { label: "Distributed Sys", candVal: 76, jobVal: 80 },
    { label: "Experience", candVal: Math.min(100, Math.round((candidate.yearsExperience / job.minExperience) * 85)), jobVal: 85 },
    { label: "Research Depth", candVal: 94, jobVal: 88 },
    { label: "Communication", candVal: 85, jobVal: 75 }
  ];
  const center = size / 2, radius = (size / 2) - 45, numAxes = axes.length, angleSlice = (Math.PI * 2) / numAxes;
  const getCoords = (v, i) => { const r = (v / 100) * radius, a = i * angleSlice - Math.PI / 2; return { x: center + r * Math.cos(a), y: center + r * Math.sin(a) }; };
  const candidatePoints = axes.map((_, i) => { const { x, y } = getCoords(axes[i].candVal, i); return `${x},${y}`; }).join(" ");
  const jobPoints = axes.map((_, i) => { const { x, y } = getCoords(axes[i].jobVal, i); return `${x},${y}`; }).join(" ");
  const levels = [0.2, 0.4, 0.6, 0.8, 1.0];

  return (
    <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
      <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
        {levels.map((lvl, li) => {
          const pts = axes.map((_, i) => { const r = lvl * radius, a = i * angleSlice - Math.PI / 2; return `${center + r * Math.cos(a)},${center + r * Math.sin(a)}`; }).join(" ");
          return <polygon key={li} points={pts} fill="none" stroke="#e5e7eb" strokeWidth="1" />;
        })}
        {axes.map((axis, i) => {
          const a = i * angleSlice - Math.PI / 2;
          const lx = center + radius * Math.cos(a), ly = center + radius * Math.sin(a);
          const tx = center + (radius + 22) * Math.cos(a), ty = center + (radius + 22) * Math.sin(a);
          return (
            <g key={i}>
              <line x1={center} y1={center} x2={lx} y2={ly} stroke="#e5e7eb" strokeWidth="1" />
              <text x={tx} y={ty} textAnchor="middle" dominantBaseline="central" fill="#6b7280" fontSize="9" fontFamily="var(--font-heading)" fontWeight="500">{axis.label}</text>
            </g>
          );
        })}
        <polygon points={jobPoints} fill="rgba(124,58,237,0.1)" stroke="var(--purple)" strokeWidth="2" strokeDasharray="4 3" />
        <polygon points={candidatePoints} fill="rgba(37,99,235,0.15)" stroke="var(--primary)" strokeWidth="2.5" />
        {axes.map((axis, i) => { const { x, y } = getCoords(axis.candVal, i); return <circle key={i} cx={x} cy={y} r="4" fill="var(--primary)" stroke="white" strokeWidth="2" />; })}
      </svg>
      <div style={{ display: "flex", gap: "18px", marginTop: "10px", fontSize: "0.78rem" }}>
        <div style={{ display: "flex", alignItems: "center", gap: "5px" }}>
          <span style={{ width: "10px", height: "10px", borderRadius: "2px", background: "var(--primary)" }}></span>
          <span style={{ color: "var(--text-primary)" }}>{candidate.name}</span>
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: "5px" }}>
          <span style={{ width: "10px", height: "10px", borderRadius: "2px", border: "2px dashed var(--purple)" }}></span>
          <span style={{ color: "var(--text-secondary)" }}>{job.title}</span>
        </div>
      </div>
    </div>
  );
}
