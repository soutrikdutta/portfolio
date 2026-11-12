import React from 'react';
import profilePhoto from '../assets/profile.png';

interface HeroPhotoCardProps {
  onScrollToCertifications?: () => void;
}

export const HeroPhotoCard: React.FC<HeroPhotoCardProps> = () => {
  const imageSrc = localStorage.getItem('soutrik_profile_photo') || profilePhoto;

  return (
    <div className="w-full max-w-[290px] sm:max-w-[316px] lg:max-w-[340px] mx-auto">
      {/* Top micro status bar */}
      <div className="mb-3 flex items-center justify-between px-2 font-mono text-[10px] uppercase tracking-[0.18em] text-zinc-400">
        <span className="flex items-center gap-1.5">
          <span className="w-1.5 h-1.5 rounded-full bg-[#00f59b] animate-ping" />
          <span>PORTRAIT</span>
        </span>
        <span className="text-[#00f59b] font-semibold">SOUTRIK</span>
      </div>

      <div className="relative group">
        {/* Luminous aura behind card */}
        <div
          aria-hidden
          className="pointer-events-none absolute -inset-4 rounded-[2.5rem] bg-[radial-gradient(circle_at_40%_20%,rgba(0,245,155,0.22),transparent_65%)] blur-2xl transition-opacity duration-700 group-hover:opacity-100"
        />

        {/* Ambient offset glass plate */}
        <div className="absolute inset-0 translate-x-2.5 translate-y-2.5 rounded-[1.75rem] border border-white/10 bg-white/[0.02] transition-transform duration-500 group-hover:translate-x-1.5 group-hover:translate-y-1.5" />

        <div className="relative rounded-[1.75rem] overflow-hidden border border-white/15 bg-zinc-950/90 shadow-[0_30px_70px_-20px_rgba(0,0,0,0.85)] group-hover:border-[#00f59b]/40 transition-colors duration-500">
          <div className="relative aspect-[4/5] w-full overflow-hidden bg-zinc-900">
            <img
              src={imageSrc}
              alt="Soutrik Dutta"
              className="w-full h-full object-cover object-top contrast-[1.03] brightness-[1.0] transition-all duration-700 ease-out group-hover:scale-[1.03]"
            />

            {/* Subtle bottom vignette for text contrast */}
            <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-zinc-950/80 via-transparent to-transparent opacity-60" />

            {/* Corner high-tech markers */}
            <span aria-hidden className="pointer-events-none absolute left-3 top-3 h-2.5 w-2.5 border-l-2 border-t-2 border-[#00f59b]/70" />
            <span aria-hidden className="pointer-events-none absolute right-3 top-3 h-2.5 w-2.5 border-r-2 border-t-2 border-[#00f59b]/70" />
            <span aria-hidden className="pointer-events-none absolute bottom-3 left-3 h-2.5 w-2.5 border-b-2 border-l-2 border-[#00f59b]/70" />
            <span aria-hidden className="pointer-events-none absolute bottom-3 right-3 h-2.5 w-2.5 border-b-2 border-r-2 border-[#00f59b]/70" />
          </div>

          {/* Footer strip */}
          <div className="relative flex items-center justify-between gap-2 px-4 py-3.5 border-t border-white/10 bg-zinc-900/80 backdrop-blur-xl">
            <div className="min-w-0">
              <p className="text-[10px] font-mono uppercase tracking-[0.16em] text-zinc-400">Kolkata, India</p>
              <p className="font-dot text-lg font-bold text-white leading-tight truncate">B.Tech CSE (AI/ML)</p>
            </div>
            <span className="shrink-0 inline-flex items-center px-2.5 py-1 rounded-full text-[10px] font-mono font-bold text-[#00f59b] border border-[#00f59b]/35 bg-[#00f59b]/10 shadow-[0_0_12px_rgba(0,245,155,0.2)]">
              2025–2029
            </span>
          </div>
        </div>

        {/* Floating live pill badge */}
        <div className="pointer-events-none absolute -left-3 -bottom-3 hidden sm:flex items-center gap-2 rounded-full border border-white/15 bg-zinc-900/95 backdrop-blur-md px-3.5 py-1.5 shadow-2xl">
          <span className="w-2 h-2 rounded-full bg-[#00f59b] animate-pulse" />
          <span className="text-[10px] font-mono uppercase tracking-[0.14em] text-zinc-200 font-semibold">Dev &amp; AI Builder</span>
        </div>
      </div>
    </div>
  );
};
