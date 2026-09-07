import React, { useEffect, useRef } from "react";
import { useReducedMotion } from "framer-motion";

interface StardustParticle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  life: number;
  maxLife: number;
  size: number;
  alpha: number;
}

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
    let lastPointerX = pointerX;
    let lastPointerY = pointerY;

    // Pointer activity that surges on movement and relaxes
    let pointerActivity = 0.8;
    let targetActivity = 0.8;

    // Scroll tracking & kinetic scroll energy
    let scrollY = window.scrollY;
    let targetScrollY = scrollY;
    let lastScrollY = scrollY;
    let scrollEnergy = 0;

    // Floating particles pool
    const particles: StardustParticle[] = [];
    let lastSpawnTime = 0;

    const spawnParticles = (x: number, y: number, count = 2) => {
      if (particles.length > 40) particles.splice(0, count);
      for (let i = 0; i < count; i++) {
        const angle = Math.random() * Math.PI * 2;
        const speed = Math.random() * 1.5 + 0.4;
        particles.push({
          x: x + (Math.random() - 0.5) * 15,
          y: y + (Math.random() - 0.5) * 15,
          vx: Math.cos(angle) * speed,
          vy: Math.sin(angle) * speed - 0.3,
          life: 1.0,
          maxLife: Math.random() * 30 + 25,
          size: Math.random() * 2.5 + 1.2,
          alpha: Math.random() * 0.5 + 0.3,
        });
      }
    };

    const handlePointerMove = (e: PointerEvent) => {
      targetPointerX = e.clientX;
      targetPointerY = e.clientY;
      targetActivity = 1.4;

      const dist = Math.hypot(e.clientX - lastPointerX, e.clientY - lastPointerY);
      const now = performance.now();
      if (dist > 15 && now - lastSpawnTime > 40) {
        lastSpawnTime = now;
        spawnParticles(e.clientX, e.clientY, 1);
        lastPointerX = e.clientX;
        lastPointerY = e.clientY;
      }
    };

    const handleTouchMove = (e: TouchEvent) => {
      if (e.touches.length > 0) {
        const touch = e.touches[0];
        targetPointerX = touch.clientX;
        targetPointerY = touch.clientY;
        targetActivity = 1.5;

        const dist = Math.hypot(touch.clientX - lastPointerX, touch.clientY - lastPointerY);
        const now = performance.now();
        if (dist > 12 && now - lastSpawnTime > 35) {
          lastSpawnTime = now;
          spawnParticles(touch.clientX, touch.clientY, 2);
          lastPointerX = touch.clientX;
          lastPointerY = touch.clientY;
        }
      }
    };

    const handleTouchStart = (e: TouchEvent) => {
      if (e.touches.length > 0) {
        const touch = e.touches[0];
        targetPointerX = touch.clientX;
        targetPointerY = touch.clientY;
        pointerX = targetPointerX;
        pointerY = targetPointerY;
        targetActivity = 1.6;
        spawnParticles(touch.clientX, touch.clientY, 4);
      }
    };

    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      const delta = Math.abs(currentScrollY - lastScrollY);
      lastScrollY = currentScrollY;
      targetScrollY = currentScrollY;

      // Noticeably inject energy on scroll
      scrollEnergy = Math.min(scrollEnergy + delta * 0.05, 1.8);
      targetActivity = Math.min(targetActivity + 0.2, 1.6);
    };

    window.addEventListener("pointermove", handlePointerMove, { passive: true });
    window.addEventListener("touchmove", handleTouchMove, { passive: true });
    window.addEventListener("touchstart", handleTouchStart, { passive: true });
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

    let time = 0;

    const render = () => {
      if (isDestroyed) return;

      // Smooth lerp pointer and scroll
      pointerX += (targetPointerX - pointerX) * 0.08;
      pointerY += (targetPointerY - pointerY) * 0.08;
      scrollY += (targetScrollY - scrollY) * 0.08;

      // Smooth decay of activity & scroll energy
      targetActivity = Math.max(0.8, targetActivity * 0.98);
      pointerActivity += (targetActivity - pointerActivity) * 0.06;
      scrollEnergy *= 0.92;

      time += shouldReduceMotion ? 0 : 0.012;

      ctx.clearRect(0, 0, width, height);

      // 1. Deep stealth dark-blue base background
      const baseGrad = ctx.createLinearGradient(0, 0, 0, height);
      baseGrad.addColorStop(0, "#02050b");
      baseGrad.addColorStop(0.5, "#040813");
      baseGrad.addColorStop(1, "#060b17");
      ctx.fillStyle = baseGrad;
      ctx.fillRect(0, 0, width, height);

      // 2. Render ambient dark-blue orbs with noticeable scroll parallax
      ambientOrbs.forEach((orb, i) => {
        const pos = orbPositions[i];

        if (!shouldReduceMotion) {
          pos.x += pos.vx;
          pos.y += pos.vy;

          if (pos.x < width * 0.02 || pos.x > width * 0.98) pos.vx *= -1;
          if (pos.y < height * 0.02 || pos.y > height * 0.98) pos.vy *= -1;
        }

        // Noticeable vertical scroll parallax
        const scrollOffset = (scrollY * orb.parallax) % (height * 1.5);
        const renderY = (pos.y - scrollOffset + height * 1.5) % height;

        // Dynamic expansion during scroll / activity surge
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

      // 3. Noticeable Interactive Mouse / Touch Spotlight
      // Noticeably illuminates around cursor and finger
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

      // Radiant electric-blue / cyan ambient spotlight
      spotlight.addColorStop(0, `rgba(56, 189, 248, ${coreAlpha})`);   // Vibrant cyan glow at cursor center
      spotlight.addColorStop(0.28, `rgba(37, 99, 235, ${midAlpha})`);  // Electric royal blue
      spotlight.addColorStop(0.60, `rgba(18, 48, 108, ${outerAlpha})`); // Deep sapphire halo
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
          const alpha = (1 - dx / gridRadius) * 0.15 * pointerActivity;
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
          const alpha = (1 - dy / gridRadius) * 0.15 * pointerActivity;
          ctx.strokeStyle = `rgba(56, 189, 248, ${alpha})`;
          ctx.lineWidth = 1;
          ctx.beginPath();
          ctx.moveTo(Math.max(0, pointerX - gridRadius), y);
          ctx.lineTo(Math.min(width, pointerX + gridRadius), y);
          ctx.stroke();
        }
      }

      // 5. Floating Bioluminescent Stardust Particles on Movement
      for (let p = particles.length - 1; p >= 0; p--) {
        const part = particles[p];
        part.x += part.vx;
        part.y += part.vy;
        part.life -= 1 / part.maxLife;

        if (part.life <= 0) {
          particles.splice(p, 1);
          continue;
        }

        const currentAlpha = part.life * part.alpha;
        ctx.beginPath();
        ctx.arc(part.x, part.y, part.size * part.life, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(56, 189, 248, ${currentAlpha})`;
        ctx.shadowColor = "#38bdf8";
        ctx.shadowBlur = 6;
        ctx.fill();
        ctx.shadowBlur = 0;
      }

      // 6. Deep edge vignette preserving content focus
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
      {/* Clean, noticeably interactive dark-bluish canvas */}
      <canvas ref={canvasRef} className="absolute inset-0 w-full h-full block" />

      {/* Ambient pattern overlay */}
      <div className="absolute inset-0 ambient-pattern opacity-20 mix-blend-overlay pointer-events-none" />
    </div>
  );
};
