// src/pages/NotFound.jsx
// Cyberpunk / Sci-Fi 404 Route Not Found Page
import React, { useEffect, useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { Typography, Card } from "@mui/material";
import {
  Home,
  ArrowLeft,
  Layers,
  Send,
  Zap,
  Terminal,
  Compass,
  AlertTriangle,
  RotateCcw,
} from "lucide-react";
import { motion } from "framer-motion";

export default function NotFound() {
  const navigate = useNavigate();
  const location = useLocation();
  const [glitchActive, setGlitchActive] = useState(false);

  useEffect(() => {
    document.title = "404 // Route Lost in Cyberspace | Rohit Kumar";
    window.scrollTo(0, 0);

    // Periodic glitch effect trigger
    const glitchInterval = setInterval(() => {
      setGlitchActive(true);
      setTimeout(() => setGlitchActive(false), 300);
    }, 4000);

    return () => {
      clearInterval(glitchInterval);
      document.title = "Rohit Kumar | Full-Stack Developer & AI Engineer";
    };
  }, []);

  const handleScrollTo = (sectionId) => {
    navigate("/");
    setTimeout(() => {
      const el = document.getElementById(sectionId);
      if (el) el.scrollIntoView({ behavior: "smooth" });
    }, 150);
  };

  return (
    <div className="min-h-screen relative flex flex-col items-center justify-center p-6 bg-[#07080d] text-slate-100 overflow-hidden select-none">
      {/* Background Cyber Grid */}
      <div
        className="absolute inset-0 pointer-events-none opacity-20"
        style={{
          backgroundImage:
            "linear-gradient(to right, rgba(0,242,254,0.1) 1px, transparent 1px), linear-gradient(to bottom, rgba(0,242,254,0.1) 1px, transparent 1px)",
          backgroundSize: "45px 45px",
        }}
      />

      {/* Atmospheric Ambient Glows */}
      <div className="absolute top-1/4 left-1/4 w-[450px] h-[450px] rounded-full bg-cyan-500/10 blur-[150px] pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-[450px] h-[450px] rounded-full bg-rose-500/10 blur-[150px] pointer-events-none" />

      <div className="max-w-xl w-full text-center relative z-10 flex flex-col items-center">
        {/* Radar Reticle Assembly */}
        <div className="relative w-28 h-28 flex items-center justify-center mb-6">
          {/* Outer Pulsing Glow */}
          <div className="absolute inset-0 rounded-full bg-rose-500/20 blur-xl animate-pulse" />

          {/* Rotating Compass Ring */}
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 12, repeat: Infinity, ease: "linear" }}
            className="absolute inset-0 rounded-full border border-dashed border-cyan-400/40"
          />

          {/* Inner Counter-Rotating Ring */}
          <motion.div
            animate={{ rotate: -360 }}
            transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
            className="absolute inset-2.5 rounded-full border border-t-rose-500 border-r-transparent border-b-cyan-400 border-l-transparent"
          />

          {/* Center Warning Shield Icon */}
          <div className="relative z-10 w-14 h-14 rounded-2xl bg-slate-900/90 border border-rose-500/40 shadow-xl shadow-rose-500/20 flex items-center justify-center">
            <AlertTriangle className="w-7 h-7 text-rose-500 animate-pulse" />
          </div>
        </div>

        {/* 404 Glitch Title */}
        <div className="relative mb-3">
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.5, type: "spring" }}
          >
            <Typography
              variant="h1"
              sx={{
                fontWeight: 900,
                fontSize: { xs: "5.5rem", sm: "7.5rem", md: "8.5rem" },
                lineHeight: 0.9,
                fontFamily: '"Fira Code", monospace',
                letterSpacing: "-0.04em",
                background: "linear-gradient(135deg, #00f2fe 0%, #ffffff 50%, #ff0055 100%)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                textShadow: glitchActive
                  ? "2px 0 #00f2fe, -2px 0 #ff0055"
                  : "0 0 40px rgba(0, 242, 254, 0.25)",
              }}
            >
              404
            </Typography>
          </motion.div>

          {/* Scanline Beam */}
          <div className="w-full h-0.5 bg-gradient-to-r from-transparent via-cyan-400 to-transparent opacity-60 mt-3" />
        </div>

        {/* Subtitle & Warning Badge */}
        <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-slate-900/90 border border-rose-500/30 text-xs font-mono text-rose-400 mb-4 shadow-sm">
          <span className="w-2 h-2 rounded-full bg-rose-500 animate-ping" />
          <span>SECTOR_ERROR // COORDINATES_NOT_FOUND</span>
        </div>

        <Typography
          variant="h4"
          sx={{
            fontWeight: 800,
            color: "#ffffff",
            fontFamily: '"Poppins", sans-serif',
            fontSize: { xs: "1.5rem", sm: "1.8rem" },
            mb: 1.5,
          }}
        >
          Lost in the Digital Void?
        </Typography>

        <p className="text-slate-400 font-sans text-xs sm:text-sm max-w-md mx-auto mb-6 leading-relaxed">
          The orbital route you are attempting to reach does not exist or has been shifted to unmapped coordinates.
        </p>

        {/* Terminal Telemetry Diagnostics Box */}
        <div className="w-full max-w-md p-4 rounded-2xl bg-slate-950/80 border border-slate-800 shadow-xl backdrop-blur-md text-left font-mono text-[11px] mb-7 space-y-1 text-slate-400">
          <div className="flex items-center justify-between pb-2 border-b border-slate-800/80 text-slate-400">
            <span className="flex items-center gap-1.5 text-cyan-400">
              <Terminal className="w-3.5 h-3.5" />
              <span>TERMINAL_DIAGNOSTIC</span>
            </span>
            <span className="text-[10px] text-rose-400 font-bold">STATUS: 404 NULL</span>
          </div>
          <div className="pt-1.5">
            <span className="text-gray-400">&gt; REQUEST_URI:</span>{" "}
            <span className="text-cyan-300 font-semibold">{location.pathname}</span>
          </div>
          <div>
            <span className="text-gray-400">&gt; HOST_NODE:</span>{" "}
            <span className="text-slate-300">rohit.dev (PORTFOLIO_V7)</span>
          </div>
          <div>
            <span className="text-gray-400">&gt; RECOVERY:</span>{" "}
            <span className="text-emerald-400">Reroute recommended to active sector</span>
          </div>
        </div>

        {/* Quick Navigation Hub */}
        <Card
          elevation={0}
          className="w-full max-w-md p-5 sm:p-6 rounded-3xl"
          sx={{
            background: "rgba(12, 16, 28, 0.8)",
            backdropFilter: "blur(16px)",
            border: "1px solid rgba(255, 255, 255, 0.08)",
            boxShadow: "0 15px 35px rgba(0, 0, 0, 0.4)",
            mb: 4,
          }}
        >
          <div className="text-xs font-mono text-slate-400 uppercase tracking-wider mb-3 text-left">
            Active Orbital Coordinates:
          </div>

          <div className="flex flex-col gap-2.5">
            {/* Home Primary */}
            <Link
              to="/"
              className="flex items-center justify-between px-4 py-3 rounded-2xl bg-gradient-to-r from-rose-600 via-red-500 to-cyan-500 text-white font-mono text-xs font-bold shadow-lg shadow-cyan-500/20 hover:shadow-cyan-500/35 hover:scale-[1.02] transition-all cursor-pointer"
            >
              <div className="flex items-center gap-2.5">
                <Home className="w-4 h-4" />
                <span>RETURN TO HOME BASE</span>
              </div>
              <span className="text-[10px] opacity-80">[root]</span>
            </Link>

            {/* Services */}
            <Link
              to="/services"
              className="flex items-center justify-between px-4 py-2.5 rounded-2xl bg-slate-900/80 hover:bg-slate-900 border border-slate-800 hover:border-cyan-500/40 text-slate-300 hover:text-cyan-300 font-mono text-xs transition-all cursor-pointer"
            >
              <div className="flex items-center gap-2.5">
                <Zap className="w-4 h-4 text-cyan-400" />
                <span>EXPLORE SERVICES</span>
              </div>
              <span className="text-[10px] text-slate-400">/services</span>
            </Link>

            {/* Projects */}
            <button
              onClick={() => handleScrollTo("projects")}
              className="flex items-center justify-between px-4 py-2.5 rounded-2xl bg-slate-900/80 hover:bg-slate-900 border border-slate-800 hover:border-cyan-500/40 text-slate-300 hover:text-cyan-300 font-mono text-xs transition-all cursor-pointer"
            >
              <div className="flex items-center gap-2.5">
                <Layers className="w-4 h-4 text-rose-400" />
                <span>VIEW FEATURED PROJECTS</span>
              </div>
              <span className="text-[10px] text-slate-400">#projects</span>
            </button>

            {/* Contact */}
            <button
              onClick={() => handleScrollTo("contact")}
              className="flex items-center justify-between px-4 py-2.5 rounded-2xl bg-slate-900/80 hover:bg-slate-900 border border-slate-800 hover:border-cyan-500/40 text-slate-300 hover:text-cyan-300 font-mono text-xs transition-all cursor-pointer"
            >
              <div className="flex items-center gap-2.5">
                <Send className="w-4 h-4 text-emerald-400" />
                <span>INITIATE TRANSMISSION</span>
              </div>
              <span className="text-[10px] text-slate-400">#contact</span>
            </button>
          </div>
        </Card>

        {/* Go Back Previous Page */}
        <button
          onClick={() => navigate(-1)}
          className="inline-flex items-center gap-2 text-xs font-mono text-slate-400 hover:text-cyan-400 transition-colors cursor-pointer"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>STEP BACK TO PREVIOUS SECTOR</span>
        </button>
      </div>

      {/* Bottom Status Telemetry Footer */}
      <div className="absolute bottom-4 inset-x-0 flex items-center justify-center gap-4 text-[10px] font-mono text-slate-400 pointer-events-none">
        <span className="flex items-center gap-1.5">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
          CORE ENGINE: ONLINE
        </span>
        <span>•</span>
        <span>LATENCY: 14ms</span>
        <span>•</span>
        <span>SYSTEM_V7 // SECURE</span>
      </div>
    </div>
  );
}
