import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, ChevronLeft, ChevronRight, ExternalLink, ShieldCheck } from 'lucide-react';

export interface FullscreenLightboxProps {
  isOpen: boolean;
  onClose: () => void;
  images: string[];
  initialIndex?: number;
  title: string;
  subtitle?: string;
  captions?: string[];
  verifyUrl?: string;
  liveUrl?: string;
}

export const FullscreenLightbox: React.FC<FullscreenLightboxProps> = ({
  isOpen,
  onClose,
  images,
  initialIndex = 0,
  title,
  subtitle,
  captions,
  verifyUrl,
  liveUrl
}) => {
  const [currentIndex, setCurrentIndex] = useState(initialIndex);

  useEffect(() => {
    setCurrentIndex(initialIndex);
  }, [initialIndex, isOpen]);

  // Lock background scroll when open and always safely clean up
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      return () => {
        document.body.style.overflow = '';
      };
    } else {
      document.body.style.overflow = '';
    }
  }, [isOpen]);

  // Keyboard navigation & Escape handling
  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        e.preventDefault();
        e.stopPropagation();
        onClose();
      } else if (e.key === 'ArrowRight' && images.length > 1) {
        setCurrentIndex((prev) => (prev + 1) % images.length);
      } else if (e.key === 'ArrowLeft' && images.length > 1) {
        setCurrentIndex((prev) => (prev - 1 + images.length) % images.length);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, images.length, onClose]);

  if (!isOpen || images.length === 0) return null;

  const total = images.length;
  const currentImage = images[currentIndex];
  const currentCaption = captions && captions[currentIndex] ? captions[currentIndex] : null;

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 1) % total);
  };

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev - 1 + total) % total);
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.2 }}
      className="fixed inset-0 z-[9999] bg-black/95 backdrop-blur-2xl flex flex-col justify-between p-3 sm:p-6 select-none"
      onClick={onClose}
    >
      {/* Top Controls Bar */}
      <div
        className="relative z-20 flex items-center justify-between gap-4 py-2 px-3 sm:px-4 rounded-full bg-zinc-950/80 border border-white/10 backdrop-blur-md shrink-0 max-w-5xl mx-auto w-full"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center gap-2 sm:gap-3 min-w-0 flex-1">
          <span className="w-2.5 h-2.5 rounded-full bg-[#00b848] shrink-0" />
          <div className="truncate">
            <h4 className="text-xs sm:text-sm font-bold text-white font-dot tracking-wider truncate">
              {title.toUpperCase()}
            </h4>
            {subtitle && (
              <p className="text-[10px] sm:text-[11px] font-mono text-zinc-400 truncate">
                {subtitle}
              </p>
            )}
          </div>
        </div>

        <div className="flex items-center gap-2 shrink-0">
          {total > 1 && (
            <span className="font-mono text-[11px] text-[#00ff66] bg-[#00b848]/15 px-2.5 py-1 rounded-full border border-[#00b848]/30 font-semibold tracking-wider">
              {currentIndex + 1} / {total}
            </span>
          )}

          <button
            onClick={(e) => {
              e.stopPropagation();
              onClose();
            }}
            className="p-1.5 sm:p-2 rounded-full bg-zinc-900 hover:bg-zinc-800 text-zinc-300 hover:text-white border border-white/15 hover:border-[#00b848]/60 transition-all hover:scale-105 active:scale-95 cursor-pointer shadow-sm hover:shadow-[0_0_12px_rgba(0,184,72,0.3)]"
            aria-label="Close Fullscreen View"
            title="Close (Esc)"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Center Main Viewport: Clean 100% Uncropped View */}
      <div
        className="relative flex-1 min-h-0 flex items-center justify-center my-2 sm:my-4"
        onClick={(e) => e.stopPropagation()}
      >
        <AnimatePresence mode="wait">
          <motion.div
            key={currentIndex}
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.98 }}
            transition={{ duration: 0.18, ease: 'easeOut' }}
            className="relative max-h-full max-w-full flex items-center justify-center p-1"
          >
            <img
              src={currentImage}
              alt={`${title} - View ${currentIndex + 1}`}
              className="max-h-[76vh] max-w-[94vw] object-contain rounded-xl shadow-2xl border border-white/10 bg-zinc-950/60"
              draggable={false}
            />
          </motion.div>
        </AnimatePresence>

        {/* Navigation Arrows for multi-image collections */}
        {total > 1 && (
          <>
            <button
              onClick={(e) => {
                e.stopPropagation();
                prevSlide();
              }}
              className="absolute left-2 sm:left-4 top-1/2 -translate-y-1/2 z-30 w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-black/80 hover:bg-black/95 text-white flex items-center justify-center border border-white/20 backdrop-blur-md transition-all duration-200 hover:scale-110 active:scale-95 cursor-pointer shadow-2xl hover:border-[#00b848]/60 hover:text-[#00ff66]"
              aria-label="Previous Image"
            >
              <ChevronLeft className="w-5 h-5 sm:w-6 sm:h-6" />
            </button>

            <button
              onClick={(e) => {
                e.stopPropagation();
                nextSlide();
              }}
              className="absolute right-2 sm:right-4 top-1/2 -translate-y-1/2 z-30 w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-black/80 hover:bg-black/95 text-white flex items-center justify-center border border-white/20 backdrop-blur-md transition-all duration-200 hover:scale-110 active:scale-95 cursor-pointer shadow-2xl hover:border-[#00b848]/60 hover:text-[#00ff66]"
              aria-label="Next Image"
            >
              <ChevronRight className="w-5 h-5 sm:w-6 sm:h-6" />
            </button>
          </>
        )}
      </div>

      {/* Bottom Bar: Caption & Direct Action Link */}
      <div
        className="relative z-20 flex flex-col sm:flex-row items-center justify-between gap-3 py-2.5 px-4 rounded-2xl bg-zinc-950/80 border border-white/10 backdrop-blur-md shrink-0 max-w-5xl mx-auto w-full"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="text-center sm:text-left flex-1 min-w-0">
          {currentCaption ? (
            <p className="text-xs sm:text-sm font-space text-zinc-200 font-medium truncate">
              {currentCaption}
            </p>
          ) : (
            <p className="text-xs font-mono text-zinc-400">
              Viewing full resolution capture at native 100% aspect ratio
            </p>
          )}
        </div>

        <div className="flex items-center gap-2 shrink-0">
          {verifyUrl && (
            <a
              href={verifyUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-mono text-[#00ff66] bg-[#00b848]/15 hover:bg-[#00b848]/30 border border-[#00b848]/40 transition-all font-medium"
            >
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>Verify Credential</span>
              <ExternalLink className="w-3 h-3" />
            </a>
          )}

          {liveUrl && (
            <a
              href={liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-mono text-white bg-zinc-800 hover:bg-zinc-700 border border-white/20 transition-all font-medium"
            >
              <span>Open Live Demo</span>
              <ExternalLink className="w-3 h-3" />
            </a>
          )}
        </div>
      </div>
    </motion.div>
  );
};
