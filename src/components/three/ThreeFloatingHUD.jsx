// src/components/three/ThreeFloatingHUD.jsx
import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Box, Sparkles, ChevronDown, ChevronUp, Eye, Compass, Cpu } from "lucide-react";

export default function ThreeFloatingHUD() {
  const [isOpen, setIsOpen] = useState(false);

  const scrollToSection = (id) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div className="fixed bottom-6 left-6 z-40 font-mono select-none">
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 15, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 15, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            className="mb-3 p-4 w-76 rounded-2xl bg-slate-950/95 backdrop-blur-2xl border border-cyan-500/30 shadow-2xl shadow-cyan-500/10 text-slate-200"
          >
            <div className="flex items-center justify-between pb-3 border-b border-slate-800">
              <div className="flex items-center gap-2">
                <Box className="w-4 h-4 text-cyan-400 animate-spin" style={{ animationDuration: "6s" }} />
                <span className="font-bold text-xs uppercase tracking-wider text-white">
                  3D Engine // FullStack
                </span>
              </div>
              <span className="text-[10px] px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-400 font-semibold border border-emerald-500/30">
                ONLINE • 60 FPS
              </span>
            </div>

            <div className="mt-3 space-y-2 text-xs">
              <p className="text-slate-400 text-[11px] leading-relaxed">
                WebGL 3D motion active. Quick jump telemetry:
              </p>

              <button
                onClick={() => scrollToSection("home")}
                className="w-full flex items-center justify-between px-3 py-2 rounded-xl bg-slate-900/80 hover:bg-slate-800 border border-slate-800 hover:border-cyan-500/40 text-slate-300 hover:text-cyan-300 transition-colors text-left"
              >
                <div className="flex items-center gap-2">
                  <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
                  <span>3D Avatar & Quantum Core</span>
                </div>
                <span className="text-[10px] text-gray-500">#home</span>
              </button>

              <button
                onClick={() => scrollToSection("skills")}
                className="w-full flex items-center justify-between px-3 py-2 rounded-xl bg-slate-900/80 hover:bg-slate-800 border border-slate-800 hover:border-cyan-500/40 text-slate-300 hover:text-cyan-300 transition-colors text-left"
              >
                <div className="flex items-center gap-2">
                  <Compass className="w-3.5 h-3.5 text-rose-400" />
                  <span>3D Celestial Tech Globe</span>
                </div>
                <span className="text-[10px] text-gray-500">#skills</span>
              </button>

              <button
                onClick={() => scrollToSection("contact")}
                className="w-full flex items-center justify-between px-3 py-2 rounded-xl bg-slate-900/80 hover:bg-slate-800 border border-slate-800 hover:border-cyan-500/40 text-slate-300 hover:text-cyan-300 transition-colors text-left"
              >
                <div className="flex items-center gap-2">
                  <Eye className="w-3.5 h-3.5 text-emerald-400" />
                  <span>3D Signal Beacon Globe</span>
                </div>
                <span className="text-[10px] text-gray-500">#contact</span>
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Floating Toggle Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2.5 px-4 py-2.5 rounded-full bg-slate-950/90 backdrop-blur-xl border border-cyan-500/40 shadow-xl shadow-cyan-500/10 hover:shadow-cyan-500/20 text-xs font-semibold text-cyan-300 hover:scale-105 active:scale-95 transition-all cursor-pointer"
      >
        <span className="relative flex h-2.5 w-2.5">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75"></span>
          <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-cyan-400"></span>
        </span>
        <span className="tracking-wide">AI_3D // ONLINE</span>
        {isOpen ? <ChevronDown className="w-3.5 h-3.5 text-cyan-400" /> : <ChevronUp className="w-3.5 h-3.5 text-cyan-400" />}
      </button>
    </div>
  );
}
