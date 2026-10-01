import React from 'react';
import { motion } from 'motion/react';
import { ArrowDown, Mail, Phone, Github, Linkedin, ExternalLink } from 'lucide-react';
import { HeroPhotoCard } from './HeroPhotoCard';
import { GlyphDecryptText } from './GlyphDecryptText';
import { PORTFOLIO_DATA } from '../data/portfolioData';

interface HeroSectionProps {
  onScrollToProjects: () => void;
  onScrollToContact: () => void;
  onScrollToCertifications?: () => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({
  onScrollToProjects,
  onScrollToContact
}) => {
  const { profile } = PORTFOLIO_DATA;

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
      {/* Vibrant Luminous Aurora Ambient Glows */}
      <div className="pointer-events-none absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[850px] h-[520px] bg-gradient-to-tr from-[#00b848]/18 via-[#06b6d4]/12 to-transparent blur-[140px] rounded-full animate-float-subtle" />
      <div className="pointer-events-none absolute top-20 right-10 w-[550px] h-[400px] bg-gradient-to-bl from-purple-600/12 via-cyan-500/12 to-transparent blur-[130px] rounded-full animate-float-delayed" />

      {/* Futuristic Concentric Radar Ring HUD in Background */}
      <div className="pointer-events-none absolute right-16 top-24 hidden xl:block opacity-45 animate-float-delayed">
        <svg width="260" height="260" viewBox="0 0 200 200" fill="none">
          <circle cx="100" cy="100" r="95" stroke="#06b6d4" strokeWidth="1" strokeDasharray="3 4" opacity="0.4" className="animate-[spin_45s_linear_infinite]" />
          <circle cx="100" cy="100" r="68" stroke="#00b848" strokeWidth="1.2" strokeDasharray="2 4" opacity="0.5" className="animate-[spin_30s_linear_infinite_reverse]" />
          <circle cx="100" cy="100" r="42" stroke="#a855f7" strokeWidth="0.8" opacity="0.4" />
          <line x1="100" y1="10" x2="100" y2="190" stroke="#00b848" strokeWidth="0.6" strokeDasharray="2 4" opacity="0.3" />
          <line x1="10" y1="100" x2="190" y2="100" stroke="#00b848" strokeWidth="0.6" strokeDasharray="2 4" opacity="0.3" />
        </svg>
      </div>

      <div className="max-w-6xl mx-auto w-full relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
        {/* Profile Photo Card: Comes FIRST on mobile (top of screen), and on right side on desktop (lg:order-2) */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="lg:col-span-5 flex justify-center w-full lg:order-2 mb-2 lg:mb-0"
        >
          <HeroPhotoCard />
        </motion.div>

        {/* Left Column: Hero Text, CTAs, Channels: Comes AFTER photo on mobile, and on left side on desktop (lg:order-1) */}
        <div className="lg:col-span-7 lg:pl-6 xl:pl-8 lg:order-1 flex flex-col items-center lg:items-start text-center lg:text-left">
          {/* Main Title: Authentic Nothing OS Pixel Font without AI Matrix Scramble */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
            className="mb-8"
          >
            <h1 className="text-4xl sm:text-6xl md:text-7xl font-bold tracking-wider text-white font-dot">
              <GlyphDecryptText text={profile.name.toUpperCase()} speed={30} />
            </h1>
          </motion.div>

          {/* Two Major Buttons: "View My Work" & "Let's Connect" */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="flex flex-row items-center justify-center lg:justify-start gap-3 w-full max-w-sm sm:max-w-none mb-8"
          >
            <button
              onClick={onScrollToProjects}
              className="flex-1 sm:flex-initial h-11 sm:h-12 px-5 sm:px-7 bg-white hover:bg-zinc-100 text-black font-semibold text-xs sm:text-sm rounded-full transition-all duration-300 flex items-center justify-center gap-2 group cursor-pointer shadow-[0_4px_25px_rgba(255,255,255,0.25)] hover:shadow-[0_4px_35px_rgba(255,255,255,0.45)] hover:scale-105 active:scale-95 animated-border-glow font-space relative overflow-hidden whitespace-nowrap"
            >
              {/* Shimmer sweep effect */}
              <span className="pointer-events-none absolute inset-0 w-1/2 h-full bg-gradient-to-r from-transparent via-black/10 to-transparent animate-shimmer-sweep" />
              <span className="relative z-10 font-bold">View My Work</span>
              <ArrowDown className="w-3.5 h-3.5 sm:w-4 sm:h-4 relative z-10 group-hover:translate-y-1 transition-transform" />
            </button>

            <button
              onClick={onScrollToContact}
              className="flex-1 sm:flex-initial h-11 sm:h-12 px-5 sm:px-7 bg-zinc-900/90 hover:bg-zinc-800 text-white font-medium text-xs sm:text-sm rounded-full border border-white/20 hover:border-[#00b848]/70 hover:text-[#00ff66] transition-all duration-300 flex items-center justify-center gap-2 cursor-pointer hover:scale-105 active:scale-95 shadow-sm hover:shadow-[0_0_25px_rgba(0,184,72,0.35)] group font-space relative overflow-hidden whitespace-nowrap"
            >
              {/* Emerald glint on hover */}
              <span className="pointer-events-none absolute inset-0 w-1/2 h-full bg-gradient-to-r from-transparent via-[#00b848]/25 to-transparent animate-shimmer-sweep" />
              <span className="relative z-10">Let's Connect</span>
            </button>
          </motion.div>

          {/* Attractive Pill Buttons: LinkedIn, GitHub, Call, Email */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="pt-4 border-t border-white/10 flex flex-wrap items-center justify-center lg:justify-start gap-2.5 sm:gap-3"
          >
            {/* LinkedIn Pill */}
            <a
              href={profile.social.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="relative overflow-hidden inline-flex items-center gap-2 px-4 py-2 rounded-full bg-zinc-900/90 hover:bg-zinc-800 text-white border border-white/15 hover:border-[#00b848]/60 text-xs transition-all duration-300 group shadow-sm hover:shadow-[0_0_15px_rgba(0,184,72,0.3)] hover:scale-105 active:scale-95 font-space"
              title="Open LinkedIn Profile"
            >
              <span className="pointer-events-none absolute inset-0 w-1/2 h-full bg-gradient-to-r from-transparent via-white/10 to-transparent animate-shimmer-sweep" />
              <Linkedin className="w-3.5 h-3.5 relative z-10 text-white/80 group-hover:text-[#00ff66] transition-colors" />
              <span className="relative z-10 font-medium">LinkedIn</span>
              <ExternalLink className="w-3 h-3 relative z-10 text-white/50 group-hover:text-white/80 opacity-60" />
            </a>

            {/* GitHub Pill */}
            <a
              href={profile.social.github}
              target="_blank"
              rel="noopener noreferrer"
              className="relative overflow-hidden inline-flex items-center gap-2 px-4 py-2 rounded-full bg-zinc-900/90 hover:bg-zinc-800 text-white border border-white/15 hover:border-[#00b848]/60 text-xs transition-all duration-300 group shadow-sm hover:shadow-[0_0_15px_rgba(0,184,72,0.3)] hover:scale-105 active:scale-95 font-space"
              title="Open GitHub Profile"
            >
              <span className="pointer-events-none absolute inset-0 w-1/2 h-full bg-gradient-to-r from-transparent via-white/10 to-transparent animate-shimmer-sweep" />
              <Github className="w-3.5 h-3.5 relative z-10 text-white/80 group-hover:text-[#00ff66] transition-colors" />
              <span className="relative z-10 font-medium">GitHub</span>
              <ExternalLink className="w-3 h-3 relative z-10 text-white/50 group-hover:text-white/80 opacity-60" />
            </a>

            {/* Call Pill - Directly opens dialer/calling app */}
            <a
              href={`tel:${profile.phone.replace(/\s+/g, '')}`}
              className="relative overflow-hidden inline-flex items-center gap-2 px-4 py-2 rounded-full bg-zinc-900/90 hover:bg-zinc-800 text-white border border-white/15 hover:border-[#00b848]/60 text-xs transition-all duration-300 group cursor-pointer shadow-sm hover:shadow-[0_0_15px_rgba(0,184,72,0.3)] hover:scale-105 active:scale-95 font-space"
              title="Call Soutrik (+91 89022 81688)"
            >
              <span className="pointer-events-none absolute inset-0 w-1/2 h-full bg-gradient-to-r from-transparent via-[#00ff66]/15 to-transparent animate-shimmer-sweep" />
              <Phone className="w-3.5 h-3.5 relative z-10 text-white/80 group-hover:text-[#00ff66] transition-colors" />
              <span className="relative z-10 font-medium">Call</span>
            </a>

            {/* Email Pill - Directly opens Gmail on PC or mail app on mobile */}
            <button
              onClick={handleEmailClick}
              className="relative overflow-hidden inline-flex items-center gap-2 px-4 py-2 rounded-full bg-zinc-900/90 hover:bg-zinc-800 text-white border border-white/15 hover:border-[#00b848]/60 text-xs transition-all duration-300 group cursor-pointer shadow-sm hover:shadow-[0_0_15px_rgba(0,184,72,0.3)] hover:scale-105 active:scale-95 font-space"
              title="Send Email via Gmail / Mail App"
            >
              <span className="pointer-events-none absolute inset-0 w-1/2 h-full bg-gradient-to-r from-transparent via-[#00ff66]/15 to-transparent animate-shimmer-sweep" />
              <Mail className="w-3.5 h-3.5 relative z-10 text-white/80 group-hover:text-[#00ff66] transition-colors" />
              <span className="relative z-10 font-medium">Email</span>
            </button>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
