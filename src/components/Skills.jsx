import React from "react";
import { Typography, Card, CardContent, Grid } from "@mui/material";
import { motion } from "framer-motion";
import { useTheme } from "@mui/material/styles";

const skills = [
  // --- Frontend ---
  {
    name: "React",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg",
    color: "from-cyan-500 to-blue-500",
  },
  {
    name: "Material UI",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/materialui/materialui-original.svg",
    color: "from-blue-600 to-indigo-600",
  },
  // {
  //   name: "Tailwind CSS",
  //   icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/tailwindcss/tailwindcss-plain.svg",
  //   color: "from-teal-500 to-cyan-500",
  // },
  {
    name: "JavaScript",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg",
    color: "from-yellow-400 to-orange-400",
  },

  // --- Backend ---
  {
    name: "Node.js",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg",
    color: "from-green-500 to-emerald-600",
  },
  {
    name: "MongoDB",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mongodb/mongodb-original.svg",
    color: "from-green-600 to-teal-600",
  },
  {
    name: "Firebase",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/firebase/firebase-plain.svg",
    color: "from-amber-500 to-orange-500",
  },

  // --- Programming Languages ---
  {
    name: "C",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/c/c-original.svg",
    color: "from-sky-500 to-blue-600",
  },
  {
    name: "C++",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/cplusplus/cplusplus-original.svg",
    color: "from-blue-500 to-indigo-600",
  },
  {
    name: "Java",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/java/java-original.svg",
    color: "from-red-500 to-orange-500",
  },
  {
    name: "Python",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg",
    color: "from-yellow-400 to-blue-500",
  },

  // --- Tools & Platforms ---
  {
    name: "Git",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/git/git-original.svg",
    color: "from-orange-600 to-red-500",
  },
  {
    name: "GitHub",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/github/github-original.svg",
    color: "from-gray-700 to-gray-900",
  },
  {
    name: "VS Code",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/vscode/vscode-original.svg",
    color: "from-blue-500 to-cyan-600",
  },
  {
    name: "IntelliJ IDEA",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/intellij/intellij-original.svg",
    color: "from-purple-600 to-indigo-600",
  },

  // --- Design & Visualization ---
  {
    name: "Figma",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/figma/figma-original.svg",
    color: "from-pink-500 to-purple-500",
  },
  {
    name: "Data Visualization",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/d3js/d3js-original.svg",
    color: "from-orange-400 to-yellow-500",
  },

  // --- AI & Productivity ---
  {
    name: "ChatGPT",
    icon: "https://upload.wikimedia.org/wikipedia/commons/0/04/ChatGPT_logo.svg",
    color: "from-emerald-500 to-teal-600",
  },
  
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: "easeOut" },
  },
};

export default function Skills() {
  const theme = useTheme();

  return (
    <section
      id="skills"
      className="relative py-24 px-6 overflow-hidden"
      style={{
        background: `linear-gradient(135deg, ${theme.palette.background.default}, #f3f4f6)`,
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

      {/* Section Header */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
        className="max-w-6xl mx-auto text-center relative z-10"
      >
        <Typography
          variant="h3"
          sx={{
            fontWeight: 700,
            background: `linear-gradient(to right, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`,
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            mb: 1,
          }}
        >
          Skills & Technologies
        </Typography>
        <div
          className="mx-auto mb-4"
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
            maxWidth: "700px",
            mx: "auto",
            mb: 8,
          }}
        >
          Proficient in modern web technologies, design tools, and AI-assisted
          development to build robust and creative solutions.
        </Typography>

        {/* Skills Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          <Grid container spacing={3} justifyContent="center">
            {skills.map((skill, index) => (
              <Grid item xs={6} sm={4} md={3} key={index}>
                <motion.div
                  variants={itemVariants}
                  whileHover={{
                    y: -8,
                    transition: { duration: 0.3 },
                  }}
                  className="h-full"
                >
                  <Card
                    sx={{
                      borderRadius: 3,
                      height: "100%",
                      backdropFilter: "blur(8px)",
                      backgroundColor: "rgba(255,255,255,0.9)",
                      border: `1px solid ${theme.palette.divider}`,
                      boxShadow:
                        "0 4px 16px rgba(0,0,0,0.05), 0 0 10px rgba(204,1,2,0.05)",
                      transition: "all 0.3s ease",
                      "&:hover": {
                        boxShadow:
                          "0 10px 24px rgba(204,1,2,0.15), 0 0 20px rgba(255,111,97,0.1)",
                        transform: "translateY(-4px)",
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
                      <div className="relative">
                        <div
                          className="absolute inset-0 rounded-2xl blur-xl opacity-0 group-hover:opacity-30 transition-opacity duration-300"
                          style={{
                            background: `linear-gradient(to bottom right, ${theme.palette.primary.light}, ${theme.palette.secondary.light})`,
                          }}
                        ></div>
                        <div
                          className="relative bg-white rounded-2xl p-4 shadow-sm group-hover:shadow-md transition-all duration-300"
                          style={{
                            border: `1px solid ${theme.palette.divider}`,
                          }}
                        >
                          <img
                            src={skill.icon}
                            alt={skill.name}
                            className="w-14 h-14 object-contain transition-transform duration-300 group-hover:scale-110"
                          />
                        </div>
                      </div>
                      <Typography
                        variant="subtitle1"
                        sx={{
                          fontWeight: 600,
                          color: theme.palette.text.primary,
                          textAlign: "center",
                        }}
                      >
                        {skill.name}
                      </Typography>
                    </CardContent>
                  </Card>
                </motion.div>
              </Grid>
            ))}
          </Grid>
        </motion.div>
      </motion.div>
    </section>
  );
}
