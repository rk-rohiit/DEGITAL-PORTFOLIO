// src/components/three/ThreeAvatarHoloCard.jsx
import React from "react";
import { motion } from "framer-motion";
import ThreeTiltCard from "./ThreeTiltCard";
import ThreeAvatarPedestal from "./ThreeAvatarPedestal";
import Avatar3DImg from "../../assets/Avatar3D.jpg";
import { Terminal, Cpu, Sparkles, Binary } from "lucide-react";

export default function ThreeAvatarHoloCard() {
  return (
    <div className="relative flex flex-col items-center justify-center select-none">
      {/* Outer Cyan & Crimson Cyber Aura Glow */}
      <div className="absolute -inset-10 bg-gradient-to-tr from-rose-600/30 via-cyan-500/20 to-blue-600/30 blur-3xl rounded-full opacity-70 pointer-events-none" />

      {/* Floating Tech Pill 1 - Top Left */}
      <motion.div
        animate={{ y: [0, -10, 0], x: [0, 5, 0] }}
        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
        className="absolute -top-6 -left-10 z-30 hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-xl bg-slate-900/90 backdrop-blur-xl border border-cyan-500/30 shadow-lg shadow-cyan-500/10 text-xs font-mono text-cyan-400"
      >
        <div className="w-5 h-5 rounded-lg bg-cyan-500/20 flex items-center justify-center text-cyan-300">
          <Terminal className="w-3.5 h-3.5" />
        </div>
        <span>FullStack.dev</span>
      </motion.div>

      {/* Floating Tech Pill 2 - Bottom Right */}
      <motion.div
        animate={{ y: [0, 10, 0], x: [0, -5, 0] }}
        transition={{ duration: 4.5, repeat: Infinity, ease: "easeInOut" }}
        className="absolute top-36 -right-10 z-30 hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-xl bg-slate-900/90 backdrop-blur-xl border border-rose-500/30 shadow-lg shadow-rose-500/10 text-xs font-mono text-rose-400"
      >
        <div className="w-5 h-5 rounded-lg bg-rose-500/20 flex items-center justify-center text-rose-300">
          <Cpu className="w-3.5 h-3.5" />
        </div>
        <span>AI / Neural Core</span>
      </motion.div>

      {/* Main 3D Tilt Cyber Deck Card */}
      <ThreeTiltCard
        tiltMaxAngleX={16}
        tiltMaxAngleY={16}
        scale={1.03}
        className="rounded-[36px] z-10"
      >
        <div className="relative w-[280px] h-[360px] sm:w-[310px] sm:h-[400px] md:w-[330px] md:h-[420px] rounded-[36px] p-2 bg-gradient-to-b from-cyan-500/40 via-slate-900/90 to-rose-600/40 border border-cyan-400/40 shadow-2xl shadow-cyan-500/20 overflow-hidden">
          
          {/* Inner Card Container */}
          <div className="relative w-full h-full rounded-[30px] overflow-hidden bg-slate-950">
            {/* 3D Avatar Image */}
            <img
              src={Avatar3DImg}
              alt="Rohit Kumar 3D Avatar"
              className="w-full h-full object-cover object-top scale-105 transition-transform duration-700 hover:scale-110"
            />

            {/* Futuristic Holographic Scanline Overlay */}
            <div className="absolute inset-0 pointer-events-none overflow-hidden">
              <div className="w-full h-1 bg-gradient-to-r from-transparent via-cyan-400 to-transparent shadow-[0_0_15px_#00f2fe] animate-cyber-scan opacity-70" />
            </div>

            {/* Cyber Corner Targeting Reticles */}
            <div className="absolute top-3 left-3 w-4 h-4 border-t-2 border-l-2 border-cyan-400 pointer-events-none" />
            <div className="absolute top-3 right-3 w-4 h-4 border-t-2 border-r-2 border-cyan-400 pointer-events-none" />
            <div className="absolute bottom-3 left-3 w-4 h-4 border-b-2 border-l-2 border-rose-500 pointer-events-none" />
            <div className="absolute bottom-3 right-3 w-4 h-4 border-b-2 border-r-2 border-rose-500 pointer-events-none" />

            {/* HUD Status Header Badge */}
            <div className="absolute top-3 left-1/2 -translate-x-1/2 flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-950/80 backdrop-blur-md border border-cyan-500/30 text-[10px] font-mono text-cyan-300">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping" />
              <span>3D AVATAR // ONLINE</span>
            </div>

            {/* Bottom HUD Telemetry Overlay */}
            <div className="absolute bottom-0 inset-x-0 p-4 bg-gradient-to-t from-slate-950 via-slate-950/80 to-transparent flex items-center justify-between text-[11px] font-mono">
              <div className="flex flex-col gap-0.5">
                <span className="text-gray-400 text-[10px]">OPERATOR</span>
                <span className="font-bold text-white tracking-wide">ROHIT KUMAR</span>
              </div>
              <div className="flex items-center gap-1 text-cyan-400 bg-cyan-950/60 px-2 py-1 rounded border border-cyan-500/30">
                <Binary className="w-3 h-3" />
                <span className="text-[10px]">STACK v2.5</span>
              </div>
            </div>
          </div>
        </div>
      </ThreeTiltCard>

      {/* Holographic 3D Three.js Pedestal underneath */}
      <div className="w-[340px] h-[100px] -mt-14 relative z-0">
        <ThreeAvatarPedestal />
      </div>
    </div>
  );
}
