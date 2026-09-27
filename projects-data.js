/**
 * projects-data.js
 * Simplified case study information for Eduardo Lougon's portfolio projects.
 */

export const projectsData = {
  olympiads: {
    id: "olympiads",
    number: "01",
    title: "O(lympiads)",
    tagline: "AI-Powered Competitive Programming & Algorithmic Education Platform",
    role: "UI/UX Design & FullStack Dev.",
    category: "EdTech / Competitive Programming",
    period: "2024 — 2026",
    liveUrl: "https://olympiads.dev/",
    heroImage: "Images/OlympiadsImage.webp",
    gallery: [
      "Images/OlympiadsImage.webp"
    ],
    techStack: [
      { name: "React", logo: "Images/ReactLogo.svg", role: "Frontend UI & Component Architecture" },
      { name: "Django", logo: "Images/DjangoLogo.svg", role: "Backend Architecture & API" },
      { name: "PostgreSQL", logo: "Images/PostgresLogo.svg", role: "Relational Database & User Records" },
      { name: "Figma", logo: "Images/FigmaLogo.svg", role: "UI/UX Wireframes & Design System" }
    ],
    company: "O(lympiads) is an EdTech platform designed to train high school students and programmers for computer science olympiads. It leverages AI to generate an infinite stream of unique algorithmic problems across diverse data structures and difficulty levels.",
    myWork: "Led UI/UX design and full-stack development. Crafted the dark-mode developer interface in Figma and built the frontend in React. On the backend, engineered AI pipelines to generate infinite problems and integrated Piston for secure, sandboxed code execution with real-time verdicts."
  },

  pethero: {
    id: "pethero",
    number: "02",
    title: "PetHero",
    tagline: "Pet Care Landing Page & Business Management System",
    role: "UI/UX Design & FullStack Dev.",
    category: "Full-Stack Web App & SaaS",
    period: "2026 — Present",
    liveUrl: "https://petherooficial.com/",
    heroImage: "Images/PetHeroImage.webp",
    gallery: [
      "Images/PetHeroImage.webp"
    ],
    techStack: [
      { name: "React", logo: "Images/ReactLogo.svg", role: "Frontend Application & Dashboard Views" },
      { name: "Firebase", logo: "Images/FirebaseLogo.svg", role: "Realtime Database, Auth & Cloud Storage" },
      { name: "Figma", logo: "Images/FigmaLogo.svg", role: "End-to-End Design System & Prototypes" }
    ],
    company: "PetHero São Francisco is a premier pet care center in Niterói, RJ. Built on a 100% cage-free and low-stress philosophy, it offers daycare, hotel, grooming, veterinary services, and an on-site cafe.",
    myWork: "Built a landing page and also a full pet care management system that is used daily by staff to make operations efficient. The system manages appointments, payments, important pet data, client loyalty program, and more. It is going to be implemented in the upcoming franchise plan for all PetHero units."
  },

  corretar: {
    id: "corretar",
    number: "03",
    title: "Corretar",
    tagline: "Real Estate Agent Personal Management Mobile App",
    role: "UI/UX Design & Frontend Dev.",
    category: "PropTech / Mobile Application",
    period: "2026 — Present",
    liveUrl: "#",
    heroImage: "Images/CorretarImage.webp",
    gallery: [
      "Images/CorretarImage.webp"
    ],
    techStack: [
      { name: "React Native", logo: "Images/ReactLogo.svg", role: "Cross-Platform Mobile App Development" },
      { name: "Figma", logo: "Images/FigmaLogo.svg", role: "Screen Design, Wireframes & UI Prototypes" }
    ],
    company: "Corretar is a personal management mobile app for real estate agents currently under development, created to streamline brokers' daily operations, client interactions, and property listings.",
    myWork: "Responsible for building the entire frontend of the app, from designing the screens in Figma to coding in React Native in collaboration with the backend team as regular feedback was received."
  },

  poucher: {
    id: "poucher",
    number: "04",
    title: "Poucher",
    tagline: "E-Commerce & Landing Page for Brazil's Leading Ergonomic Underwear Brand",
    role: "UI/UX Design & Frontend Dev.",
    category: "E-Commerce / D2C Fashion",
    period: "2025 — Present",
    liveUrl: "https://poucher.com.br/",
    heroImage: "Images/PoucherLanding.webp",
    gallery: [
      "Images/PoucherLanding.webp",
      "Images/PoucherSales.webp",
      "Images/PoucherImage.webp"
    ],
    techStack: [
      { name: "HTML", logo: "Images/HtmlLogo.svg", role: "Semantic Markup & Structure" },
      { name: "CSS", logo: "Images/CssLogo.svg", role: "Custom Responsive Design & Fluid Typography" },
      { name: "JavaScript", logo: "Images/JavaScriptLogo.svg", role: "Dynamic Cart Logic, Tier Pricing & Interactive UI" },
      { name: "Figma", logo: "Images/FigmaLogo.svg", role: "Brand Identity, Design System & E-Commerce Wireframes" }
    ],
    company: "Poucher (poucher.com.br) is a Brazilian premium menswear brand known for its innovative ergonomic underwear featuring the patented Sistema Pouch technology for all-day comfort.",
    myWork: "Designed and developed the brand's direct-to-consumer (D2C) e-commerce landing page and sales checkout flow. Handled design in Figma and built the frontend with HTML, CSS, and JavaScript, featuring interactive bundle builders (Kit 3, 5, 10), measurement guides, and WhatsApp direct checkout."
  }
};
