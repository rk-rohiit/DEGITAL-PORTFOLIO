import React, { useEffect } from "react";
import HeroSection from "../components/HeroSection";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import Certificates from "../components/Certificates";
import Skills from "../components/Skills.jsx";
import Projects from "../components/Projects";
import Contact from "../components/Contact";
import Testimonials from "../components/Testimonials";
import About from "../components/About";
import Education from "../components/Education.jsx";
import ThreeGlobalBackground from "../components/three/ThreeGlobalBackground";
import ThreeFloatingHUD from "../components/three/ThreeFloatingHUD";

const Home = () => {
  useEffect(() => {
    // If a hash exists in the URL (e.g. /#projects), scroll smoothly to the element
    if (window.location.hash) {
      const element = document.querySelector(window.location.hash);
      if (element) {
        // Delay slightly to ensure elements are fully mounted
        const timer = setTimeout(() => {
          element.scrollIntoView({ behavior: "smooth" });
        }, 150);
        return () => clearTimeout(timer);
      }
    }
  }, []);

  return (
    <div className="relative min-h-screen overflow-x-hidden">
      {/* Three.js Continuous Scroll-Reactive 3D Canvas Background */}
      <ThreeGlobalBackground />

      {/* Interactive 3D Engine HUD Badge */}
      <ThreeFloatingHUD />

      <Navbar />
      <HeroSection />
      <About />
      <Skills />
      <Projects />
      <Certificates />
      {/* <Testimonials/> */}
      <Education />
      <Contact />
      <Footer />
    </div>
  );
};

export default Home;
