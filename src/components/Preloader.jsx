// src/components/Preloader.jsx
// High-performance, GPU-accelerated Cyber HUD Preloader
// - Fast loading sequence with smooth progress bar (0% -> 100%)
// - Pure CSS keyframe animations on GPU compositor (zero frame drops even under WebGL init)
// - Dynamic system telemetry log and instant "ENTER NOW" skip option
// - Seamless fade-and-zoom exit transition
import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Typography } from "@mui/material";
import { Cpu, Zap, CheckCircle2 } from "lucide-react";

export default function Preloader({ onComplete }) {
  const [progress, setProgress] = useState(0);
  const [statusText, setStatusText] = useState("INITIALIZING 3D ENGINE");

  useEffect(() => {
    // Fast, responsive progress counter (completes in ~650ms)
    let current = 0;
    const interval = setInterval(() => {
      // Accelerate towards 100
      const increment = Math.max(3, Math.floor(Math.random() * 8) + 4);
      current = Math.min(100, current + increment);
      setProgress(current);

      if (current < 35) {
        setStatusText("BOOTING CORE KERNEL // VIRTUAL DOM");
      } else if (current < 70) {
        setStatusText("INITIALIZING WEBGL 2.0 // COMPILING SHADERS");
      } else if (current < 95) {
        setStatusText("SYNCHRONIZING QUANTUM ARSENAL // MATRICES READY");
      } else {
        setStatusText("SYSTEM ONLINE // LAUNCHING PORTFOLIO");
      }

      if (current >= 100) {
        clearInterval(interval);
        setTimeout(() => {
          if (onComplete) onComplete();
        }, 250);
      }
    }, 28);

    // Fast skip on Escape or Enter
    const handleKeyDown = (e) => {
      if (e.key === "Escape" || e.key === "Enter") {
        setProgress(100);
        clearInterval(interval);
        if (onComplete) onComplete();
      }
    };
    window.addEventListener("keydown", handleKeyDown);

    return () => {
      clearInterval(interval);
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [onComplete]);

  const handleSkip = () => {
    setProgress(100);
    if (onComplete) onComplete();
  };

  return (
    <motion.div
      initial={{ opacity: 1 }}
      exit={{
        opacity: 0,
        scale: 1.03,
        filter: "blur(8px)",
        transition: { duration: 0.35, ease: "easeOut" },
      }}
      className="fixed inset-0 z-[99999] flex flex-col items-center justify-center bg-[#07080d] select-none"
    >
      {/* Background Cyber Glow & Radial Vignette */}
      <div className="absolute inset-0 bg-radial-vignette opacity-80 pointer-events-none" />
      <div className="absolute w-[500px] h-[500px] rounded-full bg-cyan-500/10 blur-[130px] pointer-events-none" />
      <div className="absolute w-[400px] h-[400px] rounded-full bg-rose-500/10 blur-[130px] pointer-events-none" />

      {/* Main Center HUD Assembly */}
      <div className="relative z-10 flex flex-col items-center gap-7 px-6 text-center max-w-md w-full">
        {/* CSS GPU-Accelerated Gyroscope Rings */}
        <div className="relative w-28 h-28 flex items-center justify-center">
          {/* Outer Pulsing Glow Disc */}
          <div className="absolute inset-0 rounded-full bg-gradient-to-tr from-rose-500/20 to-cyan-500/20 blur-md animate-pulse" />

          {/* Ring 1 - Fast Clockwise */}
          <div
            className="absolute inset-0 rounded-full border-2 border-transparent border-t-cyan-400 border-r-cyan-400/30"
            style={{
              animation: "preloader-spin 1.4s linear infinite",
              willChange: "transform",
            }}
          />

          {/* Ring 2 - Medium Counter-Clockwise */}
          <div
            className="absolute inset-2.5 rounded-full border-2 border-transparent border-b-rose-500 border-l-rose-500/40"
            style={{
              animation: "preloader-spin-reverse 1.8s linear infinite",
              willChange: "transform",
            }}
          />

          {/* Ring 3 - Slow Tilted Axis */}
          <div
            className="absolute inset-5 rounded-full border border-dashed border-cyan-400/40"
            style={{
              animation: "preloader-spin 3s linear infinite",
              willChange: "transform",
            }}
          />

          {/* Center R Cyber Monogram Badge */}
          <div className="relative z-10 w-12 h-12 rounded-2xl bg-slate-900/90 border border-cyan-500/40 shadow-lg shadow-cyan-500/30 flex items-center justify-center">
            <Typography
              variant="h5"
              sx={{
                fontWeight: 900,
                fontFamily: '"Poppins", sans-serif',
                background: "linear-gradient(135deg, #00f2fe, #ff0055)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
              }}
            >
              R
            </Typography>
          </div>
        </div>

        {/* Progress Bar & Telemetry HUD */}
        <div className="w-full flex flex-col gap-3">
          {/* Top Status & Percentage */}
          <div className="flex items-center justify-between text-xs font-mono">
            <div className="flex items-center gap-2 text-cyan-400">
              <span className="w-2 h-2 rounded-full bg-cyan-400 animate-ping" />
              <span className="font-bold tracking-wider">{statusText}</span>
            </div>
            <span className="font-bold text-white tracking-widest text-sm">
              {progress}%
            </span>
          </div>

          {/* High-Tech Progress Track */}
          <div className="relative w-full h-2 rounded-full bg-slate-900 border border-slate-800 overflow-hidden p-0.5">
            <div
              className="h-full rounded-full transition-all duration-75 ease-out"
              style={{
                width: `${progress}%`,
                background: "linear-gradient(90deg, #ff0055, #f59e0b, #00f2fe)",
                boxShadow: "0 0 14px rgba(0, 242, 254, 0.8)",
              }}
            />
          </div>

          {/* Telemetry Subtitle */}
          <div className="flex items-center justify-between text-[11px] font-mono text-slate-400 pt-1">
            <span>CORE // THREE.JS + REACT 19</span>
            <span>SYSTEM_V7 // HIGH_PERF</span>
          </div>
        </div>

        {/* Quick Skip Button */}
        <button
          onClick={handleSkip}
          className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-900/60 hover:bg-slate-800 border border-slate-800 hover:border-cyan-500/40 text-[11px] font-mono text-slate-400 hover:text-cyan-300 transition-all cursor-pointer"
        >
          <span>PRESS ESC OR CLICK TO ENTER</span>
        </button>
      </div>

      {/* Embedded GPU Keyframes */}
      <style>{`
        @keyframes preloader-spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
        @keyframes preloader-spin-reverse {
          0% { transform: rotate(360deg); }
          100% { transform: rotate(0deg); }
        }
      `}</style>
    </motion.div>
  );
}
