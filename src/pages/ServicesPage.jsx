import React, { useEffect } from "react";
import Navbar from "../components/Navbar";
import Services from "../components/Services";
import Footer from "../components/Footer";

const ServicesPage = () => {
  useEffect(() => {
    // Scroll to the top on page load
    window.scrollTo(0, 0);
  }, []);

  return (
    <>
      <Navbar />
      <div className="pt-16">
        <Services />
      </div>
      <Footer />
    </>
  );
};

export default ServicesPage;
