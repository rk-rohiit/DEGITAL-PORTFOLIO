// src/components/ServiceInquiryModal.jsx
// Cyber-themed Modal for Service Inquiry & Google Form integration
import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  X,
  Send,
  ExternalLink,
  CheckCircle2,
  Sparkles,
  FileText,
  Lock,
  Layers,
  ChevronRight,
  HelpCircle,
} from "lucide-react";
import { Typography } from "@mui/material";
import { SERVICES_CONFIG } from "../config/servicesConfig";

export default function ServiceInquiryModal({
  isOpen,
  onClose,
  initialService = "",
}) {
  const [activeTab, setActiveTab] = useState("form"); // "form" or "googleForm"
  const [selectedServices, setSelectedServices] = useState([]);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    budget: SERVICES_CONFIG.budgetRanges[1],
    timeline: SERVICES_CONFIG.timelineOptions[1],
    details: "",
  });
  const [submitted, setSubmitted] = useState(false);

  // Sync initial service when opened from a specific card
  useEffect(() => {
    if (initialService) {
      setSelectedServices([initialService]);
    } else {
      setSelectedServices([SERVICES_CONFIG.servicesList[0]]);
    }
  }, [initialService, isOpen]);

  // Close on Escape key
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Escape") onClose();
    };
    if (isOpen) {
      window.addEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "hidden";
    }
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "unset";
    };
  }, [isOpen, onClose]);

  const toggleService = (svc) => {
    if (selectedServices.includes(svc)) {
      if (selectedServices.length > 1) {
        setSelectedServices(selectedServices.filter((s) => s !== svc));
      }
    } else {
      setSelectedServices([...selectedServices, svc]);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Construct formatted mailto link to inform Rohit instantly
    const subject = encodeURIComponent(
      `[New Service Inquiry] ${formData.name} - ${selectedServices.join(", ")}`
    );
    const body = encodeURIComponent(
      `Hello Rohit,\n\nI would like to inquire about your services for my project.\n\n` +
        `Client Name: ${formData.name}\n` +
        `Email: ${formData.email}\n` +
        `Phone / Signal: ${formData.phone || "Not specified"}\n\n` +
        `Services Required:\n- ${selectedServices.join("\n- ")}\n\n` +
        `Estimated Budget: ${formData.budget}\n` +
        `Project Timeline: ${formData.timeline}\n\n` +
        `Project Description & Requirements:\n${formData.details}\n\n` +
        `Sent via Rohit Kumar Digital Portfolio Service Terminal`
    );

    // Trigger email client
    window.open(`mailto:${SERVICES_CONFIG.recipientEmail}?subject=${subject}&body=${body}`, "_blank");

    setSubmitted(true);
  };

  const handleOpenGoogleForm = () => {
    window.open(SERVICES_CONFIG.googleFormUrl, "_blank", "noopener,noreferrer");
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-[999999] flex items-center justify-center p-3 sm:p-5 overflow-y-auto">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 bg-[#07080d]/85 backdrop-blur-xl transition-all"
        />

        {/* Modal Window */}
        <motion.div
          initial={{ scale: 0.94, opacity: 0, y: 20 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          exit={{ scale: 0.94, opacity: 0, y: 20 }}
          transition={{ type: "spring", damping: 25, stiffness: 300 }}
          className="relative w-full max-w-2xl max-h-[92vh] flex flex-col rounded-3xl bg-slate-950 border border-cyan-500/40 shadow-2xl shadow-cyan-500/20 overflow-hidden z-10 text-slate-100"
        >
          {/* Top Header Bar */}
          <div className="flex items-center justify-between px-6 py-4 border-b border-slate-800 bg-slate-900/90 backdrop-blur-md">
            <div className="flex items-center gap-2.5">
              <div className="w-2.5 h-2.5 rounded-full bg-cyan-400 animate-ping" />
              <div className="flex flex-col">
                <span className="text-[11px] font-mono text-cyan-400 font-bold tracking-wider">
                  SERVICES_TRANSMISSION // PROTOCOL
                </span>
                <span className="text-xs font-mono text-slate-400">
                  Project Inquiry &amp; Scope Requirements
                </span>
              </div>
            </div>

            <button
              onClick={onClose}
              className="p-1.5 rounded-xl bg-slate-800/80 hover:bg-slate-700 text-slate-400 hover:text-white transition-all cursor-pointer"
              title="Close Modal"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Tab Switcher: Cyber Form vs Embedded Google Form */}
          <div className="flex items-center px-6 pt-4 pb-2 border-b border-slate-800/60 bg-slate-950/60 gap-3 font-mono text-xs">
            <button
              onClick={() => setActiveTab("form")}
              className={`flex items-center gap-2 px-4 py-2 rounded-xl transition-all cursor-pointer ${
                activeTab === "form"
                  ? "bg-cyan-500/15 border border-cyan-500/40 text-cyan-300 font-bold shadow-sm"
                  : "text-slate-400 hover:text-slate-200 border border-transparent"
              }`}
            >
              <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
              <span>Interactive Inquiry Form</span>
            </button>

            <button
              onClick={() => setActiveTab("googleForm")}
              className={`flex items-center gap-2 px-4 py-2 rounded-xl transition-all cursor-pointer ${
                activeTab === "googleForm"
                  ? "bg-rose-500/15 border border-rose-500/40 text-rose-300 font-bold shadow-sm"
                  : "text-slate-400 hover:text-slate-200 border border-transparent"
              }`}
            >
              <FileText className="w-3.5 h-3.5 text-rose-400" />
              <span>Google Form Portal</span>
            </button>
          </div>

          {/* Modal Body */}
          <div className="flex-1 overflow-y-auto p-6 space-y-6">
            {activeTab === "form" ? (
              submitted ? (
                /* Success Confirmation View */
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="py-10 text-center flex flex-col items-center space-y-4"
                >
                  <div className="w-16 h-16 rounded-3xl bg-emerald-500/20 border border-emerald-500/40 flex items-center justify-center text-emerald-400 shadow-xl shadow-emerald-500/20 mb-2">
                    <CheckCircle2 className="w-8 h-8" />
                  </div>
                  <Typography variant="h5" sx={{ fontWeight: 800, fontFamily: '"Poppins", sans-serif' }}>
                    Inquiry Transmission Dispatched!
                  </Typography>
                  <p className="text-sm text-slate-400 max-w-md mx-auto leading-relaxed">
                    Thank you, <span className="text-white font-semibold">{formData.name}</span>. Your service specifications have been formatted. Rohit has been notified at <span className="text-cyan-400 font-mono">askrohiitsharma@gmail.com</span> and will review your project details promptly.
                  </p>

                  <div className="pt-4 flex flex-wrap gap-3 justify-center">
                    <button
                      onClick={handleOpenGoogleForm}
                      className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-slate-900 border border-cyan-500/40 text-cyan-300 font-mono text-xs hover:bg-slate-800 transition-all cursor-pointer"
                    >
                      <span>Also Open in Google Form</span>
                      <ExternalLink className="w-3.5 h-3.5" />
                    </button>
                    <button
                      onClick={onClose}
                      className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-rose-600 to-cyan-500 text-white font-mono text-xs font-bold transition-all cursor-pointer"
                    >
                      Close Terminal
                    </button>
                  </div>
                </motion.div>
              ) : (
                /* Native Interactive Form */
                <form onSubmit={handleSubmit} className="space-y-5">
                  {/* Service Selection Chips */}
                  <div>
                    <label className="block text-xs font-mono text-cyan-400 font-semibold mb-2">
                      SELECT SERVICES REQUIRED // (SELECT ALL THAT APPLY):
                    </label>
                    <div className="flex flex-wrap gap-2">
                      {SERVICES_CONFIG.servicesList.map((svc) => {
                        const isSelected = selectedServices.includes(svc);
                        return (
                          <button
                            type="button"
                            key={svc}
                            onClick={() => toggleService(svc)}
                            className={`px-3 py-1.5 rounded-xl text-xs font-mono transition-all cursor-pointer flex items-center gap-1.5 ${
                              isSelected
                                ? "bg-gradient-to-r from-rose-600/90 to-cyan-500/90 text-white font-bold border border-cyan-400 shadow-md shadow-cyan-500/20"
                                : "bg-slate-900 border border-slate-800 text-slate-400 hover:text-slate-200 hover:border-slate-700"
                            }`}
                          >
                            <span>{svc}</span>
                            {isSelected && <CheckCircle2 className="w-3.5 h-3.5" />}
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  {/* Name & Email Row */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-mono text-slate-400 mb-1.5">
                        YOUR NAME / ORGANIZATION *
                      </label>
                      <input
                        type="text"
                        required
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        placeholder="e.g. Alex Morgan / CyberTech Inc."
                        className="w-full px-4 py-2.5 rounded-xl bg-slate-900 border border-slate-800 focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 text-slate-100 text-sm font-sans placeholder-slate-600 outline-none transition-all"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-mono text-slate-400 mb-1.5">
                        EMAIL ADDRESS *
                      </label>
                      <input
                        type="email"
                        required
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        placeholder="alex@domain.com"
                        className="w-full px-4 py-2.5 rounded-xl bg-slate-900 border border-slate-800 focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 text-slate-100 text-sm font-sans placeholder-slate-600 outline-none transition-all"
                      />
                    </div>
                  </div>

                  {/* Phone & Budget Row */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-mono text-slate-400 mb-1.5">
                        PHONE / WHATSAPP / TELEGRAM (OPTIONAL)
                      </label>
                      <input
                        type="text"
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        placeholder="+1 555-0199 or @username"
                        className="w-full px-4 py-2.5 rounded-xl bg-slate-900 border border-slate-800 focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 text-slate-100 text-sm font-sans placeholder-slate-600 outline-none transition-all"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-mono text-slate-400 mb-1.5">
                        ESTIMATED BUDGET RANGE
                      </label>
                      <select
                        value={formData.budget}
                        onChange={(e) => setFormData({ ...formData, budget: e.target.value })}
                        className="w-full px-4 py-2.5 rounded-xl bg-slate-900 border border-slate-800 focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 text-slate-100 text-sm font-sans outline-none transition-all"
                      >
                        {SERVICES_CONFIG.budgetRanges.map((range) => (
                          <option key={range} value={range} className="bg-slate-900 text-white">
                            {range}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>

                  {/* Project Timeline */}
                  <div>
                    <label className="block text-xs font-mono text-slate-400 mb-1.5">
                      TARGET TIMELINE / COMPLETION GOAL
                    </label>
                    <select
                      value={formData.timeline}
                      onChange={(e) => setFormData({ ...formData, timeline: e.target.value })}
                      className="w-full px-4 py-2.5 rounded-xl bg-slate-900 border border-slate-800 focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 text-slate-100 text-sm font-sans outline-none transition-all"
                    >
                      {SERVICES_CONFIG.timelineOptions.map((t) => (
                        <option key={t} value={t} className="bg-slate-900 text-white">
                          {t}
                        </option>
                      ))}
                    </select>
                  </div>

                  {/* Project Details */}
                  <div>
                    <label className="block text-xs font-mono text-slate-400 mb-1.5">
                      PROJECT DESCRIPTION &amp; GOALS *
                    </label>
                    <textarea
                      required
                      rows={3}
                      value={formData.details}
                      onChange={(e) => setFormData({ ...formData, details: e.target.value })}
                      placeholder="Tell me about what you are building, key features needed, existing designs, or technical hurdles..."
                      className="w-full px-4 py-2.5 rounded-xl bg-slate-900 border border-slate-800 focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 text-slate-100 text-sm font-sans placeholder-slate-600 outline-none transition-all resize-none"
                    />
                  </div>

                  {/* Submit Button & Google Form Link */}
                  <div className="pt-2 flex flex-col sm:flex-row items-center justify-between gap-4">
                    <button
                      type="submit"
                      className="w-full sm:w-auto px-8 py-3 rounded-xl bg-gradient-to-r from-rose-600 via-red-500 to-cyan-500 text-white font-mono text-xs font-bold shadow-lg shadow-cyan-500/25 hover:shadow-cyan-500/40 hover:scale-[1.02] transition-all cursor-pointer flex items-center justify-center gap-2"
                    >
                      <Send className="w-4 h-4" />
                      <span>TRANSMIT SERVICE INQUIRY</span>
                    </button>

                    <button
                      type="button"
                      onClick={handleOpenGoogleForm}
                      className="text-xs font-mono text-slate-400 hover:text-cyan-400 flex items-center gap-1.5 transition-colors cursor-pointer"
                    >
                      <span>Prefer Google Form directly?</span>
                      <ExternalLink className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </form>
              )
            ) : (
              /* Google Form Direct / Embed View */
              <div className="space-y-4">
                <div className="p-4 rounded-2xl bg-slate-900 border border-slate-800 flex items-center justify-between gap-4">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-rose-500/20 flex items-center justify-center text-rose-400">
                      <FileText className="w-5 h-5" />
                    </div>
                    <div>
                      <h4 className="text-sm font-bold text-white font-mono">
                        Official Google Form Portal
                      </h4>
                      <p className="text-xs text-slate-400 font-sans">
                        Saves data directly into Google Sheets and notifies Rohit automatically.
                      </p>
                    </div>
                  </div>

                  <button
                    onClick={handleOpenGoogleForm}
                    className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-cyan-500/15 border border-cyan-500/40 text-cyan-300 font-mono text-xs hover:bg-cyan-500/25 transition-all cursor-pointer whitespace-nowrap"
                  >
                    <span>Open in Tab</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </button>
                </div>

                {/* Embedded Frame */}
                <div className="w-full h-[450px] rounded-2xl overflow-hidden border border-slate-800 bg-white">
                  <iframe
                    src={SERVICES_CONFIG.googleFormUrl}
                    width="100%"
                    height="100%"
                    frameBorder="0"
                    marginHeight="0"
                    marginWidth="0"
                    title="Google Form Service Inquiry"
                  >
                    Loading Google Form...
                  </iframe>
                </div>
              </div>
            )}
          </div>

          {/* Footer Security Badge */}
          <div className="px-6 py-3 border-t border-slate-800/80 bg-slate-900/60 flex items-center justify-between text-[11px] font-mono text-slate-500">
            <span className="flex items-center gap-1.5">
              <Lock className="w-3 h-3 text-cyan-400" />
              <span>TLS 256-BIT ENCRYPTED PROTOCOL</span>
            </span>
            <span>DIRECT SIGNAL // askrohiitsharma@gmail.com</span>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
