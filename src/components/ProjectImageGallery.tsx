import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ChevronLeft, ChevronRight, Maximize2 } from 'lucide-react';

interface ProjectImageGalleryProps {
  images: string[];
  captions?: string[];
  title: string;
  onOpenLightbox?: (index: number) => void;
  className?: string;
  imageFit?: 'cover' | 'contain';
  aspectClass?: string;
  initialIndex?: number;
}

export const ProjectImageGallery: React.FC<ProjectImageGalleryProps> = ({
  images,
  captions,
  title,
  onOpenLightbox,
  className = '',
  imageFit = 'contain',
  aspectClass = 'aspect-[16/10]',
  initialIndex = 0,
}) => {
  const [currentIndex, setCurrentIndex] = useState(initialIndex);

  useEffect(() => {
    setCurrentIndex(initialIndex);
  }, [initialIndex]);

  const total = images.length;

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 1) % total);
  };

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev - 1 + total) % total);
  };

  // Touch swipe handling with vertical scroll preservation
  const touchStartX = useRef<number | null>(null);
  const touchStartY = useRef<number | null>(null);
  const isDragging = useRef(false);

  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
    touchStartY.current = e.touches[0].clientY;
    isDragging.current = false;
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (touchStartX.current === null || touchStartY.current === null) return;
    const dx = e.touches[0].clientX - touchStartX.current;
    const dy = e.touches[0].clientY - touchStartY.current;
    if (Math.hypot(dx, dy) > 8) {
      isDragging.current = true;
    }
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (touchStartX.current === null || touchStartY.current === null) return;
    const deltaX = e.changedTouches[0].clientX - touchStartX.current;
    const deltaY = e.changedTouches[0].clientY - touchStartY.current;

    // Horizontal swipe threshold: 35px, and must be predominantly horizontal
    if (Math.abs(deltaX) > 35 && Math.abs(deltaX) > Math.abs(deltaY)) {
      if (deltaX < 0) {
        nextSlide();
      } else {
        prevSlide();
      }
    }

    touchStartX.current = null;
    touchStartY.current = null;
    setTimeout(() => {
      isDragging.current = false;
    }, 50);
  };

  const handleImageClick = () => {
    // Only open lightbox if it was an intentional stationary tap, NOT a swipe or vertical scroll
    if (!isDragging.current) {
      onOpenLightbox?.(currentIndex);
    }
  };

  const slug = title.toLowerCase().replace(/[^a-z0-9]/g, '');

  return (
    <div
      className={`relative w-full ${aspectClass} bg-[#070908] rounded-xl overflow-hidden border border-white/10 group select-none shadow-[0_4px_30px_rgba(0,184,72,0.06)] flex flex-col ${className}`}
      style={{ touchAction: 'pan-y' }}
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
    >
      {/* Top OS Window Header Bar */}
      <div className="relative z-20 flex items-center justify-between px-2.5 sm:px-3.5 py-1.5 sm:py-2 bg-black/90 border-b border-white/10 backdrop-blur-md gap-2 shrink-0">
        <div className="flex items-center gap-1.5 min-w-0 flex-1">
          <span className="w-2 h-2 sm:w-2.5 sm:h-2.5 rounded-full bg-[#ef4444]/90 shrink-0" />
          <span className="w-2 h-2 sm:w-2.5 sm:h-2.5 rounded-full bg-[#eab308]/90 shrink-0" />
          <span className="w-2 h-2 sm:w-2.5 sm:h-2.5 rounded-full bg-[#00b848]/90 shrink-0" />
          <span className="text-[10px] sm:text-[11px] font-mono text-zinc-300 ml-1 sm:ml-2 tracking-wide font-medium truncate">
            {slug}.preview // {String(currentIndex + 1).padStart(2, '0')}
          </span>
        </div>

        <div className="flex items-center gap-1.5 sm:gap-2 shrink-0">
          {/* Slide Indicator Badge */}
          <span className="font-mono text-[10px] text-[#00b848] bg-[#00b848]/15 px-2 sm:px-2.5 py-0.5 rounded-full border border-[#00b848]/30 font-semibold tracking-wider whitespace-nowrap shrink-0">
            {currentIndex + 1} / {total}
          </span>

          {onOpenLightbox && (
            <button
              onClick={(e) => {
                e.stopPropagation();
                onOpenLightbox(currentIndex);
              }}
              onTouchStart={(e) => e.stopPropagation()}
              onTouchEnd={(e) => {
                e.preventDefault();
                e.stopPropagation();
                onOpenLightbox(currentIndex);
              }}
              className="p-1 sm:p-1.5 rounded-full text-zinc-300 hover:text-white hover:bg-white/10 transition-all hover:scale-110 active:scale-90 cursor-pointer shrink-0"
              title="Expand Fullscreen"
              aria-label="Expand image"
            >
              <Maximize2 className="w-3.5 h-3.5 text-zinc-300" />
            </button>
          )}
        </div>
      </div>

      {/* Main Image Viewport with Smooth Crossfade */}
      <div className="relative w-full flex-1 min-h-0 overflow-hidden bg-[#050706] flex items-center justify-center">
        <AnimatePresence mode="wait">
          <motion.img
            key={currentIndex}
            src={images[currentIndex]}
            alt={`${title} - Slide ${currentIndex + 1}`}
            initial={{ opacity: 0, scale: 1.01 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25, ease: 'easeOut' }}
            className={`w-full h-full cursor-pointer select-none ${
              imageFit === 'contain'
                ? 'object-contain p-2 max-h-full max-w-full'
                : 'object-cover object-top'
            }`}
            onClick={handleImageClick}
            draggable={false}
          />
        </AnimatePresence>

        {/* Ambient Subtle Glow at edges */}
        <div className="pointer-events-none absolute inset-0 shadow-[inset_0_0_30px_rgba(0,0,0,0.6)]" />

        {/* Caption bar */}
        {captions && captions[currentIndex] && (
          <div className="pointer-events-none absolute inset-x-0 bottom-0 z-20 px-3 py-1.5 bg-gradient-to-t from-black/90 via-black/50 to-transparent">
            <p className="text-[10px] sm:text-[11px] font-mono text-zinc-300 truncate text-center">
              {captions[currentIndex]}
            </p>
          </div>
        )}

        {/* Navigation Arrows: larger, comfortable touch targets on mobile */}
        {total > 1 && (
          <>
            <button
              onClick={(e) => {
                e.stopPropagation();
                prevSlide();
              }}
              onTouchStart={(e) => e.stopPropagation()}
              onTouchEnd={(e) => {
                e.preventDefault();
                e.stopPropagation();
                prevSlide();
              }}
              className="absolute left-2 top-1/2 -translate-y-1/2 z-30 w-8 h-8 sm:w-7 sm:h-7 rounded-full bg-black/80 hover:bg-black/95 text-white flex items-center justify-center border border-white/20 backdrop-blur-md opacity-90 sm:opacity-0 sm:group-hover:opacity-100 transition-all duration-200 active:scale-90 cursor-pointer shadow-lg"
              aria-label="Previous screenshot"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>

            <button
              onClick={(e) => {
                e.stopPropagation();
                nextSlide();
              }}
              onTouchStart={(e) => e.stopPropagation()}
              onTouchEnd={(e) => {
                e.preventDefault();
                e.stopPropagation();
                nextSlide();
              }}
              className="absolute right-2 top-1/2 -translate-y-1/2 z-30 w-8 h-8 sm:w-7 sm:h-7 rounded-full bg-black/80 hover:bg-black/95 text-white flex items-center justify-center border border-white/20 backdrop-blur-md opacity-90 sm:opacity-0 sm:group-hover:opacity-100 transition-all duration-200 active:scale-90 cursor-pointer shadow-lg"
              aria-label="Next screenshot"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </>
        )}
      </div>
    </div>
  );
};
