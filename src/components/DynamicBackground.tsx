import React, { useEffect, useRef } from "react";
import { useReducedMotion } from "framer-motion";

export const DynamicBackground: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const shouldReduceMotion = useReducedMotion();

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationFrameId: number;
    let isDestroyed = false;

    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };

    window.addEventListener("resize", handleResize, { passive: true });

    // Interactive pointer coordinates (mouse & touch)
    let pointerX = width * 0.5;
    let pointerY = height * 0.35;
    let targetPointerX = pointerX;
    let targetPointerY = pointerY;

    // Pointer intensity that brightens on movement/touch and relaxes
    let pointerIntensity = 0.6;
    let targetIntensity = 0.6;

    // Scroll tracking
    let scrollY = window.scrollY;
    let targetScrollY = scrollY;

    const handlePointerMove = (e: PointerEvent) => {
      targetPointerX = e.clientX;
      targetPointerY = e.clientY;
      targetIntensity = 1.0;
    };

    const handleTouchMove = (e: TouchEvent) => {
      if (e.touches.length > 0) {
        targetPointerX = e.touches[0].clientX;
        targetPointerY = e.touches[0].clientY;
        targetIntensity = 1.0;
      }
    };

    const handleTouchStart = (e: TouchEvent) => {
      if (e.touches.length > 0) {
        targetPointerX = e.touches[0].clientX;
        targetPointerY = e.touches[0].clientY;
        pointerX = targetPointerX;
        pointerY = targetPointerY;
        targetIntensity = 1.2;
      }
    };

    const handleScroll = () => {
      targetScrollY = window.scrollY;
      targetIntensity = Math.min(targetIntensity + 0.15, 1.1);
    };

    window.addEventListener("pointermove", handlePointerMove, { passive: true });
    window.addEventListener("touchmove", handleTouchMove, { passive: true });
    window.addEventListener("touchstart", handleTouchStart, { passive: true });
    window.addEventListener("scroll", handleScroll, { passive: true });

    // Calm, slow-drifting dark bluish ambient light centers
    const ambientOrbs = [
      {
        xRatio: 0.25,
        yRatio: 0.2,
        radiusRatio: 0.58,
        vx: 0.15,
        vy: 0.12,
        colorInner: "rgba(32, 74, 156, 0.45)",
        colorOuter: "rgba(7, 18, 36, 0)",
      },
      {
        xRatio: 0.78,
        yRatio: 0.55,
        radiusRatio: 0.52,
        vx: -0.12,
        vy: 0.14,
        colorInner: "rgba(24, 58, 128, 0.40)",
        colorOuter: "rgba(7, 18, 36, 0)",
      },
      {
        xRatio: 0.45,
        yRatio: 0.85,
        radiusRatio: 0.48,
        vx: 0.14,
        vy: -0.11,
        colorInner: "rgba(20, 48, 108, 0.42)",
        colorOuter: "rgba(7, 18, 36, 0)",
      },
      {
        xRatio: 0.85,
        yRatio: 0.15,
        radiusRatio: 0.44,
        vx: -0.1,
        vy: -0.1,
        colorInner: "rgba(42, 98, 198, 0.35)",
        colorOuter: "rgba(7, 18, 36, 0)",
      },
    ];

    // Current positions of ambient orbs
    const orbPositions = ambientOrbs.map((orb) => ({
      x: width * orb.xRatio,
      y: height * orb.yRatio,
      vx: orb.vx,
      vy: orb.vy,
    }));

    let time = 0;

    const render = () => {
      if (isDestroyed) return;

      // Smooth lerp pointer and scroll
      pointerX += (targetPointerX - pointerX) * 0.06;
      pointerY += (targetPointerY - pointerY) * 0.06;
      scrollY += (targetScrollY - scrollY) * 0.08;

      // Smooth decay of pointer activity back to baseline
      targetIntensity = Math.max(0.6, targetIntensity * 0.985);
      pointerIntensity += (targetIntensity - pointerIntensity) * 0.05;

      time += shouldReduceMotion ? 0 : 0.01;

      ctx.clearRect(0, 0, width, height);

      // 1. Deep rich dark-blue base background
      const baseGrad = ctx.createLinearGradient(0, 0, 0, height);
      baseGrad.addColorStop(0, "#071224");    // Deep Midnight Blue
      baseGrad.addColorStop(0.5, "#0b1b36");  // Rich Dark Navy
      baseGrad.addColorStop(1, "#0e2347");    // Deep Ocean Blue
      ctx.fillStyle = baseGrad;
      ctx.fillRect(0, 0, width, height);

      // 2. Render calm, soft drifting dark-blue ambient glow orbs
      ambientOrbs.forEach((orb, i) => {
        const pos = orbPositions[i];

        if (!shouldReduceMotion) {
          pos.x += pos.vx;
          pos.y += pos.vy;

          if (pos.x < width * 0.05 || pos.x > width * 0.95) pos.vx *= -1;
          if (pos.y < height * 0.05 || pos.y > height * 0.95) pos.vy *= -1;
        }

        // Slight scroll parallax
        const scrollShift = (scrollY * (0.05 + i * 0.02)) % height;
        const renderY = (pos.y - scrollShift + height) % height;
        const radius = Math.max(width, height) * orb.radiusRatio;

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

      // 3. Interactive Mouse / Touch Reactive Dark-Bluish Spotlight
      const spotlightRadius = Math.min(width, height) * (0.42 + pointerIntensity * 0.08);

      const spotlight = ctx.createRadialGradient(
        pointerX,
        pointerY,
        0,
        pointerX,
        pointerY,
        spotlightRadius
      );

      const coreAlpha = 0.24 * pointerIntensity;
      const midAlpha = 0.14 * pointerIntensity;

      // Soft, vibrant dark-blue and light-blue interactive luminance
      spotlight.addColorStop(0, `rgba(56, 189, 248, ${coreAlpha})`);   // glowing cyan-blue
      spotlight.addColorStop(0.35, `rgba(37, 99, 235, ${midAlpha})`);  // rich electric royal blue
      spotlight.addColorStop(0.7, `rgba(20, 50, 110, ${midAlpha * 0.5})`);
      spotlight.addColorStop(1, "rgba(7, 18, 36, 0)");

      ctx.fillStyle = spotlight;
      ctx.fillRect(0, 0, width, height);

      // 4. Clean outer edge vignette to focus content
      const vignette = ctx.createRadialGradient(
        width * 0.5,
        height * 0.5,
        Math.min(width, height) * 0.48,
        width * 0.5,
        height * 0.5,
        Math.max(width, height) * 0.85
      );
      vignette.addColorStop(0, "rgba(7, 18, 36, 0)");
      vignette.addColorStop(1, "rgba(4, 10, 22, 0.42)");
      ctx.fillStyle = vignette;
      ctx.fillRect(0, 0, width, height);

      if (!shouldReduceMotion) {
        animationFrameId = requestAnimationFrame(render);
      }
    };

    render();

    return () => {
      isDestroyed = true;
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("pointermove", handlePointerMove);
      window.removeEventListener("touchmove", handleTouchMove);
      window.removeEventListener("touchstart", handleTouchStart);
      window.removeEventListener("scroll", handleScroll);
    };
  }, [shouldReduceMotion]);

  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden" aria-hidden="true">
      {/* Clean, simple dark-bluish dynamic canvas */}
      <canvas ref={canvasRef} className="absolute inset-0 w-full h-full block" />

      {/* Subtle fine architectural mesh overlay for tactile depth */}
      <div className="absolute inset-0 ambient-pattern opacity-25 mix-blend-overlay pointer-events-none" />
    </div>
  );
};
