import React from "react";
import { motion, useReducedMotion } from "framer-motion";
import { portfolioConfig } from "../portfolio.config";
import { Sparkles } from "lucide-react";

export const Journey: React.FC = () => {
  const shouldReduceMotion = useReducedMotion();

  return (
    <section
      id="journey"
      className="py-20 sm:py-28 max-w-4xl mx-auto px-5 sm:px-8 border-t border-white/[0.06] scroll-mt-20"
      aria-label="Journey section"
    >
      <div className="space-y-10">
        {/* Section Heading with Entrance Animation */}
        <motion.div
          initial={shouldReduceMotion ? false : { opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: false, margin: "-15px" }}
          transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
          className="hardware-accelerated"
        >
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/[0.04] border border-white/[0.08] text-[11px] font-mono text-zinc-400 mb-2 shadow-sm">
            <Sparkles className="w-3.5 h-3.5 text-emerald-400" />
            <span>Academic Path</span>
          </div>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold tracking-tight text-white">
            My Journey
          </h2>
          <p className="text-xs sm:text-sm text-zinc-400 mt-1">
            Milestones and educational progression.
          </p>
        </motion.div>

        {/* Bulletproof Vertical Timeline with Animated Drawing & Laser Pulse */}
        <div className="relative space-y-3">
          {portfolioConfig.journey.map((item, index) => {
            const isGreen = index >= 1;
            const isLast = index === portfolioConfig.journey.length - 1;

            return (
              <motion.div
                key={index}
                initial={shouldReduceMotion ? false : { opacity: 0, y: 25, x: -10 }}
                whileInView={{ opacity: 1, y: 0, x: 0 }}
                viewport={{ once: false, margin: "-15px" }}
                transition={{ duration: 0.45, delay: index * 0.08, ease: [0.16, 1, 0.3, 1] }}
                className="flex items-stretch gap-4 sm:gap-6 group hardware-accelerated"
              >
                {/* Dedicated Track Column: Dot and Line */}
                <div className="relative flex flex-col items-center flex-shrink-0 w-6 pt-2">
                  {/* Milestone Node with Radiant Glow */}
                  <div
                    className={`w-4 h-4 rounded-full bg-[#080a0f] flex items-center justify-center border-2 transition-all duration-300 z-10 shadow-sm ${
                      isGreen
                        ? "border-emerald-400 shadow-[0_0_14px_rgba(16,185,129,0.7)]"
                        : "border-zinc-300 group-hover:border-white shadow-[0_0_8px_rgba(255,255,255,0.3)]"
                    }`}
                    aria-hidden="true"
                  >
                    <span
                      className={`w-1.5 h-1.5 rounded-full ${
                        isGreen
                          ? "bg-emerald-400"
                          : "bg-zinc-300 group-hover:bg-white"
                      } transition-colors`}
                    />
                  </div>

                  {/* Connecting Line with Laser Pulse */}
                  {!isLast && (
                    <div
                      className="relative w-[2px] flex-1 bg-gradient-to-b from-white/25 via-white/15 to-white/10 group-hover:from-emerald-400/40 my-1.5 transition-colors overflow-hidden"
                      aria-hidden="true"
                    >
                      <div className="timeline-laser-pulse" />
                    </div>
                  )}
                </div>

                {/* Milestone Content Card */}
                <div className={`flex-1 ${!isLast ? "pb-7 sm:pb-8" : "pb-2"}`}>
                  <motion.div
                    whileHover={shouldReduceMotion ? {} : { y: -4, scale: 1.01 }}
                    className="p-5 sm:p-6 rounded-2xl bg-[#0f121b]/65 hover:bg-[#131724]/90 border border-white/[0.08] hover:border-emerald-500/30 transition-all duration-300 max-w-xl space-y-2 shadow-[0_4px_24px_rgba(0,0,0,0.35)] hover:shadow-[0_12px_36px_rgba(16,185,129,0.12)]"
                  >
                    <div className="flex flex-wrap items-center gap-2 sm:gap-3">
                      <span
                        className={`px-3 py-0.5 rounded-full text-[11px] font-mono font-semibold ${
                          isGreen
                            ? "text-emerald-300 bg-emerald-500/15 border border-emerald-500/30 shadow-[0_0_10px_rgba(16,185,129,0.2)]"
                            : "text-zinc-300 bg-white/[0.06] border border-white/[0.10]"
                        }`}
                      >
                        {item.year}
                      </span>
                      <h3 className="text-sm sm:text-base font-semibold text-white tracking-tight group-hover:text-emerald-200 transition-colors">
                        {item.institution}
                      </h3>
                    </div>

                    <p className="text-xs sm:text-sm text-zinc-300 font-normal leading-relaxed pt-0.5">
                      {item.description}
                    </p>
                  </motion.div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
