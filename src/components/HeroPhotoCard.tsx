import React from 'react';
import profilePhoto from '../assets/profile.png';

interface HeroPhotoCardProps {
  onScrollToCertifications?: () => void;
}

export const HeroPhotoCard: React.FC<HeroPhotoCardProps> = () => {
  const imageSrc = localStorage.getItem('soutrik_profile_photo') || profilePhoto;

  return (
    <div className="relative w-full max-w-[240px] sm:max-w-[260px] mx-auto group">
      {/* Soft Ambient Depth Glow Base */}
      <div className="pointer-events-none absolute -inset-3 bg-gradient-to-tr from-[#00b848]/15 via-[#06b6d4]/10 to-transparent rounded-3xl blur-2xl opacity-40 group-hover:opacity-60 transition-opacity" />

      {/* Main Photo Glass Card Frame */}
      <div className="relative rounded-2xl bg-zinc-950/80 backdrop-blur-xl border border-white/10 p-2.5 sm:p-3 shadow-[0_16px_45px_rgba(0,0,0,0.8)] overflow-hidden transition-all duration-300 group-hover:border-[#00b848]/40">
        {/* Futuristic Corner Tech Accents */}
        <span className="absolute top-2 left-2 w-2 h-2 border-t border-l border-[#00b848]/60 pointer-events-none" />
        <span className="absolute top-2 right-2 w-2 h-2 border-t border-r border-[#00b848]/60 pointer-events-none" />
        <span className="absolute bottom-2 left-2 w-2 h-2 border-b border-l border-[#00b848]/60 pointer-events-none" />
        <span className="absolute bottom-2 right-2 w-2 h-2 border-b border-r border-[#00b848]/60 pointer-events-none" />

        {/* Photo Display Window */}
        <div className="relative aspect-[4/5] w-full rounded-xl overflow-hidden bg-zinc-900 border border-white/10 flex items-center justify-center">
          <img
            src={imageSrc}
            alt="Soutrik Dutta"
            className="w-full h-full object-cover object-top grayscale contrast-110 brightness-95 transition-transform duration-500 group-hover:scale-[1.02]"
          />
        </div>
      </div>
    </div>
  );
};
