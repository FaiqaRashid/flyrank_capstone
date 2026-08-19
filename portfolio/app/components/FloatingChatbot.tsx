"use client";

import React, { useState, useEffect, useRef } from "react";
import { m, AnimatePresence, useReducedMotion } from "framer-motion";
import ChatWindow from "./ChatWindow";

export default function FloatingChatbot() {
  const shouldReduceMotion = useReducedMotion();
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [isExpanded, setIsExpanded] = useState<boolean>(false);
  const toggleBtnRef = useRef<HTMLButtonElement | null>(null);
  const widgetContainerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isOpen) {
        setIsOpen(false);
        setIsExpanded(false);
        if (toggleBtnRef.current) {
          toggleBtnRef.current.focus();
        }
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen]);

  const handleToggle = () => {
    if (isOpen) {
      setIsOpen(false);
      setIsExpanded(false);
      if (toggleBtnRef.current) {
        toggleBtnRef.current.focus();
      }
    } else {
      setIsOpen(true);
    }
  };

  return (
    <>
      {/* Floating Launcher Button with Motion Entrance & Friendly Robot Icon */}
      <m.button
        ref={toggleBtnRef}
        onClick={handleToggle}
        initial={shouldReduceMotion ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.6 }}
        animate={{ opacity: 1, scale: 1 }}
        whileHover={shouldReduceMotion ? {} : { scale: 1.08 }}
        whileTap={shouldReduceMotion ? {} : { scale: 0.92 }}
        transition={{ type: "spring", stiffness: 400, damping: 22 }}
        className="fixed bottom-6 right-6 z-50 w-14 h-14 rounded-full bg-sage text-obsidian border-2 border-obsidian shadow-sharp transition-colors flex items-center justify-center cursor-pointer focus-visible:ring-4 focus-visible:ring-obsidian"
        aria-label={isOpen ? "Close AI chat assistant" : "Open AI chat assistant"}
        aria-expanded={isOpen}
      >
        {isOpen ? (
          <svg className="w-6 h-6 text-obsidian" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M6 18L18 6M6 6l12 12" />
          </svg>
        ) : (
          <div className="relative flex items-center justify-center">
            {/* Friendly Robot SVG Illustration */}
            <svg
              className="w-7 h-7 text-obsidian"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              aria-hidden="true"
            >
              {/* Antenna stem & top orb */}
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 2v3" />
              <circle cx="12" cy="2" r="1.25" fill="currentColor" stroke="currentColor" strokeWidth={1} />

              {/* Robot Head Frame */}
              <rect x="4.5" y="5.5" width="15" height="13" rx="3.5" strokeWidth={2} fill="currentColor" fillOpacity={0.12} />

              {/* Expressive Eyes */}
              <circle cx="8.75" cy="11.25" r="1.5" fill="currentColor" stroke="none" />
              <circle cx="15.25" cy="11.25" r="1.5" fill="currentColor" stroke="none" />

              {/* Friendly Smile */}
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.5 14.5c.75 1 2.25 1 3 0" />

              {/* Side Ears / Bolts */}
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.5 12h2M19.5 12h2" />
            </svg>

            {/* Notification Pulse Rings */}
            <span className="absolute -top-1 -right-1 w-3 h-3 bg-cream border border-obsidian rounded-full animate-ping"></span>
            <span className="absolute -top-1 -right-1 w-3 h-3 bg-cream border border-obsidian rounded-full"></span>
          </div>
        )}
      </m.button>

      {/* Satisfying Spring Scale & Fade Chat Drawer */}
      <AnimatePresence>
        {isOpen && (
          <m.div
            ref={widgetContainerRef}
            initial={
              shouldReduceMotion
                ? { opacity: 1 }
                : { opacity: 0, scale: 0.88, y: 20, transformOrigin: "bottom right" }
            }
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={
              shouldReduceMotion
                ? { opacity: 0 }
                : { opacity: 0, scale: 0.88, y: 20, transformOrigin: "bottom right" }
            }
            transition={
              shouldReduceMotion
                ? { duration: 0.1 }
                : { type: "spring", stiffness: 360, damping: 26 }
            }
            className={`fixed z-50 transition-all duration-300 ease-in-out ${
              isExpanded
                ? "bottom-4 right-4 sm:bottom-8 sm:right-6 w-[calc(100vw-2rem)] sm:w-[85vw] max-w-4xl h-[calc(100vh-3rem)] sm:h-[82vh] max-h-[750px]"
                : "bottom-24 right-4 sm:right-6 w-[calc(100vw-2rem)] sm:w-[400px] h-[520px] max-h-[calc(100vh-8rem)]"
            }`}
            role="dialog"
            aria-label="AI Chat Assistant Drawer"
          >
            <ChatWindow
              onClose={handleToggle}
              isExpanded={isExpanded}
              onToggleExpand={() => setIsExpanded(!isExpanded)}
            />
          </m.div>
        )}
      </AnimatePresence>
    </>
  );
}
