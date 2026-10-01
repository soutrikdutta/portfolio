import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { ArrowUp } from 'lucide-react';

export const Footer: React.FC = () => {
  const [currentTime, setCurrentTime] = useState<string>('');

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      const options: Intl.DateTimeFormatOptions = {
        timeZone: 'Asia/Kolkata',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: false
      };
      setCurrentTime(new Intl.DateTimeFormat('en-GB', options).format(now) + ' IST');
    };

    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <motion.footer
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: false, amount: 0.2 }}
      transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
      className="border-t border-white/10 bg-[#070908] py-8 px-6 relative"
    >
      <div className="max-w-6xl mx-auto flex items-center justify-between">
        {/* Left: Copyright */}
        <span className="text-[11px] text-zinc-300">
          © 2026 Soutrik
        </span>

        {/* Center: Kolkata live time */}
        <div className="text-xs text-white/90 flex items-center gap-2">
          <span className="text-zinc-300">KOLKATA:</span>
          <span className="text-white tabular-nums">{currentTime || '—'}</span>
        </div>

        {/* Right: Scroll to Top */}
        <button
          onClick={scrollToTop}
          className="relative overflow-hidden px-4 py-2 rounded-full bg-zinc-900/90 hover:bg-zinc-800 text-white border border-white/15 hover:border-[#00b848]/60 text-xs font-space transition-all duration-300 flex items-center gap-2 cursor-pointer shadow-sm hover:shadow-[0_0_15px_rgba(0,184,72,0.3)] hover:scale-105 active:scale-95 group tracking-wide"
          aria-label="Scroll to top"
        >
          <span className="pointer-events-none absolute inset-0 w-1/2 h-full bg-gradient-to-r from-transparent via-[#00ff66]/15 to-transparent animate-shimmer-sweep" />
          <span className="relative z-10 font-medium">Top</span>
          <ArrowUp className="w-3.5 h-3.5 relative z-10 text-[#00ff66] group-hover:-translate-y-0.5 transition-transform" />
        </button>
      </div>
    </motion.footer>
  );
};
