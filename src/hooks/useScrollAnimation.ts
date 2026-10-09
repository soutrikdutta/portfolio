import { useState, useEffect, useRef } from 'react';
import { useInView } from 'motion/react';

export type ScrollDirection = 'down' | 'up';

/**
 * High-performance hook that tracks scroll direction (down vs up)
 * Synchronized with Lenis when active, with passive scroll event fallback.
 */
export function useScrollDirection(): ScrollDirection {
  const [direction, setDirection] = useState<ScrollDirection>('down');

  useEffect(() => {
    let lastScrollY = window.scrollY;
    let ticking = false;

    // Check if Lenis is active on window
    const lenis = (window as unknown as { __lenis?: { on: (event: string, callback: (e: { direction: number }) => void) => void } }).__lenis;
    if (lenis) {
      lenis.on('scroll', (e) => {
        if (e.direction === 1) {
          setDirection('down');
        } else if (e.direction === -1) {
          setDirection('up');
        }
      });
    }

    const handleScroll = () => {
      if (!ticking) {
        ticking = true;
        window.requestAnimationFrame(() => {
          const currentScrollY = window.scrollY;
          const diff = currentScrollY - lastScrollY;
          if (Math.abs(diff) > 3) {
            setDirection(diff > 0 ? 'down' : 'up');
            lastScrollY = currentScrollY;
          }
          ticking = false;
        });
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return direction;
}

export function useScrollAnimation(amount: number = 0.08) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: false, amount });
  return { ref, isInView };
}

/**
 * Returns directional variants so entering elements slide up on scroll-down
 * and slide down on scroll-up, always matching the user's scroll momentum.
 */
export const getBiDirectionalVariants = (direction: ScrollDirection, offset: number = 24) => ({
  hidden: {
    opacity: 0,
    y: direction === 'down' ? offset : -offset,
    scale: 0.97,
  },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      duration: 0.55,
      ease: [0.16, 1, 0.3, 1] as const,
    },
  },
});
