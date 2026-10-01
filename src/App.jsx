import React, { useState, useEffect } from "react";
import { ThemeProvider, CssBaseline } from "@mui/material";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import theme from "./theme/theme";
import Home from "./pages/Home";
import ServicesPage from "./pages/ServicesPage";
import NotFound from "./pages/NotFound";
import Preloader from "./components/Preloader";
import MagneticCursor from "./components/MagneticCursor";
import { AnimatePresence } from "framer-motion";

const App = () => {
  const [loading, setLoading] = useState(true);

  // Safety fallback: maximum 1 second if onComplete was somehow delayed
  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      {/* Global magnetic cursor with gravity trail */}
      <MagneticCursor />
      
      {/* Cinematic preloader overlay */}
      <AnimatePresence mode="wait">
        {loading && <Preloader onComplete={() => setLoading(false)} />}
      </AnimatePresence>

      {/* Main routing table */}
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/services" element={<ServicesPage />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Router>
    </ThemeProvider>
  );
};

export default App;