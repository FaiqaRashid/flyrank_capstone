"use client";

import React, { useEffect, useState } from "react";
import { motion, useReducedMotion, AnimatePresence } from "framer-motion";

export default function WebtoonIntro() {
  const shouldReduceMotion = useReducedMotion();
  const [isVisible, setIsVisible] = useState<boolean>(false);
  const [isLoaded, setIsLoaded] = useState<boolean>(false);
  const [isExpanding, setIsExpanding] = useState<boolean>(false);

  useEffect(() => {
    const seen =
      sessionStorage.getItem("portfolio_intro_seen") ||
      sessionStorage.getItem("webtoon_intro_seen");
    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    if (!seen && !prefersReducedMotion) {
      setIsVisible(true);

      // Hold static torn frame for 2.5 seconds, then expand
      const tearTimer = setTimeout(() => {
        setIsExpanding(true);
      }, 2500);

      // Unmount overlay after expansion transition completes
      const unmountTimer = setTimeout(() => {
        sessionStorage.setItem("portfolio_intro_seen", "true");
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
    sessionStorage.setItem("portfolio_intro_seen", "true");
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

  if (shouldReduceMotion) {
    sessionStorage.setItem("portfolio_intro_seen", "true");
    sessionStorage.setItem("webtoon_intro_seen", "true");
    return null;
  }

  // Organic fibrous jagged edge coordinates for realistic paper tear
  const topJaggedEdge =
    "M 0 0 L 1200 0 L 1200 370 Q 1160 350 1120 372 T 1040 360 T 960 378 T 880 355 T 800 375 T 720 358 T 640 376 T 560 352 T 480 374 T 400 358 T 320 376 T 240 354 T 160 372 T 80 356 L 0 375 Z";

  const topAccentLine =
    "M 1200 370 Q 1160 350 1120 372 T 1040 360 T 960 378 T 880 355 T 800 375 T 720 358 T 640 376 T 560 352 T 480 374 T 400 358 T 320 376 T 240 354 T 160 372 T 80 356 L 0 375";

  const bottomJaggedEdge =
    "M 0 800 L 1200 800 L 1200 430 Q 1160 450 1120 428 T 1040 440 T 960 422 T 880 445 T 800 425 T 720 442 T 640 424 T 560 448 T 480 426 T 400 442 T 320 424 T 240 446 T 160 428 T 80 444 L 0 425 Z";

  const bottomAccentLine =
    "M 1200 430 Q 1160 450 1120 428 T 1040 440 T 960 422 T 880 445 T 800 425 T 720 442 T 640 424 T 560 448 T 480 426 T 400 442 T 320 424 T 240 446 T 160 428 T 80 444 L 0 425";

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
        {/* Floating Skip Button */}
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

        {/* Revealed Paper Background Canvas with Real PORTFOLIO Heading */}
        <div className="absolute inset-0 bg-[#FAF6F0] flex flex-col items-center justify-center p-4 sm:p-8 text-center z-10 overflow-hidden">
          <div className="w-full flex flex-col items-center justify-center space-y-3">
            <span className="font-mono text-xs sm:text-sm font-black uppercase tracking-widest text-obsidian bg-sage px-4 py-1.5 rounded border-2 border-obsidian shadow-sharp-sm">
              FAIQA RASHID // FULL-STACK &amp; AI
            </span>

            {/* Massive Bold Real PORTFOLIO Text - Positioned to peek through torn slit */}
            <motion.h1
              animate={
                isExpanding
                  ? { scale: 1.08, opacity: 0 }
                  : { scale: [1, 1.03, 1] }
              }
              transition={
                isExpanding
                  ? { duration: 0.8, ease: "easeOut" }
                  : { duration: 2.5, repeat: Infinity, ease: "easeInOut" }
              }
              className="font-black text-obsidian tracking-tighter uppercase leading-none select-none"
              style={{ fontSize: "clamp(4rem, 14vw, 12rem)" }}
            >
              PORTFOLIO
            </motion.h1>
          </div>
        </div>

        {/* Top Dark Torn Paper Flap with Organic Fibrous Sage Edge */}
        <motion.div
          animate={isExpanding ? { y: "-110%" } : { y: "0%" }}
          transition={{ duration: 0.9, ease: [0.76, 0, 0.24, 1] }}
          className="absolute inset-x-0 top-0 h-[52vh] z-20 overflow-visible pointer-events-none"
        >
          <svg
            className="w-full h-full drop-shadow-md"
            viewBox="0 0 1200 800"
            preserveAspectRatio="none"
          >
            {/* Sage Green Jagged Underlay Edge (Replaces reference red edge) */}
            <path
              d={topAccentLine}
              fill="none"
              stroke="#97A97C"
              strokeWidth="16"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            {/* Solid Obsidian Black Top Paper Flap */}
            <path d={topJaggedEdge} fill="#121413" />
          </svg>
        </motion.div>

        {/* Bottom Dark Torn Paper Flap with Organic Fibrous Sage Edge */}
        <motion.div
          animate={isExpanding ? { y: "110%" } : { y: "0%" }}
          transition={{ duration: 0.9, ease: [0.76, 0, 0.24, 1] }}
          className="absolute inset-x-0 bottom-0 h-[52vh] z-20 overflow-visible pointer-events-none"
        >
          <svg
            className="w-full h-full drop-shadow-md"
            viewBox="0 0 1200 800"
            preserveAspectRatio="none"
          >
            {/* Sage Green Jagged Underlay Edge (Replaces reference red edge) */}
            <path
              d={bottomAccentLine}
              fill="none"
              stroke="#97A97C"
              strokeWidth="16"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            {/* Solid Obsidian Black Bottom Paper Flap */}
            <path d={bottomJaggedEdge} fill="#121413" />
          </svg>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
