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
        hour12: false,
      };
      setCurrentTime(new Intl.DateTimeFormat('en-GB', options).format(now) + ' IST');
    };

    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  const scrollToTop = () => {
    const lenis = (window as unknown as { __lenis?: { scrollTo: (target: number, opts: { duration: number }) => void } }).__lenis;
    if (lenis) {
      lenis.scrollTo(0, { duration: 1.2 });
    } else {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  return (
    <motion.footer
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: false, amount: 0.2 }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      className="border-t border-white/10 bg-zinc-950 relative"
    >
      <div className="max-w-6xl mx-auto px-5 sm:px-6 py-10">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-3">
            <span className="font-dot text-lg font-bold text-white">Soutrik Dutta</span>
            <span className="hidden sm:inline text-xs font-mono uppercase tracking-[0.16em] text-zinc-400">
              · Portfolio 2026
            </span>
          </div>

          <div className="flex items-center gap-2 font-mono text-xs uppercase tracking-[0.14em] text-zinc-400">
            <span>Kolkata</span>
            <span className="text-zinc-600">/</span>
            <span className="text-[#00f59b] font-semibold tabular-nums">{currentTime || '—'}</span>
          </div>

          <div className="flex items-center gap-4">
            <span className="text-xs text-zinc-400">© 2026 Soutrik</span>
            <button
              onClick={scrollToTop}
              className="group inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-white/10 text-zinc-300 hover:text-[#00f59b] hover:border-[#00f59b]/40 text-xs transition-all duration-300 cursor-pointer bg-white/[0.03]"
              aria-label="Scroll to top"
            >
              <span>Top</span>
              <ArrowUp className="w-3.5 h-3.5 group-hover:-translate-y-0.5 transition-transform" />
            </button>
          </div>
        </div>
      </div>
    </motion.footer>
  );
};
