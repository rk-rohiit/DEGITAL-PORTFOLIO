// src/components/Services.jsx
// Futuristic Cyber Services Component
// Comprehensive engineering services, workflow roadmap, and consultation CTA
import React, { useState } from "react";
import { Typography, Card } from "@mui/material";
import { motion, AnimatePresence } from "framer-motion";
import { Link, useNavigate } from "react-router-dom";
import {
  Globe,
  Brain,
  Cpu,
  Server,
  Palette,
  Database,
  ArrowRight,
  CheckCircle2,
  Sparkles,
  Zap,
  Mail,
  Copy,
  Check,
  Code2,
  Workflow,
  ShieldCheck,
  ChevronRight,
  Layers,
} from "lucide-react";
import ServiceInquiryModal from "./ServiceInquiryModal";

export const SERVICES_DATA = [
  {
    id: "fullstack",
    title: "Full-Stack Web Engineering",
    category: "Web & FullStack",
    badge: "PRODUCTION READY",
    icon: Globe,
    accentColor: "#00f2fe",
    tagline: "Scalable web applications engineered for speed, reliability, and velocity.",
    desc: "End-to-end development of modern web platforms. From high-converting interactive portfolios to enterprise SaaS platforms, engineered with clean modular architectures, reactive state management, and resilient APIs.",
    deliverables: [
      "Responsive SPAs & SSR Applications (React 19, Next.js)",
      "RESTful & GraphQL Backend Microservices (Node.js, Express)",
      "Secure JWT / OAuth Authentication & Role-Based Access",
      "Interactive Dashboards, State Management & Real-Time Sync",
    ],
    tech: ["React", "Next.js", "Node.js", "Express", "MongoDB", "Tailwind CSS"],
    metrics: "Sub-100ms API • 100% Responsive • SEO Optimized",
  },
  {
    id: "ai-systems",
    title: "AI & Intelligent Automation",
    category: "AI & Intelligence",
    badge: "NEURAL CORE",
    icon: Brain,
    accentColor: "#10a37f",
    tagline: "Custom artificial intelligence pipelines and LLM integrations.",
    desc: "Empower your product with generative AI, intelligent agents, and automated workflows. Seamlessly integrate modern LLMs, prompt engineering systems, and data pipelines to solve complex business bottlenecks.",
    deliverables: [
      "Custom LLM Integrations (OpenAI, Google Gemini, Claude APIs)",
      "Retrieval-Augmented Generation (RAG) & Vector Database Setup",
      "Automated Workflow Agents & Smart Parsing Systems",
      "Prompt Optimization & AI Assisted Data Extraction",
    ],
    tech: ["Python", "OpenAI API", "Gemini API", "LangChain", "Vector DBs", "JSON Pipelines"],
    metrics: "Automated Workflows • Real-Time Inference • AI Driven",
  },
  {
    id: "creative-3d",
    title: "Interactive 3D & Creative Web",
    category: "3D & Creative",
    badge: "WEBGL 2.0",
    icon: Cpu,
    accentColor: "#ff0055",
    tagline: "Immersive 3D environments and GPU-accelerated web experiences.",
    desc: "Break away from flat, static layouts. I craft bespoke 3D WebGL scenes, interactive quantum matrix visualizers, and fluid micro-animations that captivate visitors and deliver a world-class first impression.",
    deliverables: [
      "Custom Three.js & WebGL 3D Interactive Canvases",
      "GPU-Accelerated Particle Systems & Cyber Matrix Visuals",
      "Fluid 60+ FPS Micro-Animations (Framer Motion & Vanilla CSS)",
      "Interactive 3D Product Showcases & Holographic HUDs",
    ],
    tech: ["Three.js", "WebGL", "GLSL Shaders", "Framer Motion", "HTML5 Canvas"],
    metrics: "60+ FPS Smooth • Hardware Accelerated • Zero Jank",
  },
  {
    id: "cloud-devops",
    title: "Cloud Architecture & DevOps",
    category: "Cloud & Backend",
    badge: "HIGH AVAILABILITY",
    icon: Server,
    accentColor: "#38bdf8",
    tagline: "Resilient server deployments and automated CI/CD release pipelines.",
    desc: "Robust cloud hosting, containerized microservices, and continuous delivery setups that eliminate downtime and scale seamlessly under fluctuating user traffic.",
    deliverables: [
      "Automated CI/CD Workflows (GitHub Actions, Vercel, Docker)",
      "Cloud Infrastructure Setup (Firebase, AWS, Mongo Atlas)",
      "Monitoring, Log Auditing & Performance Health Diagnostics",
      "SSL, DNS Configuration, Custom Domains & Cloud Edge CDNs",
    ],
    tech: ["Docker", "GitHub Actions", "Firebase", "AWS", "Vercel", "Linux"],
    metrics: "Zero-Downtime Deploy • Automated CI/CD • Edge Caching",
  },
  {
    id: "uiux-design",
    title: "UI/UX & Design Systems",
    category: "Web & FullStack",
    badge: "PIXEL PERFECT",
    icon: Palette,
    accentColor: "#f59e0b",
    tagline: "Sleek cyber aesthetic interfaces designed for intuitive usability.",
    desc: "Modern digital experiences built with precision. Combining futuristic cyber aesthetics, dark mode glassmorphism, and intuitive navigation flows to build design systems that users love.",
    deliverables: [
      "High-Fidelity Figma Wireframes & Interactive Prototypes",
      "Comprehensive Design Systems with Reusable Color/Type Tokens",
      "Accessibility (WCAG AA), Usability Testing & Visual Audits",
      "Mobile-First Responsive Framework with Micro-Interactions",
    ],
    tech: ["Figma", "Tailwind CSS", "Material UI", "Lucide Icons", "CSS Grid"],
    metrics: "Pixel Perfect • WCAG Compliant • Modern Glassmorphism",
  },
  {
    id: "api-database",
    title: "Database Architecture & REST APIs",
    category: "Cloud & Backend",
    badge: "SECURE & OPTIMIZED",
    icon: Database,
    accentColor: "#8b5cf6",
    tagline: "Bulletproof data storage, schema modeling, and high-throughput endpoints.",
    desc: "Optimized relational and NoSQL database modeling with high-speed query indexing. Built to safeguard data integrity while maintaining sub-second query latency under heavy concurrency.",
    deliverables: [
      "NoSQL (MongoDB) & SQL (PostgreSQL, MySQL) Schema Modeling",
      "Indexed Aggregation Pipelines & Advanced Query Optimization",
      "RESTful API Endpoint Security, CORS, Rate Limiting & Hashing",
      "Database Migrations, Backup Protocols & Disaster Recovery",
    ],
    tech: ["MongoDB", "PostgreSQL", "Mongoose", "REST APIs", "Redis", "JWT"],
    metrics: "Secure Endpoints • Indexed Queries • High Concurrency",
  },
];

const WORKFLOW_STEPS = [
  {
    step: "01",
    title: "Discovery & Blueprint",
    subtitle: "Architecture Scoping",
    desc: "Analyzing project requirements, defining the tech stack, designing data schemas, and formulating milestone timelines.",
    icon: Workflow,
    color: "#00f2fe",
  },
  {
    step: "02",
    title: "UI/UX & Prototyping",
    subtitle: "Visual & System Design",
    desc: "Drafting high-fidelity Figma wireframes, establishing design tokens, and validating interactive flows before writing code.",
    icon: Palette,
    color: "#ff0055",
  },
  {
    step: "03",
    title: "Agile Engineering",
    subtitle: "Clean Code Sprints",
    desc: "Building clean, maintainable components, implementing backend microservices, and integrating automated unit tests.",
    icon: Code2,
    color: "#10a37f",
  },
  {
    step: "04",
    title: "Deployment & Scale",
    subtitle: "Launch & Optimization",
    desc: "Configuring CI/CD pipelines, edge caching, load testing, SEO optimization, and providing comprehensive documentation.",
    icon: ShieldCheck,
    color: "#f59e0b",
  },
];

const CATEGORIES = ["All", "Web & FullStack", "AI & Intelligence", "3D & Creative", "Cloud & Backend"];

export default function Services() {
  const navigate = useNavigate();
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [copiedEmail, setCopiedEmail] = useState(false);

  const filteredServices =
    selectedCategory === "All"
      ? SERVICES_DATA
      : SERVICES_DATA.filter((s) => s.category === selectedCategory);

  const handleCopyEmail = () => {
    navigator.clipboard.writeText("askrohiitsharma@gmail.com");
    setCopiedEmail(true);
    setTimeout(() => setCopiedEmail(false), 2000);
  };

  return (
    <section
      id="services"
      className="relative min-h-screen py-20 px-4 sm:px-6 md:px-16 overflow-hidden bg-gradient-to-b from-[#07080d] via-[#0c101c] to-[#07080d] select-none"
    >
      {/* Background Cybernetic Glows & Grid */}
      <div
        className="absolute inset-0 pointer-events-none opacity-20"
        style={{
          backgroundImage:
            "linear-gradient(to right, rgba(0,242,254,0.08) 1px, transparent 1px), linear-gradient(to bottom, rgba(0,242,254,0.08) 1px, transparent 1px)",
          backgroundSize: "50px 50px",
        }}
      />
      <div className="absolute top-1/4 left-0 w-96 h-96 rounded-full bg-cyan-600/10 blur-[140px] pointer-events-none" />
      <div className="absolute bottom-1/4 right-0 w-96 h-96 rounded-full bg-rose-600/10 blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Breadcrumb Navigation */}
        <div className="flex items-center gap-2 text-xs font-mono text-slate-400 mb-8">
          <Link to="/" className="hover:text-cyan-400 transition-colors">
            HOME
          </Link>
          <span>//</span>
          <span className="text-cyan-400">SERVICES</span>
        </div>

        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center max-w-3xl mx-auto mb-16"
        >
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-slate-900/90 border border-cyan-500/30 text-xs font-mono text-cyan-400 mb-4 shadow-sm shadow-cyan-500/10">
            <Zap className="w-3.5 h-3.5 text-cyan-400 animate-pulse" />
            <span>capabilities.manifest // FREELANCE &amp; CONTRACTS</span>
          </div>

          <Typography
            variant="h2"
            sx={{
              fontWeight: 900,
              fontSize: { xs: "2.4rem", sm: "3.2rem", md: "3.8rem" },
              color: "#ffffff",
              fontFamily: '"Poppins", sans-serif',
              letterSpacing: "-0.02em",
              lineHeight: 1.15,
              mb: 2,
            }}
          >
            Engineering &amp;{" "}
            <span className="bg-gradient-to-r from-rose-500 via-red-500 to-cyan-400 bg-clip-text text-transparent">
              Cyber Solutions
            </span>
          </Typography>

          <div
            className="mx-auto mb-6"
            style={{
              width: "90px",
              height: "4px",
              background: "linear-gradient(to right, #ff0055, #00f2fe)",
              borderRadius: "4px",
            }}
          />

          <p className="text-slate-300 font-sans text-base sm:text-lg leading-relaxed">
            Architecting next-generation digital products. From high-throughput full stack web applications
            and customized AI integrations to immersive 3D Three.js experiences and resilient cloud infrastructures.
          </p>
        </motion.div>

        {/* Category Filter Pills */}
        <div className="flex flex-wrap items-center justify-center gap-2.5 mb-14 font-mono text-xs">
          {CATEGORIES.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-4 py-2 rounded-full font-semibold transition-all duration-300 cursor-pointer ${
                selectedCategory === cat
                  ? "bg-gradient-to-r from-rose-600 via-red-500 to-cyan-500 text-white shadow-lg shadow-cyan-500/25 scale-105"
                  : "bg-slate-900/80 text-slate-400 hover:text-slate-200 hover:bg-slate-800 border border-slate-800"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-7 mb-24">
          <AnimatePresence mode="popLayout">
            {filteredServices.map((svc, index) => {
              const IconComponent = svc.icon;
              return (
                <motion.div
                  layout
                  key={svc.id}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.4, delay: index * 0.05 }}
                  className="flex"
                >
                  <Card
                    elevation={0}
                    className="group relative flex flex-col justify-between w-full p-6 sm:p-7 rounded-3xl transition-all duration-400"
                    sx={{
                      background: "rgba(12, 16, 28, 0.75)",
                      backdropFilter: "blur(16px)",
                      border: "1px solid rgba(255, 255, 255, 0.08)",
                      boxShadow: "0 10px 30px rgba(0, 0, 0, 0.5)",
                      "&:hover": {
                        borderColor: `${svc.accentColor}66`,
                        boxShadow: `0 16px 40px ${svc.accentColor}20`,
                        transform: "translateY(-6px)",
                      },
                    }}
                  >
                    {/* Hover Cyber Gradient Glow */}
                    <div
                      className="absolute -inset-px rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none blur-lg"
                      style={{
                        background: `radial-gradient(circle at top right, ${svc.accentColor}25, transparent 70%)`,
                      }}
                    />

                    <div>
                      {/* Card Top: Icon & Category Badge */}
                      <div className="flex items-center justify-between gap-3 mb-5">
                        <div
                          className="w-13 h-13 rounded-2xl flex items-center justify-center p-3 transition-transform duration-300 group-hover:scale-110"
                          style={{
                            backgroundColor: `${svc.accentColor}18`,
                            border: `1px solid ${svc.accentColor}40`,
                            boxShadow: `0 0 15px ${svc.accentColor}20`,
                          }}
                        >
                          <IconComponent
                            className="w-7 h-7"
                            style={{ color: svc.accentColor }}
                          />
                        </div>

                        <span
                          className="px-3 py-1 rounded-full text-[10px] font-mono font-bold tracking-wider uppercase"
                          style={{
                            backgroundColor: `${svc.accentColor}15`,
                            color: svc.accentColor,
                            border: `1px solid ${svc.accentColor}30`,
                          }}
                        >
                          {svc.badge}
                        </span>
                      </div>

                      {/* Service Title & Tagline */}
                      <Typography
                        variant="h5"
                        sx={{
                          fontWeight: 800,
                          color: "#ffffff",
                          fontFamily: '"Poppins", sans-serif',
                          fontSize: "1.3rem",
                          lineHeight: 1.3,
                          mb: 1,
                        }}
                      >
                        {svc.title}
                      </Typography>

                      <p
                        className="text-xs font-mono mb-3 font-semibold"
                        style={{ color: svc.accentColor }}
                      >
                        {svc.tagline}
                      </p>

                      <p className="text-slate-400 font-sans text-xs sm:text-sm leading-relaxed mb-6">
                        {svc.desc}
                      </p>

                      {/* Key Deliverables */}
                      <div className="space-y-2 mb-6">
                        <span className="text-[11px] font-mono text-slate-400 uppercase tracking-wider block">
                          Core Capabilities:
                        </span>
                        {svc.deliverables.map((item, idx) => (
                          <div key={idx} className="flex items-start gap-2 text-xs text-slate-300">
                            <CheckCircle2
                              className="w-3.5 h-3.5 mt-0.5 flex-shrink-0"
                              style={{ color: svc.accentColor }}
                            />
                            <span>{item}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Card Footer: Tech Badges & Metric */}
                    <div className="pt-4 border-t border-slate-800/80 mt-auto">
                      <div className="flex flex-wrap gap-1.5 mb-3">
                        {svc.tech.map((t, idx) => (
                          <span
                            key={idx}
                            className="px-2 py-0.5 rounded-md text-[10px] font-mono bg-slate-900 border border-slate-800 text-slate-400"
                          >
                            {t}
                          </span>
                        ))}
                      </div>

                      <div className="flex items-center justify-between text-[11px] font-mono text-slate-400">
                        <span>{svc.metrics}</span>
                      </div>
                    </div>
                  </Card>
                </motion.div>
              );
            })}
          </AnimatePresence>
        </div>

        {/* Engineering Workflow (Step-by-Step Delivery Matrix) */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-24"
        >
          <div className="text-center max-w-2xl mx-auto mb-14">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-900/90 border border-cyan-500/30 text-xs font-mono text-cyan-400 mb-3">
              <Layers className="w-3.5 h-3.5 text-cyan-400" />
              <span>pipeline.execution // LIFECYCLE</span>
            </div>
            <Typography
              variant="h3"
              sx={{
                fontWeight: 800,
                color: "#ffffff",
                fontFamily: '"Poppins", sans-serif',
                fontSize: { xs: "1.8rem", sm: "2.4rem" },
                mb: 1.5,
              }}
            >
              Development Workflow
            </Typography>
            <p className="text-slate-400 font-sans text-sm sm:text-base">
              A transparent, production-proven agile delivery process from initial blueprint to live cloud launch.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {WORKFLOW_STEPS.map((item, idx) => {
              const StepIcon = item.icon;
              return (
                <div
                  key={idx}
                  className="relative p-6 rounded-3xl bg-slate-900/60 border border-slate-800 backdrop-blur-md flex flex-col justify-between"
                >
                  {/* Step Watermark Number */}
                  <span className="absolute top-4 right-4 text-4xl font-black font-mono text-slate-800/60">
                    {item.step}
                  </span>

                  <div>
                    <div
                      className="w-12 h-12 rounded-2xl flex items-center justify-center p-2.5 mb-5"
                      style={{
                        backgroundColor: `${item.color}15`,
                        border: `1px solid ${item.color}30`,
                      }}
                    >
                      <StepIcon className="w-6 h-6" style={{ color: item.color }} />
                    </div>

                    <h4 className="text-base font-bold text-white font-mono mb-1">
                      {item.title}
                    </h4>
                    <span
                      className="text-xs font-mono block mb-3 font-semibold"
                      style={{ color: item.color }}
                    >
                      {item.subtitle}
                    </span>
                    <p className="text-xs text-slate-400 leading-relaxed font-sans">
                      {item.desc}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </motion.div>

        {/* High-Impact CTA Banner */}
        <motion.div
          initial={{ opacity: 0, scale: 0.96 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <div className="relative rounded-3xl p-8 sm:p-12 overflow-hidden bg-gradient-to-r from-slate-900 via-[#0e1628] to-slate-900 border border-cyan-500/30 shadow-2xl text-center">
            {/* Glow effects */}
            <div className="absolute top-0 right-1/4 w-72 h-72 rounded-full bg-cyan-500/10 blur-3xl pointer-events-none" />
            <div className="absolute bottom-0 left-1/4 w-72 h-72 rounded-full bg-rose-500/10 blur-3xl pointer-events-none" />

            <div className="relative z-10 max-w-2xl mx-auto space-y-5">
              <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-slate-950/80 border border-emerald-500/30 text-xs font-mono text-emerald-400 shadow-sm">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
                <span>STATUS: AVAILABLE FOR CONTRACTS &amp; ROLES</span>
              </div>

              <Typography
                variant="h3"
                sx={{
                  fontWeight: 900,
                  color: "#ffffff",
                  fontFamily: '"Poppins", sans-serif',
                  fontSize: { xs: "1.9rem", sm: "2.6rem" },
                  lineHeight: 1.2,
                }}
              >
                Have a Vision or Project in Mind?
              </Typography>

              <p className="text-slate-300 font-sans text-sm sm:text-base leading-relaxed">
                Whether you need a dedicated full-stack engineer, a custom 3D web showcase, or an AI-powered pipeline,
                I am ready to build high-performance solutions for your team.
              </p>

              {/* Action Buttons */}
              <div className="flex flex-wrap items-center justify-center gap-4 pt-3">
                <a
                  href="mailto:askrohiitsharma@gmail.com"
                  className="inline-flex items-center gap-2 px-6 py-3.5 rounded-full bg-gradient-to-r from-rose-600 via-red-500 to-cyan-500 text-white font-mono text-xs sm:text-sm font-bold shadow-lg shadow-cyan-500/25 hover:shadow-cyan-500/40 hover:scale-105 transition-all cursor-pointer"
                >
                  <Mail className="w-4 h-4" />
                  <span>START A CONVERSATION</span>
                </a>

                <button
                  onClick={handleCopyEmail}
                  className="inline-flex items-center gap-2 px-5 py-3.5 rounded-full bg-slate-950/80 hover:bg-slate-900 border border-slate-700 text-slate-300 hover:text-cyan-400 text-xs sm:text-sm font-mono transition-all cursor-pointer"
                >
                  {copiedEmail ? (
                    <>
                      <Check className="w-4 h-4 text-emerald-400" />
                      <span className="text-emerald-400 font-bold">EMAIL COPIED!</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-4 h-4" />
                      <span>COPY EMAIL</span>
                    </>
                  )}
                </button>

                <button
                  onClick={() => {
                    navigate("/");
                    setTimeout(() => {
                      const contactSec = document.getElementById("contact");
                      if (contactSec) contactSec.scrollIntoView({ behavior: "smooth" });
                    }, 120);
                  }}
                  className="inline-flex items-center gap-1.5 px-5 py-3.5 rounded-full bg-slate-900/60 hover:bg-slate-800 border border-slate-800 text-slate-400 hover:text-slate-200 text-xs sm:text-sm font-mono transition-all cursor-pointer"
                >
                  <span>DIRECT CONTACT PROTOCOL</span>
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
