import React from "react";
import { motion, useReducedMotion } from "framer-motion";
import { portfolioConfig } from "../portfolio.config";
import { MapPin, GraduationCap, Code2, Sparkles } from "lucide-react";

export const About: React.FC = () => {
  const shouldReduceMotion = useReducedMotion();

  const metadataIcons = [
    <MapPin key="map" className="w-4 h-4 text-zinc-400" />,
    <GraduationCap key="grad" className="w-4 h-4 text-zinc-400" />,
    <Code2 key="code" className="w-4 h-4 text-zinc-400" />,
    <Sparkles key="spark" className="w-4 h-4 text-zinc-400" />,
  ];

  return (
    <section
      id="about"
      className="py-20 sm:py-28 max-w-4xl mx-auto px-5 sm:px-8 border-t border-white/[0.06]"
      aria-label="About section"
    >
      <div className="space-y-10">
        {/* Clean Section Heading */}
        <div>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold tracking-tight text-white">
            About Me
          </h2>
        </div>

        {/* 2-Column Editorial Layout on Desktop */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 sm:gap-10 items-start">
          {/* Left Column: Natural, Short Bio */}
          <div className="md:col-span-7 space-y-4 text-base text-zinc-300 font-normal leading-relaxed">
            {portfolioConfig.about.bio.map((paragraph, index) => (
              <motion.p
                key={index}
                initial={shouldReduceMotion ? false : { opacity: 0, y: 6 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.45, delay: index * 0.1 }}
              >
                {paragraph}
              </motion.p>
            ))}
          </div>

          {/* Right Column: Sleek Frosted Profile Specs Box */}
          <motion.div
            initial={shouldReduceMotion ? false : { opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.5, delay: 0.15 }}
            className="md:col-span-5 p-5 sm:p-6 rounded-2xl bg-[#0f121b]/60 backdrop-blur-md border border-white/[0.08] shadow-[0_4px_24px_rgba(0,0,0,0.3)] space-y-4"
          >
            <div className="text-xs font-mono uppercase tracking-wider text-zinc-400 pb-3 border-b border-white/[0.06]">
              Overview
            </div>

            <div className="space-y-3.5 text-xs sm:text-sm">
              {portfolioConfig.about.metadata.map((item, idx) => (
                <div key={idx} className="flex items-center justify-between gap-3">
                  <div className="flex items-center gap-2 text-zinc-400 min-w-[90px]">
                    {metadataIcons[idx % metadataIcons.length]}
                    <span>{item.label}</span>
                  </div>
                  <span className="text-zinc-200 font-medium text-right text-xs">
                    {item.value}
                  </span>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
