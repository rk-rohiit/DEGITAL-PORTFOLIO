// src/components/three/ThreeHeroCanvas.jsx
import React, { useEffect, useRef, useState } from "react";
import * as THREE from "three";
import { createParticleTexture, BRAND_COLORS } from "./threeUtils";

const SHAPES = ["Torus Knot", "Cyber Icosahedron", "Quantum Rings"];

export default function ThreeHeroCanvas({ activeShape = "Torus Knot", onShapeChange }) {
  const mountRef = useRef(null);
  const sceneRef = useRef(null);
  const rendererRef = useRef(null);
  const coreGroupRef = useRef(null);
  const meshInstancesRef = useRef({});
  const shockwavesRef = useRef([]);
  const mouseRef = useRef({ x: 0, y: 0, targetX: 0, targetY: 0, isInteracting: false });
  const animFrameIdRef = useRef(null);

  const [currentMode, setCurrentMode] = useState(activeShape);

  useEffect(() => {
    setCurrentMode(activeShape);
  }, [activeShape]);

  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    const width = container.clientWidth || window.innerWidth;
    const height = container.clientHeight || window.innerHeight;

    // 1. Scene & Camera
    const scene = new THREE.Scene();
    sceneRef.current = scene;

    const camera = new THREE.PerspectiveCamera(55, width / height, 0.1, 1000);
    camera.position.set(0, 0, 18);

    // 2. WebGL Renderer
    const renderer = new THREE.WebGLRenderer({
      alpha: true,
      antialias: true,
      powerPreference: "high-performance",
    });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setClearColor(0x000000, 0);
    rendererRef.current = renderer;

    // Ensure canvas fits container
    renderer.domElement.style.position = "absolute";
    renderer.domElement.style.top = "0";
    renderer.domElement.style.left = "0";
    renderer.domElement.style.width = "100%";
    renderer.domElement.style.height = "100%";
    renderer.domElement.style.pointerEvents = "auto";
    container.appendChild(renderer.domElement);

    // 3. Lighting
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.8);
    scene.add(ambientLight);

    const pointLightRed = new THREE.PointLight(BRAND_COLORS.primaryLight, 3.5, 50);
    pointLightRed.position.set(12, 10, 10);
    scene.add(pointLightRed);

    const pointLightPeach = new THREE.PointLight(BRAND_COLORS.secondary, 2.5, 45);
    pointLightPeach.position.set(-12, -8, 8);
    scene.add(pointLightPeach);

    const pointLightCenter = new THREE.PointLight(0xffffff, 1.2, 30);
    pointLightCenter.position.set(0, 0, 12);
    scene.add(pointLightCenter);

    // 4. Central 3D Core Group
    const coreGroup = new THREE.Group();
    // Offset slightly to the right on large screens for ideal layout with hero text
    const isMobile = window.innerWidth < 768;
    coreGroup.position.set(isMobile ? 0 : 4.8, isMobile ? 2.5 : 0.2, 0);
    scene.add(coreGroup);
    coreGroupRef.current = coreGroup;

    // Materials
    const glassMaterial = new THREE.MeshPhysicalMaterial({
      color: 0xffffff,
      transmission: 0.85,
      opacity: 0.9,
      transparent: true,
      roughness: 0.15,
      metalness: 0.1,
      ior: 1.5,
      reflectivity: 0.9,
      clearcoat: 1.0,
      clearcoatRoughness: 0.1,
      wireframe: false,
    });

    const wireframeMaterial = new THREE.MeshBasicMaterial({
      color: BRAND_COLORS.primaryLight,
      wireframe: true,
      transparent: true,
      opacity: 0.45,
    });

    const innerCoreMaterial = new THREE.MeshStandardMaterial({
      color: BRAND_COLORS.primary,
      emissive: BRAND_COLORS.primaryLight,
      emissiveIntensity: 0.7,
      roughness: 0.3,
      metalness: 0.8,
    });

    // Mesh 1: Torus Knot
    const torusKnotGroup = new THREE.Group();
    const torusGeo = new THREE.TorusKnotGeometry(2.3, 0.65, 140, 24, 2, 3);
    const torusMesh = new THREE.Mesh(torusGeo, glassMaterial);
    const torusWire = new THREE.Mesh(torusGeo, wireframeMaterial);
    torusWire.scale.set(1.02, 1.02, 1.02);
    torusKnotGroup.add(torusMesh);
    torusKnotGroup.add(torusWire);

    // Inner glowing sphere inside torus knot
    const innerSphereGeo = new THREE.SphereGeometry(1.1, 32, 32);
    const innerSphere = new THREE.Mesh(innerSphereGeo, innerCoreMaterial);
    torusKnotGroup.add(innerSphere);

    // Mesh 2: Cyber Icosahedron
    const icosaGroup = new THREE.Group();
    const icosaGeo = new THREE.IcosahedronGeometry(2.8, 1);
    const icosaMesh = new THREE.Mesh(icosaGeo, glassMaterial);
    const icosaWire = new THREE.Mesh(
      icosaGeo,
      new THREE.MeshBasicMaterial({
        color: BRAND_COLORS.secondary,
        wireframe: true,
        transparent: true,
        opacity: 0.7,
      })
    );
    icosaWire.scale.set(1.03, 1.03, 1.03);
    const icosaInner = new THREE.Mesh(new THREE.DodecahedronGeometry(1.6, 0), innerCoreMaterial);
    icosaGroup.add(icosaMesh);
    icosaGroup.add(icosaWire);
    icosaGroup.add(icosaInner);

    // Mesh 3: Quantum Rings (Triple Gyroscope)
    const ringsGroup = new THREE.Group();
    const ringGeo1 = new THREE.TorusGeometry(3.0, 0.12, 16, 100);
    const ringGeo2 = new THREE.TorusGeometry(2.3, 0.1, 16, 100);
    const ringGeo3 = new THREE.TorusGeometry(1.6, 0.08, 16, 100);

    const ringMat1 = new THREE.MeshStandardMaterial({
      color: BRAND_COLORS.primary,
      emissive: BRAND_COLORS.primaryLight,
      emissiveIntensity: 0.6,
      metalness: 0.9,
      roughness: 0.2,
    });
    const ringMat2 = new THREE.MeshStandardMaterial({
      color: BRAND_COLORS.secondary,
      emissive: BRAND_COLORS.secondary,
      emissiveIntensity: 0.5,
      metalness: 0.9,
      roughness: 0.2,
    });
    const ringMat3 = new THREE.MeshStandardMaterial({
      color: 0xffffff,
      emissive: 0xff9f43,
      emissiveIntensity: 0.8,
      metalness: 0.9,
      roughness: 0.1,
    });

    const ring1 = new THREE.Mesh(ringGeo1, ringMat1);
    const ring2 = new THREE.Mesh(ringGeo2, ringMat2);
    const ring3 = new THREE.Mesh(ringGeo3, ringMat3);
    const centerQuantumSphere = new THREE.Mesh(new THREE.SphereGeometry(0.9, 32, 32), innerCoreMaterial);

    ringsGroup.add(ring1);
    ringsGroup.add(ring2);
    ringsGroup.add(ring3);
    ringsGroup.add(centerQuantumSphere);

    meshInstancesRef.current = {
      "Torus Knot": torusKnotGroup,
      "Cyber Icosahedron": icosaGroup,
      "Quantum Rings": ringsGroup,
    };

    // Attach initial shape
    const initialMesh = meshInstancesRef.current[currentMode] || torusKnotGroup;
    coreGroup.add(initialMesh);

    // Outer Gyroscope Rings around the core
    const gimbalRing1Geo = new THREE.TorusGeometry(4.0, 0.03, 12, 100);
    const gimbalRingMat = new THREE.MeshBasicMaterial({
      color: BRAND_COLORS.primaryLight,
      transparent: true,
      opacity: 0.35,
    });
    const gimbalRing1 = new THREE.Mesh(gimbalRing1Geo, gimbalRingMat);
    gimbalRing1.rotation.x = Math.PI / 3;
    coreGroup.add(gimbalRing1);

    const gimbalRing2Geo = new THREE.TorusGeometry(4.4, 0.02, 12, 100);
    const gimbalRing2Mat = new THREE.MeshBasicMaterial({
      color: BRAND_COLORS.secondary,
      transparent: true,
      opacity: 0.25,
    });
    const gimbalRing2 = new THREE.Mesh(gimbalRing2Geo, gimbalRing2Mat);
    gimbalRing2.rotation.y = Math.PI / 4;
    coreGroup.add(gimbalRing2);

    // 5. Orbiting Satellites (Tech Nodes)
    const satellitesGroup = new THREE.Group();
    coreGroup.add(satellitesGroup);

    const satelliteCount = 6;
    const satellites = [];
    const satGeo = new THREE.SphereGeometry(0.18, 16, 16);
    const satMat = new THREE.MeshStandardMaterial({
      color: 0xffffff,
      emissive: BRAND_COLORS.primaryLight,
      emissiveIntensity: 0.9,
      roughness: 0.2,
      metalness: 0.5,
    });

    for (let i = 0; i < satelliteCount; i++) {
      const satMesh = new THREE.Mesh(satGeo, satMat);
      const angle = (i / satelliteCount) * Math.PI * 2;
      const radius = 3.6 + (i % 3) * 0.6;
      const speed = 0.6 + (i % 3) * 0.3;
      const inclination = ((i % 4) - 2) * 0.4;
      satellites.push({ mesh: satMesh, angle, radius, speed, inclination });
      satellitesGroup.add(satMesh);
    }

    // 6. Interactive 3D Particle Cloud
    const particleCount = isMobile ? 600 : 1200;
    const particleGeometry = new THREE.BufferGeometry();
    const positions = new Float32Array(particleCount * 3);
    const originalPositions = new Float32Array(particleCount * 3);
    const scales = new Float32Array(particleCount);
    const colors = new Float32Array(particleCount * 3);

    const pColor1 = new THREE.Color(BRAND_COLORS.primaryLight);
    const pColor2 = new THREE.Color(BRAND_COLORS.secondary);
    const pColor3 = new THREE.Color(0xffb703);
    const pColor4 = new THREE.Color(0xffffff);

    for (let i = 0; i < particleCount; i++) {
      const i3 = i * 3;
      // Cylinder / Sphere spread
      const radius = 6 + Math.random() * 22;
      const theta = Math.random() * Math.PI * 2;
      const y = (Math.random() - 0.5) * 26;

      const x = Math.cos(theta) * radius;
      const z = Math.sin(theta) * radius - 2;

      positions[i3] = x;
      positions[i3 + 1] = y;
      positions[i3 + 2] = z;

      originalPositions[i3] = x;
      originalPositions[i3 + 1] = y;
      originalPositions[i3 + 2] = z;

      scales[i] = Math.random() * 0.8 + 0.4;

      // Color variation
      const rand = Math.random();
      const chosenColor = rand < 0.45 ? pColor1 : rand < 0.75 ? pColor2 : rand < 0.9 ? pColor3 : pColor4;
      colors[i3] = chosenColor.r;
      colors[i3 + 1] = chosenColor.g;
      colors[i3 + 2] = chosenColor.b;
    }

    particleGeometry.setAttribute("position", new THREE.BufferAttribute(positions, 3));
    particleGeometry.setAttribute("color", new THREE.BufferAttribute(colors, 3));

    const particleTexture = createParticleTexture("#ffffff", "#ff4d4f");

    const particleMaterial = new THREE.PointsMaterial({
      size: isMobile ? 0.35 : 0.45,
      map: particleTexture,
      transparent: true,
      vertexColors: true,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
      opacity: 0.85,
    });

    const particleSystem = new THREE.Points(particleGeometry, particleMaterial);
    scene.add(particleSystem);

    // 7. Mouse & Interactive Events
    const handleMouseMove = (e) => {
      const rect = container.getBoundingClientRect();
      const clientX = e.clientX - rect.left;
      const clientY = e.clientY - rect.top;

      mouseRef.current.targetX = (clientX / width) * 2 - 1;
      mouseRef.current.targetY = -(clientY / height) * 2 + 1;
    };

    const handleTouchMove = (e) => {
      if (e.touches.length > 0) {
        const touch = e.touches[0];
        const rect = container.getBoundingClientRect();
        mouseRef.current.targetX = ((touch.clientX - rect.left) / width) * 2 - 1;
        mouseRef.current.targetY = -((touch.clientY - rect.top) / height) * 2 + 1;
      }
    };

    // Click Shockwave Effect
    const handleClick = (e) => {
      const rect = container.getBoundingClientRect();
      const mouseX = ((e.clientX - rect.left) / width) * 2 - 1;
      const mouseY = -((e.clientY - rect.top) / height) * 2 + 1;

      // Unproject to 3D world plane at Z = 0
      const vector = new THREE.Vector3(mouseX, mouseY, 0.5);
      vector.unproject(camera);
      const dir = vector.sub(camera.position).normalize();
      const distance = -camera.position.z / dir.z;
      const worldPos = camera.position.clone().add(dir.multiplyScalar(distance));

      shockwavesRef.current.push({
        x: worldPos.x,
        y: worldPos.y,
        radius: 0.1,
        maxRadius: 14,
        strength: 2.2,
        speed: 0.4,
      });

      // Quick visual burst on core if clicked near
      if (coreGroupRef.current) {
        coreGroupRef.current.scale.set(1.15, 1.15, 1.15);
      }
    };

    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("touchmove", handleTouchMove, { passive: true });
    container.addEventListener("click", handleClick);

    // Resize handler
    const handleResize = () => {
      if (!container || !rendererRef.current) return;
      const w = container.clientWidth || window.innerWidth;
      const h = container.clientHeight || window.innerHeight;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      rendererRef.current.setSize(w, h);

      const mobileCheck = w < 768;
      if (coreGroupRef.current) {
        coreGroupRef.current.position.set(mobileCheck ? 0 : 4.8, mobileCheck ? 2.5 : 0.2, 0);
      }
    };

    window.addEventListener("resize", handleResize);

    // 8. Animation Loop
    let clock = new THREE.Clock();

    const animate = () => {
      animFrameIdRef.current = requestAnimationFrame(animate);

      const elapsedTime = clock.getElapsedTime();

      // Smooth mouse interpolation (Lerp)
      mouseRef.current.x += (mouseRef.current.targetX - mouseRef.current.x) * 0.05;
      mouseRef.current.y += (mouseRef.current.targetY - mouseRef.current.y) * 0.05;

      // Camera parallax tilt
      camera.position.x = mouseRef.current.x * 2.2;
      camera.position.y = mouseRef.current.y * 1.5;
      camera.lookAt(0, 0, 0);

      // Rotate central 3D core
      if (coreGroupRef.current) {
        coreGroupRef.current.rotation.y = elapsedTime * 0.4 + mouseRef.current.x * 0.8;
        coreGroupRef.current.rotation.x = Math.sin(elapsedTime * 0.3) * 0.2 - mouseRef.current.y * 0.6;
        coreGroupRef.current.rotation.z = Math.cos(elapsedTime * 0.25) * 0.1;

        // Spring return to normal scale after click
        coreGroupRef.current.scale.lerp(new THREE.Vector3(1, 1, 1), 0.08);

        // Gyroscope ring rotations
        gimbalRing1.rotation.z = elapsedTime * 0.25;
        gimbalRing2.rotation.x = -elapsedTime * 0.3;

        // Specific sub-mesh animations
        if (currentMode === "Quantum Rings") {
          ring1.rotation.x = elapsedTime * 0.8;
          ring1.rotation.y = elapsedTime * 0.4;
          ring2.rotation.y = -elapsedTime * 1.1;
          ring2.rotation.z = elapsedTime * 0.6;
          ring3.rotation.z = elapsedTime * 1.4;
          ring3.rotation.x = -elapsedTime * 0.9;
        } else if (currentMode === "Torus Knot") {
          torusWire.rotation.y = -elapsedTime * 0.2;
          innerSphere.scale.setScalar(1 + Math.sin(elapsedTime * 3) * 0.08);
        } else if (currentMode === "Cyber Icosahedron") {
          icosaInner.rotation.x = elapsedTime * 0.5;
          icosaInner.rotation.y = -elapsedTime * 0.7;
        }

        // Orbiting satellites
        satellites.forEach((sat) => {
          sat.angle += 0.015 * sat.speed;
          sat.mesh.position.x = Math.cos(sat.angle) * sat.radius;
          sat.mesh.position.z = Math.sin(sat.angle) * sat.radius;
          sat.mesh.position.y = Math.sin(sat.angle * 2 + sat.inclination) * 1.2;
        });
      }

      // Update shockwaves
      const activeShockwaves = shockwavesRef.current;
      for (let s = activeShockwaves.length - 1; s >= 0; s--) {
        const sw = activeShockwaves[s];
        sw.radius += sw.speed;
        sw.strength *= 0.96;
        if (sw.radius > sw.maxRadius || sw.strength < 0.01) {
          activeShockwaves.splice(s, 1);
        }
      }

      // Animate Particles (Organic Wave Motion + Shockwaves)
      const posAttr = particleGeometry.attributes.position;
      const currentPos = posAttr.array;

      for (let i = 0; i < particleCount; i++) {
        const i3 = i * 3;
        const ox = originalPositions[i3];
        const oy = originalPositions[i3 + 1];
        const oz = originalPositions[i3 + 2];

        // Harmonic drift
        let waveY = Math.sin(elapsedTime * 1.2 + ox * 0.3) * 0.45;
        let waveX = Math.cos(elapsedTime * 0.9 + oy * 0.3) * 0.35;

        // Apply shockwave ripples
        let rippleX = 0;
        let rippleY = 0;
        let rippleZ = 0;

        for (let s = 0; s < activeShockwaves.length; s++) {
          const sw = activeShockwaves[s];
          const dx = ox - sw.x;
          const dy = oy - sw.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          const diff = Math.abs(dist - sw.radius);

          if (diff < 2.0 && dist > 0.001) {
            const force = ((2.0 - diff) / 2.0) * sw.strength;
            rippleX += (dx / dist) * force;
            rippleY += (dy / dist) * force;
            rippleZ += Math.sin(diff * Math.PI) * force * 1.2;
          }
        }

        currentPos[i3] = ox + waveX + rippleX;
        currentPos[i3 + 1] = oy + waveY + rippleY;
        currentPos[i3 + 2] = oz + rippleZ;
      }
      posAttr.needsUpdate = true;

      // Rotate particle constellation subtly
      particleSystem.rotation.y = elapsedTime * 0.02;

      renderer.render(scene, camera);
    };

    animate();

    // Cleanup
    return () => {
      cancelAnimationFrame(animFrameIdRef.current);
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("touchmove", handleTouchMove);
      window.removeEventListener("resize", handleResize);
      container.removeEventListener("click", handleClick);

      // Dispose geometries & materials
      particleGeometry.dispose();
      particleMaterial.dispose();
      particleTexture.dispose();
      torusGeo.dispose();
      glassMaterial.dispose();
      wireframeMaterial.dispose();
      innerCoreMaterial.dispose();
      icosaGeo.dispose();
      ringGeo1.dispose();
      ringGeo2.dispose();
      ringGeo3.dispose();

      if (renderer.domElement && renderer.domElement.parentNode) {
        renderer.domElement.parentNode.removeChild(renderer.domElement);
      }
      renderer.dispose();
    };
  }, []);

  // Handle Dynamic Shape Mode Switch
  useEffect(() => {
    if (!coreGroupRef.current || !meshInstancesRef.current) return;

    // Remove existing shape children from coreGroup (preserving gimbal rings & satellites)
    Object.values(meshInstancesRef.current).forEach((group) => {
      if (coreGroupRef.current.children.includes(group)) {
        coreGroupRef.current.remove(group);
      }
    });

    const newMesh = meshInstancesRef.current[currentMode];
    if (newMesh) {
      coreGroupRef.current.add(newMesh);
      // Morph pulse
      coreGroupRef.current.scale.set(0.7, 0.7, 0.7);
    }
  }, [currentMode]);

  const switchShape = (shape) => {
    setCurrentMode(shape);
    if (onShapeChange) onShapeChange(shape);
  };

  return (
    <div className="absolute inset-0 w-full h-full overflow-hidden pointer-events-none" style={{ zIndex: 1 }}>
      {/* Three.js Canvas Container */}
      <div ref={mountRef} className="w-full h-full cursor-grab active:cursor-grabbing pointer-events-auto" />

      {/* Floating 3D Control Badge in Hero */}
      <div className="absolute bottom-6 right-6 md:bottom-8 md:right-10 z-20 pointer-events-auto flex items-center gap-2.5 bg-slate-950/90 backdrop-blur-md px-3.5 py-2 rounded-full border border-cyan-500/30 shadow-xl shadow-cyan-500/10 text-xs text-slate-200 transition-all font-mono">
        <span className="flex h-2 w-2 relative">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75"></span>
          <span className="relative inline-flex rounded-full h-2 w-2 bg-cyan-500"></span>
        </span>
        <span className="font-semibold text-cyan-400 text-[11px] tracking-wider uppercase">CORE:</span>
        <div className="flex items-center gap-1.5">
          {SHAPES.map((shape) => (
            <button
              key={shape}
              onClick={() => switchShape(shape)}
              className={`px-3 py-1 rounded-full text-[11px] font-semibold transition-all cursor-pointer ${
                currentMode === shape
                  ? "bg-gradient-to-r from-rose-600 via-red-500 to-cyan-500 text-white shadow-sm shadow-cyan-500/30"
                  : "bg-slate-900/80 text-gray-400 hover:text-white hover:bg-slate-800 border border-slate-800"
              }`}
            >
              {shape.split(" ")[0]}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
