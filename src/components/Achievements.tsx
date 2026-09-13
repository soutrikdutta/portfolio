import React, { useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { portfolioConfig } from "../portfolio.config";
import { ExternalLink, CheckCircle2, Image as ImageIcon, ChevronLeft, ChevronRight } from "lucide-react";

export const Achievements: React.FC = () => {
  const shouldReduceMotion = useReducedMotion();
  const [imageErrors, setImageErrors] = useState<Record<string, boolean>>({});
  const [activeImageIndices, setActiveImageIndices] = useState<Record<string, number>>({});

  const handleImageError = (key: string) => {
    setImageErrors((prev) => ({ ...prev, [key]: true }));
  };

  const handleNextImage = (title: string, total: number, e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setActiveImageIndices((prev) => ({
      ...prev,
      [title]: ((prev[title] || 0) + 1) % total,
    }));
  };

  const handlePrevImage = (title: string, total: number, e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setActiveImageIndices((prev) => ({
      ...prev,
      [title]: ((prev[title] || 0) - 1 + total) % total,
    }));
  };


  return (
    <section
      id="achievements"
      className="py-20 sm:py-28 max-w-4xl mx-auto px-5 sm:px-8 border-t border-white/[0.06] scroll-mt-20"
      aria-label="Achievements section"
    >
      <motion.div
        initial={{ opacity: 0, y: shouldReduceMotion ? 0 : 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: false, margin: "-80px" }}
        transition={{ duration: 0.5 }}
        className="space-y-10"
      >
        {/* Section Header */}
        <motion.div
          initial={shouldReduceMotion ? false : { opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: false, margin: "-60px" }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="space-y-2"
        >
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold tracking-tight text-white">
            Achievements
          </h2>
          <p className="text-sm sm:text-base text-zinc-400">
            Milestones, recognitions, and featured project showcases.
          </p>
        </motion.div>

        {/* Achievements Cards (Centered when odd number of items) */}
        <div className="flex flex-wrap justify-center gap-5 sm:gap-6">
          {portfolioConfig.achievements.map((item, index) => {
            const imageList = item.images && item.images.length > 0
              ? item.images
              : (item.imageUrl ? [item.imageUrl] : []);
            const currentIndex = activeImageIndices[item.title] || 0;
            const currentImg = imageList[currentIndex];
            const hasValidImage = Boolean(currentImg) && !imageErrors[`${item.title}-${currentIndex}`];

            return (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: shouldReduceMotion ? 0 : 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: false, margin: "-40px" }}
                transition={{
                  duration: 0.45,
                  delay: shouldReduceMotion ? 0 : index * 0.08,
                  ease: "easeOut",
                }}
                whileHover={shouldReduceMotion ? {} : { y: -2 }}
                className="w-full md:w-[calc(50%-0.75rem)] group relative flex flex-col justify-between p-5 sm:p-6 rounded-2xl bg-[#0e121b]/60 hover:bg-[#111522]/80 backdrop-blur-sm border border-white/[0.08] hover:border-white/[0.22] shadow-[0_8px_30px_rgba(0,0,0,0.35)] hover:shadow-[0_12px_36px_rgba(0,0,0,0.5)] transition-all duration-300 overflow-hidden"
              >
                <div className="space-y-4">
                  {/* Dedicated Image Frame Space (supports single image or multi-image carousel) */}
                  <div className="relative w-full h-60 sm:h-72 rounded-xl overflow-hidden bg-[#07090e] border border-white/[0.08] group-hover:border-white/[0.20] transition-colors select-none flex items-center justify-center">
                    {hasValidImage ? (
                      <>
                        {/* Ambient blurred backdrop to eliminate harsh empty bars */}
                        <img
                          src={currentImg}
                          alt=""
                          aria-hidden="true"
                          className="absolute inset-0 w-full h-full object-cover blur-2xl opacity-40 scale-125 pointer-events-none"
                        />

                        {/* Foreground clear image: fully visible with zero cropping */}
                        <img
                          key={currentImg}
                          src={currentImg}
                          alt={`${item.title} - ${currentIndex + 1}`}
                          className="relative z-10 max-w-full max-h-full object-contain object-center transition-all duration-300 group-hover:scale-[1.02]"
                          onError={() => handleImageError(`${item.title}-${currentIndex}`)}
                        />

                        {/* Multi-image indicators & controls */}
                        {imageList.length > 1 && (
                          <div className="z-30">
                            {/* Counter Pill */}
                            <span className="absolute top-2.5 right-2.5 px-2.5 py-0.5 rounded-full text-[10px] font-mono font-medium text-white/90 bg-black/70 backdrop-blur-md border border-white/15 shadow-sm pointer-events-none">
                              {currentIndex + 1} / {imageList.length}
                            </span>

                            {/* Navigation Arrows */}
                            <button
                              type="button"
                              onClick={(e) => handlePrevImage(item.title, imageList.length, e)}
                              className="absolute left-2.5 top-1/2 -translate-y-1/2 p-2 rounded-full bg-black/70 hover:bg-black/90 text-white/80 hover:text-white border border-white/15 opacity-90 hover:opacity-100 transition-all duration-150 backdrop-blur-md shadow-md"
                              aria-label="Previous image"
                            >
                              <ChevronLeft className="w-4 h-4" />
                            </button>

                            <button
                              type="button"
                              onClick={(e) => handleNextImage(item.title, imageList.length, e)}
                              className="absolute right-2.5 top-1/2 -translate-y-1/2 p-2 rounded-full bg-black/70 hover:bg-black/90 text-white/80 hover:text-white border border-white/15 opacity-90 hover:opacity-100 transition-all duration-150 backdrop-blur-md shadow-md"
                              aria-label="Next image"
                            >
                              <ChevronRight className="w-4 h-4" />
                            </button>

                            {/* Dots Indicator */}
                            <div className="absolute bottom-2.5 inset-x-0 flex justify-center items-center pointer-events-auto">
                              <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-black/60 backdrop-blur-md border border-white/15 shadow-sm">
                                  {imageList.map((_, imgIdx) => (
                                    <button
                                      key={imgIdx}
                                      type="button"
                                      onClick={(e) => {
                                        e.preventDefault();
                                        e.stopPropagation();
                                        setActiveImageIndices((prev) => ({ ...prev, [item.title]: imgIdx }));
                                      }}
                                      className={`h-1.5 rounded-full transition-all duration-200 ${
                                        imgIdx === currentIndex
                                          ? "w-5 bg-white shadow-sm"
                                          : "w-1.5 bg-white/40 hover:bg-white/70"
                                      }`}
                                      aria-label={`Go to slide ${imgIdx + 1}`}
                                    />
                                  ))}
                              </div>
                            </div>
                          </div>
                        )}
                      </>
                    ) : (
                      /* Elegant Placeholder when image is ready to be uploaded */
                      <div className="w-full h-full flex flex-col items-center justify-center gap-2.5 p-4 text-center bg-gradient-to-b from-white/[0.02] to-transparent">
                        <div className="p-3 rounded-full bg-white/[0.04] border border-white/[0.08] text-zinc-400 group-hover:text-white transition-colors">
                          <ImageIcon className="w-5 h-5" />
                        </div>
                        <div className="space-y-0.5">
                          <p className="text-xs font-medium text-zinc-300">
                            Photo / Certificate slot
                          </p>
                          <p className="text-[11px] text-zinc-400">
                            Ready for showcase image
                          </p>
                        </div>
                      </div>
                    )}
                  </div>



                  {/* Title */}
                  <div className="space-y-1">
                    <h3 className="text-base sm:text-lg font-semibold text-white/90 group-hover:text-white transition-colors">
                      {item.title}
                    </h3>

                    {item.highlight && (
                      <p className="text-xs font-mono text-emerald-400/90 flex items-center gap-1.5">
                        <CheckCircle2 className="w-3 h-3 shrink-0" />
                        <span>{item.highlight}</span>
                      </p>
                    )}
                  </div>

                  {/* Description */}
                  <p className="text-xs sm:text-sm text-zinc-400 leading-relaxed font-normal">
                    {item.description}
                  </p>
                </div>

                {/* Bottom Link if present */}
                {item.link && (
                  <div className="pt-4 mt-3 border-t border-white/[0.04]">
                    {item.link === "#" ? (
                      <span className="inline-flex items-center gap-2 text-xs font-medium text-zinc-400 select-none">
                        <span>{item.linkLabel || "Read Article"}</span>
                        <span className="text-[10px] font-mono text-zinc-400 bg-white/[0.04] px-2 py-0.5 rounded-full border border-white/[0.06]">
                          Article Coming Soon
                        </span>
                      </span>
                    ) : (
                      <a
                        href={item.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1.5 text-xs font-medium text-zinc-300 hover:text-white group/link transition-colors"
                      >
                        <span>{item.linkLabel || "View Details"}</span>
                        <ExternalLink className="w-3 h-3 text-zinc-400 group-hover/link:text-white transition-colors" />
                      </a>
                    )}
                  </div>
                )}
              </motion.div>
            );
          })}
        </div>
      </motion.div>
    </section>
  );
};
