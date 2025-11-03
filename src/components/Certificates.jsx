import React, { useState } from "react";
import { Award, X, ChevronRight } from "lucide-react";
import { useTheme, Typography, Button } from "@mui/material";
import CloudImg from "../assets/certificates/cloud_certificate.jpg";
import DataVis from "../assets/certificates/data_visualization.jpg";
import OrcaleGen from "../assets/certificates/eCertificate_page-0001.jpg";
import CapbleImg from "../assets/certificates/capble.jpg";
import JSImg1 from '../assets/certificates/js1.jpg'

const certificates = [
  {
    title: "Cloud Computing Basics",
    desc: "Completed from Lovely Professional University (2023) - covered MERN stack, REST APIs, and deployment.",
    image: CloudImg,
    issuer: "Lovely Professional University",
    year: "2025",
  },
  {
    title: "Data Visualization with Python",
    desc: "Certified Data Visualization Specialist from Lovely Professional University (2024).",
    image: DataVis,
    issuer: "Lovely Professional University",
    year: "2025",
  },
  {
    title: "Oracle Generative AI",
    desc: "Advanced JavaScript training from FreeCodeCamp (2023).",
    image: OrcaleGen,
    issuer: "Oracle",
    year: "2025",
  },
  {
    title: "Capble Technology Participant",
    desc: "Firebase backend and authentication fundamentals (2024).",
    image: CapbleImg,
    issuer: "Capble Technology",
    year: "2025",
  },
  {
    title: "Cisco JavaScript Essentials 1",
    desc: "Fundamental concepts of JavaScript including variables, data types, functions, and control structures.",
    image: JSImg1,
    issuer: "CISCO",
    year: "2025",
  },
  
];

export default function Certificates() {
  const [showAll, setShowAll] = useState(false);
  const [selectedCert, setSelectedCert] = useState(null);
  const theme = useTheme();

  const handleView = (cert) => setSelectedCert(cert);
  const handleClose = () => setSelectedCert(null);
  const displayedCertificates = showAll ? certificates : certificates.slice(0, 3);

  return (
    <section
      className="relative py-20 px-4 sm:px-6 lg:px-8 overflow-hidden"
      style={{
        background: `linear-gradient(to bottom right, ${theme.palette.background.default}, ${theme.palette.secondary.main}10)`,
      }}
    >
      {/* Background Decorations */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div
          className="absolute -top-40 -right-40 w-80 h-80 rounded-full blur-3xl"
          style={{ backgroundColor: theme.palette.primary.main + "15" }}
        ></div>
        <div
          className="absolute -bottom-40 -left-40 w-80 h-80 rounded-full blur-3xl"
          style={{ backgroundColor: theme.palette.secondary.main + "15" }}
        ></div>
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Header */}
        <div className="text-center mb-16">
          <div
            className="inline-flex items-center justify-center w-16 h-16 rounded-2xl mb-6 shadow-lg"
            style={{
              background: `linear-gradient(to bottom right, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`,
            }}
          >
            <Award className="w-8 h-8 text-white" />
          </div>

          <Typography variant="h3" className="font-bold mb-4" color="text.primary">
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

          <Typography variant="body1" color="text.secondary">
            A showcase of my technical certifications, reflecting my learning and professional growth.
          </Typography>
        </div>

        {/* Certificate Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          {displayedCertificates.map((cert, index) => (
            <div
              key={index}
              className="group rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden border transform hover:-translate-y-1"
              style={{
                borderColor: theme.palette.divider,
                backgroundColor: theme.palette.background.paper,
              }}
            >
              <div className="relative h-48 overflow-hidden">
                <img
                  src={cert.image}
                  alt={cert.title}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div
                  className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                  style={{
                    background: `linear-gradient(to top, ${theme.palette.primary.main}60, transparent)`,
                  }}
                ></div>
              </div>

              <div className="p-6">
                <div className="flex items-center justify-between mb-3">
                  <span
                    className="inline-block px-3 py-1 text-xs font-semibold rounded-full"
                    style={{
                      backgroundColor: theme.palette.primary.main + "15",
                      color: theme.palette.primary.main,
                    }}
                  >
                    {cert.issuer}
                  </span>
                  <span className="text-sm" style={{ color: theme.palette.text.secondary }}>
                    {cert.year}
                  </span>
                </div>

                <Typography variant="h6" color="text.primary" className="mb-3 line-clamp-2">
                  {cert.title}
                </Typography>

                <Typography
                  variant="body2"
                  color="text.secondary"
                  className="mb-4 line-clamp-3"
                >
                  {cert.desc}
                </Typography>

                <Button
                  fullWidth
                  variant="contained"
                  endIcon={<ChevronRight />}
                  onClick={() => handleView(cert)}
                  sx={{
                    background: `linear-gradient(to right, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`,
                    "&:hover": {
                      background: `linear-gradient(to right, ${theme.palette.primary.dark}, ${theme.palette.secondary.dark})`,
                    },
                    borderRadius: 3,
                    py: 1.2,
                  }}
                >
                  View Certificate
                </Button>
              </div>
            </div>
          ))}
        </div>

        {/* View All Button */}
        {!showAll && certificates.length > 3 && (
          <div className="flex justify-center">
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
              }}
            >
              View All Certificates
            </Button>
          </div>
        )}
      </div>

      {/* Modal */}
      {selectedCert && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm p-4 animate-fadeIn"
          onClick={handleClose}
        >
          <div
            className="relative rounded-2xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-auto animate-scaleIn"
            style={{ backgroundColor: theme.palette.background.paper }}
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={handleClose}
              className="absolute top-4 right-4 w-10 h-10 flex items-center justify-center rounded-full shadow-md bg-white/90 hover:bg-white transition-all"
            >
              <X className="w-5 h-5 text-gray-700 hover:rotate-90 transition-transform duration-300" />
            </button>

            <div className="p-8">
              <Typography variant="h5" color="text.primary" gutterBottom>
                {selectedCert.title}
              </Typography>
              <Typography color="text.secondary" className="mb-4">
                {selectedCert.desc}
              </Typography>

              <div className="rounded-xl overflow-hidden shadow-lg bg-gray-100 mb-6">
                <img
                  src={selectedCert.image}
                  alt={selectedCert.title}
                  className="w-full h-auto object-contain max-h-[60vh]"
                />
              </div>

              <div
                className="p-4 rounded-xl border"
                style={{
                  background: `linear-gradient(to right, ${theme.palette.primary.main}10, ${theme.palette.secondary.main}10)`,
                  borderColor: theme.palette.primary.main + "30",
                }}
              >
                <div className="flex items-center gap-2 text-sm">
                  <Award
                    className="w-5 h-5"
                    style={{ color: theme.palette.primary.main }}
                  />
                  <span className="font-semibold text-gray-700">
                    Certified Professional
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      <style jsx>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }

        @keyframes scaleIn {
          from {
            opacity: 0;
            transform: scale(0.95);
          }
          to {
            opacity: 1;
            transform: scale(1);
          }
        }

        .animate-fadeIn {
          animation: fadeIn 0.2s ease-out;
        }

        .animate-scaleIn {
          animation: scaleIn 0.3s ease-out;
        }

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
    </section>
  );
}
