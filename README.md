# Full-Stack & AI Systems Engineer Portfolio (v2.1.0)

[![Live Production](https://img.shields.io/badge/Production-Live%20on%20Vercel-000?style=for-the-badge&logo=vercel&logoColor=white)](https://anmolss-portfolio.vercel.app)
[![React](https://img.shields.io/badge/React%2019-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)](https://react.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript%205.8-007ACC?style=for-the-badge&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Vite](https://img.shields.io/badge/Vite%206-646CFF?style=for-the-badge&logo=vite&logoColor=white)](https://vitejs.dev/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind%20CSS%204-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)](https://tailwindcss.com/)
[![Google Gemini](https://img.shields.io/badge/Google%20Gen%20AI-8E75C2?style=for-the-badge&logo=google&logoColor=white)](https://ai.google.dev/)

A production-grade, high-performance engineering portfolio and interactive systems showcase built with **React 19**, **Vite**, **TypeScript**, **Tailwind CSS**, and an integrated **Express / Vercel Serverless AI Copilot** powered by Google Generative AI (`@google/genai`).

🌐 **Live URL**: [https://anmolss-portfolio.vercel.app](https://anmolss-portfolio.vercel.app)

---

## 🚀 Key Highlights & Architecture (v2.1.0)

- **Modern Architecture**: Promoted from a legacy static layout to a modular React 19 + TypeScript + Vite architecture with zero hydration latency and sub-second asset bundling.
- **AI Engineering Copilot (`/api/chat`)**:
  - Dual-mode deployment: Express REST backend locally (`tsx server.ts`) and Vercel Edge/Serverless function in cloud production (`api/chat.ts`).
  - Grounded model integration with Gemma / Gemini models via Google GenAI SDK (`@google/genai`).
  - **10s Request Timeout Race** to prevent connection starvation.
  - **Sliding-Window Rate Limiting** (`express-rate-limit`, 30 req / 15 min per IP) and strict payload size capping (`16kb`).
  - Context window guard (last 4 turns, 500-char cap) and heuristic offline fallback engine.
- **In-Page Credential Viewer**:
  - Instant in-situ preview for verified accreditations (Google Cloud, Google AI Studio, Vertex AI, Microsoft AI Innovation, Academic).
  - Embedded responsive `<object>` / `<iframe>` PDF viewer with toolbar suppression and cross-platform fallback controls.
  - "Open Full View" action for mobile / restricted WebKit browser compatibility.
- **Production Hardening**:
  - HTTP security headers with `helmet` and custom Content Security Policy (`CSP`).
  - Edge cache control headers (`Cache-Control: public, max-age=31536000, immutable`) for documents and assets.
  - Guarded internal container scrolling eliminating unwanted viewport jumps on startup.

---

## 🛠️ Tech Stack

| Layer | Technologies |
| :--- | :--- |
| **Frontend Framework** | React 19, TypeScript 5.8, Vite 6 |
| **Styling & UI** | Tailwind CSS v4, Lucide Icons, Motion (Framer Motion) |
| **AI / Machine Learning** | Google Gen AI SDK (`@google/genai`), Gemma 4 26B, Gemini APIs |
| **Server & Serverless** | Node.js 22.x, Express, Vercel Serverless Functions (`api/chat.ts`), esbuild |
| **Security & Resilience** | Helmet, Express Rate Limit, Content Security Policy |
| **Deployment & CI/CD** | Vercel Edge Network, GitHub Releases |

---

## 💻 Local Development Setup

### 1. Prerequisites
- Node.js (v18+ or v22.x recommended)
- npm or yarn

### 2. Clone & Install
```bash
git clone https://github.com/AnmolS05/Portfolio.git
cd Portfolio
npm install
```

### 3. Configure Environment
Copy `.env.example` to `.env.local` (or `.env`):
```bash
cp .env.example .env.local
```
Provide your Google Gemini API key:
```env
GEMINI_API_KEY=your_actual_gemini_api_key_here
PORT=3000
```

### 4. Start Development Server
Starts Vite dev server and Express API gateway concurrently:
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) in your browser.

### 5. Production Build & Local Test
```bash
npm run build
npm start
```

---

## 📂 Project Structure

```
Portfolio/
├── public/                 # Static assets, certificate PDFs, images, resume
│   ├── Anmol_S__resume.pdf
│   └── cer/                # Verified certificate documents & badges
├── api/                    # Vercel serverless functions
│   └── chat.ts             # Production serverless AI Copilot endpoint
├── src/
│   ├── components/         # Modular React UI components
│   │   ├── Navbar.tsx
│   │   ├── Hero.tsx
│   │   ├── ProjectsSection.tsx
│   │   ├── SkillsMatrix.tsx
│   │   ├── CertificatesSection.tsx # In-page PDF/Image certificate viewer
│   │   ├── AiChatSection.tsx       # Grounded engineering copilot
│   │   ├── AiFloatingChat.tsx      # Floating interactive assistant
│   │   ├── ExperienceEducation.tsx
│   │   ├── ContactSection.tsx
│   │   ├── ProjectModal.tsx
│   │   ├── ResumeModal.tsx
│   │   └── Footer.tsx
│   ├── data/
│   │   └── portfolioData.ts # Centralized typed portfolio & credentials data
│   ├── types.ts            # TypeScript interfaces
│   ├── App.tsx             # Root application component
│   └── main.tsx            # Application entry point
├── server.ts               # Express backend API & static asset server
├── vercel.json             # Vercel deployment, SPA routing, and security headers
├── .vercelignore           # Build exclusions
├── vite.config.ts          # Vite configuration
├── tsconfig.json           # TypeScript configuration
└── package.json            # Scripts & dependencies (v2.1.0)
```

---

## 📄 License

This repository is licensed under the [MIT License](LICENSE).
