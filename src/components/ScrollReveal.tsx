import React from 'react';
import { motion, MotionStyle } from 'motion/react';
import { useScrollDirection } from '../hooks/useScrollAnimation';

interface ScrollRevealProps {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  offset?: number;
  amount?: number;
  style?: MotionStyle;
}

/**
 * Bi-directional scroll reveal wrapper:
 * Animates smoothly when scrolling down (emerges from bottom)
 * as well as when scrolling up (emerges from top).
 */
export const ScrollReveal: React.FC<ScrollRevealProps> = ({
  children,
  className = '',
  delay = 0,
  offset = 24,
  amount = 0.08,
  style,
}) => {
  const direction = useScrollDirection();

  return (
    <motion.div
      initial={{
        opacity: 0,
        y: direction === 'down' ? offset : -offset,
        scale: 0.98,
      }}
      whileInView={{
        opacity: 1,
        y: 0,
        scale: 1,
      }}
      viewport={{ once: false, amount }}
      transition={{
        duration: 0.55,
        delay,
        ease: [0.16, 1, 0.3, 1],
      }}
      style={style}
      className={`transform-gpu will-change-transform ${className}`}
    >
      {children}
    </motion.div>
  );
};
