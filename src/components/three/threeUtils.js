// src/components/three/threeUtils.js
import * as THREE from "three";

/**
 * Creates a soft glowing radial particle texture using an HTML5 Canvas.
 * No external asset downloading required; 100% offline and crisp.
 */
export function createParticleTexture(color = "#ffffff", glowColor = "#00f2fe") {
  const canvas = document.createElement("canvas");
  canvas.width = 64;
  canvas.height = 64;
  const ctx = canvas.getContext("2d");

  const gradient = ctx.createRadialGradient(32, 32, 0, 32, 32, 32);
  gradient.addColorStop(0, color);
  gradient.addColorStop(0.2, glowColor);
  gradient.addColorStop(0.6, "rgba(255, 0, 85, 0.3)");
  gradient.addColorStop(1, "rgba(0, 0, 0, 0)");

  ctx.fillStyle = gradient;
  ctx.fillRect(0, 0, 64, 64);

  const texture = new THREE.CanvasTexture(canvas);
  texture.needsUpdate = true;
  return texture;
}

/**
 * Creates a holographic ring texture for energy discs or pedestals.
 */
export function createRingTexture(ringColor = "#00f2fe") {
  const canvas = document.createElement("canvas");
  canvas.width = 128;
  canvas.height = 128;
  const ctx = canvas.getContext("2d");

  ctx.clearRect(0, 0, 128, 128);
  ctx.beginPath();
  ctx.arc(64, 64, 52, 0, Math.PI * 2);
  ctx.strokeStyle = ringColor;
  ctx.lineWidth = 4;
  ctx.shadowColor = ringColor;
  ctx.shadowBlur = 14;
  ctx.stroke();

  // Futuristic tech dash ring
  ctx.beginPath();
  ctx.arc(64, 64, 40, 0, Math.PI * 2);
  ctx.strokeStyle = "rgba(255, 0, 85, 0.8)";
  ctx.lineWidth = 2.5;
  ctx.setLineDash([6, 6]);
  ctx.stroke();

  // Inner targeting reticle dots
  ctx.setLineDash([]);
  ctx.fillStyle = "#00f2fe";
  for (let a = 0; a < Math.PI * 2; a += Math.PI / 4) {
    const px = 64 + Math.cos(a) * 30;
    const py = 64 + Math.sin(a) * 30;
    ctx.beginPath();
    ctx.arc(px, py, 2, 0, Math.PI * 2);
    ctx.fill();
  }

  const texture = new THREE.CanvasTexture(canvas);
  texture.needsUpdate = true;
  return texture;
}

export const BRAND_COLORS = {
  primary: 0xff0055,       // Cyber Neon Red / Crimson
  primaryLight: 0xff3377,  // Bright Neon Pink / Red
  secondary: 0x00f2fe,     // Electric Cyan / AI Blue
  cyanBright: 0x38bdf8,
  neonEmerald: 0x00ff88,   // Code Matrix Green
  accentGold: 0xffb703,
  glowWhite: 0xffffff,
  darkSpace: 0x090a10,     // Deep Obsidian Background
};
