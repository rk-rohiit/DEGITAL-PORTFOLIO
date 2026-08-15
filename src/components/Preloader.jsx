import React from "react";
import { motion } from "framer-motion";
import { useTheme } from "@mui/material/styles";
import { Typography } from "@mui/material";

const Preloader = () => {
  const theme = useTheme();

  return (
    <motion.div
      initial={{ opacity: 1 }}
      exit={{ opacity: 0, transition: { duration: 0.6, ease: "easeInOut" } }}
      className="fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-white"
    >
      <div className="relative flex flex-col items-center gap-6">
        {/* Pulsing Outer Ring */}
        <motion.div
          animate={{
            rotate: 360,
          }}
          transition={{
            duration: 1.2,
            repeat: Infinity,
            ease: "linear",
          }}
          className="w-20 h-20 rounded-full border-4 border-gray-100"
          style={{
            borderTopColor: theme.palette.primary.main,
            borderRightColor: theme.palette.secondary.main,
          }}
        />

        {/* Pulsing Initial Logo */}
        <motion.div
          initial={{ scale: 0.8, opacity: 0.5 }}
          animate={{ scale: [0.8, 1.1, 0.8], opacity: [0.5, 1, 0.5] }}
          transition={{
            duration: 1.5,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="absolute top-0 left-0 right-0 bottom-0 flex items-center justify-center"
        >
          <Typography
            variant="h4"
            sx={{
              fontWeight: 900,
              fontFamily: '"Poppins", sans-serif',
              color: theme.palette.primary.main,
              mt: -3.5, // Center offset
            }}
          >
            R
          </Typography>
        </motion.div>

        {/* Loading text */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.5 }}
        >
          <Typography
            variant="body2"
            sx={{
              fontWeight: 700,
              letterSpacing: 2,
              textTransform: "uppercase",
              fontFamily: '"Poppins", sans-serif',
              color: theme.palette.text.secondary,
              mt: 2,
              fontSize: "0.8rem",
            }}
          >
            Loading Experience
          </Typography>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default Preloader;
