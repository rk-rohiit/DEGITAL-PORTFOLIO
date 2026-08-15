import React, { useState, useEffect } from "react";
import { ThemeProvider, CssBaseline } from "@mui/material";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import theme from "./theme/theme";
import Home from "./pages/Home";
import ServicesPage from "./pages/ServicesPage";
import NotFound from "./pages/NotFound";
import Preloader from "./components/Preloader";
import { AnimatePresence } from "framer-motion";

const App = () => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1800); // Display loading screen for 1.8s
    return () => clearTimeout(timer);
  }, []);

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      
      {/* Cinematic preloader overlay */}
      <AnimatePresence>
        {loading && <Preloader />}
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