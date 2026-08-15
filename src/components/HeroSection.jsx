// src/sections/HomeSection.js
import React, { useCallback } from "react";
import { Button, Typography, useTheme } from "@mui/material";
import { motion } from "framer-motion";
import { TypeAnimation } from "react-type-animation";
import { useNavigate } from "react-router-dom";
import Particles from "react-tsparticles";
import { loadSlim } from "tsparticles-slim";
import ProfileImg from "../assets/Profile.png";

const HomeSection = () => {
  const theme = useTheme();
  const navigate = useNavigate();

  const particlesInit = useCallback(async (engine) => {
    await loadSlim(engine);
  }, []);

  return (
    <section
      id="home"
      className="relative min-h-screen flex flex-col md:flex-row items-center justify-center bg-gradient-to-b from-white via-blue-50/40 to-indigo-50/30 overflow-hidden px-6 md:px-20 py-20 md:py-0"
    >
      {/* === Particles Background (visible dots animation) === */}
      <Particles
        id="tsparticles"
        init={particlesInit}
        className="absolute inset-0 w-full h-full -z-10"
        options={{
          fullScreen: { enable: false },
          background: { color: { value: "transparent" } },
          fpsLimit: 60,
          interactivity: {
            events: {
              onHover: { enable: true, mode: "repulse" },
              resize: true,
            },
            modes: {
              repulse: { distance: 100, duration: 0.4 },
            },
          },
          particles: {
            number: {
              value: 80,
              density: { enable: true, area: 800 },
            },
            color: { value: theme.palette.primary.main },
            shape: { type: "circle" },
            opacity: {
              value: 0.4,
              random: true,
              animation: { enable: true, speed: 0.8, minimumValue: 0.15 },
            },
            size: {
              value: { min: 1, max: 3.5 },
              random: true,
            },
            links: {
              enable: true,
              distance: 140,
              color: theme.palette.primary.main,
              opacity: 0.2,
              width: 1,
            },
            move: {
              enable: true,
              speed: 0.8,
              direction: "none",
              outModes: { default: "bounce" },
            },
          },
          detectRetina: true,
        }}
      />

      {/* === Left Content === */}
      <motion.div
        className="flex-1 z-10 text-center md:text-left space-y-5 flex flex-col items-center md:items-start"
        initial={{ opacity: 0, y: 35 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
      >
        <Typography
          variant="h1"
          sx={{
            fontWeight: 800,
            fontSize: { xs: "2.75rem", sm: "3.5rem", md: "4.25rem" },
            color: theme.palette.text.primary,
            lineHeight: 1.15,
            fontFamily: '"Poppins", sans-serif',
          }}
        >
          Hi There,
        </Typography>

        <Typography
          variant="h1"
          sx={{
            fontWeight: 800,
            fontSize: { xs: "2.75rem", sm: "3.5rem", md: "4.25rem" },
            color: theme.palette.text.primary,
            lineHeight: 1.15,
            fontFamily: '"Poppins", sans-serif',
          }}
        >
          I'm{" "}
          <span style={{ color: theme.palette.primary.main }}>
            Rohit Kumar
          </span>
        </Typography>

        <Typography
          variant="h5"
          sx={{
            color: theme.palette.text.secondary,
            fontWeight: 500,
            fontSize: { xs: "1.25rem", md: "1.6rem" },
            fontFamily: '"Poppins", sans-serif',
            mt: 1,
          }}
        >
          I Am Into{" "}
          <TypeAnimation
            sequence={[
              "Frontend Development",
              2000,
              "Backend Development",
              2000,
              "Full Stack Development",
              2000,
            ]}
            speed={50}
            repeat={Infinity}
            className="font-bold"
            style={{ color: theme.palette.primary.main }}
          />
        </Typography>

        <div className="flex flex-wrap items-center justify-center md:justify-start gap-4 mt-6">
          <Button
            variant="contained"
            color="primary"
            onClick={() => {
              const aboutSection = document.getElementById("about");
              if (aboutSection) {
                aboutSection.scrollIntoView({ behavior: "smooth" });
              }
            }}
            sx={{
              borderRadius: "9999px",
              px: 4,
              py: 1.5,
              fontWeight: "bold",
              fontSize: "1rem",
              textTransform: "none",
              boxShadow: "0 8px 20px rgba(204, 1, 2, 0.25)",
              transition: "all 0.3s ease",
              "&:hover": {
                transform: "translateY(-3px)",
                boxShadow: "0 12px 24px rgba(204, 1, 2, 0.4)",
              },
            }}
          >
            About Me ⬇
          </Button>

          <Button
            variant="outlined"
            onClick={() => navigate("/services")}
            sx={{
              borderRadius: "9999px",
              px: 4,
              py: 1.5,
              fontWeight: "bold",
              fontSize: "1rem",
              textTransform: "none",
              borderColor: theme.palette.primary.main,
              color: theme.palette.primary.main,
              transition: "all 0.3s ease",
              "&:hover": {
                transform: "translateY(-3px)",
                borderColor: theme.palette.primary.main,
                backgroundColor: `${theme.palette.primary.main}08`,
              },
            }}
          >
            My Services
          </Button>
        </div>
      </motion.div>

      {/* === Right Avatar === */}
      <motion.div
        className="flex-1 flex justify-center mt-14 md:mt-0 z-10"
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
      >
        <motion.div
          animate={{
            y: [0, -15, 0],
          }}
          transition={{
            duration: 5,
            repeat: Infinity,
            repeatType: "reverse",
            ease: "easeInOut",
          }}
          className="relative"
        >
          {/* Soft Red Glowing Aura */}
          <div
            className="absolute -inset-6 rounded-[80px_80px_80px_80px/120px_120px_120px_120px] blur-2xl opacity-60"
            style={{
              background: `radial-gradient(circle, ${theme.palette.primary.main} 0%, transparent 70%)`,
            }}
          ></div>

          {/* Styled Avatar Card Container */}
          <div
            className="w-[260px] h-[310px] sm:w-[290px] sm:h-[350px] md:w-[310px] md:h-[370px] relative border-4 border-white overflow-hidden"
            style={{
              borderRadius: "80px / 120px",
              background: "#ffa3a1", // Custom pastel pink/coral backing
              boxShadow: "0 15px 40px rgba(204, 1, 2, 0.3)",
              zIndex: 10,
            }}
          >
            <img
              src={ProfileImg}
              alt="Rohit Avatar"
              className="w-full h-full object-cover"
              style={{
                objectPosition: "center top",
              }}
            />
          </div>
        </motion.div>
      </motion.div>

    </section>
  );
};

export default HomeSection;
