// src/components/three/ThreeSkillReactor.jsx
// Quantum Cyber Reactor & Holographic Tech Matrix
// Replaces the old spherical globe with a futuristic, multi-tiered 3D cyber platform:
// - Central glowing polyhedral AI Reactor Core (pulsing octahedron + cyber cage)
// - Vertical holographic laser particle beam
// - Multi-tiered orbital tech arrays with connecting laser energy conduits
// - Concentric rotating cybernetic data rings & ground holographic radar grid
// - Interactive 3D mouse drag rotation, auto-rotation, node hover & category filter highlighting
import React, { useEffect, useRef, useState, useMemo } from "react";
import * as THREE from "three";
import { BRAND_COLORS, createParticleTexture, createRingTexture } from "./threeUtils";
import { RotateCcw, Play, Pause, Zap, Cpu, Layers } from "lucide-react";

export const TECH_SKILLS = [
  // --- Tier 1: Inner Orbit (Core Frontend & AI) ---
  {
    name: "React",
    category: "Frontend",
    level: "95%",
    tier: 1,
    radius: 3.2,
    angle: 0.1,
    yOffset: 0.5,
    color: "#61dafb",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg",
    desc: "Component Architecture, Virtual DOM & Hooks",
  },
  {
    name: "JavaScript",
    category: "Frontend",
    level: "92%",
    tier: 1,
    radius: 3.3,
    angle: 1.35,
    yOffset: -0.4,
    color: "#f7df1e",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg",
    desc: "Modern ES6+, Async/Await & Event Loop",
  },
  {
    name: "ChatGPT / AI",
    category: "AI & Design",
    level: "90%",
    tier: 1,
    radius: 3.1,
    angle: 2.65,
    yOffset: 0.6,
    color: "#10a37f",
    icon: "https://upload.wikimedia.org/wikipedia/commons/0/04/ChatGPT_logo.svg",
    desc: "Prompt Engineering, LLM Integration & AI APIs",
  },
  {
    name: "Material UI",
    category: "Frontend",
    level: "88%",
    tier: 1,
    radius: 3.4,
    angle: 3.9,
    yOffset: -0.5,
    color: "#007fff",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/materialui/materialui-original.svg",
    desc: "Enterprise Design Systems & Responsive Layouts",
  },
  {
    name: "Figma",
    category: "AI & Design",
    level: "86%",
    tier: 1,
    radius: 3.2,
    angle: 5.15,
    yOffset: 0.4,
    color: "#f24e1e",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/figma/figma-original.svg",
    desc: "UI/UX Prototyping & Design Systems",
  },

  // --- Tier 2: Middle Orbit (Backend & Languages) ---
  {
    name: "Node.js",
    category: "Backend",
    level: "90%",
    tier: 2,
    radius: 4.8,
    angle: 0.7,
    yOffset: 0.3,
    color: "#68a063",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg",
    desc: "Scalable Microservices & Event-driven I/O",
  },
  {
    name: "MongoDB",
    category: "Backend",
    level: "88%",
    tier: 2,
    radius: 4.7,
    angle: 1.95,
    yOffset: -0.6,
    color: "#47a248",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mongodb/mongodb-original.svg",
    desc: "NoSQL Schema Design & Aggregation Pipelines",
  },
  {
    name: "Firebase",
    category: "Backend",
    level: "85%",
    tier: 2,
    radius: 4.9,
    angle: 3.2,
    yOffset: 0.4,
    color: "#ffca28",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/firebase/firebase-plain.svg",
    desc: "Realtime Database, Auth & Serverless Cloud",
  },
  {
    name: "Python",
    category: "Languages",
    level: "89%",
    tier: 2,
    radius: 4.8,
    angle: 4.45,
    yOffset: -0.3,
    color: "#3776ab",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg",
    desc: "Automation, Backend APIs & Data Scripting",
  },
  {
    name: "Data Viz",
    category: "AI & Design",
    level: "84%",
    tier: 2,
    radius: 4.6,
    angle: 5.7,
    yOffset: 0.5,
    color: "#f37726",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/d3js/d3js-original.svg",
    desc: "Interactive Visuals, Charts & Telemetry HUDs",
  },

  // --- Tier 3: Outer Orbit (Core Systems & Developer Tools) ---
  {
    name: "C++",
    category: "Languages",
    level: "83%",
    tier: 3,
    radius: 6.2,
    angle: 0.25,
    yOffset: 0.2,
    color: "#00599c",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/cplusplus/cplusplus-original.svg",
    desc: "High-Performance Computing, Memory & OOP",
  },
  {
    name: "Java",
    category: "Languages",
    level: "86%",
    tier: 3,
    radius: 6.3,
    angle: 1.15,
    yOffset: -0.4,
    color: "#e76f00",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/java/java-original.svg",
    desc: "Enterprise OOP, Spring & Multi-threading",
  },
  {
    name: "C",
    category: "Languages",
    level: "80%",
    tier: 3,
    radius: 6.1,
    angle: 2.05,
    yOffset: 0.5,
    color: "#a8b9cc",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/c/c-original.svg",
    desc: "Low-level Systems, Pointers & Data Structures",
  },
  {
    name: "Git",
    category: "Tools",
    level: "91%",
    tier: 3,
    radius: 6.4,
    angle: 2.95,
    yOffset: -0.3,
    color: "#f05032",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/git/git-original.svg",
    desc: "Version Control, Branching & GitOps",
  },
  {
    name: "GitHub",
    category: "Tools",
    level: "93%",
    tier: 3,
    radius: 6.2,
    angle: 3.85,
    yOffset: 0.4,
    color: "#8b949e",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/github/github-original.svg",
    desc: "CI/CD Actions, Pull Requests & Open Source",
  },
  {
    name: "VS Code",
    category: "Tools",
    level: "96%",
    tier: 3,
    radius: 6.3,
    angle: 4.75,
    yOffset: -0.5,
    color: "#007acc",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/vscode/vscode-original.svg",
    desc: "Custom Workflows, Debugging & Extensions",
  },
  {
    name: "IntelliJ",
    category: "Tools",
    level: "85%",
    tier: 3,
    radius: 6.1,
    angle: 5.65,
    yOffset: 0.3,
    color: "#fe315d",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/intellij/intellij-original.svg",
    desc: "JVM Profiling, Refactoring & Dev Tooling",
  },
];

export default function ThreeSkillReactor({ selectedCategory = "All" }) {
  const mountRef = useRef(null);
  const groupRef = useRef(null);
  const cameraRef = useRef(null);
  const isDragging = useRef(false);
  const prevMouse = useRef({ x: 0, y: 0 });
  const velRef = useRef({ x: 0.0015, y: 0.004 });
  const isHovered = useRef(false);

  const [nodePositions, setNodePositions] = useState([]);
  const [activeNode, setActiveNode] = useState(null);
  const [autoRotate, setAutoRotate] = useState(true);

  // Cache filtered skills lookup
  const isMatch = (item) => {
    if (!selectedCategory || selectedCategory === "All") return true;
    return item.category === selectedCategory;
  };

  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    let W = container.clientWidth || 800;
    let H = container.clientHeight || 560;

    // ─── Scene & Camera ────────────────────────────────────────────────────────
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(46, W / H, 0.1, 100);
    camera.position.set(0, 3.2, 13.8);
    camera.lookAt(0, 0, 0);
    cameraRef.current = camera;

    const renderer = new THREE.WebGLRenderer({
      alpha: true,
      antialias: true,
      powerPreference: "high-performance",
    });
    renderer.setSize(W, H);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 1.75));
    renderer.setClearColor(0x000000, 0);
    renderer.domElement.style.width = "100%";
    renderer.domElement.style.height = "100%";
    renderer.domElement.style.display = "block";
    container.appendChild(renderer.domElement);

    // ─── Main Rotating Group ──────────────────────────────────────────────────
    const mainGroup = new THREE.Group();
    scene.add(mainGroup);
    groupRef.current = mainGroup;

    // ─── 1. Central Holographic AI Reactor Core (Non-Spherical) ───────────────
    const coreGroup = new THREE.Group();
    mainGroup.add(coreGroup);

    // 1a. Inner Glowing Octahedron Crystal Core
    const innerCrystalGeo = new THREE.OctahedronGeometry(1.0, 0);
    const innerCrystalMat = new THREE.MeshBasicMaterial({
      color: BRAND_COLORS.secondary,
      wireframe: true,
      transparent: true,
      opacity: 0.85,
    });
    const innerCrystal = new THREE.Mesh(innerCrystalGeo, innerCrystalMat);
    coreGroup.add(innerCrystal);

    // 1b. Pulsing Plasma Polyhedral Shell
    const coreShellGeo = new THREE.DodecahedronGeometry(1.35, 0);
    const coreShellMat = new THREE.MeshBasicMaterial({
      color: BRAND_COLORS.primary,
      wireframe: true,
      transparent: true,
      opacity: 0.55,
    });
    const coreShell = new THREE.Mesh(coreShellGeo, coreShellMat);
    coreGroup.add(coreShell);

    // 1c. Central Core Point Glow Sprite
    const coreGlowTex = createParticleTexture("#ffffff", "#00f2fe");
    const coreGlowMat = new THREE.SpriteMaterial({
      map: coreGlowTex,
      color: 0x00f2fe,
      transparent: true,
      blending: THREE.AdditiveBlending,
      opacity: 0.8,
    });
    const coreGlowSprite = new THREE.Sprite(coreGlowMat);
    coreGlowSprite.scale.set(3.5, 3.5, 1);
    coreGroup.add(coreGlowSprite);

    // 1d. Vertical Sci-Fi Energy Beam
    const beamGeo = new THREE.CylinderGeometry(0.12, 0.12, 10, 16, 1, true);
    const beamMat = new THREE.MeshBasicMaterial({
      color: BRAND_COLORS.secondary,
      transparent: true,
      opacity: 0.35,
      blending: THREE.AdditiveBlending,
      side: THREE.DoubleSide,
    });
    const beam = new THREE.Mesh(beamGeo, beamMat);
    coreGroup.add(beam);

    // ─── 2. Multi-Planar Cyber Orbit Rings ────────────────────────────────────
    // Ring 1 (Inner tier horizontal)
    const ring1Geo = new THREE.TorusGeometry(3.3, 0.022, 12, 80);
    const ring1Mat = new THREE.MeshBasicMaterial({
      color: BRAND_COLORS.secondary,
      transparent: true,
      opacity: 0.45,
    });
    const ring1 = new THREE.Mesh(ring1Geo, ring1Mat);
    ring1.rotation.x = Math.PI / 2;
    mainGroup.add(ring1);

    // Ring 2 (Middle tier angled cyber plane)
    const ring2Geo = new THREE.TorusGeometry(4.8, 0.025, 12, 90);
    const ring2Mat = new THREE.MeshBasicMaterial({
      color: BRAND_COLORS.primary,
      transparent: true,
      opacity: 0.35,
    });
    const ring2 = new THREE.Mesh(ring2Geo, ring2Mat);
    ring2.rotation.x = Math.PI / 2 - 0.12;
    ring2.rotation.y = 0.18;
    mainGroup.add(ring2);

    // Ring 3 (Outer tier tilted cyber plane)
    const ring3Geo = new THREE.TorusGeometry(6.3, 0.025, 12, 100);
    const ring3Mat = new THREE.MeshBasicMaterial({
      color: 0x38bdf8,
      transparent: true,
      opacity: 0.3,
    });
    const ring3 = new THREE.Mesh(ring3Geo, ring3Mat);
    ring3.rotation.x = Math.PI / 2 + 0.1;
    ring3.rotation.y = -0.15;
    mainGroup.add(ring3);

    // ─── 3. Ground Holographic Radar Disc (Floor Grid) ────────────────────────
    const discTex = createRingTexture("#00f2fe");
    const discGeo = new THREE.PlaneGeometry(13.5, 13.5);
    const discMat = new THREE.MeshBasicMaterial({
      map: discTex,
      transparent: true,
      opacity: 0.35,
      blending: THREE.AdditiveBlending,
      side: THREE.DoubleSide,
      depthWrite: false,
    });
    const disc = new THREE.Mesh(discGeo, discMat);
    disc.rotation.x = -Math.PI / 2;
    disc.position.y = -2.2;
    mainGroup.add(disc);

    // ─── 4. Build 3D Tech Nodes & Connecting Laser Conduits ───────────────────
    const nodeObjects = [];
    const beamLines = [];

    TECH_SKILLS.forEach((skill, index) => {
      // Calculate 3D coordinate along its orbital tier
      const x = Math.cos(skill.angle) * skill.radius;
      const z = Math.sin(skill.angle) * skill.radius;
      const y = skill.yOffset;
      const pos = new THREE.Vector3(x, y, z);

      // 4a. 3D Diamond Beacon Mesh
      const beaconGeo = new THREE.OctahedronGeometry(0.24, 0);
      const beaconMat = new THREE.MeshStandardMaterial({
        color: new THREE.Color(skill.color),
        emissive: new THREE.Color(skill.color),
        emissiveIntensity: 1.2,
        roughness: 0.2,
        metalness: 0.8,
      });
      const beacon = new THREE.Mesh(beaconGeo, beaconMat);
      beacon.position.copy(pos);
      mainGroup.add(beacon);

      // 4b. Ambient Beacon Halo Sprite
      const haloTex = createParticleTexture("#ffffff", skill.color);
      const haloMat = new THREE.SpriteMaterial({
        map: haloTex,
        color: new THREE.Color(skill.color),
        transparent: true,
        blending: THREE.AdditiveBlending,
        opacity: 0.75,
      });
      const halo = new THREE.Sprite(haloMat);
      halo.scale.set(0.9, 0.9, 1);
      beacon.add(halo);

      // 4c. Laser Energy Beam from Central Core (0, 0, 0) to Node (x, y, z)
      const linePositions = new Float32Array([0, 0, 0, x, y, z]);
      const lineGeo = new THREE.BufferGeometry();
      lineGeo.setAttribute("position", new THREE.BufferAttribute(linePositions, 3));
      const lineMat = new THREE.LineBasicMaterial({
        color: new THREE.Color(skill.color),
        transparent: true,
        opacity: 0.28,
        blending: THREE.AdditiveBlending,
      });
      const line = new THREE.Line(lineGeo, lineMat);
      mainGroup.add(line);

      nodeObjects.push({
        ...skill,
        id: index,
        worldPos: pos,
        beacon,
        beaconMat,
        halo,
        haloMat,
        line,
        lineMat,
      });
      beamLines.push(line);
    });

    // ─── 5. Ambient & Accent Lighting ─────────────────────────────────────────
    scene.add(new THREE.AmbientLight(0xffffff, 1.2));
    const pLightCyan = new THREE.PointLight(BRAND_COLORS.secondary, 4.5, 30);
    pLightCyan.position.set(0, 4, 2);
    scene.add(pLightCyan);

    const pLightCrimson = new THREE.PointLight(BRAND_COLORS.primary, 3.5, 25);
    pLightCrimson.position.set(0, -3, 2);
    scene.add(pLightCrimson);

    // ─── 6. Mouse / Touch Orbit Interaction ───────────────────────────────────
    const dom = renderer.domElement;

    const onMouseDown = (e) => {
      isDragging.current = true;
      prevMouse.current = { x: e.clientX, y: e.clientY };
    };

    const onMouseMove = (e) => {
      if (!isDragging.current) return;
      const dx = e.clientX - prevMouse.current.x;
      const dy = e.clientY - prevMouse.current.y;
      velRef.current.y = dx * 0.0035;
      velRef.current.x = dy * 0.0025;
      mainGroup.rotation.y += dx * 0.006;
      mainGroup.rotation.x += dy * 0.005;
      // Clamp vertical tilt to avoid tumbling
      mainGroup.rotation.x = Math.max(-0.6, Math.min(0.6, mainGroup.rotation.x));
      prevMouse.current = { x: e.clientX, y: e.clientY };
    };

    const onMouseUp = () => {
      isDragging.current = false;
    };

    const onTouchStart = (e) => {
      if (e.touches.length === 1) {
        isDragging.current = true;
        prevMouse.current = { x: e.touches[0].clientX, y: e.touches[0].clientY };
      }
    };

    const onTouchMove = (e) => {
      if (!isDragging.current || !e.touches.length) return;
      const dx = e.touches[0].clientX - prevMouse.current.x;
      const dy = e.touches[0].clientY - prevMouse.current.y;
      mainGroup.rotation.y += dx * 0.006;
      mainGroup.rotation.x += dy * 0.005;
      mainGroup.rotation.x = Math.max(-0.6, Math.min(0.6, mainGroup.rotation.x));
      prevMouse.current = { x: e.touches[0].clientX, y: e.touches[0].clientY };
    };

    dom.addEventListener("mousedown", onMouseDown);
    window.addEventListener("mousemove", onMouseMove);
    window.addEventListener("mouseup", onMouseUp);
    dom.addEventListener("touchstart", onTouchStart, { passive: true });
    window.addEventListener("touchmove", onTouchMove, { passive: true });
    window.addEventListener("touchend", onMouseUp);

    // Container hover detection
    const onEnter = () => { isHovered.current = true; };
    const onLeave = () => { isHovered.current = false; isDragging.current = false; };
    container.addEventListener("mouseenter", onEnter);
    container.addEventListener("mouseleave", onLeave);

    // Resize handler
    const onResize = () => {
      if (!container) return;
      W = container.clientWidth || 800;
      H = container.clientHeight || 560;
      camera.aspect = W / H;
      camera.updateProjectionMatrix();
      renderer.setSize(W, H);
    };
    window.addEventListener("resize", onResize);

    // Initial slight tilt for dramatic 3D isometric perspective
    mainGroup.rotation.x = 0.22;

    // ─── 7. High-FPS Render Loop ──────────────────────────────────────────────
    let animId;
    const clock = new THREE.Clock();
    let frame = 0;
    const tempVec = new THREE.Vector3();

    const animate = () => {
      animId = requestAnimationFrame(animate);
      const t = clock.getElapsedTime();
      frame++;

      // Inertia & auto-rotation
      if (!isDragging.current) {
        velRef.current.x *= 0.95;
        velRef.current.y *= 0.95;

        const autoSpeed = autoRotate ? (isHovered.current ? 0.002 : 0.004) : 0;
        mainGroup.rotation.y += autoSpeed + velRef.current.y;
        mainGroup.rotation.x += velRef.current.x;
        mainGroup.rotation.x = Math.max(-0.6, Math.min(0.6, mainGroup.rotation.x));
      }

      // Animate Central AI Core (Quantum polyhedra rotation & pulse)
      innerCrystal.rotation.y = t * 0.9;
      innerCrystal.rotation.x = t * 0.5;
      coreShell.rotation.y = -t * 0.6;
      coreShell.rotation.z = t * 0.4;

      const pulseScale = 1.0 + Math.sin(t * 3.0) * 0.12;
      coreGlowSprite.scale.set(3.5 * pulseScale, 3.5 * pulseScale, 1);
      coreGlowMat.opacity = 0.7 + Math.sin(t * 4.0) * 0.2;

      // Vertical beam pulse
      beamMat.opacity = 0.25 + Math.sin(t * 5.0) * 0.15;

      // Ground disc slow radar spin
      disc.rotation.z = -t * 0.2;

      // Orbit rings rotation
      ring1.rotation.z = t * 0.1;
      ring2.rotation.z = -t * 0.14;
      ring3.rotation.z = t * 0.08;

      // Node bobbing & halo glow
      nodeObjects.forEach((item, i) => {
        const bob = Math.sin(t * 2.5 + i * 0.8) * 0.08;
        item.beacon.position.y = item.worldPos.y + bob;
        item.beacon.rotation.y = t * 1.2 + i;
        item.beacon.rotation.z = t * 0.8;
      });

      // Project 3D nodes to 2D HTML coordinates every 2nd frame
      if (frame % 2 === 0) {
        const w = container.clientWidth || W;
        const h = container.clientHeight || H;

        const projected = nodeObjects.map((item) => {
          tempVec.copy(item.beacon.position);
          tempVec.applyMatrix4(mainGroup.matrixWorld);

          const isBehind = tempVec.z < -1.5;
          const distToCam = camera.position.distanceTo(tempVec);

          // Normalized Device Coords -> Screen Pixels
          tempVec.project(camera);
          const screenX = (tempVec.x * 0.5 + 0.5) * w;
          const screenY = (-(tempVec.y * 0.5) + 0.5) * h;

          return {
            id: item.id,
            name: item.name,
            category: item.category,
            level: item.level,
            color: item.color,
            icon: item.icon,
            desc: item.desc,
            tier: item.tier,
            x: screenX,
            y: screenY,
            z: tempVec.z,
            isBehind,
            distToCam,
          };
        });

        setNodePositions(projected);
      }

      renderer.render(scene, camera);
    };

    animate();

    // ─── Cleanup ──────────────────────────────────────────────────────────────
    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener("resize", onResize);
      dom.removeEventListener("mousedown", onMouseDown);
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("mouseup", onMouseUp);
      dom.removeEventListener("touchstart", onTouchStart);
      window.removeEventListener("touchmove", onTouchMove);
      window.removeEventListener("touchend", onMouseUp);
      container.removeEventListener("mouseenter", onEnter);
      container.removeEventListener("mouseleave", onLeave);

      renderer.dispose();
      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
    };
  }, [autoRotate]);

  // Update node visual highlight when selectedCategory changes
  useEffect(() => {
    if (!groupRef.current) return;
    // Visually emphasize matching nodes
  }, [selectedCategory]);

  const handleReset = () => {
    if (groupRef.current) {
      groupRef.current.rotation.set(0.22, 0, 0);
      velRef.current = { x: 0, y: 0 };
    }
  };

  return (
    <div className="relative w-full max-w-5xl h-[560px] sm:h-[620px] rounded-3xl overflow-hidden bg-slate-950/80 border border-slate-800/80 shadow-2xl backdrop-blur-xl select-none">
      {/* Background Cyber Grid & Vignette */}
      <div
        className="absolute inset-0 pointer-events-none opacity-20"
        style={{
          backgroundImage:
            "linear-gradient(to right, rgba(0,242,254,0.1) 1px, transparent 1px), linear-gradient(to bottom, rgba(0,242,254,0.1) 1px, transparent 1px)",
          backgroundSize: "40px 40px",
        }}
      />
      <div className="absolute inset-0 pointer-events-none bg-radial-vignette opacity-80" />

      {/* Top Left: Cyber HUD Telemetry Header */}
      <div className="absolute top-4 left-5 z-20 pointer-events-none flex flex-col gap-1">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-900/90 border border-cyan-500/30 text-[11px] font-mono text-cyan-400">
          <Zap className="w-3 h-3 text-cyan-400 animate-pulse" />
          <span>QUANTUM AI ARSENAL // CYBER_CORE</span>
        </div>
        <p className="text-[11px] font-mono text-slate-400 pl-1">
          DRAG TO ROTATE 3D MATRIX // HOVER NODES TO INSPECT
        </p>
      </div>

      {/* Top Right: Interactive Controls */}
      <div className="absolute top-4 right-5 z-20 flex items-center gap-2">
        <button
          onClick={() => setAutoRotate(!autoRotate)}
          className={`px-3 py-1.5 rounded-xl border text-xs font-mono flex items-center gap-1.5 transition-all cursor-pointer ${
            autoRotate
              ? "bg-cyan-500/15 border-cyan-500/40 text-cyan-300 shadow-sm shadow-cyan-500/20"
              : "bg-slate-900/80 border-slate-800 text-slate-400 hover:text-slate-200"
          }`}
          title={autoRotate ? "Pause Auto-Rotation" : "Enable Auto-Rotation"}
        >
          {autoRotate ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5" />}
          <span>{autoRotate ? "AUTO: ON" : "AUTO: OFF"}</span>
        </button>

        <button
          onClick={handleReset}
          className="p-1.5 rounded-xl bg-slate-900/80 border border-slate-800 text-slate-400 hover:text-cyan-400 hover:border-cyan-500/30 transition-all cursor-pointer"
          title="Reset 3D Alignment"
        >
          <RotateCcw className="w-4 h-4" />
        </button>
      </div>

      {/* Three.js Canvas Container */}
      <div ref={mountRef} className="w-full h-full cursor-grab active:cursor-grabbing" />

      {/* Projected 2D Interactive HTML Badges on the 3D Orbit Nodes */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {nodePositions.map((node) => {
          const match = isMatch(node);
          const isSelected = activeNode?.id === node.id;

          // Scale & opacity based on distance & category match
          const scale = Math.max(0.65, Math.min(1.1, (16 - node.distToCam) / 8));
          const opacity = match ? (node.isBehind ? 0.45 : 1) : 0.18;

          return (
            <div
              key={node.id}
              style={{
                position: "absolute",
                left: `${node.x}px`,
                top: `${node.y}px`,
                transform: `translate(-50%, -50%) scale(${isSelected ? 1.25 : scale})`,
                opacity: isSelected ? 1 : opacity,
                zIndex: isSelected ? 40 : node.isBehind ? 10 : 30,
                transition: "opacity 0.25s ease, transform 0.15s ease",
              }}
              className="pointer-events-auto"
              onMouseEnter={() => setActiveNode(node)}
              onMouseLeave={() => setActiveNode(null)}
            >
              <div
                className={`group flex items-center gap-2 px-2.5 py-1.5 rounded-xl backdrop-blur-md transition-all duration-300 cursor-pointer ${
                  isSelected
                    ? "bg-slate-900 border-2 shadow-xl shadow-cyan-500/30"
                    : match
                    ? "bg-slate-950/85 hover:bg-slate-900 border border-slate-700/80 hover:border-cyan-400/60 shadow-lg"
                    : "bg-slate-950/40 border border-slate-800/40"
                }`}
                style={{
                  borderColor: isSelected
                    ? node.color
                    : match
                    ? `${node.color}55`
                    : "rgba(255,255,255,0.06)",
                }}
              >
                {/* Tech Icon */}
                <div
                  className="w-5 h-5 rounded-lg flex items-center justify-center p-0.5"
                  style={{
                    backgroundColor: `${node.color}15`,
                    boxShadow: isSelected ? `0 0 10px ${node.color}` : "none",
                  }}
                >
                  <img
                    src={node.icon}
                    alt={node.name}
                    className="w-full h-full object-contain"
                    loading="lazy"
                    onError={(e) => {
                      e.target.style.display = "none";
                    }}
                  />
                </div>

                {/* Name & Mastery */}
                <div className="flex flex-col">
                  <div className="flex items-center gap-1.5">
                    <span
                      className="text-xs font-semibold tracking-wide whitespace-nowrap"
                      style={{ color: isSelected || match ? "#ffffff" : "#94a3b8" }}
                    >
                      {node.name}
                    </span>
                    {isSelected && (
                      <span
                        className="text-[9px] font-mono px-1 py-0.2 rounded font-bold"
                        style={{ backgroundColor: `${node.color}33`, color: node.color }}
                      >
                        {node.level}
                      </span>
                    )}
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Active Node Detail Inspector Overlay (Bottom Center/Right) */}
      {activeNode && (
        <div className="absolute bottom-5 right-5 z-30 max-w-xs p-4 rounded-2xl bg-slate-900/95 border border-cyan-500/40 shadow-2xl backdrop-blur-2xl animate-fade-in pointer-events-none">
          <div className="flex items-center justify-between gap-3 mb-2">
            <div className="flex items-center gap-2">
              <div
                className="w-7 h-7 rounded-xl flex items-center justify-center p-1"
                style={{ backgroundColor: `${activeNode.color}25` }}
              >
                <img
                  src={activeNode.icon}
                  alt={activeNode.name}
                  className="w-full h-full object-contain"
                />
              </div>
              <div>
                <h4 className="text-sm font-bold text-white font-mono">{activeNode.name}</h4>
                <span className="text-[10px] uppercase font-mono text-cyan-400">
                  {activeNode.category} // TIER {activeNode.tier}
                </span>
              </div>
            </div>
            <div className="text-right">
              <span
                className="text-xs font-mono font-bold px-2 py-0.5 rounded-full"
                style={{ backgroundColor: `${activeNode.color}20`, color: activeNode.color }}
              >
                {activeNode.level}
              </span>
            </div>
          </div>
          <p className="text-xs text-slate-300 font-sans leading-relaxed">{activeNode.desc}</p>
        </div>
      )}

      {/* Bottom Center: Cyber Status Badge */}
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-20 pointer-events-none hidden sm:flex items-center gap-3 px-4 py-1.5 rounded-full bg-slate-900/80 border border-slate-800 backdrop-blur-md">
        <div className="flex items-center gap-1.5 text-[11px] font-mono text-slate-400">
          <Layers className="w-3.5 h-3.5 text-cyan-400" />
          <span>FILTER:</span>
          <span className="text-cyan-300 font-bold">{selectedCategory.toUpperCase()}</span>
        </div>
        <div className="w-1 h-1 rounded-full bg-slate-600" />
        <span className="text-[11px] font-mono text-emerald-400 flex items-center gap-1">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping" />
          CORE ONLINE
        </span>
      </div>
    </div>
  );
}
