import React, { useState } from "react";
import { Award, X, ChevronRight, Trophy } from "lucide-react";
import { useTheme, Typography, Button, Card, Chip, Box } from "@mui/material";
import { motion, AnimatePresence } from "framer-motion";

import CloudImg from "../assets/certificates/cloud_certificate.jpg";
import DataVis from "../assets/certificates/data_visualization.jpg";
import OrcaleGen from "../assets/certificates/eCertificate_page-0001.jpg";
import CapbleImg from "../assets/certificates/capble.jpg";
import JSImg1 from "../assets/certificates/js1.jpg";
import BajajImg from "../assets/certificates/Scan.jpg";

const certificates = [
  {
    title: "Cloud Computing Basics",
    desc: "Comprehensive understanding of cloud computing fundamentals, services, deployment models, and best practices in cloud architecture.",
    image: CloudImg,
    issuer: "Lovely Professional University",
    year: "2025",
  },
  {
    title: "Data Visualization with Python",
    desc: "Mastery in creating interactive and insightful data visualizations using Python libraries including Matplotlib, Seaborn, and Plotly.",
    image: DataVis,
    issuer: "Lovely Professional University",
    year: "2025",
  },
  {
    title: "Oracle Generative AI",
    desc: "Expert certification in Oracle's Generative AI technologies, covering large language models, neural networks, and AI applications.",
    image: OrcaleGen,
    issuer: "Oracle",
    year: "2025",
  },
  {
    title: "Capble Technology Training",
    desc: "Intensive training in modern web development technologies, agile methodologies, and software development best practices.",
    image: CapbleImg,
    issuer: "Capble Technology",
    year: "2025",
  },
  {
    title: "Cisco JavaScript Essentials 1",
    desc: "Advanced JavaScript programming certification covering core concepts, ES6+ features, async programming, and web APIs.",
    image: JSImg1,
    issuer: "CISCO",
    year: "2025",
  },
];

const achievements = [
  {
    title: "Bajaj Finserv Training",
    description: "Team Leader among 200 students",
    date: "June 2024",
    image: BajajImg,
  },
];

export default function Certificates() {
  const theme = useTheme();
  const [showAll, setShowAll] = useState(false);
  const [selectedCert, setSelectedCert] = useState(null);
  const [selectedAchievement, setSelectedAchievement] = useState(null);

  const displayedCertificates = showAll
    ? certificates
    : certificates.slice(0, 3);

  return (
    <section
      id="certificates"
      className="relative py-24 px-4 sm:px-6 lg:px-8 overflow-hidden"
      style={{
        background: `linear-gradient(to bottom right, ${theme.palette.background.default}, ${theme.palette.secondary.main}08)`,
      }}
    >
      {/* Background Decorations */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div
          className="absolute -top-40 -right-40 w-80 h-80 rounded-full blur-3xl"
          style={{ backgroundColor: theme.palette.primary.main + "08" }}
        ></div>
        <div
          className="absolute -bottom-40 -left-40 w-80 h-80 rounded-full blur-3xl"
          style={{ backgroundColor: theme.palette.secondary.main + "08" }}
        ></div>
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-20"
        >
          <div
            className="inline-flex items-center justify-center w-16 h-16 rounded-2xl mb-6 shadow-lg"
            style={{
              background: `linear-gradient(to bottom right, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`,
            }}
          >
            <Award className="w-8 h-8 text-white" />
          </div>

          <Typography
            variant="h3"
            sx={{
              fontWeight: 800,
              fontFamily: '"Poppins", sans-serif',
              mb: 2,
            }}
            color="text.primary"
          >
            Certificates &{" "}
            <span
              style={{
                background: `linear-gradient(to right, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`,
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
              }}
            >
              Achievements
            </span>
          </Typography>

          <div
            className="w-24 h-1 mx-auto mb-6 rounded-full"
            style={{
              background: `linear-gradient(to right, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`,
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
            A showcase of my technical certifications, reflecting my learning
            and professional growth.
          </Typography>
        </motion.div>

        {/* Certificate Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {displayedCertificates.map((cert, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
              whileHover={{
                y: -8,
                boxShadow: "0 20px 40px rgba(204, 1, 2, 0.08)",
                borderColor: `${theme.palette.primary.light}25`,
              }}
              className="group rounded-2xl overflow-hidden border transition-colors duration-300 flex flex-col justify-between"
              style={{
                borderColor: theme.palette.divider,
                backgroundColor: theme.palette.background.paper,
              }}
            >
              <div>
                <div className="relative h-48 overflow-hidden bg-gray-50">
                  <img
                    src={cert.image}
                    alt={cert.title}
                    className="w-full h-full object-cover group-hover:scale-108 transition-transform duration-500"
                  />
                  <div
                    className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                    style={{
                      background: `linear-gradient(to top, ${theme.palette.primary.main}40, transparent)`,
                    }}
                  ></div>
                </div>

                <div className="p-6 pb-2 text-left">
                  <div className="flex items-center justify-between mb-3">
                    <span
                      className="inline-block px-3 py-0.5 text-xs font-semibold rounded-full border"
                      style={{
                        backgroundColor: theme.palette.primary.main + "08",
                        color: theme.palette.primary.main,
                        borderColor: theme.palette.primary.main + "15",
                      }}
                    >
                      {cert.issuer}
                    </span>
                    <span
                      className="text-xs font-medium"
                      style={{ color: theme.palette.text.secondary }}
                    >
                      {cert.year}
                    </span>
                  </div>

                  <Typography
                    variant="h6"
                    color="text.primary"
                    sx={{
                      fontWeight: 700,
                      fontFamily: '"Poppins", sans-serif',
                      fontSize: "1.15rem",
                      mb: 1.5,
                      lineHeight: 1.35,
                    }}
                    className="line-clamp-2"
                  >
                    {cert.title}
                  </Typography>

                  <Typography
                    variant="body2"
                    color="text.secondary"
                    sx={{
                      fontFamily: '"Poppins", sans-serif',
                      lineHeight: 1.6,
                      fontSize: "0.9rem",
                      mb: 2,
                    }}
                    className="line-clamp-3"
                  >
                    {cert.desc}
                  </Typography>
                </div>
              </div>

              <div className="p-6 pt-0">
                <Button
                  fullWidth
                  variant="contained"
                  endIcon={<ChevronRight />}
                  onClick={() => setSelectedCert(cert)}
                  sx={{
                    background: `linear-gradient(to right, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`,
                    "&:hover": {
                      background: `linear-gradient(to right, ${theme.palette.primary.dark}, ${theme.palette.secondary.dark})`,
                    },
                    borderRadius: 3,
                    py: 1.2,
                    textTransform: "none",
                    fontWeight: 600,
                    boxShadow: "0 4px 12px rgba(204, 1, 2, 0.15)",
                  }}
                >
                  View Certificate
                </Button>
              </div>
            </motion.div>
          ))}
        </div>

        {/* View All Button */}
        {!showAll && certificates.length > 3 && (
          <div className="flex justify-center mb-20">
            <Button
              variant="contained"
              endIcon={<ChevronRight />}
              onClick={() => setShowAll(true)}
              sx={{
                px: 5,
                py: 1.5,
                borderRadius: 5,
                background: `linear-gradient(to right, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`,
                "&:hover": {
                  background: `linear-gradient(to right, ${theme.palette.primary.dark}, ${theme.palette.secondary.dark})`,
                },
                color: "#fff",
                fontWeight: 600,
                textTransform: "none",
                boxShadow: "0 6px 15px rgba(204, 1, 2, 0.2)",
              }}
            >
              View All Certificates
            </Button>
          </div>
        )}

        {/* Achievements Section Title */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <Typography
            variant="h4"
            sx={{
              fontWeight: 800,
              fontFamily: '"Poppins", sans-serif',
              mb: 2,
            }}
            color="text.primary"
          >
            Achievements
          </Typography>

          <div
            className="w-24 h-1 mx-auto mb-6 rounded-full"
            style={{
              background: `linear-gradient(to right, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`,
            }}
          ></div>
        </motion.div>

        {/* Achievements Grid - Centered */}
        <div className="flex justify-center">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl w-full mb-16 justify-center">
            {achievements.map((achievement, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6 }}
                viewport={{ once: true }}
                whileHover={{
                  y: -6,
                  boxShadow: "0 15px 35px rgba(204, 1, 2, 0.08)",
                  borderColor: `${theme.palette.primary.light}25`,
                }}
                className="p-6 rounded-2xl border transition-colors duration-300 w-full"
                style={{
                  backgroundColor: theme.palette.background.paper,
                  borderColor: theme.palette.divider,
                }}
              >
                <div className="flex items-start gap-4 text-left">
                  <div
                    className="p-3 rounded-xl flex-shrink-0"
                    style={{
                      backgroundColor: theme.palette.primary.main + "08",
                    }}
                  >
                    <Trophy
                      className="w-6 h-6"
                      style={{ color: theme.palette.primary.main }}
                    />
                  </div>

                  <div className="flex-grow">
                    <Typography
                      variant="h6"
                      color="text.primary"
                      sx={{
                        fontWeight: 700,
                        fontFamily: '"Poppins", sans-serif',
                        fontSize: "1.15rem",
                        mb: 0.5,
                      }}
                    >
                      {achievement.title}
                    </Typography>

                    <Typography
                      variant="body2"
                      color="text.secondary"
                      sx={{
                        fontFamily: '"Poppins", sans-serif',
                        mb: 2,
                      }}
                    >
                      {achievement.description}
                    </Typography>

                    <Chip
                      label={achievement.date}
                      variant="outlined"
                      size="small"
                      sx={{
                        color: theme.palette.text.secondary,
                        borderColor: theme.palette.divider,
                        fontWeight: 600,
                        fontFamily: '"Poppins", sans-serif',
                        mb: 3,
                      }}
                    />

                    <Button
                      fullWidth
                      variant="outlined"
                      endIcon={<ChevronRight />}
                      onClick={() => setSelectedAchievement(achievement)}
                      sx={{
                        borderRadius: 3,
                        py: 1.2,
                        color: theme.palette.primary.main,
                        borderColor: theme.palette.primary.main,
                        textTransform: "none",
                        fontWeight: 600,
                        "&:hover": {
                          backgroundColor: theme.palette.primary.main + "08",
                          borderColor: theme.palette.primary.main,
                        },
                      }}
                    >
                      View Achievement
                    </Button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* Achievement Modal using AnimatePresence */}
      <AnimatePresence>
        {selectedAchievement && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm p-4"
            onClick={() => setSelectedAchievement(null)}
          >
            <motion.div
              initial={{ scale: 0.93, y: 15, opacity: 0 }}
              animate={{ scale: 1, y: 0, opacity: 1 }}
              exit={{ scale: 0.93, y: 15, opacity: 0 }}
              transition={{ type: "spring", stiffness: 260, damping: 22 }}
              className="relative rounded-2xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-auto text-left"
              style={{ backgroundColor: theme.palette.background.paper }}
              onClick={(e) => e.stopPropagation()}
            >
              <button
                onClick={() => setSelectedAchievement(null)}
                className="absolute top-4 right-4 w-10 h-10 flex items-center justify-center rounded-full shadow-md bg-white/90 hover:bg-white transition-all z-20"
              >
                <X className="w-5 h-5 text-gray-700 hover:rotate-90 transition-transform duration-300" />
              </button>

              <div className="p-6 md:p-8">
                <Typography
                  variant="h5"
                  color="text.primary"
                  sx={{
                    fontWeight: 700,
                    fontFamily: '"Poppins", sans-serif',
                    mb: 1,
                  }}
                >
                  {selectedAchievement.title}
                </Typography>
                <Typography
                  color="text.secondary"
                  sx={{
                    fontFamily: '"Poppins", sans-serif',
                    mb: 4,
                  }}
                >
                  {selectedAchievement.description}
                </Typography>

                <div className="rounded-xl overflow-hidden shadow-lg bg-gray-50 border border-gray-100 mb-6 flex justify-center">
                  <img
                    src={selectedAchievement.image}
                    alt={selectedAchievement.title}
                    className="w-full h-auto object-contain max-h-[55vh]"
                  />
                </div>

                <div
                  className="p-4 rounded-xl border flex items-center gap-2 text-sm"
                  style={{
                    background: `linear-gradient(to right, ${theme.palette.primary.main}08, ${theme.palette.secondary.main}08)`,
                    borderColor: theme.palette.primary.main + "20",
                  }}
                >
                  <Trophy
                    className="w-5 h-5"
                    style={{ color: theme.palette.primary.main }}
                  />
                  <span
                    className="font-semibold text-gray-700"
                    style={{ fontFamily: '"Poppins", sans-serif' }}
                  >
                    Awarded Achievement
                  </span>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Certificate Modal using AnimatePresence */}
      <AnimatePresence>
        {selectedCert && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm p-4"
            onClick={() => setSelectedCert(null)}
          >
            <motion.div
              initial={{ scale: 0.93, y: 15, opacity: 0 }}
              animate={{ scale: 1, y: 0, opacity: 1 }}
              exit={{ scale: 0.93, y: 15, opacity: 0 }}
              transition={{ type: "spring", stiffness: 260, damping: 22 }}
              className="relative rounded-2xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-auto text-left"
              style={{ backgroundColor: theme.palette.background.paper }}
              onClick={(e) => e.stopPropagation()}
            >
              <button
                onClick={() => setSelectedCert(null)}
                className="absolute top-4 right-4 w-10 h-10 flex items-center justify-center rounded-full shadow-md bg-white/90 hover:bg-white transition-all z-20"
              >
                <X className="w-5 h-5 text-gray-700 hover:rotate-90 transition-transform duration-300" />
              </button>

              <div className="p-6 md:p-8">
                <Typography
                  variant="h5"
                  color="text.primary"
                  sx={{
                    fontWeight: 700,
                    fontFamily: '"Poppins", sans-serif',
                    mb: 1,
                  }}
                >
                  {selectedCert.title}
                </Typography>
                <Typography
                  color="text.secondary"
                  sx={{
                    fontFamily: '"Poppins", sans-serif',
                    mb: 4,
                  }}
                >
                  {selectedCert.desc}
                </Typography>

                <div className="rounded-xl overflow-hidden shadow-lg bg-gray-50 border border-gray-100 mb-6 flex justify-center">
                  <img
                    src={selectedCert.image}
                    alt={selectedCert.title}
                    className="w-full h-auto object-contain max-h-[55vh]"
                  />
                </div>

                <div
                  className="p-4 rounded-xl border flex items-center gap-2 text-sm"
                  style={{
                    background: `linear-gradient(to right, ${theme.palette.primary.main}08, ${theme.palette.secondary.main}08)`,
                    borderColor: theme.palette.primary.main + "20",
                  }}
                >
                  <Award
                    className="w-5 h-5"
                    style={{ color: theme.palette.primary.main }}
                  />
                  <span
                    className="font-semibold text-gray-700"
                    style={{ fontFamily: '"Poppins", sans-serif' }}
                  >
                    Certified Professional Verification
                  </span>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {styleTagSnippet}
    </section>
  );
}

// Scoped inline CSS styles
const styleTagSnippet = (
  <style>{`
    .line-clamp-2 {
      display: -webkit-box;
      -webkit-line-clamp: 2;
      -webkit-box-orient: vertical;
      overflow: hidden;
    }

    .line-clamp-3 {
      display: -webkit-box;
      -webkit-line-clamp: 3;
      -webkit-box-orient: vertical;
      overflow: hidden;
    }
  `}</style>
);

