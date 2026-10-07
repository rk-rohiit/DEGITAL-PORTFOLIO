// src/config/servicesConfig.js
// Configuration for Services Inquiry & Google Form Integration

export const SERVICES_CONFIG = {
  // PASTE YOUR GOOGLE FORM LINK HERE
  // If you provide an embed link (.../viewform?embedded=true), it displays directly inside the Cyber Modal!
  // If you provide a standard link (.../viewform), it also gives clients an option to open in a new tab.
  googleFormUrl: "https://forms.gle/1h2p3c4d5e6f7g8h9i0j1k2l3m4n5o6p",

  // Developer contact email for fallback direct notification
  recipientEmail: "[EMAIL_ADDRESS]",

  // Services matching the portfolio offerings
  servicesList: [
    "Full-Stack Web Engineering",
    "AI & Intelligent Automation",
    "Interactive 3D & Creative Web",
    "Cloud Architecture & DevOps",
    "UI/UX & Design Systems",
    "Database Architecture & REST APIs",
  ],

  budgetRanges: [
    "<$500 (Starter / Mini Project)",
    "$500 - $1,500 (Standard Production)",
    "$1,500 - $3,500 (Enterprise / Complex)",
    "$3,500+ (Full Suite / Long-Term)",
  ],

  timelineOptions: [
    "Urgent (< 2 weeks)",
    "2 - 4 weeks",
    "1 - 3 months",
    "Flexible / Ongoing Contract",
  ],
};
