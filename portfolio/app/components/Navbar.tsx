"use client";

import React, { useState, useEffect } from "react";
import { motion, useReducedMotion } from "framer-motion";

const navItems = [
  { label: "Home", href: "#home" },
  { label: "About", href: "#about" },
  { label: "Skills", href: "#skills" },
  { label: "Projects", href: "#projects" },
  { label: "Contact", href: "#contact" },
];

export default function Navbar() {
  const shouldReduceMotion = useReducedMotion();
  const [activeSection, setActiveSection] = useState<string>("home");
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState<boolean>(false);

  useEffect(() => {
    const handleScroll = () => {
      const sections = navItems.map((item) => item.href.substring(1));
      const scrollPosition = window.scrollY + 120;

      for (let i = sections.length - 1; i >= 0; i--) {
        const sectionEl = document.getElementById(sections[i]);
        if (sectionEl) {
          const top = sectionEl.offsetTop;
          if (scrollPosition >= top) {
            setActiveSection(sections[i]);
            break;
          }
        }
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleNavClick = (
    e: React.MouseEvent<HTMLAnchorElement>,
    href: string
  ) => {
    e.preventDefault();
    setIsMobileMenuOpen(false);
    const targetId = href.substring(1);
    const targetEl = document.getElementById(targetId);
    if (targetEl) {
      targetEl.scrollIntoView({ behavior: "smooth" });
      window.history.pushState(null, "", href);
      setActiveSection(targetId);
    }
  };

  return (
    <header className="sticky top-0 z-40 bg-cream/95 backdrop-blur-md border-b-2 border-obsidian transition-all">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 md:px-8 h-16 flex items-center justify-between">
        {/* Brand Logo */}
        <motion.a
          whileHover={shouldReduceMotion ? {} : { scale: 1.04 }}
          whileTap={shouldReduceMotion ? {} : { scale: 0.96 }}
          transition={{ duration: 0.18, ease: "easeOut" }}
          href="#home"
          onClick={(e) => handleNavClick(e, "#home")}
          className="font-black text-xl tracking-tight text-obsidian flex items-center gap-2 group focus-visible:ring-2 focus-visible:ring-sage cursor-pointer"
          aria-label="Faiqa Rashid Home"
        >
          <span className="w-8 h-8 rounded-lg bg-sage border-2 border-obsidian flex items-center justify-center font-mono text-sm shadow-sharp-sm transition-transform">
            FR
          </span>
          <span className="font-bold text-lg hidden sm:inline-block">
            Faiqa Rashid
          </span>
        </motion.a>

        {/* Desktop Anchor Links with Morphing Active Indicator */}
        <nav className="hidden md:flex items-center gap-1.5 relative" aria-label="Main Navigation">
          {navItems.map((item) => {
            const sectionId = item.href.substring(1);
            const isActive = activeSection === sectionId;

            return (
              <a
                key={item.href}
                href={item.href}
                onClick={(e) => handleNavClick(e, item.href)}
                className={`relative px-4 py-1.5 rounded-lg text-sm font-extrabold transition-colors cursor-pointer focus-visible:ring-2 focus-visible:ring-sage ${
                  isActive
                    ? "text-obsidian"
                    : "text-obsidian/80 hover:text-obsidian hover:bg-beige/60"
                }`}
                aria-current={isActive ? "page" : undefined}
              >
                {isActive && (
                  <motion.span
                    layoutId={shouldReduceMotion ? undefined : "activeNavHighlight"}
                    transition={{
                      type: "spring",
                      stiffness: 380,
                      damping: 30,
                    }}
                    className="absolute inset-0 bg-sage border-2 border-obsidian rounded-lg shadow-sharp-sm -z-10"
                  />
                )}
                <span className="relative z-10">{item.label}</span>
              </a>
            );
          })}
        </nav>

        {/* Mobile Hamburger Button */}
        <button
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          className="md:hidden p-2 rounded-lg bg-beige border-2 border-obsidian text-obsidian focus-visible:ring-2 focus-visible:ring-sage cursor-pointer"
          aria-label={isMobileMenuOpen ? "Close menu" : "Open navigation menu"}
          aria-expanded={isMobileMenuOpen}
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            {isMobileMenuOpen ? (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M6 18L18 6M6 6l12 12" />
            ) : (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M4 6h16M4 12h16M4 18h16" />
            )}
          </svg>
        </button>
      </div>

      {/* Mobile Menu Dropdown */}
      {isMobileMenuOpen && (
        <nav
          className="md:hidden bg-cream border-b-2 border-obsidian px-4 py-4 space-y-2 animate-fade-in"
          aria-label="Mobile Navigation"
        >
          {navItems.map((item) => {
            const sectionId = item.href.substring(1);
            const isActive = activeSection === sectionId;

            return (
              <a
                key={item.href}
                href={item.href}
                onClick={(e) => handleNavClick(e, item.href)}
                className={`block w-full text-left px-4 py-2.5 rounded-lg text-base font-extrabold border-2 transition-all cursor-pointer ${
                  isActive
                    ? "bg-sage text-obsidian border-obsidian shadow-sharp-sm"
                    : "bg-beige text-obsidian border-obsidian/20 hover:border-obsidian"
                }`}
              >
                {item.label}
              </a>
            );
          })}
        </nav>
      )}
    </header>
  );
}
