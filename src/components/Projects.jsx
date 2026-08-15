import React from "react";
import { Card, CardContent, Button, Chip, Typography, Box } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import { ExternalLink, Code, Briefcase } from "lucide-react";
import { motion } from "framer-motion";

const Projects = () => {
  const theme = useTheme();

  const projects = [
    {
      title: "Collex – Your Campus Marketplace",
      description:
        "Built a campus marketplace platform enabling verified students to sell, rent, and buy products. Implemented secure authentication and listing features with seamless integration.",
      tech: ["React.js", "Express.js", "MongoDB", "JWT"],
      date: "September 2025",
      status: "Live",
      link: "https://collex-dev.vercel.app/",
    },
    {
      title: "RestroSol – Hotel Management",
      description:
        "Designed a comprehensive hotel management system with modern UI and secure authentication. Built REST APIs for smooth frontend-backend communication.",
      tech: ["NEXT Js", "CSS", "JavaScript", "Material UI", "MongoDB", "Node.js"],
      date: "December 2024",
      status: "Live",
      link: "https://restrosol.bizpluscrm.in/",
    },
    {
      title: "Grocery Management System",
      description:
        "Developed a software solution for small shopkeepers to efficiently manage inventory and reduce product loss through smart tracking modules.",
      tech: ["Visual Basic", "Oracle SQL"],
      date: "February 2025",
      status: "Completed",
    },
  ];

  const internship = {
    company: "Mirobytes Technologies",
    position: "Full Stack Developer Intern",
    duration: "December 2023 – June 2024",
    description:
      "Developed and maintained responsive web applications using ReactJS and modern frameworks. Collaborated with cross-functional teams to deliver high-quality solutions with scalable features.",
    tech: ["React.js", "Redux", "Material UI", "Figma", "Express.js", "MongoDB"],
  };

  return (
    <section
      id="projects"
      className="py-24 px-6 md:px-20 bg-gradient-to-b from-gray-50/50 to-white relative overflow-hidden"
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
            Experience & Projects
          </Typography>
          <div
            className="w-20 h-1 mx-auto mb-6"
            style={{
              background: `linear-gradient(to right, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`,
              borderRadius: 2,
            }}
          ></div>
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
            <Briefcase className="w-6 h-6 text-red-600" />
            <Typography
              variant="h5"
              sx={{
                fontWeight: 700,
                fontFamily: '"Poppins", sans-serif',
                color: theme.palette.text.primary,
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
            whileHover={{
              y: -5,
              borderColor: `${theme.palette.primary.light}25`,
              boxShadow: "0 15px 35px rgba(204, 1, 2, 0.05)",
            }}
          >
            <Card
              elevation={0}
              sx={{
                p: { xs: 3, md: 4 },
                borderRadius: 4,
                border: "1px solid rgba(0, 0, 0, 0.05)",
                background: "rgba(255, 255, 255, 0.8)",
                backdropFilter: "blur(10px)",
                boxShadow: "0 10px 30px rgba(0,0,0,0.02)",
                transition: "border-color 0.3s ease, box-shadow 0.3s ease",
              }}
            >
              <CardContent sx={{ p: 0, "&:last-child": { pb: 0 } }}>
                <div className="flex flex-col sm:flex-row justify-between items-start gap-4 mb-4 text-left">
                  <div>
                    <Typography
                      variant="h6"
                      sx={{
                        fontWeight: 700,
                        color: theme.palette.primary.main,
                        fontFamily: '"Poppins", sans-serif',
                        fontSize: "1.2rem",
                      }}
                    >
                      {internship.position}
                    </Typography>
                    <Typography
                      variant="subtitle1"
                      sx={{
                        fontWeight: 600,
                        color: theme.palette.text.secondary,
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
                      bgcolor: `${theme.palette.primary.main}06`,
                      color: theme.palette.primary.main,
                      borderColor: `${theme.palette.primary.main}20`,
                      fontWeight: 600,
                      fontFamily: '"Poppins", sans-serif',
                      fontSize: "0.8rem",
                      borderRadius: "9999px",
                    }}
                  />
                </div>

                <Typography
                  variant="body1"
                  sx={{
                    color: theme.palette.text.secondary,
                    fontFamily: '"Poppins", sans-serif',
                    lineHeight: 1.7,
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
                        borderColor: theme.palette.divider,
                        color: theme.palette.text.secondary,
                        fontFamily: '"Poppins", sans-serif',
                        fontWeight: 500,
                        fontSize: "0.75rem",
                        borderRadius: "9999px",
                      }}
                    />
                  ))}
                </div>
              </CardContent>
            </Card>
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
            <Code className="w-6 h-6 text-red-600" />
            <Typography
              variant="h5"
              sx={{
                fontWeight: 700,
                fontFamily: '"Poppins", sans-serif',
                color: theme.palette.text.primary,
              }}
            >
              Featured Projects
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
                whileHover={{
                  y: -8,
                  borderColor: `${theme.palette.primary.light}25`,
                  boxShadow: "0 20px 45px rgba(204, 1, 2, 0.08)",
                }}
                className="group h-full flex"
              >
                <Card
                  elevation={0}
                  sx={{
                    p: 4,
                    borderRadius: 4,
                    border: "1px solid rgba(0, 0, 0, 0.05)",
                    background: "rgba(255, 255, 255, 0.8)",
                    backdropFilter: "blur(10px)",
                    boxShadow: "0 10px 30px rgba(0,0,0,0.02)",
                    transition: "border-color 0.3s ease, box-shadow 0.3s ease",
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "space-between",
                    width: "100%",
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
                          bgcolor: `${theme.palette.primary.main}08`,
                          color: theme.palette.primary.main,
                          transition: "all 0.3s ease",
                        }}
                      >
                        <Code className="w-5 h-5 group-hover:scale-110 transition-transform" />
                      </Box>
                      {project.status && (
                        <Chip
                          label={project.status}
                          variant="outlined"
                          size="small"
                          sx={{
                            bgcolor:
                              project.status === "Live"
                                ? "rgba(76, 175, 80, 0.08)"
                                : "rgba(158, 158, 158, 0.08)",
                            color: project.status === "Live" ? "#2e7d32" : "#757575",
                            borderColor:
                              project.status === "Live"
                                ? "rgba(76, 175, 80, 0.2)"
                                : "rgba(158, 158, 158, 0.2)",
                            fontWeight: 700,
                            fontFamily: '"Poppins", sans-serif',
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
                        color: theme.palette.text.primary,
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
                        color: theme.palette.text.secondary,
                        lineHeight: 1.6,
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
                            bgcolor: `${theme.palette.primary.main}06`,
                            color: theme.palette.primary.main,
                            borderColor: `${theme.palette.primary.main}12`,
                            fontFamily: '"Poppins", sans-serif',
                            fontWeight: 500,
                            fontSize: "0.725rem",
                            borderRadius: "9999px",
                          }}
                        />
                      ))}
                    </div>

                    <div
                      className="text-xs font-medium mb-4"
                      style={{ color: theme.palette.text.secondary, fontFamily: '"Poppins", sans-serif' }}
                    >
                      {project.date}
                    </div>

                    {project.link && (
                      <Button
                        variant="outlined"
                        size="small"
                        fullWidth
                        sx={{
                          borderColor: theme.palette.primary.main,
                          color: theme.palette.primary.main,
                          borderRadius: "9999px",
                          textTransform: "none",
                          fontWeight: 600,
                          py: 0.9,
                          fontFamily: '"Poppins", sans-serif',
                          "&:hover": {
                            bgcolor: `${theme.palette.primary.main}08`,
                            borderColor: theme.palette.primary.main,
                          },
                        }}
                        endIcon={<ExternalLink className="w-4 h-4" />}
                        onClick={() => window.open(project.link, "_blank", "noopener,noreferrer")}
                      >
                        View Project
                      </Button>
                    )}
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Projects;
