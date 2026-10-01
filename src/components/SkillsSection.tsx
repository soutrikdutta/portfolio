import React from 'react';
import { motion } from 'motion/react';
import { Code, Cpu, Database } from 'lucide-react';
import { FluxCard } from './FluxCard';
import { GlyphDecryptText } from './GlyphDecryptText';
import { PORTFOLIO_DATA } from '../data/portfolioData';

// Authentic Vibrant SVG Logos for Compact Skills
const SkillIcon: React.FC<{ type: string }> = ({ type }) => {
  switch (type) {
    case 'html':
      return (
        <span className="font-mono font-bold text-[10px] text-[#e34f26]">
          &lt;/&gt;
        </span>
      );
    case 'css':
      return (
        <span className="font-mono font-bold text-[10px] text-[#1572b6]">
          #
        </span>
      );
    case 'javascript':
      return (
        <div className="w-3.5 h-3.5 rounded bg-[#f7df1e] text-black flex items-center justify-center font-mono font-black text-[8px]">
          JS
        </div>
      );
    case 'typescript':
      return (
        <div className="w-3.5 h-3.5 rounded bg-[#3178c6] text-white flex items-center justify-center font-mono font-black text-[8px]">
          TS
        </div>
      );
    case 'react':
      return (
        <svg viewBox="-11.5 -10.23174 23 20.46348" className="w-3.5 h-3.5 text-[#61dafb]" fill="none">
          <circle cx="0" cy="0" r="2.05" fill="currentColor" />
          <g stroke="currentColor" strokeWidth="1">
            <ellipse rx="11" ry="4.2" />
            <ellipse rx="11" ry="4.2" transform="rotate(60)" />
            <ellipse rx="11" ry="4.2" transform="rotate(120)" />
          </g>
        </svg>
      );
    case 'nextjs':
      return (
        <div className="w-3.5 h-3.5 rounded-full bg-white text-black flex items-center justify-center font-mono font-black text-[8px]">
          N
        </div>
      );
    case 'tailwind':
      return (
        <svg className="w-3.5 h-3.5 text-[#38bdf8]" viewBox="0 0 24 24" fill="currentColor">
          <path d="M12.001,4.8c-3.2,0-5.2,1.6-6,4.8c1.2-1.6,2.6-2.2,4.2-1.8c0.913,0.228,1.565,0.89,2.288,1.624 C13.666,10.618,15.027,12,18.001,12c3.2,0,5.2-1.6,6-4.8c-1.2,1.6-2.6,2.2-4.2,1.8c-0.913-0.228-1.565-0.89-2.288-1.624 C16.337,6.182,14.976,4.8,12.001,4.8z M6.001,12c-3.2,0-5.2,1.6-6,4.8c1.2-1.6,2.6-2.2,4.2-1.8c0.913,0.228,1.565,0.89,2.288,1.624 c1.177,1.194,2.538,2.576,5.512,2.576c3.2,0,5.2-1.6,6-4.8c-1.2,1.6-2.6,2.2-4.2,1.8c-0.913-0.228-1.565-0.89-2.288-1.624 C10.337,13.382,8.976,12,6.001,12z" />
        </svg>
      );
    case 'nodejs':
      return (
        <div className="w-3.5 h-3.5 rounded bg-[#339933]/20 border border-[#339933]/40 flex items-center justify-center font-mono font-bold text-[7px] text-[#22c55e]">
          NODE
        </div>
      );
    case 'python':
      return (
        <svg className="w-3.5 h-3.5 text-[#3776ab]" viewBox="0 0 24 24" fill="currentColor">
          <path d="M12 2c-3.3 0-5 1.7-5 4v2h5v1H5c-2.3 0-4 1.7-4 4s1.7 4 4 4h2v-2c0-1.7 1.3-3 3-3h5V7c0-2.3-1.7-4-4-4zm-1.5 2c.6 0 1 .4 1 1s-.4 1-1 1-1-.4-1-1 .4-1 1-1zm1.5 18c3.3 0 5-1.7 5-4v-2h-5v-1h7c2.3 0 4-1.7 4-4s-1.7-4-4-4h-2v2c0 1.7-1.3 3-3 3H9v5c0 2.3 1.7 4 4 4zm1.5-2c-.6 0-1-.4-1-1s.4-1 1-1 1 .4 1 1-.4 1-1 1z" />
        </svg>
      );
    case 'ai':
      return <Cpu className="w-3.5 h-3.5 text-[#a855f7]" />;
    case 'git':
      return (
        <svg className="w-3.5 h-3.5 text-[#f05032]" viewBox="0 0 24 24" fill="currentColor">
          <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" />
        </svg>
      );
    case 'database':
      return <Database className="w-3.5 h-3.5 text-[#06b6d4]" />;
    default:
      return <Code className="w-3.5 h-3.5 text-zinc-300" />;
  }
};

export const SkillsSection: React.FC = () => {
  const { compactSkills } = PORTFOLIO_DATA;

  return (
    <section id="skills" className="py-20 px-6 relative">
      <div className="max-w-6xl mx-auto">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false, amount: 0.15 }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="mb-10"
        >
          <h2 className="text-3xl sm:text-4xl font-bold tracking-wider text-white font-dot">
            <GlyphDecryptText text="TECHNICAL SKILLS" speed={28} />
          </h2>
          <div className="mt-2.5 flex items-center gap-2">
            <motion.div
              initial={{ scaleX: 0 }}
              whileInView={{ scaleX: 1 }}
              viewport={{ once: false }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              style={{ originX: 0 }}
              className="h-[2px] w-24 bg-gradient-to-r from-[#00ff66] to-transparent rounded-full"
            />
            <span className="w-1.5 h-1.5 rounded-full bg-[#00ff66] animate-pulse" />
          </div>
        </motion.div>

        {/* Box containing small skills with authentic colored logos */}
        <motion.div
          initial={{ opacity: 0, y: 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false, amount: 0.1 }}
          transition={{ duration: 0.6, delay: 0.05, ease: [0.16, 1, 0.3, 1] }}
          className="transform-gpu will-change-transform"
        >
          <FluxCard className="p-6 sm:p-8 border-white/10 hover:border-white/20 relative overflow-hidden">
            {/* Subtle animated light sweep */}
            <div className="pointer-events-none absolute inset-0 w-1/3 bg-gradient-to-r from-transparent via-white/[0.03] to-transparent animate-shimmer-sweep" />

            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3 relative z-10">
              {compactSkills.map((skill) => (
                <div
                  key={skill.name}
                  className="flex items-center gap-2.5 px-3 py-2.5 rounded-xl bg-zinc-950/70 hover:bg-zinc-900/90 border border-white/5 hover:border-[#00ff66]/40 hover:shadow-[0_0_20px_rgba(0,255,102,0.12)] hover:-translate-y-1 hover:scale-105 transition-all duration-200 ease-out group cursor-default transform-gpu"
                >
                  <div className="p-1 rounded-lg bg-zinc-900/90 border border-white/5 group-hover:border-white/20 transition-colors shrink-0">
                    <SkillIcon type={skill.icon} />
                  </div>
                  <span className="text-xs font-mono text-zinc-200 group-hover:text-white transition-colors truncate">
                    {skill.shortName}
                  </span>
                </div>
              ))}
            </div>
          </FluxCard>
        </motion.div>
      </div>
    </section>
  );
};
