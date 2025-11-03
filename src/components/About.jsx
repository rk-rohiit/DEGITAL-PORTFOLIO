import React from "react";
import { useTheme } from "@mui/material/styles";
import { Card, Typography, Box } from "@mui/material";
import { Code, Users, Lightbulb, Zap } from "lucide-react";
import { motion } from "framer-motion";

const About = () => {
  const theme = useTheme();

  const highlights = [
    {
      icon: Code,
      title: "Problem Solving",
      description:
        "Expert in analyzing complex problems and delivering efficient, scalable solutions.",
    },
    {
      icon: Users,
      title: "Team Player",
      description:
        "Collaborative and communicative developer, thriving in team environments.",
    },
    {
      icon: Lightbulb,
      title: "Adaptability",
      description:
        "Quick learner who adapts easily to new technologies and dynamic challenges.",
    },
    {
      icon: Zap,
      title: "Project Management",
      description:
        "Experienced in planning, executing, and delivering projects end-to-end.",
    },
  ];

  return (
    <section
      id="about"
      className="py-20 px-6 bg-gradient-to-b from-gray-50 via-white to-gray-100"
    >
      <div className="max-w-6xl mx-auto text-center">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="mb-16"
        >
          <Typography
            variant="h3"
            sx={{
              fontWeight: "bold",
              color: theme.palette.text.primary,
              mb: 2,
            }}
          >
            About Me
          </Typography>
          <Box
            sx={{
              width: 80,
              height: 4,
              mx: "auto",
              mb: 3,
              borderRadius: 2,
              background: `linear-gradient(to right, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`,
            }}
          />
          <Typography
            variant="body1"
            sx={{
              maxWidth: 700,
              mx: "auto",
              color: theme.palette.text.secondary,
              fontSize: "1.1rem",
              lineHeight: 1.7,
            }}
          >
            I'm a passionate Full Stack Developer currently pursuing my Master's
            in Computer Application with a specialization in Artificial
            Intelligence and Machine Learning at Lovely Professional University.
            With hands-on experience in building responsive web apps and a
            strong foundation in modern technologies, I transform ideas into
            impactful digital solutions.
          </Typography>
        </motion.div>

        {/* Highlights */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {highlights.map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
            >
              <Card
                elevation={3}
                sx={{
                  p: 4,
                  borderRadius: 4,
                  bgcolor: theme.palette.background.paper,
                  backdropFilter: "blur(6px)",
                  border: `1px solid ${theme.palette.divider}`,
                  transition: "all 0.3s ease",
                  "&:hover": {
                    transform: "translateY(-6px)",
                    boxShadow: `0 8px 24px ${theme.palette.primary.main}20`,
                  },
                }}
              >
                <Box
                  sx={{
                    display: "inline-block",
                    p: 2,
                    mb: 2,
                    borderRadius: 3,
                    bgcolor: `${theme.palette.primary.main}10`,
                  }}
                >
                  <item.icon
                    className="w-6 h-6"
                    style={{ color: theme.palette.primary.main }}
                  />
                </Box>
                <Typography
                  variant="h6"
                  sx={{
                    fontWeight: 600,
                    color: theme.palette.text.primary,
                    mb: 1,
                  }}
                >
                  {item.title}
                </Typography>
                <Typography
                  variant="body2"
                  sx={{
                    color: theme.palette.text.secondary,
                  }}
                >
                  {item.description}
                </Typography>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default About;
