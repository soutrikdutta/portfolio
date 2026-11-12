import React, { useRef } from 'react';
import { motion, useScroll, useSpring } from 'motion/react';
import { SectionHeader } from './SectionHeader';
import { PORTFOLIO_DATA } from '../data/portfolioData';

export const JourneySection: React.FC = () => {
  const { journey } = PORTFOLIO_DATA;
  const containerRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start 65%', 'end 75%'],
  });

  const lineHeight = useSpring(scrollYProgress, {
    stiffness: 280,
    damping: 32,
    restDelta: 0.001,
  });

  return (
    <section id="journey" className="py-20 sm:py-28 px-5 sm:px-6 relative">
      <div className="max-w-5xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false, amount: 0.15 }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
        >
          <SectionHeader
            tag="TIMELINE"
            title="EXPERIENCE & JOURNEY"
            subtitle="Academic foundations, competitive milestones, and engineering growth."
          />
        </motion.div>

        <div ref={containerRef} className="relative">
          {/* Track */}
          <div className="absolute left-[7px] sm:left-[11px] top-6 bottom-6 w-px bg-white/10 pointer-events-none overflow-hidden">
            <motion.div
              style={{ scaleY: lineHeight, originY: 0 }}
              className="absolute inset-x-0 top-0 h-full w-px bg-gradient-to-b from-[#00f59b] via-[#00e5ff] to-[#3b82f6] shadow-[0_0_12px_rgba(0,245,155,0.6)] transform-gpu will-change-transform"
            />
          </div>

          <div className="space-y-5 sm:space-y-6">
            {journey.map((item, idx) => {
              const isActive = item.isActive;

              return (
                <motion.div
                  key={item.year}
                  initial={{ opacity: 0, x: -16 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: false, amount: 0.15 }}
                  transition={{ duration: 0.6, delay: idx * 0.08, ease: [0.16, 1, 0.3, 1] }}
                  className="relative flex items-start group transform-gpu will-change-transform"
                >
                  {/* Node */}
                  <motion.div
                    initial={{ scale: 0.7, opacity: 0 }}
                    whileInView={{ scale: 1, opacity: 1 }}
                    viewport={{ once: false, amount: 0.2 }}
                    transition={{ duration: 0.45, delay: idx * 0.08 + 0.1, ease: [0.22, 1, 0.36, 1] }}
                    className="absolute left-[7px] sm:left-[11px] top-8 -translate-x-1/2 z-10 flex items-center justify-center pointer-events-none"
                  >
                    {isActive ? (
                      <span className="relative flex items-center justify-center">
                        <span className="w-3 h-3 rounded-full bg-[#00f59b] shadow-[0_0_10px_#00f59b]" />
                        <span className="absolute w-5 h-5 rounded-full bg-[#00f59b]/30 animate-ping" />
                      </span>
                    ) : (
                      <span className="w-2.5 h-2.5 rounded-full bg-zinc-600 border border-zinc-900 group-hover:bg-[#00f59b] transition-colors" />
                    )}
                  </motion.div>

                  {/* Card */}
                  <div className="flex-1 ml-7 sm:ml-10">
                    <motion.div
                      whileHover={{ x: 5 }}
                      transition={{ type: 'spring', stiffness: 300, damping: 26 }}
                      className={`relative overflow-hidden rounded-2xl p-5 sm:p-6 border transition-all duration-300 ${
                        isActive
                          ? 'bg-zinc-950/80 border-[#00f59b]/30 hover:border-[#00f59b]/60 shadow-[0_4px_30px_rgba(0,245,155,0.08)]'
                          : 'bg-zinc-950/60 border-white/10 hover:border-white/20'
                      } group/card cursor-default backdrop-blur-xl`}
                    >
                      <div className="flex flex-wrap items-center gap-3 mb-2.5">
                        <span
                          className={`font-mono text-[10px] tracking-[0.12em] px-3 py-1 rounded-full border ${
                            isActive
                              ? 'text-zinc-950 bg-[#00f59b] border-[#00f59b] font-bold shadow-[0_0_12px_rgba(0,245,155,0.4)]'
                              : 'text-zinc-400 bg-white/[0.04] border-white/10 font-semibold'
                          }`}
                        >
                          {item.year}
                        </span>

                        <h3 className="font-dot text-lg sm:text-xl font-bold text-white leading-tight">
                          {item.title}
                        </h3>
                      </div>

                      <p className="text-sm text-zinc-300 font-space leading-relaxed">
                        {item.shortLine}
                      </p>
                    </motion.div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};
