import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import Lenis from 'lenis';
import 'lenis/dist/lenis.css';

import { TopBar } from './components/TopBar';
import { HeroSection } from './components/HeroSection';
import { AboutSection } from './components/AboutSection';
import { JourneySection } from './components/JourneySection';
import { ProjectsSection } from './components/ProjectsSection';
import { SkillsSection } from './components/SkillsSection';
import { AchievementsSection } from './components/AchievementsSection';
import { CertificationsSection } from './components/CertificationsSection';
import { CertificationsPage } from './components/CertificationsPage';
import { ContactSection } from './components/ContactSection';
import { Footer } from './components/Footer';
import { InteractiveDotBackground } from './components/InteractiveDotBackground';
import { CustomCursor } from './components/CustomCursor';
import { ScrollProgressBar } from './components/ScrollProgressBar';
import { CommandPalette } from './components/CommandPalette';
import { LiveDemoUnavailableModal } from './components/LiveDemoUnavailableModal';
import { ScrollToTopButton } from './components/ScrollToTopButton';

export default function App() {
  const [currentView, setCurrentView] = useState<'home' | 'certifications'>('home');
  const [isCommandPaletteOpen, setIsCommandPaletteOpen] = useState(false);

  // Initialize buttery-smooth momentum scrolling with Lenis
  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      return;
    }

    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: 'vertical',
      gestureOrientation: 'vertical',
      smoothWheel: true,
      wheelMultiplier: 1.05,
      touchMultiplier: 1.2,
    });

    (window as unknown as { __lenis?: Lenis }).__lenis = lenis;

    let rafId: number;
    function raf(time: number) {
      lenis.raf(time);
      rafId = requestAnimationFrame(raf);
    }
    rafId = requestAnimationFrame(raf);

    return () => {
      cancelAnimationFrame(rafId);
      lenis.destroy();
      delete (window as unknown as { __lenis?: Lenis }).__lenis;
    };
  }, []);

  // Pause Lenis when command palette is open
  useEffect(() => {
    const lenis = (window as unknown as { __lenis?: Lenis }).__lenis;
    if (lenis) {
      if (isCommandPaletteOpen) {
        lenis.stop();
      } else {
        lenis.start();
      }
    }
  }, [isCommandPaletteOpen]);

  const scrollToSection = (sectionId: string) => {
    const lenis = (window as unknown as { __lenis?: Lenis }).__lenis;

    if (currentView !== 'home') {
      setCurrentView('home');
      setTimeout(() => {
        const el = document.getElementById(sectionId);
        if (el) {
          if (lenis) {
            lenis.scrollTo(el, { offset: -70, duration: 1.2 });
          } else {
            el.scrollIntoView({ behavior: 'smooth' });
          }
        }
      }, 100);
    } else {
      const el = document.getElementById(sectionId);
      if (el) {
        if (lenis) {
          lenis.scrollTo(el, { offset: -70, duration: 1.2 });
        } else {
          el.scrollIntoView({ behavior: 'smooth' });
        }
      }
    }
  };

  const openCertificationsView = () => {
    try {
      window.history.pushState({ view: 'certifications' }, '', '#all-certifications');
    } catch (_) {}
    setCurrentView('certifications');
    const lenis = (window as unknown as { __lenis?: Lenis }).__lenis;
    if (lenis) {
      lenis.scrollTo(0, { duration: 0.1 });
    } else {
      window.scrollTo({ top: 0, behavior: 'instant' });
    }
  };

  const backToPortfolioFromCertifications = () => {
    document.body.style.overflow = '';
    setCurrentView('home');
    try {
      if (window.location.hash === '#all-certifications') {
        window.history.replaceState({ view: 'home' }, '', '#certifications');
      }
    } catch (_) {}

    // Scroll back to the Certifications section on the home page with silky easing
    setTimeout(() => {
      document.body.style.overflow = '';
      const el = document.getElementById('certifications');
      const lenis = (window as unknown as { __lenis?: Lenis }).__lenis;
      if (el) {
        if (lenis) {
          lenis.scrollTo(el, { offset: -70, duration: 1 });
        } else {
          el.scrollIntoView({ behavior: 'auto', block: 'start' });
        }
      }
    }, 40);
  };

  // Support browser native back button to return to certifications section
  useEffect(() => {
    const handlePopState = (e: PopStateEvent) => {
      if (currentView === 'certifications' && (!e.state || e.state.view !== 'certifications')) {
        document.body.style.overflow = '';
        setCurrentView('home');
        setTimeout(() => {
          document.body.style.overflow = '';
          const el = document.getElementById('certifications');
          const lenis = (window as unknown as { __lenis?: Lenis }).__lenis;
          if (el) {
            if (lenis) {
              lenis.scrollTo(el, { offset: -70, duration: 1 });
            } else {
              el.scrollIntoView({ behavior: 'auto', block: 'start' });
            }
          }
        }, 40);
      }
    };

    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, [currentView]);

  const handleNavigateFromCommand = (target: string) => {
    if (target.startsWith('#')) {
      const id = target.substring(1);
      scrollToSection(id);
    }
  };

  return (
    <div className="min-h-screen bg-[#040504] text-zinc-100 flex flex-col font-space selection:bg-[#00b848]/30 selection:text-white relative">
      {/* Ambient atmosphere — radial gradient */}
      <div
        className="pointer-events-none fixed inset-0 z-0"
        style={{
          background: `
            radial-gradient(ellipse 60% 50% at 15% 20%, rgba(0,184,72,0.07) 0%, transparent 70%),
            radial-gradient(ellipse 55% 45% at 85% 75%, rgba(6,182,212,0.06) 0%, transparent 70%)
          `,
        }}
      />

      {/* Interactive Cursor-Reactive Light Dot Background */}
      <InteractiveDotBackground />

      {/* Cyber Reticle Custom Cursor */}
      <CustomCursor />

      {/* Real-time Scroll Depth Indicator */}
      <ScrollProgressBar />

      {/* Nothing OS Top Bar Navigation */}
      <TopBar
        currentView={currentView}
        onNavigate={(view) => {
          if (view === 'home' && currentView === 'certifications') {
            backToPortfolioFromCertifications();
          } else if (view === 'certifications') {
            openCertificationsView();
          } else {
            setCurrentView(view);
          }
        }}
        onOpenCommandPalette={() => setIsCommandPaletteOpen(true)}
      />

      {/* Keyboard-Triggered & Clickable Command Palette HUD */}
      <CommandPalette
        isOpen={isCommandPaletteOpen}
        onClose={() => setIsCommandPaletteOpen(false)}
        onNavigateSection={handleNavigateFromCommand}
        onOpenCertifications={openCertificationsView}
      />

      {/* High-Traffic Live Demo Notice Modal */}
      <LiveDemoUnavailableModal onNavigateToContact={() => scrollToSection('contact')} />

      {/* Main View Router */}
      <main className="flex-1">
        <AnimatePresence mode="wait">
          {currentView === 'home' ? (
            <motion.div
              key="home"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
            >
              {/* Hero Section with Jumbled Pixel Decrypt Animation & Channels */}
              <HeroSection
                onScrollToProjects={() => scrollToSection('projects')}
                onScrollToContact={() => scrollToSection('contact')}
                onScrollToCertifications={() => scrollToSection('certifications')}
              />

              {/* About Me Section with Requested Bio & Spec Box */}
              <AboutSection />

              {/* My Journey Section with Active TIU CSE Radar State */}
              <JourneySection />

              {/* Projects Section with 2 Builds, Images & Editable Demo Copy */}
              <ProjectsSection />

              {/* Technical Skills Section in Liquid Flux Box with Logos */}
              <SkillsSection />

              {/* Achievements Section with Balanced 3-Item Layout & Visuals */}
              <AchievementsSection />

              {/* Certifications Preview Section with "View All" Button */}
              <CertificationsSection onViewAllCertifications={openCertificationsView} />

              {/* "Let's Build Something" Section with Direct Channels & Message Box */}
              <ContactSection />
            </motion.div>
          ) : (
            /* Dedicated Certifications Page View */
            <motion.div
              key="certifications"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -16 }}
              transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
            >
              <CertificationsPage onBack={backToPortfolioFromCertifications} />
            </motion.div>
          )}
        </AnimatePresence>
      </main>

      {/* Floating Scroll to Top Button with SVG Circular Progress */}
      <ScrollToTopButton />

      {/* Nothing OS Minimalist Footer */}
      <Footer />
    </div>
  );
}
