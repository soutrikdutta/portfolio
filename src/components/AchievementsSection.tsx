import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, CheckCircle2, ExternalLink } from 'lucide-react';
import { FluxCard } from './FluxCard';
import { GlyphDecryptText } from './GlyphDecryptText';
import { AchievementVisual } from './AchievementVisual';
import { ProjectImageGallery } from './ProjectImageGallery';
import { PORTFOLIO_DATA, Achievement } from '../data/portfolioData';

export const AchievementsSection: React.FC = () => {
  const { achievements } = PORTFOLIO_DATA;
  const [selectedAchievement, setSelectedAchievement] = useState<Achievement | null>(null);
  const [selectedSlideIndex, setSelectedSlideIndex] = useState<number>(0);

  // Safely ensure body scroll is unlocked whenever modal closes
  useEffect(() => {
    if (!selectedAchievement) {
      document.body.style.overflow = '';
    }
  }, [selectedAchievement]);

  // Escape key handler for selectedAchievement modal
  useEffect(() => {
    if (!selectedAchievement) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setSelectedAchievement(null);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [selectedAchievement]);

  return (
    <section id="achievements" className="py-20 px-6 relative">
      <div className="max-w-6xl mx-auto">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false, amount: 0.15 }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="mb-12"
        >
          <h2 className="text-3xl sm:text-4xl font-bold tracking-wider text-white font-dot">
            <GlyphDecryptText text="ACHIEVEMENTS" speed={28} />
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

        {/* Balanced 3-Card Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-stretch">
          {achievements.map((item, idx) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              whileHover={{ y: -5, transition: { duration: 0.2, ease: 'easeOut' } }}
              viewport={{ once: false, amount: 0.08 }}
              transition={{ duration: 0.5, delay: idx * 0.08, ease: [0.22, 1, 0.36, 1] }}
              className="flex transform-gpu will-change-transform"
            >
              <FluxCard
                className="w-full flex flex-col p-5 group border-white/10 hover:border-white/20 hover:shadow-[0_10px_35px_rgba(0,184,72,0.12)] transition-all cursor-pointer"
                onClick={() => {
                  setSelectedAchievement(item);
                  setSelectedSlideIndex(0);
                }}
              >
                {/* Visual / Image Slot */}
                <div
                  className="mb-4 overflow-hidden rounded-xl border border-white/10 relative"
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
                      <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center text-xs text-[#00b848] backdrop-blur-xs">
                        <span>INSPECT RECOGNITION ↗</span>
                      </div>
                    </div>
                  )}
                </div>

                <div className="flex items-center justify-between text-xs text-white/90 mb-2">
                  <span className="text-zinc-300 truncate max-w-[70%]">{item.issuer}</span>
                  <span className="text-[#00ff66] font-semibold">{item.date}</span>
                </div>

                <h3 className="text-base sm:text-lg font-bold text-white font-space group-hover:text-zinc-100 transition-colors mb-1.5">
                  {item.title}
                </h3>

                <div className="text-xs text-zinc-300 mb-3 font-space font-medium">
                  {item.award}
                </div>

                <p className="text-xs text-zinc-200 leading-relaxed flex-1 mb-4">
                  {item.description}
                </p>

                {/* Small Text Link at the bottom if article exists - plain text only, no underline, no arrow, with hover animation */}
                {item.articleUrl && (
                  <div className="pt-3 mt-auto border-t border-white/5 flex items-center justify-end">
                    <a
                      href={item.articleUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={(e) => e.stopPropagation()}
                      className="text-[11px] text-zinc-400 hover:text-white inline-block transition-all duration-300 ease-out hover:translate-x-1.5 hover:tracking-wide font-space cursor-pointer"
                    >
                      Read Article
                    </a>
                  </div>
                )}
              </FluxCard>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Lightbox Modal */}
      <AnimatePresence>
        {selectedAchievement && (
          <div
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-xl cursor-pointer"
            onClick={() => setSelectedAchievement(null)}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              onClick={(e) => e.stopPropagation()}
              className="relative w-full max-w-2xl bg-zinc-950 border border-white/15 rounded-2xl p-6 sm:p-8 max-h-[90vh] overflow-y-auto shadow-2xl cursor-default"
            >
              <button
                onClick={() => setSelectedAchievement(null)}
                className="absolute top-6 right-6 p-2.5 rounded-full bg-zinc-900/90 hover:bg-zinc-800 text-zinc-300 hover:text-white border border-white/15 hover:border-[#00b848]/60 transition-all duration-300 hover:scale-110 active:scale-90 cursor-pointer shadow-sm hover:shadow-[0_0_15px_rgba(0,184,72,0.3)]"
                aria-label="Close Lightbox"
              >
                <X className="w-4 h-4" />
              </button>

              <h3 className="text-xl sm:text-2xl font-bold text-white font-space mb-1">
                {selectedAchievement.title}
              </h3>

              <div className="flex flex-wrap items-center gap-2 text-xs font-mono text-zinc-400 mb-6">
                <span>{selectedAchievement.issuer}</span>
                <span>·</span>
                <span className="text-white font-space font-medium">{selectedAchievement.award}</span>
                <span>·</span>
                <span>{selectedAchievement.date}</span>
              </div>

              {/* Photos Gallery with Same Controls (Trophy First, Then Faces, No Autoplay) */}
              <div className="mb-6 rounded-xl overflow-hidden border border-white/10">
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

              <p className="text-sm text-zinc-300 font-space leading-relaxed mb-6">
                {selectedAchievement.description}
              </p>

              <div className="p-4 rounded-xl bg-black/50 border border-white/10 flex items-center gap-3 text-xs font-mono text-zinc-300 mb-6">
                <CheckCircle2 className="w-4 h-4 text-[#00b848] shrink-0" />
                <span>{selectedAchievement.highlight}</span>
              </div>

              {/* Modal Actions */}
              <div className="flex flex-wrap items-center justify-between gap-3 pt-4 border-t border-white/10">
                {selectedAchievement.articleUrl ? (
                  <a
                    href={selectedAchievement.articleUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-xs text-zinc-300 hover:text-white inline-block transition-all duration-300 ease-out hover:translate-x-1.5 hover:tracking-wide font-space cursor-pointer"
                  >
                    Read Full Article
                  </a>
                ) : <div />}

                <button
                  onClick={() => setSelectedAchievement(null)}
                  className="px-5 py-2.5 rounded-full bg-white/10 hover:bg-white/20 text-white text-xs font-dot transition-all duration-300 hover:scale-105 active:scale-95 cursor-pointer"
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
