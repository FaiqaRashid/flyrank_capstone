"use client";

import React from "react";
import { m, useReducedMotion } from "framer-motion";

export default function SectionDivider() {
  const shouldReduceMotion = useReducedMotion();

  return (
    <div className="w-full max-w-6xl mx-auto px-4 sm:px-6 md:px-8 py-1 overflow-hidden" aria-hidden="true">
      <m.div
        initial={shouldReduceMotion ? { scaleX: 1, opacity: 1 } : { scaleX: 0, opacity: 0.2 }}
        whileInView={{ scaleX: 1, opacity: 1 }}
        viewport={{ once: true, margin: "-30px" }}
        transition={{ duration: 0.55, ease: "easeOut" }}
        style={{ transformOrigin: "center" }}
        className="w-full h-[2px] bg-gradient-to-r from-transparent via-sage to-transparent"
      />
    </div>
  );
}
