import { useState, useEffect } from "react";
import { ArrowDown, FileText, ArrowUpRight, Code2, Award, Briefcase, GraduationCap } from "lucide-react";
import { PERSONAL_INFO } from "../data/portfolioData";

interface HeroProps {
  onOpenResume: () => void;
  onOpenAiChat: () => void;
}

const TYPEWRITER_PHRASES = [
  "Turning data into decisions",
  "Engineering scalable AI systems",
  "Transforming code into impact",
  "Applied AI, software development & innovation",
  "Building full-stack products & workflows"
];

export default function Hero({ onOpenResume }: HeroProps) {
  const [phraseIndex, setPhraseIndex] = useState(0);
  const [currentText, setCurrentText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const fullText = TYPEWRITER_PHRASES[phraseIndex];
    const typingSpeed = isDeleting ? 25 : 55;

    if (!isDeleting && currentText === fullText) {
      const timeout = setTimeout(() => setIsDeleting(true), 2000);
      return () => clearTimeout(timeout);
    }

    if (isDeleting && currentText === "") {
      setIsDeleting(false);
      setPhraseIndex((prev) => (prev + 1) % TYPEWRITER_PHRASES.length);
      return;
    }

    const timeout = setTimeout(() => {
      setCurrentText((prev) =>
        isDeleting ? fullText.substring(0, prev.length - 1) : fullText.substring(0, prev.length + 1)
      );
    }, typingSpeed);

    return () => clearTimeout(timeout);
  }, [currentText, isDeleting, phraseIndex]);

  return (
    <section 
      id="about" 
      aria-label="About"
      className="relative pt-28 pb-16 md:pt-36 md:pb-20 border-b border-white/[0.06]"
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        {/* Location & Academic Affiliation */}
        <div className="flex items-center gap-2 mb-3 text-xs font-mono text-slate-400">
          <span>NMAMIT</span>
          <span className="text-slate-600">•</span>
          <span>Karnataka, India</span>
        </div>

        {/* Hero Headline with Professional Typewriter (No Emojis, No Name Duplication) */}
        <div className="max-w-2xl space-y-3">
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold tracking-tight text-white min-h-[2.5rem] flex items-center">
            <span>
              {currentText}
              <span 
                className="inline-block w-[2.5px] h-[0.9em] bg-sky-400 ml-1.5 align-middle animate-pulse" 
                aria-hidden="true" 
              />
            </span>
          </h1>

          {/* Bio text */}
          <p className="text-sm sm:text-base text-slate-300 leading-relaxed font-normal pt-1">
            {PERSONAL_INFO.bio}
          </p>
        </div>

        {/* Actions */}
        <div className="flex flex-wrap items-center gap-3.5 mt-7">
          <a
            href="#projects"
            id="hero-explore-projects-btn"
            className="inline-flex items-center justify-center gap-2 px-4 py-2 rounded-xl bg-sky-500 hover:bg-sky-400 text-slate-950 font-semibold text-xs tracking-wide shadow-sm transition-all hover:-translate-y-0.5"
          >
            <span>View Projects</span>
            <ArrowDown className="w-3.5 h-3.5" />
          </a>

          <button
            onClick={onOpenResume}
            id="hero-view-resume-btn"
            className="inline-flex items-center justify-center gap-2 px-4 py-2 rounded-xl bg-white/[0.04] hover:bg-white/[0.08] border border-white/[0.1] text-slate-200 font-medium text-xs transition-all hover:-translate-y-0.5"
          >
            <FileText className="w-3.5 h-3.5 text-slate-400" />
            <span>Resume</span>
          </button>

          <a
            href="#contact"
            id="hero-contact-btn"
            className="inline-flex items-center justify-center gap-1.5 px-3 py-2 text-slate-400 hover:text-white text-xs font-medium transition-colors ml-1"
          >
            <span>Get in touch</span>
            <ArrowUpRight className="w-3.5 h-3.5" />
          </a>
        </div>

        {/* Minimalist Stats Strip */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-12 pt-6 border-t border-white/[0.06]">
          <div className="space-y-0.5">
            <div className="text-lg font-bold text-white font-mono flex items-center gap-1.5">
              <span>9+</span>
              <Code2 className="w-3.5 h-3.5 text-sky-400" />
            </div>
            <div className="text-xs text-slate-400">Shipped Projects</div>
          </div>

          <div className="space-y-0.5">
            <div className="text-lg font-bold text-white font-mono flex items-center gap-1.5">
              <span>11</span>
              <Award className="w-3.5 h-3.5 text-emerald-400" />
            </div>
            <div className="text-xs text-slate-400">Cloud & AI Credentials</div>
          </div>

          <div className="space-y-0.5">
            <div className="text-lg font-bold text-white font-mono flex items-center gap-1.5">
              <span>AI / ML</span>
              <Briefcase className="w-3.5 h-3.5 text-indigo-400" />
            </div>
            <div className="text-xs text-slate-400">Intern @ DLithe</div>
          </div>

          <div className="space-y-0.5">
            <div className="text-lg font-bold text-white font-mono flex items-center gap-1.5">
              <span>2027</span>
              <GraduationCap className="w-3.5 h-3.5 text-amber-400" />
            </div>
            <div className="text-xs text-slate-400">B.Tech CSE, NMAMIT</div>
          </div>
        </div>
      </div>
    </section>
  );
}
