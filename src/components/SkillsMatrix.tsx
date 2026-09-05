import { Code, Cpu, Layout, Server, Sparkles } from "lucide-react";
import { SKILL_GROUPS } from "../data/portfolioData";

export default function SkillsMatrix() {
  const getIcon = (category: string) => {
    switch (category) {
      case "Languages":
        return <Code className="w-4 h-4 text-sky-400" />;
      case "Applied AI & Machine Learning":
        return <Cpu className="w-4 h-4 text-indigo-400" />;
      case "Frontend Engineering":
        return <Layout className="w-4 h-4 text-emerald-400" />;
      case "Backend, Cloud & Databases":
        return <Server className="w-4 h-4 text-amber-400" />;
      default:
        return <Sparkles className="w-4 h-4 text-sky-400" />;
    }
  };

  return (
    <section id="skills" aria-label="Technical Skills Matrix" className="py-24 border-b border-white/[0.06] relative">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 space-y-12">
        {/* Section Header */}
        <div className="space-y-3 max-w-2xl">
          <div className="inline-flex items-center gap-2 text-xs font-mono font-semibold tracking-wider text-sky-400 uppercase">
            <Cpu className="w-3.5 h-3.5" />
            <span>Technical Capabilities</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            Skills & Technologies
          </h2>
          <p className="text-sm sm:text-base text-slate-400 leading-relaxed">
            Technologies and tools used across full-stack systems, applied generative AI, interactive web development, and cloud databases.
          </p>
        </div>

        {/* 4-Card Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {SKILL_GROUPS.map((group) => (
            <div
              key={group.category}
              id={`skill-group-${group.category.toLowerCase().replace(/[^a-z0-9]/g, '-')}`}
              className="p-6 rounded-2xl bg-white/[0.02] border border-white/[0.08] hover:border-white/[0.14] transition-all space-y-5 flex flex-col justify-between"
            >
              <div className="space-y-2">
                <div className="flex items-center gap-2.5">
                  <div className="p-2 rounded-lg bg-white/[0.04] border border-white/[0.08]">
                    {getIcon(group.category)}
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-white tracking-tight">
                      {group.category}
                    </h3>
                    <p className="text-xs text-slate-400">
                      {group.description}
                    </p>
                  </div>
                </div>
              </div>

              {/* Clean Skills Badges - No subjective 'Advanced' or 'Proficient' ratings */}
              <div className="flex flex-wrap gap-2 pt-3 border-t border-white/[0.04]">
                {group.skills.map((skill) => (
                  <div
                    key={skill.name}
                    className={`px-3 py-1.5 rounded-lg border text-xs font-medium transition-all flex items-center gap-2 ${
                      skill.highlight
                        ? "bg-sky-500/[0.08] border-sky-500/25 text-white hover:border-sky-500/45"
                        : "bg-white/[0.03] border-white/[0.07] text-slate-300 hover:border-white/[0.14]"
                    }`}
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-sky-400/80 shrink-0" />
                    <span>{skill.name}</span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
