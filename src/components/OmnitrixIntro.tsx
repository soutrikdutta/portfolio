import React, { useState, useRef, useEffect, useCallback } from 'react';
import { X } from 'lucide-react';

interface OmnitrixIntroProps {
  onComplete: () => void;
}

interface ParticleStreak {
  x: number;
  y: number;
  vx: number;
  vy: number;
  len: number;
  width: number;
  color: string;
  alpha: number;
  decay: number;
}

interface Shockwave {
  r: number;
  speed: number;
  maxR: number;
  alpha: number;
  width: number;
}

export const OmnitrixIntro: React.FC<OmnitrixIntroProps> = ({ onComplete }) => {
  const [activated, setActivated] = useState(false);
  const [containerOpacity, setContainerOpacity] = useState(1);
  const [watchScale, setWatchScale] = useState(1);
  const [watchRotation, setWatchRotation] = useState(0);
  const [watchOpacity, setWatchOpacity] = useState(1);
  const [glowOpacity, setGlowOpacity] = useState(0.2);

  const canvasRef = useRef<HTMLCanvasElement>(null);
  const audioCtxRef = useRef<AudioContext | null>(null);
  const rafId = useRef<number | null>(null);
  const startTimeRef = useRef<number>(0);
  const particlesRef = useRef<ParticleStreak[]>([]);
  const shockwavesRef = useRef<Shockwave[]>([]);
  const bloomRadiusRef = useRef<number>(0);
  const isRunningRef = useRef<boolean>(false);

  // High-performance Web Audio Synthesizer
  const getAudioContext = () => {
    if (!audioCtxRef.current) {
      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      if (AudioCtx) {
        audioCtxRef.current = new AudioCtx();
      }
    }
    if (audioCtxRef.current && audioCtxRef.current.state === 'suspended') {
      audioCtxRef.current.resume();
    }
    return audioCtxRef.current;
  };

  const playClickAudio = () => {
    try {
      const ctx = getAudioContext();
      if (!ctx) return;
      const now = ctx.currentTime;

      // Mechanical servo engagement click
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(380, now);
      osc.frequency.exponentialRampToValueAtTime(120, now + 0.08);

      gain.gain.setValueAtTime(0.25, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.09);

      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start(now);
      osc.stop(now + 0.1);

      // Deep energy charge rise
      const charge = ctx.createOscillator();
      const chargeGain = ctx.createGain();
      charge.type = 'triangle';
      charge.frequency.setValueAtTime(80, now + 0.02);
      charge.frequency.exponentialRampToValueAtTime(320, now + 0.65);

      chargeGain.gain.setValueAtTime(0.01, now + 0.02);
      chargeGain.gain.linearRampToValueAtTime(0.18, now + 0.45);
      chargeGain.gain.exponentialRampToValueAtTime(0.001, now + 0.7);

      charge.connect(chargeGain);
      chargeGain.connect(ctx.destination);
      charge.start(now + 0.02);
      charge.stop(now + 0.72);
    } catch {
      // Audio safety fallback
    }
  };

  const playBurstAudio = () => {
    try {
      const ctx = getAudioContext();
      if (!ctx) return;
      const now = ctx.currentTime;

      // Sub-bass impact with longer tail
      const sub = ctx.createOscillator();
      const subGain = ctx.createGain();
      sub.type = 'sine';
      sub.frequency.setValueAtTime(120, now);
      sub.frequency.exponentialRampToValueAtTime(26, now + 1.8);

      subGain.gain.setValueAtTime(0.38, now);
      subGain.gain.exponentialRampToValueAtTime(0.001, now + 1.85);

      sub.connect(subGain);
      subGain.connect(ctx.destination);
      sub.start(now);
      sub.stop(now + 1.9);
    } catch {
      // Audio safety fallback
    }
  };

  // Launch unified 60/120fps hardware canvas animation
  const startCanvasSequence = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d', { alpha: true });
    if (!ctx) return;

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    const cx = canvas.width / 2;
    const cy = canvas.height / 2;
    const maxScreen = Math.max(canvas.width, canvas.height);

    // Initialize 240 laser streaks with deep, darker emerald colors
    const streaks: ParticleStreak[] = [];
    const colors = ['#008733', '#046a38', '#025222', '#009e3d', '#033b19', '#022c14', '#047857'];
    for (let i = 0; i < 240; i++) {
      const angle = Math.random() * Math.PI * 2;
      const speed = Math.random() * 22 + 6;
      streaks.push({
        x: cx,
        y: cy,
        vx: Math.cos(angle) * speed,
        vy: Math.sin(angle) * speed,
        len: Math.random() * 38 + 18,
        width: Math.random() * 2.2 + 0.8,
        color: colors[Math.floor(Math.random() * colors.length)],
        alpha: 0.95,
        decay: Math.random() * 0.007 + 0.005 // Slower decay for longer streak drift
      });
    }
    particlesRef.current = streaks;

    // Expanding deep dark emerald shockwave rings
    shockwavesRef.current = [
      { r: 10, speed: 22, maxR: maxScreen * 1.6, alpha: 0.85, width: 2.5 },
      { r: 5, speed: 16, maxR: maxScreen * 1.4, alpha: 0.70, width: 2.0 },
      { r: 0, speed: 11, maxR: maxScreen * 1.2, alpha: 0.55, width: 1.5 }
    ];

    isRunningRef.current = true;
    startTimeRef.current = performance.now();

    const loop = (now: number) => {
      if (!isRunningRef.current) return;
      const elapsed = (now - startTimeRef.current) / 1000; // seconds

      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // 1. Draw Shockwaves
      shockwavesRef.current.forEach((sw) => {
        if (sw.r < sw.maxR) {
          sw.r += sw.speed;
          sw.alpha *= 0.978;
          ctx.save();
          ctx.beginPath();
          ctx.arc(cx, cy, sw.r, 0, Math.PI * 2);
          ctx.strokeStyle = `rgba(0, 140, 52, ${Math.max(0, sw.alpha)})`;
          ctx.lineWidth = sw.width;
          ctx.stroke();
          ctx.restore();
        }
      });

      // 2. Draw Motion-Blurred Laser Streaks
      let hasActiveParticles = false;
      particlesRef.current.forEach((s) => {
        s.x += s.vx;
        s.y += s.vy;
        s.vx *= 0.985;
        s.vy *= 0.985;
        s.alpha -= s.decay;

        if (s.alpha > 0.01) {
          hasActiveParticles = true;
          const mag = Math.hypot(s.vx, s.vy) || 1;
          const tailX = s.x - (s.vx / mag) * s.len;
          const tailY = s.y - (s.vy / mag) * s.len;

          ctx.save();
          ctx.beginPath();
          ctx.moveTo(s.x, s.y);
          ctx.lineTo(tailX, tailY);
          ctx.strokeStyle = s.color;
          ctx.lineWidth = s.width;
          ctx.globalAlpha = Math.max(0, s.alpha);
          ctx.lineCap = 'round';
          ctx.stroke();
          ctx.restore();
        }
      });

      // 3. Draw Expanding Central Radiant Bloom (Deep Dark Emerald — Moody & Cinematic)
      if (elapsed > 0.35) {
        // Expand smoothly over 1.35 seconds
        const bloomProgress = Math.min((elapsed - 0.35) / 1.35, 1);
        const easedProgress = Math.sin((bloomProgress * Math.PI) / 2);
        bloomRadiusRef.current = easedProgress * maxScreen * 1.35;

        const radGrad = ctx.createRadialGradient(
          cx, cy, 0,
          cx, cy, bloomRadiusRef.current
        );
        // Rich, dark alien emerald palette (darker green, no neon glare)
        radGrad.addColorStop(0, 'rgba(0, 140, 52, 0.95)');
        radGrad.addColorStop(0.25, 'rgba(0, 105, 38, 0.88)');
        radGrad.addColorStop(0.55, 'rgba(2, 65, 24, 0.72)');
        radGrad.addColorStop(0.82, 'rgba(1, 32, 12, 0.45)');
        radGrad.addColorStop(1, 'rgba(0, 0, 0, 0)');

        ctx.save();
        ctx.fillStyle = radGrad;
        ctx.beginPath();
        ctx.arc(cx, cy, bloomRadiusRef.current, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();
      }

      // 4. Fade entire intro into portfolio (starts at 1.75s, dissolves over 0.85s)
      if (elapsed > 1.75) {
        const fadeOut = Math.max(0, 1 - (elapsed - 1.75) / 0.85);
        setContainerOpacity(fadeOut);

        if (fadeOut <= 0) {
          isRunningRef.current = false;
          onComplete();
          return;
        }
      }

      if (hasActiveParticles || elapsed < 2.65) {
        rafId.current = requestAnimationFrame(loop);
      } else {
        isRunningRef.current = false;
        onComplete();
      }
    };

    rafId.current = requestAnimationFrame(loop);
  }, [onComplete]);

  // Handle the "OPEN" activation
  const handleOpenClick = () => {
    if (activated) return;
    setActivated(true);
    playClickAudio();

    // Smooth CSS-driven rotation & elevation (zero filter lag)
    setWatchScale(1.08);
    setWatchRotation(90);
    setGlowOpacity(0.9);

    // Burst trigger at exactly 600ms (when rotation finishes smoothly)
    setTimeout(() => {
      playBurstAudio();
      setWatchScale(6);
      setWatchOpacity(0);
      startCanvasSequence();
    }, 550);
  };

  const handleSkip = () => {
    isRunningRef.current = false;
    onComplete();
  };

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') handleSkip();
    };
    window.addEventListener('keydown', onKey);
    return () => {
      window.removeEventListener('keydown', onKey);
      if (rafId.current) cancelAnimationFrame(rafId.current);
    };
  }, []);

  return (
    <div
      className="fixed inset-0 z-[10000] flex flex-col items-center justify-center bg-[#040605] overflow-hidden select-none transition-opacity duration-300"
      style={{
        opacity: containerOpacity,
        pointerEvents: containerOpacity <= 0 ? 'none' : 'auto'
      }}
    >
      {/* Background Micro-Dot Grid */}
      <div
        className="absolute inset-0 pointer-events-none opacity-20"
        style={{
          backgroundImage: `
            radial-gradient(circle at 50% 50%, rgba(0, 184, 72, 0.12) 0%, transparent 65%),
            radial-gradient(rgba(255, 255, 255, 0.12) 1px, transparent 1px)
          `,
          backgroundSize: '100% 100%, 28px 28px'
        }}
      />

      {/* 60fps Hardware Canvas for Particle Streaks & Radiant Bloom */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 pointer-events-none z-30 w-full h-full"
      />

      {/* Top Telemetry & Skip Action */}
      <div className="absolute top-6 inset-x-6 flex items-center justify-between z-40 max-w-5xl mx-auto">
        <div className="flex items-center gap-2.5 font-mono text-[11px] text-zinc-400">
          <span className="w-1.5 h-1.5 rounded-full bg-[#00ff66] animate-pulse" />
          <span className="tracking-widest uppercase text-zinc-300 font-semibold">
            NOTHING // PROTOCOL OM-10
          </span>
          <span className="text-zinc-600 hidden sm:inline">·</span>
          <span className="text-zinc-500 hidden sm:inline">AZMUTH CHRONO-CALIBER</span>
        </div>

        <button
          onClick={handleSkip}
          className="text-[11px] font-mono text-zinc-400 hover:text-white px-3.5 py-1.5 rounded-full border border-white/10 hover:border-white/30 bg-zinc-950/60 backdrop-blur-md transition-all flex items-center gap-1.5 cursor-pointer"
        >
          <span>SKIP</span>
          <X className="w-3 h-3" />
        </button>
      </div>

      {/* Omnitrix Dial Container: Exactly Locked at Dead Center */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-20 flex items-center justify-center">
        {/* Hardware-accelerated Energy Glow Halo */}
        <div
          className="absolute w-[240px] h-[240px] sm:w-[270px] sm:h-[270px] rounded-full pointer-events-none transition-all duration-700 ease-out"
          style={{
            background: 'radial-gradient(circle, rgba(0,140,52,0.3) 0%, rgba(2,65,24,0.12) 50%, transparent 70%)',
            opacity: glowOpacity,
            transform: activated ? 'scale(1.4)' : 'scale(1.0)',
            willChange: 'transform, opacity'
          }}
        />

        {/* The Omnitrix Device Dial — Sleek, Compact Scale */}
        <div
          className="relative flex items-center justify-center w-[160px] h-[160px] sm:w-[180px] sm:h-[180px] transition-all"
          style={{
            transform: `translate3d(0, 0, 0) scale(${watchScale}) rotate(${watchRotation}deg)`,
            opacity: watchOpacity,
            transitionDuration: activated && watchScale > 1.5 ? '400ms' : '650ms',
            transitionTimingFunction: activated && watchScale > 1.5 ? 'ease-in' : 'cubic-bezier(0.16, 1, 0.3, 1)',
            willChange: 'transform, opacity'
          }}
        >
          {/* Outer Industrial Lug Accents (Precision Titanium 4-Piston Caliber) */}
          <div className="absolute -top-2.5 w-4 h-3 bg-gradient-to-b from-zinc-700 via-zinc-800 to-zinc-900 rounded-t-sm border-t border-x border-white/20 shadow-sm flex items-center justify-center">
            <span className="w-1.5 h-[1px] bg-white/40" />
          </div>
          <div className="absolute -bottom-2.5 w-4 h-3 bg-gradient-to-t from-zinc-700 via-zinc-800 to-zinc-900 rounded-b-sm border-b border-x border-white/20 shadow-sm flex items-center justify-center">
            <span className="w-1.5 h-[1px] bg-white/40" />
          </div>
          <div className="absolute -left-2.5 h-4 w-3 bg-gradient-to-r from-zinc-700 via-zinc-800 to-zinc-900 rounded-l-sm border-l border-y border-white/20 shadow-sm flex items-center justify-center">
            <span className="h-1.5 w-[1px] bg-white/40" />
          </div>
          <div className="absolute -right-2.5 h-4 w-3 bg-gradient-to-l from-zinc-700 via-zinc-800 to-zinc-900 rounded-r-sm border-r border-y border-white/20 shadow-sm flex items-center justify-center">
            <span className="h-1.5 w-[1px] bg-white/40" />
          </div>

          {/* Master Bezel: Brushed Dark Titanium Knurled Rim */}
          <div className="w-full h-full rounded-full bg-gradient-to-b from-zinc-800 via-zinc-900 to-[#070908] p-2 border border-white/15 shadow-[0_15px_45px_rgba(0,0,0,0.95)] flex items-center justify-center relative">
            {/* Precision Micro-Notches & Degree Ticks */}
            <div className="absolute inset-1.5 rounded-full border border-white/10 pointer-events-none flex items-center justify-center">
              <span className="absolute top-1 font-mono text-[8px] text-zinc-500 font-bold tracking-widest">
                00
              </span>
              <span className="absolute bottom-1 font-mono text-[8px] text-zinc-500 font-bold tracking-widest">
                30
              </span>
              <span className="absolute left-1.5 font-mono text-[8px] text-zinc-500 font-bold tracking-widest">
                45
              </span>
              <span className="absolute right-1.5 font-mono text-[8px] text-zinc-500 font-bold tracking-widest">
                15
              </span>
            </div>

            {/* Inner Recessed Beveled Chassis */}
            <div className="w-full h-full rounded-full bg-gradient-to-b from-black via-zinc-950 to-zinc-900 p-3.5 border border-zinc-800 flex items-center justify-center relative shadow-inner">
              {/* 4 Corner Emerald Conduits */}
              <div className="absolute top-2.5 w-1.5 h-1.5 rounded-full bg-[#008a34] shadow-[0_0_8px_#008a34]" />
              <div className="absolute bottom-2.5 w-1.5 h-1.5 rounded-full bg-[#008a34] shadow-[0_0_8px_#008a34]" />
              <div className="absolute left-2.5 w-1.5 h-1.5 rounded-full bg-[#008a34] shadow-[0_0_8px_#008a34]" />
              <div className="absolute right-2.5 w-1.5 h-1.5 rounded-full bg-[#008a34] shadow-[0_0_8px_#008a34]" />

              {/* The Crystalline Omnitrix Core (Hourglass Lens) */}
              <div className="w-full h-full rounded-full bg-black relative overflow-hidden border border-emerald-700/60 shadow-[0_0_25px_rgba(0,140,52,0.3)] flex items-center justify-center">
                {/* Vector Hourglass Core */}
                <svg viewBox="0 0 200 200" className="w-full h-full">
                  <defs>
                    {/* Deep Dark Emerald Luminescence Gradient */}
                    <radialGradient id="emeraldCoreFast" cx="50%" cy="50%" r="50%">
                      <stop offset="0%" stopColor="#00c84c" />
                      <stop offset="35%" stopColor="#008a34" />
                      <stop offset="70%" stopColor="#024d1d" />
                      <stop offset="100%" stopColor="#011808" />
                    </radialGradient>

                    {/* Dark Obsidian Prism Wedges */}
                    <linearGradient id="obsidianFacetFast" x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop offset="0%" stopColor="#1e2220" />
                      <stop offset="50%" stopColor="#0d0f0e" />
                      <stop offset="100%" stopColor="#050605" />
                    </linearGradient>

                    {/* Subtle Internal Micro-Circuit Pattern */}
                    <pattern id="microGridFast" width="10" height="10" patternUnits="userSpaceOnUse">
                      <path d="M 10 0 L 0 0 0 10" fill="none" stroke="rgba(0,140,52,0.15)" strokeWidth="0.5" />
                    </pattern>
                  </defs>

                  {/* Luminous Deep Dark Emerald Base Disc */}
                  <circle cx="100" cy="100" r="98" fill="url(#emeraldCoreFast)" />
                  <circle cx="100" cy="100" r="98" fill="url(#microGridFast)" />

                  {/* Left Precision Obsidian Wedge (Chamfered Bevel) */}
                  <polygon
                    points="0,0 74,100 0,200"
                    fill="url(#obsidianFacetFast)"
                    stroke="rgba(255,255,255,0.15)"
                    strokeWidth="1.5"
                  />

                  {/* Right Precision Obsidian Wedge (Chamfered Bevel) */}
                  <polygon
                    points="200,0 126,100 200,200"
                    fill="url(#obsidianFacetFast)"
                    stroke="rgba(255,255,255,0.15)"
                    strokeWidth="1.5"
                  />

                  {/* High-Tech Axis Seam */}
                  <line
                    x1="74"
                    y1="100"
                    x2="126"
                    y2="100"
                    stroke="#ffffff"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                  />
                  <circle cx="100" cy="100" r="3.5" fill="#ffffff" />
                </svg>

                {/* Anti-Reflective Optical Sapphire Sweep */}
                <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/[0.08] to-transparent pointer-events-none rounded-full" />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Controls / "OPEN" Button */}
      <div
        className="absolute bottom-10 sm:bottom-14 inset-x-0 z-20 flex flex-col items-center gap-2.5 transition-opacity duration-300"
        style={{
          opacity: activated ? 0 : 1,
          pointerEvents: activated ? 'none' : 'auto'
        }}
      >
        <div className="flex items-center gap-2 font-mono text-[11px] text-zinc-500 tracking-wider">
          <span>STANDBY // AWAITING AUTHORIZATION</span>
        </div>

        <button
          onClick={handleOpenClick}
          className="group relative px-9 py-3 rounded-full bg-zinc-950/80 hover:bg-zinc-900 border border-white/20 hover:border-[#008a34]/70 text-white font-mono text-xs tracking-widest transition-all duration-300 flex items-center gap-3 cursor-pointer shadow-[0_4px_25px_rgba(0,0,0,0.6)] hover:shadow-[0_0_25px_rgba(0,138,52,0.25)] active:scale-95"
        >
          <span className="w-1.5 h-1.5 rounded-full bg-[#008a34] shadow-[0_0_6px_#008a34]" />
          <span className="tracking-widest uppercase font-semibold text-zinc-100 group-hover:text-white transition-colors">
            OPEN
          </span>
          <span className="text-zinc-600 group-hover:text-[#008a34] transition-colors text-[10px]">
            [ENTER]
          </span>
        </button>
      </div>

      {/* Smooth Charging Telemetry */}
      <div
        className="absolute bottom-12 sm:bottom-16 inset-x-0 z-20 font-mono text-[11px] text-[#00c84c] tracking-widest uppercase flex items-center justify-center gap-2 transition-opacity duration-300 pointer-events-none"
        style={{
          opacity: activated && watchOpacity > 0 ? 1 : 0
        }}
      >
        <span className="w-1.5 h-1.5 rounded-full bg-[#00c84c] animate-ping" />
        <span>ACTIVATING CHRONO-CALIBER // CALIBRATING FLUX</span>
      </div>
    </div>
  );
};
