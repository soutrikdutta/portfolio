import React, { useEffect, useRef } from 'react';

export const ScrollProgressBar: React.FC = () => {
  const barRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let ticking = false;

    const updateBar = () => {
      const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
      if (barRef.current && totalHeight > 0) {
        const progress = Math.min(1, Math.max(0, window.scrollY / totalHeight));
        barRef.current.style.transform = `scaleX(${progress})`;
      }
      ticking = false;
    };

    const handleScroll = () => {
      if (!ticking) {
        ticking = true;
        window.requestAnimationFrame(updateBar);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    updateBar();

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="fixed top-0 left-0 right-0 h-[2px] z-50 pointer-events-none bg-transparent">
      <div
        ref={barRef}
        className="h-full w-full bg-gradient-to-r from-[#00b848]/40 via-[#00b848] to-[#00b848] shadow-[0_0_8px_#00b848] origin-left transform-gpu will-change-transform"
        style={{ transform: 'scaleX(0)' }}
      />
    </div>
  );
};
