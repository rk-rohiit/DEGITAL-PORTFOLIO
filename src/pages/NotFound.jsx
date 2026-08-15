import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button, Typography, Box, Card } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import { Home, Compass, ArrowLeft, Layers, Send } from "lucide-react";
import { motion } from "framer-motion";

const NotFound = () => {
  const theme = useTheme();
  const navigate = useNavigate();

  return (
    <div
      className="min-h-screen flex flex-col items-center justify-center p-6 relative overflow-hidden"
      style={{
        background: `linear-gradient(135deg, ${theme.palette.background.default}, #f1f5f9)`,
      }}
    >
      {/* Decorative background blur circles */}
      <div
        className="absolute top-10 left-10 w-80 h-80 rounded-full mix-blend-multiply filter blur-3xl opacity-25 animate-pulse"
        style={{ backgroundColor: theme.palette.primary.light }}
      ></div>
      <div
        className="absolute bottom-10 right-10 w-96 h-96 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse"
        style={{ backgroundColor: theme.palette.secondary.light }}
      ></div>

      <div className="max-w-md w-full text-center relative z-10">
        {/* Animated Icon */}
        <motion.div
          animate={{
            y: [0, -15, 0],
            rotate: [0, 5, -5, 0],
          }}
          transition={{
            duration: 6,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="inline-flex items-center justify-center w-24 h-24 rounded-3xl mb-8 shadow-lg"
          style={{
            background: `linear-gradient(to bottom right, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`,
          }}
        >
          <Compass className="w-12 h-12 text-white" />
        </motion.div>

        {/* 404 Heading */}
        <motion.div
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ type: "spring", stiffness: 150, damping: 15 }}
        >
          <Typography
            variant="h1"
            sx={{
              fontWeight: 900,
              fontSize: { xs: "6rem", md: "8rem" },
              lineHeight: 1,
              background: `linear-gradient(to right, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`,
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              fontFamily: '"Poppins", sans-serif',
              mb: 2,
            }}
          >
            404
          </Typography>
        </motion.div>

        {/* Page Not Found Title */}
        <Typography
          variant="h4"
          sx={{
            fontWeight: 800,
            color: theme.palette.text.primary,
            fontFamily: '"Poppins", sans-serif',
            mb: 2,
          }}
        >
          Lost in Space?
        </Typography>

        <Typography
          variant="body1"
          sx={{
            color: theme.palette.text.secondary,
            fontFamily: '"Poppins", sans-serif',
            lineHeight: 1.7,
            mb: 6,
          }}
        >
          The page you are looking for doesn't exist or has been moved to another coordinate.
        </Typography>

        {/* Go Back Menu (Quick Navigation Links) */}
        <Card
          sx={{
            p: 3,
            borderRadius: 4,
            border: "1px solid rgba(0, 0, 0, 0.05)",
            background: "rgba(255, 255, 255, 0.8)",
            backdropFilter: "blur(10px)",
            boxShadow: "0 10px 25px rgba(0, 0, 0, 0.03)",
            mb: 4,
          }}
        >
          <Typography
            variant="subtitle2"
            sx={{
              fontWeight: 700,
              color: theme.palette.text.primary,
              fontFamily: '"Poppins", sans-serif',
              mb: 2,
              textTransform: "uppercase",
              letterSpacing: 1,
              fontSize: "0.8rem",
            }}
          >
            Quick Navigation Menu
          </Typography>
          
          <div className="flex flex-col gap-2.5">
            <Button
              component={Link}
              to="/"
              variant="contained"
              fullWidth
              startIcon={<Home size={18} />}
              sx={{
                background: `linear-gradient(to right, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`,
                "&:hover": {
                  background: `linear-gradient(to right, ${theme.palette.primary.dark}, ${theme.palette.secondary.dark})`,
                },
                borderRadius: 2.5,
                textTransform: "none",
                fontWeight: 600,
                py: 1,
                fontFamily: '"Poppins", sans-serif',
              }}
            >
              Go to Home Page
            </Button>

            <Button
              onClick={() => {
                navigate("/");
                setTimeout(() => {
                  const projectsSec = document.getElementById("projects");
                  if (projectsSec) projectsSec.scrollIntoView({ behavior: "smooth" });
                }, 100);
              }}
              variant="outlined"
              fullWidth
              startIcon={<Layers size={18} />}
              sx={{
                color: theme.palette.text.primary,
                borderColor: theme.palette.divider,
                borderRadius: 2.5,
                textTransform: "none",
                fontWeight: 600,
                py: 1,
                fontFamily: '"Poppins", sans-serif',
                "&:hover": {
                  backgroundColor: "rgba(0, 0, 0, 0.02)",
                  borderColor: theme.palette.text.secondary,
                },
              }}
            >
              View Featured Projects
            </Button>

            <Button
              onClick={() => {
                navigate("/");
                setTimeout(() => {
                  const contactSec = document.getElementById("contact");
                  if (contactSec) contactSec.scrollIntoView({ behavior: "smooth" });
                }, 100);
              }}
              variant="outlined"
              fullWidth
              startIcon={<Send size={18} />}
              sx={{
                color: theme.palette.text.primary,
                borderColor: theme.palette.divider,
                borderRadius: 2.5,
                textTransform: "none",
                fontWeight: 600,
                py: 1,
                fontFamily: '"Poppins", sans-serif',
                "&:hover": {
                  backgroundColor: "rgba(0, 0, 0, 0.02)",
                  borderColor: theme.palette.text.secondary,
                },
              }}
            >
              Get in Touch
            </Button>
          </div>
        </Card>

        {/* Go Back button */}
        <Button
          onClick={() => navigate(-1)}
          startIcon={<ArrowLeft size={16} />}
          sx={{
            color: theme.palette.text.secondary,
            fontFamily: '"Poppins", sans-serif',
            textTransform: "none",
            fontWeight: 600,
            fontSize: "0.9rem",
            "&:hover": {
              color: theme.palette.primary.main,
            },
          }}
        >
          Go Back Previous Page
        </Button>
      </div>
    </div>
  );
};

export default NotFound;
