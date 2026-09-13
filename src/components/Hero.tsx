import React, { useState } from "react";
import { motion, useScroll, useTransform, useReducedMotion, type Variants } from "framer-motion";
import { portfolioConfig } from "../portfolio.config";
import { ArrowRight, ArrowUpRight, ArrowDown, Github, Linkedin, Phone, Mail, Sparkles } from "lucide-react";

export const Hero: React.FC = () => {
  const shouldReduceMotion = useReducedMotion();

  // Scroll tracking to smoothly fade out scroll indicator and add gentle parallax
  const { scrollY } = useScroll();
  const dpScale = useTransform(scrollY, [0, 300], [1, shouldReduceMotion ? 1 : 0.9]);
  const dpY = useTransform(scrollY, [0, 300], [0, shouldReduceMotion ? 0 : 20]);
  const scrollIndicatorOpacity = useTransform(scrollY, [0, 100], [1, 0]);

  // Interactive mouse parallax state (active only on desktop)
  const [mousePos, setMousePos] = useState({ x: 0, y: 0, rotateX: 0, rotateY: 0 });

  const handleMouseMove = (e: React.MouseEvent<HTMLElement>) => {
    if (shouldReduceMotion || typeof window === "undefined" || window.innerWidth < 768) return;
    const { clientX, clientY } = e;
    const centerX = window.innerWidth / 2;
    const centerY = window.innerHeight / 2;
    const deltaX = (clientX - centerX) / 30;
    const deltaY = (clientY - centerY) / 30;
    setMousePos({
      x: deltaX,
      y: deltaY,
      rotateX: -deltaY * 0.7,
      rotateY: deltaX * 0.7,
    });
  };

  const handleMouseLeave = () => {
    setMousePos({ x: 0, y: 0, rotateX: 0, rotateY: 0 });
  };

  const handleSmoothScroll = (e: React.MouseEvent<HTMLAnchorElement>, targetId: string) => {
    e.preventDefault();
    const targetElement = document.querySelector(targetId);
    if (targetElement) {
      targetElement.scrollIntoView({ behavior: "smooth" });
    }
  };

  // Staggered Container Animation
  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: shouldReduceMotion ? 0 : 0.08,
        delayChildren: 0.05,
      },
    },
  };

  const itemVariants: Variants = {
    hidden: { opacity: 0, y: shouldReduceMotion ? 0 : 18 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.55, ease: [0.16, 1, 0.3, 1] },
    },
  };

  const imageContainerVariants: Variants = {
    hidden: { opacity: 0, scale: shouldReduceMotion ? 1 : 0.88, y: 15 },
    visible: {
      opacity: 1,
      scale: 1,
      y: 0,
      transition: { duration: 0.65, ease: [0.16, 1, 0.3, 1] },
    },
  };

  const nameLetters = portfolioConfig.personal.name.split("");

  return (
    <section
      id="hero"
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="relative min-h-[100svh] md:min-h-[90vh] flex flex-col justify-center pt-20 pb-10 sm:pt-28 sm:pb-16 md:pt-36 md:pb-24 max-w-5xl mx-auto px-4 sm:px-6 md:px-8 overflow-hidden md:overflow-visible"
      aria-label="Hero section"
    >
      {/* 1. Dynamic Ambient Radial Glow behind Hero with breathing motion */}
      <motion.div
        animate={
          shouldReduceMotion
            ? {}
            : {
                scale: [1, 1.15, 1],
                opacity: [0.14, 0.28, 0.14],
                x: mousePos.x * 2,
                y: mousePos.y * 2,
              }
        }
        transition={{
          scale: { duration: 7, repeat: Infinity, ease: "easeInOut" },
          opacity: { duration: 7, repeat: Infinity, ease: "easeInOut" },
          x: { duration: 0.25, ease: "easeOut" },
          y: { duration: 0.25, ease: "easeOut" },
        }}
        className="absolute top-1/4 sm:top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[340px] sm:w-[540px] md:w-[700px] h-[280px] sm:h-[380px] md:h-[450px] bg-gradient-to-tr from-sky-500/25 via-blue-600/20 to-indigo-600/15 blur-[90px] sm:blur-[110px] rounded-full pointer-events-none -z-10"
        aria-hidden="true"
      />

      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="flex flex-col md:flex-row items-center md:items-center justify-between gap-6 sm:gap-8 md:gap-12 lg:gap-14 w-full"
      >
        {/* 2. Profile Photo with 3D Mouse Tilt & Floating Motion */}
        <motion.div
          variants={imageContainerVariants}
          style={{
            scale: dpScale,
            y: dpY,
          }}
          className="order-1 md:order-2 relative shrink-0 self-center will-change-transform pt-1 md:pt-0"
        >
          {/* Subtle Float Animation wrapper + 3D Mouse Parallax */}
          <motion.div
            animate={
              shouldReduceMotion
                ? {}
                : {
                    y: [-4, 6, -4],
                    rotateX: mousePos.rotateX,
                    rotateY: mousePos.rotateY,
                  }
            }
            transition={{
              y: { duration: 5, repeat: Infinity, ease: "easeInOut" },
              rotateX: { duration: 0.25, ease: "easeOut" },
              rotateY: { duration: 0.25, ease: "easeOut" },
            }}
            style={{ perspective: 1000 }}
            className="relative"
          >
            {/* Ambient Backlight Glow */}
            <div 
              className="absolute -inset-2.5 rounded-2xl sm:rounded-3xl bg-gradient-to-tr from-sky-500/30 via-blue-600/25 to-indigo-500/20 blur-xl pointer-events-none -z-10" 
              aria-hidden="true"
            />

            {/* Profile Frame */}
            <div className="relative group w-[130px] h-[130px] sm:w-[155px] sm:h-[155px] md:w-52 md:h-52 lg:w-56 lg:h-56 rounded-2xl sm:rounded-3xl overflow-hidden bg-[#0e121b] border border-white/[0.14] group-hover:border-sky-400/50 shadow-[0_16px_45px_rgba(0,0,0,0.6)] transition-all duration-300">
              <img
                src={portfolioConfig.personal.avatarUrl}
                alt={portfolioConfig.personal.name}
                className="w-full h-full object-cover object-top transition-transform duration-700 group-hover:scale-105"
                onError={(e) => {
                  (e.target as HTMLImageElement).src = "/profile-placeholder.svg";
                }}
              />
              {/* Gradient Inset Shadow */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/45 via-transparent to-transparent pointer-events-none" />
            </div>
          </motion.div>
        </motion.div>

        {/* 3. Text & Actions Column */}
        <div className="order-2 md:order-1 flex-1 flex flex-col items-center md:items-start text-center md:text-left space-y-4 sm:space-y-5 md:space-y-6 max-w-2xl w-full">
          
          {/* Availability Badge */}
          <motion.div variants={itemVariants}>
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/[0.04] hover:bg-white/[0.08] border border-white/[0.09] hover:border-emerald-500/30 backdrop-blur-md shadow-sm transition-all duration-300">
              <span className="w-2 h-2 rounded-full bg-emerald-400" />
              <span className="text-[11px] sm:text-xs font-medium text-zinc-200 tracking-wide">
                Available for opportunities &amp; collaborations
              </span>
            </div>
          </motion.div>

          {/* Eyebrow */}
          <motion.div variants={itemVariants}>
            <p className="text-[11px] sm:text-xs md:text-[13px] uppercase tracking-[0.22em] font-semibold text-zinc-400 flex items-center justify-center md:justify-start gap-1.5">
              <Sparkles className="w-3.5 h-3.5 text-sky-400" />
              <span>{portfolioConfig.personal.eyebrow}</span>
            </p>
          </motion.div>

          {/* Main Heading: LETTER-BY-LETTER Animated Reveal */}
          <motion.div variants={itemVariants} className="w-full">
            <h1 className="text-3xl xs:text-4xl sm:text-5xl md:text-6xl lg:text-[72px] tracking-tight leading-[1.08] text-white">
              <span className="text-zinc-400 font-light block sm:inline">Hi, I&apos;m </span>
              <span className="inline-block">
                {nameLetters.map((letter, i) => (
                  <motion.span
                    key={i}
                    initial={shouldReduceMotion ? false : { opacity: 0, y: 35, rotateX: -40 }}
                    animate={{ opacity: 1, y: 0, rotateX: 0 }}
                    transition={{
                      duration: 0.6,
                      delay: shouldReduceMotion ? 0 : 0.2 + i * 0.04,
                      ease: [0.16, 1, 0.3, 1],
                    }}
                    className="inline-block text-white font-bold tracking-tight bg-gradient-to-r from-white via-zinc-100 to-zinc-300 bg-clip-text text-transparent drop-shadow-[0_2px_24px_rgba(255,255,255,0.2)] hover:text-sky-300 transition-colors duration-200"
                  >
                    {letter === " " ? "\u00A0" : letter}
                  </motion.span>
                ))}
              </span>
            </h1>
          </motion.div>

          {/* Description */}
          <motion.div variants={itemVariants}>
            <p className="text-sm sm:text-base md:text-lg lg:text-xl text-zinc-300 font-normal leading-relaxed max-w-[340px] sm:max-w-md md:max-w-2xl mx-auto md:mx-0">
              {portfolioConfig.personal.intro}
            </p>
          </motion.div>

          {/* CTA Buttons */}
          <motion.div
            variants={itemVariants}
            className="flex flex-col xs:flex-row items-stretch xs:items-center gap-2.5 sm:gap-3.5 w-full xs:w-auto max-w-[340px] xs:max-w-none pt-1 sm:pt-2"
          >
            {/* Primary Action Button */}
            <motion.a
              href="#projects"
              onClick={(e) => handleSmoothScroll(e, "#projects")}
              whileHover={shouldReduceMotion ? {} : { y: -3, scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              className="group relative inline-flex items-center justify-center gap-2 px-6 py-3 rounded-full bg-white text-zinc-950 text-xs sm:text-sm font-semibold hover:bg-zinc-100 transition-all duration-300 shadow-[0_4px_24px_rgba(255,255,255,0.2)] hover:shadow-[0_8px_32px_rgba(255,255,255,0.35)] min-h-[44px]"
            >
              <span>View My Work</span>
              <ArrowRight className="w-4 h-4 text-zinc-900 transition-transform duration-300 group-hover:translate-x-1.5" />
            </motion.a>

            {/* Secondary Action Button */}
            <motion.a
              href="#contact"
              onClick={(e) => handleSmoothScroll(e, "#contact")}
              whileHover={shouldReduceMotion ? {} : { y: -3, scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              className="group inline-flex items-center justify-center gap-2 px-6 py-3 rounded-full bg-white/[0.06] hover:bg-white/[0.12] text-white text-xs sm:text-sm font-medium border border-white/[0.12] hover:border-sky-400/40 backdrop-blur-md transition-all duration-300 shadow-[0_4px_20px_rgba(0,0,0,0.3)] min-h-[44px]"
            >
              <span>Let&apos;s Connect</span>
              <ArrowUpRight className="w-4 h-4 text-zinc-300 transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1 group-hover:text-white" />
            </motion.a>
          </motion.div>

          {/* Social Links */}
          <motion.div
            variants={itemVariants}
            className="grid grid-cols-2 xs:flex xs:flex-wrap items-center gap-2 pt-2 text-xs text-zinc-400 w-full xs:w-auto max-w-[320px] xs:max-w-none"
          >
            <motion.a
              href={portfolioConfig.contact.socialLinks.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              whileHover={shouldReduceMotion ? {} : { y: -2, scale: 1.04 }}
              whileTap={{ scale: 0.96 }}
              className="inline-flex items-center justify-center gap-1.5 px-3 py-2 sm:px-3.5 sm:py-1.5 rounded-full bg-white/[0.03] hover:bg-white/[0.08] border border-white/[0.06] hover:border-sky-400/30 hover:text-white transition-all duration-200"
              aria-label="LinkedIn Profile"
            >
              <Linkedin className="w-3.5 h-3.5 text-zinc-400" />
              <span>LinkedIn</span>
            </motion.a>

            <motion.a
              href={portfolioConfig.contact.socialLinks.github}
              target="_blank"
              rel="noopener noreferrer"
              whileHover={shouldReduceMotion ? {} : { y: -2, scale: 1.04 }}
              whileTap={{ scale: 0.96 }}
              className="inline-flex items-center justify-center gap-1.5 px-3 py-2 sm:px-3.5 sm:py-1.5 rounded-full bg-white/[0.03] hover:bg-white/[0.08] border border-white/[0.06] hover:border-sky-400/30 hover:text-white transition-all duration-200"
              aria-label="GitHub Profile"
            >
              <Github className="w-3.5 h-3.5 text-zinc-400" />
              <span>GitHub</span>
            </motion.a>

            <motion.a
              href={`tel:${portfolioConfig.contact.phone}`}
              whileHover={shouldReduceMotion ? {} : { y: -2, scale: 1.04 }}
              whileTap={{ scale: 0.96 }}
              className="inline-flex items-center justify-center gap-1.5 px-3 py-2 sm:px-3.5 sm:py-1.5 rounded-full bg-white/[0.03] hover:bg-white/[0.08] border border-white/[0.06] hover:border-sky-400/30 hover:text-white transition-all duration-200"
              title="Direct phone dialer"
            >
              <Phone className="w-3.5 h-3.5 text-zinc-400" />
              <span>Call</span>
            </motion.a>

            <motion.a
              href={portfolioConfig.contact.socialLinks.emailLink}
              whileHover={shouldReduceMotion ? {} : { y: -2, scale: 1.04 }}
              whileTap={{ scale: 0.96 }}
              className="inline-flex items-center justify-center gap-1.5 px-3 py-2 sm:px-3.5 sm:py-1.5 rounded-full bg-white/[0.03] hover:bg-white/[0.08] border border-white/[0.06] hover:border-sky-400/30 hover:text-white transition-all duration-200"
            >
              <Mail className="w-3.5 h-3.5 text-zinc-400" />
              <span>Email</span>
            </motion.a>
          </motion.div>
        </div>

      </motion.div>

      {/* 4. Animated Scroll Indicator */}
      <motion.div
        style={{ opacity: scrollIndicatorOpacity }}
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1, duration: 0.5 }}
        className="hidden sm:flex pt-8 sm:pt-12 flex-col items-center justify-center pointer-events-none"
      >
        <motion.div
          animate={shouldReduceMotion ? {} : { y: [0, 5, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          className="flex flex-col items-center gap-1 text-zinc-400"
        >
          <span className="text-[10px] sm:text-[11px] font-mono tracking-[0.25em] uppercase font-semibold text-zinc-400/80">
            Scroll to explore
          </span>
          <ArrowDown className="w-3.5 h-3.5 text-zinc-400 animate-bounce" />
        </motion.div>
      </motion.div>
    </section>
  );
};
