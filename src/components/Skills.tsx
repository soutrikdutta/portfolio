import React from "react";
import { motion, useReducedMotion } from "framer-motion";
import { portfolioConfig } from "../portfolio.config";
import { Sparkles, Terminal } from "lucide-react";

export const Skills: React.FC = () => {
  const shouldReduceMotion = useReducedMotion();

  // Muted, elegant accent dots for instant visual recognition without neon
  const getSkillColor = (skill: string) => {
    switch (skill.toLowerCase()) {
      case "python":
        return "bg-sky-400";
      case "java":
        return "bg-amber-400";
      case "c++":
        return "bg-slate-300";
      case "html":
        return "bg-orange-400";
      case "css":
        return "bg-cyan-400";
      case "javascript":
        return "bg-yellow-300";
      case "firebase":
        return "bg-amber-500";
      case "supabase":
        return "bg-emerald-400";
      case "node.js":
        return "bg-green-400";
      default:
        return "bg-zinc-400";
    }
  };

  return (
    <section
      id="skills"
      className="py-20 sm:py-28 max-w-4xl mx-auto px-5 sm:px-8 border-t border-white/[0.06] scroll-mt-20"
      aria-label="Technical Skills section"
    >
      <div className="space-y-8">
        {/* Section Heading */}
        <div>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold tracking-tight text-white">
            Technical Skills
          </h2>
          <p className="text-xs sm:text-sm text-zinc-400 mt-1">
            Languages, platforms, and frameworks I use regularly.
          </p>
        </div>

        {/* Beautiful Compact Small Box Container */}
        <motion.div
          initial={shouldReduceMotion ? false : { opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.5 }}
          className="relative p-6 sm:p-7 rounded-2xl bg-[#0e121b]/65 backdrop-blur-xl border border-white/[0.09] shadow-[0_8px_32px_rgba(0,0,0,0.4)] max-w-2xl overflow-hidden group hover:border-white/[0.18] transition-all duration-300"
        >
          {/* Workstation Header Bar */}
          <div className="flex items-center justify-between pb-4 border-b border-white/[0.06]">
            {/* Terminal Window Dots */}
            <div className="flex items-center gap-1.5">
              <span className="w-2.5 h-2.5 rounded-full bg-white/[0.12]" />
              <span className="w-2.5 h-2.5 rounded-full bg-white/[0.08]" />
              <span className="w-2.5 h-2.5 rounded-full bg-white/[0.08]" />
            </div>

            {/* Title */}
            <div className="flex items-center gap-1.5 text-xs font-mono text-zinc-400">
              <Terminal className="w-3.5 h-3.5 text-zinc-400" />
              <span>skills.config</span>
            </div>

            {/* Tool Count Badge */}
            <span className="px-2 py-0.5 rounded-full text-[10px] font-mono text-zinc-400 bg-white/[0.04] border border-white/[0.06]">
              {portfolioConfig.skills.length} core tools
            </span>
          </div>

          {/* Arranged Skills inside the box */}
          <div className="flex flex-wrap gap-2.5 sm:gap-3 pt-5">
            {portfolioConfig.skills.map((skill, index) => (
              <motion.div
                key={skill}
                initial={shouldReduceMotion ? false : { opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.3, delay: index * 0.035 }}
                whileHover={shouldReduceMotion ? {} : { y: -2, scale: 1.03 }}
                whileTap={shouldReduceMotion ? {} : { scale: 0.97 }}
                className="group/pill inline-flex items-center gap-2 px-4 py-2 rounded-full text-xs sm:text-sm font-medium text-zinc-200 hover:text-white bg-white/[0.04] hover:bg-white/[0.08] border border-white/[0.08] hover:border-white/[0.22] transition-all duration-200 cursor-default select-none shadow-[0_2px_8px_rgba(0,0,0,0.2)]"
              >
                <span
                  className={`w-1.5 h-1.5 rounded-full ${getSkillColor(
                    skill
                  )} opacity-80 group-hover/pill:opacity-100 transition-opacity`}
                />
                <span>{skill}</span>
              </motion.div>
            ))}
          </div>

          {/* Ambient Box Footer */}
          <div className="mt-6 pt-4 border-t border-white/[0.05] flex items-center justify-between text-[11px] text-zinc-400">
            <span className="flex items-center gap-1.5">
              <Sparkles className="w-3 h-3 text-zinc-400" />
              <span>Hands-on problem solving and building</span>
            </span>
            <span className="font-mono text-zinc-400">Verified</span>
          </div>
        </motion.div>
      </div>
    </section>
  );
};
