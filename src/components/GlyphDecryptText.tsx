import React, { useState, useEffect, useRef } from 'react';

interface GlyphDecryptTextProps {
  text: string;
  className?: string;
  dotFont?: boolean;
  speed?: number;
  revealDelay?: number;
  triggerOnHover?: boolean;
  onComplete?: () => void;
  as?: 'h1' | 'h2' | 'h3' | 'h4' | 'p' | 'span';
}

const GLYPH_CHARS = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ#%*+-=_/[]';

export const GlyphDecryptText: React.FC<GlyphDecryptTextProps> = ({
  text,
  className = '',
  dotFont = true,
  revealDelay = 40,
  triggerOnHover = false,
  onComplete,
  as: Component = 'span'
}) => {
  const [displayText, setDisplayText] = useState<string>(text);
  const [isAnimating, setIsAnimating] = useState<boolean>(false);
  const elementRef = useRef<HTMLElement | null>(null);
  const rafRef = useRef<number | null>(null);

  const startScramble = () => {
    if (rafRef.current) {
      cancelAnimationFrame(rafRef.current);
      rafRef.current = null;
    }

    setIsAnimating(true);
    const startTime = performance.now();
    // Snappy, attractive fluid scramble duration
    const duration = Math.min(600, Math.max(320, text.length * 28));

    const animate = (currentTime: number) => {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);

      // Left-to-right progressive unscramble
      const lockedCharsCount = Math.floor(progress * text.length);

      const nextText = text
        .split('')
        .map((char, index) => {
          if (char === ' ') return ' ';
          if (index < lockedCharsCount) {
            return text[index];
          }
          return GLYPH_CHARS[Math.floor(Math.random() * GLYPH_CHARS.length)];
        })
        .join('');

      setDisplayText(nextText);

      if (progress < 1) {
        rafRef.current = requestAnimationFrame(animate);
      } else {
        setDisplayText(text);
        setIsAnimating(false);
        rafRef.current = null;
        if (onComplete) onComplete();
      }
    };

    rafRef.current = requestAnimationFrame(animate);
  };

  useEffect(() => {
    const el = elementRef.current;
    if (!el) return;

    let timeoutId: number | null = null;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            timeoutId = window.setTimeout(() => {
              startScramble();
            }, revealDelay);
          } else {
            if (timeoutId) window.clearTimeout(timeoutId);
            if (rafRef.current) {
              cancelAnimationFrame(rafRef.current);
              rafRef.current = null;
            }
            setIsAnimating(false);
            setDisplayText(text);
          }
        });
      },
      {
        threshold: 0.15,
        rootMargin: '0px 0px -25px 0px'
      }
    );

    observer.observe(el);

    return () => {
      observer.disconnect();
      if (timeoutId) window.clearTimeout(timeoutId);
      if (rafRef.current) {
        cancelAnimationFrame(rafRef.current);
        rafRef.current = null;
      }
    };
  }, [text, revealDelay]);

  return (
    <Component
      ref={elementRef as any}
      onMouseEnter={() => {
        if (triggerOnHover && !isAnimating) {
          startScramble();
        }
      }}
      className={`inline-block select-none transition-colors duration-200 ${
        dotFont ? 'font-dot tracking-wider' : ''
      } ${
        isAnimating
          ? 'text-[#00ff66] drop-shadow-[0_0_12px_rgba(0,255,102,0.45)]'
          : 'text-white'
      } ${className}`}
    >
      {displayText}
    </Component>
  );
};
