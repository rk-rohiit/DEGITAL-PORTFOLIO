// src/theme/theme.js
import { createTheme } from "@mui/material/styles";

const theme = createTheme({
  palette: {
    mode: "dark",

    primary: {
      main: "#ff0055", // Cyber Crimson / Neon Red
      light: "#ff3377",
      dark: "#b8003d",
      contrastText: "#ffffff",
    },
    secondary: {
      main: "#00f2fe", // Electric Cyan / AI Tech Blue
      light: "#38bdf8",
      dark: "#0284c7",
      contrastText: "#090a10",
    },

    background: {
      default: "#090a10", // Deep obsidian space
      paper: "#111524",   // Dark futuristic card paper
    },

    text: {
      primary: "#f8fafc",    // Crisp high-contrast text
      secondary: "#94a3b8",  // Sleek tech secondary text
    },

    divider: "rgba(255, 255, 255, 0.08)",
  },

  typography: {
    fontFamily: `"Poppins", "Fira Code", monospace, "Roboto", sans-serif`,
    h1: {
      fontWeight: 800,
      fontSize: "2.75rem",
      color: "#f8fafc",
      letterSpacing: "-0.02em",
    },
    h2: {
      fontWeight: 700,
      fontSize: "2rem",
      color: "#f8fafc",
    },
    h3: {
      fontWeight: 700,
      fontSize: "1.5rem",
      color: "#f8fafc",
    },
    body1: {
      fontSize: "1rem",
      lineHeight: 1.7,
      color: "#cbd5e1",
    },
    button: {
      textTransform: "none",
      fontWeight: 600,
      letterSpacing: 0.5,
    },
  },

  shape: {
    borderRadius: 14,
  },

  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 12,
          cursor: "pointer",
          padding: "10px 24px",
          fontWeight: 600,
          transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
          "&:hover": {
            transform: "translateY(-2px)",
            boxShadow: "0 8px 24px rgba(255, 0, 85, 0.35)",
          },
        },
        containedPrimary: {
          background: "linear-gradient(135deg, #ff0055 0%, #ff4d4f 50%, #00f2fe 100%)",
          color: "#fff",
          boxShadow: "0 4px 18px rgba(255, 0, 85, 0.3)",
          "&:hover": {
            background: "linear-gradient(135deg, #e6004c 0%, #ff3377 50%, #00d4ff 100%)",
            boxShadow: "0 6px 26px rgba(0, 242, 254, 0.4)",
          },
        },
      },
    },

    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: 18,
          backgroundColor: "rgba(17, 21, 36, 0.8)",
          backdropFilter: "blur(14px)",
          border: "1px solid rgba(255, 255, 255, 0.07)",
          boxShadow: "0 10px 30px rgba(0, 0, 0, 0.4)",
          transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
          "&:hover": {
            boxShadow: "0 14px 40px rgba(255, 0, 85, 0.15)",
            borderColor: "rgba(0, 242, 254, 0.25)",
            transform: "translateY(-4px)",
          },
        },
      },
    },

    MuiAppBar: {
      styleOverrides: {
        root: {
          backgroundColor: "rgba(9, 10, 16, 0.85)",
          boxShadow: "0 4px 20px rgba(0,0,0,0.5)",
          backdropFilter: "blur(12px)",
          borderBottom: "1px solid rgba(255, 255, 255, 0.05)",
        },
      },
    },

    MuiPaper: {
      styleOverrides: {
        root: {
          backgroundColor: "#111524",
          backgroundImage: "none",
        },
      },
    },
  },
});

export default theme;
