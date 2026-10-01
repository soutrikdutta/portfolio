import React from 'react';
import { Trophy, Code2, Award, Sparkles, Flame, CheckCircle2 } from 'lucide-react';

interface AchievementVisualProps {
  type: 'trophy' | 'code' | 'scholar';
  title: string;
}

export const AchievementVisual: React.FC<AchievementVisualProps> = ({ type }) => {
  if (type === 'trophy') {
    return (
      <div className="relative w-full aspect-[16/9] rounded-xl overflow-hidden bg-gradient-to-br from-amber-950/40 via-zinc-950 to-black border border-amber-500/25 p-5 flex flex-col justify-between group shadow-[0_4px_24px_rgba(245,158,11,0.08)]">
        {/* Amber Ambient Aura */}
        <div className="pointer-events-none absolute -top-10 -right-10 w-40 h-40 bg-amber-500/15 rounded-full blur-2xl" />
        <div className="absolute inset-0 nothing-dot-grid-subtle opacity-25" />
        
        <div className="relative z-10 flex items-center justify-between">
          <span className="font-mono text-[10px] text-amber-400/90 tracking-wider flex items-center gap-1.5">
            <Sparkles className="w-3 h-3 text-amber-400" />
            TIU INNOVATION RUN
          </span>
          <span className="font-dot text-xs text-amber-300 bg-amber-500/20 px-2.5 py-0.5 rounded-full border border-amber-500/40 font-semibold shadow-[0_0_10px_rgba(245,158,11,0.2)]">
            1ST RUNNER UP
          </span>
        </div>

        <div className="relative z-10 flex items-center gap-4 my-auto">
          <div className="w-12 h-12 rounded-xl bg-amber-500/15 border border-amber-500/35 flex items-center justify-center shadow-[0_0_16px_rgba(245,158,11,0.25)]">
            <Trophy className="w-6 h-6 text-amber-400 drop-shadow-[0_0_8px_rgba(245,158,11,0.6)]" />
          </div>
          <div>
            <div className="font-mono text-sm font-bold text-white tracking-wide group-hover:text-amber-200 transition-colors">
              36H HACKATHON PODIUM
            </div>
            <div className="text-xs font-mono text-zinc-400 mt-0.5">
              85+ University Engineering Teams
            </div>
          </div>
        </div>

        <div className="relative z-10 flex items-center justify-between pt-2 border-t border-amber-500/15 text-[10px] font-mono">
          <span className="text-zinc-400">CAMPUS DIVISION</span>
          <span className="text-amber-400 font-semibold flex items-center gap-1">
            <CheckCircle2 className="w-3 h-3 text-amber-400" />
            DISTINCTION CONFERRED
          </span>
        </div>
      </div>
    );
  }

  if (type === 'code') {
    return (
      <div className="relative w-full aspect-[16/9] rounded-xl overflow-hidden bg-gradient-to-br from-cyan-950/40 via-zinc-950 to-black border border-cyan-500/25 p-5 flex flex-col justify-between group shadow-[0_4px_24px_rgba(6,182,212,0.08)]">
        {/* Cyan Ambient Aura */}
        <div className="pointer-events-none absolute -top-10 -right-10 w-40 h-40 bg-cyan-500/15 rounded-full blur-2xl" />
        <div className="absolute inset-0 nothing-dot-grid-subtle opacity-25" />

        <div className="relative z-10 flex items-center justify-between">
          <span className="font-mono text-[10px] text-cyan-400/90 tracking-wider flex items-center gap-1.5">
            <Flame className="w-3 h-3 text-cyan-400" />
            COMPETITIVE METRICS
          </span>
          <span className="font-dot text-xs text-cyan-300 bg-cyan-500/20 px-2.5 py-0.5 rounded-full border border-cyan-500/40 font-semibold shadow-[0_0_10px_rgba(6,182,212,0.2)]">
            TOP 5%
          </span>
        </div>

        <div className="relative z-10 flex items-center gap-4 my-auto">
          <div className="w-12 h-12 rounded-xl bg-cyan-500/15 border border-cyan-500/35 flex items-center justify-center shadow-[0_0_16px_rgba(6,182,212,0.25)]">
            <Code2 className="w-6 h-6 text-cyan-400 drop-shadow-[0_0_8px_rgba(6,182,212,0.6)]" />
          </div>
          <div>
            <div className="font-mono text-sm font-bold text-white tracking-wide group-hover:text-cyan-200 transition-colors">
              200+ PROBLEMS SOLVED
            </div>
            <div className="text-xs font-mono text-zinc-400 mt-0.5">
              120-Day Continuous Solving Streak
            </div>
          </div>
        </div>

        <div className="relative z-10 flex items-center justify-between pt-2 border-t border-cyan-500/15 text-[10px] font-mono">
          <span className="text-zinc-400">ALGORITHMIC EFFICIENCY</span>
          <span className="text-cyan-400 font-semibold flex items-center gap-1">
            <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse" />
            DAILY STREAK
          </span>
        </div>
      </div>
    );
  }

  return (
    <div className="relative w-full aspect-[16/9] rounded-xl overflow-hidden bg-gradient-to-br from-purple-950/40 via-zinc-950 to-black border border-purple-500/25 p-5 flex flex-col justify-between group shadow-[0_4px_24px_rgba(168,85,247,0.08)]">
      {/* Purple Ambient Aura */}
      <div className="pointer-events-none absolute -top-10 -right-10 w-40 h-40 bg-purple-500/15 rounded-full blur-2xl" />
      <div className="absolute inset-0 nothing-dot-grid-subtle opacity-25" />

      <div className="relative z-10 flex items-center justify-between">
        <span className="font-mono text-[10px] text-purple-400/90 tracking-wider flex items-center gap-1.5">
          <Award className="w-3 h-3 text-purple-400" />
          ST. STEPHEN&apos;S SCHOOL
        </span>
        <span className="font-dot text-xs text-purple-300 bg-purple-500/20 px-2.5 py-0.5 rounded-full border border-purple-500/40 font-semibold shadow-[0_0_10px_rgba(168,85,247,0.2)]">
          SCHOLAR
        </span>
      </div>

      <div className="relative z-10 flex items-center gap-4 my-auto">
        <div className="w-12 h-12 rounded-xl bg-purple-500/15 border border-purple-500/35 flex items-center justify-center shadow-[0_0_16px_rgba(168,85,247,0.25)]">
          <Award className="w-6 h-6 text-purple-400 drop-shadow-[0_0_8px_rgba(168,85,247,0.6)]" />
        </div>
        <div>
          <div className="font-mono text-sm font-bold text-white tracking-wide group-hover:text-purple-200 transition-colors">
            CLASS OF 2025 MERIT
          </div>
          <div className="text-xs font-mono text-zinc-400 mt-0.5">
            Excellence in CS &amp; Mathematics
          </div>
        </div>
      </div>

      <div className="relative z-10 flex items-center justify-between pt-2 border-t border-purple-500/15 text-[10px] font-mono">
        <span className="text-zinc-400">HONOR ROLL</span>
        <span className="text-purple-400 font-semibold flex items-center gap-1">
          <CheckCircle2 className="w-3 h-3 text-purple-400" />
          COMMENDED
        </span>
      </div>
    </div>
  );
};
