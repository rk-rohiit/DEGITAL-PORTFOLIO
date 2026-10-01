import React from "react";
import { Card, CardContent, Typography } from "@mui/material";
import { Mail, Phone, Linkedin, Github, MapPin, Send } from "lucide-react";
import DevTransmission from "./DevTransmission";
import ThreeTiltCard from "./three/ThreeTiltCard";

const Contact = () => {
  const contactInfo = [
    {
      icon: Mail,
      label: "Email Protocol",
      value: "askrohiitsharma@gmail.com",
      href: "mailto:askrohiitsharma@gmail.com",
    },
    {
      icon: Phone,
      label: "Direct Signal",
      value: "+91-9523076517",
      href: "tel:+919523076517",
    },
    {
      icon: Linkedin,
      label: "LinkedIn Network",
      value: "linkedin.com/in/rohitkumar46",
      href: "https://linkedin.com/in/rohitkumar46",
    },
    {
      icon: Github,
      label: "GitHub Repositories",
      value: "github.com/rk-rohiit",
      href: "https://github.com/rk-rohiit",
    },
  ];

  return (
    <section id="contact" className="py-24 px-4 bg-gradient-to-b from-[#090a10] via-[#0c101c] to-[#090a10] relative overflow-hidden">
      {/* Background glows */}
      <div className="absolute top-1/3 left-0 w-80 h-80 rounded-full bg-cyan-600/8 blur-[120px] pointer-events-none" />
      <div className="absolute bottom-1/3 right-0 w-80 h-80 rounded-full bg-rose-600/8 blur-[120px] pointer-events-none" />

      <div className="container mx-auto max-w-6xl relative z-10">
        {/* Header */}
        <div className="text-center mb-12 animate-fade-in">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-slate-900/90 border border-cyan-500/30 text-xs font-mono text-cyan-400 mb-4 shadow-sm shadow-cyan-500/10">
            <Send className="w-3.5 h-3.5 text-cyan-400" />
            <span>signal.connect // TRANSMISSION</span>
          </div>

          <Typography
            variant="h3"
            sx={{
              fontWeight: 800,
              color: "#ffffff",
              fontFamily: '"Poppins", sans-serif',
              mb: 2,
            }}
          >
            Initiate{" "}
            <span className="bg-gradient-to-r from-rose-500 via-red-500 to-cyan-400 bg-clip-text text-transparent">
              Communication
            </span>
          </Typography>

          <div
            className="w-20 h-1 mx-auto mb-6"
            style={{
              background: "linear-gradient(to right, #ff0055, #00f2fe)",
              borderRadius: 2,
            }}
          />

          <p className="text-base text-slate-400 max-w-2xl mx-auto leading-relaxed">
            Open to discussing scalable full stack web engineering, AI/ML integrations,
            and software engineering opportunities worldwide.
          </p>
        </div>

        {/* Developer Portfolio Contact Visualization */}
        <div
          className="max-w-4xl mx-auto mb-12 rounded-2xl overflow-hidden relative"
          style={{
            background: "rgba(9,10,16,0.92)",
            border: "1px solid rgba(0,242,254,0.16)",
            boxShadow: "0 0 50px rgba(0,242,254,0.06), 0 0 80px rgba(255,0,85,0.04), inset 0 0 40px rgba(0,242,254,0.02)",
          }}
        >
          {/* Top HUD bar */}
          <div className="flex items-center justify-between px-5 py-2.5 border-b border-cyan-500/10 bg-slate-950/60">
            <div className="flex items-center gap-2">
              <div className="flex gap-1.5">
                <span className="w-2.5 h-2.5 rounded-full bg-rose-500/80" />
                <span className="w-2.5 h-2.5 rounded-full bg-yellow-500/80" />
                <span className="w-2.5 h-2.5 rounded-full bg-green-500/80" />
              </div>
              <span className="text-[10px] font-mono text-slate-500 ml-1">portfolio.transmission.v2</span>
            </div>
            <div className="flex items-center gap-3 text-[10px] font-mono">
              <span className="text-cyan-400/60">LIVE</span>
              <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse" />
            </div>
          </div>

          {/* Canvas visualization */}
          <DevTransmission />

          {/* Bottom status bar */}
          <div className="flex items-center justify-between px-5 py-2 border-t border-cyan-500/10 bg-slate-950/40 text-[10px] font-mono">
            <span className="text-slate-600">rohit.kumar // full-stack-dev</span>
            <div className="flex items-center gap-2 text-slate-500">
              <span className="text-green-400">●</span>
              <span>signal active</span>
              <span className="text-slate-700">·</span>
              <span className="text-cyan-400">Punjab, India</span>
            </div>
          </div>
        </div>

        {/* Contact Cards */}
        <div className="max-w-4xl mx-auto">
          <div className="grid md:grid-cols-2 gap-6">
            {contactInfo.map((item, index) => (
              <ThreeTiltCard
                key={index}
                tiltMaxAngleX={10}
                tiltMaxAngleY={10}
                scale={1.02}
                className="rounded-2xl"
              >
                <a
                  href={item.href}
                  target={item.href.startsWith("http") ? "_blank" : undefined}
                  rel={
                    item.href.startsWith("http")
                      ? "noopener noreferrer"
                      : undefined
                  }
                  className="block h-full"
                >
                  <Card
                    elevation={0}
                    className="border border-slate-800/90 bg-slate-900/80 backdrop-blur-xl group h-full transition-all duration-300 hover:border-cyan-500/50 hover:shadow-xl hover:shadow-cyan-500/10"
                    sx={{
                      borderRadius: 3,
                    }}
                  >
                    <CardContent className="flex items-center gap-4 p-5">
                      <div className="p-3 bg-cyan-500/10 border border-cyan-500/20 rounded-xl group-hover:bg-gradient-to-r group-hover:from-rose-500 group-hover:to-cyan-500 group-hover:text-white transition-all duration-300 text-cyan-400">
                        <item.icon className="w-6 h-6" />
                      </div>
                      <div>
                        <p className="text-[11px] uppercase tracking-wider font-mono text-gray-500 mb-0.5">
                          {item.label}
                        </p>
                        <p className="font-semibold text-slate-200 group-hover:text-cyan-400 transition-colors font-mono text-sm">
                          {item.value}
                        </p>
                      </div>
                    </CardContent>
                  </Card>
                </a>
              </ThreeTiltCard>
            ))}
          </div>

          {/* Location Card */}
          <div className="mt-8 text-center">
            <ThreeTiltCard tiltMaxAngleX={6} tiltMaxAngleY={6} scale={1.01} className="rounded-3xl">
              <Card
                elevation={0}
                className="bg-slate-900/80 border border-slate-800 backdrop-blur-xl hover:border-cyan-500/40 transition-colors"
                sx={{
                  borderRadius: 4,
                }}
              >
                <CardContent sx={{ py: 4 }}>
                  <MapPin className="w-8 h-8 text-rose-500 mx-auto mb-3 animate-bounce" style={{ animationDuration: "2.5s" }} />
                  <h3 className="text-xl font-bold mb-1 text-white">
                    Base: Punjab, India
                  </h3>
                  <p className="text-sm font-mono text-cyan-400">
                    Available for Remote Work Globally &amp; Relocation
                  </p>
                </CardContent>
              </Card>
            </ThreeTiltCard>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
