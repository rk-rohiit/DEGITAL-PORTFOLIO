import React from "react";
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

const Home = () => {
  return (
    <>
    <Navbar />
            <HeroSection />
            <About />
            <Skills />
            <Projects />
            <Certificates/>
            {/* <Testimonials/> */}
            <Education />
            <Contact />
            <Footer />
    </>
  );
};

export default Home;
