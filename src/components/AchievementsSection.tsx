import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence, useScroll, useSpring, useTransform } from 'motion/react';
import { X, CheckCircle2, ArrowUpRight } from 'lucide-react';
import { FluxCard } from './FluxCard';
import { SectionHeader } from './SectionHeader';
import { AchievementVisual } from './AchievementVisual';
import { ProjectImageGallery } from './ProjectImageGallery';
import { PORTFOLIO_DATA, Achievement } from '../data/portfolioData';
import { useScrollDirection } from '../hooks/useScrollAnimation';

export const AchievementsSection: React.FC = () => {
  const { achievements } = PORTFOLIO_DATA;
  const [selectedAchievement, setSelectedAchievement] = useState<Achievement | null>(null);
  const [selectedSlideIndex, setSelectedSlideIndex] = useState<number>(0);

  const sectionRef = useRef<HTMLDivElement>(null);
  const direction = useScrollDirection();

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'end start'],
  });
  const smoothProgress = useSpring(scrollYProgress, { stiffness: 180, damping: 26 });
  const card1Float = useTransform(smoothProgress, [0, 1], [-9, 9]);
  const card3Float = useTransform(smoothProgress, [0, 1], [9, -9]);

  const offset = direction === 'down' ? 30 : -30;

  useEffect(() => {
    if (!selectedAchievement) document.body.style.overflow = '';
  }, [selectedAchievement]);

  useEffect(() => {
    if (!selectedAchievement) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setSelectedAchievement(null);
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [selectedAchievement]);

  return (
    <section ref={sectionRef} id="achievements" className="py-20 sm:py-28 px-5 sm:px-6 relative">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: offset }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false, amount: 0.1 }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
        >
          <SectionHeader
            tag="RECOGNITION"
            title="AWARDS & HONORS"
            subtitle="Hackathons, engineering challenges, and technical milestones."
          />
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 sm:gap-6 items-stretch">
          {achievements.map((item, idx) => (
            <motion.div
              key={item.id}
              style={{ y: idx === 0 ? card1Float : idx === 2 ? card3Float : undefined }}
              initial={{ opacity: 0, y: offset, scale: 0.97 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              whileHover={{ y: -5, transition: { type: 'spring', stiffness: 300, damping: 24 } }}
              viewport={{ once: false, amount: 0.1 }}
              transition={{ duration: 0.7, delay: idx * 0.08, ease: [0.16, 1, 0.3, 1] }}
              className="flex transform-gpu will-change-transform"
            >
              <FluxCard
                className="w-full flex flex-col p-4 sm:p-5 group cursor-pointer bg-zinc-950/75 border-white/10 hover:border-[#00f59b]/40 hover:shadow-[0_12px_35px_rgba(0,245,155,0.1)] transition-all duration-300"
                onClick={() => {
                  setSelectedAchievement(item);
                  setSelectedSlideIndex(0);
                }}
              >
                <div
                  className="mb-4 overflow-hidden rounded-2xl border border-white/10 relative shadow-inner"
                  onClick={(e) => e.stopPropagation()}
                >
                  {item.images && item.images.length > 0 ? (
                    <ProjectImageGallery
                      images={item.images}
                      title={item.title}
                      imageFit="contain"
                      aspectClass="aspect-[4/3]"
                      onOpenLightbox={(idx) => {
                        setSelectedAchievement(item);
                        setSelectedSlideIndex(idx);
                      }}
                    />
                  ) : (
                    <div className="aspect-[16/10] bg-black relative">
                      <AchievementVisual type={item.imageType} title={item.title} />
                    </div>
                  )}
                </div>

                <div className="px-1 flex items-center justify-between text-xs mb-2">
                  <span className="font-mono uppercase tracking-[0.1em] text-zinc-400 truncate max-w-[70%]">
                    {item.issuer}
                  </span>
                  <span className="font-mono text-[#00f59b] font-semibold">{item.date}</span>
                </div>

                <h3 className="px-1 font-dot text-xl sm:text-2xl font-bold text-white group-hover:text-[#00f59b] transition-colors leading-snug mb-2">
                  {item.title}
                </h3>

                <div className="px-1 mb-3">
                  <span className="chip !text-[10px] !text-[#00f59b] !border-[#00f59b]/35 !bg-[#00f59b]/10 font-bold">
                    {item.award}
                  </span>
                </div>

                <p className="px-1 text-sm text-zinc-300 leading-relaxed flex-1 mb-4">
                  {item.description}
                </p>

                {item.articleUrl && (
                  <div className="px-1 pt-3.5 mt-auto border-t border-white/10 flex items-center justify-end">
                    <a
                      href={item.articleUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={(e) => e.stopPropagation()}
                      className="inline-flex items-center gap-1.5 text-xs text-zinc-400 hover:text-[#00f59b] transition-colors font-medium"
                    >
                      <span>Read article</span>
                      <ArrowUpRight className="w-3.5 h-3.5" />
                    </a>
                  </div>
                )}
              </FluxCard>
            </motion.div>
          ))}
        </div>
      </div>

      <AnimatePresence>
        {selectedAchievement && (
          <div
            className="fixed inset-0 z-[80] flex items-center justify-center p-4 bg-black/80 backdrop-blur-xl cursor-pointer"
            onClick={() => setSelectedAchievement(null)}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.96, y: 12 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.96, y: 12 }}
              transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
              onClick={(e) => e.stopPropagation()}
              className="relative w-full max-w-2xl surface p-5 sm:p-8 max-h-[90vh] overflow-y-auto cursor-default"
            >
              <button
                onClick={() => setSelectedAchievement(null)}
                className="absolute top-5 right-5 p-2 rounded-full bg-[#f3f0e7]/[0.06] hover:bg-[#f3f0e7]/[0.12] text-[#d8d4c6] hover:text-white border border-[#f3f0e7]/10 transition-colors cursor-pointer"
                aria-label="Close Lightbox"
              >
                <X className="w-4 h-4" />
              </button>

              <p className="eyebrow mb-2 text-[#6f6d64]">Recognition</p>
              <h3 className="font-dot text-3xl sm:text-4xl text-[#f3f0e7] leading-tight mb-2 pr-10">
                {selectedAchievement.title}
              </h3>

              <div className="flex flex-wrap items-center gap-2 text-[11px] font-mono text-[#8f8c82] mb-6">
                <span>{selectedAchievement.issuer}</span>
                <span className="text-[#4e4c45]">·</span>
                <span className="text-[#e9ff9b]">{selectedAchievement.award}</span>
                <span className="text-[#4e4c45]">·</span>
                <span>{selectedAchievement.date}</span>
              </div>

              <div className="mb-6 rounded-2xl overflow-hidden border border-[#f3f0e7]/[0.08]">
                {selectedAchievement.images && selectedAchievement.images.length > 0 ? (
                  <ProjectImageGallery
                    images={selectedAchievement.images}
                    title={selectedAchievement.title}
                    imageFit="contain"
                    aspectClass="aspect-[4/3] sm:aspect-[16/11]"
                    initialIndex={selectedSlideIndex}
                  />
                ) : (
                  <AchievementVisual
                    type={selectedAchievement.imageType}
                    title={selectedAchievement.title}
                  />
                )}
              </div>

              <p className="text-sm text-[#a3a096] font-space leading-relaxed mb-6">
                {selectedAchievement.description}
              </p>

              <div className="p-4 rounded-2xl bg-[#f3f0e7]/[0.025] border border-[#f3f0e7]/[0.07] flex items-center gap-3 text-xs font-mono text-[#d8d4c6] mb-6">
                <CheckCircle2 className="w-4 h-4 text-[#dcf27a] shrink-0" />
                <span>{selectedAchievement.highlight}</span>
              </div>

              <div className="flex flex-wrap items-center justify-between gap-3 pt-5 border-t border-[#f3f0e7]/[0.08]">
                {selectedAchievement.articleUrl ? (
                  <a
                    href={selectedAchievement.articleUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 text-xs text-[#a3a096] hover:text-[#e9ff9b] transition-colors"
                  >
                    Read full article
                    <ArrowUpRight className="w-3.5 h-3.5" />
                  </a>
                ) : <div />}

                <button
                  onClick={() => setSelectedAchievement(null)}
                  className="px-5 py-2.5 rounded-full border border-[#f3f0e7]/12 text-xs text-[#d8d4c6] hover:text-[#f3f0e7] hover:border-[#f3f0e7]/25 transition-colors cursor-pointer"
                >
                  Close
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
};
