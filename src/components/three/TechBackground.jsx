// src/components/three/TechBackground.jsx
// Full-scene Three.js tech developer background:
// - Animated floating nodes network with connections
// - Matrix binary rain (falling code particles)
// - Floating tech-symbol sprites (< > / { } () => # ; const)
// - Mouse parallax camera movement
// - Glowing data-stream lines
import React, { useEffect, useRef } from "react";
import * as THREE from "three";

// Tech symbols that float in 3D space
const CODE_SYMBOLS = [
  "const", "=>", "{}", "[]", "</>", "func", "if()", "API",
  "AI", "ML", "git", "npm", "react", "node", "async", "class",
  "import", "export", "return", "while", "0x1F", "101", "#!/",
];

const textureCache = new Map();
function makeCodeTexture(text, color = "#00f2fe") {
  const key = `${text}_${color}`;
  if (textureCache.has(key)) return textureCache.get(key);

  const size = 128;
  const canvas = document.createElement("canvas");
  canvas.width = size;
  canvas.height = size;
  const ctx = canvas.getContext("2d");
  ctx.clearRect(0, 0, size, size);
  ctx.font = `bold ${text.length > 4 ? 18 : 22}px 'Fira Code', monospace`;
  ctx.fillStyle = color;
  ctx.globalAlpha = 0.85;
  ctx.textAlign = "center";
  ctx.textBaseline = "middle";
  ctx.shadowColor = color;
  ctx.shadowBlur = 12;
  ctx.fillText(text, size / 2, size / 2);
  const tex = new THREE.CanvasTexture(canvas);
  tex.needsUpdate = true;
  textureCache.set(key, tex);
  return tex;
}

let cachedGlowTex = null;
function makeGlowTexture() {
  if (cachedGlowTex) return cachedGlowTex;

  const size = 64;
  const canvas = document.createElement("canvas");
  canvas.width = size;
  canvas.height = size;
  const ctx = canvas.getContext("2d");
  const grad = ctx.createRadialGradient(size / 2, size / 2, 0, size / 2, size / 2, size / 2);
  grad.addColorStop(0, "rgba(0, 242, 254, 1)");
  grad.addColorStop(0.3, "rgba(0, 242, 254, 0.6)");
  grad.addColorStop(1, "rgba(0, 242, 254, 0)");
  ctx.fillStyle = grad;
  ctx.fillRect(0, 0, size, size);
  const tex = new THREE.CanvasTexture(canvas);
  tex.needsUpdate = true;
  cachedGlowTex = tex;
  return tex;
}

export default function TechBackground() {
  const mountRef = useRef(null);

  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    const W = container.clientWidth || window.innerWidth;
    const H = container.clientHeight || window.innerHeight;
    const isMobile = W < 768;

    // ─── Scene, Camera, Renderer ───────────────────────────────────────────
    const scene = new THREE.Scene();
    scene.fog = new THREE.FogExp2(0x090a10, 0.018);

    const camera = new THREE.PerspectiveCamera(60, W / H, 0.1, 300);
    camera.position.set(0, 0, 28);

    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    renderer.setSize(W, H);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setClearColor(0x000000, 0);
    renderer.domElement.style.position = "absolute";
    renderer.domElement.style.top = "0";
    renderer.domElement.style.left = "0";
    renderer.domElement.style.width = "100%";
    renderer.domElement.style.height = "100%";
    renderer.domElement.style.pointerEvents = "none";
    container.appendChild(renderer.domElement);

    // ─── Node Network ───────────────────────────────────────────────────────
    const NODE_COUNT = isMobile ? 40 : 80;
    const SPREAD = 30;
    const nodePositions = [];
    const nodeGroup = new THREE.Group();
    scene.add(nodeGroup);

    const glowTex = makeGlowTexture();
    const nodeMat = new THREE.PointsMaterial({
      size: 0.55,
      map: glowTex,
      transparent: true,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
      vertexColors: true,
    });

    const nodeGeo = new THREE.BufferGeometry();
    const nodePos = new Float32Array(NODE_COUNT * 3);
    const nodeColors = new Float32Array(NODE_COUNT * 3);
    const nodeVelocities = [];

    const colorOptions = [
      new THREE.Color(0x00f2fe), // cyan
      new THREE.Color(0xff0055), // rose
      new THREE.Color(0xffd700), // gold
      new THREE.Color(0x8b5cf6), // purple
      new THREE.Color(0x00ff88), // green
    ];

    for (let i = 0; i < NODE_COUNT; i++) {
      const x = (Math.random() - 0.5) * SPREAD * 2;
      const y = (Math.random() - 0.5) * SPREAD;
      const z = (Math.random() - 0.5) * SPREAD;
      nodePos[i * 3] = x;
      nodePos[i * 3 + 1] = y;
      nodePos[i * 3 + 2] = z;
      nodePositions.push(new THREE.Vector3(x, y, z));

      const c = colorOptions[Math.floor(Math.random() * colorOptions.length)];
      nodeColors[i * 3] = c.r;
      nodeColors[i * 3 + 1] = c.g;
      nodeColors[i * 3 + 2] = c.b;

      nodeVelocities.push(
        new THREE.Vector3(
          (Math.random() - 0.5) * 0.012,
          (Math.random() - 0.5) * 0.008,
          (Math.random() - 0.5) * 0.006
        )
      );
    }

    nodeGeo.setAttribute("position", new THREE.BufferAttribute(nodePos, 3));
    nodeGeo.setAttribute("color", new THREE.BufferAttribute(nodeColors, 3));
    const nodePoints = new THREE.Points(nodeGeo, nodeMat);
    nodeGroup.add(nodePoints);

    // ─── Connection Lines between nearby nodes ─────────────────────────────
    const lineMat = new THREE.LineBasicMaterial({
      color: 0x00f2fe,
      transparent: true,
      opacity: 0.12,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
    });
    const CONNECTION_DIST = 10;
    let lineSegments = null;

    const updateConnections = () => {
      if (lineSegments) {
        nodeGroup.remove(lineSegments);
        lineSegments.geometry.dispose();
      }
      const lineVerts = [];
      for (let i = 0; i < NODE_COUNT; i++) {
        for (let j = i + 1; j < NODE_COUNT; j++) {
          const dist = nodePositions[i].distanceTo(nodePositions[j]);
          if (dist < CONNECTION_DIST) {
            lineVerts.push(nodePositions[i].x, nodePositions[i].y, nodePositions[i].z);
            lineVerts.push(nodePositions[j].x, nodePositions[j].y, nodePositions[j].z);
          }
        }
      }
      const lineGeo = new THREE.BufferGeometry();
      lineGeo.setAttribute("position", new THREE.BufferAttribute(new Float32Array(lineVerts), 3));
      lineSegments = new THREE.LineSegments(lineGeo, lineMat);
      nodeGroup.add(lineSegments);
    };

    updateConnections();

    // ─── Floating Code Symbol Sprites ───────────────────────────────────────
    const symbolGroup = new THREE.Group();
    scene.add(symbolGroup);
    const symbolSprites = [];
    const symbolCount = isMobile ? 12 : 22;

    const symbolColors = ["#00f2fe", "#ff0055", "#ffd700", "#8b5cf6", "#00ff88"];

    for (let i = 0; i < symbolCount; i++) {
      const sym = CODE_SYMBOLS[i % CODE_SYMBOLS.length];
      const col = symbolColors[i % symbolColors.length];
      const tex = makeCodeTexture(sym, col);
      const mat = new THREE.SpriteMaterial({
        map: tex,
        transparent: true,
        blending: THREE.AdditiveBlending,
        depthWrite: false,
        opacity: 0.65,
      });
      const sprite = new THREE.Sprite(mat);
      const scale = 1.8 + Math.random() * 1.5;
      sprite.scale.set(scale, scale, 1);
      sprite.position.set(
        (Math.random() - 0.5) * SPREAD * 2,
        (Math.random() - 0.5) * SPREAD,
        (Math.random() - 0.5) * 18
      );
      symbolGroup.add(sprite);
      symbolSprites.push({
        sprite,
        baseY: sprite.position.y,
        phase: Math.random() * Math.PI * 2,
        speed: 0.3 + Math.random() * 0.3,
        driftX: (Math.random() - 0.5) * 0.006,
        tex,
        mat,
      });
    }

    // ─── Matrix Binary Rain ─────────────────────────────────────────────────
    const RAIN_COUNT = isMobile ? 60 : 140;
    const rainGeo = new THREE.BufferGeometry();
    const rainPos = new Float32Array(RAIN_COUNT * 3);
    const rainVelocities = [];
    const rainColors = new Float32Array(RAIN_COUNT * 3);

    for (let i = 0; i < RAIN_COUNT; i++) {
      rainPos[i * 3] = (Math.random() - 0.5) * SPREAD * 2.2;
      rainPos[i * 3 + 1] = (Math.random() - 0.5) * SPREAD;
      rainPos[i * 3 + 2] = (Math.random() - 0.5) * 20 - 5;
      rainVelocities.push(0.04 + Math.random() * 0.08);

      // Green matrix tones with some cyan
      const t = Math.random();
      if (t < 0.7) {
        rainColors[i * 3] = 0;
        rainColors[i * 3 + 1] = 0.7 + Math.random() * 0.3;
        rainColors[i * 3 + 2] = 0.2;
      } else {
        rainColors[i * 3] = 0;
        rainColors[i * 3 + 1] = 0.8;
        rainColors[i * 3 + 2] = 1.0;
      }
    }

    rainGeo.setAttribute("position", new THREE.BufferAttribute(rainPos, 3));
    rainGeo.setAttribute("color", new THREE.BufferAttribute(rainColors, 3));

    const rainMat = new THREE.PointsMaterial({
      size: 0.28,
      transparent: true,
      opacity: 0.6,
      vertexColors: true,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
    });
    const rainPoints = new THREE.Points(rainGeo, rainMat);
    scene.add(rainPoints);

    // ─── Glowing Data Stream Lines (vertical) ─────────────────────────────
    const streamGroup = new THREE.Group();
    scene.add(streamGroup);
    const streamCount = isMobile ? 6 : 14;
    const streamMeshes = [];

    for (let i = 0; i < streamCount; i++) {
      const h = 8 + Math.random() * 14;
      const geo = new THREE.PlaneGeometry(0.04, h);
      const mat = new THREE.MeshBasicMaterial({
        color: Math.random() < 0.6 ? 0x00f2fe : 0xff0055,
        transparent: true,
        opacity: 0.15 + Math.random() * 0.15,
        blending: THREE.AdditiveBlending,
        depthWrite: false,
        side: THREE.DoubleSide,
      });
      const mesh = new THREE.Mesh(geo, mat);
      mesh.position.set(
        (Math.random() - 0.5) * SPREAD * 2,
        (Math.random() - 0.5) * SPREAD * 0.5,
        (Math.random() - 0.5) * 15 - 3
      );
      mesh.rotation.z = (Math.random() - 0.5) * 0.3;
      streamGroup.add(mesh);
      streamMeshes.push({ mesh, speed: 0.015 + Math.random() * 0.02, mat });
    }

    // ─── Mouse parallax ────────────────────────────────────────────────────
    const mouse = { x: 0, y: 0, tx: 0, ty: 0 };
    const handleMouseMove = (e) => {
      mouse.tx = (e.clientX / window.innerWidth) * 2 - 1;
      mouse.ty = -((e.clientY / window.innerHeight) * 2 - 1);
    };
    window.addEventListener("mousemove", handleMouseMove);

    // ─── Resize ─────────────────────────────────────────────────────────────
    const handleResize = () => {
      if (!container) return;
      const w = container.clientWidth || window.innerWidth;
      const h = container.clientHeight || window.innerHeight;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };
    window.addEventListener("resize", handleResize);

    // ─── Animation Loop ─────────────────────────────────────────────────────
    let rafId;
    let frameCount = 0;
    const clock = new THREE.Clock();

    const animate = () => {
      rafId = requestAnimationFrame(animate);
      const t = clock.getElapsedTime();
      frameCount++;

      // Mouse parallax
      mouse.x += (mouse.tx - mouse.x) * 0.05;
      mouse.y += (mouse.ty - mouse.y) * 0.05;
      camera.position.x = mouse.x * 3.5;
      camera.position.y = mouse.y * 2;
      camera.lookAt(0, 0, 0);

      // Update nodes
      for (let i = 0; i < NODE_COUNT; i++) {
        nodePositions[i].add(nodeVelocities[i]);

        // Bounce within bounds
        if (Math.abs(nodePositions[i].x) > SPREAD) nodeVelocities[i].x *= -1;
        if (Math.abs(nodePositions[i].y) > SPREAD * 0.6) nodeVelocities[i].y *= -1;
        if (Math.abs(nodePositions[i].z) > SPREAD * 0.6) nodeVelocities[i].z *= -1;

        const i3 = i * 3;
        nodeGeo.attributes.position.array[i3] = nodePositions[i].x;
        nodeGeo.attributes.position.array[i3 + 1] = nodePositions[i].y;
        nodeGeo.attributes.position.array[i3 + 2] = nodePositions[i].z;
      }
      nodeGeo.attributes.position.needsUpdate = true;

      // Update connections every 15 frames for perf
      if (frameCount % 15 === 0) updateConnections();

      // Update symbol sprites (floating bob)
      symbolSprites.forEach(({ sprite, baseY, phase, speed, driftX }) => {
        sprite.position.y = baseY + Math.sin(t * speed + phase) * 0.8;
        sprite.position.x += driftX;
        if (sprite.position.x > SPREAD) sprite.position.x = -SPREAD;
        if (sprite.position.x < -SPREAD) sprite.position.x = SPREAD;
        sprite.material.opacity = 0.35 + Math.sin(t * 0.5 + phase) * 0.25;
      });

      // Matrix rain falling
      const rp = rainGeo.attributes.position.array;
      for (let i = 0; i < RAIN_COUNT; i++) {
        rp[i * 3 + 1] -= rainVelocities[i];
        if (rp[i * 3 + 1] < -SPREAD * 0.6) {
          rp[i * 3 + 1] = SPREAD * 0.6;
          rp[i * 3] = (Math.random() - 0.5) * SPREAD * 2.2;
        }
      }
      rainGeo.attributes.position.needsUpdate = true;

      // Data streams pulse
      streamMeshes.forEach(({ mesh, speed, mat }, idx) => {
        mesh.position.y -= speed;
        if (mesh.position.y < -SPREAD * 0.8) {
          mesh.position.y = SPREAD * 0.8;
          mesh.position.x = (Math.random() - 0.5) * SPREAD * 2;
        }
        mat.opacity = 0.08 + Math.abs(Math.sin(t * 0.8 + idx)) * 0.18;
      });

      // Slow rotation of node network for depth
      nodeGroup.rotation.y = t * 0.015;

      renderer.render(scene, camera);
    };

    animate();

    // ─── Cleanup ────────────────────────────────────────────────────────────
    return () => {
      cancelAnimationFrame(rafId);
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("resize", handleResize);
      symbolSprites.forEach(({ tex, mat }) => { tex.dispose(); mat.dispose(); });
      glowTex.dispose();
      nodeMat.dispose();
      nodeGeo.dispose();
      rainGeo.dispose();
      rainMat.dispose();
      streamMeshes.forEach(({ mesh }) => {
        mesh.geometry.dispose();
        mesh.material.dispose();
      });
      if (lineSegments) {
        lineSegments.geometry.dispose();
        lineMat.dispose();
      }
      if (renderer.domElement?.parentNode) {
        renderer.domElement.parentNode.removeChild(renderer.domElement);
      }
      renderer.dispose();
    };
  }, []);

  return (
    <div
      ref={mountRef}
      className="absolute inset-0 w-full h-full overflow-hidden"
      style={{ zIndex: 0, pointerEvents: "none" }}
    />
  );
}
