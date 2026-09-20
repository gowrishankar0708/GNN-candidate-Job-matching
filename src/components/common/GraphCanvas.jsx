import React, { useEffect, useRef, useState } from "react";
import { ZoomIn, ZoomOut, RotateCcw } from "lucide-react";

export default function GraphCanvas({ nodes = [], links = [], activeCandId, activeJobId, onSelectNode, height = 420 }) {
  const canvasRef = useRef(null);
  const [zoom, setZoom] = useState(1);
  const [pan, setPan] = useState({ x: 0, y: 0 });
  const [filterCandidate, setFilterCandidate] = useState(true);
  const [filterJob, setFilterJob] = useState(true);
  const [filterSkill, setFilterSkill] = useState(true);
  const [hoveredNode, setHoveredNode] = useState(null);
  const [selectedNodeId, setSelectedNodeId] = useState(null);
  const positionsRef = useRef(new Map());
  const draggingNodeRef = useRef(null);
  const dragStartRef = useRef({ x: 0, y: 0 });
  const isPanningRef = useRef(false);

  useEffect(() => {
    const width = 800, h = height;
    const posMap = positionsRef.current;
    nodes.forEach((node, idx) => {
      if (!posMap.has(node.id)) {
        let x = width / 2, y = h / 2;
        if (node.type === "candidate") { x = 140 + (idx % 3) * 60; y = 70 + Math.floor(idx / 2) * 90; }
        else if (node.type === "job") { x = width - 180 + (idx % 2) * 50; y = 80 + idx * 85; }
        else { x = 320 + (idx % 4) * 80; y = 60 + Math.floor(idx / 3) * 65; }
        posMap.set(node.id, { x: x + (Math.random() * 20 - 10), y: y + (Math.random() * 20 - 10), vx: 0, vy: 0 });
      }
    });
  }, [nodes, height]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    let frameId;
    const render = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.save();
      ctx.translate(pan.x, pan.y);
      ctx.scale(zoom, zoom);
      const posMap = positionsRef.current;
      const isVisible = (n) => { if (n.type === "candidate" && !filterCandidate) return false; if (n.type === "job" && !filterJob) return false; if (n.type === "skill" && !filterSkill) return false; return true; };

      links.forEach(link => {
        const sn = nodes.find(n => n.id === link.source), tn = nodes.find(n => n.id === link.target);
        if (!sn || !tn || !isVisible(sn) || !isVisible(tn)) return;
        const p1 = posMap.get(link.source), p2 = posMap.get(link.target);
        if (!p1 || !p2) return;
        const isHl = link.isHighlighted || (selectedNodeId && (link.source === selectedNodeId || link.target === selectedNodeId));
        ctx.beginPath(); ctx.moveTo(p1.x, p1.y); ctx.lineTo(p2.x, p2.y);
        if (link.isHighlighted) { ctx.strokeStyle = "#d97706"; ctx.lineWidth = 3; ctx.setLineDash([6, 4]); }
        else if (isHl) { ctx.strokeStyle = "#2563eb"; ctx.lineWidth = 2; ctx.setLineDash([]); }
        else { ctx.strokeStyle = "#d1d5db"; ctx.lineWidth = 1; ctx.setLineDash([]); }
        ctx.stroke(); ctx.setLineDash([]);
      });

      nodes.forEach(node => {
        if (!isVisible(node)) return;
        const pos = posMap.get(node.id);
        if (!pos) return;
        const isSel = node.id === activeCandId || node.id === activeJobId || node.id === selectedNodeId;
        const isHov = hoveredNode && hoveredNode.id === node.id;
        const r = (node.radius || 10) + (isSel ? 3 : 0) + (isHov ? 2 : 0);
        if (isSel || isHov) { ctx.beginPath(); ctx.arc(pos.x, pos.y, r + 6, 0, Math.PI * 2); ctx.fillStyle = node.type === "candidate" ? "rgba(37,99,235,0.15)" : node.type === "job" ? "rgba(124,58,237,0.15)" : "rgba(22,163,74,0.15)"; ctx.fill(); }
        ctx.beginPath(); ctx.arc(pos.x, pos.y, r, 0, Math.PI * 2);
        ctx.fillStyle = node.type === "candidate" ? "#2563eb" : node.type === "job" ? "#7c3aed" : "#16a34a";
        ctx.fill(); ctx.strokeStyle = "white"; ctx.lineWidth = 2; ctx.stroke();
        ctx.font = isSel ? "bold 11px Inter, sans-serif" : "10px Inter, sans-serif";
        ctx.fillStyle = "#111827"; ctx.textAlign = "center";
        ctx.fillText(node.name, pos.x, pos.y + r + 14);
      });
      ctx.restore();
      frameId = requestAnimationFrame(render);
    };
    render();
    return () => cancelAnimationFrame(frameId);
  }, [nodes, links, zoom, pan, filterCandidate, filterJob, filterSkill, activeCandId, activeJobId, selectedNodeId, hoveredNode]);

  const handleMouseDown = (e) => {
    const canvas = canvasRef.current; if (!canvas) return;
    const rect = canvas.getBoundingClientRect();
    const mx = (e.clientX - rect.left - pan.x) / zoom, my = (e.clientY - rect.top - pan.y) / zoom;
    let clicked = null;
    nodes.forEach(node => { const pos = positionsRef.current.get(node.id); if (pos && Math.hypot(pos.x - mx, pos.y - my) <= (node.radius || 10) + 6) clicked = node; });
    if (clicked) { draggingNodeRef.current = clicked; dragStartRef.current = { x: mx, y: my }; setSelectedNodeId(clicked.id); if (onSelectNode) onSelectNode(clicked); }
    else { isPanningRef.current = true; dragStartRef.current = { x: e.clientX - pan.x, y: e.clientY - pan.y }; }
  };
  const handleMouseMove = (e) => {
    const canvas = canvasRef.current; if (!canvas) return;
    const rect = canvas.getBoundingClientRect();
    const mx = (e.clientX - rect.left - pan.x) / zoom, my = (e.clientY - rect.top - pan.y) / zoom;
    if (draggingNodeRef.current) { const pos = positionsRef.current.get(draggingNodeRef.current.id); if (pos) { pos.x = mx; pos.y = my; } }
    else if (isPanningRef.current) { setPan({ x: e.clientX - dragStartRef.current.x, y: e.clientY - dragStartRef.current.y }); }
    else { let found = null; nodes.forEach(node => { const pos = positionsRef.current.get(node.id); if (pos && Math.hypot(pos.x - mx, pos.y - my) <= (node.radius || 10) + 6) found = node; }); setHoveredNode(found); }
  };
  const handleMouseUp = () => { draggingNodeRef.current = null; isPanningRef.current = false; };

  return (
    <div style={{ position: "relative", width: "100%", borderRadius: "var(--radius-lg)", overflow: "hidden", border: "1px solid var(--border-subtle)", background: "var(--bg-surface)" }}>
      <div style={{ position: "absolute", top: "10px", left: "10px", right: "10px", display: "flex", justifyContent: "space-between", alignItems: "center", zIndex: 10, pointerEvents: "none" }}>
        <div style={{ display: "flex", gap: "8px", pointerEvents: "auto", background: "rgba(255,255,255,0.92)", padding: "5px 12px", borderRadius: "var(--radius-full)", border: "1px solid var(--border-subtle)", fontSize: "0.72rem" }}>
          <label style={{ display: "flex", alignItems: "center", gap: "4px", color: "var(--primary)", cursor: "pointer" }}><input type="checkbox" checked={filterCandidate} onChange={e => setFilterCandidate(e.target.checked)} /> Candidates</label>
          <label style={{ display: "flex", alignItems: "center", gap: "4px", color: "var(--purple)", cursor: "pointer" }}><input type="checkbox" checked={filterJob} onChange={e => setFilterJob(e.target.checked)} /> Jobs</label>
          <label style={{ display: "flex", alignItems: "center", gap: "4px", color: "var(--green)", cursor: "pointer" }}><input type="checkbox" checked={filterSkill} onChange={e => setFilterSkill(e.target.checked)} /> Skills</label>
        </div>
        <div style={{ display: "flex", gap: "5px", pointerEvents: "auto" }}>
          <button onClick={() => setZoom(z => Math.min(2.0, z + 0.15))} className="btn-secondary" style={{ padding: "5px 8px", borderRadius: "var(--radius-full)" }}><ZoomIn size={13} /></button>
          <button onClick={() => setZoom(z => Math.max(0.5, z - 0.15))} className="btn-secondary" style={{ padding: "5px 8px", borderRadius: "var(--radius-full)" }}><ZoomOut size={13} /></button>
          <button onClick={() => { setZoom(1); setPan({ x: 0, y: 0 }); setSelectedNodeId(null); }} className="btn-secondary" style={{ padding: "5px 8px", borderRadius: "var(--radius-full)" }}><RotateCcw size={13} /></button>
        </div>
      </div>
      <canvas ref={canvasRef} width={860} height={height} style={{ width: "100%", height: `${height}px`, display: "block", cursor: hoveredNode ? "pointer" : "grab" }}
        onMouseDown={handleMouseDown} onMouseMove={handleMouseMove} onMouseUp={handleMouseUp} onMouseLeave={handleMouseUp} />
      {hoveredNode && (
        <div style={{ position: "absolute", bottom: "10px", left: "10px", background: "rgba(255,255,255,0.95)", border: "1px solid var(--border-medium)", padding: "7px 12px", borderRadius: "var(--radius-md)", fontSize: "0.78rem", pointerEvents: "none", display: "flex", alignItems: "center", gap: "8px" }}>
          <span style={{ width: "8px", height: "8px", borderRadius: "50%", background: hoveredNode.type === "candidate" ? "var(--primary)" : hoveredNode.type === "job" ? "var(--purple)" : "var(--green)" }}></span>
          <strong>{hoveredNode.name}</strong>
          <span style={{ color: "var(--text-muted)" }}>· {hoveredNode.subtitle || hoveredNode.type}</span>
        </div>
      )}
    </div>
  );
}
