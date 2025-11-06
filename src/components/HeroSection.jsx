// src/sections/HomeSection.js
import React, { useCallback } from "react";
import { Button, Typography, Avatar, useTheme } from "@mui/material";
import { motion } from "framer-motion";
import { TypeAnimation } from "react-type-animation";
import Particles from "react-tsparticles";
import { loadSlim } from "tsparticles-slim";
// import ProfileImg from "../assets/profile.png";
import ProfileImg from "../assets/p2.jpeg";

const HomeSection = () => {
  const theme = useTheme();

  const particlesInit = useCallback(async (engine) => {
    await loadSlim(engine);
  }, []);

  return (
    <section
      id="home"
      className="relative min-h-screen flex flex-col md:flex-row items-center justify-center bg-gradient-to-b from-white via-blue-50/40 to-indigo-50/30 overflow-hidden px-6 md:px-20"
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
              value: 0.5,
              random: true,
              animation: { enable: true, speed: 1, minimumValue: 0.2 },
            },
            size: {
              value: { min: 1, max: 3 },
              random: true,
            },
            links: {
              enable: true,
              distance: 150,
              color: theme.palette.primary.main,
              opacity: 0.25,
              width: 1,
            },
            move: {
              enable: true,
              speed: 0.6,
              direction: "none",
              outModes: { default: "bounce" },
            },
          },
          detectRetina: true,
        }}
      />

      {/* === Left Content === */}
      <motion.div
        className="flex-1 z-10 text-center md:text-left space-y-4"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        <Typography
          variant="h3"
          sx={{ fontWeight: 600, color: theme.palette.text.primary }}
        >
          Hi There,
        </Typography>

        <Typography
          variant="h3"
          sx={{ fontWeight: 600, color: theme.palette.text.primary }}
        >
          I'm{" "}
          <span style={{ color: theme.palette.primary.main }}>
            Rohit Kumar
          </span>
        </Typography>

        <Typography
          variant="h6"
          sx={{ color: theme.palette.text.secondary }}
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
            className="font-semibold"
            style={{ color: theme.palette.secondary.main }}
          />
        </Typography>

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
            borderRadius: theme.shape.borderRadius * 5,
            px: 3,
            py: 1,
            fontWeight: "bold",
            mt: 2,
            textTransform: "none",
            boxShadow: "0 6px 12px rgba(204, 1, 2, 0.2)",
            "&:hover": {
              transform: "translateY(-2px)",
              boxShadow: "0 8px 16px rgba(204, 1, 2, 0.3)",
            },
          }}
        >
          About Me ⬇
        </Button>
      </motion.div>

      {/* === Right Avatar === */}
     <motion.div
  className="flex-1 flex justify-center mt-10 md:mt-0 z-10"
  initial={{ scale: 0 }}
  animate={{ scale: 1 }}
  transition={{ duration: 0.8 }}
>
  <div className="relative">
    {/* Gradient Glow Border */}
    <div
      className="absolute -inset-4 rounded-[80px_80px_80px_80px/160px_160px_160px_160px] blur-md opacity-40"
      style={{
        background: `linear-gradient(135deg, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`,
      }}
    ></div>

    {/* Actual Image */}
    <img
      src={ProfileImg}
      alt="Rohit Avatar"
      style={{
        width: 280,
        height: 340,
        border: `3px solid ${theme.palette.background.paper}`,
        borderRadius: "60px / 120px", // ✅ vertical rounded corners
        objectFit: "contain", // ✅ shows the full image
        zIndex: 10,
        position: "relative",
      }}
    />
  </div>
</motion.div>

    </section>
  );
};

export default HomeSection;
