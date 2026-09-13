import React, { useState, useEffect } from "react";
import { motion, useScroll } from "framer-motion";
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

  // Animated top scroll progress indicator
  const { scrollYProgress } = useScroll();

  useEffect(() => {
    // Reset scroll position to the very top on initial load and page refresh
    if (typeof window !== "undefined") {
      if ("scrollRestoration" in window.history) {
        window.history.scrollRestoration = "manual";
      }
      window.scrollTo(0, 0);
    }

    const sectionIds = ["hero", "about", "journey", "projects", "skills", "achievements", "certifications", "contact"];

    const handleScroll = () => {
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
      {/* 1. Animated Top Scroll Progress Glow Bar */}
      <motion.div
        style={{ scaleX: scrollYProgress }}
        className="fixed top-0 inset-x-0 h-[2.5px] bg-gradient-to-r from-sky-400 via-blue-500 to-indigo-500 origin-left z-[70] shadow-[0_0_12px_rgba(56,189,248,0.85)] pointer-events-none"
      />

      {/* 2. Live Dynamic Background Canvas */}
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
        <motion.button
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.8 }}
          whileHover={{ y: -3, scale: 1.08 }}
          whileTap={{ scale: 0.92 }}
          type="button"
          onClick={scrollToTop}
          className="fixed bottom-6 right-6 z-40 p-3 rounded-full bg-[#0d1017]/85 backdrop-blur-xl border border-white/[0.14] hover:border-sky-400/40 text-zinc-300 hover:text-white shadow-[0_8px_30px_rgba(0,0,0,0.6)] hover:shadow-[0_0_20px_rgba(56,189,248,0.3)] transition-all duration-200"
          aria-label="Scroll back to top"
        >
          <ArrowUp className="w-4 h-4" />
        </motion.button>
      )}
    </div>
  );
};

export default App;
