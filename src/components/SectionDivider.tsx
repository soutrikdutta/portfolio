import React from 'react';

export interface SectionDividerProps {
  className?: string;
}

export const SectionDivider: React.FC<SectionDividerProps> = ({ className = '' }) => {
  return <div className={`w-full h-6 sm:h-10 ${className} pointer-events-none select-none`} aria-hidden="true" />;
};

export default SectionDivider;
