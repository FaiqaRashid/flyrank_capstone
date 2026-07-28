"use client";

import { useState } from "react";
import Link from "next/link";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  const navLinks = [
    { name: "Home", href: "/" },
    { name: "About", href: "/about" },
    { name: "Projects", href: "/projects" },
    { name: "Contact", href: "/contact" },
    { name: "Health Check", href: "/health" },
  ];

  return (
    <header className="bg-primary text-primary-foreground shadow-lg border-b border-brown/30 sticky top-0 z-50">
      <nav className="max-w-6xl mx-auto px-4 sm:px-6 py-4 flex items-center justify-between">
        {/* Logo */}
        <Link
          href="/"
          onClick={() => setIsOpen(false)}
          className="flex items-center gap-2 text-xl font-bold tracking-tight text-cream hover:text-gold transition-colors"
        >
          <span className="bg-accent text-accent-foreground px-2.5 py-1 rounded-md text-sm font-black tracking-wider uppercase shadow-sm">
            PF
          </span>
          <span>Portfolio</span>
        </Link>

        {/* Desktop Navigation (>= 768px) */}
        <div className="hidden md:flex items-center space-x-2 text-sm font-semibold">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              href={link.href}
              className="px-3.5 py-2 rounded-lg text-cream hover:bg-hover hover:text-hover-foreground transition-all duration-200"
            >
              {link.name}
            </Link>
          ))}
        </div>

        {/* Mobile Hamburger Toggle Button (< 768px) */}
        <button
          type="button"
          onClick={() => setIsOpen(!isOpen)}
          aria-label={isOpen ? "Close menu" : "Open menu"}
          aria-expanded={isOpen}
          className="md:hidden p-2 rounded-lg text-cream hover:bg-hover hover:text-hover-foreground focus:outline-none focus:ring-2 focus:ring-gold transition-colors"
        >
          {isOpen ? (
            // Close X Icon
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2.5}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          ) : (
            // Hamburger Icon
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2.5}
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
          )}
        </button>
      </nav>

      {/* Mobile Collapsible Navigation Menu (< 768px) */}
      {isOpen && (
        <div className="md:hidden bg-primary border-t border-brown/30 px-4 pt-3 pb-5 space-y-2 shadow-inner">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              href={link.href}
              onClick={() => setIsOpen(false)}
              className="block px-4 py-3 rounded-lg text-base font-semibold text-cream hover:bg-hover hover:text-hover-foreground transition-colors"
            >
              {link.name}
            </Link>
          ))}
        </div>
      )}
    </header>
  );
}
