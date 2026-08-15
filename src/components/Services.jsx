import React from "react";
import { Card, Typography, Box, Button } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import { Globe, Cpu, Brain, Palette, MessageSquare } from "lucide-react";
import { motion } from "framer-motion";

const Services = () => {
  const theme = useTheme();

  const services = [
    {
      icon: Globe,
      title: "Full Stack Web Apps",
      desc: "End-to-end web application development. From beautiful personal portfolios to complex e-commerce platforms, built with responsive user interfaces and robust server architectures.",
      tech: "React, Next.js, Node.js, Express, MongoDB, Redux",
    },
    {
      icon: Cpu,
      title: "Software Development",
      desc: "Custom software solutions engineered to address specific workflow demands. Developing secure database systems, API layers, and desktop tools with clean code.",
      tech: "JavaScript, Python, Java, C++, SQL databases",
    },
    {
      icon: Brain,
      title: "AI & ML Projects",
      desc: "Data-driven systems utilizing artificial intelligence and machine learning models. Implementing custom neural networks, predictive algorithms, and smart automation modules.",
      tech: "Python, TensorFlow, PyTorch, Pandas, Large Language Models",
    },
    {
      icon: Palette,
      title: "UI/UX Developments",
      desc: "Visual design systems focusing on modern usability. Constructing interactive wireframes, custom animations, visual identities, and responsive pixel-perfect frontends.",
      tech: "Figma, Material UI, Tailwind CSS, Framer Motion",
    },
  ];

  return (
    <section
      id="services"
      className="py-24 px-6 md:px-20 relative overflow-hidden"
      style={{
        background: `linear-gradient(to bottom, ${theme.palette.background.default}, ${theme.palette.secondary.main}08)`,
      }}
    >
      {/* Decorative background glows */}
      <div
        className="absolute top-0 right-0 w-80 h-80 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse"
        style={{ backgroundColor: theme.palette.primary.light }}
      ></div>
      <div
        className="absolute bottom-0 left-0 w-80 h-80 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse"
        style={{ backgroundColor: theme.palette.secondary.light }}
      ></div>

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
            My Services
          </Typography>
          <div
            className="w-20 h-1 mx-auto mb-6"
            style={{
              background: `linear-gradient(to right, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`,
              borderRadius: 2,
            }}
          ></div>
          <Typography
            variant="body1"
            sx={{
              color: theme.palette.text.secondary,
              fontFamily: '"Poppins", sans-serif',
              fontSize: "1.1rem",
              maxWidth: 600,
              mx: "auto",
            }}
          >
            Need a digital solution? I work as a freelancer to create high-performance web products, custom software, intelligence modules, and graphics.
          </Typography>
        </motion.div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
          {services.map((svc, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
              whileHover={{
                y: -6,
                borderColor: `${theme.palette.primary.light}25`,
                boxShadow: "0 20px 40px rgba(204, 1, 2, 0.08)",
              }}
              className="group flex h-full"
            >
              <Card
                elevation={0}
                sx={{
                  p: 5,
                  borderRadius: 4,
                  border: "1px solid rgba(0, 0, 0, 0.05)",
                  background: "rgba(255, 255, 255, 0.8)",
                  backdropFilter: "blur(10px)",
                  boxShadow: "0 10px 30px rgba(0,0,0,0.02)",
                  transition: "border-color 0.3s ease, box-shadow 0.3s ease",
                  display: "flex",
                  flexDirection: "column",
                  width: "100%",
                }}
              >
                <div className="flex items-start gap-5 text-left h-full flex-col sm:flex-row">
                  <Box
                    className="icon-wrapper"
                    sx={{
                      display: "inline-flex",
                      alignItems: "center",
                      justifyContent: "center",
                      width: 60,
                      height: 60,
                      borderRadius: 3.5,
                      bgcolor: `${theme.palette.primary.main}08`,
                      color: theme.palette.primary.main,
                      transition: "all 0.3s ease",
                      flexShrink: 0,
                      "& svg": {
                        width: 28,
                        height: 28,
                        transition: "transform 0.3s ease",
                      },
                    }}
                    style={{
                      background: `rgba(204, 1, 2, 0.05)`,
                    }}
                  >
                    <svc.icon className="group-hover:scale-110" />
                  </Box>
                  <div className="flex-grow space-y-2">
                    <Typography
                      variant="h6"
                      sx={{
                        fontWeight: 700,
                        fontFamily: '"Poppins", sans-serif',
                        color: theme.palette.text.primary,
                        fontSize: "1.25rem",
                      }}
                    >
                      {svc.title}
                    </Typography>
                    <Typography
                      variant="body2"
                      sx={{
                        fontFamily: '"Poppins", sans-serif',
                        color: theme.palette.text.secondary,
                        lineHeight: 1.65,
                        fontSize: "0.925rem",
                      }}
                    >
                      {svc.desc}
                    </Typography>
                    <div className="pt-3 border-t border-gray-100/80 mt-4">
                      <Typography
                        variant="caption"
                        sx={{
                          fontWeight: 600,
                          color: theme.palette.primary.main,
                          fontFamily: '"Poppins", sans-serif',
                          letterSpacing: 0.5,
                        }}
                      >
                        Core Technologies: {svc.tech}
                      </Typography>
                    </div>
                  </div>
                </div>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* CTA Banner */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <Card
            elevation={0}
            sx={{
              p: { xs: 4, md: 6 },
              borderRadius: 4.5,
              border: "1px solid rgba(0, 0, 0, 0.05)",
              background: `linear-gradient(135deg, rgba(255, 255, 255, 0.8), rgba(255, 111, 97, 0.05))`,
              backdropFilter: "blur(10px)",
              boxShadow: "0 15px 35px rgba(0, 0, 0, 0.03)",
              textAlign: "center",
            }}
          >
            <Typography
              variant="h5"
              sx={{
                fontWeight: 800,
                fontFamily: '"Poppins", sans-serif',
                mb: 1.5,
                color: theme.palette.text.primary,
              }}
            >
              Have a Project in Mind?
            </Typography>
            <Typography
              variant="body1"
              sx={{
                color: theme.palette.text.secondary,
                fontFamily: '"Poppins", sans-serif',
                maxWidth: 600,
                mx: "auto",
                mb: 4,
              }}
            >
              Let's collaborate to build something amazing. Available for custom contracts, full stack architectures, and software consultations.
            </Typography>
            <Button
              variant="contained"
              onClick={() => {
                const contactSec = document.getElementById("contact");
                if (contactSec) contactSec.scrollIntoView({ behavior: "smooth" });
              }}
              sx={{
                borderRadius: "9999px",
                px: 5,
                py: 1.5,
                fontWeight: "bold",
                textTransform: "none",
                fontSize: "1rem",
                fontFamily: '"Poppins", sans-serif',
                background: `linear-gradient(to right, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`,
                boxShadow: "0 8px 20px rgba(204, 1, 2, 0.2)",
                "&:hover": {
                  boxShadow: "0 12px 24px rgba(204, 1, 2, 0.35)",
                },
              }}
              endIcon={<MessageSquare size={18} />}
            >
              Let's Work Together
            </Button>
          </Card>
        </motion.div>

      </div>
    </section>
  );
};

export default Services;
