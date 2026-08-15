import React from "react";
import { Card, Typography, useTheme } from "@mui/material";
import { GraduationCap, MapPin } from "lucide-react";
import { motion } from "framer-motion";

const Education = () => {
  const theme = useTheme();

  const timeline = [
    {
      degree: "Master's in Computer Application (Hons.)",
      specialization: "Artificial Intelligence and Machine Learning",
      institution: "Lovely Professional University",
      location: "Punjab, India",
      period: "August 2024 - Present",
      status: "Pursuing",
    },
    {
      degree: "Bachelor's Degree",
      institution: "Arcade Business College",
      location: "Patna, Bihar",
      period: "April 2022 - March 2025",
      percentage: "69%",
    },
    {
      degree: "Intermediate",
      institution: "S.S College",
      location: "Patna, Bihar",
      period: "April 2019 - March 2021",
      percentage: "63%",
    },
    {
      degree: "Matriculation",
      institution: "D.A.V Public School",
      location: "Jehanabad, Bihar",
      period: "April 2017 - March 2019",
      percentage: "59%",
    },
  ];

  // Motion variants for interactive hover syncing
  const dotVariants = {
    hover: {
      scale: 1.5,
      boxShadow: `0 0 12px ${theme.palette.primary.main}`,
    },
  };

  const cardVariants = {
    initial: {
      x: 0,
      borderColor: "rgba(0, 0, 0, 0.06)",
      boxShadow: "0 10px 30px rgba(0, 0, 0, 0.03)",
    },
    hover: {
      x: 8,
      borderColor: `${theme.palette.primary.light}30`,
      boxShadow: "0 15px 35px rgba(204, 1, 2, 0.08)",
    },
  };

  return (
    <section
      id="education"
      className="py-24 px-6 md:px-20 relative overflow-hidden"
      style={{
        background: `linear-gradient(to bottom, ${theme.palette.background.default}, ${theme.palette.secondary.main}08)`,
      }}
    >
      {/* Decorative blur circles */}
      <div
        className="absolute top-0 left-0 w-72 h-72 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse"
        style={{ backgroundColor: theme.palette.primary.main }}
      ></div>
      <div
        className="absolute bottom-0 right-0 w-96 h-96 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse"
        style={{ backgroundColor: theme.palette.secondary.main }}
      ></div>

      <div className="max-w-4xl mx-auto relative z-10">
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
              color: theme.palette.text.primary,
              fontFamily: '"Poppins", sans-serif',
              mb: 2,
            }}
          >
            Education
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
            }}
          >
            My academic journey and qualifications
          </Typography>
        </motion.div>

        {/* Timeline Container */}
        <div className="relative max-w-3xl mx-auto">
          {/* Vertical line connecting nodes */}
          <div
            className="absolute left-4 md:left-6 top-3 bottom-3 w-0.5 -translate-x-1/2"
            style={{
              background: `linear-gradient(to bottom, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`,
              opacity: 0.6,
            }}
          ></div>

          <div className="space-y-8">
            {timeline.map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                whileHover="hover"
                className="relative pl-10 md:pl-16"
              >
                {/* Interactive pulsing bullet point node */}
                <motion.div
                  initial={{ scale: 0, opacity: 0 }}
                  whileInView={{ scale: 1, opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{
                    type: "spring",
                    stiffness: 300,
                    damping: 15,
                    delay: index * 0.1 + 0.25,
                  }}
                  variants={dotVariants}
                  className="absolute left-4 md:left-6 w-2.5 h-2.5 rounded-full -translate-x-1/2 top-[46px] z-10 cursor-pointer"
                  style={{
                    backgroundColor: theme.palette.primary.main,
                  }}
                />

                {/* Animated timeline card */}
                <motion.div
                  variants={cardVariants}
                  transition={{ type: "spring", stiffness: 180, damping: 18 }}
                >
                  <Card
                    sx={{
                      p: { xs: 3, md: 4 },
                      borderRadius: 4,
                      backgroundColor: theme.palette.background.paper,
                      backdropFilter: "blur(10px)",
                      border: "1px solid rgba(0, 0, 0, 0.06)",
                      transition: "border-color 0.3s ease, box-shadow 0.3s ease",
                    }}
                  >
                    {/* Period and Status tags */}
                    <div className="flex flex-wrap items-center justify-between gap-3 mb-4">
                      <span
                        className="px-3 py-1 rounded-full text-xs font-semibold tracking-wider uppercase border"
                        style={{
                          backgroundColor: `${theme.palette.primary.main}08`,
                          color: theme.palette.primary.main,
                          borderColor: `${theme.palette.primary.main}20`,
                        }}
                      >
                        {item.period}
                      </span>
                      {item.status && (
                        <span
                          className="px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider border animate-pulse"
                          style={{
                            backgroundColor: `${theme.palette.secondary.main}12`,
                            color: theme.palette.secondary.main,
                            borderColor: `${theme.palette.secondary.main}25`,
                          }}
                        >
                          {item.status}
                        </span>
                      )}
                    </div>

                    {/* Degree and Institution */}
                    <div className="flex items-start gap-4">
                      <div
                        className="p-3 rounded-2xl flex-shrink-0"
                        style={{
                          backgroundColor: `${theme.palette.primary.main}08`,
                          color: theme.palette.primary.main,
                        }}
                      >
                        <GraduationCap className="w-6 h-6" />
                      </div>
                      <div className="flex-grow space-y-1 text-left">
                        <Typography
                          variant="h6"
                          sx={{
                            fontWeight: 700,
                            fontSize: { xs: "1.1rem", md: "1.25rem" },
                            color: theme.palette.text.primary,
                            fontFamily: '"Poppins", sans-serif',
                            lineHeight: 1.3,
                          }}
                        >
                          {item.degree}
                        </Typography>

                        {item.specialization && (
                          <Typography
                            variant="body2"
                            sx={{
                              fontStyle: "italic",
                              color: theme.palette.text.secondary,
                              fontFamily: '"Poppins", sans-serif',
                              fontSize: "0.9rem",
                            }}
                          >
                            {item.specialization}
                          </Typography>
                        )}

                        <Typography
                          variant="body1"
                          sx={{
                            fontWeight: 600,
                            color: theme.palette.text.primary,
                            fontFamily: '"Poppins", sans-serif',
                            fontSize: "0.975rem",
                            pt: 0.5,
                          }}
                        >
                          {item.institution}
                        </Typography>

                        <div className="flex flex-wrap items-center gap-x-4 gap-y-2 text-sm text-gray-500 pt-2 border-t border-gray-50 mt-3">
                          <span className="flex items-center gap-1 text-xs font-medium">
                            <MapPin size={14} className="text-gray-400" />
                            {item.location}
                          </span>
                          {item.percentage && (
                            <span className="text-xs font-semibold px-2.5 py-0.5 rounded-full bg-emerald-50 text-emerald-600 border border-emerald-200/40">
                              Percentage: {item.percentage}
                            </span>
                          )}
                        </div>
                      </div>
                    </div>
                  </Card>
                </motion.div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Education;
