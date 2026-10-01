import React from 'react';
import { motion } from 'motion/react';
import { MapPin, GraduationCap, Sparkles } from 'lucide-react';
import { FluxCard } from './FluxCard';
import { GlyphDecryptText } from './GlyphDecryptText';
import { PORTFOLIO_DATA } from '../data/portfolioData';

export const AboutSection: React.FC = () => {
  const { profile } = PORTFOLIO_DATA;

  return (
    <section id="about" className="py-20 px-6 relative">
      <div className="max-w-6xl mx-auto">
        {/* Section Header */}
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false, amount: 0.15 }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="mb-12"
        >
          <h2 className="text-3xl sm:text-4xl font-bold tracking-wider text-white font-dot">
            <GlyphDecryptText text="ABOUT ME" speed={28} />
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

        {/* 2-Column Content Layout: Narrative + Spec Box */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Main Story Narrative */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false, amount: 0.08 }}
            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
            className="lg:col-span-7 space-y-6 font-space transform-gpu will-change-transform"
          >
            <p className="text-lg sm:text-xl text-white leading-relaxed font-medium">
              I&apos;m a B.Tech student at{' '}
              <span className="text-white font-bold underline decoration-white/30 underline-offset-4">
                Techno India University
              </span>
              , exploring technology through web development, coding, and hands-on projects.
            </p>

            <p className="text-base sm:text-lg text-zinc-200 leading-relaxed">
              I enjoy turning ideas into websites and applications using clean, efficient code and modern tools like{' '}
              <span className="text-white font-medium">generative AI</span>.
            </p>

            <p className="text-base sm:text-lg text-zinc-300 leading-relaxed">
              Currently, I&apos;m focused on learning, experimenting with new technologies, and building things that genuinely interest me.
            </p>
          </motion.div>

          {/* Beside It: Spec Sheet Box */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false, amount: 0.08 }}
            transition={{ duration: 0.5, delay: 0.08, ease: [0.22, 1, 0.36, 1] }}
            className="lg:col-span-5 transform-gpu will-change-transform"
          >
            <FluxCard className="p-6 relative group border-white/10 hover:border-white/20">

              {/* Data Key-Values with Vibrant Category Accents & Hover Spring */}
              <div className="space-y-3.5 font-space text-sm">
                {/* Based in - Rose Accent */}
                <motion.div
                  whileHover={{ x: 5 }}
                  transition={{ type: 'spring', stiffness: 400, damping: 25 }}
                  className="p-3 rounded-xl bg-zinc-950/70 border border-white/5 flex items-start gap-3 hover:border-rose-500/40 hover:bg-zinc-900/60 transition-colors duration-200 cursor-default"
                >
                  <div className="p-2 rounded-lg bg-rose-500/15 border border-rose-500/30 text-rose-400 shrink-0 shadow-[0_0_12px_rgba(244,63,94,0.15)]">
                    <MapPin className="w-3.5 h-3.5" />
                  </div>
                  <div>
                    <div className="text-[10px] text-zinc-400 uppercase tracking-wider">Based In</div>
                    <div className="text-white font-medium mt-0.5">{profile.location}</div>
                  </div>
                </motion.div>

                {/* Currently - Blue Accent */}
                <motion.div
                  whileHover={{ x: 5 }}
                  transition={{ type: 'spring', stiffness: 400, damping: 25 }}
                  className="p-3 rounded-xl bg-zinc-950/70 border border-white/5 flex items-start gap-3 hover:border-blue-500/40 hover:bg-zinc-900/60 transition-colors duration-200 cursor-default"
                >
                  <div className="p-2 rounded-lg bg-blue-500/15 border border-blue-500/30 text-blue-400 shrink-0 shadow-[0_0_12px_rgba(59,130,246,0.15)]">
                    <GraduationCap className="w-3.5 h-3.5" />
                  </div>
                  <div>
                    <div className="text-[10px] text-zinc-400 uppercase tracking-wider">Currently</div>
                    <div className="text-white font-medium mt-0.5">{profile.role}</div>
                  </div>
                </motion.div>

                {/* Interests - Purple Accent */}
                <motion.div
                  whileHover={{ x: 5 }}
                  transition={{ type: 'spring', stiffness: 400, damping: 25 }}
                  className="p-3 rounded-xl bg-zinc-950/70 border border-white/5 flex items-start gap-3 hover:border-purple-500/40 hover:bg-zinc-900/60 transition-colors duration-200 cursor-default"
                >
                  <div className="p-2 rounded-lg bg-purple-500/15 border border-purple-500/30 text-purple-400 shrink-0 shadow-[0_0_12px_rgba(168,85,247,0.15)]">
                    <Sparkles className="w-3.5 h-3.5" />
                  </div>
                  <div>
                    <div className="text-[10px] text-zinc-400 uppercase tracking-wider">Interests</div>
                    <div className="text-purple-300 font-medium mt-0.5">{profile.interests}</div>
                  </div>
                </motion.div>
              </div>
            </FluxCard>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
