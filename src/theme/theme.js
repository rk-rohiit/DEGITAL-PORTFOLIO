// src/theme/theme.js
import { createTheme } from "@mui/material/styles";

const theme = createTheme({
  palette: {
    mode: "light",

    primary: {
      main: "#cc0102",       // Brand red
      light: "#ff4d4f",
      dark: "#990000",
      contrastText: "#ffffff",
    },
    secondary: {
      main: "#FF6F61",       // Accent peach
      light: "#ffa08f",
      dark: "#d74a3f",
      contrastText: "#ffffff",
    },

    background: {
      default: "#fafafa",    // Page background
      paper: "#ffffff",      // Cards, appbar
    },

    text: {
      primary: "#1e1e1e",    // Main text
      secondary: "#555555",  // Subtext
    },

    divider: "rgba(0, 0, 0, 0.1)",
  },

  typography: {
    fontFamily: `"Poppins", "Roboto", "Helvetica", "Arial", sans-serif`,
    h1: {
      fontWeight: 700,
      fontSize: "2.75rem",
      color: "#1e1e1e",
    },
    h2: {
      fontWeight: 600,
      fontSize: "2rem",
      color: "#1e1e1e",
    },
    h3: {
      fontWeight: 600,
      fontSize: "1.5rem",
      color: "#1e1e1e",
    },
    body1: {
      fontSize: "1rem",
      lineHeight: 1.7,
      color: "#444444",
    },
    button: {
      textTransform: "none",
      fontWeight: 600,
      letterSpacing: 0.3,
    },
  },

  shape: {
    borderRadius: 12,
  },

  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 10,
          padding: "10px 22px",
          fontWeight: 600,
          transition: "all 0.3s ease",
          "&:hover": {
            transform: "translateY(-2px)",
            boxShadow: "0 6px 16px rgba(204, 1, 2, 0.25)",
          },
        },
        containedPrimary: {
          background:
            "linear-gradient(90deg, #cc0102 0%, #ff6f61 100%)",
          color: "#fff",
          "&:hover": {
            background:
              "linear-gradient(90deg, #b00000 0%, #ff4d4f 100%)",
          },
        },
      },
    },

    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: 16,
          backgroundColor: "#ffffff",
          border: "1px solid rgba(0,0,0,0.06)",
          boxShadow: "0 4px 20px rgba(0,0,0,0.05)",
          transition: "all 0.3s ease",
          "&:hover": {
            boxShadow: "0 6px 24px rgba(0,0,0,0.1)",
            transform: "translateY(-4px)",
          },
        },
      },
    },

    MuiAppBar: {
      styleOverrides: {
        root: {
          backgroundColor: "rgba(255,255,255,0.85)",
          boxShadow: "0 2px 10px rgba(0,0,0,0.08)",
          backdropFilter: "blur(10px)",
        },
      },
    },

    MuiPaper: {
      styleOverrides: {
        root: {
          backgroundColor: "#ffffff",
        },
      },
    },
  },
});

export default theme;
