import React, { useState, useEffect } from 'react';
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
import { SectionDivider } from './components/SectionDivider';
import { CommandPalette } from './components/CommandPalette';
import { LiveDemoUnavailableModal } from './components/LiveDemoUnavailableModal';

export default function App() {
  const [currentView, setCurrentView] = useState<'home' | 'certifications'>('home');
  const [isCommandPaletteOpen, setIsCommandPaletteOpen] = useState(false);

  const scrollToSection = (sectionId: string) => {
    if (currentView !== 'home') {
      setCurrentView('home');
      setTimeout(() => {
        const el = document.getElementById(sectionId);
        if (el) el.scrollIntoView({ behavior: 'smooth' });
      }, 100);
    } else {
      const el = document.getElementById(sectionId);
      if (el) el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const openCertificationsView = () => {
    try {
      window.history.pushState({ view: 'certifications' }, '', '#all-certifications');
    } catch (_) {}
    setCurrentView('certifications');
    window.scrollTo({ top: 0, behavior: 'instant' });
  };

  const backToPortfolioFromCertifications = () => {
    document.body.style.overflow = '';
    setCurrentView('home');
    try {
      if (window.location.hash === '#all-certifications') {
        window.history.replaceState({ view: 'home' }, '', '#certifications');
      }
    } catch (_) {}

    // Scroll back to the Certifications section on the home page with auto behavior
    setTimeout(() => {
      document.body.style.overflow = '';
      const el = document.getElementById('certifications');
      if (el) {
        el.scrollIntoView({ behavior: 'auto', block: 'start' });
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
          if (el) {
            el.scrollIntoView({ behavior: 'auto', block: 'start' });
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
      {/* Ambient Color Depth Atmosphere - Floating Living Luminous Auroras */}
      <div className="pointer-events-none fixed inset-0 z-0 overflow-hidden transform-gpu will-change-transform opacity-90">
        <div className="absolute top-[5%] left-[8%] w-[550px] h-[550px] rounded-full bg-emerald-500/[0.12] blur-[140px] animate-float-subtle" />
        <div className="absolute top-[32%] right-[5%] w-[500px] h-[500px] rounded-full bg-cyan-500/[0.09] blur-[130px] animate-float-delayed" />
        <div className="absolute top-[58%] left-[5%] w-[520px] h-[520px] rounded-full bg-purple-600/[0.07] blur-[150px] animate-float-subtle" />
        <div className="absolute top-[82%] right-[10%] w-[560px] h-[560px] rounded-full bg-emerald-500/[0.11] blur-[140px] animate-float-delayed" />
      </div>

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
        {currentView === 'home' ? (
          <>
            {/* Hero Section with Jumbled Pixel Decrypt Animation & Channels */}
            <HeroSection
              onScrollToProjects={() => scrollToSection('projects')}
              onScrollToContact={() => scrollToSection('contact')}
              onScrollToCertifications={() => scrollToSection('certifications')}
            />

            <SectionDivider />

            {/* About Me Section with Requested Bio & Spec Box */}
            <AboutSection />

            <SectionDivider />

            {/* My Journey Section with Active TIU CSE Radar State */}
            <JourneySection />

            <SectionDivider />

            {/* Projects Section with 2 Builds, Images & Editable Demo Copy */}
            <ProjectsSection />

            <SectionDivider />

            {/* Technical Skills Section in Liquid Flux Box with Logos */}
            <SkillsSection />

            <SectionDivider />

            {/* Achievements Section with Balanced 3-Item Layout & Visuals */}
            <AchievementsSection />

            <SectionDivider />

            {/* Certifications Preview Section with "View All" Button */}
            <CertificationsSection onViewAllCertifications={openCertificationsView} />

            {/* "Let's Build Something" Section with Direct Channels & Message Box */}
            <ContactSection />
          </>
        ) : (
          /* Dedicated Certifications Page View */
          <CertificationsPage onBack={backToPortfolioFromCertifications} />
        )}
      </main>

      {/* Nothing OS Minimalist Footer */}
      <Footer />
    </div>
  );
}
