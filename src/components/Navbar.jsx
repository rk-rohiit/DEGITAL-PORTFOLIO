// src/components/Navbar.jsx
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Menu, X, Terminal, FileText } from "lucide-react";
import { Button } from "@mui/material";

const Navbar = () => {
  const navigate = useNavigate();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 40);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { name: "Home", href: "#home" },
    { name: "About", href: "#about" },
    { name: "Skills", href: "#skills" },
    { name: "Projects", href: "#projects" },
    { name: "Services", href: "/services", isRoute: true },
    { name: "Education", href: "#education" },
    { name: "Contact", href: "#contact" },
  ];

  const scrollToSection = (href) => {
    if (window.location.pathname !== "/") {
      window.location.href = "/" + href;
      return;
    }
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
      setIsMobileMenuOpen(false);
    }
  };

  const handleNavLinkClick = (e, link) => {
    e.preventDefault();
    if (link.isRoute) {
      navigate(link.href);
      setIsMobileMenuOpen(false);
    } else {
      scrollToSection(link.href);
    }
  };

  const handleResumeDownload = () => {
    const link = document.createElement("a");
    link.href = "/Rohit_cv.pdf"; 
    link.download = "Rohit_Kumar_Resume.pdf";
    link.click();
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? "bg-slate-950/85 backdrop-blur-xl border-b border-slate-800/80 shadow-2xl shadow-black/60"
          : "bg-transparent"
      }`}
    >
      <div className="container mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          {/* Tech Logo */}
          <a
            href={window.location.pathname === "/" ? "#home" : "/"}
            onClick={(e) => {
              e.preventDefault();
              if (window.location.pathname !== "/") {
                navigate("/");
              } else {
                scrollToSection("#home");
              }
            }}
            className="flex items-center gap-2 group cursor-pointer"
          >
            <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-rose-600 to-cyan-500 flex items-center justify-center text-white shadow-md shadow-cyan-500/20 group-hover:scale-105 transition-transform">
              <Terminal className="w-4 h-4" />
            </div>
            <span className="font-mono text-lg font-bold tracking-tight text-white">
              <span className="text-cyan-400">&lt;</span>
              <span className="bg-gradient-to-r from-rose-400 to-cyan-300 bg-clip-text text-transparent">Rohit</span>
              <span className="text-gray-400">.ai</span>
              <span className="text-cyan-400"> /&gt;</span>
            </span>
          </a>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-7">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                onClick={(e) => handleNavLinkClick(e, link)}
                className="text-slate-300 hover:text-cyan-400 transition-colors font-mono text-sm tracking-wide hover:-translate-y-0.5 duration-200"
              >
                {link.name}
              </a>
            ))}
            
            <Button
              variant="contained"
              onClick={handleResumeDownload}
              sx={{
                background: "linear-gradient(135deg, #ff0055 0%, #00f2fe 100%)",
                textTransform: "none",
                fontWeight: 700,
                fontSize: "0.85rem",
                fontFamily: '"Fira Code", monospace',
                borderRadius: "10px",
                px: 3,
                py: 1,
                boxShadow: "0 4px 20px rgba(255, 0, 85, 0.3)",
                "&:hover": {
                  boxShadow: "0 6px 25px rgba(0, 242, 254, 0.4)",
                  transform: "translateY(-2px)",
                },
              }}
              startIcon={<FileText className="w-4 h-4" />}
            >
              Resume.pdf
            </Button>
          </nav>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden text-slate-300 hover:text-cyan-400 p-2 rounded-lg bg-slate-900 border border-slate-800 transition-colors cursor-pointer"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Navigation Dropdown */}
        {isMobileMenuOpen && (
          <nav className="md:hidden mt-4 pb-4 flex flex-col gap-3 animate-slide-up bg-slate-950/95 border border-slate-800/90 rounded-2xl shadow-2xl p-5 backdrop-blur-2xl">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                onClick={(e) => handleNavLinkClick(e, link)}
                className="text-slate-300 hover:text-cyan-400 transition-colors font-mono text-sm py-2 px-3 rounded-lg hover:bg-slate-900"
              >
                {link.name}
              </a>
            ))}
            <Button
              variant="contained"
              fullWidth
              onClick={handleResumeDownload}
              sx={{
                background: "linear-gradient(135deg, #ff0055 0%, #00f2fe 100%)",
                textTransform: "none",
                fontWeight: 700,
                fontFamily: '"Fira Code", monospace',
                borderRadius: "10px",
                py: 1.2,
                mt: 2,
              }}
              startIcon={<FileText className="w-4 h-4" />}
            >
              Resume.pdf
            </Button>
          </nav>
        )}
      </div>
    </header>
  );
};

export default Navbar;
