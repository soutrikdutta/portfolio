import React from 'react';
import { motion } from 'motion/react';

export interface StaggeredWordRevealProps {
  text: string;
  className?: string;
  delayStart?: number;
}

export const StaggeredWordReveal: React.FC<StaggeredWordRevealProps> = ({
  text,
  className = '',
  delayStart = 0.3,
}) => {
  const words = text.split(' ');
  const cursorDelay = delayStart + (words.length > 0 ? (words.length - 1) * 0.08 + 0.55 : 0);

  return (
    <div className={className}>
      {words.map((word, idx) => (
        <motion.span
          key={`${word}-${idx}`}
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            duration: 0.55,
            delay: delayStart + idx * 0.08,
            ease: [0.22, 1, 0.36, 1],
          }}
          style={{
            display: 'inline-block',
            marginRight: '0.3em',
          }}
        >
          {word}
        </motion.span>
      ))}
      <motion.span
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{
          duration: 0.4,
          delay: cursorDelay,
        }}
        style={{
          display: 'inline-block',
          width: '2px',
          height: '1.1em',
          backgroundColor: '#00b848',
          verticalAlign: '-0.15em',
          animation: 'blink 1s step-end infinite',
          animationDelay: `${cursorDelay}s`,
        }}
        aria-hidden="true"
      />
    </div>
  );
};

export default StaggeredWordReveal;
