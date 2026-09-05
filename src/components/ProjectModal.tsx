import { X, ExternalLink, Github, CheckCircle, Layers, Cpu, Code2 } from "lucide-react";
import { Project } from "../types";

interface ProjectModalProps {
  project: Project | null;
  onClose: () => void;
}

export default function ProjectModal({ project, onClose }: ProjectModalProps) {
  if (!project) return null;

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/75 backdrop-blur-sm animate-in fade-in duration-200"
      onClick={onClose}
    >
      <div 
        className="bg-[#0c111d] border border-white/[0.12] rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-2xl p-6 sm:p-8 text-left relative space-y-6"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          id="project-modal-close-btn"
          className="absolute top-5 right-5 p-2 rounded-lg text-slate-400 hover:text-white bg-white/[0.04] hover:bg-white/[0.08] transition-colors"
          aria-label="Close modal"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Header Information */}
        <div className="space-y-2 pr-10">
          <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded-md bg-sky-500/10 text-sky-400 text-xs font-mono font-medium border border-sky-500/20">
            {project.tag}
          </div>
          <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
            {project.name}
          </h2>
          <p className="text-xs font-mono text-slate-400">
            Category: {project.categoryLabel}
          </p>
        </div>

        {/* Summary */}
        <div className="space-y-3">
          <h3 className="text-sm font-semibold uppercase tracking-wider text-slate-300 font-mono flex items-center gap-2">
            <Layers className="w-4 h-4 text-sky-400" />
            Project Overview
          </h3>
          <p className="text-sm sm:text-base text-slate-300 leading-relaxed">
            {project.detailedDescription || project.description}
          </p>
        </div>

        {/* Key Engineering Architecture Highlights */}
        <div className="space-y-3">
          <h3 className="text-sm font-semibold uppercase tracking-wider text-slate-300 font-mono flex items-center gap-2">
            <Cpu className="w-4 h-4 text-emerald-400" />
            Architecture & Engineering Innovations
          </h3>
          <ul className="space-y-2.5">
            {project.highlights.map((highlight, index) => (
              <li key={index} className="flex items-start gap-3 text-sm text-slate-300">
                <CheckCircle className="w-4 h-4 text-emerald-400 mt-0.5 shrink-0" />
                <span>{highlight}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Technology Stack */}
        <div className="space-y-3">
          <h3 className="text-sm font-semibold uppercase tracking-wider text-slate-300 font-mono flex items-center gap-2">
            <Code2 className="w-4 h-4 text-indigo-400" />
            Technologies Used
          </h3>
          <div className="flex flex-wrap gap-2">
            {project.technologies.map((tech) => (
              <span
                key={tech}
                className="px-3 py-1 text-xs font-mono rounded-lg bg-white/[0.04] border border-white/[0.08] text-slate-300"
              >
                {tech}
              </span>
            ))}
          </div>
        </div>

        {/* Action Links */}
        <div className="pt-4 border-t border-white/[0.08] flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            {project.liveUrl && (
              <a
                href={project.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                id="modal-live-link"
                className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-sky-500 hover:bg-sky-400 text-slate-950 font-semibold text-xs transition-colors"
              >
                <span>Launch Live App</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            )}

            {project.githubUrl && (
              <a
                href={project.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                id="modal-github-link"
                className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-white/[0.06] hover:bg-white/[0.1] text-white font-medium text-xs border border-white/[0.1] transition-colors"
              >
                <Github className="w-3.5 h-3.5" />
                <span>View Source Code</span>
              </a>
            )}
          </div>

          <button
            onClick={onClose}
            className="px-4 py-2 rounded-xl text-xs text-slate-400 hover:text-white transition-colors"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
}
