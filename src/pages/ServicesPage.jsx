import React, { useEffect } from "react";
import Navbar from "../components/Navbar";
import Services from "../components/Services";
import Footer from "../components/Footer";

const ServicesPage = () => {
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "instant" });
    document.title = "Services // Rohit Kumar | Full-Stack & AI Solutions";
    return () => {
      document.title = "Rohit Kumar | Full-Stack Developer & AI Engineer";
    };
  }, []);

  return (
    <div className="min-h-screen bg-[#07080d] text-slate-100 flex flex-col">
      <Navbar />
      <main className="flex-grow pt-16">
        <Services />
      </main>
      <Footer />
    </div>
  );
};

export default ServicesPage;
