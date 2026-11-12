import React, { useRef } from 'react';
import { motion, useScroll, useSpring, useTransform } from 'motion/react';
import { Code, Cpu, Database } from 'lucide-react';
import { FluxCard } from './FluxCard';
import { SectionHeader } from './SectionHeader';
import { PORTFOLIO_DATA } from '../data/portfolioData';
import { useScrollDirection } from '../hooks/useScrollAnimation';

const SkillIcon: React.FC<{ type: string }> = ({ type }) => {
  switch (type) {
    case 'html':
      return <span className="font-mono font-bold text-[10px] text-[#e34f26]">&lt;/&gt;</span>;
    case 'css':
      return <span className="font-mono font-bold text-[10px] text-[#1572b6]">#</span>;
    case 'javascript':
      return (
        <div className="w-3.5 h-3.5 rounded-[3px] bg-[#f7df1e] text-black flex items-center justify-center font-mono font-black text-[8px]">JS</div>
      );
    case 'typescript':
      return (
        <div className="w-3.5 h-3.5 rounded-[3px] bg-[#3178c6] text-white flex items-center justify-center font-mono font-black text-[8px]">TS</div>
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
        <div className="w-3.5 h-3.5 rounded-full bg-white text-black flex items-center justify-center font-mono font-black text-[8px]">N</div>
      );
    case 'tailwind':
      return (
        <svg className="w-3.5 h-3.5 text-[#38bdf8]" viewBox="0 0 24 24" fill="currentColor">
          <path d="M12.001,4.8c-3.2,0-5.2,1.6-6,4.8c1.2-1.6,2.6-2.2,4.2-1.8c0.913,0.228,1.565,0.89,2.288,1.624 C13.666,10.618,15.027,12,18.001,12c3.2,0,5.2-1.6,6-4.8c-1.2,1.6-2.6,2.2-4.2,1.8c-0.913-0.228-1.565-0.89-2.288-1.624 C16.337,6.182,14.976,4.8,12.001,4.8z M6.001,12c-3.2,0-5.2,1.6-6,4.8c1.2-1.6,2.6-2.2,4.2-1.8c0.913,0.228,1.565,0.89,2.288,1.624 c1.177,1.194,2.538,2.576,5.512,2.576c3.2,0,5.2-1.6,6-4.8c-1.2,1.6-2.6,2.2-4.2,1.8c-0.913-0.228-1.565-0.89-2.288-1.624 C10.337,13.382,8.976,12,6.001,12z" />
        </svg>
      );
    case 'nodejs':
      return (
        <div className="w-3.5 h-3.5 rounded-[3px] bg-[#339933]/15 border border-[#339933]/40 flex items-center justify-center font-mono font-bold text-[6px] text-[#22c55e]">NODE</div>
      );
    case 'python':
      return (
        <svg className="w-3.5 h-3.5 text-[#3776ab]" viewBox="0 0 24 24" fill="currentColor">
          <path d="M12 2c-3.3 0-5 1.7-5 4v2h5v1H5c-2.3 0-4 1.7-4 4s1.7 4 4 4h2v-2c0-1.7 1.3-3 3-3h5V7c0-2.3-1.7-4-4-4zm-1.5 2c.6 0 1 .4 1 1s-.4 1-1 1-1-.4-1-1 .4-1 1-1zm1.5 18c3.3 0 5-1.7 5-4v-2h-5v-1h7c2.3 0 4-1.7 4-4s-1.7-4-4-4h-2v2c0 1.7-1.3 3-3 3H9v5c0 2.3 1.7 4 4 4zm1.5-2c-.6 0-1-.4-1-1s.4-1 1-1 1 .4 1 1-.4 1-1 1z" />
        </svg>
      );
    case 'ai':
      return <Cpu className="w-3.5 h-3.5 text-[#c9a8ff]" />;
    case 'git':
      return (
        <svg className="w-3.5 h-3.5 text-[#f05032]" viewBox="0 0 24 24" fill="currentColor">
          <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" />
        </svg>
      );
    case 'database':
      return <Database className="w-3.5 h-3.5 text-[#a4cfc0]" />;
    default:
      return <Code className="w-3.5 h-3.5 text-[#b5b1a4]" />;
  }
};

export const SkillsSection: React.FC = () => {
  const { compactSkills } = PORTFOLIO_DATA;
  const sectionRef = useRef<HTMLDivElement>(null);
  const direction = useScrollDirection();

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'end start'],
  });
  const smoothProgress = useSpring(scrollYProgress, { stiffness: 180, damping: 26 });
  const boxFloat = useTransform(smoothProgress, [0, 1], [-10, 10]);

  const offset = direction === 'down' ? 28 : -28;

  return (
    <section ref={sectionRef} id="skills" className="py-20 sm:py-28 px-5 sm:px-6 relative">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: offset }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false, amount: 0.1 }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
        >
          <SectionHeader
            tag="CAPABILITIES"
            title="TECH STACK & SKILLS"
            subtitle="Core languages, frameworks, and cloud architectures powering my applications."
          />
        </motion.div>

        <motion.div
          style={{ y: boxFloat }}
          initial={{ opacity: 0, y: offset, scale: 0.99 }}
          whileInView={{ opacity: 1, y: 0, scale: 1 }}
          viewport={{ once: false, amount: 0.1 }}
          transition={{ duration: 0.7, delay: 0.05, ease: [0.16, 1, 0.3, 1] }}
          className="transform-gpu will-change-transform"
        >
          <FluxCard className="p-5 sm:p-7 relative overflow-hidden bg-zinc-950/75 border-white/10 shadow-2xl">
            <div className="flex items-center justify-between px-2 pt-1 pb-6 border-b border-white/10 mb-6">
              <p className="eyebrow text-[#00f59b] font-semibold">CORE TOOLKIT</p>
              <span className="font-mono text-xs text-zinc-400 font-medium">{compactSkills.length} Verified Technologies</span>
            </div>

            <motion.div
              variants={{ hidden: {}, visible: { transition: { staggerChildren: 0.04, delayChildren: 0.06 } } }}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: false, amount: 0.12 }}
              className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 relative z-10"
            >
              {compactSkills.map((skill) => (
                <motion.div
                  key={skill.name}
                  variants={{
                    hidden: { opacity: 0, y: 14 },
                    visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] } },
                  }}
                  whileHover={{ y: -3, scale: 1.02 }}
                  transition={{ type: 'spring', stiffness: 400, damping: 24 }}
                  className="flex items-center gap-3 px-3.5 py-3.5 rounded-2xl bg-white/[0.03] border border-white/10 hover:border-[#00f59b]/40 hover:bg-white/[0.07] hover:shadow-[0_8px_25px_rgba(0,245,155,0.12)] transition-all duration-300 group cursor-default transform-gpu"
                >
                  <div className="w-9 h-9 rounded-xl bg-white/[0.05] border border-white/10 flex items-center justify-center group-hover:border-[#00f59b]/40 group-hover:bg-[#00f59b]/10 transition-colors shrink-0">
                    <SkillIcon type={skill.icon} />
                  </div>
                  <div className="min-w-0">
                    <p className="text-sm font-semibold text-white group-hover:text-[#00f59b] transition-colors truncate">
                      {skill.shortName}
                    </p>
                    <p className="font-mono text-[10px] uppercase tracking-[0.06em] text-zinc-400 truncate">
                      {skill.name === skill.shortName ? 'Engine' : skill.name}
                    </p>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </FluxCard>
        </motion.div>
      </div>
    </section>
  );
};
