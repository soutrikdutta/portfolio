import React, { useState, useEffect } from "react";
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
    <header className="fixed top-4 inset-x-0 z-50 flex justify-center px-4 sm:px-6 pointer-events-none">
      <nav
        aria-label="Main navigation"
        className={`pointer-events-auto transition-all duration-300 ease-out flex items-center justify-between w-full max-w-4xl lg:max-w-5xl px-4 sm:px-6 py-2 sm:py-2.5 rounded-full border ${
          isScrolled
            ? "bg-[#0d1017]/90 border-white/[0.14] shadow-[0_8px_32px_rgba(0,0,0,0.55)] backdrop-blur-md"
            : "bg-[#0e121b]/75 border-white/[0.09] shadow-[0_4px_24px_rgba(0,0,0,0.35)] backdrop-blur-sm"
        }`}
      >
        {/* Brand / Monogram */}
        <a
          href="#hero"
          className="flex items-center gap-2.5 group text-content-primary focus-visible:ring-1 focus-visible:ring-white/40 rounded-full p-0.5 shrink-0"
          aria-label="Back to top"
        >
          <div className="w-8 h-8 rounded-full bg-gradient-to-b from-white/[0.12] to-white/[0.04] border border-white/[0.18] flex items-center justify-center shrink-0 group-hover:border-white/40 group-hover:from-white/[0.18] transition-all duration-200 shadow-sm">
            <span className="font-mono text-xs font-semibold tracking-wider text-white">
              SD
            </span>
          </div>
          <span className="text-xs sm:text-sm font-semibold tracking-tight text-white/90 group-hover:text-white transition-colors whitespace-nowrap">
            {portfolioConfig.personal.name}
          </span>
        </a>

        {/* Desktop Navigation Links */}
        <div className="hidden md:flex items-center gap-1 lg:gap-1.5 text-[13px]">
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
                className={`relative px-3.5 py-1.5 rounded-full transition-colors duration-200 ${
                  isActive
                    ? "text-white font-medium bg-white/[0.10] shadow-sm"
                    : "text-zinc-400 hover:text-zinc-200 hover:bg-white/[0.04]"
                }`}
              >
                {item.label}
              </a>
            );
          })}
        </div>

        {/* Mobile Hamburger Button */}
        <button
          type="button"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="md:hidden p-2 rounded-full text-zinc-400 hover:text-white bg-white/[0.05] border border-white/[0.08] transition-colors"
          aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
          aria-expanded={mobileMenuOpen}
        >
          {mobileMenuOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
        </button>
      </nav>

      {/* Mobile Menu Dropdown */}
      {mobileMenuOpen && (
        <div className="md:hidden pointer-events-auto absolute top-16 inset-x-4 max-w-sm mx-auto p-3 rounded-xl bg-[#111319]/95 backdrop-blur-xl border border-white/[0.12] shadow-2xl flex flex-col gap-1">
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
                className={`px-3.5 py-2 rounded-lg text-sm transition-colors ${
                  isActive
                    ? "text-white font-medium bg-white/[0.08]"
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
              className="flex items-center justify-between px-3.5 py-2 text-xs text-zinc-300 hover:text-white rounded-lg hover:bg-white/[0.04]"
            >
              <span>Direct Phone Call</span>
              <span className="text-[11px] text-zinc-400">{portfolioConfig.contact.phoneDisplay}</span>
            </a>
          </div>
        </div>
      )}
    </header>
  );
};
