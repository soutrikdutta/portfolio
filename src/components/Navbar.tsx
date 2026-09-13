import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { portfolioConfig } from "../portfolio.config";
import { Menu, X } from "lucide-react";

interface NavbarProps {
  activeSection: string;
}

export const Navbar: React.FC<NavbarProps> = ({ activeSection }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navItems = [
    { label: "Home", href: "#hero" },
    { label: "About", href: "#about" },
    { label: "Journey", href: "#journey" },
    { label: "Projects", href: "#projects" },
    { label: "Skills", href: "#skills" },
    { label: "Achievements", href: "#achievements" },
    { label: "Certifications", href: "#certifications" },
    { label: "Contact", href: "#contact" },
  ];

  const handleNavClick = (href: string) => {
    setMobileMenuOpen(false);
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <motion.header
      initial={{ y: -30, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
      className="fixed top-3 sm:top-4 inset-x-0 z-50 flex justify-center px-3 sm:px-6 pointer-events-none"
    >
      <nav
        aria-label="Main navigation"
        className={`pointer-events-auto transition-all duration-300 ease-out flex items-center justify-between w-full max-w-4xl lg:max-w-5xl px-3.5 py-1.5 sm:px-6 sm:py-2.5 rounded-full border ${
          isScrolled
            ? "bg-[#0c0f17]/90 border-white/[0.16] shadow-[0_10px_36px_rgba(0,0,0,0.65)] backdrop-blur-xl"
            : "bg-[#0e121b]/80 border-white/[0.09] shadow-[0_4px_24px_rgba(0,0,0,0.35)] backdrop-blur-md"
        }`}
      >
        {/* Brand / Monogram */}
        <a
          href="#hero"
          onClick={(e) => {
            e.preventDefault();
            handleNavClick("#hero");
          }}
          className="flex items-center gap-2 group text-content-primary focus-visible:ring-1 focus-visible:ring-white/40 rounded-full p-0.5 shrink-0"
          aria-label="Back to top"
        >
          <motion.div
            whileHover={{ scale: 1.06 }}
            whileTap={{ scale: 0.95 }}
            className="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-gradient-to-b from-white/[0.16] to-white/[0.04] border border-white/[0.2] flex items-center justify-center shrink-0 group-hover:border-white/50 transition-all duration-200 shadow-sm"
          >
            <span className="font-mono text-[11px] sm:text-xs font-bold tracking-wider text-white">
              SD
            </span>
          </motion.div>
          <span className="text-xs sm:text-sm font-semibold tracking-tight text-white/90 group-hover:text-white transition-colors whitespace-nowrap">
            {portfolioConfig.personal.name}
          </span>
        </a>

        {/* Desktop Navigation Links with animated active slider */}
        <div className="hidden md:flex items-center gap-1 lg:gap-1.5 text-[13px] relative">
          {navItems.map((item) => {
            const isActive = activeSection === item.href.substring(1);
            return (
              <a
                key={item.label}
                href={item.href}
                onClick={(e) => {
                  e.preventDefault();
                  handleNavClick(item.href);
                }}
                className={`relative px-3.5 py-1.5 rounded-full transition-colors duration-200 z-10 ${
                  isActive
                    ? "text-white font-semibold"
                    : "text-zinc-400 hover:text-zinc-100 hover:bg-white/[0.03]"
                }`}
              >
                {isActive && (
                  <motion.div
                    layoutId="activeNavPill"
                    transition={{ type: "spring", stiffness: 380, damping: 30 }}
                    className="absolute inset-0 rounded-full bg-white/[0.12] border border-white/[0.18] shadow-sm -z-10"
                  />
                )}
                <span>{item.label}</span>
              </a>
            );
          })}
        </div>

        {/* Compact Mobile Hamburger Button */}
        <button
          type="button"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="md:hidden p-1.5 rounded-full text-zinc-300 hover:text-white bg-white/[0.05] border border-white/[0.08] transition-colors"
          aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
          aria-expanded={mobileMenuOpen}
        >
          {mobileMenuOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
        </button>
      </nav>

      {/* Mobile Menu Dropdown with Spring Animation */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -8, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -8, scale: 0.97 }}
            transition={{ duration: 0.2, ease: "easeOut" }}
            className="md:hidden pointer-events-auto absolute top-14 inset-x-3 max-w-xs sm:max-w-sm mx-auto p-2.5 rounded-2xl bg-[#0e111a]/95 backdrop-blur-2xl border border-white/[0.14] shadow-2xl flex flex-col gap-1"
          >
            {navItems.map((item) => {
              const isActive = activeSection === item.href.substring(1);
              return (
                <a
                  key={item.label}
                  href={item.href}
                  onClick={(e) => {
                    e.preventDefault();
                    handleNavClick(item.href);
                  }}
                  className={`px-3 py-2 rounded-xl text-xs sm:text-sm transition-all duration-150 ${
                    isActive
                      ? "text-white font-semibold bg-white/[0.10] border border-white/[0.12]"
                      : "text-zinc-300 hover:text-white hover:bg-white/[0.04]"
                  }`}
                >
                  {item.label}
                </a>
              );
            })}
            <div className="pt-2 mt-1 border-t border-white/[0.06]">
              <a
                href={`tel:${portfolioConfig.contact.phone}`}
                className="flex items-center justify-between px-3 py-1.5 text-xs text-zinc-300 hover:text-white rounded-xl hover:bg-white/[0.04]"
              >
                <span>Direct Phone Call</span>
                <span className="text-[11px] text-zinc-400 font-mono">{portfolioConfig.contact.phoneDisplay}</span>
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
};
