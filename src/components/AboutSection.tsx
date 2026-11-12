import React, { useRef } from 'react';
import { motion, useScroll, useSpring, useTransform } from 'motion/react';
import { MapPin, GraduationCap, Sparkles } from 'lucide-react';
import { FluxCard } from './FluxCard';
import { SectionHeader } from './SectionHeader';
import { PORTFOLIO_DATA } from '../data/portfolioData';
import { useScrollDirection } from '../hooks/useScrollAnimation';

export const AboutSection: React.FC = () => {
  const { profile } = PORTFOLIO_DATA;
  const sectionRef = useRef<HTMLDivElement>(null);
  const direction = useScrollDirection();

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'end start'],
  });
  const smoothProgress = useSpring(scrollYProgress, { stiffness: 180, damping: 26 });
  const narrativeY = useTransform(smoothProgress, [0, 1], [-10, 10]);
  const specBoxY = useTransform(smoothProgress, [0, 1], [12, -12]);

  const offset = direction === 'down' ? 24 : -24;

  return (
    <section ref={sectionRef} id="about" className="py-20 sm:py-28 px-5 sm:px-6 relative">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: offset }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false, amount: 0.1 }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
        >
          <SectionHeader tag="BIOGRAPHY" title="ABOUT ME" subtitle="Computer science student, builder, and problem solver." />
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-start">
          {/* Narrative */}
          <motion.div
            style={{ y: narrativeY }}
            initial={{ opacity: 0, y: offset }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false, amount: 0.1 }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-7 space-y-6 font-space transform-gpu will-change-transform"
          >
            <motion.p
              initial={{ opacity: 0, y: offset * 0.7 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: false, amount: 0.1 }}
              transition={{ duration: 0.6, delay: 0.05, ease: [0.16, 1, 0.3, 1] }}
              className="text-2xl sm:text-[1.7rem] leading-[1.35] text-white font-medium"
            >
              I&apos;m a B.Tech student at{' '}
              <span className="font-dot text-[#00f59b] font-semibold">Techno India University</span>, exploring
              technology through web development, coding, and hands-on projects.
            </motion.p>

            <motion.p
              initial={{ opacity: 0, y: offset * 0.7 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: false, amount: 0.1 }}
              transition={{ duration: 0.6, delay: 0.12, ease: [0.16, 1, 0.3, 1] }}
              className="text-base sm:text-[17px] text-zinc-300 leading-relaxed"
            >
              I enjoy turning ideas into websites and applications using clean, efficient code and modern
              tools like <span className="text-white font-semibold">generative AI</span>.
            </motion.p>

            <motion.p
              initial={{ opacity: 0, y: offset * 0.7 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: false, amount: 0.1 }}
              transition={{ duration: 0.6, delay: 0.18, ease: [0.16, 1, 0.3, 1] }}
              className="text-base sm:text-[17px] text-zinc-400 leading-relaxed"
            >
              Currently, I&apos;m focused on learning, experimenting with new technologies, and building
              things that genuinely interest me.
            </motion.p>

            <div className="pt-6 flex flex-wrap gap-x-10 gap-y-5 border-t border-white/10">
              {[
                { k: 'Based in', v: profile.location },
                { k: 'Degree', v: 'B.Tech CSE (AI/ML) · 2025–2029' },
                { k: 'Focus', v: 'Full-Stack Web & Gen AI' },
              ].map((item) => (
                <div key={item.k}>
                  <p className="eyebrow mb-1.5 text-zinc-500">{item.k}</p>
                  <p className="text-sm text-zinc-200 font-medium">{item.v}</p>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Spec sheet */}
          <motion.div
            style={{ y: specBoxY }}
            initial={{ opacity: 0, scale: 0.98, y: offset }}
            whileInView={{ opacity: 1, scale: 1, y: 0 }}
            viewport={{ once: false, amount: 0.1 }}
            transition={{ duration: 0.7, delay: 0.08, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-5 transform-gpu will-change-transform"
          >
            <FluxCard className="p-6 sm:p-7 border-white/15 bg-zinc-950/70 shadow-2xl">
              <div className="flex items-center justify-between mb-6">
                <p className="eyebrow text-[#00f59b] font-semibold">PROFILE SNAPSHOT</p>
                <span className="font-mono text-[10px] text-zinc-500">TIU · 2025–2029</span>
              </div>

              <motion.div
                variants={{ hidden: {}, visible: { transition: { staggerChildren: 0.1, delayChildren: 0.08 } } }}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: false, amount: 0.1 }}
                className="space-y-2.5 font-space text-sm"
              >
                {[
                  {
                    label: 'Based in',
                    value: profile.location,
                    icon: MapPin,
                  },
                  {
                    label: 'Currently',
                    value: profile.role,
                    icon: GraduationCap,
                  },
                  {
                    label: 'Interests',
                    value: profile.interests,
                    icon: Sparkles,
                    accent: true,
                  },
                ].map((item) => (
                  <motion.div
                    key={item.label}
                    variants={{
                      hidden: { opacity: 0, x: -12 },
                      visible: { opacity: 1, x: 0, transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] } },
                    }}
                    whileHover={{ x: 4 }}
                    transition={{ type: 'spring', stiffness: 400, damping: 26 }}
                    className="group flex items-start gap-3.5 p-3.5 rounded-2xl border border-white/10 bg-white/[0.03] hover:border-[#00f59b]/35 hover:bg-white/[0.06] transition-all duration-300 cursor-default"
                  >
                    <div className="w-9 h-9 rounded-xl border border-white/10 bg-white/[0.05] flex items-center justify-center text-zinc-400 group-hover:text-[#00f59b] group-hover:border-[#00f59b]/35 transition-colors shrink-0">
                      <item.icon className="w-3.5 h-3.5" />
                    </div>
                    <div className="min-w-0">
                      <div className="font-mono text-[10px] uppercase tracking-wider text-zinc-400 mb-0.5">{item.label}</div>
                      <div className={`${item.accent ? 'text-[#00f59b] font-semibold' : 'text-zinc-100'} font-medium leading-snug`}>
                        {item.value}
                      </div>
                    </div>
                  </motion.div>
                ))}
              </motion.div>
            </FluxCard>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
