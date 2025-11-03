import React from "react";
import { Card, Typography, useTheme } from "@mui/material";
import { GraduationCap } from "lucide-react";
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

  return (
    <section
      id="education"
      className="py-20 px-6 relative overflow-hidden"
      style={{
        background: `linear-gradient(to bottom, ${theme.palette.background.default}, ${theme.palette.secondary.main}10)`,
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
          className="text-center mb-16"
        >
          <Typography variant="h2" color="text.primary" gutterBottom>
            Education
          </Typography>
          <div
            className="w-20 h-1 mx-auto mb-6"
            style={{
              background: `linear-gradient(to right, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`,
            }}
          ></div>
          <Typography variant="body1" color="text.secondary">
            My academic journey and qualifications
          </Typography>
        </motion.div>

        {/* Timeline */}
        <div className="relative">
          <div
            className="absolute left-6 top-0 bottom-0 w-1 hidden md:block"
            style={{
              background: `linear-gradient(to bottom, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`,
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
                className="relative"
              >
                <div
                  className="absolute left-6 w-4 h-4 rounded-full hidden md:block"
                  style={{ backgroundColor: theme.palette.primary.main }}
                ></div>

                <Card
                  sx={{
                    ml: { md: 5 },
                    p: 3,
                    borderRadius: 3,
                    backgroundColor: theme.palette.background.paper,
                    backdropFilter: "blur(8px)",
                    border: `1px solid ${theme.palette.divider}`,
                    boxShadow: "0 4px 20px rgba(0,0,0,0.05)",
                    "&:hover": {
                      boxShadow: "0 8px 32px rgba(0,0,0,0.1)",
                      transform: "translateY(-4px)",
                    },
                  }}
                >
                  <div className="flex items-start gap-4">
                    <div
                      className="p-3 rounded-xl flex-shrink-0"
                      style={{
                        backgroundColor: theme.palette.primary.main + "15",
                      }}
                    >
                      <GraduationCap
                        className="w-6 h-6"
                        color={theme.palette.primary.main}
                      />
                    </div>
                    <div className="flex-grow">
                      <div className="flex flex-wrap justify-between items-start mb-2">
                        <div>
                          <Typography
                            variant="h6"
                            sx={{ color: theme.palette.primary.main }}
                          >
                            {item.degree}
                          </Typography>
                          {item.specialization && (
                            <Typography
                              variant="body2"
                              sx={{ fontStyle: "italic", color: "text.secondary" }}
                            >
                              {item.specialization}
                            </Typography>
                          )}
                        </div>
                        {item.status && (
                          <span
                            className="px-3 py-1 rounded-full text-xs font-medium"
                            style={{
                              backgroundColor: theme.palette.secondary.main + "22",
                              color: theme.palette.secondary.main,
                            }}
                          >
                            {item.status}
                          </span>
                        )}
                      </div>
                      <Typography variant="body1" fontWeight={600}>
                        {item.institution}
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        {item.location}
                      </Typography>
                      <div className="flex flex-wrap gap-4 text-sm">
                        <span>{item.period}</span>
                        {item.percentage && (
                          <span
                            className="font-medium"
                            style={{ color: theme.palette.primary.main }}
                          >
                            Percentage: {item.percentage}
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Education;
