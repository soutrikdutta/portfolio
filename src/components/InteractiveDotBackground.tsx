import React, { useEffect, useRef } from 'react';

interface Dot {
  originX: number;
  originY: number;
  x: number;
  y: number;
  vx: number;
  vy: number;
  baseRadius: number;
  phase: number;
}

interface CircuitPoint {
  x: number;
  y: number;
}

interface CircuitPulse {
  pos: number;
  speed: number;
  length: number;
  color: string;
}

interface Circuit {
  path: Path2D;
  points: CircuitPoint[];
  totalLength: number;
  baseAlpha: number;
  color: string;
  pulseColor: string;
  pulses: CircuitPulse[];
  hasTerminalStart: boolean;
  hasTerminalEnd: boolean;
}

interface CyberParticle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  color: string;
  alpha: number;
  phase: number;
}

interface CanvasRipple {
  x: number;
  y: number;
  radius: number;
  maxRadius: number;
  alpha: number;
}

export const InteractiveDotBackground: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d', { alpha: true });
    if (!ctx) return;

    let animationFrameId: number;
    let width = 0;
    let height = 0;

    const isMobile =
      typeof window !== 'undefined' &&
      (window.innerWidth < 768 || (window.matchMedia && window.matchMedia('(pointer: coarse)').matches));

    // Cap DPR to 1 on mobile to prevent multi-megapixel overdraw; max 1.5 on desktop
    const dpr = isMobile ? 1 : Math.min(window.devicePixelRatio || 1, 1.5);

    let isScrolling = false;
    let scrollTimeout: ReturnType<typeof setTimeout> | null = null;

    const handleScroll = () => {
      isScrolling = true;
      if (scrollTimeout) clearTimeout(scrollTimeout);
      scrollTimeout = setTimeout(() => {
        isScrolling = false;
      }, 70);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });

    let mouse = {
      x: -1000,
      y: -1000,
      targetX: -1000,
      targetY: -1000,
      active: false,
      speed: 0
    };

    let prevMouse = { x: -1000, y: -1000 };
    let ripples: CanvasRipple[] = [];
    let circuits: Circuit[] = [];
    let particles: CyberParticle[] = [];
    let dots: Dot[] = [];

    // Helper: calculate point along circuit path
    const getPointAtDistance = (circ: Circuit, dist: number): CircuitPoint => {
      if (circ.points.length <= 1) return circ.points[0] || { x: 0, y: 0 };
      let accumulated = 0;
      for (let i = 1; i < circ.points.length; i++) {
        const p1 = circ.points[i - 1];
        const p2 = circ.points[i];
        const segDist = Math.hypot(p2.x - p1.x, p2.y - p1.y);
        if (accumulated + segDist >= dist || i === circ.points.length - 1) {
          const ratio = segDist === 0 ? 0 : Math.max(0, Math.min(1, (dist - accumulated) / segDist));
          return {
            x: p1.x + (p2.x - p1.x) * ratio,
            y: p1.y + (p2.y - p1.y) * ratio
          };
        }
        accumulated += segDist;
      }
      return circ.points[circ.points.length - 1];
    };

    const generateCircuits = () => {
      circuits = [];
      // Dynamic circuit traces for energetic cyberpunk atmosphere
      const numCircuits = isMobile ? 6 : Math.min(16, Math.max(10, Math.floor((width * height) / 75000)));

      const colorSchemes = [
        { stroke: '#00b848', pulse: '#00ff66' },
        { stroke: '#059669', pulse: '#34d399' },
        { stroke: '#06b6d4', pulse: '#22d3ee' },
        { stroke: '#0d9488', pulse: '#5eead4' }
      ];

      for (let i = 0; i < numCircuits; i++) {
        const startX = Math.random() * (width + 80) - 40;
        const startY = Math.random() * (height + 80) - 40;
        const points: CircuitPoint[] = [{ x: startX, y: startY }];

        let currX = startX;
        let currY = startY;
        const steps = isMobile ? 2 : 3 + Math.floor(Math.random() * 2);
        let lastDir = Math.floor(Math.random() * 4);

        for (let s = 0; s < steps; s++) {
          const segLength = 70 + Math.floor(Math.random() * 3) * 40;
          if (Math.random() < 0.75) {
            lastDir = (lastDir + (Math.random() > 0.5 ? 1 : 3)) % 4;
            if (lastDir === 0) currX += segLength;
            else if (lastDir === 1) currY += segLength;
            else if (lastDir === 2) currX -= segLength;
            else currY -= segLength;
          } else {
            const diagDist = segLength * 0.707;
            currX += (Math.random() > 0.5 ? 1 : -1) * diagDist;
            currY += (Math.random() > 0.5 ? 1 : -1) * diagDist;
          }
          points.push({ x: currX, y: currY });
        }

        const path = new Path2D();
        path.moveTo(points[0].x, points[0].y);
        let totalLen = 0;
        for (let p = 1; p < points.length; p++) {
          path.lineTo(points[p].x, points[p].y);
          totalLen += Math.hypot(points[p].x - points[p - 1].x, points[p].y - points[p - 1].y);
        }

        const scheme = colorSchemes[i % colorSchemes.length];
        const pulses: CircuitPulse[] = [];
        const pulseCount = isMobile ? 1 : Math.random() > 0.5 ? 2 : 1;
        for (let j = 0; j < pulseCount; j++) {
          pulses.push({
            pos: Math.random(),
            speed: (0.0024 + Math.random() * 0.0018) * (isMobile ? 0.8 : 1),
            length: 45 + Math.random() * 35,
            color: scheme.pulse
          });
        }

        circuits.push({
          path,
          points,
          totalLength: totalLen,
          baseAlpha: 0.13 + Math.random() * 0.08,
          color: scheme.stroke,
          pulseColor: scheme.pulse,
          pulses,
          hasTerminalStart: Math.random() > 0.3,
          hasTerminalEnd: Math.random() > 0.3
        });
      }
    };

    const initParticles = () => {
      particles = [];
      const count = isMobile ? 10 : 26;
      const palette = ['#00b848', '#00ff66', '#06b6d4', '#10b981'];
      for (let i = 0; i < count; i++) {
        particles.push({
          x: Math.random() * width,
          y: Math.random() * height,
          vx: (Math.random() - 0.5) * 0.3,
          vy: -0.2 - Math.random() * 0.35,
          size: 1 + Math.random() * 1.8,
          color: palette[i % palette.length],
          alpha: 0.20 + Math.random() * 0.30,
          phase: Math.random() * Math.PI * 2
        });
      }
    };

    const SPACING = isMobile ? 70 : 54;
    const initDots = () => {
      dots = [];
      const cols = Math.ceil(width / SPACING) + 2;
      const rows = Math.ceil(height / SPACING) + 2;
      const startX = -SPACING;
      const startY = -SPACING;

      for (let r = 0; r < rows; r++) {
        for (let c = 0; c < cols; c++) {
          const originX = startX + c * SPACING;
          const originY = startY + r * SPACING;
          dots.push({
            originX,
            originY,
            x: originX,
            y: originY,
            vx: 0,
            vy: 0,
            baseRadius: 0.9,
            phase: Math.random() * Math.PI * 2
          });
        }
      }
    };

    const initAll = () => {
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = Math.floor(width * dpr);
      canvas.height = Math.floor(height * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

      generateCircuits();
      initParticles();
      initDots();
    };

    initAll();

    const handleResize = () => {
      initAll();
    };

    const handleMouseMove = (e: MouseEvent) => {
      mouse.targetX = e.clientX;
      mouse.targetY = e.clientY;
      mouse.active = true;
    };

    const handleMouseLeave = () => {
      mouse.active = false;
      mouse.targetX = -1000;
      mouse.targetY = -1000;
    };

    const handleMouseDown = (e: MouseEvent) => {
      if (isMobile) return;
      ripples.push({
        x: e.clientX,
        y: e.clientY,
        radius: 2,
        maxRadius: 20,
        alpha: 0.35
      });
    };

    window.addEventListener('resize', handleResize, { passive: true });
    if (!isMobile) {
      window.addEventListener('mousemove', handleMouseMove, { passive: true });
      window.addEventListener('mousedown', handleMouseDown, { passive: true });
      document.addEventListener('mouseleave', handleMouseLeave);
    }

    let time = 0;
    const render = () => {
      time += 0.016;

      // Mouse smoothing
      if (mouse.active && !isMobile) {
        mouse.x += (mouse.targetX - mouse.x) * 0.18;
        mouse.y += (mouse.targetY - mouse.y) * 0.18;
        const dxm = mouse.x - prevMouse.x;
        const dym = mouse.y - prevMouse.y;
        mouse.speed = Math.min(Math.hypot(dxm, dym), 30);
        prevMouse.x = mouse.x;
        prevMouse.y = mouse.y;
      } else {
        mouse.x = -1000;
        mouse.y = -1000;
        mouse.speed = 0;
      }

      ctx.clearRect(0, 0, width, height);

      // --- 1. CLICK RIPPLES (Desktop only) ---
      if (!isMobile) {
        for (let r = ripples.length - 1; r >= 0; r--) {
          const rip = ripples[r];
          rip.radius += 2.0;
          rip.alpha *= 0.85;

          if (rip.alpha < 0.02 || rip.radius > rip.maxRadius) {
            ripples.splice(r, 1);
            continue;
          }

          ctx.save();
          ctx.lineWidth = 1.0;
          ctx.strokeStyle = '#00ff66';
          ctx.globalAlpha = rip.alpha;
          ctx.beginPath();
          ctx.arc(rip.x, rip.y, rip.radius, 0, Math.PI * 2);
          ctx.stroke();
          ctx.restore();
        }
      }

      // --- 2. ALIEN CIRCUITS (GPU friendly - NO expensive canvas shadowBlur) ---
      for (let c = 0; c < circuits.length; c++) {
        const circ = circuits[c];

        ctx.save();
        ctx.lineWidth = 1.0;
        ctx.strokeStyle = circ.color;
        ctx.globalAlpha = circ.baseAlpha;
        ctx.stroke(circ.path);
        ctx.restore();

        // Terminal nodes
        if (!isMobile) {
          if (circ.hasTerminalStart && circ.points.length > 0) {
            const pStart = circ.points[0];
            ctx.save();
            ctx.globalAlpha = circ.baseAlpha * 1.5;
            ctx.fillStyle = circ.pulseColor;
            ctx.beginPath();
            ctx.arc(pStart.x, pStart.y, 1.5, 0, Math.PI * 2);
            ctx.fill();
            ctx.restore();
          }

          if (circ.hasTerminalEnd && circ.points.length > 1) {
            const pEnd = circ.points[circ.points.length - 1];
            ctx.save();
            ctx.globalAlpha = circ.baseAlpha * 1.5;
            ctx.fillStyle = circ.pulseColor;
            ctx.beginPath();
            ctx.arc(pEnd.x, pEnd.y, 1.5, 0, Math.PI * 2);
            ctx.fill();
            ctx.restore();
          }
        }

        // Circuit pulses (clean, hardware-accelerated dual-stroke instead of software shadowBlur)
        for (let p = 0; p < circ.pulses.length; p++) {
          const pulse = circ.pulses[p];
          pulse.pos += pulse.speed;
          if (pulse.pos > 1) pulse.pos = 0;

          const headDist = pulse.pos * circ.totalLength;
          const headPt = getPointAtDistance(circ, headDist);

          ctx.save();
          ctx.lineWidth = 1.6;
          ctx.strokeStyle = pulse.color;
          ctx.globalAlpha = 0.50;
          ctx.setLineDash([pulse.length, Math.max(1000, circ.totalLength * 3)]);
          ctx.lineDashOffset = -headDist + pulse.length;
          ctx.stroke(circ.path);
          ctx.setLineDash([]);

          // Bright living pulse head
          ctx.fillStyle = '#ffffff';
          ctx.beginPath();
          ctx.arc(headPt.x, headPt.y, 1.4, 0, Math.PI * 2);
          ctx.fill();

          ctx.fillStyle = pulse.color;
          ctx.beginPath();
          ctx.arc(headPt.x, headPt.y, 2.2, 0, Math.PI * 2);
          ctx.fill();
          ctx.restore();
        }
      }

      // --- 3. PARTICLES ---
      for (let i = 0; i < particles.length; i++) {
        const pt = particles[i];
        pt.x += pt.vx;
        pt.y += pt.vy;

        if (pt.y < -10) {
          pt.y = height + 10;
          pt.x = Math.random() * width;
        }
        if (pt.x < -10) pt.x = width + 10;
        if (pt.x > width + 10) pt.x = -10;

        ctx.save();
        ctx.globalAlpha = pt.alpha;
        ctx.fillStyle = pt.color;
        ctx.beginPath();
        ctx.arc(pt.x, pt.y, pt.size, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();
      }

      // --- 4. DOT MATRIX (Batched Single-Path Draw Call) ---
      const INFLUENCE_RADIUS = 100;
      const INFLUENCE_RADIUS_SQ = INFLUENCE_RADIUS * INFLUENCE_RADIUS;

      ctx.beginPath();
      ctx.fillStyle = 'rgba(255, 255, 255, 0.065)';

      for (let i = 0; i < dots.length; i++) {
        const dot = dots[i];

        if (!isMobile && mouse.active && !isScrolling) {
          const dx = dot.x - mouse.x;
          const dy = dot.y - mouse.y;

          if (Math.abs(dx) < INFLUENCE_RADIUS && Math.abs(dy) < INFLUENCE_RADIUS) {
            const distSq = dx * dx + dy * dy;
            if (distSq < INFLUENCE_RADIUS_SQ) {
              const dist = Math.sqrt(distSq);
              const force = (1 - dist / INFLUENCE_RADIUS);
              const pushDistance = force * 22;
              const angle = Math.atan2(dy, dx);
              dot.vx += (Math.cos(angle) * pushDistance - (dot.x - dot.originX)) * 0.08;
              dot.vy += (Math.sin(angle) * pushDistance - (dot.y - dot.originY)) * 0.08;
            } else if (dot.vx !== 0 || dot.vy !== 0) {
              dot.vx += (dot.originX - dot.x) * 0.06;
              dot.vy += (dot.originY - dot.y) * 0.06;
            }
          } else if (dot.vx !== 0 || dot.vy !== 0 || dot.x !== dot.originX || dot.y !== dot.originY) {
            dot.vx += (dot.originX - dot.x) * 0.06;
            dot.vy += (dot.originY - dot.y) * 0.06;
          }

          if (dot.vx !== 0 || dot.vy !== 0) {
            dot.vx *= 0.85;
            dot.vy *= 0.85;
            if (Math.abs(dot.vx) < 0.01) dot.vx = 0;
            if (Math.abs(dot.vy) < 0.01) dot.vy = 0;
            dot.x += dot.vx;
            dot.y += dot.vy;
          }
        } else if (dot.x !== dot.originX || dot.y !== dot.originY) {
          dot.x += (dot.originX - dot.x) * 0.1;
          dot.y += (dot.originY - dot.y) * 0.1;
          if (Math.abs(dot.x - dot.originX) < 0.05) dot.x = dot.originX;
          if (Math.abs(dot.y - dot.originY) < 0.05) dot.y = dot.originY;
        }

        ctx.moveTo(dot.x + dot.baseRadius, dot.y);
        ctx.arc(dot.x, dot.y, dot.baseRadius, 0, Math.PI * 2);
      }

      ctx.fill();

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animationFrameId);
      if (scrollTimeout) clearTimeout(scrollTimeout);
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleResize);
      if (!isMobile) {
        window.removeEventListener('mousemove', handleMouseMove);
        window.removeEventListener('mousedown', handleMouseDown);
        document.removeEventListener('mouseleave', handleMouseLeave);
      }
    };
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden transform-gpu will-change-transform">
      {/* Optimized Atmosphere Base with Smooth Radial Gradients */}
      <div 
        className="absolute inset-0 bg-[#040504]/82"
        style={{
          backgroundImage: `
            radial-gradient(circle at 18% 25%, rgba(0, 184, 72, 0.065) 0%, transparent 50%),
            radial-gradient(circle at 82% 70%, rgba(6, 182, 212, 0.055) 0%, transparent 50%),
            radial-gradient(circle at 50% 50%, rgba(0, 255, 102, 0.025) 0%, transparent 70%)
          `
        }}
      />
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full"
      />
    </div>
  );
};
