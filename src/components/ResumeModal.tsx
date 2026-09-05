import { X, Download, ExternalLink, Mail, MapPin, GraduationCap, Briefcase, Code, Award } from "lucide-react";
import { PERSONAL_INFO, EXPERIENCES, EDUCATION, PROJECTS } from "../data/portfolioData";

interface ResumeModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function ResumeModal({ isOpen, onClose }: ResumeModalProps) {
  if (!isOpen) return null;

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/80 backdrop-blur-sm animate-in fade-in"
      onClick={onClose}
    >
      <div 
        className="bg-[#0b101c] border border-white/[0.12] rounded-2xl max-w-3xl w-full max-h-[90vh] overflow-y-auto shadow-2xl p-6 sm:p-8 space-y-6 text-left relative"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header Bar */}
        <div className="flex items-start justify-between border-b border-white/[0.08] pb-5">
          <div>
            <h2 className="text-2xl font-bold text-white tracking-tight">
              {PERSONAL_INFO.name}
            </h2>
            <div className="text-sm font-semibold text-sky-400">
              {PERSONAL_INFO.title}
            </div>
            <div className="flex flex-wrap items-center gap-3 text-xs text-slate-400 mt-1 font-mono">
              <span className="flex items-center gap-1">
                <MapPin className="w-3 h-3 text-slate-400" />
                {PERSONAL_INFO.location}
              </span>
              <span>•</span>
              <span className="flex items-center gap-1">
                <Mail className="w-3 h-3 text-slate-400" />
                {PERSONAL_INFO.email}
              </span>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <a
              href="/Anmol_S__resume.pdf"
              target="_blank"
              rel="noopener noreferrer"
              download="Anmol_S__resume.pdf"
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-sky-500 hover:bg-sky-400 text-slate-950 font-semibold text-xs transition-colors shadow-sm"
            >
              <Download className="w-3.5 h-3.5" />
              <span>Download PDF</span>
            </a>
            <button
              onClick={onClose}
              className="p-1.5 rounded-lg text-slate-400 hover:text-white bg-white/[0.04] hover:bg-white/[0.08] transition-colors"
              aria-label="Close resume"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Executive Summary */}
        <div className="space-y-2">
          <h3 className="text-xs font-mono font-bold text-slate-400 uppercase tracking-wider">
            Executive Summary
          </h3>
          <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
            {PERSONAL_INFO.bio}
          </p>
        </div>

        {/* Education */}
        <div className="space-y-3 pt-2 border-t border-white/[0.06]">
          <h3 className="text-xs font-mono font-bold text-slate-400 uppercase tracking-wider flex items-center gap-1.5">
            <GraduationCap className="w-3.5 h-3.5 text-emerald-400" />
            Education
          </h3>
          <div className="p-4 rounded-xl bg-white/[0.02] border border-white/[0.06] space-y-1">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between text-sm font-bold text-white">
              <span>{EDUCATION.institution}</span>
              <span className="text-xs font-mono text-slate-400">{EDUCATION.period}</span>
            </div>
            <div className="text-xs text-sky-400 font-medium">
              {EDUCATION.degree} — {EDUCATION.field}
            </div>
            <div className="text-xs text-slate-400 pt-1">
              Key coursework: Data Structures, Algorithms, Machine Learning, Operating Systems, Computer Networks, DBMS.
            </div>
          </div>
        </div>

        {/* Experience */}
        <div className="space-y-3 pt-2 border-t border-white/[0.06]">
          <h3 className="text-xs font-mono font-bold text-slate-400 uppercase tracking-wider flex items-center gap-1.5">
            <Briefcase className="w-3.5 h-3.5 text-sky-400" />
            Experience
          </h3>
          <div className="space-y-3">
            {EXPERIENCES.map((exp) => (
              <div key={exp.id} className="p-4 rounded-xl bg-white/[0.02] border border-white/[0.06] space-y-1.5">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between text-sm font-bold text-white">
                  <span>{exp.role} — {exp.organization}</span>
                  <span className="text-xs font-mono text-slate-400">{exp.period}</span>
                </div>
                <p className="text-xs text-slate-300 leading-relaxed">
                  {exp.description}
                </p>
                <div className="flex flex-wrap gap-1.5 pt-1">
                  {exp.skills.map((s) => (
                    <span key={s} className="px-2 py-0.5 text-[10px] font-mono rounded bg-white/[0.04] text-slate-400">
                      {s}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Featured Projects Highlight */}
        <div className="space-y-3 pt-2 border-t border-white/[0.06]">
          <h3 className="text-xs font-mono font-bold text-slate-400 uppercase tracking-wider flex items-center gap-1.5">
            <Code className="w-3.5 h-3.5 text-indigo-400" />
            Key Technical Projects
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {PROJECTS.slice(0, 4).map((p) => (
              <div key={p.id} className="p-3.5 rounded-xl bg-white/[0.02] border border-white/[0.06] space-y-1">
                <div className="text-xs font-bold text-white flex items-center justify-between">
                  <span>{p.name}</span>
                  <span className="text-[10px] font-mono text-sky-400">{p.tag}</span>
                </div>
                <p className="text-[11px] text-slate-400 line-clamp-2">
                  {p.description}
                </p>
                <div className="text-[10px] font-mono text-slate-500 pt-1">
                  {p.technologies.slice(0, 3).join(", ")}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Footer */}
        <div className="pt-4 border-t border-white/[0.08] flex items-center justify-between">
          <span className="text-xs text-slate-400 font-mono">
            Direct Contact: {PERSONAL_INFO.email}
          </span>
          <button
            onClick={onClose}
            className="px-4 py-1.5 rounded-lg text-xs font-semibold bg-white/[0.08] hover:bg-white/[0.12] text-white transition-colors"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
}
