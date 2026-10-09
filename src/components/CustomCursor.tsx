import React, { useEffect, useRef, useState } from 'react';

export const CustomCursor: React.FC = () => {
  const [enabled, setEnabled] = useState(false);
  const dotRef      = useRef<HTMLDivElement>(null);
  const ringRef     = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (window.matchMedia?.('(pointer: fine)').matches) setEnabled(true);
  }, []);

  useEffect(() => {
    if (!enabled) return;

    document.documentElement.classList.add('custom-cursor-enabled');

    // Raw cursor position — updated immediately on mousemove (no lerp)
    let mx = -200, my = -200;
    // Follower position — lerped in RAF
    let fx = -200, fy = -200;
    let rafId = 0;
    let hovering = false;
    let clicking = false;
    let visible = false;

    const dot  = dotRef.current!;
    const ring = ringRef.current!;

    function onMove(e: MouseEvent) {
      mx = e.clientX;
      my = e.clientY;

      // Dot is zero-lag — move immediately via direct style
      dot.style.transform = `translate3d(${mx}px,${my}px,0)`;

      if (!visible) {
        visible = true;
        dot.style.opacity  = '1';
        ring.style.opacity = '1';
      }

      // Check interactive target (cheap: only test nodeName + classList)
      const el = e.target as Element | null;
      const h = !!(el?.closest('a,button,[role="button"],input,textarea,select,.cursor-pointer'));
      if (h !== hovering) {
        hovering = h;
        ring.style.borderColor = h
          ? 'rgba(0,255,102,0.65)'
          : 'rgba(255,255,255,0.30)';
        ring.style.width  = h ? '36px' : '28px';
        ring.style.height = h ? '36px' : '28px';
        ring.style.marginLeft = h ? '-18px' : '-14px';
        ring.style.marginTop  = h ? '-18px' : '-14px';
      }
    }

    function onDown() {
      clicking = true;
      dot.style.transform  = `translate3d(${mx}px,${my}px,0) scale(0.55)`;
      ring.style.transform = `translate3d(${fx}px,${fy}px,0) scale(0.8)`;
    }

    function onUp() {
      clicking = false;
      dot.style.transform = `translate3d(${mx}px,${my}px,0)`;
    }

    function onLeave() {
      visible = false;
      dot.style.opacity  = '0';
      ring.style.opacity = '0';
    }

    function onEnter() {
      visible = true;
      dot.style.opacity  = '1';
      ring.style.opacity = '1';
    }

    // Ring follows with smooth lerp — LERP factor 0.18 = smooth but responsive
    function tick() {
      const dx = mx - fx;
      const dy = my - fy;
      if (Math.abs(dx) > 0.3 || Math.abs(dy) > 0.3) {
        fx += dx * 0.18;
        fy += dy * 0.18;
        ring.style.transform = `translate3d(${fx}px,${fy}px,0)`;
      }
      rafId = requestAnimationFrame(tick);
    }

    window.addEventListener('mousemove',  onMove,  { passive: true });
    window.addEventListener('mousedown',  onDown,  { passive: true });
    window.addEventListener('mouseup',    onUp,    { passive: true });
    document.addEventListener('mouseleave', onLeave);
    document.addEventListener('mouseenter', onEnter);
    rafId = requestAnimationFrame(tick);

    return () => {
      cancelAnimationFrame(rafId);
      window.removeEventListener('mousemove',  onMove);
      window.removeEventListener('mousedown',  onDown);
      window.removeEventListener('mouseup',    onUp);
      document.removeEventListener('mouseleave', onLeave);
      document.removeEventListener('mouseenter', onEnter);
      document.documentElement.classList.remove('custom-cursor-enabled');
    };
  }, [enabled]);

  if (!enabled) return null;

  return (
    <>
      {/* Precision dot — zero lag, direct transform on mousemove */}
      <div
        ref={dotRef}
        style={{
          position: 'fixed', top: 0, left: 0,
          width: 6, height: 6,
          marginLeft: -3, marginTop: -3,
          borderRadius: '50%',
          background: '#ffffff',
          pointerEvents: 'none',
          zIndex: 100002,
          opacity: 0,
          willChange: 'transform',
          transition: 'opacity 0.15s',
        }}
      />

      {/* Smooth follower ring */}
      <div
        ref={ringRef}
        style={{
          position: 'fixed', top: 0, left: 0,
          width: 28, height: 28,
          marginLeft: -14, marginTop: -14,
          borderRadius: '50%',
          border: '1px solid rgba(255,255,255,0.30)',
          background: 'transparent',
          pointerEvents: 'none',
          zIndex: 100001,
          opacity: 0,
          willChange: 'transform',
          transition: 'opacity 0.15s, border-color 0.2s, width 0.2s, height 0.2s, margin 0.2s',
        }}
      />
    </>
  );
};
