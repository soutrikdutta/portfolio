import React from 'react';

interface ProjectMockupVisualProps {
  type: 'workspace' | 'genai';
  title: string;
}

export const ProjectMockupVisual: React.FC<ProjectMockupVisualProps> = ({ type }) => {
  if (type === 'workspace') {
    return (
      <div className="relative w-full aspect-[16/10] bg-[#090d0b] rounded-xl overflow-hidden border border-white/10 group shadow-[0_4px_30px_rgba(0,184,72,0.06)]">
        {/* Colorful Ambient Glow */}
        <div className="pointer-events-none absolute -top-12 -left-12 w-48 h-48 bg-[#00b848]/15 rounded-full blur-3xl" />
        <div className="pointer-events-none absolute -bottom-12 -right-12 w-48 h-48 bg-[#06b6d4]/15 rounded-full blur-3xl" />
        <div className="absolute inset-0 nothing-dot-grid-subtle opacity-25" />
        
        {/* Subtle Cyber Laser Scan Line */}
        <div className="pointer-events-none absolute inset-x-0 h-16 bg-gradient-to-b from-transparent via-[#00b848]/20 to-transparent animate-scan-line z-20 opacity-70" />

        {/* Top OS Window Header */}
        <div className="relative z-10 flex items-center justify-between px-4 py-2.5 bg-black/80 border-b border-white/10 backdrop-blur-md">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-[#ef4444]" />
            <span className="w-2.5 h-2.5 rounded-full bg-[#eab308]" />
            <span className="w-2.5 h-2.5 rounded-full bg-[#00b848]" />
            <span className="text-[11px] font-mono text-zinc-300 ml-2 tracking-wide">
              skillgrad.platform.local:3000
            </span>
          </div>
          <div className="flex items-center gap-1.5 text-[10px] font-mono text-[#00b848] bg-[#00b848]/15 px-2.5 py-0.5 rounded-full border border-[#00b848]/35 font-medium shadow-[0_0_8px_rgba(0,184,72,0.2)]">
            <span className="w-1.5 h-1.5 rounded-full bg-[#00b848] active-pulse" />
            STATUS: ONLINE
          </div>
        </div>

        {/* Dashboard Graphic Canvas */}
        <div className="relative z-10 p-5 grid grid-cols-12 gap-3 h-[calc(100%-42px)]">
          {/* Left panel - Metric cards */}
          <div className="col-span-4 flex flex-col gap-2.5">
            <div className="p-3 bg-zinc-900/90 rounded-xl border border-white/10 shadow-sm">
              <div className="text-[9px] font-mono text-cyan-400 uppercase tracking-wider font-semibold">
                Live Projects
              </div>
              <div className="text-xl font-mono font-bold text-white mt-0.5 flex items-baseline gap-1">
                <span>48+</span>
                <span className="text-[10px] text-emerald-400 font-normal">+14 this wk</span>
              </div>
              <div className="h-5 mt-2 flex items-end gap-1">
                {[30, 45, 60, 50, 75, 90, 85, 95].map((val, i) => (
                  <div
                    key={i}
                    style={{ height: `${val}%` }}
                    className="flex-1 bg-gradient-to-t from-[#00b848] to-[#06b6d4] rounded-t-sm opacity-80 group-hover:opacity-100 transition-opacity"
                  />
                ))}
              </div>
            </div>

            <div className="p-3 bg-zinc-900/90 rounded-xl border border-white/10 flex-1 flex flex-col justify-between shadow-sm">
              <div className="text-[9px] font-mono text-emerald-400 uppercase tracking-wider font-semibold">
                Services Cloud
              </div>
              <div className="space-y-1.5 my-1">
                {[
                  { name: 'auth.firebase', ping: '12ms', color: '#f59e0b' },
                  { name: 'firestore.db', ping: '18ms', color: '#06b6d4' },
                  { name: 'match.engine', ping: '24ms', color: '#a855f7' }
                ].map((item, idx) => (
                  <div key={idx} className="flex items-center justify-between text-[11px] font-mono text-zinc-300">
                    <span className="flex items-center gap-1.5">
                      <span className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: item.color }} />
                      <span className="truncate">{item.name}</span>
                    </span>
                    <span className="text-zinc-400 text-[10px]">{item.ping}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right panel - Colorful Code Editor */}
          <div className="col-span-8 flex flex-col bg-black/80 rounded-xl border border-white/10 p-3.5 shadow-sm">
            <div className="flex items-center justify-between border-b border-white/10 pb-2 mb-2">
              <span className="text-[10px] font-mono text-cyan-300 flex items-center gap-1.5">
                <span className="w-2 h-2 rounded bg-cyan-500/30 border border-cyan-400" />
                skillgrad_pipeline.ts
              </span>
              <span className="text-[10px] font-dot text-[#00b848] bg-[#00b848]/15 px-1.5 py-0.5 rounded border border-[#00b848]/30">
                FLUX_V2
              </span>
            </div>
            <pre className="font-mono text-[10px] leading-relaxed overflow-hidden">
              <code>
                <span className="text-zinc-500">// Student opportunity matching stream</span>
                {'\n'}
                <span className="text-[#c084fc] font-semibold">const</span>{' '}
                <span className="text-[#38bdf8]">pipeline</span> ={' '}
                <span className="text-[#fde047]">initMatching</span>({'{'}
                {'\n'}  role: <span className="text-[#4ade80]">&apos;Web Engineering&apos;</span>,
                {'\n'}  stipend: <span className="text-[#4ade80]">&apos;Industry Standard&apos;</span>,
                {'\n'}  verified: <span className="text-[#f43f5e]">true</span>
                {'\n'}{'}'});
                {'\n'}
                <span className="text-[#38bdf8]">pipeline</span>.<span className="text-[#fde047]">dispatch</span>((<span className="text-[#fb923c]">match</span>) =&gt; <span className="text-[#fde047]">notify</span>(match));
              </code>
            </pre>
            <div className="mt-auto pt-2 border-t border-white/10 flex items-center justify-between text-[10px] font-mono">
              <span className="text-zinc-400">MATCH RATE: <strong className="text-emerald-400">94.2%</strong></span>
              <span className="text-[#00b848] font-bold bg-[#00b848]/15 px-2 py-0.5 rounded">VERIFIED</span>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // SHARODSHAV Map / Pandal HUD Mockup with Vibrant Festival & Radar Colors
  return (
    <div className="relative w-full aspect-[16/10] bg-[#0b0809] rounded-xl overflow-hidden border border-white/10 group shadow-[0_4px_30px_rgba(239,68,68,0.06)]">
      {/* Colorful Ambient Glow: Rose & Amber for Kolkata Festival + Emerald for Tech Radar */}
      <div className="pointer-events-none absolute -top-12 -left-12 w-48 h-48 bg-rose-500/15 rounded-full blur-3xl" />
      <div className="pointer-events-none absolute -bottom-12 -right-12 w-48 h-48 bg-amber-500/15 rounded-full blur-3xl" />
      <div className="absolute inset-0 nothing-dot-grid-subtle opacity-25" />

      {/* Subtle Cyber Laser Scan Line */}
      <div className="pointer-events-none absolute inset-x-0 h-16 bg-gradient-to-b from-transparent via-rose-500/20 to-transparent animate-scan-line z-20 opacity-70" />

      {/* Top OS Window Header */}
      <div className="relative z-10 flex items-center justify-between px-4 py-2.5 bg-black/80 border-b border-white/10 backdrop-blur-md">
        <div className="flex items-center gap-2">
          <span className="w-2.5 h-2.5 rounded-full bg-[#ef4444]" />
          <span className="w-2.5 h-2.5 rounded-full bg-[#eab308]" />
          <span className="w-2.5 h-2.5 rounded-full bg-[#00b848]" />
          <span className="text-[11px] font-mono text-zinc-300 ml-2 tracking-wide">
            sharodshav.kolkata.planner:4000
          </span>
        </div>
        <div className="text-[10px] font-mono text-rose-400 bg-rose-500/15 px-2.5 py-0.5 rounded-full border border-rose-500/35 flex items-center gap-1.5 font-medium shadow-[0_0_8px_rgba(244,63,94,0.2)]">
          <span className="w-1.5 h-1.5 rounded-full bg-rose-500 active-pulse" />
          FESTIVE RADAR LIVE
        </div>
      </div>

      <div className="relative z-10 p-5 h-[calc(100%-42px)] flex flex-col justify-between">
        <div className="grid grid-cols-3 gap-3 my-auto">
          {/* Location Card */}
          <div className="p-3 bg-zinc-900/90 rounded-xl border border-rose-500/20 shadow-sm">
            <div className="text-[9px] font-mono text-rose-400 font-semibold uppercase">LOCATION HUD</div>
            <div className="text-xs font-mono font-bold text-white mt-1">Kolkata Metro</div>
            <div className="mt-2 text-[10px] text-amber-400 font-mono font-medium">120+ Pandals Mapped</div>
          </div>

          {/* Route Optimizer Card */}
          <div className="p-3 bg-zinc-950 rounded-xl border border-emerald-500/40 shadow-[0_0_15px_rgba(0,184,72,0.1)]">
            <div className="text-[9px] font-mono text-emerald-400 font-semibold uppercase">ROUTE OPTIMIZER</div>
            <div className="text-xs font-mono font-bold text-white mt-1">Geo Cluster Node</div>
            <div className="mt-2 flex items-center gap-1.5 text-[10px] text-emerald-300 font-mono">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
              </span>
              Calculated 180ms
            </div>
          </div>

          {/* Transit Flow Card */}
          <div className="p-3 bg-zinc-900/90 rounded-xl border border-amber-500/20 shadow-sm">
            <div className="text-[9px] font-mono text-amber-400 font-semibold uppercase">TRANSIT FLOW</div>
            <div className="text-xs font-mono font-bold text-white mt-1">Crowd Density</div>
            <div className="mt-2 text-[10px] text-cyan-400 font-mono">Surge: Normal</div>
          </div>
        </div>

        {/* Terminal Nav Prompt */}
        <div className="mt-3 p-2.5 bg-black/85 rounded-xl border border-white/10 flex items-center justify-between shadow-sm">
          <div className="flex items-center gap-2">
            <span className="text-[#00b848] font-mono font-bold text-xs">&gt;</span>
            <span className="font-mono text-[11px] text-zinc-300">
              <span className="text-[#fde047]">navigatePandal</span>(<span className="text-[#4ade80]">&quot;MaddoxSquare&quot;</span>, <span className="text-[#4ade80]">&quot;Bagbazar&quot;</span>)
            </span>
          </div>
          <span className="font-dot text-[11px] text-emerald-400 bg-emerald-500/15 px-2 py-0.5 rounded border border-emerald-500/30 font-semibold">
            OPTIMAL ROUTE
          </span>
        </div>
      </div>
    </div>
  );
};
