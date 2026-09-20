import React, { useEffect, useRef, useState } from "react";
import { ZoomIn, ZoomOut, RotateCcw, Filter } from "lucide-react";

export default function GraphCanvas({
  nodes = [],
  links = [],
  activeCandId,
  activeJobId,
  onSelectNode,
  height = 420
}) {
  const canvasRef = useRef(null);
  const [zoom, setZoom] = useState(1);
  const [pan, setPan] = useState({ x: 0, y: 0 });
  const [filterCandidate, setFilterCandidate] = useState(true);
  const [filterJob, setFilterJob] = useState(true);
  const [filterSkill, setFilterSkill] = useState(true);
  const [hoveredNode, setHoveredNode] = useState(null);
  const [selectedNodeId, setSelectedNodeId] = useState(null);

  // Position state for simulation
  const positionsRef = useRef(new Map());
  const draggingNodeRef = useRef(null);
  const dragStartRef = useRef({ x: 0, y: 0 });
  const isPanningRef = useRef(false);

  // Initialize node positions if not already set
  useEffect(() => {
    const width = 800;
    const h = height;
    const posMap = positionsRef.current;

    nodes.forEach((node, idx) => {
      if (!posMap.has(node.id)) {
        // Initial layout: Candidates on left, Jobs on right, Skills in center
        let initialX = width / 2;
        let initialY = h / 2;

        if (node.type === "candidate") {
          initialX = 140 + (idx % 3) * 60;
          initialY = 70 + Math.floor(idx / 2) * 90;
        } else if (node.type === "job") {
          initialX = width - 180 + (idx % 2) * 50;
          initialY = 80 + idx * 85;
        } else {
          // Skill nodes in middle
          initialX = 320 + (idx % 4) * 80;
          initialY = 60 + Math.floor(idx / 3) * 65;
        }

        posMap.set(node.id, {
          x: initialX + (Math.random() * 20 - 10),
          y: initialY + (Math.random() * 20 - 10),
          vx: 0,
          vy: 0
        });
      }
    });
  }, [nodes, height]);

  // Main Canvas Render Loop
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    let animationFrameId;

    const render = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      ctx.save();
      ctx.translate(pan.x, pan.y);
      ctx.scale(zoom, zoom);

      const posMap = positionsRef.current;

      // Filter visible nodes
      const isVisible = (node) => {
        if (node.type === "candidate" && !filterCandidate) return false;
        if (node.type === "job" && !filterJob) return false;
        if (node.type === "skill" && !filterSkill) return false;
        return true;
      };

      // Draw Links
      links.forEach(link => {
        const sourceNode = nodes.find(n => n.id === link.source);
        const targetNode = nodes.find(n => n.id === link.target);

        if (!sourceNode || !targetNode || !isVisible(sourceNode) || !isVisible(targetNode)) return;

        const p1 = posMap.get(link.source);
        const p2 = posMap.get(link.target);
        if (!p1 || !p2) return;

        const isHighlighted = link.isHighlighted ||
          (selectedNodeId && (link.source === selectedNodeId || link.target === selectedNodeId));

        ctx.beginPath();
        ctx.moveTo(p1.x, p1.y);
        ctx.lineTo(p2.x, p2.y);

        if (link.isHighlighted) {
          ctx.strokeStyle = "rgba(245, 158, 11, 0.85)";
          ctx.lineWidth = 3;
          ctx.setLineDash([6, 4]);
        } else if (isHighlighted) {
          ctx.strokeStyle = "rgba(6, 182, 212, 0.7)";
          ctx.lineWidth = 2;
          ctx.setLineDash([]);
        } else {
          ctx.strokeStyle = link.color || "rgba(255, 255, 255, 0.1)";
          ctx.lineWidth = link.weight || 1;
          ctx.setLineDash([]);
        }
        ctx.stroke();
        ctx.setLineDash([]);
      });

      // Draw Nodes
      nodes.forEach(node => {
        if (!isVisible(node)) return;

        const pos = posMap.get(node.id);
        if (!pos) return;

        const isSelected = node.id === activeCandId || node.id === activeJobId || node.id === selectedNodeId;
        const isHovered = hoveredNode && hoveredNode.id === node.id;
        const radius = (node.radius || 10) + (isSelected ? 3 : 0) + (isHovered ? 2 : 0);

        // Glow
        if (isSelected || isHovered) {
          ctx.beginPath();
          ctx.arc(pos.x, pos.y, radius + 6, 0, Math.PI * 2);
          ctx.fillStyle = node.type === "candidate" ? "rgba(6, 182, 212, 0.3)" :
                          node.type === "job" ? "rgba(139, 92, 246, 0.3)" : "rgba(16, 185, 129, 0.3)";
          ctx.fill();
        }

        // Node Circle
        ctx.beginPath();
        ctx.arc(pos.x, pos.y, radius, 0, Math.PI * 2);
        ctx.fillStyle = node.type === "candidate" ? "#06b6d4" :
                        node.type === "job" ? "#8b5cf6" : "#10b981";
        ctx.fill();
        ctx.strokeStyle = isSelected ? "#ffffff" : "#090d16";
        ctx.lineWidth = 2;
        ctx.stroke();

        // Node Label
        ctx.font = isSelected ? "bold 11px Inter, sans-serif" : "10px Inter, sans-serif";
        ctx.fillStyle = isSelected ? "#ffffff" : "rgba(255, 255, 255, 0.85)";
        ctx.textAlign = "center";
        ctx.fillText(node.name, pos.x, pos.y + radius + 14);
      });

      ctx.restore();
      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animationFrameId);
    };
  }, [nodes, links, zoom, pan, filterCandidate, filterJob, filterSkill, activeCandId, activeJobId, selectedNodeId, hoveredNode]);

  // Mouse handlers for dragging & clicking
  const handleMouseDown = (e) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const rect = canvas.getBoundingClientRect();
    const mouseX = (e.clientX - rect.left - pan.x) / zoom;
    const mouseY = (e.clientY - rect.top - pan.y) / zoom;

    // Find clicked node
    const posMap = positionsRef.current;
    let clickedNode = null;

    nodes.forEach(node => {
      const pos = posMap.get(node.id);
      if (pos) {
        const dist = Math.hypot(pos.x - mouseX, pos.y - mouseY);
        if (dist <= (node.radius || 10) + 6) {
          clickedNode = node;
        }
      }
    });

    if (clickedNode) {
      draggingNodeRef.current = clickedNode;
      dragStartRef.current = { x: mouseX, y: mouseY };
      setSelectedNodeId(clickedNode.id);
      if (onSelectNode) onSelectNode(clickedNode);
    } else {
      isPanningRef.current = true;
      dragStartRef.current = { x: e.clientX - pan.x, y: e.clientY - pan.y };
    }
  };

  const handleMouseMove = (e) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const rect = canvas.getBoundingClientRect();
    const mouseX = (e.clientX - rect.left - pan.x) / zoom;
    const mouseY = (e.clientY - rect.top - pan.y) / zoom;

    if (draggingNodeRef.current) {
      const pos = positionsRef.current.get(draggingNodeRef.current.id);
      if (pos) {
        pos.x = mouseX;
        pos.y = mouseY;
      }
    } else if (isPanningRef.current) {
      setPan({
        x: e.clientX - dragStartRef.current.x,
        y: e.clientY - dragStartRef.current.y
      });
    } else {
      // Hover detection
      const posMap = positionsRef.current;
      let found = null;
      nodes.forEach(node => {
        const pos = posMap.get(node.id);
        if (pos) {
          const dist = Math.hypot(pos.x - mouseX, pos.y - mouseY);
          if (dist <= (node.radius || 10) + 6) {
            found = node;
          }
        }
      });
      setHoveredNode(found);
    }
  };

  const handleMouseUp = () => {
    draggingNodeRef.current = null;
    isPanningRef.current = false;
  };

  const resetView = () => {
    setZoom(1);
    setPan({ x: 0, y: 0 });
    setSelectedNodeId(null);
  };

  return (
    <div style={{ position: "relative", width: "100%", borderRadius: "var(--radius-lg)", overflow: "hidden", border: "1px solid var(--border-subtle)", background: "var(--bg-canvas)" }}>
      {/* Canvas Controls Header */}
      <div style={{
        position: "absolute",
        top: "12px",
        left: "12px",
        right: "12px",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        zIndex: 10,
        pointerEvents: "none"
      }}>
        {/* Node Filter Toggles */}
        <div style={{ display: "flex", gap: "8px", pointerEvents: "auto", background: "rgba(14, 20, 36, 0.85)", backdropFilter: "blur(8px)", padding: "6px 12px", borderRadius: "var(--radius-full)", border: "1px solid var(--border-subtle)" }}>
          <label style={{ display: "flex", alignItems: "center", gap: "5px", fontSize: "0.75rem", color: "var(--cyan-primary)", cursor: "pointer" }}>
            <input type="checkbox" checked={filterCandidate} onChange={e => setFilterCandidate(e.target.checked)} />
            Candidates
          </label>
          <label style={{ display: "flex", alignItems: "center", gap: "5px", fontSize: "0.75rem", color: "var(--violet-primary)", cursor: "pointer" }}>
            <input type="checkbox" checked={filterJob} onChange={e => setFilterJob(e.target.checked)} />
            Jobs
          </label>
          <label style={{ display: "flex", alignItems: "center", gap: "5px", fontSize: "0.75rem", color: "var(--emerald-primary)", cursor: "pointer" }}>
            <input type="checkbox" checked={filterSkill} onChange={e => setFilterSkill(e.target.checked)} />
            Skills
          </label>
        </div>

        {/* Zoom & Reset Buttons */}
        <div style={{ display: "flex", gap: "6px", pointerEvents: "auto" }}>
          <button
            onClick={() => setZoom(z => Math.min(2.0, z + 0.15))}
            className="btn-secondary"
            style={{ padding: "6px 10px", borderRadius: "var(--radius-full)" }}
            title="Zoom In"
          >
            <ZoomIn size={14} />
          </button>
          <button
            onClick={() => setZoom(z => Math.max(0.5, z - 0.15))}
            className="btn-secondary"
            style={{ padding: "6px 10px", borderRadius: "var(--radius-full)" }}
            title="Zoom Out"
          >
            <ZoomOut size={14} />
          </button>
          <button
            onClick={resetView}
            className="btn-secondary"
            style={{ padding: "6px 10px", borderRadius: "var(--radius-full)" }}
            title="Reset View"
          >
            <RotateCcw size={14} />
          </button>
        </div>
      </div>

      {/* Main Canvas */}
      <canvas
        ref={canvasRef}
        width={860}
        height={height}
        style={{ width: "100%", height: `${height}px`, display: "block", cursor: hoveredNode ? "pointer" : "grab" }}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseUp}
      />

      {/* Hover Info Tooltip Bar */}
      {hoveredNode && (
        <div style={{
          position: "absolute",
          bottom: "12px",
          left: "12px",
          background: "rgba(14, 20, 36, 0.92)",
          backdropFilter: "blur(12px)",
          border: "1px solid var(--border-medium)",
          padding: "8px 14px",
          borderRadius: "var(--radius-md)",
          fontSize: "0.8rem",
          pointerEvents: "none",
          display: "flex",
          alignItems: "center",
          gap: "10px"
        }}>
          <span style={{
            width: "10px",
            height: "10px",
            borderRadius: "50%",
            background: hoveredNode.type === "candidate" ? "var(--cyan-primary)" :
                        hoveredNode.type === "job" ? "var(--violet-primary)" : "var(--emerald-primary)"
          }}></span>
          <strong style={{ color: "var(--text-primary)" }}>{hoveredNode.name}</strong>
          <span style={{ color: "var(--text-muted)" }}>• {hoveredNode.subtitle || hoveredNode.type}</span>
          <span style={{ fontSize: "0.7rem", color: "var(--cyan-primary)", marginLeft: "6px" }}>Click to inspect 1-hop subgraph</span>
        </div>
      )}
    </div>
  );
}
