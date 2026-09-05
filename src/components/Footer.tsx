import { ArrowUp, Github, Linkedin, Mail } from "lucide-react";
import { PERSONAL_INFO } from "../data/portfolioData";

export default function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="border-t border-white/[0.08] bg-[#070a12] py-12 text-slate-400 text-xs font-mono">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 flex flex-col md:flex-row items-center justify-between gap-6">
        {/* Brand & Copyright */}
        <div className="space-y-1 text-center md:text-left">
          <div className="text-sm font-bold text-white font-sans">
            {PERSONAL_INFO.name}
          </div>
          <p className="text-slate-500">
            Crafted with React, Tailwind CSS, TypeScript & Google Gemini
          </p>
        </div>

        {/* Quick Links & Social */}
        <div className="flex items-center gap-6">
          <a
            href={PERSONAL_INFO.github}
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-white transition-colors flex items-center gap-1.5"
          >
            <Github className="w-4 h-4" />
            <span>GitHub</span>
          </a>
          <a
            href={PERSONAL_INFO.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-white transition-colors flex items-center gap-1.5"
          >
            <Linkedin className="w-4 h-4" />
            <span>LinkedIn</span>
          </a>
          <a
            href={`mailto:${PERSONAL_INFO.email}`}
            className="hover:text-white transition-colors flex items-center gap-1.5"
          >
            <Mail className="w-4 h-4" />
            <span>Email</span>
          </a>
        </div>

        {/* Back to top */}
        <button
          onClick={scrollToTop}
          id="scroll-to-top-btn"
          className="flex items-center gap-1.5 px-3 py-2 rounded-lg bg-white/[0.03] hover:bg-white/[0.08] border border-white/[0.08] text-slate-300 hover:text-white transition-colors"
          title="Scroll to top"
        >
          <span>Top</span>
          <ArrowUp className="w-3.5 h-3.5" />
        </button>
      </div>
    </footer>
  );
}
