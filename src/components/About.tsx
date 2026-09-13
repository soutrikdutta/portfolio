import React from "react";
import { motion, useReducedMotion } from "framer-motion";
import { portfolioConfig } from "../portfolio.config";
import { MapPin, GraduationCap, Code2, Sparkles } from "lucide-react";

export const About: React.FC = () => {
  const shouldReduceMotion = useReducedMotion();

  const metadataIcons = [
    <MapPin key="map" className="w-4 h-4 text-sky-400" />,
    <GraduationCap key="grad" className="w-4 h-4 text-emerald-400" />,
    <Code2 key="code" className="w-4 h-4 text-amber-400" />,
    <Sparkles key="spark" className="w-4 h-4 text-purple-400" />,
  ];

  return (
    <section
      id="about"
      className="py-20 sm:py-28 max-w-4xl mx-auto px-5 sm:px-8 border-t border-white/[0.06] scroll-mt-20"
      aria-label="About section"
    >
      <div className="space-y-10">
        {/* Clean Section Heading with Slide from Left */}
        <motion.div
          initial={shouldReduceMotion ? false : { opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: false, margin: "-60px" }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        >
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold tracking-tight text-white">
            About Me
          </h2>
          <p className="text-xs sm:text-sm text-zinc-400 mt-1">
            A quick overview of my background, focus, and drive.
          </p>
        </motion.div>

        {/* 2-Column Editorial Layout on Desktop */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 sm:gap-10 items-start">
          {/* Left Column: Natural, Short Bio */}
          <div className="md:col-span-7 space-y-4 text-base text-zinc-300 font-normal leading-relaxed">
            {portfolioConfig.about.bio.map((paragraph, index) => (
              <motion.p
                key={index}
                initial={shouldReduceMotion ? false : { opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: false, margin: "-40px" }}
                transition={{ duration: 0.55, delay: index * 0.08, ease: [0.16, 1, 0.3, 1] }}
                className="hover:text-zinc-100 transition-colors"
              >
                {paragraph}
              </motion.p>
            ))}
          </div>

          {/* Right Column: Sleek Frosted Profile Specs Box with Slide from Right */}
          <motion.div
            initial={shouldReduceMotion ? false : { opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: false, margin: "-50px" }}
            transition={{ duration: 0.65, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
            whileHover={shouldReduceMotion ? {} : { y: -3 }}
            className="md:col-span-5 p-5 sm:p-6 rounded-2xl bg-[#0f121b]/65 hover:bg-[#121622]/85 backdrop-blur-xl border border-white/[0.08] hover:border-white/[0.2] shadow-[0_4px_24px_rgba(0,0,0,0.35)] hover:shadow-[0_12px_36px_rgba(0,0,0,0.45)] transition-all duration-300 space-y-4"
          >
            <div className="flex items-center justify-between pb-3 border-b border-white/[0.06]">
              <span className="text-xs font-mono uppercase tracking-wider text-zinc-400">
                Overview
              </span>
            </div>

            <div className="space-y-3.5 text-xs sm:text-sm">
              {portfolioConfig.about.metadata.map((item, idx) => (
                <motion.div
                  key={idx}
                  initial={shouldReduceMotion ? false : { opacity: 0, y: 8 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: false }}
                  transition={{ delay: 0.15 + idx * 0.06 }}
                  className="flex items-center justify-between gap-3 p-1.5 rounded-lg hover:bg-white/[0.03] transition-colors"
                >
                  <div className="flex items-center gap-2 text-zinc-400 min-w-[90px]">
                    {metadataIcons[idx % metadataIcons.length]}
                    <span>{item.label}</span>
                  </div>
                  <span className="text-zinc-200 font-medium text-right text-xs">
                    {item.value}
                  </span>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
