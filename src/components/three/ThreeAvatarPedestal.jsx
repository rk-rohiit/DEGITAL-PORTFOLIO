// src/components/three/ThreeAvatarPedestal.jsx
import React, { useEffect, useRef } from "react";
import * as THREE from "three";
import { createRingTexture, createParticleTexture, BRAND_COLORS } from "./threeUtils";

export default function ThreeAvatarPedestal() {
  const mountRef = useRef(null);

  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    const width = container.clientWidth || 360;
    const height = container.clientHeight || 120;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(50, width / height, 0.1, 100);
    camera.position.set(0, 3.8, 6.5);
    camera.lookAt(0, 0, 0);

    const renderer = new THREE.WebGLRenderer({
      alpha: true,
      antialias: true,
      powerPreference: "high-performance",
    });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setClearColor(0x000000, 0);

    renderer.domElement.style.width = "100%";
    renderer.domElement.style.height = "100%";
    container.appendChild(renderer.domElement);

    // 1. Holographic Laser Disc
    const discGeo = new THREE.PlaneGeometry(5.2, 5.2);
    const ringTex = createRingTexture("#cc0102");
    const discMat = new THREE.MeshBasicMaterial({
      map: ringTex,
      transparent: true,
      opacity: 0.85,
      side: THREE.DoubleSide,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
    });
    const discMesh = new THREE.Mesh(discGeo, discMat);
    discMesh.rotation.x = -Math.PI / 2;
    scene.add(discMesh);

    // 2. Outer Rotating Tech Ring
    const outerRingGeo = new THREE.RingGeometry(2.8, 2.95, 64);
    const outerRingMat = new THREE.MeshBasicMaterial({
      color: BRAND_COLORS.secondary,
      side: THREE.DoubleSide,
      transparent: true,
      opacity: 0.6,
      blending: THREE.AdditiveBlending,
    });
    const outerRing = new THREE.Mesh(outerRingGeo, outerRingMat);
    outerRing.rotation.x = -Math.PI / 2;
    scene.add(outerRing);

    // 3. Upward Energy Particles
    const pCount = 45;
    const pGeo = new THREE.BufferGeometry();
    const pPos = new Float32Array(pCount * 3);
    const pSpeeds = new Float32Array(pCount);

    for (let i = 0; i < pCount; i++) {
      const i3 = i * 3;
      const angle = Math.random() * Math.PI * 2;
      const radius = 0.5 + Math.random() * 2.2;
      pPos[i3] = Math.cos(angle) * radius;
      pPos[i3 + 1] = Math.random() * 2.5; // Y position
      pPos[i3 + 2] = Math.sin(angle) * radius;
      pSpeeds[i] = 0.02 + Math.random() * 0.03;
    }

    pGeo.setAttribute("position", new THREE.BufferAttribute(pPos, 3));
    const pTex = createParticleTexture("#ffffff", "#ff6f61");
    const pMat = new THREE.PointsMaterial({
      size: 0.22,
      map: pTex,
      transparent: true,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
      color: BRAND_COLORS.primaryLight,
      opacity: 0.8,
    });

    const particles = new THREE.Points(pGeo, pMat);
    scene.add(particles);

    // Animation Loop
    let animId;
    let clock = new THREE.Clock();

    const animate = () => {
      animId = requestAnimationFrame(animate);
      const elapsed = clock.getElapsedTime();

      // Disc pulse & rotation
      discMesh.rotation.z = elapsed * 0.4;
      outerRing.rotation.z = -elapsed * 0.6;
      discMat.opacity = 0.65 + Math.sin(elapsed * 4) * 0.2;

      // Particle rise
      const posArr = pGeo.attributes.position.array;
      for (let i = 0; i < pCount; i++) {
        const yIndex = i * 3 + 1;
        posArr[yIndex] += pSpeeds[i];
        if (posArr[yIndex] > 3.0) {
          posArr[yIndex] = 0;
        }
      }
      pGeo.attributes.position.needsUpdate = true;

      renderer.render(scene, camera);
    };

    animate();

    return () => {
      cancelAnimationFrame(animId);
      discGeo.dispose();
      discMat.dispose();
      ringTex.dispose();
      outerRingGeo.dispose();
      outerRingMat.dispose();
      pGeo.dispose();
      pMat.dispose();
      pTex.dispose();

      if (renderer.domElement && renderer.domElement.parentNode) {
        renderer.domElement.parentNode.removeChild(renderer.domElement);
      }
      renderer.dispose();
    };
  }, []);

  return <div ref={mountRef} className="w-full h-full pointer-events-none" />;
}
