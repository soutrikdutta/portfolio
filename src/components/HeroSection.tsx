import React from 'react';
import { motion, useScroll, useTransform, useSpring } from 'motion/react';
import { ArrowDownRight, Mail, Phone, Github, Linkedin, ArrowUpRight } from 'lucide-react';
import { HeroPhotoCard } from './HeroPhotoCard';
import { GlyphDecryptText } from './GlyphDecryptText';
import { PORTFOLIO_DATA } from '../data/portfolioData';

interface HeroSectionProps {
  onScrollToProjects: () => void;
  onScrollToContact: () => void;
  onScrollToCertifications?: () => void;
}

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.09, delayChildren: 0.1 } },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] as const } },
};

export const HeroSection: React.FC<HeroSectionProps> = ({
  onScrollToProjects,
  onScrollToContact,
}) => {
  const { profile } = PORTFOLIO_DATA;

  const { scrollY } = useScroll();
  const smoothY = useSpring(scrollY, { stiffness: 180, damping: 28, restDelta: 0.001 });
  const contentY = useTransform(smoothY, [0, 500], [0, 46]);
  const contentOpacity = useTransform(smoothY, [0, 520], [1, 0.3]);
  const glowY = useTransform(smoothY, [0, 600], [0, 90]);

  const handleEmailClick = () => {
    const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
    if (isMobile) {
      window.location.href = `mailto:${profile.email}`;
    } else {
      window.open(
        `https://mail.google.com/mail/?view=cm&fs=1&to=${encodeURIComponent(profile.email)}`,
        '_blank',
        'noopener,noreferrer'
      );
    }
  };

  return (
    <section className="relative min-h-[100svh] md:min-h-[92vh] flex flex-col justify-center pt-28 sm:pt-36 pb-16 sm:pb-20 px-5 sm:px-6 overflow-hidden">
      {/* High-tech ambient radial auras */}
      <motion.div
        style={{ y: glowY }}
        className="pointer-events-none absolute -top-12 left-[10%] w-[600px] h-[600px] rounded-full blur-[160px] opacity-60"
        aria-hidden
      >
        <div className="w-full h-full bg-[radial-gradient(circle,rgba(0,245,155,0.18),transparent_65%)]" />
      </motion.div>
      <motion.div
        style={{ y: glowY }}
        className="pointer-events-none absolute bottom-4 right-[5%] w-[540px] h-[540px] rounded-full blur-[150px] opacity-50"
        aria-hidden
      >
        <div className="w-full h-full bg-[radial-gradient(circle,rgba(0,229,255,0.14),transparent_65%)]" />
      </motion.div>

      {/* Fine vertical guides */}
      <div className="pointer-events-none absolute inset-y-0 left-1/2 hidden xl:block w-px bg-gradient-to-b from-transparent via-white/[0.08] to-transparent" aria-hidden />

      <motion.div
        style={{ y: contentY, opacity: contentOpacity }}
        className="max-w-6xl mx-auto w-full relative z-10 grid grid-cols-1 md:grid-cols-12 gap-9 sm:gap-12 md:gap-10 lg:gap-14 items-center transform-gpu will-change-transform"
      >
        {/* Portrait */}
        <motion.div
          initial={{ opacity: 0, scale: 0.96 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: false, amount: 0.15 }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="order-1 md:col-span-5 flex justify-center w-full md:order-2"
        >
          <HeroPhotoCard />
        </motion.div>

        {/* Copy */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: false, amount: 0.15 }}
          className="order-2 md:col-span-7 md:order-1 flex flex-col items-center md:items-start text-center md:text-left"
        >
          {/* Status badge pill */}
          <motion.div variants={itemVariants} className="inline-flex items-center gap-2.5 mb-6 sm:mb-7 px-4 py-1.5 rounded-full border border-[#00f59b]/30 bg-[#00f59b]/10 backdrop-blur-xl shadow-[0_0_20px_rgba(0,245,155,0.15)]">
            <span className="w-2 h-2 rounded-full bg-[#00f59b] animate-pulse" />
            <span className="font-mono text-[11px] font-semibold tracking-[0.14em] uppercase text-[#00f59b]">
              <span className="sm:hidden">Available for opportunities</span>
              <span className="hidden sm:inline">Available for internships &amp; software roles</span>
            </span>
          </motion.div>

          <motion.p variants={itemVariants} className="font-mono text-xs uppercase tracking-[0.18em] mb-3 text-zinc-400">
            {profile.role} · {profile.location}
          </motion.p>

          <motion.h1 variants={itemVariants} className="mb-5 sm:mb-6 leading-[0.95]">
            <span className="block font-dot text-[clamp(2.8rem,9vw,5.6rem)] font-extrabold tracking-tight text-white drop-shadow-[0_2px_20px_rgba(255,255,255,0.15)]">
              <GlyphDecryptText text={profile.name} speed={28} />
            </span>
          </motion.h1>

          <motion.p
            variants={itemVariants}
            className="max-w-xl text-[16px] sm:text-lg text-zinc-300 leading-relaxed mb-8 sm:mb-9 lg:pr-8 font-space"
          >
            {profile.tagline} Focused on <span className="text-white font-semibold">{profile.focus}</span>, generative AI and
            building thoughtful software from the ground up.
          </motion.p>

          <motion.div
            variants={itemVariants}
            className="flex flex-col sm:flex-row items-stretch sm:items-center justify-center md:justify-start gap-3 sm:gap-3.5 w-full max-w-sm sm:max-w-none mb-9 sm:mb-10"
          >
            <motion.button
              onClick={onScrollToProjects}
              whileHover={{ y: -2 }}
              whileTap={{ scale: 0.97 }}
              className="w-full sm:w-auto h-12 px-7 btn-primary text-xs sm:text-[13px] group shadow-[0_0_25px_rgba(0,245,155,0.35)]"
            >
              <span>Explore Projects</span>
              <ArrowDownRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:translate-y-0.5 transition-transform duration-300" />
            </motion.button>

            <motion.button
              onClick={onScrollToContact}
              whileHover={{ y: -2 }}
              whileTap={{ scale: 0.97 }}
              className="w-full sm:w-auto h-12 px-7 btn-ghost text-xs sm:text-[13px]"
            >
              Start a conversation
            </motion.button>
          </motion.div>

          <motion.div
            variants={itemVariants}
            className="pt-6 border-t border-white/10 flex flex-wrap items-center justify-center md:justify-start gap-x-6 gap-y-3 w-full"
          >
            {[
              { href: profile.social.linkedin, icon: Linkedin, label: 'LinkedIn' },
              { href: profile.social.github, icon: Github, label: 'GitHub' },
            ].map((link) => (
              <motion.a
                key={link.label}
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ y: -2 }}
                className="inline-flex items-center gap-2 text-[11px] uppercase tracking-[0.12em] text-zinc-400 hover:text-[#00f59b] transition-colors group"
              >
                <link.icon className="w-3.5 h-3.5" />
                <span>{link.label}</span>
                <ArrowUpRight className="w-3 h-3 opacity-40 group-hover:opacity-100 transition-opacity" />
              </motion.a>
            ))}

            <a
              href={`tel:${profile.phone.replace(/\s+/g, '')}`}
              className="inline-flex items-center gap-2 text-[11px] uppercase tracking-[0.12em] text-zinc-400 hover:text-[#00f59b] transition-colors group"
            >
              <Phone className="w-3.5 h-3.5" />
              <span>Call</span>
            </a>

            <button
              onClick={handleEmailClick}
              className="inline-flex items-center gap-2 text-[11px] uppercase tracking-[0.12em] text-zinc-400 hover:text-[#00f59b] transition-colors cursor-pointer group"
            >
              <Mail className="w-3.5 h-3.5" />
              <span>Email</span>
            </button>
          </motion.div>
        </motion.div>
      </motion.div>

      {/* Bottom meta strip */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.1, duration: 0.8 }}
        className="absolute bottom-7 left-1/2 -translate-x-1/2 hidden md:flex items-center gap-6 text-[10px] font-mono uppercase tracking-[0.2em] text-[#6f6d64]"
      >
        <span>Scroll to explore</span>
        <span className="w-10 h-px bg-[#f3f0e7]/20" />
        <span>Portfolio / 2026</span>
      </motion.div>
    </section>
  );
};
