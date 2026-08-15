import React, { useState } from "react";
import { Typography, Card, CardContent } from "@mui/material";
import { motion, AnimatePresence } from "framer-motion";
import { useTheme } from "@mui/material/styles";

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

  const filteredSkills = activeTab === "All"
    ? skills
    : skills.filter((skill) => skill.category === activeTab);

  return (
    <section
      id="skills"
      className="relative py-24 px-6 md:px-20 overflow-hidden"
      style={{
        background: `linear-gradient(135deg, ${theme.palette.background.default}, #f8fafc)`,
      }}
    >
      {/* Decorative background glows */}
      <div
        className="absolute top-0 left-0 w-72 h-72 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse"
        style={{ backgroundColor: theme.palette.primary.light }}
      ></div>
      <div
        className="absolute bottom-0 right-0 w-96 h-96 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse"
        style={{
          backgroundColor: theme.palette.secondary.light,
          animationDelay: "2s",
        }}
      ></div>

      <div className="max-w-6xl mx-auto text-center relative z-10">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <Typography
            variant="h3"
            sx={{
              fontWeight: 800,
              background: `linear-gradient(to right, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`,
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              fontFamily: '"Poppins", sans-serif',
              mb: 2,
            }}
          >
            Skills & Technologies
          </Typography>
          <div
            className="mx-auto mb-6"
            style={{
              width: "80px",
              height: "4px",
              background: `linear-gradient(to right, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`,
              borderRadius: "4px",
            }}
          ></div>
          <Typography
            variant="body1"
            sx={{
              color: theme.palette.text.secondary,
              fontFamily: '"Poppins", sans-serif',
              maxWidth: "650px",
              mx: "auto",
              mb: 8,
              fontSize: "1.1rem",
            }}
          >
            Proficient in modern web technologies, development tools, and AI tools
            to build creative and scalable applications.
          </Typography>
        </motion.div>

        {/* Category Pills Menu */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          viewport={{ once: true }}
          className="flex flex-wrap justify-center gap-3 mb-16"
        >
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveTab(cat)}
              className={`px-5 py-2 rounded-full text-sm font-semibold tracking-wide transition-all duration-300 cursor-pointer ${
                activeTab === cat
                  ? "text-white shadow-md shadow-red-500/15"
                  : "bg-white text-gray-600 hover:bg-gray-100/70 border border-gray-100"
              }`}
              style={{
                fontFamily: '"Poppins", sans-serif',
                background: activeTab === cat
                  ? `linear-gradient(135deg, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`
                  : undefined,
              }}
            >
              {cat}
            </button>
          ))}
        </motion.div>

        {/* Interactive Skills Grid */}
        <motion.div layout className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
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
                <Card
                  className="group relative overflow-hidden"
                  sx={{
                    borderRadius: 4,
                    border: "1px solid rgba(0, 0, 0, 0.05)",
                    background: "rgba(255, 255, 255, 0.85)",
                    backdropFilter: "blur(10px)",
                    boxShadow: "0 10px 30px rgba(0, 0, 0, 0.02)",
                    transition: "all 0.4s cubic-bezier(0.4, 0, 0.2, 1)",
                    "&:hover": {
                      transform: "translateY(-6px)",
                      boxShadow: "0 15px 35px rgba(204, 1, 2, 0.08)",
                      borderColor: `${theme.palette.primary.light}25`,
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
                      <div
                        className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 blur-xl"
                        style={{
                          background: `linear-gradient(to bottom right, ${theme.palette.primary.light}, ${theme.palette.secondary.light})`,
                        }}
                      ></div>
                      
                      {/* Icon container */}
                      <div
                        className="relative bg-gray-50/60 rounded-2xl p-4 border border-gray-100/60 transition-all duration-300 group-hover:scale-108 group-hover:bg-white group-hover:shadow-sm"
                        style={{
                          borderColor: theme.palette.divider,
                        }}
                      >
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
                        color: theme.palette.text.primary,
                        fontFamily: '"Poppins", sans-serif',
                        fontSize: "0.95rem",
                        textAlign: "center",
                      }}
                    >
                      {skill.name}
                    </Typography>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  );
}
