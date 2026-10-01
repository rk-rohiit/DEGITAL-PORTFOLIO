// src/components/three/ThreeGlobalBackground.jsx
import React, { useEffect, useRef } from "react";
import * as THREE from "three";
import { createParticleTexture, BRAND_COLORS } from "./threeUtils";

export default function ThreeGlobalBackground() {
  const mountRef = useRef(null);

  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    let width = window.innerWidth;
    let height = window.innerHeight;

    // Scene & Camera
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(60, width / height, 0.1, 1000);
    camera.position.set(0, 0, 30);

    // Renderer
    const renderer = new THREE.WebGLRenderer({
      alpha: true,
      antialias: true,
      powerPreference: "low-power",
    });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.5));
    renderer.setClearColor(0x000000, 0);

    renderer.domElement.style.position = "fixed";
    renderer.domElement.style.top = "0";
    renderer.domElement.style.left = "0";
    renderer.domElement.style.width = "100vw";
    renderer.domElement.style.height = "100vh";
    renderer.domElement.style.pointerEvents = "none";
    renderer.domElement.style.zIndex = "-1";

    container.appendChild(renderer.domElement);

    // Floating 3D Geometric Crystals
    const crystalGroup = new THREE.Group();
    scene.add(crystalGroup);

    const crystalCount = 18;
    const crystals = [];
    const geometries = [
      new THREE.OctahedronGeometry(0.8, 0),
      new THREE.TetrahedronGeometry(0.9, 0),
      new THREE.IcosahedronGeometry(0.7, 0),
      new THREE.BoxGeometry(0.8, 0.8, 0.8),
    ];

    const crystalMaterials = [
      new THREE.MeshStandardMaterial({
        color: BRAND_COLORS.primary,
        metalness: 0.8,
        roughness: 0.2,
        transparent: true,
        opacity: 0.25,
      }),
      new THREE.MeshStandardMaterial({
        color: BRAND_COLORS.secondary,
        metalness: 0.7,
        roughness: 0.3,
        transparent: true,
        opacity: 0.25,
      }),
      new THREE.MeshBasicMaterial({
        color: BRAND_COLORS.primaryLight,
        wireframe: true,
        transparent: true,
        opacity: 0.3,
      }),
    ];

    for (let i = 0; i < crystalCount; i++) {
      const geo = geometries[i % geometries.length];
      const mat = crystalMaterials[i % crystalMaterials.length];
      const mesh = new THREE.Mesh(geo, mat);

      mesh.position.x = (Math.random() - 0.5) * 45;
      mesh.position.y = (Math.random() - 0.5) * 60;
      mesh.position.z = -15 + Math.random() * 30;

      const rotSpeedX = (Math.random() - 0.5) * 0.015;
      const rotSpeedY = (Math.random() - 0.5) * 0.015;
      const floatSpeed = 0.5 + Math.random() * 0.8;
      const baseY = mesh.position.y;

      crystals.push({ mesh, rotSpeedX, rotSpeedY, floatSpeed, baseY });
      crystalGroup.add(mesh);
    }

    // Ambient Lighting for crystals
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.9);
    scene.add(ambientLight);

    const dirLight = new THREE.DirectionalLight(0xffffff, 1.2);
    dirLight.position.set(10, 20, 15);
    scene.add(dirLight);

    // Global Floating Dust Particles
    const dustCount = 350;
    const dustGeometry = new THREE.BufferGeometry();
    const dustPositions = new Float32Array(dustCount * 3);
    const dustColors = new Float32Array(dustCount * 3);

    const c1 = new THREE.Color(BRAND_COLORS.primaryLight);
    const c2 = new THREE.Color(BRAND_COLORS.secondary);
    const c3 = new THREE.Color(0xf1f5f9);

    for (let i = 0; i < dustCount; i++) {
      const i3 = i * 3;
      dustPositions[i3] = (Math.random() - 0.5) * 60;
      dustPositions[i3 + 1] = (Math.random() - 0.5) * 80;
      dustPositions[i3 + 2] = -20 + Math.random() * 40;

      const rand = Math.random();
      const col = rand < 0.4 ? c1 : rand < 0.7 ? c2 : c3;
      dustColors[i3] = col.r;
      dustColors[i3 + 1] = col.g;
      dustColors[i3 + 2] = col.b;
    }

    dustGeometry.setAttribute("position", new THREE.BufferAttribute(dustPositions, 3));
    dustGeometry.setAttribute("color", new THREE.BufferAttribute(dustColors, 3));

    const dustTexture = createParticleTexture("#ffffff", "#ff6f61");
    const dustMaterial = new THREE.PointsMaterial({
      size: 0.35,
      map: dustTexture,
      transparent: true,
      vertexColors: true,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
      opacity: 0.6,
    });

    const dustSystem = new THREE.Points(dustGeometry, dustMaterial);
    scene.add(dustSystem);

    // Scroll & Mouse Tracking
    let scrollY = window.scrollY;
    let targetScrollY = window.scrollY;
    let mouseX = 0;
    let mouseY = 0;
    let targetMouseX = 0;
    let targetMouseY = 0;

    const handleScroll = () => {
      targetScrollY = window.scrollY;
    };

    const handleMouseMove = (e) => {
      targetMouseX = (e.clientX / window.innerWidth) * 2 - 1;
      targetMouseY = -(e.clientY / window.innerHeight) * 2 + 1;
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    window.addEventListener("mousemove", handleMouseMove, { passive: true });

    // Handle Resize
    const handleResize = () => {
      width = window.innerWidth;
      height = window.innerHeight;
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
      renderer.setSize(width, height);
    };

    window.addEventListener("resize", handleResize);

    // Animation Loop
    let animId;
    let clock = new THREE.Clock();

    const animate = () => {
      animId = requestAnimationFrame(animate);

      const elapsedTime = clock.getElapsedTime();

      // Lerp scroll
      scrollY += (targetScrollY - scrollY) * 0.05;
      mouseX += (targetMouseX - mouseX) * 0.03;
      mouseY += (targetMouseY - mouseY) * 0.03;

      const maxScroll = Math.max(1, document.documentElement.scrollHeight - window.innerHeight);
      const scrollProgress = scrollY / maxScroll; // 0.0 to 1.0

      // Smooth 3D camera scroll motion
      camera.position.y = -scrollProgress * 25 + mouseY * 1.5;
      camera.position.x = mouseX * 2.0;
      camera.rotation.z = Math.sin(scrollProgress * Math.PI) * 0.05;
      camera.rotation.y = mouseX * 0.04;

      // Animate floating crystals
      crystals.forEach((item, index) => {
        item.mesh.rotation.x += item.rotSpeedX;
        item.mesh.rotation.y += item.rotSpeedY;
        // Floating wave
        item.mesh.position.y = item.baseY + Math.sin(elapsedTime * item.floatSpeed + index) * 1.2;
      });

      // Slowly rotate crystal cluster
      crystalGroup.rotation.y = elapsedTime * 0.015;

      // Slow upward drift for dust
      const dustPos = dustGeometry.attributes.position.array;
      for (let i = 0; i < dustCount; i++) {
        const i3 = i * 3 + 1;
        dustPos[i3] += 0.015;
        if (dustPos[i3] > 40) {
          dustPos[i3] = -40;
        }
      }
      dustGeometry.attributes.position.needsUpdate = true;

      renderer.render(scene, camera);
    };

    animate();

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("resize", handleResize);

      geometries.forEach((g) => g.dispose());
      crystalMaterials.forEach((m) => m.dispose());
      dustGeometry.dispose();
      dustMaterial.dispose();
      dustTexture.dispose();

      if (renderer.domElement && renderer.domElement.parentNode) {
        renderer.domElement.parentNode.removeChild(renderer.domElement);
      }
      renderer.dispose();
    };
  }, []);

  return <div ref={mountRef} className="fixed inset-0 pointer-events-none z-[-1]" />;
}
