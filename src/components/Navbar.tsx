import { useState, useEffect } from "react";
import { 
  Sparkles, 
  FileText, 
  Github, 
  Linkedin, 
  Mail, 
  Menu, 
  X 
} from "lucide-react";
import { PERSONAL_INFO } from "../data/portfolioData";

interface NavbarProps {
  onOpenResume: () => void;
  onOpenAiChat: () => void;
}

export default function Navbar({ onOpenResume, onOpenAiChat }: NavbarProps) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { label: "About", href: "#about" },
    { label: "Projects", href: "#projects" },
    { label: "Experience", href: "#experience" },
    { label: "Skills", href: "#skills" },
    { label: "Credentials", href: "#credentials" },
    { label: "Contact", href: "#contact" },
  ];

  return (
    <header 
      id="top-nav"
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled 
          ? "bg-[#090d16]/85 backdrop-blur-md border-b border-white/[0.08] shadow-lg shadow-black/20 py-3" 
          : "bg-transparent py-5"
      }`}
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 flex items-center justify-between">
        {/* Brand identifier */}
        <a 
          href="#about"
          id="brand-logo"
          className="group flex items-center gap-3 text-left focus:outline-none focus-visible:ring-2 focus-visible:ring-sky-400 rounded-lg p-1"
        >
          <div className="w-9 h-9 rounded-lg bg-gradient-to-br from-sky-400/20 to-indigo-500/20 border border-sky-400/30 flex items-center justify-center font-mono font-bold text-sky-400 text-sm group-hover:scale-105 group-hover:border-sky-400/60 transition-all shadow-sm">
            AP
          </div>
          <div>
            <div className="text-sm font-bold tracking-tight text-white group-hover:text-sky-300 transition-colors">
              {PERSONAL_INFO.name}
            </div>
            <div className="text-[11px] font-mono text-slate-400 flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
              Full-Stack & AI
            </div>
          </div>
        </a>

        {/* Desktop Nav Items */}
        <nav aria-label="Main Navigation" className="hidden md:flex items-center gap-1 bg-white/[0.03] border border-white/[0.08] rounded-full px-3 py-1.5">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              id={`nav-link-${link.label.toLowerCase()}`}
              className="text-xs font-medium text-slate-300 hover:text-white hover:bg-white/[0.06] px-3 py-1.5 rounded-full transition-colors"
            >
              {link.label}
            </a>
          ))}
        </nav>

        {/* Action Buttons */}
        <div className="hidden sm:flex items-center gap-2.5">
          {/* Ask AI Pill Button */}
          <button
            onClick={onOpenAiChat}
            id="nav-ask-ai-btn"
            className="flex items-center gap-1.5 text-xs font-medium text-sky-300 bg-sky-950/50 hover:bg-sky-900/60 border border-sky-500/30 px-3 py-1.5 rounded-full transition-all hover:scale-102 hover:shadow-[0_0_15px_rgba(56,189,248,0.2)]"
            title="Chat with Anmol's AI Copilot"
          >
            <Sparkles className="w-3.5 h-3.5 text-sky-400" />
            <span>Ask AI</span>
          </button>

          {/* Resume Button */}
          <button
            onClick={onOpenResume}
            id="nav-resume-btn"
            className="flex items-center gap-1.5 text-xs font-medium text-slate-200 hover:text-white bg-white/[0.04] hover:bg-white/[0.08] border border-white/[0.1] px-3 py-1.5 rounded-full transition-all"
            title="View Anmol's Resume"
          >
            <FileText className="w-3.5 h-3.5 text-slate-300" />
            <span>Resume</span>
          </button>

          {/* External Social Quick-Links */}
          <div className="flex items-center gap-1 border-l border-white/[0.1] pl-2.5 ml-1">
            <a
              href={PERSONAL_INFO.github}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="GitHub Profile"
              className="p-1.5 text-slate-400 hover:text-white hover:bg-white/[0.06] rounded-md transition-colors"
            >
              <Github className="w-4 h-4" />
            </a>
            <a
              href={PERSONAL_INFO.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="LinkedIn Profile"
              className="p-1.5 text-slate-400 hover:text-white hover:bg-white/[0.06] rounded-md transition-colors"
            >
              <Linkedin className="w-4 h-4" />
            </a>
          </div>
        </div>

        {/* Mobile Menu Toggle */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          id="mobile-menu-toggle"
          aria-label="Toggle navigation menu"
          className="md:hidden p-2 text-slate-300 hover:text-white bg-white/[0.04] border border-white/[0.08] rounded-lg"
        >
          {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-[#0a0f1c] border-b border-white/[0.08] px-6 py-5 mt-2 space-y-3 animate-in fade-in slide-in-from-top-2 duration-200">
          <div className="grid grid-cols-2 gap-2">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className="text-sm font-medium text-slate-300 hover:text-white py-2 px-3 rounded-lg hover:bg-white/[0.05]"
              >
                {link.label}
              </a>
            ))}
          </div>

          <div className="pt-3 border-t border-white/[0.08] flex items-center justify-between gap-3">
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenAiChat();
              }}
              className="flex-1 flex items-center justify-center gap-1.5 text-xs font-semibold py-2.5 px-3 rounded-lg bg-sky-500/10 text-sky-400 border border-sky-500/30"
            >
              <Sparkles className="w-4 h-4" />
              <span>Ask AI Copilot</span>
            </button>
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenResume();
              }}
              className="flex-1 flex items-center justify-center gap-1.5 text-xs font-semibold py-2.5 px-3 rounded-lg bg-white/[0.06] text-white border border-white/[0.1]"
            >
              <FileText className="w-4 h-4" />
              <span>View Resume</span>
            </button>
          </div>

          <div className="flex items-center justify-center gap-6 pt-2 text-xs text-slate-400">
            <a href={PERSONAL_INFO.github} target="_blank" rel="noopener noreferrer" className="hover:text-white flex items-center gap-1">
              <Github className="w-4 h-4" /> GitHub
            </a>
            <a href={PERSONAL_INFO.linkedin} target="_blank" rel="noopener noreferrer" className="hover:text-white flex items-center gap-1">
              <Linkedin className="w-4 h-4" /> LinkedIn
            </a>
            <a href={`mailto:${PERSONAL_INFO.email}`} className="hover:text-white flex items-center gap-1">
              <Mail className="w-4 h-4" /> Email
            </a>
          </div>
        </div>
      )}
    </header>
  );
}
