import React, { useRef } from 'react';

interface FluxCardProps {
  children: React.ReactNode;
  className?: string;
  glowOnHover?: boolean;
  withCorners?: boolean;
  variant?: 'default' | 'active' | 'subtle';
  onClick?: () => void;
}

export const FluxCard: React.FC<FluxCardProps> = ({
  children,
  className = '',
  glowOnHover = false,
  withCorners = true,
  variant = 'default',
  onClick
}) => {
  const cardRef = useRef<HTMLDivElement>(null);

  const variantStyles = {
    default: 'flux-glass',
    active: 'flux-glass-active',
    subtle: 'bg-zinc-950/40 backdrop-blur-md border border-white/5 hover:border-white/10'
  };

  return (
    <div
      ref={cardRef}
      onClick={onClick}
      className={`relative overflow-hidden rounded-2xl p-6 transition-all duration-300 ${variantStyles[variant]} ${
        onClick ? 'cursor-pointer' : ''
      } ${className}`}
    >

      {/* Top hairline glass reflection */}
      <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent" />

      {/* Children content */}
      <div className="relative z-10">{children}</div>
    </div>
  );
};
