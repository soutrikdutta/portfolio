import React, { useRef } from 'react';
import { motion, useScroll, useSpring, useTransform } from 'motion/react';
import { MapPin, GraduationCap, Sparkles } from 'lucide-react';
import { FluxCard } from './FluxCard';
import { GlyphDecryptText } from './GlyphDecryptText';
import { PORTFOLIO_DATA } from '../data/portfolioData';
import { useScrollDirection } from '../hooks/useScrollAnimation';

export const AboutSection: React.FC = () => {
  const { profile } = PORTFOLIO_DATA;
  const sectionRef = useRef<HTMLDivElement>(null);
  const direction = useScrollDirection();

  // Continuous bi-directional scroll parallax
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'end start'],
  });
  const smoothProgress = useSpring(scrollYProgress, { stiffness: 180, damping: 26 });
  const narrativeY = useTransform(smoothProgress, [0, 1], [-12, 12]);
  const specBoxY = useTransform(smoothProgress, [0, 1], [14, -14]);

  const offset = direction === 'down' ? 24 : -24;

  return (
    <section ref={sectionRef} id="about" className="py-20 px-6 relative">
      <div className="max-w-6xl mx-auto">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: offset }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false, amount: 0.1 }}
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
          {/* Main Story Narrative with Bi-directional Float */}
          <motion.div
            style={{ y: narrativeY }}
            initial={{ opacity: 0, y: offset }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false, amount: 0.1 }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-7 space-y-6 font-space transform-gpu will-change-transform"
          >
            <motion.p
              initial={{ opacity: 0, y: offset * 0.7 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: false, amount: 0.1 }}
              transition={{ duration: 0.55, delay: 0.05, ease: [0.16, 1, 0.3, 1] }}
              className="text-lg sm:text-xl text-white leading-relaxed font-medium"
            >
              I&apos;m a B.Tech student at{' '}
              <span className="text-white font-bold underline decoration-white/30 underline-offset-4">
                Techno India University
              </span>
              , exploring technology through web development, coding, and hands-on projects.
            </motion.p>

            <motion.p
              initial={{ opacity: 0, y: offset * 0.7 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: false, amount: 0.1 }}
              transition={{ duration: 0.55, delay: 0.12, ease: [0.16, 1, 0.3, 1] }}
              className="text-base sm:text-lg text-zinc-200 leading-relaxed"
            >
              I enjoy turning ideas into websites and applications using clean, efficient code and modern tools like{' '}
              <span className="text-white font-medium">generative AI</span>.
            </motion.p>

            <motion.p
              initial={{ opacity: 0, y: offset * 0.7 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: false, amount: 0.1 }}
              transition={{ duration: 0.55, delay: 0.18, ease: [0.16, 1, 0.3, 1] }}
              className="text-base sm:text-lg text-zinc-300 leading-relaxed"
            >
              Currently, I&apos;m focused on learning, experimenting with new technologies, and building things that genuinely interest me.
            </motion.p>
          </motion.div>

          {/* Beside It: Spec Sheet Box with Bi-directional Float */}
          <motion.div
            style={{ y: specBoxY }}
            initial={{ opacity: 0, scale: 0.97, y: offset }}
            whileInView={{ opacity: 1, scale: 1, y: 0 }}
            viewport={{ once: false, amount: 0.1 }}
            transition={{ duration: 0.65, delay: 0.08, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-5 transform-gpu will-change-transform"
          >
            <FluxCard className="p-6 relative group border-white/10 hover:border-white/20">
              {/* Data Key-Values with Category Accents & Staggered Scroll Reveal */}
              <motion.div
                variants={{ hidden: {}, visible: { transition: { staggerChildren: 0.1, delayChildren: 0.08 } } }}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: false, amount: 0.1 }}
                className="space-y-3.5 font-space text-sm"
              >
                {/* Based in - Rose Accent */}
                <motion.div
                  variants={{ hidden: { opacity: 0, x: -16 }, visible: { opacity: 1, x: 0, transition: { duration: 0.45, ease: [0.22, 1, 0.36, 1] } } }}
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
                  variants={{ hidden: { opacity: 0, x: -16 }, visible: { opacity: 1, x: 0, transition: { duration: 0.45, ease: [0.22, 1, 0.36, 1] } } }}
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
                  variants={{ hidden: { opacity: 0, x: -16 }, visible: { opacity: 1, x: 0, transition: { duration: 0.45, ease: [0.22, 1, 0.36, 1] } } }}
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
              </motion.div>
            </FluxCard>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
