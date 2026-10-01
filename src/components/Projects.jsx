import React from "react";
import { Card, CardContent, Button, Chip, Typography, Box } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import { ExternalLink, Code, Briefcase, Terminal, GitBranch } from "lucide-react";
import { motion } from "framer-motion";
import ThreeTiltCard from "./three/ThreeTiltCard";

const Projects = () => {
  const theme = useTheme();

  const projects = [
    {
      title: "Collex – Your Campus Marketplace",
      description:
        "Built a campus marketplace platform enabling verified students to sell, rent, and buy products. Implemented secure JWT authentication and full stack REST APIs with MongoDB.",
      tech: ["React.js", "Express.js", "MongoDB", "JWT"],
      date: "September 2025",
      status: "Live",
      link: "https://collex-dev.vercel.app/",
    },
    {
      title: "RestroSol – Hotel Management System",
      description:
        "Engineered an enterprise hotel management CRM with modern Next.js UI, role-based authentication, analytics dashboards, and seamless API integrations.",
      tech: ["Next.js", "Material UI", "MongoDB", "Node.js", "REST APIs"],
      date: "December 2024",
      status: "Live",
      link: "https://restrosol.bizpluscrm.in/",
    },
    {
      title: "Smart Grocery Inventory Automation",
      description:
        "Developed an intelligent software solution for small businesses to track inventory depletion, automate reorders, and minimize product loss through database optimization.",
      tech: ["Python", "Oracle SQL", "Visual Basic"],
      date: "February 2025",
      status: "Completed",
    },
  ];

  const internship = {
    company: "Mirobytes Technologies",
    position: "Full Stack Developer Intern",
    duration: "December 2023 – June 2024",
    description:
      "Engineered scalable microservices and responsive web applications using ReactJS, Redux, and modern frameworks. Collaborated in cross-functional agile sprints to deliver production-ready features.",
    tech: ["React.js", "Redux", "Material UI", "Figma", "Express.js", "MongoDB"],
  };

  return (
    <section
      id="projects"
      className="py-24 px-6 md:px-20 bg-gradient-to-b from-[#090a10] via-[#0c101c] to-[#090a10] relative overflow-hidden"
    >
      <div className="max-w-6xl mx-auto relative z-10">
        
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-20"
        >
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-slate-900/90 border border-cyan-500/30 text-xs font-mono text-cyan-400 mb-4 shadow-sm shadow-cyan-500/10">
            <GitBranch className="w-3.5 h-3.5 text-cyan-400" />
            <span>git.log // PRODUCTION_BUILDS</span>
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
            Experience &{" "}
            <span className="bg-gradient-to-r from-rose-500 via-red-500 to-cyan-400 bg-clip-text text-transparent">
              Featured Projects
            </span>
          </Typography>

          <div
            className="w-20 h-1 mx-auto mb-6"
            style={{
              background: "linear-gradient(to right, #ff0055, #00f2fe)",
              borderRadius: 2,
            }}
          />

          <Typography
            variant="body1"
            sx={{
              color: "#94a3b8",
              fontFamily: '"Poppins", sans-serif',
              maxWidth: "650px",
              mx: "auto",
              fontSize: "1.05rem",
              lineHeight: 1.8,
            }}
          >
            Production-grade systems, campus marketplaces, and enterprise web solutions
            built with resilience and performance in mind.
          </Typography>
        </motion.div>

        {/* Internship Section */}
        <div className="mb-20">
          <motion.div
            initial={{ opacity: 0, y: 25 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="flex items-center gap-3 mb-6"
          >
            <div className="p-2 rounded-lg bg-rose-500/10 border border-rose-500/20 text-rose-400">
              <Briefcase className="w-5 h-5" />
            </div>
            <Typography
              variant="h5"
              sx={{
                fontWeight: 700,
                fontFamily: '"Poppins", sans-serif',
                color: "#ffffff",
              }}
            >
              Professional Experience
            </Typography>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            viewport={{ once: true }}
          >
            <ThreeTiltCard tiltMaxAngleX={8} tiltMaxAngleY={8} scale={1.01} className="rounded-3xl">
              <Card
                elevation={0}
                sx={{
                  p: { xs: 3, md: 5 },
                  borderRadius: 4,
                  border: "1px solid rgba(255, 255, 255, 0.08)",
                  background: "rgba(17, 21, 36, 0.75)",
                  backdropFilter: "blur(14px)",
                  boxShadow: "0 10px 30px rgba(0,0,0,0.5)",
                  transition: "border-color 0.3s ease, box-shadow 0.3s ease",
                  "&:hover": {
                    borderColor: "rgba(0, 242, 254, 0.4)",
                    boxShadow: "0 15px 35px rgba(0, 242, 254, 0.12)",
                  },
                }}
              >
                <CardContent sx={{ p: 0, "&:last-child": { pb: 0 } }}>
                  <div className="flex flex-col sm:flex-row justify-between items-start gap-4 mb-4 text-left">
                    <div>
                      <Typography
                        variant="h6"
                        sx={{
                          fontWeight: 700,
                          color: "#38bdf8",
                          fontFamily: '"Poppins", sans-serif',
                          fontSize: "1.25rem",
                        }}
                      >
                        {internship.position}
                      </Typography>
                      <Typography
                        variant="subtitle1"
                        sx={{
                          fontWeight: 600,
                          color: "#cbd5e1",
                          fontFamily: '"Poppins", sans-serif',
                          mt: 0.5,
                        }}
                      >
                        {internship.company}
                      </Typography>
                    </div>
                    <Chip
                      label={internship.duration}
                      variant="outlined"
                      sx={{
                        bgcolor: "rgba(0, 242, 254, 0.08)",
                        color: "#00f2fe",
                        borderColor: "rgba(0, 242, 254, 0.3)",
                        fontWeight: 600,
                        fontFamily: '"Fira Code", monospace',
                        fontSize: "0.8rem",
                        borderRadius: "9999px",
                      }}
                    />
                  </div>

                  <Typography
                    variant="body1"
                    sx={{
                      color: "#94a3b8",
                      fontFamily: '"Poppins", sans-serif',
                      lineHeight: 1.8,
                      mb: 4,
                      textAlign: "left",
                    }}
                  >
                    {internship.description}
                  </Typography>

                  <div className="flex flex-wrap gap-2 justify-start">
                    {internship.tech.map((tech, index) => (
                      <Chip
                        key={index}
                        label={tech}
                        variant="outlined"
                        size="small"
                        sx={{
                          borderColor: "rgba(255, 255, 255, 0.1)",
                          bgcolor: "rgba(15, 23, 42, 0.8)",
                          color: "#cbd5e1",
                          fontFamily: '"Fira Code", monospace',
                          fontWeight: 500,
                          fontSize: "0.75rem",
                          borderRadius: "8px",
                        }}
                      />
                    ))}
                  </div>
                </CardContent>
              </Card>
            </ThreeTiltCard>
          </motion.div>
        </div>

        {/* Projects Section */}
        <div>
          <motion.div
            initial={{ opacity: 0, y: 25 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="flex items-center gap-3 mb-6"
          >
            <div className="p-2 rounded-lg bg-cyan-500/10 border border-cyan-500/20 text-cyan-400">
              <Code className="w-5 h-5" />
            </div>
            <Typography
              variant="h5"
              sx={{
                fontWeight: 700,
                fontFamily: '"Poppins", sans-serif',
                color: "#ffffff",
              }}
            >
              Featured Production Builds
            </Typography>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {projects.map((project, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="group h-full flex"
              >
                <ThreeTiltCard tiltMaxAngleX={12} tiltMaxAngleY={12} scale={1.02} className="rounded-3xl w-full h-full flex flex-col">
                  <Card
                    elevation={0}
                    sx={{
                      p: 4,
                      borderRadius: 4,
                      border: "1px solid rgba(255, 255, 255, 0.08)",
                      background: "rgba(17, 21, 36, 0.75)",
                      backdropFilter: "blur(14px)",
                      boxShadow: "0 10px 30px rgba(0,0,0,0.5)",
                      transition: "border-color 0.3s ease, box-shadow 0.3s ease",
                      display: "flex",
                      flexDirection: "column",
                      justifyContent: "space-between",
                      width: "100%",
                      height: "100%",
                      "&:hover": {
                        borderColor: "rgba(0, 242, 254, 0.4)",
                        boxShadow: "0 15px 35px rgba(0, 242, 254, 0.15)",
                      },
                    }}
                  >
                    <CardContent sx={{ p: 0, display: "flex", flexDirection: "column", height: "100%", textAlign: "left" }}>
                      <div className="flex justify-between items-center mb-5">
                        <Box
                          className="icon-wrapper"
                          sx={{
                            display: "inline-flex",
                            alignItems: "center",
                            justifyContent: "center",
                            width: 44,
                            height: 44,
                            borderRadius: 3,
                            bgcolor: "rgba(0, 242, 254, 0.08)",
                            border: "1px solid rgba(0, 242, 254, 0.2)",
                            color: "#00f2fe",
                          }}
                        >
                          <Terminal className="w-5 h-5 group-hover:scale-110 transition-transform" />
                        </Box>
                        {project.status && (
                          <Chip
                            label={project.status}
                            variant="outlined"
                            size="small"
                            sx={{
                              bgcolor:
                                project.status === "Live"
                                  ? "rgba(16, 185, 129, 0.12)"
                                  : "rgba(148, 163, 184, 0.12)",
                              color: project.status === "Live" ? "#34d399" : "#94a3b8",
                              borderColor:
                                project.status === "Live"
                                  ? "rgba(16, 185, 129, 0.3)"
                                  : "rgba(148, 163, 184, 0.3)",
                              fontWeight: 700,
                              fontFamily: '"Fira Code", monospace',
                              fontSize: "0.725rem",
                              borderRadius: "9999px",
                            }}
                          />
                        )}
                      </div>

                      <Typography
                        variant="h6"
                        sx={{
                          fontWeight: 700,
                          fontFamily: '"Poppins", sans-serif',
                          fontSize: "1.15rem",
                          mb: 1.5,
                          color: "#f8fafc",
                          lineHeight: 1.35,
                        }}
                      >
                        {project.title}
                      </Typography>

                      <Typography
                        variant="body2"
                        sx={{
                          fontFamily: '"Poppins", sans-serif',
                          fontSize: "0.875rem",
                          color: "#94a3b8",
                          lineHeight: 1.7,
                          mb: 3,
                          flexGrow: 1,
                        }}
                      >
                        {project.description}
                      </Typography>

                      <div className="flex flex-wrap gap-1.5 mb-4">
                        {project.tech.map((tech, techIndex) => (
                          <Chip
                            key={techIndex}
                            label={tech}
                            size="small"
                            sx={{
                              bgcolor: "rgba(0, 242, 254, 0.08)",
                              color: "#38bdf8",
                              border: "1px solid rgba(0, 242, 254, 0.2)",
                              fontFamily: '"Fira Code", monospace',
                              fontWeight: 500,
                              fontSize: "0.725rem",
                              borderRadius: "6px",
                            }}
                          />
                        ))}
                      </div>

                      <div
                        className="text-xs font-mono mb-4 text-slate-500"
                      >
                        {project.date}
                      </div>

                      {project.link && (
                        <Button
                          variant="outlined"
                          size="small"
                          fullWidth
                          sx={{
                            borderColor: "rgba(0, 242, 254, 0.4)",
                            color: "#00f2fe",
                            backgroundColor: "rgba(0, 242, 254, 0.04)",
                            borderRadius: "10px",
                            textTransform: "none",
                            fontWeight: 700,
                            py: 1,
                            fontFamily: '"Fira Code", monospace',
                            "&:hover": {
                              bgcolor: "rgba(0, 242, 254, 0.15)",
                              borderColor: "#00f2fe",
                              boxShadow: "0 4px 20px rgba(0, 242, 254, 0.25)",
                            },
                          }}
                          endIcon={<ExternalLink className="w-4 h-4" />}
                          onClick={() => window.open(project.link, "_blank", "noopener,noreferrer")}
                        >
                          Launch Demo
                        </Button>
                      )}
                    </CardContent>
                  </Card>
                </ThreeTiltCard>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Projects;
