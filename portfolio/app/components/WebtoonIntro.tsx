"use client";

import React, { useEffect, useState } from "react";
import { motion, useReducedMotion, AnimatePresence } from "framer-motion";

export default function WebtoonIntro() {
  const shouldReduceMotion = useReducedMotion();
  const [isVisible, setIsVisible] = useState<boolean>(false);
  const [isLoaded, setIsLoaded] = useState<boolean>(false);
  const [isExpanding, setIsExpanding] = useState<boolean>(false);

  useEffect(() => {
    const seen = sessionStorage.getItem("webtoon_intro_seen");
    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    if (!seen && !prefersReducedMotion) {
      setIsVisible(true);

      // Static frame holds for 2.5 seconds, then tears fully open
      const tearTimer = setTimeout(() => {
        setIsExpanding(true);
      }, 2500);

      // Unmount intro overlay once tear expansion completes
      const unmountTimer = setTimeout(() => {
        sessionStorage.setItem("webtoon_intro_seen", "true");
        setIsVisible(false);
      }, 3400);

      return () => {
        clearTimeout(tearTimer);
        clearTimeout(unmountTimer);
      };
    } else {
      setIsLoaded(true);
    }
  }, []);

  const handleSkipIntro = () => {
    sessionStorage.setItem("webtoon_intro_seen", "true");
    setIsVisible(false);
  };

  const handleSkipKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      handleSkipIntro();
    }
  };

  if (!isLoaded && !isVisible) {
    return null;
  }

  if (!isVisible) {
    return null;
  }

  // If user prefers reduced motion, skip intro tearing completely
  if (shouldReduceMotion) {
    sessionStorage.setItem("webtoon_intro_seen", "true");
    return null;
  }

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 1 }}
        animate={{ opacity: isExpanding ? 0.95 : 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.5 }}
        className="fixed inset-0 z-50 overflow-hidden select-none bg-[#121413]"
        role="dialog"
        aria-modal="true"
        aria-label="Torn Paper Portfolio Intro"
      >
        {/* Floating Skip Control for Keyboard Accessibility */}
        <div className="absolute top-6 right-6 z-50">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={handleSkipIntro}
            onKeyDown={handleSkipKeyDown}
            className="text-xs font-mono font-black uppercase tracking-wider text-obsidian bg-sage hover:bg-sage/90 border-2 border-obsidian px-4 py-2 rounded-xl shadow-sharp cursor-pointer focus-visible:ring-4 focus-visible:ring-obsidian"
            aria-label="Skip torn paper intro and enter portfolio"
          >
            Skip Intro ✕
          </motion.button>
        </div>

        {/* Revealed Content Underneath (Visible through the torn opening) */}
        <div className="absolute inset-0 bg-cream flex flex-col items-center justify-center p-4 sm:p-8 text-center z-10 overflow-hidden">
          <div className="w-full flex flex-col items-center justify-center space-y-2">
            <span className="font-mono text-xs sm:text-sm md:text-base font-black uppercase tracking-widest text-sage bg-obsidian px-3.5 py-1 rounded border border-obsidian shadow-sharp-sm mb-1">
              FAIQA RASHID // FULL-STACK &amp; AI
            </span>

            {/* Massive Oversized Display Typography - No Boxes or Buttons */}
            <h1
              className="text-[13vw] sm:text-[13.5vw] md:text-[14vw] font-black text-obsidian tracking-tighter uppercase leading-none select-none"
              style={{ fontSize: "clamp(3.5rem, 13.5vw, 11.5rem)" }}
            >
              PORTFOLIO
            </h1>
          </div>
        </div>

        {/* Top Dark Torn Paper Flap with Sage Accent Line */}
        <motion.div
          animate={isExpanding ? { y: "-110%" } : { y: "0%" }}
          transition={{ duration: 0.9, ease: [0.76, 0, 0.24, 1] }}
          className="absolute inset-0 bg-[#121413] z-20"
          style={{
            clipPath:
              "polygon(0% 0%, 100% 0%, 100% 48%, 93% 53%, 84% 47%, 77% 53%, 69% 48%, 61% 54%, 53% 47%, 45% 53%, 37% 48%, 29% 54%, 21% 47%, 13% 53%, 6% 48%, 0% 53%)",
          }}
        >
          {/* Sage Green Jagged Torn Edge Highlight */}
          <div className="absolute inset-0 border-b-4 border-sage opacity-90 pointer-events-none" />
        </motion.div>

        {/* Bottom Dark Torn Paper Flap with Sage Accent Line */}
        <motion.div
          animate={isExpanding ? { y: "110%" } : { y: "0%" }}
          transition={{ duration: 0.9, ease: [0.76, 0, 0.24, 1] }}
          className="absolute inset-0 bg-[#121413] z-20"
          style={{
            clipPath:
              "polygon(0% 47%, 6% 53%, 13% 47%, 21% 53%, 29% 47%, 37% 53%, 45% 47%, 53% 53%, 61% 47%, 69% 53%, 77% 47%, 84% 53%, 93% 47%, 100% 52%, 100% 100%, 0% 100%)",
          }}
        >
          {/* Sage Green Jagged Torn Edge Highlight */}
          <div className="absolute inset-0 border-t-4 border-sage opacity-90 pointer-events-none" />
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
