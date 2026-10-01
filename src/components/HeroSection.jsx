// src/components/HeroSection.jsx
import React from "react";
import { Button, Typography, useTheme } from "@mui/material";
import { motion } from "framer-motion";
import { TypeAnimation } from "react-type-animation";
import { useNavigate } from "react-router-dom";
import TechBackground from "./three/TechBackground";
import ThreeAvatarHoloCard from "./three/ThreeAvatarHoloCard";
import { ArrowRight } from "lucide-react";

const HomeSection = () => {
  const theme = useTheme();
  const navigate = useNavigate();

  return (
    <section
      id="home"
      className="relative min-h-screen flex flex-col md:flex-row items-center justify-center overflow-hidden px-6 md:px-20 py-24 md:py-0"
      style={{
        background:
          "radial-gradient(ellipse 80% 60% at 50% -10%, rgba(0,242,254,0.08) 0%, transparent 60%), radial-gradient(ellipse 60% 50% at 90% 80%, rgba(255,0,85,0.07) 0%, transparent 60%), #090a10",
      }}
    >
      {/* Three.js Tech Developer Background */}
      <TechBackground />

      {/* Cyber Grid Overlay */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage: `linear-gradient(to right, rgba(0,242,254,0.04) 1px, transparent 1px), linear-gradient(to bottom, rgba(0,242,254,0.04) 1px, transparent 1px)`,
          backgroundSize: "60px 60px",
          zIndex: 1,
        }}
      />

      {/* Vignette edges */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: "radial-gradient(ellipse at center, transparent 40%, rgba(9,10,16,0.85) 100%)",
          zIndex: 1,
        }}
      />

      {/* Left: Hero Text Content */}
      <motion.div
        className="flex-1 z-10 text-center md:text-left space-y-5 flex flex-col items-center md:items-start max-w-2xl"
        initial={{ opacity: 0, y: 35 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.9, ease: "easeOut" }}
        style={{ position: "relative" }}
      >
        {/* Terminal Status Badge */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2, duration: 0.6 }}
          className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full bg-slate-900/80 backdrop-blur-xl border border-cyan-500/30 shadow-lg shadow-cyan-500/10 text-xs font-mono text-cyan-400 mb-1"
        >
          <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
          <span className="text-gray-400">$</span>
          <span>init rohit.dev()</span>
          <span className="text-rose-400 font-bold">--ai_ready</span>
        </motion.div>

        {/* Name */}
        <div className="space-y-1">
          <Typography
            variant="h4"
            sx={{
              fontWeight: 500,
              fontSize: { xs: "1.2rem", sm: "1.5rem" },
              color: "#94a3b8",
              fontFamily: '"Fira Code", monospace',
              display: "flex",
              alignItems: "center",
              gap: 1.5,
              justifyContent: { xs: "center", md: "flex-start" },
            }}
          >
            <span className="text-rose-500 font-bold">&gt;</span> Hello World, I am
          </Typography>

          <Typography
            variant="h1"
            sx={{
              fontWeight: 900,
              fontSize: { xs: "2.75rem", sm: "3.75rem", md: "4.5rem" },
              color: "#ffffff",
              lineHeight: 1.1,
              fontFamily: '"Poppins", sans-serif',
              letterSpacing: "-0.02em",
              textShadow: "0 0 40px rgba(0,242,254,0.15)",
            }}
          >
            Rohit{" "}
            <span className="bg-gradient-to-r from-rose-500 via-red-500 to-cyan-400 bg-clip-text text-transparent">
              Kumar
            </span>
          </Typography>
        </div>

        {/* Dynamic Typing Role */}
        <div className="flex items-center gap-2 font-mono text-sm sm:text-base md:text-lg text-slate-300">
          <span className="text-cyan-400 font-bold">//</span>
          <span>Building</span>
          <TypeAnimation
            sequence={[
              "Full Stack Scalable Web Apps",
              2000,
              "AI and Machine Learning Models",
              2000,
              "Interactive 3D WebGL Experiences",
              2000,
              "Cloud and REST API Architectures",
              2000,
            ]}
            speed={50}
            repeat={Infinity}
            className="font-bold text-rose-400"
          />
        </div>

        {/* Description */}
        <p className="text-sm md:text-base text-slate-400 max-w-lg leading-relaxed font-sans">
          MCA student specializing in AI and ML. Crafting high-performance modern web
          architectures, intelligent systems, and reactive 3D WebGL interfaces.
        </p>

        {/* Tech Stack Pills */}
        <motion.div
          className="flex flex-wrap items-center justify-center md:justify-start gap-2 pt-1 pb-2"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5, duration: 0.6 }}
        >
          {["React.js", "Node.js", "MongoDB", "Python", "GenAI / LLMs", "Three.js"].map((tech) => (
            <span
              key={tech}
              className="px-2.5 py-1 rounded-md text-[11px] font-mono font-medium bg-slate-900/70 border border-slate-800 text-slate-300 hover:border-cyan-500/50 hover:text-cyan-300 hover:bg-cyan-900/20 transition-all duration-200 cursor-default"
            >
              #{tech}
            </span>
          ))}
        </motion.div>

        {/* CTA Buttons */}
        <motion.div
          className="flex flex-wrap items-center justify-center md:justify-start gap-4 pt-2"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.5 }}
        >
          <Button
            variant="contained"
            onClick={() => {
              const proj = document.getElementById("projects");
              if (proj) proj.scrollIntoView({ behavior: "smooth" });
            }}
            sx={{
              borderRadius: "14px",
              px: 4,
              py: 1.6,
              fontWeight: 700,
              fontSize: "0.95rem",
              fontFamily: '"Fira Code", monospace',
              textTransform: "none",
              background: "linear-gradient(135deg, #ff0055 0%, #00f2fe 100%)",
              boxShadow: "0 8px 30px rgba(255, 0, 85, 0.35)",
              color: "#ffffff",
              transition: "all 0.3s ease",
              "&:hover": {
                transform: "translateY(-3px)",
                boxShadow: "0 12px 35px rgba(0, 242, 254, 0.45)",
              },
            }}
            endIcon={<ArrowRight className="w-4 h-4" />}
          >
            Explore Projects
          </Button>

          <Button
            variant="outlined"
            onClick={() => {
              const contact = document.getElementById("contact");
              if (contact) contact.scrollIntoView({ behavior: "smooth" });
            }}
            sx={{
              borderRadius: "14px",
              px: 4,
              py: 1.6,
              fontWeight: 700,
              fontSize: "0.95rem",
              fontFamily: '"Fira Code", monospace',
              textTransform: "none",
              borderColor: "rgba(0, 242, 254, 0.4)",
              color: "#00f2fe",
              backgroundColor: "rgba(15, 23, 42, 0.7)",
              backdropFilter: "blur(10px)",
              transition: "all 0.3s ease",
              "&:hover": {
                transform: "translateY(-3px)",
                borderColor: "#00f2fe",
                backgroundColor: "rgba(0, 242, 254, 0.12)",
                boxShadow: "0 8px 25px rgba(0, 242, 254, 0.2)",
              },
            }}
          >
            Get In Touch
          </Button>
        </motion.div>
      </motion.div>

      {/* Right: 3D Avatar Holo Card */}
      <motion.div
        className="flex-1 flex justify-center mt-16 md:mt-0 z-10"
        style={{ position: "relative" }}
        initial={{ scale: 0.85, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.9, ease: "easeOut", delay: 0.15 }}
      >
        <ThreeAvatarHoloCard />
      </motion.div>

      {/* Scroll Indicator */}
      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-1.5"
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.5 }}
        transition={{ delay: 1.5, duration: 1 }}
      >
        <span className="text-[10px] font-mono text-slate-400 tracking-widest uppercase">Scroll</span>
        <motion.div
          className="w-px h-8 bg-gradient-to-b from-cyan-400 to-transparent"
          animate={{ scaleY: [1, 1.4, 1], opacity: [0.4, 0.8, 0.4] }}
          transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
        />
      </motion.div>
    </section>
  );
};

export default HomeSection;
