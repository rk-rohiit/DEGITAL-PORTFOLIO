import React, { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";
import { Button } from "@mui/material";

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { name: "Home", href: "#home" },
    { name: "About", href: "#about" },
    { name: "Skills", href: "#skills" },
    { name: "Projects", href: "#projects" },
    { name: "Education", href: "#education" },
    { name: "Contact", href: "#contact" },
  ];

  const scrollToSection = (href) => {
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
      setIsMobileMenuOpen(false);
    }
  };

  // ✅ Function to handle resume download
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
          ? "bg-white/90 backdrop-blur-md shadow-md"
          : "bg-transparent"
      }`}
    >
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <a
            href="#hero"
            onClick={(e) => {
              e.preventDefault();
              scrollToSection("#hero");
            }}
            className="text-2xl font-bold bg-gradient-to-r from-red-600 to-rose-500 bg-clip-text text-transparent"
          >
            R
          </a>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                onClick={(e) => {
                  e.preventDefault();
                  scrollToSection(link.href);
                }}
                className="text-gray-700 hover:text-red-600 transition-colors font-medium"
              >
                {link.name}
              </a>
            ))}
            <Button
              variant="contained"
              onClick={handleResumeDownload}
              sx={{
                background: "linear-gradient(to right, #cc0102, #ff4d4d)",
                textTransform: "none",
                fontWeight: "600",
                borderRadius: "9999px",
                "&:hover": {
                  opacity: 0.9,
                  background: "linear-gradient(to right, #ff4d4d, #cc0102)",
                },
              }}
            >
              Resume
            </Button>
          </nav>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden text-gray-700 hover:text-red-600 transition-colors"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMobileMenuOpen && (
          <nav className="md:hidden mt-4 pb-4 flex flex-col gap-4 animate-slide-up bg-white/90 rounded-xl shadow-md p-4 backdrop-blur-md">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                onClick={(e) => {
                  e.preventDefault();
                  scrollToSection(link.href);
                }}
                className="text-gray-700 hover:text-red-600 transition-colors font-medium py-2 text-center"
              >
                {link.name}
              </a>
            ))}
            <Button
              variant="contained"
              fullWidth
              onClick={handleResumeDownload}
              sx={{
                background: "linear-gradient(to right, #cc0102, #ff4d4d)",
                textTransform: "none",
                fontWeight: "600",
                borderRadius: "9999px",
                "&:hover": {
                  opacity: 0.9,
                  background: "linear-gradient(to right, #ff4d4d, #cc0102)",
                },
              }}
            >
              Resume
            </Button>
          </nav>
        )}
      </div>
    </header>
  );
};

export default Navbar;
