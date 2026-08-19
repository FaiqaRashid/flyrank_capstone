"use client";

import React from "react";
import { m, useReducedMotion } from "framer-motion";

export default function Footer() {
  const shouldReduceMotion = useReducedMotion();

  const scrollToTop = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
    window.history.pushState(null, "", "#home");
  };

  return (
    <footer className="bg-beige border-t-2 border-obsidian py-8 px-4 sm:px-6 md:px-8">
      <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-mono font-bold text-obsidian">
        {/* Copyright */}
        <div>
          © {new Date().getFullYear()} Faiqa Rashid. All rights reserved.
        </div>

        {/* Social Icons & Back to top link */}
        <div className="flex items-center gap-4">
          <m.a
            whileHover={shouldReduceMotion ? {} : { scale: 1.08, y: -1 }}
            whileTap={shouldReduceMotion ? {} : { scale: 0.95 }}
            transition={{ duration: 0.15 }}
            href="https://github.com/FaiqaRashid/FaiqaRashid"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-sage transition-colors cursor-pointer focus-visible:ring-2 focus-visible:ring-obsidian"
            aria-label="Faiqa Rashid GitHub Profile"
          >
            GitHub
          </m.a>
          <span>·</span>
          <m.a
            whileHover={shouldReduceMotion ? {} : { scale: 1.08, y: -1 }}
            whileTap={shouldReduceMotion ? {} : { scale: 0.95 }}
            transition={{ duration: 0.15 }}
            href="https://www.linkedin.com/in/faiqarashid/"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-sage transition-colors cursor-pointer focus-visible:ring-2 focus-visible:ring-obsidian"
            aria-label="Faiqa Rashid LinkedIn Profile"
          >
            LinkedIn
          </m.a>
          <span>·</span>
          <m.a
            whileHover={shouldReduceMotion ? {} : { scale: 1.08, y: -1 }}
            whileTap={shouldReduceMotion ? {} : { scale: 0.95 }}
            transition={{ duration: 0.15 }}
            href="#home"
            onClick={scrollToTop}
            className="hover:text-sage underline transition-colors cursor-pointer focus-visible:ring-2 focus-visible:ring-obsidian"
          >
            Back to top ↑
          </m.a>
        </div>
      </div>
    </footer>
  );
}
