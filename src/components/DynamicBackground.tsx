import React, { useEffect, useRef } from "react";
import { useReducedMotion } from "framer-motion";

export const DynamicBackground: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const shouldReduceMotion = useReducedMotion();

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d", { alpha: false });
    if (!ctx) return;

    let animationFrameId: number;
    let isDestroyed = false;

    let isMobile = window.innerWidth < 768;
    // On mobile, render at half-resolution scaled with CSS for 4x faster fill-rate
    const renderScale = isMobile ? 0.5 : 1;
    let width = (canvas.width = Math.max(1, Math.round(window.innerWidth * renderScale)));
    let height = (canvas.height = Math.max(1, Math.round(window.innerHeight * renderScale)));

    const handleResize = () => {
      if (!canvas) return;
      isMobile = window.innerWidth < 768;
      const scale = isMobile ? 0.5 : 1;
      width = canvas.width = Math.max(1, Math.round(window.innerWidth * scale));
      height = canvas.height = Math.max(1, Math.round(window.innerHeight * scale));
    };

    window.addEventListener("resize", handleResize, { passive: true });

    // Interactive pointer coordinates (desktop only)
    let pointerX = width * 0.5;
    let pointerY = height * 0.35;
    let targetPointerX = pointerX;
    let targetPointerY = pointerY;
    let pointerActivity = 0.8;
    let targetActivity = 0.8;

    // Scroll tracking & kinetic energy
    let scrollY = window.scrollY;
    let targetScrollY = scrollY;
    let lastScrollY = scrollY;
    let scrollEnergy = 0;
    let isScrolling = false;
    let scrollTimeout: ReturnType<typeof setTimeout> | null = null;

    const handlePointerMove = (e: PointerEvent) => {
      if (isMobile) return;
      targetPointerX = e.clientX * renderScale;
      targetPointerY = e.clientY * renderScale;
      targetActivity = 1.4;
    };

    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      const delta = Math.abs(currentScrollY - lastScrollY);
      lastScrollY = currentScrollY;
      targetScrollY = currentScrollY;

      // On mobile, pause canvas repaints while user's thumb is actively scrolling
      if (isMobile) {
        isScrolling = true;
        if (scrollTimeout) clearTimeout(scrollTimeout);
        scrollTimeout = setTimeout(() => {
          isScrolling = false;
        }, 100);
      } else {
        scrollEnergy = Math.min(scrollEnergy + delta * 0.05, 1.8);
        targetActivity = Math.min(targetActivity + 0.2, 1.6);
      }
    };

    if (!isMobile) {
      window.addEventListener("pointermove", handlePointerMove, { passive: true });
    }
    window.addEventListener("scroll", handleScroll, { passive: true });

    // Slow-drifting deep dark-bluish ambient orbs
    const ambientOrbs = [
      {
        xRatio: 0.22,
        yRatio: 0.25,
        radiusRatio: 0.65,
        vx: 0.18,
        vy: 0.14,
        parallax: 0.22,
        colorInner: "rgba(22, 52, 112, 0.32)",
        colorOuter: "rgba(2, 5, 11, 0)",
      },
      {
        xRatio: 0.78,
        yRatio: 0.55,
        radiusRatio: 0.58,
        vx: -0.15,
        vy: 0.16,
        parallax: 0.30,
        colorInner: "rgba(28, 64, 138, 0.28)",
        colorOuter: "rgba(2, 5, 11, 0)",
      },
      {
        xRatio: 0.42,
        yRatio: 0.85,
        radiusRatio: 0.54,
        vx: 0.16,
        vy: -0.14,
        parallax: 0.18,
        colorInner: "rgba(18, 42, 92, 0.30)",
        colorOuter: "rgba(2, 5, 11, 0)",
      },
      {
        xRatio: 0.82,
        yRatio: 0.18,
        radiusRatio: 0.48,
        vx: -0.12,
        vy: -0.12,
        parallax: 0.26,
        colorInner: "rgba(32, 76, 160, 0.26)",
        colorOuter: "rgba(2, 5, 11, 0)",
      },
    ];

    const orbPositions = ambientOrbs.map((orb) => ({
      x: width * orb.xRatio,
      y: height * orb.yRatio,
      vx: orb.vx,
      vy: orb.vy,
    }));

    let lastFrameTime = 0;
    const targetFPS = isMobile ? 30 : 60;
    const frameInterval = 1000 / targetFPS;

    const render = (currentTime: number) => {
      if (isDestroyed) return;

      // Skip render if page is hidden in background tab
      if (document.hidden) {
        animationFrameId = requestAnimationFrame(render);
        return;
      }

      // During active mobile scroll, yield 100% of GPU/CPU to smooth browser scrolling
      if (isMobile && isScrolling) {
        animationFrameId = requestAnimationFrame(render);
        return;
      }

      // Throttle frame rate on mobile to preserve battery & GPU fill rate
      const elapsed = currentTime - lastFrameTime;
      if (elapsed < frameInterval && lastFrameTime !== 0) {
        animationFrameId = requestAnimationFrame(render);
        return;
      }
      lastFrameTime = currentTime - (elapsed % frameInterval);

      // Smooth lerp pointer and scroll
      if (!isMobile) {
        pointerX += (targetPointerX - pointerX) * 0.08;
        pointerY += (targetPointerY - pointerY) * 0.08;
        targetActivity = Math.max(0.8, targetActivity * 0.98);
        pointerActivity += (targetActivity - pointerActivity) * 0.06;
        scrollEnergy *= 0.92;
      }
      scrollY += (targetScrollY - scrollY) * 0.08;

      ctx.clearRect(0, 0, width, height);

      // 1. Deep stealth dark-blue base background
      const baseGrad = ctx.createLinearGradient(0, 0, 0, height);
      baseGrad.addColorStop(0, "#02050b");
      baseGrad.addColorStop(0.5, "#040813");
      baseGrad.addColorStop(1, "#060b17");
      ctx.fillStyle = baseGrad;
      ctx.fillRect(0, 0, width, height);

      // 2. Render ambient dark-blue orbs
      const activeOrbs = isMobile ? ambientOrbs.slice(0, 2) : ambientOrbs;
      activeOrbs.forEach((orb, i) => {
        const pos = orbPositions[i];

        if (!shouldReduceMotion) {
          pos.x += pos.vx;
          pos.y += pos.vy;

          if (pos.x < width * 0.02 || pos.x > width * 0.98) pos.vx *= -1;
          if (pos.y < height * 0.02 || pos.y > height * 0.98) pos.vy *= -1;
        }

        const scrollOffset = (scrollY * orb.parallax * renderScale) % (height * 1.5);
        const renderY = (pos.y - scrollOffset + height * 1.5) % height;

        const dynamicBoost = 1.0 + scrollEnergy * 0.25;
        const radius = Math.max(width, height) * orb.radiusRatio * dynamicBoost;

        const orbGrad = ctx.createRadialGradient(
          pos.x,
          renderY,
          0,
          pos.x,
          renderY,
          radius
        );
        orbGrad.addColorStop(0, orb.colorInner);
        orbGrad.addColorStop(1, orb.colorOuter);

        ctx.fillStyle = orbGrad;
        ctx.fillRect(0, 0, width, height);
      });

      // 3. Desktop Interactive Cursor Spotlight & Fine Grid
      if (!isMobile) {
        const spotlightRadius = Math.min(width, height) * (0.40 + pointerActivity * 0.08);
        const spotlight = ctx.createRadialGradient(
          pointerX,
          pointerY,
          0,
          pointerX,
          pointerY,
          spotlightRadius
        );

        const coreAlpha = 0.28 * pointerActivity;
        const midAlpha = 0.16 * pointerActivity;
        const outerAlpha = 0.08 * pointerActivity;

        spotlight.addColorStop(0, `rgba(56, 189, 248, ${coreAlpha})`);
        spotlight.addColorStop(0.28, `rgba(37, 99, 235, ${midAlpha})`);
        spotlight.addColorStop(0.60, `rgba(18, 48, 108, ${outerAlpha})`);
        spotlight.addColorStop(1, "rgba(2, 5, 11, 0)");

        ctx.fillStyle = spotlight;
        ctx.fillRect(0, 0, width, height);

        // 4. Subtle Fine Geometric Grid Illuminated around Cursor
        const gridSize = 56;
        const gridRadius = 320;
        const minGridX = Math.max(0, Math.floor((pointerX - gridRadius) / gridSize) * gridSize);
        const maxGridX = Math.min(width, Math.ceil((pointerX + gridRadius) / gridSize) * gridSize);
        const minGridY = Math.max(0, Math.floor((pointerY - gridRadius) / gridSize) * gridSize);
        const maxGridY = Math.min(height, Math.ceil((pointerY + gridRadius) / gridSize) * gridSize);

        for (let x = minGridX; x <= maxGridX; x += gridSize) {
          const dx = Math.abs(x - pointerX);
          if (dx < gridRadius) {
            const alpha = (1 - dx / gridRadius) * 0.09 * pointerActivity;
            ctx.strokeStyle = `rgba(56, 189, 248, ${alpha})`;
            ctx.lineWidth = 1;
            ctx.beginPath();
            ctx.moveTo(x, Math.max(0, pointerY - gridRadius));
            ctx.lineTo(x, Math.min(height, pointerY + gridRadius));
            ctx.stroke();
          }
        }

        for (let y = minGridY; y <= maxGridY; y += gridSize) {
          const dy = Math.abs(y - pointerY);
          if (dy < gridRadius) {
            const alpha = (1 - dy / gridRadius) * 0.09 * pointerActivity;
            ctx.strokeStyle = `rgba(56, 189, 248, ${alpha})`;
            ctx.lineWidth = 1;
            ctx.beginPath();
            ctx.moveTo(Math.max(0, pointerX - gridRadius), y);
            ctx.lineTo(Math.min(width, pointerX + gridRadius), y);
            ctx.stroke();
          }
        }
      }

      // 5. Deep edge vignette preserving content focus
      const vignette = ctx.createRadialGradient(
        width * 0.5,
        height * 0.5,
        Math.min(width, height) * 0.45,
        width * 0.5,
        height * 0.5,
        Math.max(width, height) * 0.85
      );
      vignette.addColorStop(0, "rgba(2, 5, 11, 0)");
      vignette.addColorStop(1, "rgba(1, 3, 6, 0.65)");
      ctx.fillStyle = vignette;
      ctx.fillRect(0, 0, width, height);

      if (!shouldReduceMotion) {
        animationFrameId = requestAnimationFrame(render);
      }
    };

    animationFrameId = requestAnimationFrame(render);

    return () => {
      isDestroyed = true;
      cancelAnimationFrame(animationFrameId);
      if (scrollTimeout) clearTimeout(scrollTimeout);
      window.removeEventListener("resize", handleResize);
      if (!isMobile) {
        window.removeEventListener("pointermove", handlePointerMove);
      }
      window.removeEventListener("scroll", handleScroll);
    };
  }, [shouldReduceMotion]);

  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden hardware-accelerated" aria-hidden="true">
      {/* Clean, noticeably interactive dark-bluish canvas */}
      <canvas ref={canvasRef} className="absolute inset-0 w-full h-full block" />

      {/* Ambient pattern overlay */}
      <div className="absolute inset-0 ambient-pattern opacity-20 mix-blend-overlay pointer-events-none" />
    </div>
  );
};
