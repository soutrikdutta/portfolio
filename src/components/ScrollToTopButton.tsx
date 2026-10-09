import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence, useScroll, useSpring } from 'motion/react';
import { ArrowUp } from 'lucide-react';

export const ScrollToTopButton: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);
  const { scrollY, scrollYProgress } = useScroll();

  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 280,
    damping: 30,
    restDelta: 0.001,
  });

  useEffect(() => {
    return scrollY.on('change', (latest) => {
      setIsVisible(latest > 350);
    });
  }, [scrollY]);

  const scrollToTop = () => {
    const lenis = (window as unknown as { __lenis?: { scrollTo: (target: number, opts: { duration: number }) => void } }).__lenis;
    if (lenis) {
      lenis.scrollTo(0, { duration: 1.2 });
    } else {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  // SVG circular progress calculations (radius 18, circumference ~113.1)
  const radius = 18;
  const circumference = 2 * Math.PI * radius;

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0, scale: 0.7, y: 15 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.7, y: 15 }}
          transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
          className="fixed bottom-6 right-6 z-40"
        >
          <motion.button
            onClick={scrollToTop}
            whileHover={{ scale: 1.1, boxShadow: '0 0 25px rgba(0,255,102,0.35)' }}
            whileTap={{ scale: 0.92 }}
            aria-label="Scroll to top"
            className="relative w-11 h-11 rounded-full bg-zinc-950/90 backdrop-blur-xl border border-white/15 flex items-center justify-center text-zinc-300 hover:text-white group cursor-pointer shadow-lg hover:border-[#00ff66]/60 transition-colors"
          >
            {/* SVG Circular Progress Ring */}
            <svg className="absolute inset-0 w-full h-full -rotate-90 pointer-events-none" viewBox="0 0 44 44">
              <circle
                cx="22"
                cy="22"
                r={radius}
                fill="none"
                stroke="rgba(255,255,255,0.08)"
                strokeWidth="2"
              />
              <motion.circle
                cx="22"
                cy="22"
                r={radius}
                fill="none"
                stroke="#00ff66"
                strokeWidth="2"
                strokeLinecap="round"
                strokeDasharray={circumference}
                style={{
                  pathLength: smoothProgress,
                }}
              />
            </svg>

            {/* Glowing Arrow Icon */}
            <ArrowUp className="w-4 h-4 text-zinc-300 group-hover:text-[#00ff66] group-hover:-translate-y-0.5 transition-all relative z-10" />
          </motion.button>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
