import React, { useState, useEffect } from "react";
import { motion, useScroll, useTransform, useReducedMotion, type Variants } from "framer-motion";
import { portfolioConfig } from "../portfolio.config";
import { ArrowDown, Phone, Github, Linkedin, Mail } from "lucide-react";

export const Hero: React.FC = () => {
  const shouldReduceMotion = useReducedMotion();
  const [localTime, setLocalTime] = useState("");

  // Scroll-driven animation for the profile picture (DP)
  const { scrollY } = useScroll();
  const dpScale = useTransform(scrollY, [0, 240], [1, shouldReduceMotion ? 1 : 0.58]);
  const dpX = useTransform(scrollY, [0, 240], [0, shouldReduceMotion ? 0 : -32]);
  const dpY = useTransform(scrollY, [0, 240], [0, shouldReduceMotion ? 0 : 8]);
  const dpRadius = useTransform(scrollY, [0, 240], ["28px", "18px"]);
  const dpShadow = useTransform(
    scrollY,
    [0, 240],
    [
      "0 16px 45px rgba(0,0,0,0.55)",
      "0 6px 20px rgba(0,0,0,0.35)",
    ]
  );

  useEffect(() => {
    const updateTime = () => {
      try {
        const timeString = new Intl.DateTimeFormat("en-IN", {
          timeZone: portfolioConfig.personal.timezone,
          hour: "numeric",
          minute: "2-digit",
          hour12: true
        }).format(new Date());
        setLocalTime(timeString);
      } catch {
        setLocalTime("Kolkata");
      }
    };
    updateTime();
    const interval = setInterval(updateTime, 60000);
    return () => clearInterval(interval);
  }, []);

  const fullName = portfolioConfig.personal.name;
  const [displayedName, setDisplayedName] = useState("");
  const [isTypingDone, setIsTypingDone] = useState(false);

  useEffect(() => {
    if (shouldReduceMotion) {
      setDisplayedName(fullName);
      setIsTypingDone(true);
      return;
    }

    let currentIndex = 0;
    const startDelay = setTimeout(() => {
      const interval = setInterval(() => {
        currentIndex++;
        setDisplayedName(fullName.slice(0, currentIndex));
        if (currentIndex >= fullName.length) {
          clearInterval(interval);
          setIsTypingDone(true);
        }
      }, 70);

      return () => clearInterval(interval);
    }, 250);

    return () => clearTimeout(startDelay);
  }, [fullName, shouldReduceMotion]);

  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: shouldReduceMotion ? 0 : 0.08,
        delayChildren: 0.1,
      },
    },
  };

  const itemVariants: Variants = {
    hidden: {
      opacity: 0,
      y: shouldReduceMotion ? 0 : 10,
    },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.55,
        ease: "easeOut",
      },
    },
  };

  return (
    <section
      id="hero"
      className="relative min-h-[92vh] flex flex-col justify-center pt-28 pb-16 sm:pt-36 sm:pb-24 max-w-4xl mx-auto px-5 sm:px-8"
      aria-label="Hero section"
    >
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="space-y-6 sm:space-y-8"
      >
        {/* Dedicated Photo Space & Status Info */}
        <motion.div variants={itemVariants} className="flex flex-col sm:flex-row sm:items-center gap-5 sm:gap-7">
          {/* Framed Photo Container with Scroll Animation */}
          <motion.div
            style={{
              scale: dpScale,
              x: dpX,
              y: dpY,
              borderRadius: dpRadius,
              boxShadow: dpShadow,
              transformOrigin: "top left",
            }}
            className="relative group self-start shrink-0 will-change-transform"
          >
            <div
              className="relative w-32 h-32 sm:w-40 sm:h-40 md:w-48 md:h-48 overflow-hidden bg-[#0e121b] border border-white/[0.14] group-hover:border-white/[0.28] transition-colors duration-300"
              style={{ borderRadius: "inherit" }}
            >
              <img
                src={portfolioConfig.personal.avatarUrl}
                alt={portfolioConfig.personal.name}
                className="w-full h-full object-cover object-top transition-transform duration-300 group-hover:scale-105"
                onError={(e) => {
                  (e.target as HTMLImageElement).src = "/profile-placeholder.svg";
                }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent pointer-events-none" />
            </div>

            {/* Active Online Indicator on the Photo Frame */}
            <span className="absolute -bottom-1 -right-1 flex h-4 w-4">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-60"></span>
              <span className="relative inline-flex rounded-full h-4 w-4 bg-emerald-500 border-2 border-[#080a0f]"></span>
            </span>
          </motion.div>

          {/* Identity & Status Tag */}
          <div className="space-y-2">
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-white/[0.04] border border-white/[0.08] text-[11px] sm:text-xs text-zinc-300 shadow-sm">
              <span className="tracking-wide text-zinc-200 font-medium">{portfolioConfig.personal.name}</span>
              <span className="text-zinc-600">·</span>
              <span className="text-zinc-400">{portfolioConfig.personal.currentStatus}</span>
              {localTime && (
                <>
                  <span className="text-zinc-600">·</span>
                  <span className="text-zinc-400 font-mono text-[11px]">{localTime}</span>
                </>
              )}
            </div>

            <p className="text-[11px] sm:text-xs uppercase tracking-[0.22em] font-medium text-zinc-400">
              {portfolioConfig.personal.eyebrow}
            </p>
          </div>
        </motion.div>

        {/* Name Reveal: Letters appear one by one, then remain constant */}
        <motion.div variants={itemVariants}>
          <h1 className="text-3xl sm:text-5xl md:text-6xl font-bold tracking-tight text-white leading-[1.15] min-h-[1.2em]">
            <span className="text-zinc-400 font-light">Hi, I&apos;m </span>
            <span className="text-white relative inline-block">
              {displayedName}
              {!isTypingDone && (
                <span
                  className="inline-block w-[2.5px] sm:w-[3px] h-[0.8em] ml-1 bg-white/80 animate-pulse align-middle"
                  aria-hidden="true"
                />
              )}
            </span>
          </h1>
        </motion.div>

        {/* Short Plain-English Introduction */}
        <motion.div variants={itemVariants} className="max-w-2xl">
          <p className="text-base sm:text-lg text-zinc-300 leading-relaxed font-normal">
            {portfolioConfig.personal.intro}
          </p>
        </motion.div>

        {/* Single Primary Action Button with Refined Rounded Pill Style */}
        <motion.div
          variants={itemVariants}
          className="flex flex-wrap items-center gap-3 pt-2"
        >
          <motion.a
            href="#projects"
            whileHover={shouldReduceMotion ? {} : { scale: 1.02, y: -1 }}
            whileTap={shouldReduceMotion ? {} : { scale: 0.98 }}
            className="group relative inline-flex items-center gap-2.5 px-6 py-2.5 rounded-full bg-white/[0.08] hover:bg-white/[0.14] text-white text-xs sm:text-sm font-medium border border-white/[0.14] hover:border-white/[0.28] shadow-[0_4px_24px_rgba(0,0,0,0.35)] transition-all duration-200"
          >
            <span>View Projects</span>
            <ArrowDown className="w-3.5 h-3.5 text-zinc-400 group-hover:text-white transition-all duration-200 group-hover:translate-y-0.5" />
          </motion.a>
        </motion.div>

        {/* Small Social / Contact Links (including Phone dialer link) */}
        <motion.div
          variants={itemVariants}
          className="flex flex-wrap items-center gap-2 pt-4 text-xs text-zinc-400"
        >
          <motion.a
            href={portfolioConfig.contact.socialLinks.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            whileHover={shouldReduceMotion ? {} : { y: -1 }}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/[0.03] hover:bg-white/[0.07] border border-white/[0.06] hover:border-white/[0.16] hover:text-white transition-all"
          >
            <Linkedin className="w-3.5 h-3.5 text-zinc-400" />
            <span>LinkedIn</span>
          </motion.a>

          <motion.a
            href={portfolioConfig.contact.socialLinks.github}
            target="_blank"
            rel="noopener noreferrer"
            whileHover={shouldReduceMotion ? {} : { y: -1 }}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/[0.03] hover:bg-white/[0.07] border border-white/[0.06] hover:border-white/[0.16] hover:text-white transition-all"
          >
            <Github className="w-3.5 h-3.5 text-zinc-400" />
            <span>GitHub</span>
          </motion.a>

          {/* Direct dialer phone button */}
          <motion.a
            href={`tel:${portfolioConfig.contact.phone}`}
            whileHover={shouldReduceMotion ? {} : { y: -1 }}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/[0.03] hover:bg-white/[0.07] border border-white/[0.06] hover:border-white/[0.16] hover:text-white transition-all"
            title="Direct phone dialer"
          >
            <Phone className="w-3.5 h-3.5 text-zinc-400" />
            <span>Call</span>
          </motion.a>

          <motion.a
            href={portfolioConfig.contact.socialLinks.emailLink}
            whileHover={shouldReduceMotion ? {} : { y: -1 }}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/[0.03] hover:bg-white/[0.07] border border-white/[0.06] hover:border-white/[0.16] hover:text-white transition-all"
          >
            <Mail className="w-3.5 h-3.5 text-zinc-400" />
            <span>Email</span>
          </motion.a>
        </motion.div>
      </motion.div>
    </section>
  );
};
