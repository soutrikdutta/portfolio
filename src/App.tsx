import React, { useState, useEffect } from "react";
import { Navbar } from "./components/Navbar";
import { Hero } from "./components/Hero";
import { About } from "./components/About";
import { Journey } from "./components/Journey";
import { Projects } from "./components/Projects";
import { Skills } from "./components/Skills";
import { Achievements } from "./components/Achievements";
import { Certifications } from "./components/Certifications";
import { Contact } from "./components/Contact";
import { Footer } from "./components/Footer";
import { DynamicBackground } from "./components/DynamicBackground";
import { ArrowUp } from "lucide-react";

export const App: React.FC = () => {
  const [activeSection, setActiveSection] = useState("hero");
  const [showBackToTop, setShowBackToTop] = useState(false);

  useEffect(() => {
    const sectionIds = ["hero", "about", "journey", "projects", "skills", "achievements", "certifications", "contact"];

    const handleScroll = () => {
      // Trigger threshold line below the floating navbar
      const scrollPosition = window.scrollY + 220;

      for (let i = sectionIds.length - 1; i >= 0; i--) {
        const id = sectionIds[i];
        const element = document.getElementById(id);
        if (element) {
          const top = element.offsetTop;
          if (scrollPosition >= top) {
            setActiveSection(id);
            break;
          }
        }
      }

      setShowBackToTop(window.scrollY > 400);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll(); // Initial check on mount

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div className="relative min-h-screen text-[#f4f4f6] selection:bg-white/10 selection:text-white font-sans antialiased overflow-x-hidden">
      {/* Live Dynamic Background (Calm, high-performance, non-AI) */}
      <DynamicBackground />

      <div className="relative z-10">
        {/* Floating Frosted Navigation */}
        <Navbar activeSection={activeSection} />

        {/* Main Content Sections */}
        <main id="main-content">
          <Hero />
          <About />
          <Journey />
          <Projects />
          <Skills />
          <Achievements />
          <Certifications />
          <Contact />
        </main>

        {/* Minimal Footer */}
        <Footer />
      </div>

      {/* Floating Back to Top Button */}
      {showBackToTop && (
        <button
          type="button"
          onClick={scrollToTop}
          className="fixed bottom-6 right-6 z-40 p-2.5 rounded-full bg-[#0d1017]/80 backdrop-blur-md border border-white/[0.10] hover:border-white/[0.25] text-zinc-400 hover:text-white shadow-xl hover:-translate-y-0.5 transition-all duration-200"
          aria-label="Scroll back to top"
        >
          <ArrowUp className="w-4 h-4" />
        </button>
      )}
    </div>
  );
};

export default App;
