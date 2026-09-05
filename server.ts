import express from "express";
import path from "path";
import dotenv from "dotenv";
import { createServer as createViteServer } from "vite";
import { GoogleGenAI } from "@google/genai";
import helmet from "helmet";
import rateLimit from "express-rate-limit";

dotenv.config();

const app = express();
const PORT = process.env.PORT ? parseInt(process.env.PORT, 10) : 3000;

// Security Headers with permissive CSP for self-hosted PDF objects/iframes
app.use(
  helmet({
    contentSecurityPolicy: {
      directives: {
        defaultSrc: ["'self'"],
        scriptSrc: ["'self'", "'unsafe-inline'", "'unsafe-eval'"],
        styleSrc: ["'self'", "'unsafe-inline'", "https://fonts.googleapis.com"],
        fontSrc: ["'self'", "https://fonts.gstatic.com", "data:"],
        imgSrc: ["'self'", "data:", "blob:", "https:"],
        objectSrc: ["'self'", "blob:", "data:"],
        frameSrc: ["'self'", "blob:", "data:"],
        connectSrc: ["'self'", "https://generativelanguage.googleapis.com", "https://*.google.com"],
      },
    },
    crossOriginEmbedderPolicy: false,
  })
);

// Payload size capping to prevent memory exhaustion
app.use(express.json({ limit: "16kb" }));

// Rate limiter for Chat API (max 30 queries per 15 minutes per IP)
const chatRateLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 30,
  standardHeaders: true,
  legacyHeaders: false,
  message: {
    reply: "Rate limit reached for AI queries. Please wait a few minutes before asking another question, or reach Anmol directly via email at anmolspoojary@gmail.com.",
  },
});

// Lazy-initialized Gemini client
let genAIClient: GoogleGenAI | null = null;
function getGenAI(): GoogleGenAI | null {
  if (!process.env.GEMINI_API_KEY) return null;
  if (!genAIClient) {
    genAIClient = new GoogleGenAI({
      apiKey: process.env.GEMINI_API_KEY,
      httpOptions: {
        headers: {
          "User-Agent": "aistudio-build",
        },
      },
    });
  }
  return genAIClient;
}

const SYSTEM_PROMPT = `You are "AI Anmol", an intelligent, friendly, and articulate AI representative for Anmol S Poojary's personal portfolio.
Answer visitor questions (recruiters, engineering managers, fellow developers, clients) directly, concisely, and professionally.

ANMOL S POOJARY'S PROFILE:
- Current Status: Final Year (4th Year) Computer Science undergraduate at NMAM Institute of Technology (2023–2027), B.Tech in CSE.
- Engineering Focus: Full-Stack Web Development, Applied AI Systems with Gemini, and Geospatial Visualizations.
- Location: Karnataka, India.
- Contact: Email: anmolspoojary@gmail.com | LinkedIn: https://www.linkedin.com/in/anmol-s-poojary/ | GitHub: https://github.com/AnmolS05

CORE WORK & EXPERIENCE:
1. DLithe Consultancy Services — AI & ML Intern (8 Weeks):
   - Worked on applied machine learning projects, engineering classification & predictive modeling pipelines.
2. ACM NMAMIT — Technical Committee Member:
   - Led technical workshops, hackathons, and coding competitions for the NMAMIT student body.

KEY PROJECTS (Featured):
1. AeroInsight Intelligence:
   - Enterprise drone telemetry & AI risk assessment platform.
   - Dual AI pipelines (Google Gemini + Custom ML model) analyzing telemetry streams and aerial safety.
   - Tech: React, Node.js, Google Gemini, Tailwind CSS, Leaflet.js. Live at https://aero-insights-live.vercel.app/
2. CapitalFlow Pro:
   - Indian Business CRM & AI Financial Advisor with automated expense intelligence and Kanban sales pipeline.
   - Tech: React, Node.js, Gemini AI, Tailwind CSS.
3. AI Resume Screening ATS:
   - Automated candidate ranking, skills classification, and email ingestion system using NLP & Gemini.
   - Tech: React, Python, Flask, SQLite, Gemini API.
4. ScribeRx:
   - Medical prescription digitizer and analyzer using Google Gemini VLM (Vision-Language Model).
   - Tech: Python, Gemini VLM, React, Tailwind CSS.
5. InviMan:
   - Production inventory management platform with automated restocking signals and billing analytics.
   - Tech: Node.js, Express, React, MongoDB.
6. TrendPulse:
   - Real-time social media sentiment tracker and trend clustering engine.
   - Tech: React, Node.js, Python, NLP.
7. BiSign3D:
   - 3D Biometric signature & spatial gesture recognition authentication system.
   - Tech: Three.js, Python, TensorFlow, React.
8. Orbits:
   - Interactive 3D orbital mechanics and astrophysics trajectory simulation.
   - Tech: Three.js, WebGL, React, Physics simulation.
9. Fake News Detection:
   - NLP classification pipeline detecting misinformation using TF-IDF and deep learning.
   - Tech: Python, Scikit-Learn, Flask.

SKILLS & STACK:
- Languages: Python, C++, TypeScript, JavaScript, SQL, HTML/CSS.
- Applied AI & ML: Google Gemini (API, Vision VLM, RAG workflows), Prompt Engineering, Scikit-Learn, TensorFlow, NLP pipelines.
- Frontend: React 19, Next.js patterns, Tailwind CSS, Three.js, WebGL, Motion, Leaflet.js.
- Backend & Cloud: Node.js, Express, Flask, REST APIs, Google Cloud Platform, Vertex AI, SQLite, MongoDB.

CERTIFICATIONS:
- Google Cloud Certificate
- Develop AI-Powered Prototypes in Google AI Studio
- Explore Generative AI with Vertex AI Gemini API
- Create Your First Gemini Enterprise Application
- Microsoft AI Innovation Series (4 Certifications)
- Delhi University Certification

INSTRUCTIONS:
- Speak in first-person as Anmol's AI copilot ("I can tell you about Anmol's...", or "Anmol built...").
- Keep answers crisp (2-4 sentences or tight bullet points), confident, and authentic.
- Highlight his hands-on engineering mindset: building production prototypes and solid full-stack foundations.
- Do not mention or add phrases like "powered by Google Gemini" or "powered by Google DeepMind" or similar branding disclaimers.
- If asked how to reach Anmol or hire him, provide his email (anmolspoojary@gmail.com) and LinkedIn link.`;

// API routes
app.get("/api/health", (_req, res) => {
  res.json({ status: "ok", engineer: "Anmol S Poojary" });
});

app.post("/api/chat", chatRateLimiter, async (req, res) => {
  try {
    const { message, history } = req.body;
    if (!message || typeof message !== "string") {
      return res.status(400).json({ error: "Message is required" });
    }

    // Input sanitization and length capping (protect against prompt bloat)
    const sanitizedMessage = message.trim().slice(0, 500);
    if (!sanitizedMessage) {
      return res.status(400).json({ error: "Valid message content is required" });
    }

    const ai = getGenAI();

    if (ai) {
      // Format chat contents with context (limit to last 4 turns)
      const chatContents: Array<{ role: string; parts: Array<{ text: string }> }> = [];

      if (Array.isArray(history)) {
        for (const item of history.slice(-4)) {
          if (item && item.text && (item.role === "user" || item.role === "model")) {
            chatContents.push({
              role: item.role,
              parts: [{ text: String(item.text).slice(0, 500) }],
            });
          }
        }
      }

      chatContents.push({
        role: "user",
        parts: [{ text: sanitizedMessage }],
      });

      // Wrap outbound call with a 10-second timeout promise
      const timeoutMs = 10000;
      const generatePromise = ai.models.generateContent({
        model: "gemma-4-26b-a4b-it",
        contents: chatContents,
        config: {
          systemInstruction: SYSTEM_PROMPT,
          temperature: 0.7,
        },
      });

      const timeoutPromise = new Promise((_, reject) =>
        setTimeout(() => reject(new Error("Upstream LLM timeout")), timeoutMs)
      );

      const response: any = await Promise.race([generatePromise, timeoutPromise]);
      const reply = response.text || "I'm ready to answer any questions about Anmol's work and experience!";
      return res.json({ reply });
    } else {
      // Smart offline fallback if GEMINI_API_KEY is not yet attached
      const q = message.toLowerCase();
      let fallbackReply = "Hi! I'm Anmol's AI assistant. Anmol is a Computer Science undergraduate (2023–2027) building full-stack products, applied AI workflows with Gemini, and geospatial systems. Feel free to explore his projects or email him at anmolspoojary@gmail.com!";

      if (q.includes("project") || q.includes("build") || q.includes("work")) {
        fallbackReply = "Anmol has built 9+ featured projects, including AeroInsight (an enterprise drone telemetry & AI risk platform with dual Gemini + ML pipelines, live at aero-insights-live.vercel.app), CapitalFlow Pro (business CRM & AI financial advisor), ScribeRx (handwritten prescription digitizer using Gemini VLM), and AI Resume ATS. Check out the Projects section for live demos and code repositories!";
      } else if (q.includes("skill") || q.includes("stack") || q.includes("tech") || q.includes("python") || q.includes("react")) {
        fallbackReply = "Anmol's core stack includes Python, TypeScript/JavaScript, C++, React, Node.js, Express, Flask, Tailwind CSS, Three.js, and SQL. On the AI side, he specializes in Google Gemini APIs, prompt engineering, multimodal VLM workflows, and RAG architectures.";
      } else if (q.includes("intern") || q.includes("experience") || q.includes("job") || q.includes("hire") || q.includes("available")) {
        fallbackReply = "Anmol is actively available for Software Engineering Internships and Junior Full-Stack / AI roles! He previously interned as an AI & ML Intern at DLithe Consultancy Services (8 weeks) and serves as an ACM NMAMIT Technical Committee Member. You can reach him directly at anmolspoojary@gmail.com.";
      } else if (q.includes("contact") || q.includes("email") || q.includes("linkedin")) {
        fallbackReply = "You can contact Anmol directly via email at anmolspoojary@gmail.com, connect on LinkedIn (linkedin.com/in/anmol-s-poojary), or check out his open-source work on GitHub (github.com/AnmolS05).";
      } else if (q.includes("certificate") || q.includes("google") || q.includes("cloud")) {
        fallbackReply = "Anmol holds credentials including the Google Cloud Certificate, Develop AI-Powered Prototypes in Google AI Studio, Vertex AI Gemini API certification, and Microsoft AI Innovation certificates. You can view all certificates in the Credentials section!";
      }

      return res.json({ reply: fallbackReply });
    }
  } catch (error: any) {
    console.error("Chat API error:", error);
    return res.status(200).json({
      reply: "Anmol is a Computer Science undergraduate and full-stack developer with expertise in React, Node.js, Python, and applied AI systems. You can reach him at anmolspoojary@gmail.com or connect via LinkedIn!",
    });
  }
});

async function startServer() {
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (_req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://0.0.0.0:${PORT}`);
  });
}

startServer();
