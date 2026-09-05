# Full-Stack & AI Systems Engineer Portfolio (v2.0.0)

A high-performance, modern engineering portfolio and interactive showcase built with **React 19**, **Vite**, **TypeScript**, **Tailwind CSS**, and an integrated **Express + Gemini 2.5 Flash / Gemma AI** copilot.

---

## Key Highlights & Features

- **Modern Architecture**: Promoted from legacy static layout to a modular React 19 + TypeScript + Vite architecture.
- **AI Engineering Copilot**: Interactive full-stack chatbot with server-side proxy (`/api/chat`) for secure Gemini API integration, dynamic streaming, and intelligent grounding on engineering projects, architecture, and background.
- **In-Page Credential Viewer**: Instant, in-situ modal previewing for verified certificates (embedded PDF & high-resolution documents) without navigating away or opening external raw pages.
- **Deep Technical Showcase**:
  - Full-Stack & Distributed Systems projects with live deployment links, architecture highlights, and source repositories.
  - Interactive Skill Matrix covering AI/ML, Cloud & Distributed Systems, Backend Architecture, and Frontend Engineering.
  - Interactive System Design & Tech Stack Explorer.
  - Project search, category filtering, and responsive glassmorphism aesthetic.
- **Production-Ready**: High-efficiency bundling via Vite + esbuild, zero lint errors, and zero hydration latency.

---

## Tech Stack

- **Frontend**: React 19, TypeScript, Tailwind CSS, Lucide Icons, Motion
- **Backend / API**: Node.js, Express, tsx, esbuild
- **AI / LLM Integration**: Google Gen AI SDK (`@google/genai`), Google Gemini / Gemma models
- **Tooling**: Vite, TypeScript 5.8

---

## Getting Started Locally

### 1. Prerequisites
- Node.js (v18+ recommended)
- npm or yarn

### 2. Installation
```bash
git clone https://github.com/AnmolS05/Portfolio.git
cd Portfolio
npm install
```

### 3. Environment Setup
Copy `.env.example` to `.env` (or `.env.local`):
```bash
cp .env.example .env
```
Set your Google Gemini API key:
```env
GEMINI_API_KEY=your_actual_gemini_api_key_here
PORT=3000
```

### 4. Development Server
Run the local dev server (starts Vite + Express API backend concurrently):
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) in your browser.

### 5. Production Build
```bash
npm run build
npm start
```

---

## Project Structure

```
Portfolio/
├── public/                 # Static assets, certificate PDFs, images, resume
│   └── cer/                # Verified certificate documents
├── src/
│   ├── components/         # React UI modules
│   │   ├── Navigation.tsx
│   │   ├── HeroSection.tsx
│   │   ├── ProjectsSection.tsx
│   │   ├── SkillsSection.tsx
│   │   ├── CertificatesSection.tsx # In-page PDF/Image certificate viewer
│   │   ├── AIChatBot.tsx   # Interactive engineering copilot
│   │   ├── ContactSection.tsx
│   │   └── ...
│   ├── data/
│   │   └── portfolioData.ts # Centralized typed portfolio & credentials data
│   ├── types.ts            # TypeScript interfaces
│   ├── App.tsx             # Root application component
│   └── main.tsx            # Application entry point
├── server.ts               # Express backend API & static asset server
├── vite.config.ts          # Vite configuration
├── tsconfig.json           # TypeScript configuration
└── package.json            # Scripts & dependencies (v2.0.0)
```

---

## License

This project is open source and available under the [MIT License](LICENSE).
