import { Project, Certificate, Experience, Education } from '../types';

export const PERSONAL_INFO = {
  name: "Anmol S Poojary",
  preferredName: "Anmol",
  title: "Full-Stack Engineer & AI Practitioner",
  subtitle: "Computer Science Undergraduate building intelligent systems, robust web platforms, and applied AI products.",
  location: "Karnataka, India",
  email: "anmolspoojary@gmail.com",
  github: "https://github.com/AnmolS05",
  linkedin: "https://www.linkedin.com/in/anmol-s-poojary/",
  availability: "Software Engineer & Student",
  bio: "Computer Science undergraduate building full-stack products across frontend, backend, applied AI, and geospatial visualization. Experienced building and deploying side projects with React, Node.js, Python, Gemini-based workflows, and Leaflet.js.",
  stats: [
    { label: "Shipped Projects", value: "9+" },
    { label: "AI & Cloud Credentials", value: "11" },
    { label: "Graduation Year", value: "2027" },
    { label: "Core Competency", value: "AI + Full-Stack" },
  ]
};

export const PROJECTS: Project[] = [
  {
    id: "aeroinsight",
    name: "AeroInsight Intelligence",
    tag: "Featured Production",
    category: "ai",
    categoryLabel: "Applied AI & Geospatial",
    description: "Enterprise drone telemetry and real-time AI risk assessment platform. Combines dual AI inference pipelines (Google Gemini + Custom ML model) with geospatial flight maps to evaluate airborne hazard risk, geofence compliance, and flight telemetry.",
    detailedDescription: "AeroInsight bridges mission-critical drone flight data with generative AI reasoning. The system streams drone coordinates, battery health, atmospheric pressure, and velocity vectors to a dual-engine architecture: a tabular ML model for anomaly detection alongside Google Gemini for high-level risk contextualization and incident narrative generation.",
    technologies: ["React 19", "Node.js", "Google Gemini", "Tailwind CSS", "Leaflet.js", "GeoJSON"],
    liveUrl: "https://aero-insights-live.vercel.app/",
    githubUrl: "https://github.com/AnmolS05/AeroInsight",
    highlights: [
      "Dual AI pipeline fusing statistical telemetry risk models with Gemini's reasoning engine",
      "Interactive geospatial maps with no-fly zone bounds and dynamic corridor tracking",
      "Automated PDF flight safety reports and incident severity breakdowns"
    ],
    featured: true
  },
  {
    id: "capitalflow",
    name: "CapitalFlow Pro (CRM & Advisor)",
    tag: "Enterprise CRM",
    category: "fullstack",
    categoryLabel: "Full-Stack & Fintech",
    description: "Enterprise Indian Business CRM featuring automated financial health diagnostics, interactive Kanban deal pipelines, and an AI-Powered Financial Advisor.",
    detailedDescription: "Designed for modern commercial teams, CapitalFlow Pro unifies customer relationships with fiscal intelligence. Includes automated cash-flow forecasting, multi-stage sales opportunity tracking, and Gemini-assisted advisory reports tailored to Indian business tax structures.",
    technologies: ["React", "Node.js", "Gemini AI", "Tailwind CSS", "REST API"],
    githubUrl: "https://github.com/AnmolS05/AI-Powered-Sales-Intelligence-Dashboard",
    highlights: [
      "Dynamic Kanban sales pipeline with drag-and-drop deal stage management",
      "AI financial advisor providing automated burn-rate and cash-flow health diagnostics",
      "Comprehensive revenue ledger and client relationship analytics"
    ],
    featured: true
  },
  {
    id: "resume-ats",
    name: "AI Resume Screening ATS",
    tag: "Applied ML / NLP",
    category: "ai",
    categoryLabel: "Applied AI & NLP",
    description: "Intelligent Applicant Tracking System (ATS) automating multi-format resume ingestion, semantic skill extraction, and candidate ranking benchmarked against job requisitions.",
    detailedDescription: "Solves recruiter volume bottlenecks by extracting candidate competencies from unstructured PDFs and computing semantic fit scores against custom job descriptions using TF-IDF, vector similarity, and Google Gemini API reasoning.",
    technologies: ["React", "Python", "Flask", "SQLite", "Gemini API", "Scikit-Learn"],
    githubUrl: "https://github.com/AnmolS05/ML-based-Resume-Organization-and-Skills-based-Classification",
    highlights: [
      "Automated resume ingestion with skills-based classification and semantic ranking",
      "Recruiter dashboard for batch evaluation and talent qualification filtering",
      "Gemini-powered personalized gap feedback generation for candidate profiles"
    ],
    featured: true
  },
  {
    id: "scriberx",
    name: "ScribeRx",
    tag: "Healthcare AI",
    category: "ai",
    categoryLabel: "Multimodal AI",
    description: "AI-powered handwritten medical prescription digitizer and verification station using Google Gemini Vision-Language Model (VLM) for pharmacist workflow automation.",
    detailedDescription: "Transforms notoriously illegible doctor prescription handwriting into clean, structured digital records. ScribeRx utilizes Gemini VLM's multimodal capabilities to extract medication names, dosage frequencies, and duration, flagging ambiguous entries for pharmacist verification.",
    technologies: ["Python", "Gemini VLM", "React", "Tailwind CSS", "Computer Vision"],
    githubUrl: "https://github.com/AnmolS05/scriberx",
    highlights: [
      "Multimodal document OCR extracting medication names and instructions from handwritten prescriptions",
      "Structured output validation with confidence scores and dosage clarity checks",
      "Interactive verification station allowing pharmacists to confirm and export prescriptions"
    ],
    featured: false
  },
  {
    id: "inviman",
    name: "InviMan Inventory Management",
    tag: "Production System",
    category: "fullstack",
    categoryLabel: "Full-Stack System",
    description: "Production-grade Inventory Management System featuring automated low-stock replenishment signals, supplier performance analytics, and billing workflows.",
    detailedDescription: "Built with Node.js, Express, and MongoDB, InviMan handles multi-warehouse stock levels, SKU tracking, purchase order lifecycles, and predictive reorder notifications based on historical consumption patterns.",
    technologies: ["Node.js", "Express", "React", "MongoDB", "Tailwind CSS"],
    githubUrl: "https://github.com/AnmolS05/InviMan",
    highlights: [
      "Real-time inventory ledger with multi-warehouse tracking and automated safety thresholds",
      "Supplier order tracking and automated purchase order PDF generation",
      "Role-based dashboard for warehouse operators and procurement managers"
    ],
    featured: false
  },
  {
    id: "trendpulse",
    name: "TrendPulse Social Intelligence",
    tag: "Real-Time NLP",
    category: "ai",
    categoryLabel: "Applied AI & NLP",
    description: "Real-time social media trend intelligence and sentiment analysis platform aggregating streaming text data into actionable marketing and brand insights.",
    detailedDescription: "Ingests live social feeds, performs sentiment classification and keyword velocity tracking, and presents trends in real-time visual charts to help creators and brands monitor audience sentiment.",
    technologies: ["React", "Node.js", "Python", "NLP", "Data Visualization"],
    githubUrl: "https://github.com/AnmolS05/trendpulse",
    highlights: [
      "Real-time social stream processing and sentiment polarity classification",
      "Trend velocity algorithms highlighting rapidly emerging discourse topics",
      "Interactive data visualizers for comparative time-series analysis"
    ],
    featured: false
  },
  {
    id: "bisign3d",
    name: "BiSign3D Biometric Signature",
    tag: "Spatial ML",
    category: "graphics",
    categoryLabel: "3D & Computer Vision",
    description: "Advanced 3D Biometric Signature and spatial gesture recognition system utilizing WebGL coordinate tracing and machine learning for spoof-resistant identity authentication.",
    detailedDescription: "Captures 3D trajectory data (X, Y, pressure, velocity, acceleration vector) during signature execution. Uses a trained machine learning classifier to differentiate authentic user dynamics from visual forgery attempts.",
    technologies: ["Three.js", "WebGL", "Python", "TensorFlow", "React"],
    githubUrl: "https://github.com/AnmolS05/BiSign3D",
    highlights: [
      "Dynamic 3D pen trajectory capture recording stroke velocity and kinetic rhythm",
      "Machine learning classifier robust against static tracing and visual imitation",
      "Interactive WebGL viewport displaying 3D spatial velocity waveforms"
    ],
    featured: false
  },
  {
    id: "orbits",
    name: "Orbits Astrophysics Simulator",
    tag: "WebGL & Physics",
    category: "graphics",
    categoryLabel: "3D & Simulation",
    description: "Interactive 3D orbital mechanics and astrophysics visualizer. Accurately simulates gravitational n-body physics, planetary bodies, and satellite transfer trajectories in real-time.",
    detailedDescription: "Runs high-precision gravitational physics integration in JavaScript/WebGL. Users can inject custom celestial masses, adjust velocity vectors, observe orbital resonance, and track Keplerian trajectories with dynamic camera orbit controls.",
    technologies: ["Three.js", "WebGL", "React", "Physics Simulation", "GLSL"],
    githubUrl: "https://github.com/AnmolS05/Orbits",
    highlights: [
      "Real-time n-body gravitational physics solver with numerical orbital integration",
      "Interactive celestial body creation with mass, velocity, and trajectory controls",
      "Dynamic orbital trail renders with 60 FPS WebGL camera navigation"
    ],
    featured: false
  },
  {
    id: "fakenews",
    name: "Fake News Detection Engine",
    tag: "ML Classification",
    category: "ai",
    categoryLabel: "Machine Learning",
    description: "End-to-end machine learning pipeline for detecting misinformation in digital news articles using linguistic preprocessing, TF-IDF vectorization, and deep ensemble classification.",
    detailedDescription: "Analyzes lexical patterns, sensationalist framing, and semantic claims within news articles. Built with Scikit-Learn and Flask to serve instant inference for news validation benchmarks.",
    technologies: ["Python", "Scikit-Learn", "NLP", "Flask", "TF-IDF"],
    githubUrl: "https://github.com/AnmolS05/fake-news-detection",
    highlights: [
      "Feature engineering pipeline analyzing linguistic bias and lexical framing",
      "High accuracy classification evaluated on cross-validation news benchmarks",
      "Lightweight Flask microservice providing real-time text verification"
    ],
    featured: false
  }
];

export const CERTIFICATES: Certificate[] = [
  {
    id: "c1",
    name: "Develop AI-Powered Prototypes in Google AI Studio",
    issuer: "Google Cloud / AI Studio",
    category: "google",
    categoryLabel: "Google AI & Cloud",
    type: "Official Credential & Badge",
    verificationNote: "Demonstrated proficiency in building production prototypes with the Gemini API, multimodal prompting, and prompt tuning.",
    documentUrl: "/cer/DevelopAI-PoweredPrototypesinGoogleAIStudio_Badge20260820-21-7d0hbs.pdf"
  },
  {
    id: "c2",
    name: "Google Cloud Certificate",
    issuer: "Google Cloud",
    category: "google",
    categoryLabel: "Google AI & Cloud",
    type: "Professional Verification",
    verificationNote: "Verified knowledge of Google Cloud computing concepts, cloud infrastructure, and enterprise deployment services.",
    documentUrl: "/cer/CertificatewithDescription20260822-8-94icbk.pdf"
  },
  {
    id: "c3",
    name: "Explore Generative AI with Vertex AI Gemini API",
    issuer: "Google Cloud / Vertex AI",
    category: "google",
    categoryLabel: "Google AI & Cloud",
    type: "Official Certification & Badge",
    verificationNote: "Covers generative AI development, Vertex AI endpoints, fine-tuning concepts, and multimodal model invocation.",
    documentUrl: "/cer/explore-generative-ai-with-the-vertex-ai-gemini-api.pdf",
    badgeUrl: "/cer/explore-generative-ai-with-the-vertex-ai-gemini-api.png"
  },
  {
    id: "c4",
    name: "Create Your First Gemini Enterprise Application",
    issuer: "Google Cloud",
    category: "google",
    categoryLabel: "Google AI & Cloud",
    type: "Enterprise Course Certification",
    verificationNote: "Architecture and design principles for deploying resilient enterprise applications powered by the Gemini model family.",
    documentUrl: "/cer/first gemini enterprise application.pdf",
    badgeUrl: "/cer/create-your-first-gemini-enterprise-application.png"
  },
  {
    id: "c5",
    name: "Microsoft AI Innovation Series — Credential 1",
    issuer: "Microsoft",
    category: "microsoft",
    categoryLabel: "Microsoft AI",
    type: "Technical Certificate",
    verificationNote: "Foundational AI capabilities, cognitive services, and machine learning pipeline fundamentals.",
    documentUrl: "/cer/WhatsApp Image 2026-08-19 at 10.57.59 (1).jpeg"
  },
  {
    id: "c6",
    name: "Microsoft AI Innovation Series — Credential 2",
    issuer: "Microsoft",
    category: "microsoft",
    categoryLabel: "Microsoft AI",
    type: "Technical Certificate",
    verificationNote: "Applied AI models, conversational agents, and natural language processing architectures.",
    documentUrl: "/cer/WhatsApp Image 2026-08-19 at 10.57.59 (2).jpeg"
  },
  {
    id: "c7",
    name: "Microsoft AI Innovation Series — Credential 3",
    issuer: "Microsoft",
    category: "microsoft",
    categoryLabel: "Microsoft AI",
    type: "Technical Certificate",
    verificationNote: "Computer vision workflows, feature extraction, and automated decision-support systems.",
    documentUrl: "/cer/WhatsApp Image 2026-08-19 at 10.57.59.jpeg"
  },
  {
    id: "c8",
    name: "Microsoft AI Innovation Series — Credential 4",
    issuer: "Microsoft",
    category: "microsoft",
    categoryLabel: "Microsoft AI",
    type: "Technical Certificate",
    verificationNote: "Responsible AI development, ethical model deployment, and algorithmic fairness validation.",
    documentUrl: "/cer/WhatsApp Image 2026-08-19 at 11.34.22.jpeg"
  },
  {
    id: "c9",
    name: "Delhi University Technical Certification",
    issuer: "Delhi University",
    category: "academic",
    categoryLabel: "Academic Achievement",
    type: "Academic Certification",
    verificationNote: "Advanced technical coursework and certified project execution in computing systems.",
    documentUrl: "/cer/anmol-du.pdf"
  }
];

export const EXPERIENCES: Experience[] = [
  {
    id: "dlithe",
    role: "AI & Machine Learning Intern",
    organization: "DLithe Consultancy Services",
    period: "Summer Intern (8 Weeks)",
    type: "Internship",
    location: "Karnataka, India",
    description: "Worked on real-world applied machine learning problems, developing and evaluating prediction pipelines and classification algorithms for client datasets.",
    skills: ["Python", "Scikit-Learn", "Machine Learning", "Data Processing", "Model Evaluation"],
    achievements: [
      "Engineered tabular data preprocessing pipelines for outlier handling and feature transformation",
      "Trained and evaluated classification algorithms with cross-validated ROC-AUC benchmarks",
      "Collaborated with senior engineers to containerize and deploy inference scripts for client data teams"
    ]
  },
  {
    id: "acm",
    role: "Technical Committee Member",
    organization: "ACM Student Chapter, NMAMIT",
    period: "2023 — Present",
    type: "Leadership & Community",
    location: "NMAMIT Campus",
    description: "Active technical organizer and mentor for the university's Association for Computing Machinery student chapter.",
    skills: ["Community Leadership", "Event Coordination", "Technical Workshops", "Competitive Coding"],
    achievements: [
      "Co-organized university-wide coding contests and hackathons engaging 300+ engineering participants",
      "Delivered hands-on technical workshops introducing junior students to Git, web development, and algorithms",
      "Contributed to student portal tooling and event operations platforms"
    ]
  }
];

export const EDUCATION: Education = {
  institution: "NMAM Institute of Technology (Nitte Deemed to be University)",
  degree: "Bachelor of Technology (B.Tech)",
  field: "Computer Science and Engineering",
  period: "2023 — 2027",
  status: "Undergraduate (3rd Year)",
  location: "Nitte, Karnataka, India",
  highlights: [
    "Core Coursework: Data Structures & Algorithms, Object-Oriented Design, Operating Systems, Database Management Systems, Computer Networks, Machine Learning",
    "Active participant in collegiate hackathons, open source initiatives, and technical symposiums",
    "Strong emphasis on practical software architecture and applied AI engineering"
  ]
};

export const SKILL_GROUPS = [
  {
    category: "Languages",
    description: "Core programming languages used for systems and applications",
    skills: [
      { name: "Python", highlight: true },
      { name: "TypeScript", highlight: true },
      { name: "JavaScript (ES6+)", highlight: true },
      { name: "C++", highlight: false },
      { name: "SQL", highlight: false },
      { name: "HTML5 / CSS3", highlight: false },
    ]
  },
  {
    category: "Applied AI & Machine Learning",
    description: "Generative AI, multimodal vision models, and classical ML",
    skills: [
      { name: "Google Gemini API", highlight: true },
      { name: "Multimodal VLM (Vision)", highlight: true },
      { name: "Prompt Engineering & RAG", highlight: true },
      { name: "Scikit-Learn", highlight: false },
      { name: "NLP & Tokenization", highlight: false },
      { name: "TensorFlow Fundamentals", highlight: false },
    ]
  },
  {
    category: "Frontend Engineering",
    description: "Modern component-driven web interfaces & graphical visualization",
    skills: [
      { name: "React 19 & React 18", highlight: true },
      { name: "Next.js Patterns", highlight: true },
      { name: "Tailwind CSS", highlight: true },
      { name: "Three.js & WebGL", highlight: true },
      { name: "Motion Animations", highlight: false },
      { name: "Leaflet.js Geospatial", highlight: false },
    ]
  },
  {
    category: "Backend, Cloud & Databases",
    description: "Server architectures, data persistence, and cloud environments",
    skills: [
      { name: "Node.js & Express", highlight: true },
      { name: "Python Flask", highlight: false },
      { name: "RESTful API Architecture", highlight: true },
      { name: "Google Cloud Platform", highlight: true },
      { name: "Vertex AI & Google AI Studio", highlight: true },
      { name: "MongoDB & SQLite", highlight: false },
      { name: "Git & GitHub Versioning", highlight: false },
    ]
  }
];

export const SUGGESTED_QUESTIONS = [
  "How does the AeroInsight dual-AI risk engine work?",
  "Tell me about Anmol's production full-stack experience",
  "What ML algorithms did he deploy during his DLithe internship?",
  "How does ScribeRx verify handwritten medical prescriptions?",
  "What is Anmol's availability for upcoming software engineering roles?"
];
