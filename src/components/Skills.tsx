import React from "react";
import { motion, useReducedMotion } from "framer-motion";
import { portfolioConfig } from "../portfolio.config";
import { Sparkles, Terminal } from "lucide-react";

export const Skills: React.FC = () => {
  const shouldReduceMotion = useReducedMotion();

  const getSkillColor = (skill: string) => {
    switch (skill.toLowerCase()) {
      case "python":
        return "bg-sky-400 shadow-[0_0_10px_rgba(56,189,248,0.8)]";
      case "java":
        return "bg-amber-400 shadow-[0_0_10px_rgba(251,191,36,0.8)]";
      case "c++":
        return "bg-indigo-300 shadow-[0_0_10px_rgba(165,180,252,0.8)]";
      case "html":
        return "bg-orange-400 shadow-[0_0_10px_rgba(251,146,60,0.8)]";
      case "css":
        return "bg-cyan-400 shadow-[0_0_10px_rgba(34,211,238,0.8)]";
      case "javascript":
        return "bg-yellow-300 shadow-[0_0_10px_rgba(253,224,71,0.8)]";
      case "firebase":
        return "bg-amber-500 shadow-[0_0_10px_rgba(245,158,11,0.8)]";
      case "supabase":
        return "bg-emerald-400 shadow-[0_0_10px_rgba(52,211,153,0.8)]";
      case "node.js":
        return "bg-green-400 shadow-[0_0_10px_rgba(74,222,128,0.8)]";
      default:
        return "bg-zinc-400 shadow-[0_0_10px_rgba(161,161,170,0.8)]";
    }
  };

  return (
    <section
      id="skills"
      className="py-20 sm:py-28 max-w-4xl mx-auto px-5 sm:px-8 border-t border-white/[0.06] scroll-mt-20"
      aria-label="Technical Skills section"
    >
      <div className="space-y-8">
        {/* Section Heading with Entrance Animation */}
        <motion.div
          initial={shouldReduceMotion ? false : { opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: false, margin: "-60px" }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        >
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/[0.04] border border-white/[0.08] text-[11px] font-mono text-zinc-400 mb-2 shadow-sm">
            <Sparkles className="w-3.5 h-3.5 text-sky-400" />
            <span>Tech Stack</span>
          </div>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold tracking-tight text-white">
            Technical Skills
          </h2>
          <p className="text-xs sm:text-sm text-zinc-400 mt-1">
            Languages, platforms, and frameworks I use regularly.
          </p>
        </motion.div>

        {/* Compact Terminal Box with Staggered Skills */}
        <motion.div
          initial={shouldReduceMotion ? false : { opacity: 0, y: 30, scale: 0.96 }}
          whileInView={{ opacity: 1, y: 0, scale: 1 }}
          viewport={{ once: false, margin: "-40px" }}
          transition={{ duration: 0.65, ease: [0.16, 1, 0.3, 1] }}
          className="relative p-6 sm:p-8 rounded-3xl bg-[#0e121b]/70 backdrop-blur-xl border border-white/[0.10] shadow-[0_8px_36px_rgba(0,0,0,0.45)] max-w-2xl overflow-hidden group hover:border-sky-400/30 transition-all duration-300"
        >
          {/* Workstation Header Bar */}
          <div className="flex items-center justify-between pb-4 border-b border-white/[0.06]">
            {/* Terminal Window Controls */}
            <div className="flex items-center gap-1.5">
              <span className="w-2.5 h-2.5 rounded-full bg-red-500/70" />
              <span className="w-2.5 h-2.5 rounded-full bg-yellow-500/70" />
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-500/70" />
            </div>

            {/* Title */}
            <div className="flex items-center gap-1.5 text-xs font-mono text-zinc-400">
              <Terminal className="w-3.5 h-3.5 text-sky-400" />
              <span>skills.config.ts</span>
            </div>

            {/* Tool Count Badge */}
            <span className="px-2.5 py-0.5 rounded-full text-[10px] font-mono text-zinc-300 bg-white/[0.06] border border-white/[0.08]">
              {portfolioConfig.skills.length} core tools
            </span>
          </div>

          {/* Arranged Skills inside the box with Pop/Scale Stagger & Spring Float */}
          <div className="flex flex-wrap gap-2.5 sm:gap-3 pt-6">
            {portfolioConfig.skills.map((skill, index) => (
              <motion.div
                key={skill}
                initial={shouldReduceMotion ? false : { opacity: 0, scale: 0.8, y: 10 }}
                whileInView={{ opacity: 1, scale: 1, y: 0 }}
                viewport={{ once: false }}
                transition={{ duration: 0.4, delay: index * 0.03, ease: [0.16, 1, 0.3, 1] }}
                whileHover={shouldReduceMotion ? {} : { y: -4, scale: 1.07 }}
                whileTap={{ scale: 0.94 }}
                className="group/pill inline-flex items-center gap-2.5 px-4 py-2.5 rounded-full text-xs sm:text-sm font-medium text-zinc-200 hover:text-white bg-white/[0.04] hover:bg-white/[0.12] border border-white/[0.08] hover:border-sky-400/50 transition-all duration-200 cursor-pointer select-none shadow-[0_2px_12px_rgba(0,0,0,0.25)] hover:shadow-[0_4px_20px_rgba(56,189,248,0.25)]"
              >
                <span
                  className={`w-2 h-2 rounded-full ${getSkillColor(skill)} transition-transform group-hover/pill:scale-150`}
                />
                <span>{skill}</span>
              </motion.div>
            ))}
          </div>

          {/* Ambient Box Footer */}
          <div className="mt-7 pt-4 border-t border-white/[0.05] flex items-center justify-between text-[11px] text-zinc-400">
            <span className="flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5 text-amber-400" />
              <span>Hands-on problem solving &amp; continuous building</span>
            </span>
            <span className="font-mono text-emerald-400 font-semibold flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
              <span>Active</span>
            </span>
          </div>
        </motion.div>
      </div>
    </section>
  );
};
