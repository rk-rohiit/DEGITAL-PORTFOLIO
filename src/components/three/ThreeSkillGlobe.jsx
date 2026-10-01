// src/components/three/ThreeSkillGlobe.jsx
// Style: Matches the "Initiate Communication" (Contact) section graphics —
// dotted globe, glowing signal arcs, icosahedron wireframe core.
// Enhanced with skill tags projected around the sphere surface.
import React, { useEffect, useRef, useState } from "react";
import * as THREE from "three";
import { BRAND_COLORS, createParticleTexture } from "./threeUtils";

const SKILL_ITEMS = [
  { name: "React",       category: "Frontend",    color: "#61dafb", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg" },
  { name: "Material UI", category: "Frontend",    color: "#007fff", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/materialui/materialui-original.svg" },
  { name: "JavaScript",  category: "Frontend",    color: "#f7df1e", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg" },
  { name: "Node.js",     category: "Backend",     color: "#68a063", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg" },
  { name: "MongoDB",     category: "Backend",     color: "#47a248", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mongodb/mongodb-original.svg" },
  { name: "Firebase",    category: "Backend",     color: "#ffca28", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/firebase/firebase-plain.svg" },
  { name: "Python",      category: "Languages",   color: "#3776ab", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg" },
  { name: "Java",        category: "Languages",   color: "#e76f00", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/java/java-original.svg" },
  { name: "C++",         category: "Languages",   color: "#00599c", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/cplusplus/cplusplus-original.svg" },
  { name: "C",           category: "Languages",   color: "#a8b9cc", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/c/c-original.svg" },
  { name: "Git",         category: "Tools",       color: "#f05032", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/git/git-original.svg" },
  { name: "GitHub",      category: "Tools",       color: "#8b949e", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/github/github-original.svg" },
  { name: "VS Code",     category: "Tools",       color: "#007acc", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/vscode/vscode-original.svg" },
  { name: "IntelliJ",   category: "Tools",       color: "#fe315d", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/intellij/intellij-original.svg" },
  { name: "Figma",       category: "AI & Design", color: "#f24e1e", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/figma/figma-original.svg" },
  { name: "Data Viz",    category: "AI & Design", color: "#f37726", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/d3js/d3js-original.svg" },
  { name: "ChatGPT",     category: "AI & Design", color: "#10a37f", icon: "https://upload.wikimedia.org/wikipedia/commons/0/04/ChatGPT_logo.svg" },
];

export default function ThreeSkillGlobe({ selectedCategory = "All" }) {
  const mountRef    = useRef(null);
  const groupRef    = useRef(null);
  const cameraRef   = useRef(null);
  const nodesRef    = useRef([]);
  const isDragging  = useRef(false);
  const prevMouse   = useRef({ x: 0, y: 0 });
  const velRef      = useRef({ x: 0.002, y: 0.006 });

  const [nodePositions, setNodePositions] = useState([]);
  const [hovered, setHovered]             = useState(null);

  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    const W = container.clientWidth  || 700;
    const H = container.clientHeight || 520;

    // ── Scene / Camera / Renderer ──────────────────────────────────────────
    const scene    = new THREE.Scene();
    const camera   = new THREE.PerspectiveCamera(50, W / H, 0.1, 100);
    camera.position.z = 11;
    cameraRef.current = camera;

    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true, powerPreference: "high-performance" });
    renderer.setSize(W, H);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setClearColor(0x000000, 0);
    renderer.domElement.style.width  = "100%";
    renderer.domElement.style.height = "100%";
    container.appendChild(renderer.domElement);

    // ── Main rotating group ────────────────────────────────────────────────
    const group = new THREE.Group();
    scene.add(group);
    groupRef.current = group;

    const sphereR = 3.6;

    // ── 1. Dotted Globe (Contact-style) ────────────────────────────────────
    const dotCount = 420;
    const dotGeo   = new THREE.BufferGeometry();
    const dotPos   = new Float32Array(dotCount * 3);

    for (let i = 0; i < dotCount; i++) {
      const phi   = Math.acos(-1 + (2 * i) / dotCount);
      const theta = Math.sqrt(dotCount * Math.PI) * phi;
      dotPos[i*3]   = sphereR * Math.cos(theta) * Math.sin(phi);
      dotPos[i*3+1] = sphereR * Math.sin(theta) * Math.sin(phi);
      dotPos[i*3+2] = sphereR * Math.cos(phi);
    }
    dotGeo.setAttribute("position", new THREE.BufferAttribute(dotPos, 3));

    const dotTex = createParticleTexture("#ffffff", "#00f2fe");
    const dotMat = new THREE.PointsMaterial({
      size: 0.16,
      map: dotTex,
      transparent: true,
      blending: THREE.AdditiveBlending,
      color: BRAND_COLORS.secondary,
      depthWrite: false,
      opacity: 0.75,
    });
    group.add(new THREE.Points(dotGeo, dotMat));

    // ── 2. Signal Arcs — exactly like Contact section ──────────────────────
    // Arc 1 — cyan (partial torus)
    const arcGeo1 = new THREE.TorusGeometry(sphereR * 1.15, 0.04, 20, 120, Math.PI * 1.4);
    const arcMat1 = new THREE.MeshBasicMaterial({ color: BRAND_COLORS.secondary, transparent: true, opacity: 0.9 });
    const arc1    = new THREE.Mesh(arcGeo1, arcMat1);
    arc1.rotation.x = Math.PI / 4;
    group.add(arc1);

    // Arc 2 — rose
    const arcGeo2 = new THREE.TorusGeometry(sphereR * 1.26, 0.03, 20, 120, Math.PI * 1.0);
    const arcMat2 = new THREE.MeshBasicMaterial({ color: BRAND_COLORS.primary, transparent: true, opacity: 0.8 });
    const arc2    = new THREE.Mesh(arcGeo2, arcMat2);
    arc2.rotation.y = Math.PI / 3;
    group.add(arc2);

    // Arc 3 — gold (extra ring for depth)
    const arcGeo3 = new THREE.TorusGeometry(sphereR * 1.35, 0.022, 16, 100, Math.PI * 0.75);
    const arcMat3 = new THREE.MeshBasicMaterial({ color: 0xffd700, transparent: true, opacity: 0.55 });
    const arc3    = new THREE.Mesh(arcGeo3, arcMat3);
    arc3.rotation.z = Math.PI / 5;
    arc3.rotation.x = -Math.PI / 6;
    group.add(arc3);

    // Full equatorial ring (subtle)
    const ringGeo = new THREE.TorusGeometry(sphereR * 1.1, 0.02, 12, 100);
    const ringMat = new THREE.MeshBasicMaterial({ color: BRAND_COLORS.secondary, transparent: true, opacity: 0.18 });
    const ringMesh = new THREE.Mesh(ringGeo, ringMat);
    ringMesh.rotation.x = Math.PI / 2;
    group.add(ringMesh);

    // ── 3. Icosahedron Wireframe Core — exactly like Contact ───────────────
    const coreGeo  = new THREE.IcosahedronGeometry(1.0, 1);
    const coreMat  = new THREE.MeshStandardMaterial({
      color: BRAND_COLORS.primary,
      emissive: BRAND_COLORS.primaryLight,
      emissiveIntensity: 1.2,
      wireframe: true,
    });
    const coreMesh = new THREE.Mesh(coreGeo, coreMat);
    group.add(coreMesh);

    // Core inner glow sphere
    const glowGeo = new THREE.SphereGeometry(0.62, 24, 24);
    const glowMat = new THREE.MeshStandardMaterial({
      color: BRAND_COLORS.secondary,
      emissive: BRAND_COLORS.secondary,
      emissiveIntensity: 1.8,
      transparent: true,
      opacity: 0.4,
    });
    group.add(new THREE.Mesh(glowGeo, glowMat));

    // ── 4. Skill Nodes on sphere surface ───────────────────────────────────
    const numSkills  = SKILL_ITEMS.length;
    const goldenRatio = (1 + Math.sqrt(5)) / 2;
    const nodes      = [];

    for (let i = 0; i < numSkills; i++) {
      const skill = SKILL_ITEMS[i];
      const theta = (2 * Math.PI * i) / goldenRatio;
      const yNorm = 1 - (i / (numSkills - 1)) * 2;
      const r     = Math.sqrt(1 - yNorm * yNorm);
      const pos   = new THREE.Vector3(
        Math.cos(theta) * r,
        yNorm,
        Math.sin(theta) * r
      ).multiplyScalar(sphereR);

      // Small glowing dot at node position
      const nGeo = new THREE.SphereGeometry(0.10, 10, 10);
      const nMat = new THREE.MeshStandardMaterial({
        color: new THREE.Color(skill.color),
        emissive: new THREE.Color(skill.color),
        emissiveIntensity: 1.5,
        roughness: 0.1,
        metalness: 0.4,
      });
      const nMesh = new THREE.Mesh(nGeo, nMat);
      nMesh.position.copy(pos);
      group.add(nMesh);

      nodes.push({ ...skill, id: i, worldPos: pos.clone(), mesh: nMesh, nMat });
    }
    nodesRef.current = nodes;

    // ── 5. Lights ──────────────────────────────────────────────────────────
    scene.add(new THREE.AmbientLight(0xffffff, 1.0));
    const pl1 = new THREE.PointLight(BRAND_COLORS.secondary, 4, 25);
    pl1.position.set(6, 6, 8);
    scene.add(pl1);
    const pl2 = new THREE.PointLight(BRAND_COLORS.primary, 3, 20);
    pl2.position.set(-6, -4, 6);
    scene.add(pl2);
    const pl3 = new THREE.PointLight(0xffd700, 2, 18);
    pl3.position.set(0, 8, -4);
    scene.add(pl3);

    // ── 6. Drag interaction ────────────────────────────────────────────────
    const onMouseDown = (e) => { isDragging.current = true; prevMouse.current = { x: e.clientX, y: e.clientY }; };
    const onMouseMove = (e) => {
      if (!isDragging.current) return;
      const dx = e.clientX - prevMouse.current.x;
      const dy = e.clientY - prevMouse.current.y;
      velRef.current.y = dx * 0.005;
      velRef.current.x = dy * 0.005;
      group.rotation.y += dx * 0.008;
      group.rotation.x += dy * 0.008;
      prevMouse.current = { x: e.clientX, y: e.clientY };
    };
    const onMouseUp = () => { isDragging.current = false; };
    const onTouchStart = (e) => { if (e.touches.length === 1) { isDragging.current = true; prevMouse.current = { x: e.touches[0].clientX, y: e.touches[0].clientY }; } };
    const onTouchMove  = (e) => { if (!isDragging.current || !e.touches.length) return; const dx = e.touches[0].clientX - prevMouse.current.x; const dy = e.touches[0].clientY - prevMouse.current.y; group.rotation.y += dx * 0.008; group.rotation.x += dy * 0.008; prevMouse.current = { x: e.touches[0].clientX, y: e.touches[0].clientY }; };

    const dom = renderer.domElement;
    dom.addEventListener("mousedown", onMouseDown);
    window.addEventListener("mousemove", onMouseMove);
    window.addEventListener("mouseup", onMouseUp);
    dom.addEventListener("touchstart", onTouchStart, { passive: true });
    window.addEventListener("touchmove",  onTouchMove,  { passive: true });
    window.addEventListener("touchend",   onMouseUp);

    // Resize
    const onResize = () => {
      if (!container) return;
      const w = container.clientWidth; const h = container.clientHeight;
      camera.aspect = w / h; camera.updateProjectionMatrix(); renderer.setSize(w, h);
    };
    window.addEventListener("resize", onResize);

    // ── 7. Animation Loop ──────────────────────────────────────────────────
    let animId; const clock = new THREE.Clock(); let frame = 0;

    const animate = () => {
      animId = requestAnimationFrame(animate);
      const t = clock.getElapsedTime();
      frame++;

      // Auto-spin + inertia
      if (!isDragging.current) {
        velRef.current.x *= 0.96;
        velRef.current.y *= 0.96;
        group.rotation.y += 0.005 + velRef.current.y;
        group.rotation.x += velRef.current.x;
      }

      // Arcs spin — exactly like Contact
      arc1.rotation.z  =  t * 0.6;
      arc2.rotation.z  = -t * 0.4;
      arc3.rotation.y  =  t * 0.3;
      ringMesh.rotation.z = t * 0.08;

      // Core icosahedron spin
      coreMesh.rotation.y = -t * 0.8;
      coreMesh.rotation.x =  t * 0.3;

      // Dot globe subtle pulse
      dotMat.opacity = 0.65 + Math.sin(t * 1.5) * 0.12;

      // Project skill nodes every 2nd frame
      if (frame % 2 === 0) {
        const cw = container.clientWidth || W;
        const ch = container.clientHeight || H;
        const tmp = new THREE.Vector3();
        const out = nodes.map((item) => {
          tmp.copy(item.worldPos);
          tmp.applyMatrix4(group.matrixWorld);
          const isFront = tmp.z > -2;
          tmp.project(camera);
          return {
            id:       item.id,
            name:     item.name,
            icon:     item.icon,
            color:    item.color,
            category: item.category,
            x:        ((tmp.x + 1) * cw) / 2,
            y:        ((-tmp.y + 1) * ch) / 2,
            z:        tmp.z,
            visible:  isFront,
            scale:    Math.max(0.6, 1 - (tmp.z - 0.5) * 0.3),
            opacity:  isFront ? Math.max(0.28, 1 - Math.max(0, tmp.z - 0.1)) : 0.1,
          };
        });
        setNodePositions(out);
      }

      renderer.render(scene, camera);
    };
    animate();

    // ── Cleanup ────────────────────────────────────────────────────────────
    return () => {
      cancelAnimationFrame(animId);
      dom.removeEventListener("mousedown", onMouseDown);
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("mouseup",   onMouseUp);
      dom.removeEventListener("touchstart",  onTouchStart);
      window.removeEventListener("touchmove", onTouchMove);
      window.removeEventListener("touchend",  onMouseUp);
      window.removeEventListener("resize",    onResize);
      nodes.forEach(n => { n.mesh.geometry.dispose(); n.nMat.dispose(); });
      [dotGeo, arcGeo1, arcGeo2, arcGeo3, ringGeo, coreGeo, glowGeo].forEach(g => g.dispose());
      [dotMat, arcMat1, arcMat2, arcMat3, ringMat, coreMat, glowMat].forEach(m => m.dispose());
      dotTex.dispose();
      if (dom.parentNode) dom.parentNode.removeChild(dom);
      renderer.dispose();
    };
  }, []);

  return (
    <div
      className="relative w-full h-[520px] max-w-4xl mx-auto select-none overflow-hidden rounded-3xl"
      style={{
        background: "radial-gradient(ellipse at center, rgba(0,16,36,0.97) 0%, rgba(9,10,16,0.99) 75%)",
        border: "1px solid rgba(0,242,254,0.18)",
        boxShadow: "0 0 60px rgba(0,242,254,0.07), 0 0 100px rgba(255,0,85,0.05), inset 0 0 60px rgba(0,242,254,0.025)",
      }}
    >
      {/* Corner reticles — same as Contact/HUD style */}
      {[
        "top-3 left-3 border-t-2 border-l-2 border-cyan-400/70",
        "top-3 right-3 border-t-2 border-r-2 border-rose-400/70",
        "bottom-3 left-3 border-b-2 border-l-2 border-rose-400/50",
        "bottom-3 right-3 border-b-2 border-r-2 border-cyan-400/50",
      ].map((cls, i) => (
        <div key={i} className={`absolute w-5 h-5 pointer-events-none ${cls}`} />
      ))}

      {/* Scan-line ping bar */}
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-cyan-400/50 to-transparent pointer-events-none animate-cyber-scan" style={{ animationDuration: "4s" }} />

      {/* Three.js canvas */}
      <div ref={mountRef} className="w-full h-full cursor-grab active:cursor-grabbing" />

      {/* Projected Skill Tags */}
      <div className="absolute inset-0 pointer-events-none">
        {nodePositions.map((node) => {
          const isMatch = selectedCategory === "All" || node.category === selectedCategory;
          const isHov   = hovered === node.id;
          return (
            <div
              key={node.id}
              style={{
                position: "absolute",
                left: `${node.x}px`,
                top:  `${node.y}px`,
                transform: `translate(-50%,-50%) scale(${isHov ? node.scale * 1.28 : node.scale})`,
                opacity: isMatch ? (isHov ? 1 : node.opacity) : 0.1,
                zIndex: isHov ? 50 : Math.round((1 - node.z) * 100),
                transition: "opacity 0.2s ease, transform 0.15s ease",
              }}
              className="pointer-events-auto"
              onMouseEnter={() => setHovered(node.id)}
              onMouseLeave={() => setHovered(null)}
            >
              <div
                className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-full backdrop-blur-xl cursor-pointer transition-all duration-200"
                style={{
                  background: isHov ? "rgba(9,10,16,0.95)" : "rgba(9,10,16,0.80)",
                  border: `1px solid ${isHov ? node.color : "rgba(148,163,184,0.18)"}`,
                  boxShadow: isHov ? `0 0 14px ${node.color}55, 0 0 4px ${node.color}33` : "none",
                }}
              >
                <img
                  src={node.icon}
                  alt={node.name}
                  className="w-4 h-4 object-contain flex-shrink-0"
                  style={{ filter: isHov ? `drop-shadow(0 0 5px ${node.color})` : "none", transition: "filter 0.2s ease" }}
                />
                <span
                  className="text-[11px] font-semibold whitespace-nowrap font-mono"
                  style={{ color: isHov ? node.color : "#cbd5e1" }}
                >
                  {node.name}
                </span>
              </div>
            </div>
          );
        })}
      </div>

      {/* Bottom status bar — Contact-section style */}
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 pointer-events-none flex items-center gap-2.5 bg-slate-950/85 backdrop-blur-md px-4 py-1.5 rounded-full border border-cyan-500/25 text-xs font-mono text-slate-400 shadow-sm">
        <span className="flex h-1.5 w-1.5 relative">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75" />
          <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-cyan-500" />
        </span>
        <span className="text-cyan-400 font-bold">SIGNAL ACTIVE</span>
        <span className="text-slate-600">|</span>
        <span>drag to rotate</span>
        <span className="text-slate-600">·</span>
        <span className="text-slate-300">{SKILL_ITEMS.length} technologies</span>
      </div>
    </div>
  );
}
