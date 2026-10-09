import React from 'react';
import { motion } from 'motion/react';

export interface SectionDividerProps {
  className?: string;
}

export const SectionDivider: React.FC<SectionDividerProps> = ({ className = '' }) => {
  return (
    <div
      className={`w-full flex items-center justify-center py-3 sm:py-6 px-6 pointer-events-none select-none ${className}`}
      aria-hidden="true"
    >
      <div className="max-w-6xl w-full relative flex items-center justify-center">
        {/* Static dim base line */}
        <div className="absolute inset-x-0 h-[1px] bg-white/[0.05]" />

        {/* Animated expanding line from center on scroll */}
        <motion.div
          initial={{ scaleX: 0, opacity: 0 }}
          whileInView={{ scaleX: 1, opacity: 1 }}
          viewport={{ once: false, amount: 0.3 }}
          transition={{ duration: 0.85, ease: [0.16, 1, 0.3, 1] }}
          style={{ originX: 0.5 }}
          className="absolute inset-x-0 h-[1px] bg-gradient-to-r from-transparent via-[#00ff66]/30 to-transparent transform-gpu will-change-transform"
        />

        {/* Dynamic travelling neon pulse on scroll reveal */}
        <motion.div
          initial={{ x: '-150%', opacity: 0 }}
          whileInView={{ x: '150%', opacity: [0, 0.8, 0] }}
          viewport={{ once: false, amount: 0.3 }}
          transition={{ duration: 1.6, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
          className="absolute h-[2px] w-36 bg-gradient-to-r from-transparent via-[#00ff66] to-transparent shadow-[0_0_12px_#00ff66] transform-gpu will-change-transform"
        />

        {/* Center Glowing Cyber Beacon Node */}
        <motion.div
          initial={{ scale: 0, opacity: 0 }}
          whileInView={{ scale: 1, opacity: 1 }}
          viewport={{ once: false, amount: 0.3 }}
          transition={{ duration: 0.5, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
          className="relative z-10 w-2 h-2 rounded-full bg-[#00ff66]/20 border border-[#00ff66]/60 flex items-center justify-center shadow-[0_0_8px_rgba(0,255,102,0.4)]"
        >
          <div className="w-1 h-1 rounded-full bg-[#00ff66]" />
        </motion.div>
      </div>
    </div>
  );
};

export default SectionDivider;
