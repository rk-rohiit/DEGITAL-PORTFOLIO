// src/components/Footer.js
import React from "react";
import { Box, Typography, useTheme, Link } from "@mui/material";

export default function Footer() {
  const theme = useTheme();

  return (
    <Box
      component="footer"
      sx={{
        py: 4,
        textAlign: "center",
        borderTop: `1px solid ${theme.palette.divider}`,
        backgroundColor: theme.palette.background.paper,
      }}
    >
      <Typography
        variant="body2"
        sx={{
          color: theme.palette.text.secondary,
          fontWeight: 500,
        }}
      >
        © {new Date().getFullYear()}{" "}
        <Link
          href="#home"
          underline="hover"
          sx={{
            color: theme.palette.primary.main,
            fontWeight: 600,
            transition: "color 0.3s ease",
            "&:hover": {
              color: theme.palette.secondary.main,
            },
          }}
        >
          Rohit Sharma
        </Link>
        . All Rights Reserved.
      </Typography>
    </Box>
  );
}
