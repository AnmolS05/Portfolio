import { Briefcase, GraduationCap, Calendar, MapPin, CheckCircle2, Award } from "lucide-react";
import { EXPERIENCES, EDUCATION } from "../data/portfolioData";

export default function ExperienceEducation() {
  return (
    <section id="experience" aria-label="Experience and Education" className="py-24 border-b border-white/[0.06] relative">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 space-y-16">
        {/* Section Header */}
        <div className="space-y-3 max-w-2xl">
          <div className="inline-flex items-center gap-2 text-xs font-mono font-semibold tracking-wider text-sky-400 uppercase">
            <Briefcase className="w-3.5 h-3.5" />
            <span>Career Path</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            Experience & Education
          </h2>
          <p className="text-sm sm:text-base text-slate-400 leading-relaxed">
            Hands-on software development, applied machine learning engineering, community leadership, and strong academic foundations.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          {/* Professional Experience Column */}
          <div className="lg:col-span-7 space-y-6">
            <h3 className="text-lg font-bold text-white tracking-tight flex items-center gap-2">
              <Briefcase className="w-4 h-4 text-sky-400" />
              <span>Professional Experience & Leadership</span>
            </h3>

            <div className="space-y-6 relative before:absolute before:left-3.5 before:top-3 before:bottom-3 before:w-px before:bg-white/[0.08]">
              {EXPERIENCES.map((exp) => (
                <div 
                  key={exp.id}
                  id={`experience-${exp.id}`}
                  className="relative pl-9 group"
                >
                  {/* Timeline dot */}
                  <div className="absolute left-2 top-1.5 w-3 h-3 rounded-full bg-[#090d16] border-2 border-sky-400 group-hover:border-sky-300 group-hover:scale-110 transition-all"></div>

                  <div className="p-5 sm:p-6 rounded-xl bg-white/[0.02] border border-white/[0.08] group-hover:border-white/[0.14] transition-all space-y-4">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1">
                      <div>
                        <h4 className="text-base font-bold text-white group-hover:text-sky-300 transition-colors">
                          {exp.role}
                        </h4>
                        <div className="text-sm font-medium text-slate-300">
                          {exp.organization}
                        </div>
                      </div>
                      <div className="flex flex-wrap items-center gap-2 text-xs font-mono text-slate-400">
                        <span className="inline-flex items-center gap-1">
                          <Calendar className="w-3 h-3 text-sky-400" />
                          {exp.period}
                        </span>
                      </div>
                    </div>

                    <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                      {exp.description}
                    </p>

                    {/* Key accomplishments */}
                    <ul className="space-y-2 pt-2 border-t border-white/[0.04]">
                      {exp.achievements.map((ach, idx) => (
                        <li key={idx} className="flex items-start gap-2.5 text-xs sm:text-sm text-slate-300">
                          <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 mt-0.5 shrink-0" />
                          <span>{ach}</span>
                        </li>
                      ))}
                    </ul>

                    {/* Skills pills */}
                    <div className="flex flex-wrap gap-1.5 pt-2">
                      {exp.skills.map((skill) => (
                        <span 
                          key={skill}
                          className="px-2 py-0.5 text-[11px] font-mono rounded bg-sky-500/[0.08] text-sky-300 border border-sky-500/20"
                        >
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Education & Academic Credentials Column */}
          <div className="lg:col-span-5 space-y-6">
            <h3 className="text-lg font-bold text-white tracking-tight flex items-center gap-2">
              <GraduationCap className="w-4 h-4 text-emerald-400" />
              <span>Education</span>
            </h3>

            <div className="p-6 rounded-xl bg-white/[0.02] border border-white/[0.08] hover:border-white/[0.14] transition-all space-y-5">
              <div className="space-y-1.5">
                <div className="inline-flex items-center gap-1 text-xs font-mono text-emerald-400 font-medium">
                  <span>{EDUCATION.status}</span>
                </div>
                <h4 className="text-xl font-bold text-white tracking-tight">
                  {EDUCATION.degree}
                </h4>
                <div className="text-sm font-semibold text-slate-200">
                  {EDUCATION.field}
                </div>
                <div className="text-xs sm:text-sm text-slate-400">
                  {EDUCATION.institution}
                </div>
              </div>

              <div className="flex flex-wrap items-center gap-4 text-xs font-mono text-slate-400 pt-2 border-t border-white/[0.06]">
                <span className="flex items-center gap-1.5">
                  <Calendar className="w-3.5 h-3.5 text-slate-400" />
                  {EDUCATION.period}
                </span>
                <span className="flex items-center gap-1.5">
                  <MapPin className="w-3.5 h-3.5 text-slate-400" />
                  {EDUCATION.location}
                </span>
              </div>

              <div className="space-y-2.5 pt-3 border-t border-white/[0.06]">
                <div className="text-xs font-mono uppercase tracking-wider text-slate-400">
                  Academic Focus & Highlights:
                </div>
                <ul className="space-y-2">
                  {EDUCATION.highlights.map((item, idx) => (
                    <li key={idx} className="flex items-start gap-2.5 text-xs text-slate-300">
                      <Award className="w-3.5 h-3.5 text-sky-400 mt-0.5 shrink-0" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="p-3.5 rounded-lg bg-emerald-500/[0.05] border border-emerald-500/20 text-xs text-emerald-300 flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-emerald-400"></span>
                <span>Active coursework in Machine Learning & System Architecture</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
