import React, { useState } from "react";
import { Typography, Card, CardContent } from "@mui/material";
import { motion, AnimatePresence } from "framer-motion";
import { useTheme } from "@mui/material/styles";
import ThreeSkillReactor from "./three/ThreeSkillReactor";
import ThreeTiltCard from "./three/ThreeTiltCard";
import { Atom, LayoutGrid, Terminal, Cpu, Zap } from "lucide-react";

const skills = [
  // --- Frontend ---
  {
    name: "React",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg",
    category: "Frontend",
  },
  {
    name: "Material UI",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/materialui/materialui-original.svg",
    category: "Frontend",
  },
  {
    name: "JavaScript",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg",
    category: "Frontend",
  },

  // --- Backend ---
  {
    name: "Node.js",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg",
    category: "Backend",
  },
  {
    name: "MongoDB",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mongodb/mongodb-original.svg",
    category: "Backend",
  },
  {
    name: "Firebase",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/firebase/firebase-plain.svg",
    category: "Backend",
  },

  // --- Programming Languages ---
  {
    name: "C",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/c/c-original.svg",
    category: "Languages",
  },
  {
    name: "C++",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/cplusplus/cplusplus-original.svg",
    category: "Languages",
  },
  {
    name: "Java",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/java/java-original.svg",
    category: "Languages",
  },
  {
    name: "Python",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg",
    category: "Languages",
  },

  // --- Tools & Platforms ---
  {
    name: "Git",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/git/git-original.svg",
    category: "Tools",
  },
  {
    name: "GitHub",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/github/github-original.svg",
    category: "Tools",
  },
  {
    name: "VS Code",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/vscode/vscode-original.svg",
    category: "Tools",
  },
  {
    name: "IntelliJ IDEA",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/intellij/intellij-original.svg",
    category: "Tools",
  },

  // --- Design & Visualization ---
  {
    name: "Figma",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/figma/figma-original.svg",
    category: "AI & Design",
  },
  {
    name: "Data Visualization",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/d3js/d3js-original.svg",
    category: "AI & Design",
  },

  // --- AI & Productivity ---
  {
    name: "ChatGPT",
    icon: "https://upload.wikimedia.org/wikipedia/commons/0/04/ChatGPT_logo.svg",
    category: "AI & Design",
  },
];

const categories = ["All", "Frontend", "Backend", "Languages", "Tools", "AI & Design"];

export default function Skills() {
  const theme = useTheme();
  const [activeTab, setActiveTab] = useState("All");
  const [viewMode, setViewMode] = useState("3d"); // "3d" or "grid"

  const filteredSkills = activeTab === "All"
    ? skills
    : skills.filter((skill) => skill.category === activeTab);

  return (
    <section
      id="skills"
      className="relative py-24 px-6 md:px-20 overflow-hidden bg-gradient-to-b from-[#090a10] via-[#0c101c] to-[#090a10]"
    >
      {/* Decorative cyber background glows */}
      <div className="absolute top-1/4 left-0 w-96 h-96 rounded-full bg-cyan-600/10 blur-[120px] pointer-events-none" />
      <div className="absolute bottom-1/4 right-0 w-96 h-96 rounded-full bg-rose-600/10 blur-[120px] pointer-events-none" />

      <div className="max-w-6xl mx-auto text-center relative z-10">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-slate-900/90 border border-cyan-500/30 text-xs font-mono text-cyan-400 mb-4 shadow-sm shadow-cyan-500/10">
            <Cpu className="w-3.5 h-3.5 text-cyan-400" />
            <span>stack.manifest // FULL_STACK_AI</span>
          </div>

          <Typography
            variant="h3"
            sx={{
              fontWeight: 800,
              color: "#ffffff",
              fontFamily: '"Poppins", sans-serif',
              mb: 2,
            }}
          >
            Technologies &{" "}
            <span className="bg-gradient-to-r from-rose-500 via-red-500 to-cyan-400 bg-clip-text text-transparent">
              AI Arsenal
            </span>
          </Typography>

          <div
            className="mx-auto mb-6"
            style={{
              width: "80px",
              height: "4px",
              background: "linear-gradient(to right, #ff0055, #00f2fe)",
              borderRadius: "4px",
            }}
          />

          <Typography
            variant="body1"
            sx={{
              color: "#94a3b8",
              fontFamily: '"Poppins", sans-serif',
              maxWidth: "680px",
              mx: "auto",
              mb: 6,
              fontSize: "1.05rem",
              lineHeight: 1.8,
            }}
          >
            Engineering scalable web architectures and intelligent AI systems.
            Interact with the 3D Quantum Cyber Reactor or browse the card matrix view.
          </Typography>
        </motion.div>

        {/* View Mode Toggle & Category Pills */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mb-10 max-w-4xl mx-auto font-mono">
          {/* 3D vs Grid Toggle */}
          <div className="flex items-center p-1 bg-slate-900/90 rounded-full border border-slate-800 shadow-xl">
            <button
              onClick={() => setViewMode("3d")}
              className={`flex items-center gap-2 px-4 py-2 rounded-full text-xs font-bold transition-all cursor-pointer ${
                viewMode === "3d"
                  ? "bg-gradient-to-r from-rose-600 via-red-500 to-cyan-500 text-white shadow-lg shadow-cyan-500/25"
                  : "text-slate-400 hover:text-slate-200"
              }`}
            >
              <Cpu className="w-4 h-4 text-cyan-300" />
              <span>3D Cyber Reactor</span>
            </button>
            <button
              onClick={() => setViewMode("grid")}
              className={`flex items-center gap-2 px-4 py-2 rounded-full text-xs font-bold transition-all cursor-pointer ${
                viewMode === "grid"
                  ? "bg-gradient-to-r from-rose-600 via-red-500 to-cyan-500 text-white shadow-lg shadow-cyan-500/25"
                  : "text-slate-400 hover:text-slate-200"
              }`}
            >
              <LayoutGrid className="w-4 h-4" />
              <span>Card Matrix</span>
            </button>
          </div>

          {/* Category Filter Pills */}
          <div className="flex flex-wrap justify-center gap-2">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveTab(cat)}
                className={`px-3.5 py-1.5 rounded-full text-xs font-semibold tracking-wide transition-all duration-300 cursor-pointer ${
                  activeTab === cat
                    ? "bg-gradient-to-r from-rose-600 to-cyan-500 text-white shadow-md shadow-cyan-500/20"
                    : "bg-slate-900/80 text-slate-400 hover:text-slate-200 hover:bg-slate-800 border border-slate-800"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Content: 3D Quantum Reactor OR Card Grid */}
        <AnimatePresence mode="wait">
          {viewMode === "3d" ? (
            <motion.div
              key="3d-reactor"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.4 }}
              className="w-full flex justify-center"
            >
              <ThreeSkillReactor selectedCategory={activeTab} />
            </motion.div>
          ) : (
            <motion.div
              key="grid-cards"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.4 }}
              layout
              className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6"
            >
              <AnimatePresence mode="popLayout">
                {filteredSkills.map((skill) => (
                  <motion.div
                    layout
                    initial={{ opacity: 0, scale: 0.85 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.85 }}
                    transition={{ duration: 0.3 }}
                    key={skill.name}
                  >
                    <ThreeTiltCard tiltMaxAngleX={15} tiltMaxAngleY={15} scale={1.05} className="rounded-2xl">
                      <Card
                        className="group relative overflow-hidden h-full"
                        sx={{
                          borderRadius: 4,
                          border: "1px solid rgba(255, 255, 255, 0.07)",
                          background: "rgba(17, 21, 36, 0.75)",
                          backdropFilter: "blur(14px)",
                          boxShadow: "0 10px 30px rgba(0, 0, 0, 0.4)",
                          transition: "all 0.3s ease",
                          "&:hover": {
                            boxShadow: "0 15px 35px rgba(0, 242, 254, 0.15)",
                            borderColor: "rgba(0, 242, 254, 0.35)",
                          },
                        }}
                      >
                        <CardContent
                          sx={{
                            display: "flex",
                            flexDirection: "column",
                            alignItems: "center",
                            gap: 2,
                            p: 4,
                          }}
                        >
                          {/* Glowing back circle */}
                          <div className="relative">
                            <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 blur-xl bg-gradient-to-br from-rose-500 to-cyan-400" />

                            {/* Icon container */}
                            <div className="relative bg-slate-950/80 rounded-2xl p-4 border border-slate-800 transition-all duration-300 group-hover:scale-110 group-hover:border-cyan-500/40">
                              <img
                                src={skill.icon}
                                alt={skill.name}
                                className="w-12 h-12 object-contain"
                              />
                            </div>
                          </div>

                          <Typography
                            variant="subtitle2"
                            sx={{
                              fontWeight: 700,
                              color: "#f8fafc",
                              fontFamily: '"Poppins", sans-serif',
                              fontSize: "0.95rem",
                              textAlign: "center",
                            }}
                          >
                            {skill.name}
                          </Typography>
                        </CardContent>
                      </Card>
                    </ThreeTiltCard>
                  </motion.div>
                ))}
              </AnimatePresence>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}
