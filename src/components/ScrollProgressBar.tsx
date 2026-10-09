import React from 'react';
import { motion, useScroll, useSpring } from 'motion/react';

export const ScrollProgressBar: React.FC = () => {
  const { scrollYProgress } = useScroll();
  // Buttery-smooth spring interpolation for real-time scroll depth
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 260,
    damping: 30,
    restDelta: 0.0005,
  });

  return (
    <div className="fixed top-0 left-0 right-0 h-[2.5px] z-50 pointer-events-none bg-transparent overflow-hidden">
      {/* Dynamic Luminous Laser Progress Bar */}
      <motion.div
        className="h-full w-full bg-gradient-to-r from-[#00b848]/70 via-[#00ff66] to-[#06b6d4] shadow-[0_0_12px_rgba(0,255,102,0.7),0_0_24px_rgba(6,182,212,0.4)] origin-left transform-gpu will-change-transform relative"
        style={{ scaleX }}
      >
        {/* Intense Photon Glow Head at the Leading Edge */}
        <div className="absolute right-0 top-1/2 -translate-y-1/2 w-4 h-4 rounded-full bg-white blur-[2px] shadow-[0_0_16px_#00ff66,0_0_25px_#06b6d4]" />
      </motion.div>
    </div>
  );
};
