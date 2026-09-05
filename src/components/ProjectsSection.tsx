import { useState } from "react";
import { ExternalLink, Github, ArrowUpRight, Sparkles, Layers, ShieldCheck, Compass, FileSearch } from "lucide-react";
import { Project } from "../types";
import { PROJECTS } from "../data/portfolioData";

interface ProjectsSectionProps {
  onSelectProject: (project: Project) => void;
}

export default function ProjectsSection({ onSelectProject }: ProjectsSectionProps) {
  const [activeFilter, setActiveFilter] = useState<'all' | 'ai' | 'fullstack' | 'graphics'>('all');

  const filteredProjects = PROJECTS.filter((p) => {
    if (activeFilter === 'all') return true;
    return p.category === activeFilter;
  });

  const flagship = PROJECTS.find((p) => p.id === "aeroinsight");

  return (
    <section id="projects" aria-label="Featured Projects" className="py-24 border-b border-white/[0.06] relative">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 space-y-12">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div className="space-y-3 max-w-xl">
            <div className="inline-flex items-center gap-2 text-xs font-mono font-semibold tracking-wider text-sky-400 uppercase">
              <Layers className="w-3.5 h-3.5" />
              <span>Engineered Work</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
              Featured Projects & Systems
            </h2>
            <p className="text-sm sm:text-base text-slate-400 leading-relaxed">
              Production-tested applications, applied AI pipelines with Google Gemini, full-stack database architectures, and interactive 3D simulations.
            </p>
          </div>

          {/* Filter Pills */}
          <div className="flex flex-wrap items-center gap-1.5 p-1 bg-white/[0.03] border border-white/[0.08] rounded-xl self-start md:self-auto">
            {[
              { id: 'all', label: 'All (9)' },
              { id: 'ai', label: 'AI & Vision (5)' },
              { id: 'fullstack', label: 'Full-Stack (2)' },
              { id: 'graphics', label: '3D & Graphics (2)' },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveFilter(tab.id as any)}
                id={`filter-${tab.id}`}
                className={`px-3.5 py-1.5 rounded-lg text-xs font-medium transition-all ${
                  activeFilter === tab.id
                    ? 'bg-sky-500 text-slate-950 font-semibold shadow-sm'
                    : 'text-slate-400 hover:text-white hover:bg-white/[0.04]'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* Flagship Project Spotlight (Shown when All or AI filter is selected) */}
        {(activeFilter === 'all' || activeFilter === 'ai') && flagship && (
          <div 
            id="flagship-card"
            className="group relative rounded-2xl bg-gradient-to-b from-white/[0.05] to-white/[0.02] border border-sky-500/30 hover:border-sky-500/50 p-6 sm:p-8 transition-all hover:shadow-[0_0_30px_rgba(56,189,248,0.1)]"
          >
            <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6 pb-6 border-b border-white/[0.08]">
              <div className="space-y-2">
                <div className="flex flex-wrap items-center gap-2">
                  <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-sky-400/10 text-sky-400 text-xs font-mono font-medium border border-sky-400/20">
                    <Sparkles className="w-3 h-3" />
                    Flagship System
                  </span>
                  <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-emerald-400/10 text-emerald-400 text-xs font-mono font-medium border border-emerald-400/20">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
                    Live Deployed
                  </span>
                </div>
                <h3 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
                  {flagship.name}
                </h3>
              </div>

              {/* Action Buttons for Flagship */}
              <div className="flex flex-wrap items-center gap-3">
                {flagship.liveUrl && (
                  <a
                    href={flagship.liveUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    id="flagship-live-btn"
                    className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-sky-500 hover:bg-sky-400 text-slate-950 font-semibold text-xs transition-all shadow-md shadow-sky-500/20"
                  >
                    <span>Launch Live Platform</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                )}
                {flagship.githubUrl && (
                  <a
                    href={flagship.githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    id="flagship-github-btn"
                    className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-white/[0.06] hover:bg-white/[0.1] text-white font-medium text-xs border border-white/[0.1] transition-colors"
                  >
                    <Github className="w-3.5 h-3.5" />
                    <span>Source Code</span>
                  </a>
                )}
                <button
                  onClick={() => onSelectProject(flagship)}
                  id="flagship-details-btn"
                  className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-medium text-slate-300 hover:text-white bg-white/[0.04] hover:bg-white/[0.08] border border-white/[0.08]"
                >
                  <FileSearch className="w-3.5 h-3.5 text-sky-400" />
                  <span>Architecture</span>
                </button>
              </div>
            </div>

            {/* Flagship Body */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 pt-6 items-center">
              <div className="lg:col-span-7 space-y-4">
                <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
                  {flagship.description}
                </p>

                <div className="space-y-2">
                  <div className="text-xs font-mono uppercase tracking-wider text-slate-400">
                    System Architecture & Key Innovations:
                  </div>
                  <ul className="space-y-2">
                    {flagship.highlights.map((h, i) => (
                      <li key={i} className="flex items-start gap-2.5 text-xs sm:text-sm text-slate-300">
                        <ShieldCheck className="w-4 h-4 text-sky-400 shrink-0 mt-0.5" />
                        <span>{h}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="flex flex-wrap gap-1.5 pt-2">
                  {flagship.technologies.map((tech) => (
                    <span
                      key={tech}
                      className="px-2.5 py-1 text-xs font-mono rounded-md bg-white/[0.05] border border-white/[0.08] text-slate-300"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>

              {/* Graphical Telemetry Callout Card */}
              <div className="lg:col-span-5 p-5 rounded-xl bg-slate-950/60 border border-white/[0.08] space-y-3 font-mono text-xs">
                <div className="flex items-center justify-between text-slate-400 border-b border-white/[0.06] pb-2">
                  <span className="flex items-center gap-1.5 text-sky-400">
                    <Compass className="w-3.5 h-3.5" /> Telemetry & AI Pipeline
                  </span>
                  <span className="text-emerald-400">200 Hz Stream</span>
                </div>

                <div className="space-y-2 text-slate-300">
                  <div className="flex justify-between items-center py-1 border-b border-white/[0.04]">
                    <span className="text-slate-500">Inference Engine:</span>
                    <span className="text-sky-300">Google Gemini + Custom ML</span>
                  </div>
                  <div className="flex justify-between items-center py-1 border-b border-white/[0.04]">
                    <span className="text-slate-500">Geospatial Bounds:</span>
                    <span className="text-emerald-300">Leaflet.js & GeoJSON Polygons</span>
                  </div>
                  <div className="flex justify-between items-center py-1 border-b border-white/[0.04]">
                    <span className="text-slate-500">Hazard Anomaly Detector:</span>
                    <span className="text-white">Active (Battery / Wind / Restricted)</span>
                  </div>
                  <div className="flex justify-between items-center py-1">
                    <span className="text-slate-500">Incident Narrative:</span>
                    <span className="text-indigo-300">Automated Natural Language</span>
                  </div>
                </div>

                <div className="pt-2 text-[11px] text-slate-400">
                  Dual-tier inference reduces false alerts while explaining complex risk vectors to human flight controllers in real time.
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Grid of Other Projects */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {filteredProjects
            .filter((p) => (activeFilter === 'all' ? p.id !== 'aeroinsight' : true))
            .map((project) => (
              <div
                key={project.id}
                id={`project-card-${project.id}`}
                className="group flex flex-col justify-between rounded-xl bg-white/[0.02] hover:bg-white/[0.04] border border-white/[0.08] hover:border-white/[0.18] p-5 sm:p-6 transition-all duration-200 hover:-translate-y-1 hover:shadow-lg hover:shadow-black/30"
              >
                <div className="space-y-4">
                  {/* Category Pill and Tag */}
                  <div className="flex items-center justify-between gap-2">
                    <span className="text-[11px] font-mono px-2 py-0.5 rounded-md bg-white/[0.04] border border-white/[0.08] text-slate-400">
                      {project.categoryLabel}
                    </span>
                    <span className="text-[11px] font-mono text-sky-400 font-medium">
                      {project.tag}
                    </span>
                  </div>

                  {/* Title & Description */}
                  <div className="space-y-2">
                    <h3 className="text-lg font-bold text-white group-hover:text-sky-300 transition-colors tracking-tight flex items-center justify-between">
                      <span>{project.name}</span>
                      <ArrowUpRight className="w-4 h-4 text-slate-500 group-hover:text-sky-300 transition-colors opacity-0 group-hover:opacity-100" />
                    </h3>
                    <p className="text-xs sm:text-sm text-slate-400 leading-relaxed line-clamp-3">
                      {project.description}
                    </p>
                  </div>

                  {/* Highlights preview */}
                  <div className="pt-2 border-t border-white/[0.04] space-y-1.5">
                    {project.highlights.slice(0, 2).map((item, idx) => (
                      <div key={idx} className="flex items-start gap-2 text-xs text-slate-400">
                        <span className="text-sky-400 mt-0.5">•</span>
                        <span className="line-clamp-1">{item}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Bottom Footer: Tech & Actions */}
                <div className="mt-6 pt-4 border-t border-white/[0.06] space-y-3">
                  {/* Tech stack chips */}
                  <div className="flex flex-wrap gap-1.5">
                    {project.technologies.slice(0, 4).map((tech) => (
                      <span
                        key={tech}
                        className="px-2 py-0.5 text-[11px] font-mono rounded bg-white/[0.03] text-slate-400 border border-white/[0.05]"
                      >
                        {tech}
                      </span>
                    ))}
                    {project.technologies.length > 4 && (
                      <span className="px-1.5 py-0.5 text-[10px] font-mono text-slate-400">
                        +{project.technologies.length - 4}
                      </span>
                    )}
                  </div>

                  {/* Action buttons */}
                  <div className="flex items-center justify-between pt-1">
                    <button
                      onClick={() => onSelectProject(project)}
                      id={`project-details-${project.id}`}
                      className="text-xs font-medium text-sky-400 hover:text-sky-300 transition-colors flex items-center gap-1"
                    >
                      <span>Project Details</span>
                      <ArrowUpRight className="w-3.5 h-3.5" />
                    </button>

                    <div className="flex items-center gap-2">
                      {project.githubUrl && (
                        <a
                          href={project.githubUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          aria-label={`Source code for ${project.name}`}
                          className="p-1.5 text-slate-400 hover:text-white rounded hover:bg-white/[0.06] transition-colors"
                          title="View on GitHub"
                        >
                          <Github className="w-4 h-4" />
                        </a>
                      )}
                      {project.liveUrl && (
                        <a
                          href={project.liveUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          aria-label={`Live demo for ${project.name}`}
                          className="p-1.5 text-sky-400 hover:text-sky-300 rounded hover:bg-sky-400/10 transition-colors"
                          title="Live Demo"
                        >
                          <ExternalLink className="w-4 h-4" />
                        </a>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            ))}
        </div>
      </div>
    </section>
  );
}
