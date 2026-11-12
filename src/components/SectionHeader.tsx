import React from 'react';
import { motion } from 'motion/react';
import { GlyphDecryptText } from './GlyphDecryptText';

interface SectionHeaderProps {
  tag?: string;
  title: string;
  subtitle?: string;
  align?: 'left' | 'center';
  className?: string;
  action?: React.ReactNode;
}

export const SectionHeader: React.FC<SectionHeaderProps> = ({
  tag,
  title,
  subtitle,
  align = 'left',
  className = '',
  action,
}) => {
  const isCenter = align === 'center';

  return (
    <div className={`mb-9 sm:mb-14 ${isCenter ? 'text-center' : ''} ${className}`}>
      <div className={`flex flex-col sm:flex-row sm:items-end justify-between gap-5 ${isCenter ? 'sm:justify-center' : ''}`}>
        <div className={isCenter ? 'mx-auto' : ''}>
          {tag && (
            <motion.div
              initial={{ opacity: 0, y: -4 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: false }}
              transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
              className={`inline-flex items-center gap-2 px-3 py-1 rounded-full border border-[#00f59b]/25 bg-[#00f59b]/10 mb-3.5 backdrop-blur-md ${isCenter ? 'justify-center mx-auto' : ''}`}
            >
              <span className="w-1.5 h-1.5 rounded-full bg-[#00f59b] animate-pulse" />
              <span className="text-[10px] font-mono font-semibold text-[#00f59b] uppercase tracking-[0.16em]">{tag}</span>
            </motion.div>
          )}

          <h2 className="font-dot text-[clamp(2.2rem,5vw,3.6rem)] font-bold tracking-tight text-white leading-tight">
            <GlyphDecryptText text={title} speed={28} />
          </h2>

          {subtitle && (
            <p className="mt-3.5 text-zinc-400 text-sm sm:text-[15px] font-space max-w-xl leading-relaxed">
              {subtitle}
            </p>
          )}
        </div>

        {action && <div className="shrink-0 sm:pb-1">{action}</div>}
      </div>

      {!isCenter && (
        <div className="mt-6 flex items-center gap-3" aria-hidden>
          <motion.div
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: false }}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
            style={{ originX: 0 }}
            className="h-px flex-1 bg-gradient-to-r from-[#00f59b]/35 via-white/10 to-transparent"
          />
        </div>
      )}
    </div>
  );
};
