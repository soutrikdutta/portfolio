import React from "react";
import { motion, useReducedMotion } from "framer-motion";
import { portfolioConfig } from "../portfolio.config";

export const Journey: React.FC = () => {
  const shouldReduceMotion = useReducedMotion();

  return (
    <section
      id="journey"
      className="py-20 sm:py-28 max-w-4xl mx-auto px-5 sm:px-8 border-t border-white/[0.06]"
      aria-label="Journey section"
    >
      <div className="space-y-10">
        {/* Section Heading */}
        <div>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold tracking-tight text-white">
            My Journey
          </h2>
        </div>

        {/* Bulletproof Vertical Timeline */}
        <div className="relative space-y-2">
          {portfolioConfig.journey.map((item, index) => {
            // Make the last two green as requested
            const isGreen = index >= 1;
            const isLast = index === portfolioConfig.journey.length - 1;

            return (
              <motion.div
                key={index}
                initial={shouldReduceMotion ? false : { opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.45, delay: index * 0.12 }}
                className="flex items-stretch gap-4 sm:gap-6 group"
              >
                {/* Dedicated Track Column: Dot and Line always 100% center-aligned */}
                <div className="relative flex flex-col items-center flex-shrink-0 w-6 pt-1.5">
                  {/* Milestone Node */}
                  <div
                    className={`w-4 h-4 rounded-full bg-[#080a0f] flex items-center justify-center border-2 transition-all duration-300 z-10 shadow-sm ${
                      isGreen
                        ? "border-emerald-500 shadow-[0_0_10px_rgba(16,185,129,0.3)]"
                        : "border-zinc-300 group-hover:border-white"
                    }`}
                    aria-hidden="true"
                  >
                    <span
                      className={`w-1.5 h-1.5 rounded-full ${
                        isGreen
                          ? "bg-emerald-400" + (isLast ? " animate-pulse" : "")
                          : "bg-zinc-300 group-hover:bg-white"
                      } transition-colors`}
                    />
                  </div>

                  {/* Clean continuous connecting line to next item */}
                  {!isLast && (
                    <div
                      className="w-[1.5px] flex-1 bg-white/20 group-hover:bg-white/35 transition-colors my-1.5"
                      aria-hidden="true"
                    />
                  )}
                </div>

                {/* Milestone Content Card */}
                <div className={`flex-1 ${!isLast ? "pb-7 sm:pb-8" : "pb-2"}`}>
                  <div className="p-4 sm:p-5 rounded-2xl bg-[#0f121b]/50 hover:bg-[#131722]/80 border border-white/[0.07] hover:border-white/[0.16] transition-all duration-200 max-w-xl space-y-1.5 shadow-sm">
                    <div className="flex flex-wrap items-center gap-2 sm:gap-3">
                      <span
                        className={`px-2.5 py-0.5 rounded-full text-[11px] font-mono font-medium ${
                          isGreen
                            ? "text-emerald-400 bg-emerald-500/10 border border-emerald-500/25"
                            : "text-zinc-300 bg-white/[0.05] border border-white/[0.08]"
                        }`}
                      >
                        {item.year}
                      </span>
                      <h3 className="text-sm sm:text-base font-medium text-white tracking-tight">
                        {item.institution}
                      </h3>
                    </div>

                    <p className="text-xs sm:text-sm text-zinc-400 font-normal leading-relaxed pt-0.5">
                      {item.description}
                    </p>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
