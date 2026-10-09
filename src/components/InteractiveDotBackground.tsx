import React, { useEffect, useRef } from 'react';

interface Dot {
  ox: number; oy: number;
  x: number; y: number;
  vx: number; vy: number;
  r: number;
}

interface Circuit {
  points: { x: number; y: number }[];
  path: Path2D;
  totalLen: number;
  color: string;
  pulseColor: string;
  alpha: number;
  pulses: Array<{ pos: number; speed: number; len: number }>;
  hasStart: boolean;
  hasEnd: boolean;
}

interface Particle {
  x: number; y: number;
  vx: number; vy: number;
  size: number;
  color: string;
  alpha: number;
}

/**
 * Full animated background: circuits + particles + interactive dots
 * — Everything on ONE canvas, 30fps cap, batched draws
 * — Dots use single fill() call, circuits use cached Path2D
 * — Mobile gets reduced counts
 */
export const InteractiveDotBackground: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d', { alpha: true, desynchronized: true });
    if (!ctx) return;

    // Non-null casts safe here — early returns above guarantee both exist
    const cvs = canvas as HTMLCanvasElement;
    const c = ctx as CanvasRenderingContext2D;

    const isMobile = window.innerWidth < 768 || window.matchMedia('(pointer: coarse)').matches;
    const dpr = isMobile ? 1 : Math.min(window.devicePixelRatio || 1, 1.25);

    let w = 0, h = 0;
    let rafId = 0;
    let lastFrame = 0;
    const FPS_TARGET = 30;
    const FRAME_TIME = 1000 / FPS_TARGET;

    // Mouse
    let mx = -1000, my = -1000;
    let mouseActive = false;

    let dots: Dot[] = [];
    let circuits: Circuit[] = [];
    let particles: Particle[] = [];

    const DOT_SPACING = isMobile ? 70 : 52;
    const DOT_R = 0.9;
    const INFLUENCE_R = isMobile ? 0 : 90;
    const INFLUENCE_SQ = INFLUENCE_R * INFLUENCE_R;

    function initDots() {
      dots = [];
      const cols = Math.ceil(w / DOT_SPACING) + 2;
      const rows = Math.ceil(h / DOT_SPACING) + 2;
      for (let r = 0; r < rows; r++) {
        for (let c = 0; c < cols; c++) {
          const ox = -DOT_SPACING + c * DOT_SPACING;
          const oy = -DOT_SPACING + r * DOT_SPACING;
          dots.push({ ox, oy, x: ox, y: oy, vx: 0, vy: 0, r: DOT_R });
        }
      }
    }

    function initCircuits() {
      circuits = [];
      const count = isMobile ? 4 : 8;
      const schemes = [
        { stroke: '#00b848', pulse: '#00ff66' },
        { stroke: '#059669', pulse: '#34d399' },
        { stroke: '#06b6d4', pulse: '#22d3ee' },
        { stroke: '#0d9488', pulse: '#5eead4' },
      ];

      for (let i = 0; i < count; i++) {
        const sx = Math.random() * (w + 80) - 40;
        const sy = Math.random() * (h + 80) - 40;
        const points = [{ x: sx, y: sy }];

        let cx = sx, cy = sy;
        const steps = isMobile ? 2 : 3;
        let dir = Math.floor(Math.random() * 4);

        for (let s = 0; s < steps; s++) {
          const len = 70 + Math.floor(Math.random() * 3) * 40;
          if (Math.random() < 0.75) {
            dir = (dir + (Math.random() > 0.5 ? 1 : 3)) % 4;
            if (dir === 0) cx += len;
            else if (dir === 1) cy += len;
            else if (dir === 2) cx -= len;
            else cy -= len;
          } else {
            const d = len * 0.707;
            cx += (Math.random() > 0.5 ? 1 : -1) * d;
            cy += (Math.random() > 0.5 ? 1 : -1) * d;
          }
          points.push({ x: cx, y: cy });
        }

        const path = new Path2D();
        path.moveTo(points[0].x, points[0].y);
        let totalLen = 0;
        for (let p = 1; p < points.length; p++) {
          path.lineTo(points[p].x, points[p].y);
          totalLen += Math.hypot(points[p].x - points[p - 1].x, points[p].y - points[p - 1].y);
        }

        const scheme = schemes[i % schemes.length];
        const pulseCount = isMobile ? 1 : (Math.random() > 0.5 ? 2 : 1);
        const pulses = [];
        for (let j = 0; j < pulseCount; j++) {
          pulses.push({
            pos: Math.random(),
            speed: (0.002 + Math.random() * 0.0015) * (isMobile ? 0.8 : 1),
            len: 40 + Math.random() * 30,
          });
        }

        circuits.push({
          points,
          path,
          totalLen,
          color: scheme.stroke,
          pulseColor: scheme.pulse,
          alpha: 0.12 + Math.random() * 0.06,
          pulses,
          hasStart: Math.random() > 0.3,
          hasEnd: Math.random() > 0.3,
        });
      }
    }

    function initParticles() {
      particles = [];
      const count = isMobile ? 8 : 20;
      const palette = ['#00b848', '#00ff66', '#06b6d4', '#10b981'];
      for (let i = 0; i < count; i++) {
        particles.push({
          x: Math.random() * w,
          y: Math.random() * h,
          vx: (Math.random() - 0.5) * 0.25,
          vy: -0.15 - Math.random() * 0.3,
          size: 1 + Math.random() * 1.6,
          color: palette[i % palette.length],
          alpha: 0.18 + Math.random() * 0.25,
        });
      }
    }

    function resize() {
      w = window.innerWidth;
      h = window.innerHeight;
      cvs.width = Math.round(w * dpr);
      cvs.height = Math.round(h * dpr);
      c.setTransform(dpr, 0, 0, dpr, 0, 0);
      initDots();
      initCircuits();
      initParticles();
    }

    resize();

    function onMouseMove(e: MouseEvent) {
      mx = e.clientX;
      my = e.clientY;
      mouseActive = true;
    }
    function onMouseLeave() {
      mouseActive = false;
      mx = -1000;
      my = -1000;
    }

    if (!isMobile) {
      window.addEventListener('mousemove', onMouseMove, { passive: true });
      document.addEventListener('mouseleave', onMouseLeave);
    }
    window.addEventListener('resize', resize, { passive: true });

    function getPointAt(circ: Circuit, dist: number) {
      if (circ.points.length <= 1) return circ.points[0];
      let acc = 0;
      for (let i = 1; i < circ.points.length; i++) {
        const p1 = circ.points[i - 1];
        const p2 = circ.points[i];
        const seg = Math.hypot(p2.x - p1.x, p2.y - p1.y);
        if (acc + seg >= dist || i === circ.points.length - 1) {
          const ratio = seg === 0 ? 0 : Math.max(0, Math.min(1, (dist - acc) / seg));
          return { x: p1.x + (p2.x - p1.x) * ratio, y: p1.y + (p2.y - p1.y) * ratio };
        }
        acc += seg;
      }
      return circ.points[circ.points.length - 1];
    }

    function render(time: number) {
      // 30fps cap
      if (time - lastFrame < FRAME_TIME) {
        rafId = requestAnimationFrame(render);
        return;
      }
      lastFrame = time;

      c.clearRect(0, 0, w, h);

      // --- 1. CIRCUITS ---
      for (const circ of circuits) {
        // Base path
        c.save();
        c.lineWidth = 1;
        c.strokeStyle = circ.color;
        c.globalAlpha = circ.alpha;
        c.stroke(circ.path);
        c.restore();

        // Terminal nodes
        if (!isMobile) {
          if (circ.hasStart) {
            const p = circ.points[0];
            c.save();
            c.globalAlpha = circ.alpha * 1.5;
            c.fillStyle = circ.pulseColor;
            c.beginPath();
            c.arc(p.x, p.y, 1.5, 0, Math.PI * 2);
            c.fill();
            c.restore();
          }
          if (circ.hasEnd) {
            const p = circ.points[circ.points.length - 1];
            c.save();
            c.globalAlpha = circ.alpha * 1.5;
            c.fillStyle = circ.pulseColor;
            c.beginPath();
            c.arc(p.x, p.y, 1.5, 0, Math.PI * 2);
            c.fill();
            c.restore();
          }
        }

        // Pulses
        for (const pulse of circ.pulses) {
          pulse.pos += pulse.speed;
          if (pulse.pos > 1) pulse.pos = 0;

          const headDist = pulse.pos * circ.totalLen;
          const headPt = getPointAt(circ, headDist);

          c.save();
          c.lineWidth = 1.5;
          c.strokeStyle = circ.pulseColor;
          c.globalAlpha = 0.45;
          c.setLineDash([pulse.len, Math.max(1000, circ.totalLen * 3)]);
          c.lineDashOffset = -headDist + pulse.len;
          c.stroke(circ.path);
          c.setLineDash([]);

          c.fillStyle = '#ffffff';
          c.beginPath();
          c.arc(headPt.x, headPt.y, 1.3, 0, Math.PI * 2);
          c.fill();

          c.fillStyle = circ.pulseColor;
          c.beginPath();
          c.arc(headPt.x, headPt.y, 2, 0, Math.PI * 2);
          c.fill();
          c.restore();
        }
      }

      // --- 2. PARTICLES ---
      for (const pt of particles) {
        pt.x += pt.vx;
        pt.y += pt.vy;
        if (pt.y < -10) {
          pt.y = h + 10;
          pt.x = Math.random() * w;
        }
        if (pt.x < -10) pt.x = w + 10;
        if (pt.x > w + 10) pt.x = -10;

        c.save();
        c.globalAlpha = pt.alpha;
        c.fillStyle = pt.color;
        c.beginPath();
        c.arc(pt.x, pt.y, pt.size, 0, Math.PI * 2);
        c.fill();
        c.restore();
      }

      // --- 3. DOT MATRIX (batched) ---
      c.beginPath();
      c.fillStyle = 'rgba(255,255,255,0.065)';

      for (const d of dots) {
        if (!isMobile && mouseActive) {
          const dx = d.x - mx;
          const dy = d.y - my;
          if (Math.abs(dx) < INFLUENCE_R && Math.abs(dy) < INFLUENCE_R) {
            const dSq = dx * dx + dy * dy;
            if (dSq < INFLUENCE_SQ) {
              const dist = Math.sqrt(dSq) || 0.001;
              const force = (1 - dist / INFLUENCE_R) * 18;
              d.vx += (dx / dist) * force * 0.08;
              d.vy += (dy / dist) * force * 0.08;
            }
          }
        }

        // Spring back
        d.vx += (d.ox - d.x) * 0.07;
        d.vy += (d.oy - d.y) * 0.07;
        d.vx *= 0.78;
        d.vy *= 0.78;

        if (Math.abs(d.vx) < 0.02) d.vx = 0;
        if (Math.abs(d.vy) < 0.02) d.vy = 0;

        d.x += d.vx;
        d.y += d.vy;

        if (Math.abs(d.x - d.ox) < 0.05 && !d.vx) d.x = d.ox;
        if (Math.abs(d.y - d.oy) < 0.05 && !d.vy) d.y = d.oy;

        c.moveTo(d.x + d.r, d.y);
        c.arc(d.x, d.y, d.r, 0, Math.PI * 2);
      }

      c.fill();

      rafId = requestAnimationFrame(render);
    }

    rafId = requestAnimationFrame(render);

    return () => {
      cancelAnimationFrame(rafId);
      window.removeEventListener('resize', resize);
      if (!isMobile) {
        window.removeEventListener('mousemove', onMouseMove);
        document.removeEventListener('mouseleave', onMouseLeave);
      }
    };
  }, []);

  return (
    <div
      className="fixed inset-0 pointer-events-none z-0 overflow-hidden"
      style={{ contain: 'strict' }}
    >
      {/* Static radial gradient base */}
      <div
        className="absolute inset-0 bg-[#040504]/80"
        style={{
          backgroundImage: `
            radial-gradient(circle at 18% 25%, rgba(0,184,72,0.06) 0%, transparent 50%),
            radial-gradient(circle at 82% 70%, rgba(6,182,212,0.05) 0%, transparent 50%),
            radial-gradient(circle at 50% 50%, rgba(0,255,102,0.02) 0%, transparent 70%)
          `,
        }}
      />
      <canvas ref={canvasRef} className="absolute inset-0 w-full h-full" />
    </div>
  );
};
