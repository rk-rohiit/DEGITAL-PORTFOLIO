// src/components/DevTransmission.jsx
// A fully animated canvas-based "Developer Portfolio Contact" visual.
// Shows: live terminal code typing + data packets flying to dev hub +
// pulsing signal rings + network nodes + "CONNECTED" handshake animation.
import React, { useEffect, useRef } from "react";

const TERMINAL_LINES = [
  { text: "$ ping rohit.dev --status", color: "#94a3b8" },
  { text: "> Resolving host... [OK]",   color: "#00f2fe" },
  { text: "$ ssh visitor@portfolio.io", color: "#94a3b8" },
  { text: "> Authenticating user...",   color: "#ffd700" },
  { text: "> Connection established!",  color: "#00ff88" },
  { text: "$ git clone rohit/projects", color: "#94a3b8" },
  { text: "> Cloning 24 repositories.", color: "#00f2fe" },
  { text: "$ node server.js --prod",    color: "#94a3b8" },
  { text: "> Server running :3000",     color: "#00ff88" },
  { text: "$ curl /api/contact -X POST",color: "#94a3b8" },
  { text: '> { status: "ready" }',      color: "#ff0055" },
  { text: "> Awaiting your message...", color: "#ffd700" },
];

const NODE_LABELS = ["React", "Node.js", "MongoDB", "Python", "AI/ML", "Three.js", "REST API", "Git"];
const NODE_COLORS = ["#61dafb", "#68a063", "#47a248", "#3776ab", "#10a37f", "#00f2fe", "#ff0055", "#f05032"];

export default function DevTransmission() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");

    const resize = () => {
      canvas.width  = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
    };
    resize();
    window.addEventListener("resize", resize);

    // ── State ────────────────────────────────────────────────────────────
    let animId;
    let t = 0;

    // Terminal typewriter state
    const termState = {
      lineIdx:    0,
      charIdx:    0,
      lines:      [],       // fully typed lines shown
      currentText: "",
      delay:      0,
      pauseAfter: 0,
    };

    // Packets flying to center
    const packets = [];
    const spawnPacket = () => {
      const W = canvas.width, H = canvas.height;
      const cx = W * 0.72, cy = H / 2;
      // Random edge origin
      const edge = Math.floor(Math.random() * 4);
      let sx, sy;
      if (edge === 0) { sx = Math.random() * W * 0.45; sy = Math.random() * H; }
      else if (edge === 1) { sx = Math.random() * W * 0.45; sy = Math.random() * H * 0.3; }
      else { sx = Math.random() * W * 0.3; sy = Math.random() * H; }
      const col = NODE_COLORS[Math.floor(Math.random() * NODE_COLORS.length)];
      packets.push({
        x: sx, y: sy,
        tx: cx + (Math.random() - 0.5) * 20,
        ty: cy + (Math.random() - 0.5) * 20,
        progress: 0,
        speed: 0.006 + Math.random() * 0.008,
        color: col,
        size: 3 + Math.random() * 3,
        trail: [],
      });
    };

    // Tech nodes orbiting around dev hub
    const nodeCount = NODE_LABELS.length;
    const nodeAngles = NODE_LABELS.map((_, i) => (i / nodeCount) * Math.PI * 2);

    // ── Draw helpers ──────────────────────────────────────────────────────
    const drawGlowText = (text, x, y, size, color, alpha = 1) => {
      ctx.save();
      ctx.globalAlpha = alpha;
      ctx.font = `${size}px 'Fira Code', 'Courier New', monospace`;
      ctx.shadowColor = color;
      ctx.shadowBlur = 12;
      ctx.fillStyle = color;
      ctx.fillText(text, x, y);
      ctx.restore();
    };

    const drawGlowCircle = (x, y, r, color, alpha = 1, lineW = 1.5) => {
      ctx.save();
      ctx.globalAlpha = alpha;
      ctx.strokeStyle = color;
      ctx.lineWidth = lineW;
      ctx.shadowColor = color;
      ctx.shadowBlur = 18;
      ctx.beginPath();
      ctx.arc(x, y, r, 0, Math.PI * 2);
      ctx.stroke();
      ctx.restore();
    };

    const drawLine = (x1, y1, x2, y2, color, alpha = 0.3, dash = []) => {
      ctx.save();
      ctx.globalAlpha = alpha;
      ctx.strokeStyle = color;
      ctx.lineWidth = 1;
      ctx.shadowColor = color;
      ctx.shadowBlur = 6;
      if (dash.length) ctx.setLineDash(dash);
      ctx.beginPath();
      ctx.moveTo(x1, y1);
      ctx.lineTo(x2, y2);
      ctx.stroke();
      ctx.restore();
    };

    // ── Main render ───────────────────────────────────────────────────────
    const draw = () => {
      animId = requestAnimationFrame(draw);
      t += 0.016;

      const W = canvas.width, H = canvas.height;
      if (W === 0 || H === 0) return;

      // Clear
      ctx.clearRect(0, 0, W, H);

      // Dev hub center (right 72% of canvas)
      const hubX = W * 0.72, hubY = H / 2;
      // Terminal area (left side)
      const termX = 18, termY = 32;
      const termW = W * 0.52, termH = H - 48;
      const isMobile = W < 500;

      // ── Background grid (subtle) ─────────────────────────────────────────
      ctx.save();
      ctx.strokeStyle = "rgba(0,242,254,0.04)";
      ctx.lineWidth = 0.5;
      const gs = 40;
      for (let gx = 0; gx < W; gx += gs) {
        ctx.beginPath(); ctx.moveTo(gx, 0); ctx.lineTo(gx, H); ctx.stroke();
      }
      for (let gy = 0; gy < H; gy += gs) {
        ctx.beginPath(); ctx.moveTo(0, gy); ctx.lineTo(W, gy); ctx.stroke();
      }
      ctx.restore();

      // ── Terminal Panel (left) ─────────────────────────────────────────────
      if (!isMobile) {
        // Panel bg
        ctx.save();
        ctx.globalAlpha = 0.75;
        ctx.fillStyle = "rgba(9,10,16,0.85)";
        const rr = 12;
        ctx.beginPath();
        ctx.roundRect(termX, termY, termW - 20, termH, rr);
        ctx.fill();
        ctx.globalAlpha = 1;
        ctx.strokeStyle = "rgba(0,242,254,0.22)";
        ctx.lineWidth = 1;
        ctx.stroke();
        ctx.restore();

        // Title bar
        ctx.save();
        ctx.fillStyle = "rgba(0,242,254,0.08)";
        ctx.beginPath();
        ctx.roundRect(termX, termY, termW - 20, 28, [rr, rr, 0, 0]);
        ctx.fill();
        ctx.restore();

        // Traffic lights
        const dots = ["#ff5f57", "#febc2e", "#28c840"];
        dots.forEach((c, i) => {
          ctx.save();
          ctx.fillStyle = c;
          ctx.shadowColor = c;
          ctx.shadowBlur = 6;
          ctx.beginPath();
          ctx.arc(termX + 18 + i * 18, termY + 14, 5, 0, Math.PI * 2);
          ctx.fill();
          ctx.restore();
        });

        // Terminal title
        drawGlowText("rohit@portfolio: ~", termX + 72, termY + 19, 11, "#00f2fe", 0.7);
        drawGlowText("▌", termX + 200, termY + 19, 11, "#94a3b8", 0.4);

        // Typed lines
        const lineH = 18, startY = termY + 44;
        const maxLines = Math.floor((termH - 50) / lineH);
        const showLines = termState.lines.slice(-maxLines);
        showLines.forEach((ln, i) => {
          drawGlowText(ln.text, termX + 12, startY + i * lineH, 11, ln.color, 0.9);
        });

        // Current typing line
        const curY = startY + showLines.length * lineH;
        if (curY < termY + termH - 10) {
          const curLine = TERMINAL_LINES[termState.lineIdx % TERMINAL_LINES.length];
          const blink = Math.sin(t * 6) > 0;
          drawGlowText(
            termState.currentText + (blink ? "█" : " "),
            termX + 12, curY, 11, curLine.color, 0.95
          );
        }

        // Corner accent lines
        const cx2 = termX, cy2 = termY;
        drawLine(cx2, cy2, cx2 + 20, cy2, "#00f2fe", 0.8);
        drawLine(cx2, cy2, cx2, cy2 + 20, "#00f2fe", 0.8);
        const ex = termX + termW - 20, ey = termY + termH;
        drawLine(ex, ey, ex - 20, ey, "#ff0055", 0.6);
        drawLine(ex, ey, ex, ey - 20, "#ff0055", 0.6);
      }

      // ── Dev Hub (right) ───────────────────────────────────────────────────
      // Pulsing signal rings
      for (let ring = 0; ring < 4; ring++) {
        const phase = (t * 0.7 + ring * 0.5) % (Math.PI * 2);
        const pFrac = (Math.sin(phase) * 0.5 + 0.5);
        const r = 40 + ring * 26 + pFrac * 12;
        const alpha = (1 - ring / 4) * 0.35 * (1 - pFrac * 0.5);
        drawGlowCircle(hubX, hubY, r, "#00f2fe", alpha, 1.2 - ring * 0.2);
      }

      // Outer expanding broadcast rings
      for (let br = 0; br < 3; br++) {
        const phase = ((t * 0.4 + br * 1.1) % 3) / 3;
        const r = 55 + phase * 120;
        const alpha = (1 - phase) * 0.18;
        drawGlowCircle(hubX, hubY, r, "#ff0055", alpha, 1);
      }

      // Orbiting tech nodes
      const orbitR = isMobile ? 65 : 82;
      nodeAngles.forEach((baseAngle, i) => {
        const angle = baseAngle + t * 0.22;
        const nx = hubX + Math.cos(angle) * orbitR;
        const ny = hubY + Math.sin(angle) * orbitR * 0.55;

        // Connection line to hub
        const connAlpha = 0.15 + Math.sin(t * 1.2 + i) * 0.08;
        drawLine(nx, ny, hubX, hubY, NODE_COLORS[i], connAlpha, [3, 4]);

        // Node circle
        ctx.save();
        ctx.globalAlpha = 0.9;
        ctx.fillStyle = "rgba(9,10,16,0.9)";
        ctx.shadowColor = NODE_COLORS[i];
        ctx.shadowBlur = 14;
        ctx.beginPath();
        ctx.arc(nx, ny, 18, 0, Math.PI * 2);
        ctx.fill();
        ctx.strokeStyle = NODE_COLORS[i];
        ctx.lineWidth = 1.5;
        ctx.stroke();
        ctx.restore();

        // Node label
        ctx.save();
        ctx.font = "bold 8.5px 'Fira Code', monospace";
        ctx.textAlign = "center";
        ctx.textBaseline = "middle";
        ctx.fillStyle = NODE_COLORS[i];
        ctx.shadowColor = NODE_COLORS[i];
        ctx.shadowBlur = 8;
        ctx.fillText(NODE_LABELS[i], nx, ny);
        ctx.restore();
      });

      // Hub core circle
      ctx.save();
      const coreGrad = ctx.createRadialGradient(hubX, hubY, 0, hubX, hubY, 36);
      coreGrad.addColorStop(0, "rgba(0,242,254,0.22)");
      coreGrad.addColorStop(0.5, "rgba(0,242,254,0.10)");
      coreGrad.addColorStop(1, "rgba(0,242,254,0.02)");
      ctx.fillStyle = coreGrad;
      ctx.beginPath();
      ctx.arc(hubX, hubY, 36, 0, Math.PI * 2);
      ctx.fill();
      // Hub border
      ctx.strokeStyle = "#00f2fe";
      ctx.lineWidth = 2;
      ctx.shadowColor = "#00f2fe";
      ctx.shadowBlur = 20;
      ctx.stroke();
      ctx.restore();

      // Hub icon: </>  developer symbol
      ctx.save();
      ctx.font = "bold 15px 'Fira Code', monospace";
      ctx.textAlign = "center";
      ctx.textBaseline = "middle";
      ctx.fillStyle = "#ffffff";
      ctx.shadowColor = "#00f2fe";
      ctx.shadowBlur = 18;
      ctx.fillText("< />", hubX, hubY - 2);
      ctx.font = "8px 'Fira Code', monospace";
      ctx.fillStyle = "#00f2fe";
      ctx.shadowBlur = 8;
      ctx.fillText("rohit.dev", hubX, hubY + 14);
      ctx.restore();

      // ── Status badge below hub ────────────────────────────────────────────
      const badgeY = hubY + 50;
      const connected = t > 2.5;
      const badgeText   = connected ? "● CONNECTED" : "◌ CONNECTING...";
      const badgeColor  = connected ? "#00ff88" : "#ffd700";
      ctx.save();
      ctx.globalAlpha = 0.92;
      ctx.fillStyle = "rgba(9,10,16,0.88)";
      const bw = 130, bh = 22;
      ctx.beginPath();
      ctx.roundRect(hubX - bw/2, badgeY - bh/2, bw, bh, 11);
      ctx.fill();
      ctx.strokeStyle = badgeColor;
      ctx.lineWidth = 1;
      ctx.stroke();
      ctx.restore();
      ctx.save();
      ctx.font = "bold 10px 'Fira Code', monospace";
      ctx.textAlign = "center";
      ctx.textBaseline = "middle";
      ctx.fillStyle = badgeColor;
      ctx.shadowColor = badgeColor;
      ctx.shadowBlur = 10;
      ctx.fillText(badgeText, hubX, badgeY);
      ctx.restore();

      // ── Data packets ──────────────────────────────────────────────────────
      // Spawn occasionally
      if (Math.random() < 0.035) spawnPacket();

      for (let pi = packets.length - 1; pi >= 0; pi--) {
        const pk = packets[pi];
        pk.progress += pk.speed;

        const ease = pk.progress < 0.5
          ? 2 * pk.progress * pk.progress
          : 1 - Math.pow(-2 * pk.progress + 2, 2) / 2;

        const px2 = pk.x + (pk.tx - pk.x) * ease;
        const py2 = pk.y + (pk.ty - pk.y) * ease;

        pk.trail.push({ x: px2, y: py2 });
        if (pk.trail.length > 12) pk.trail.shift();

        // Draw trail
        pk.trail.forEach((tp, ti) => {
          const ta = (ti / pk.trail.length) * 0.5;
          ctx.save();
          ctx.globalAlpha = ta;
          ctx.fillStyle = pk.color;
          ctx.shadowColor = pk.color;
          ctx.shadowBlur = 6;
          const ts = pk.size * (ti / pk.trail.length) * 0.6;
          ctx.beginPath();
          ctx.arc(tp.x, tp.y, ts, 0, Math.PI * 2);
          ctx.fill();
          ctx.restore();
        });

        // Draw head
        ctx.save();
        ctx.globalAlpha = 1 - pk.progress;
        ctx.fillStyle = pk.color;
        ctx.shadowColor = pk.color;
        ctx.shadowBlur = 14;
        ctx.beginPath();
        ctx.arc(px2, py2, pk.size, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();

        if (pk.progress >= 1) packets.splice(pi, 1);
      }

      // ── Typewriter tick ───────────────────────────────────────────────────
      termState.delay++;
      if (termState.delay > 2) {
        termState.delay = 0;
        if (termState.pauseAfter > 0) {
          termState.pauseAfter--;
        } else {
          const line = TERMINAL_LINES[termState.lineIdx % TERMINAL_LINES.length];
          if (termState.charIdx < line.text.length) {
            termState.currentText += line.text[termState.charIdx];
            termState.charIdx++;
          } else {
            termState.lines.push({ text: termState.currentText, color: line.color });
            termState.currentText = "";
            termState.charIdx = 0;
            termState.lineIdx++;
            termState.pauseAfter = 20;
            // Cap terminal history
            if (termState.lines.length > 20) termState.lines.shift();
          }
        }
      }
    };

    draw();

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener("resize", resize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="w-full"
      style={{ height: "300px", display: "block" }}
      aria-label="Developer portfolio contact visualization"
    />
  );
}
