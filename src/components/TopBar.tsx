import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Menu, X, ArrowUpRight, Command } from 'lucide-react';

interface TopBarProps {
  currentView: 'home' | 'certifications';
  onNavigate: (view: 'home' | 'certifications') => void;
  onScrollToSection?: (sectionId: string) => void;
  onOpenCommandPalette?: () => void;
}

interface NavItem {
  id: string;
  label: string;
  href: string;
}

const NAV_ITEMS: NavItem[] = [
  { id: 'about', label: 'About', href: '#about' },
  { id: 'journey', label: 'Journey', href: '#journey' },
  { id: 'projects', label: 'Work', href: '#projects' },
  { id: 'skills', label: 'Skills', href: '#skills' },
  { id: 'achievements', label: 'Awards', href: '#achievements' },
  { id: 'certifications', label: 'Certs', href: '#certifications' },
];

export const TopBar: React.FC<TopBarProps> = ({
  currentView,
  onNavigate,
  onScrollToSection,
  onOpenCommandPalette,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState<string | null>(null);

  useEffect(() => {
    if (currentView === 'certifications') {
      setActiveSection('certifications');
      return;
    }

    const observers: IntersectionObserver[] = [];
    NAV_ITEMS.forEach((item) => {
      const el = document.getElementById(item.id);
      if (!el) return;
      const obs = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) setActiveSection(item.id);
          });
        },
        { rootMargin: '-20% 0px -60% 0px' }
      );
      obs.observe(el);
      observers.push(obs);
    });

    let ticking = false;
    const handleScrollEdges = () => {
      if (!ticking) {
        ticking = true;
        window.requestAnimationFrame(() => {
          if (window.scrollY < 100) {
            setActiveSection(null);
          } else if (window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 70) {
            setActiveSection('certifications');
          }
          ticking = false;
        });
      }
    };

    window.addEventListener('scroll', handleScrollEdges, { passive: true });

    return () => {
      observers.forEach((obs) => obs.disconnect());
      window.removeEventListener('scroll', handleScrollEdges);
    };
  }, [currentView]);

  const scrollToTop = () => {
    const lenis = (window as unknown as { __lenis?: { scrollTo: (target: number, opts: { duration: number }) => void } }).__lenis;
    if (lenis) lenis.scrollTo(0, { duration: 1.2 });
    else window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleNavClick = (href: string, id: string) => {
    setMobileMenuOpen(false);
    setActiveSection(id);

    const lenis = (window as unknown as { __lenis?: { scrollTo: (target: string | HTMLElement | number, opts: { offset?: number; duration?: number }) => void } }).__lenis;

    if (id === 'certifications' && currentView === 'certifications') {
      if (onScrollToSection) onScrollToSection('certifications');
      else scrollToTop();
      return;
    }

    if (currentView !== 'home') {
      if (onScrollToSection) onScrollToSection(id);
      else onNavigate('home');
      return;
    }

    const el = document.querySelector(href) as HTMLElement | null;
    if (el) {
      if (lenis) lenis.scrollTo(el, { offset: -96, duration: 1.2 });
      else el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <motion.header
      initial={{ opacity: 0, y: -14 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1], delay: 0.1 }}
      className="fixed top-[calc(env(safe-area-inset-top)+0.85rem)] sm:top-5 inset-x-0 z-[60] flex justify-center px-3.5 sm:px-4 pointer-events-none"
    >
      <div className="pointer-events-auto w-full max-w-5xl rounded-full border border-white/10 bg-zinc-950/80 backdrop-blur-2xl px-3.5 sm:px-4 py-2 shadow-[0_20px_50px_-20px_rgba(0,0,0,0.8),inset_0_1px_0_rgba(255,255,255,0.1)] flex items-center justify-between gap-3">

        {/* Brand */}
        <button
          onClick={() => {
            setActiveSection(null);
            onNavigate('home');
            scrollToTop();
          }}
          className="group flex items-center gap-2 pl-2 pr-1 cursor-pointer shrink-0"
        >
          <span className="w-2 h-2 rounded-full bg-[#00f59b] animate-pulse" />
          <span className="font-dot text-base sm:text-lg font-bold tracking-tight text-white group-hover:text-[#00f59b] transition-colors leading-none">
            Soutrik Dutta
          </span>
        </button>

        {/* Desktop nav */}
        <nav className="hidden lg:flex items-center gap-1 relative">
          {NAV_ITEMS.map((item) => {
            const isActive =
              activeSection === item.id ||
              (item.id === 'certifications' && currentView === 'certifications');

            return (
              <button
                key={item.id}
                onClick={() => handleNavClick(item.href, item.id)}
                className={`relative px-3.5 py-1.5 rounded-full transition-colors duration-200 cursor-pointer text-xs tracking-wider uppercase font-medium z-10 ${
                  isActive ? 'text-white font-semibold' : 'text-zinc-400 hover:text-white'
                }`}
              >
                {isActive && (
                  <motion.div
                    layoutId="activeNavPill"
                    className="absolute inset-0 rounded-full bg-white/[0.08] border border-white/15 -z-10 shadow-sm"
                    transition={{ type: 'spring', stiffness: 420, damping: 32, mass: 0.6 }}
                  />
                )}
                <span className="relative z-10 flex items-center gap-1.5">
                  {item.label}
                </span>
              </button>
            );
          })}
        </nav>

        {/* Actions */}
        <div className="flex items-center gap-1.5 sm:gap-2">
          {onOpenCommandPalette && (
            <button
              onClick={onOpenCommandPalette}
              className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-full border border-white/10 text-zinc-400 hover:text-white hover:border-white/20 transition-colors cursor-pointer bg-white/[0.03]"
              aria-label="Open command palette"
              title="Command palette"
            >
              <Command className="w-3 h-3 text-[#00f59b]" />
              <span className="font-mono text-[10px] font-bold">⌘K</span>
            </button>
          )}

          <button
            onClick={() => handleNavClick('#contact', 'contact')}
            className="hidden sm:inline-flex items-center gap-1.5 px-4 py-2 text-xs font-bold text-zinc-950 bg-gradient-to-r from-[#00f59b] to-[#00d272] hover:brightness-110 rounded-full transition-all duration-300 tracking-wide hover:shadow-[0_0_20px_rgba(0,245,155,0.45)] hover:scale-[1.03] active:scale-95 cursor-pointer group"
          >
            <span>Let&apos;s talk</span>
            <ArrowUpRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
          </button>

          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="inline-flex items-center justify-center min-w-10 min-h-10 p-2 text-zinc-300 hover:text-white lg:hidden cursor-pointer rounded-full hover:bg-white/5 transition-colors"
            aria-label="Toggle Navigation"
            aria-expanded={mobileMenuOpen}
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile drawer */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -8, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -8, scale: 0.98 }}
            transition={{ duration: 0.22, ease: [0.22, 1, 0.36, 1] }}
            className="pointer-events-auto absolute top-[4.4rem] inset-x-4 max-w-sm mx-auto surface p-3.5 flex flex-col text-white shadow-2xl lg:hidden border-white/15 bg-zinc-950/95"
          >
            {NAV_ITEMS.map((item, idx) => {
              const isActive = activeSection === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => handleNavClick(item.href, item.id)}
                  className={`py-2.5 px-3.5 rounded-xl text-left transition-all text-sm flex items-center justify-between ${
                    isActive
                      ? 'text-[#00f59b] bg-[#00f59b]/10 font-semibold'
                      : 'text-zinc-300 hover:text-white hover:bg-white/[0.04]'
                  }`}
                >
                  <span>{item.label}</span>
                  <span className="font-mono text-[10px] text-zinc-500">0{idx + 1}</span>
                </button>
              );
            })}
            <button
              onClick={() => handleNavClick('#contact', 'contact')}
              className="mt-1 py-2.5 px-3.5 rounded-xl text-left text-sm text-zinc-950 bg-gradient-to-r from-[#00f59b] to-[#00d272] font-bold flex items-center justify-between"
            >
              <span>Contact</span>
              <ArrowUpRight className="w-4 h-4" />
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
};
