import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { Menu, X, ArrowUpRight } from 'lucide-react';

interface TopBarProps {
  currentView: 'home' | 'certifications';
  onNavigate: (view: 'home' | 'certifications') => void;
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
  { id: 'projects', label: 'Projects', href: '#projects' },
  { id: 'skills', label: 'Skills', href: '#skills' },
  { id: 'achievements', label: 'Achievements', href: '#achievements' },
  { id: 'certifications', label: 'Certifications', href: '#certifications' },
];

export const TopBar: React.FC<TopBarProps> = ({
  currentView,
  onNavigate,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState<string | null>(null);

  // Scroll spy: detects active section efficiently without layout thrashing
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
            if (entry.isIntersecting) {
              setActiveSection(item.id);
            }
          });
        },
        { rootMargin: '-20% 0px -60% 0px' }
      );
      obs.observe(el);
      observers.push(obs);
    });

    let scrollTicking = false;
    const handleScrollEdges = () => {
      if (!scrollTicking) {
        scrollTicking = true;
        window.requestAnimationFrame(() => {
          if (window.scrollY < 100) {
            setActiveSection(null);
          } else if (window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 70) {
            setActiveSection('certifications');
          }
          scrollTicking = false;
        });
      }
    };

    window.addEventListener('scroll', handleScrollEdges, { passive: true });

    return () => {
      observers.forEach((obs) => obs.disconnect());
      window.removeEventListener('scroll', handleScrollEdges);
    };
  }, [currentView]);

  const handleNavClick = (href: string, id: string) => {
    setMobileMenuOpen(false);
    setActiveSection(id);

    if (id === 'certifications' && currentView === 'certifications') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }

    if (currentView !== 'home') {
      onNavigate('home');
      setTimeout(() => {
        const el = document.querySelector(href);
        if (el) el.scrollIntoView({ behavior: 'smooth' });
      }, 100);
    } else {
      const el = document.querySelector(href);
      if (el) el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <header className="fixed top-4 inset-x-0 z-50 flex justify-center px-4 pointer-events-none">
      {/* Floating Rounded-Full Glass Pill Container */}
      <div className="pointer-events-auto max-w-4xl w-full rounded-full bg-zinc-950/80 backdrop-blur-2xl border border-white/15 px-5 sm:px-7 py-2 shadow-[0_12px_40px_rgba(0,0,0,0.7),0_0_25px_rgba(0,184,72,0.06),inset_0_1px_0_rgba(255,255,255,0.18)] flex items-center justify-between transition-all duration-300 hover:border-white/25">
        {/* Zone 1: Brand Wordmark */}
        <button
          onClick={() => {
            setActiveSection(null);
            onNavigate('home');
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }}
          className="text-left group flex items-center cursor-pointer py-1"
        >
          <span className="text-xs sm:text-sm font-bold tracking-wider text-white group-hover:text-zinc-200 transition-colors font-dot">
            SOUTRIK<span className="text-[#00b848]">.</span>DUTTA
          </span>
        </button>

        {/* Zone 2: Navigation Links with Transferring Oval Active Pill Animation */}
        <nav className="hidden md:flex items-center gap-1 text-xs font-medium relative">
          {NAV_ITEMS.map((item) => {
            const isActive =
              activeSection === item.id ||
              (item.id === 'certifications' && currentView === 'certifications');

            return (
              <button
                key={item.id}
                onClick={() => handleNavClick(item.href, item.id)}
                className={`relative px-3.5 py-1.5 rounded-full transition-colors duration-200 cursor-pointer text-xs font-medium z-10 ${
                  isActive
                    ? 'text-white font-semibold'
                    : 'text-zinc-200 hover:text-white'
                }`}
              >
                {/* Smooth Animated Oval Pill Transferring with layoutId */}
                {isActive && (
                  <motion.div
                    layoutId="activeNavPill"
                    className="absolute inset-0 rounded-full bg-gradient-to-r from-emerald-500/15 via-white/10 to-emerald-500/15 border border-[#00b848]/40 shadow-[0_0_16px_rgba(0,184,72,0.22),inset_0_1px_1px_rgba(255,255,255,0.3)] backdrop-blur-sm -z-10"
                    transition={{
                      type: 'spring',
                      stiffness: 420,
                      damping: 30,
                      mass: 0.65
                    }}
                  />
                )}
                <span className="relative z-10">{item.label}</span>
              </button>
            );
          })}
        </nav>

        {/* Zone 3: Primary Action & Mobile Toggle (Omnitrix button deleted) */}
        <div className="flex items-center gap-2 sm:gap-3">
          <button
            onClick={() => handleNavClick('#contact', 'contact')}
            className="relative overflow-hidden px-4 sm:px-5 py-2 text-xs font-dot font-semibold text-white bg-zinc-900/90 hover:bg-zinc-800 hover:text-[#00ff66] border border-white/20 hover:border-[#00b848]/60 rounded-full transition-all duration-300 flex items-center gap-1.5 whitespace-nowrap shadow-sm hover:shadow-[0_0_15px_rgba(0,184,72,0.3)] hover:scale-105 active:scale-95 cursor-pointer group tracking-wide"
          >
            <span className="pointer-events-none absolute inset-0 w-1/2 h-full bg-gradient-to-r from-transparent via-[#00ff66]/15 to-transparent animate-shimmer-sweep" />
            <span className="relative z-10 font-medium">Let's Talk</span>
            <ArrowUpRight className="w-3.5 h-3.5 relative z-10 text-[#00ff66] group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
          </button>

          {/* Mobile hamburger */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 text-zinc-300 hover:text-white md:hidden cursor-pointer rounded-full hover:bg-white/10 transition-colors"
            aria-label="Toggle Navigation"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Floating Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="pointer-events-auto absolute top-16 inset-x-4 max-w-sm mx-auto bg-zinc-950/95 backdrop-blur-2xl border border-white/15 rounded-3xl p-4 flex flex-col gap-2 text-xs text-white shadow-2xl font-dot">
          {NAV_ITEMS.map((item, idx) => {
            const isActive = activeSection === item.id;
            return (
              <button
                key={item.id}
                onClick={() => handleNavClick(item.href, item.id)}
                className={`py-2.5 px-4 rounded-full text-left transition-all ${
                  isActive
                    ? 'text-[#00ff66] bg-[#00b848]/15 border border-[#00b848]/30 font-semibold shadow-[0_0_12px_rgba(0,184,72,0.2)]'
                    : 'text-white/90 hover:text-[#00ff66] hover:bg-white/5'
                }`}
              >
                0{idx + 1}. {item.label.toUpperCase()}
              </button>
            );
          })}
          <button
            onClick={() => handleNavClick('#contact', 'contact')}
            className="py-2.5 px-4 rounded-full text-left text-white/90 hover:text-[#00ff66] hover:bg-white/5 transition-all"
          >
            07. CONTACT
          </button>
        </div>
      )}
    </header>
  );
};
