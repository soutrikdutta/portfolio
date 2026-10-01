import React, { useEffect, useRef, useCallback, useState } from 'react';

export const CustomCursor: React.FC = () => {
  const [enabled, setEnabled] = useState(false);

  const dotRef = useRef<HTMLDivElement>(null);
  const followerRef = useRef<HTMLDivElement>(null);
  const rippleContainerRef = useRef<HTMLDivElement>(null);

  const mouse = useRef({ x: -100, y: -100 });
  const follower = useRef({ x: -100, y: -100 });
  const visible = useRef(false);
  const isHovered = useRef(false);
  const isClicking = useRef(false);
  const rafId = useRef<number>(0);
  const lastCheckTime = useRef<number>(0);

  useEffect(() => {
    // Only enable on desktop fine pointer devices
    if (typeof window !== 'undefined' && window.matchMedia && window.matchMedia('(pointer: fine)').matches) {
      setEnabled(true);
    }
  }, []);

  const animate = useCallback(() => {
    const dx = mouse.current.x - follower.current.x;
    const dy = mouse.current.y - follower.current.y;

    if (Math.abs(dx) > 0.05 || Math.abs(dy) > 0.05) {
      follower.current.x += dx * 0.9;
      follower.current.y += dy * 0.9;

      if (followerRef.current) {
        const scale = isClicking.current ? 0.75 : isHovered.current ? 1.3 : 1.0;
        followerRef.current.style.transform = `translate3d(${follower.current.x}px, ${follower.current.y}px, 0) scale(${scale})`;
      }
    }

    rafId.current = requestAnimationFrame(animate);
  }, []);

  useEffect(() => {
    if (!enabled) return;

    document.documentElement.classList.add('custom-cursor-enabled');

    const onMove = (e: MouseEvent) => {
      mouse.current.x = e.clientX;
      mouse.current.y = e.clientY;

      if (dotRef.current) {
        dotRef.current.style.transform = `translate3d(${e.clientX}px, ${e.clientY}px, 0)`;
      }

      if (!visible.current) {
        visible.current = true;
        if (dotRef.current) dotRef.current.style.opacity = '1';
        if (followerRef.current) followerRef.current.style.opacity = '1';
      }

      // Throttled interactive element check (at most once every 60ms)
      const now = performance.now();
      if (now - lastCheckTime.current > 60) {
        lastCheckTime.current = now;
        const target = e.target as HTMLElement | null;
        if (target) {
          const hovered = !!target.closest(
            'a, button, [role="button"], input, textarea, select, .cursor-pointer, .interactive-hover'
          );
          if (hovered !== isHovered.current) {
            isHovered.current = hovered;
            if (followerRef.current) {
              followerRef.current.style.borderColor = hovered
                ? 'rgba(0, 184, 72, 0.6)'
                : 'rgba(255, 255, 255, 0.35)';
            }
          }
        }
      }
    };

    const onDown = (e: MouseEvent) => {
      isClicking.current = true;
      if (rippleContainerRef.current) {
        const ripple = document.createElement('span');
        ripple.style.cssText = `
          position: fixed;
          left: ${e.clientX}px;
          top: ${e.clientY}px;
          width: 0;
          height: 0;
          border-radius: 50%;
          border: 1px solid rgba(0, 184, 72, 0.6);
          transform: translate(-50%, -50%);
          pointer-events: none;
          z-index: 100000;
          animation: quick-ripple 0.25s cubic-bezier(0.16, 1, 0.3, 1) forwards;
        `;
        rippleContainerRef.current.appendChild(ripple);
        ripple.addEventListener('animationend', () => ripple.remove());
      }
    };

    const onUp = () => {
      isClicking.current = false;
    };

    const onLeave = () => {
      visible.current = false;
      if (dotRef.current) dotRef.current.style.opacity = '0';
      if (followerRef.current) followerRef.current.style.opacity = '0';
    };

    const onEnter = () => {
      visible.current = true;
      if (dotRef.current) dotRef.current.style.opacity = '1';
      if (followerRef.current) followerRef.current.style.opacity = '1';
    };

    window.addEventListener('mousemove', onMove, { passive: true });
    window.addEventListener('mousedown', onDown, { passive: true });
    window.addEventListener('mouseup', onUp, { passive: true });
    document.addEventListener('mouseleave', handleMouseLeave);
    document.addEventListener('mouseenter', handleMouseEnter);

    function handleMouseLeave() { onLeave(); }
    function handleMouseEnter() { onEnter(); }

    rafId.current = requestAnimationFrame(animate);

    return () => {
      window.removeEventListener('mousemove', onMove);
      window.removeEventListener('mousedown', onDown);
      window.removeEventListener('mouseup', onUp);
      document.removeEventListener('mouseleave', handleMouseLeave);
      document.removeEventListener('mouseenter', handleMouseEnter);
      cancelAnimationFrame(rafId.current);
      document.documentElement.classList.remove('custom-cursor-enabled');
    };
  }, [enabled, animate]);

  if (!enabled) return null;

  return (
    <>
      {/* Precision Dot — 0ms lag, centered via -ml-[3px] -mt-[3px] */}
      <div
        ref={dotRef}
        className="fixed top-0 left-0 pointer-events-none z-[100002] w-1.5 h-1.5 -ml-[3px] -mt-[3px] rounded-full bg-white transition-opacity duration-150 transform-gpu will-change-transform"
        style={{ opacity: 0 }}
      />

      {/* Follower Reticle */}
      <div
        ref={followerRef}
        className="fixed top-0 left-0 pointer-events-none z-[100001] w-7 h-7 -ml-3.5 -mt-3.5 rounded-full border bg-transparent transition-opacity duration-150 transform-gpu will-change-transform"
        style={{
          opacity: 0,
          borderColor: 'rgba(255, 255, 255, 0.35)'
        }}
      />

      {/* Click ripple container */}
      <div ref={rippleContainerRef} className="pointer-events-none fixed inset-0 z-[100000]" />
    </>
  );
};
