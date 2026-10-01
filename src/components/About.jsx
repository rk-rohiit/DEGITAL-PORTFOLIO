import React from "react";
import { useTheme } from "@mui/material/styles";
import { Card, Typography, Box } from "@mui/material";
import { Code, Users, Lightbulb, Zap, Terminal, Sparkles } from "lucide-react";
import { motion } from "framer-motion";
import ThreeTiltCard from "./three/ThreeTiltCard";

const About = () => {
  const theme = useTheme();

  const highlights = [
    {
      icon: Code,
      title: "Algorithmic Problem Solving",
      description:
        "Analyzing complex systems and writing clean, scalable, efficient full stack code.",
    },
    {
      icon: Zap,
      title: "AI & Machine Learning",
      description:
        "Specializing in neural networks, GenAI architectures, and intelligent data pipelines.",
    },
    {
      icon: Lightbulb,
      title: "Modern Tech Agility",
      description:
        "Rapid mastery of modern frameworks, WebGL 3D technologies, and reactive state systems.",
    },
    {
      icon: Users,
      title: "Team & Agile Leadership",
      description:
        "Collaborative engineer with experience leading sprint teams and cross-functional products.",
    },
  ];

  return (
    <section
      id="about"
      className="py-24 px-6 bg-gradient-to-b from-[#090a10] via-[#0d121f] to-[#090a10] relative overflow-hidden"
    >
      <div className="max-w-6xl mx-auto text-center relative z-10">
        {/* Tech Header Pill */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="mb-16"
        >
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-slate-900/90 border border-cyan-500/30 text-xs font-mono text-cyan-400 mb-4 shadow-sm shadow-cyan-500/10">
            <Terminal className="w-3.5 h-3.5 text-cyan-400" />
            <span>sys.bio // ABOUT_OPERATOR</span>
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
            Engineering With{" "}
            <span className="bg-gradient-to-r from-rose-500 via-red-500 to-cyan-400 bg-clip-text text-transparent">
              Purpose & AI
            </span>
          </Typography>

          <Box
            sx={{
              width: 80,
              height: 4,
              mx: "auto",
              mb: 3,
              borderRadius: 2,
              background: "linear-gradient(to right, #ff0055, #00f2fe)",
            }}
          />

          <Typography
            variant="body1"
            sx={{
              maxWidth: 720,
              mx: "auto",
              color: "#94a3b8",
              fontSize: "1.05rem",
              lineHeight: 1.8,
            }}
          >
            I'm a Full Stack Developer pursuing my Master's in Computer Application with a
            specialization in Artificial Intelligence and Machine Learning at Lovely Professional University.
            Passionate about merging resilient backend microservices with cutting-edge 3D interactive frontend experiences.
          </Typography>
        </motion.div>

        {/* Highlights */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {highlights.map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
            >
              <ThreeTiltCard tiltMaxAngleX={12} tiltMaxAngleY={12} scale={1.03} className="rounded-2xl h-full">
                <Card
                  elevation={0}
                  sx={{
                    p: 4,
                    height: "100%",
                    borderRadius: 4,
                    bgcolor: "rgba(17, 21, 36, 0.75)",
                    backdropFilter: "blur(14px)",
                    border: "1px solid rgba(255, 255, 255, 0.07)",
                    boxShadow: "0 10px 30px rgba(0,0,0,0.5)",
                    transition: "all 0.3s ease",
                    "&:hover": {
                      borderColor: "rgba(0, 242, 254, 0.4)",
                      boxShadow: "0 10px 35px rgba(0, 242, 254, 0.12)",
                    },
                  }}
                >
                  <Box
                    sx={{
                      display: "inline-block",
                      p: 2,
                      mb: 2.5,
                      borderRadius: 3,
                      bgcolor: "rgba(0, 242, 254, 0.08)",
                      border: "1px solid rgba(0, 242, 254, 0.2)",
                    }}
                  >
                    <item.icon
                      className="w-6 h-6 text-cyan-400"
                    />
                  </Box>
                  <Typography
                    variant="h6"
                    sx={{
                      fontWeight: 700,
                      color: "#f8fafc",
                      fontFamily: '"Poppins", sans-serif',
                      fontSize: "1.1rem",
                      mb: 1.5,
                    }}
                  >
                    {item.title}
                  </Typography>
                  <Typography
                    variant="body2"
                    sx={{
                      color: "#94a3b8",
                      lineHeight: 1.6,
                      fontSize: "0.9rem",
                    }}
                  >
                    {item.description}
                  </Typography>
                </Card>
              </ThreeTiltCard>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default About;
