import React from 'react';
import { motion } from 'motion/react';
import { GlyphDecryptText } from './GlyphDecryptText';
import { PORTFOLIO_DATA } from '../data/portfolioData';

export const JourneySection: React.FC = () => {
  const { journey } = PORTFOLIO_DATA;

  return (
    <section id="journey" className="py-20 px-6 relative">
      <div className="max-w-4xl mx-auto">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false, amount: 0.15 }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="mb-14"
        >
          <h2 className="text-3xl sm:text-4xl font-bold tracking-wider text-white font-dot">
            <GlyphDecryptText text="MY JOURNEY" speed={28} />
          </h2>
          <div className="mt-2.5 flex items-center gap-2">
            <motion.div
              initial={{ scaleX: 0 }}
              whileInView={{ scaleX: 1 }}
              viewport={{ once: false }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              style={{ originX: 0 }}
              className="h-[2px] w-24 bg-gradient-to-r from-[#00ff66] to-transparent rounded-full"
            />
            <span className="w-1.5 h-1.5 rounded-full bg-[#00ff66] animate-pulse" />
          </div>
        </motion.div>

        {/* Continuous, Aligned Living Timeline */}
        <div className="relative">
          {/* Continuous vertical timeline track line with glowing energy pulse */}
          <div className="absolute left-4 sm:left-6 top-8 bottom-8 w-[2px] bg-zinc-800 pointer-events-none -translate-x-1/2 overflow-hidden rounded-full">
            {/* Ambient track glow base */}
            <div className="absolute inset-0 bg-gradient-to-b from-white/20 via-[#00b848]/30 to-transparent" />
            {/* Light, subtle energy pulse traversing the track */}
            <motion.div
              animate={{ y: ['-100%', '350%'] }}
              transition={{ duration: 4.5, repeat: Infinity, ease: 'easeInOut' }}
              className="w-full h-28 bg-gradient-to-b from-transparent via-[#00ff66]/35 to-transparent"
            />
          </div>

          <div className="space-y-6 sm:space-y-8">
            {journey.map((item, idx) => {
              const isActive = item.isActive;

              return (
                <motion.div
                  key={item.year}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: false, amount: 0.08 }}
                  transition={{ duration: 0.5, delay: idx * 0.06, ease: [0.22, 1, 0.36, 1] }}
                  className="relative flex items-start group transform-gpu will-change-transform"
                >
                  {/* Timeline Concentric Ring Bullet Node - Clean, light and subtle */}
                  <div className="absolute left-4 sm:left-6 top-7 sm:top-8 -translate-x-1/2 -translate-y-1/2 z-10 flex items-center justify-center pointer-events-none">
                    {isActive ? (
                      <div className="relative flex items-center justify-center">
                        {/* Soft, delicate breathing halo - very light, no harsh ping */}
                        <span className="absolute w-5.5 h-5.5 rounded-full bg-[#00ff66]/10 animate-pulse duration-1000" />
                        {/* Outer Green Ring */}
                        <div className="w-[18px] h-[18px] rounded-full border-[1.5px] border-[#00ff66]/80 bg-zinc-950 flex items-center justify-center shadow-[0_0_8px_rgba(0,255,102,0.25)]">
                          {/* Inner Green Dot */}
                          <span className="w-1.5 h-1.5 rounded-full bg-[#00ff66]" />
                        </div>
                      </div>
                    ) : (
                      <div className="relative flex items-center justify-center">
                        {/* Outer White/Zinc Ring */}
                        <div className="w-[18px] h-[18px] rounded-full border border-white/40 bg-zinc-950 flex items-center justify-center shadow-[0_0_5px_rgba(255,255,255,0.15)]">
                          {/* Inner White Dot */}
                          <span className="w-1.5 h-1.5 rounded-full bg-white/80" />
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Milestone Card - clean, sleek, minimal Nothing OS aesthetic matching screenshot */}
                  <div className="flex-1 ml-10 sm:ml-14">
                    <motion.div
                      whileHover={{ x: 5 }}
                      transition={{ duration: 0.2, ease: 'easeOut' }}
                      className={`relative overflow-hidden rounded-2xl p-5 sm:p-6 transition-colors duration-300 backdrop-blur-md border ${
                        isActive
                          ? 'bg-zinc-950/70 border-white/15 hover:border-[#00b848]/50 hover:bg-zinc-900/60 hover:shadow-[0_10px_35px_rgba(0,0,0,0.7),0_0_25px_rgba(0,184,72,0.15)]'
                          : 'bg-zinc-950/60 border-white/10 hover:border-white/25 hover:bg-zinc-900/50 hover:shadow-[0_10px_30px_rgba(0,0,0,0.6)]'
                      } group/card cursor-default`}
                    >
                      {/* Subtle Living Shimmer Sweep on Hover */}
                      <span className="pointer-events-none absolute inset-0 w-1/2 h-full bg-gradient-to-r from-transparent via-white/[0.04] to-transparent opacity-0 group-hover/card:opacity-100 animate-shimmer-sweep transition-opacity" />

                      {/* Header Row: Badge + Title side by side */}
                      <div className="flex flex-wrap items-center gap-3 mb-2">
                        {/* Badge */}
                        {isActive ? (
                          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#00b848]/15 border border-[#00b848]/40 text-[#00ff66] text-xs font-mono font-semibold tracking-wide shadow-[0_0_12px_rgba(0,184,72,0.25)]">
                            <span className="w-1.5 h-1.5 rounded-full bg-[#00ff66] animate-pulse" />
                            {item.year}
                          </span>
                        ) : (
                          <span className="inline-flex items-center px-3 py-1 rounded-full bg-zinc-800/80 border border-white/10 text-zinc-300 text-xs font-mono font-medium tracking-wide">
                            {item.year}
                          </span>
                        )}

                        {/* Title */}
                        <h3 className="text-base sm:text-lg font-bold text-white tracking-normal font-space group-hover/card:text-zinc-100 transition-colors">
                          {item.title}
                        </h3>
                      </div>

                      {/* Description Text */}
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
