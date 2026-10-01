// src/components/three/ThreeContactSphere.jsx
import React, { useEffect, useRef } from "react";
import * as THREE from "three";
import { BRAND_COLORS, createParticleTexture } from "./threeUtils";

export default function ThreeContactSphere() {
  const mountRef = useRef(null);

  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    const width = container.clientWidth || 320;
    const height = container.clientHeight || 320;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(50, width / height, 0.1, 100);
    camera.position.z = 7.5;

    const renderer = new THREE.WebGLRenderer({
      alpha: true,
      antialias: true,
    });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setClearColor(0x000000, 0);

    renderer.domElement.style.width = "100%";
    renderer.domElement.style.height = "100%";
    container.appendChild(renderer.domElement);

    // Group
    const group = new THREE.Group();
    scene.add(group);

    // Dotted 3D Globe
    const sphereRadius = 2.4;
    const particleCount = 280;
    const pGeo = new THREE.BufferGeometry();
    const pPos = new Float32Array(particleCount * 3);

    for (let i = 0; i < particleCount; i++) {
      const phi = Math.acos(-1 + (2 * i) / particleCount);
      const theta = Math.sqrt(particleCount * Math.PI) * phi;

      pPos[i * 3] = sphereRadius * Math.cos(theta) * Math.sin(phi);
      pPos[i * 3 + 1] = sphereRadius * Math.sin(theta) * Math.sin(phi);
      pPos[i * 3 + 2] = sphereRadius * Math.cos(phi);
    }
    pGeo.setAttribute("position", new THREE.BufferAttribute(pPos, 3));

    const pTex = createParticleTexture("#ffffff", "#ff4d4f");
    const pMat = new THREE.PointsMaterial({
      size: 0.22,
      map: pTex,
      transparent: true,
      blending: THREE.AdditiveBlending,
      color: BRAND_COLORS.primaryLight,
      depthWrite: false,
    });
    const globePoints = new THREE.Points(pGeo, pMat);
    group.add(globePoints);

    // Glowing Communication Signal Arcs (Torus arcs)
    const arcGeo1 = new THREE.TorusGeometry(sphereRadius * 1.15, 0.04, 16, 80, Math.PI * 1.2);
    const arcMat1 = new THREE.MeshBasicMaterial({
      color: BRAND_COLORS.secondary,
      transparent: true,
      opacity: 0.8,
    });
    const arc1 = new THREE.Mesh(arcGeo1, arcMat1);
    arc1.rotation.x = Math.PI / 4;
    group.add(arc1);

    const arcGeo2 = new THREE.TorusGeometry(sphereRadius * 1.25, 0.03, 16, 80, Math.PI * 0.9);
    const arcMat2 = new THREE.MeshBasicMaterial({
      color: BRAND_COLORS.primary,
      transparent: true,
      opacity: 0.7,
    });
    const arc2 = new THREE.Mesh(arcGeo2, arcMat2);
    arc2.rotation.y = Math.PI / 3;
    group.add(arc2);

    // Core Beacon
    const coreGeo = new THREE.IcosahedronGeometry(0.8, 1);
    const coreMat = new THREE.MeshStandardMaterial({
      color: BRAND_COLORS.primary,
      emissive: BRAND_COLORS.primaryLight,
      emissiveIntensity: 0.8,
      wireframe: true,
    });
    const coreMesh = new THREE.Mesh(coreGeo, coreMat);
    group.add(coreMesh);

    // Lights
    scene.add(new THREE.AmbientLight(0xffffff, 1.2));
    const pLight = new THREE.PointLight(BRAND_COLORS.secondary, 2, 20);
    pLight.position.set(5, 5, 5);
    scene.add(pLight);

    // Mouse Interaction
    let targetRotY = 0;
    let targetRotX = 0;
    const onMouseMove = (e) => {
      const rect = container.getBoundingClientRect();
      const x = ((e.clientX - rect.left) / width) * 2 - 1;
      const y = -((e.clientY - rect.top) / height) * 2 + 1;
      targetRotY = x * 0.8;
      targetRotX = -y * 0.6;
    };
    container.addEventListener("mousemove", onMouseMove);

    // Loop
    let animId;
    let clock = new THREE.Clock();

    const animate = () => {
      animId = requestAnimationFrame(animate);
      const elapsed = clock.getElapsedTime();

      group.rotation.y += 0.008 + (targetRotY - group.rotation.y) * 0.05;
      group.rotation.x += (targetRotX - group.rotation.x) * 0.05;

      arc1.rotation.z = elapsed * 0.6;
      arc2.rotation.z = -elapsed * 0.4;
      coreMesh.rotation.y = -elapsed * 0.8;

      renderer.render(scene, camera);
    };

    animate();

    return () => {
      cancelAnimationFrame(animId);
      container.removeEventListener("mousemove", onMouseMove);
      pGeo.dispose();
      pMat.dispose();
      pTex.dispose();
      arcGeo1.dispose();
      arcMat1.dispose();
      arcGeo2.dispose();
      arcMat2.dispose();
      coreGeo.dispose();
      coreMat.dispose();

      if (renderer.domElement && renderer.domElement.parentNode) {
        renderer.domElement.parentNode.removeChild(renderer.domElement);
      }
      renderer.dispose();
    };
  }, []);

  return <div ref={mountRef} className="w-full h-[280px] sm:h-[320px] flex items-center justify-center cursor-pointer" />;
}
