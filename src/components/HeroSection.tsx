import React from 'react';
import { motion, useScroll, useTransform, useSpring } from 'motion/react';
import { ArrowDown, Mail, Phone, Github, Linkedin, ExternalLink } from 'lucide-react';
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
  visible: { transition: { staggerChildren: 0.1, delayChildren: 0.08 } },
};

const itemVariants = {
  hidden:  { opacity: 0, y: 18 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1] as const } },
};

export const HeroSection: React.FC<HeroSectionProps> = ({
  onScrollToProjects,
  onScrollToContact
}) => {
  const { profile } = PORTFOLIO_DATA;

  // Silky scroll parallax & depth for hero elements
  const { scrollY } = useScroll();
  const smoothY = useSpring(scrollY, { stiffness: 180, damping: 28, restDelta: 0.001 });
  const contentY = useTransform(smoothY, [0, 500], [0, 50]);
  const contentOpacity = useTransform(smoothY, [0, 480], [1, 0.25]);
  const glowY = useTransform(smoothY, [0, 600], [0, 110]);
  const glowScale = useTransform(smoothY, [0, 600], [1, 1.15]);
  const radarRotate = useTransform(smoothY, [0, 800], [0, 45]);

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
    <section className="relative min-h-[90vh] flex flex-col justify-center pt-28 pb-16 px-6 overflow-hidden">
      {/* Vibrant Luminous Aurora Ambient Glows with smooth scroll parallax */}
      <motion.div
        style={{ y: glowY, scale: glowScale }}
        className="pointer-events-none absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[850px] h-[520px] bg-gradient-to-tr from-[#00b848]/18 via-[#06b6d4]/12 to-transparent blur-[140px] rounded-full animate-float-subtle transform-gpu will-change-transform"
      />
      <motion.div
        style={{ y: glowY }}
        className="pointer-events-none absolute top-20 right-10 w-[550px] h-[400px] bg-gradient-to-bl from-purple-600/12 via-cyan-500/12 to-transparent blur-[130px] rounded-full animate-float-delayed transform-gpu will-change-transform"
      />

      {/* Futuristic Concentric Radar Ring HUD in Background with scroll rotation */}
      <motion.div
        style={{ rotate: radarRotate }}
        className="pointer-events-none absolute right-16 top-24 hidden xl:block opacity-45 animate-float-delayed transform-gpu will-change-transform"
      >
        <svg width="260" height="260" viewBox="0 0 200 200" fill="none">
          <circle cx="100" cy="100" r="95" stroke="#06b6d4" strokeWidth="1" strokeDasharray="3 4" opacity="0.4" className="animate-[spin_45s_linear_infinite]" />
          <circle cx="100" cy="100" r="68" stroke="#00b848" strokeWidth="1.2" strokeDasharray="2 4" opacity="0.5" className="animate-[spin_30s_linear_infinite_reverse]" />
          <circle cx="100" cy="100" r="42" stroke="#a855f7" strokeWidth="0.8" opacity="0.4" />
          <line x1="100" y1="10" x2="100" y2="190" stroke="#00b848" strokeWidth="0.6" strokeDasharray="2 4" opacity="0.3" />
          <line x1="10" y1="100" x2="190" y2="100" stroke="#00b848" strokeWidth="0.6" strokeDasharray="2 4" opacity="0.3" />
        </svg>
      </motion.div>

      <motion.div
        style={{ y: contentY, opacity: contentOpacity }}
        className="max-w-6xl mx-auto w-full relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center transform-gpu will-change-transform"
      >
        {/* Profile Photo Card */}
        <motion.div
          initial={{ opacity: 0, scale: 0.94 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: false, amount: 0.15 }}
          transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
          className="lg:col-span-5 flex justify-center w-full lg:order-2 mb-2 lg:mb-0"
        >
          <HeroPhotoCard />
        </motion.div>

        {/* Left Column: Hero Text, CTAs, Channels */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: false, amount: 0.15 }}
          className="lg:col-span-7 lg:pl-6 xl:pl-8 lg:order-1 flex flex-col items-center lg:items-start text-center lg:text-left"
        >
          {/* Main Title */}
          <motion.div variants={itemVariants} className="mb-8">
            <h1 className="text-4xl sm:text-6xl md:text-7xl font-bold tracking-wider text-white font-dot">
              <GlyphDecryptText text={profile.name.toUpperCase()} speed={30} />
            </h1>
          </motion.div>

          {/* Two Major Buttons */}
          <motion.div
            variants={itemVariants}
            className="flex flex-row items-center justify-center lg:justify-start gap-3 w-full max-w-sm sm:max-w-none mb-8"
          >
            <motion.button
              onClick={onScrollToProjects}
              whileHover={{ scale: 1.06, boxShadow: '0 0 30px rgba(255,255,255,0.35)' }}
              whileTap={{ scale: 0.95 }}
              transition={{ type: 'spring', stiffness: 350, damping: 20 }}
              className="flex-1 sm:flex-initial h-11 sm:h-12 px-5 sm:px-7 bg-white text-black font-semibold text-xs sm:text-sm rounded-full flex items-center justify-center gap-2 group cursor-pointer shadow-[0_4px_25px_rgba(255,255,255,0.25)] animated-border-glow font-space relative overflow-hidden whitespace-nowrap"
            >
              <span className="relative z-10 font-bold">View My Work</span>
              <ArrowDown className="w-3.5 h-3.5 sm:w-4 sm:h-4 relative z-10 group-hover:translate-y-1 transition-transform duration-300" />
            </motion.button>

            <motion.button
              onClick={onScrollToContact}
              whileHover={{ scale: 1.06, boxShadow: '0 0 25px rgba(0,184,72,0.35)' }}
              whileTap={{ scale: 0.95 }}
              transition={{ type: 'spring', stiffness: 350, damping: 20 }}
              className="flex-1 sm:flex-initial h-11 sm:h-12 px-5 sm:px-7 bg-zinc-900/90 hover:bg-zinc-800 text-white font-medium text-xs sm:text-sm rounded-full border border-white/20 hover:border-[#00b848]/70 hover:text-[#00ff66] transition-colors duration-300 flex items-center justify-center gap-2 cursor-pointer shadow-sm font-space relative overflow-hidden whitespace-nowrap"
            >
              <span className="relative z-10">Let's Connect</span>
            </motion.button>
          </motion.div>

          {/* Social / Contact Pills */}
          <motion.div
            variants={itemVariants}
            className="pt-4 border-t border-white/10 flex flex-wrap items-center justify-center lg:justify-start gap-2.5 sm:gap-3"
          >
            {[
              { href: profile.social.linkedin, icon: <Linkedin className="w-3.5 h-3.5 relative z-10 text-white/80 group-hover:text-[#00ff66] transition-colors" />, label: 'LinkedIn', external: true },
              { href: profile.social.github,   icon: <Github   className="w-3.5 h-3.5 relative z-10 text-white/80 group-hover:text-[#00ff66] transition-colors" />, label: 'GitHub',   external: true },
            ].map((link) => (
              <motion.a
                key={link.label}
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.08, y: -2 }}
                whileTap={{ scale: 0.94 }}
                transition={{ type: 'spring', stiffness: 380, damping: 22 }}
                className="relative overflow-hidden inline-flex items-center gap-2 px-4 py-2 rounded-full bg-zinc-900/90 hover:bg-zinc-800 text-white border border-white/15 hover:border-[#00b848]/60 text-xs transition-colors duration-300 group shadow-sm hover:shadow-[0_0_15px_rgba(0,184,72,0.3)] font-space"
              >
                {link.icon}
                <span className="relative z-10 font-medium">{link.label}</span>
                <ExternalLink className="w-3 h-3 relative z-10 text-white/50 group-hover:text-white/80 opacity-60" />
              </motion.a>
            ))}

            <motion.a
              href={`tel:${profile.phone.replace(/\s+/g, '')}`}
              whileHover={{ scale: 1.08, y: -2 }}
              whileTap={{ scale: 0.94 }}
              transition={{ type: 'spring', stiffness: 380, damping: 22 }}
              className="relative overflow-hidden inline-flex items-center gap-2 px-4 py-2 rounded-full bg-zinc-900/90 hover:bg-zinc-800 text-white border border-white/15 hover:border-[#00b848]/60 text-xs transition-colors duration-300 group cursor-pointer shadow-sm hover:shadow-[0_0_15px_rgba(0,184,72,0.3)] font-space"
            >
              <Phone className="w-3.5 h-3.5 relative z-10 text-white/80 group-hover:text-[#00ff66] transition-colors" />
              <span className="relative z-10 font-medium">Call</span>
            </motion.a>

            <motion.button
              onClick={handleEmailClick}
              whileHover={{ scale: 1.08, y: -2 }}
              whileTap={{ scale: 0.94 }}
              transition={{ type: 'spring', stiffness: 380, damping: 22 }}
              className="relative overflow-hidden inline-flex items-center gap-2 px-4 py-2 rounded-full bg-zinc-900/90 hover:bg-zinc-800 text-white border border-white/15 hover:border-[#00b848]/60 text-xs transition-colors duration-300 group cursor-pointer shadow-sm hover:shadow-[0_0_15px_rgba(0,184,72,0.3)] font-space"
            >
              <Mail className="w-3.5 h-3.5 relative z-10 text-white/80 group-hover:text-[#00ff66] transition-colors" />
              <span className="relative z-10 font-medium">Email</span>
            </motion.button>
          </motion.div>
        </motion.div>
      </motion.div>
    </section>
  );
};
