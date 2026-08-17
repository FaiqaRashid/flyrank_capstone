"use client";

import React from "react";
import { motion, useReducedMotion } from "framer-motion";

const philosophyItems = [
  { title: "BUILD", subtitle: "Full-Stack Apps" },
  { title: "BREAK", subtitle: "Catch AI Errors" },
  { title: "FIX", subtitle: "A11y & Performance" },
];

export default function About() {
  const shouldReduceMotion = useReducedMotion();

  return (
    <section
      id="about"
      className="section-padding scroll-mt-20 border-b-2 border-obsidian bg-cream overflow-hidden"
    >
      <motion.div
        initial={shouldReduceMotion ? { opacity: 1 } : { opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-50px" }}
        transition={{ duration: 0.35, ease: "easeOut" }}
        className="max-w-4xl mx-auto space-y-6"
      >
        {/* Section Header */}
        <div className="flex items-center gap-3">
          <span className="w-4 h-4 bg-sage rounded-full border-2 border-obsidian"></span>
          <h2 className="text-2xl sm:text-3xl font-black text-obsidian uppercase tracking-tight">
            01 // About Me
          </h2>
        </div>

        {/* Card Content Container */}
        <div className="bg-beige border-2 border-obsidian rounded-2xl p-6 sm:p-10 shadow-sharp hover:shadow-sharp-lg transition-shadow duration-200 space-y-6 relative">
          <div className="inline-block bg-sage text-obsidian text-xs font-black font-mono px-3 py-1 rounded border-2 border-obsidian shadow-sharp-sm">
            PHILOSOPHY & MINDSET
          </div>

          <p className="text-base sm:text-xl text-obsidian font-semibold leading-relaxed">
            I&apos;m a final-year Computer Science student who believes the best way to learn technology is by actually building it. My work spans full-stack development, AI integration, and accessibility-first design — from building AI-powered auditing tools to shipping streaming chat interfaces, I care less about using AI and more about understanding what it generates well enough to catch its mistakes. That mindset — build, break, understand, fix — is the thread running through everything below.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-4 border-t-2 border-obsidian/20 text-center font-mono text-sm font-bold">
            {philosophyItems.map((item, idx) => (
              <motion.div
                key={item.title}
                initial={shouldReduceMotion ? { opacity: 1 } : { opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.25, delay: shouldReduceMotion ? 0 : idx * 0.08 }}
                whileHover={shouldReduceMotion ? {} : { y: -3, scale: 1.02 }}
                className="bg-cream p-3.5 rounded-xl border-2 border-obsidian shadow-sharp-sm hover:shadow-sharp transition-all cursor-pointer"
              >
                <span className="block text-sage font-black text-lg">{item.title}</span>
                <span className="text-obsidian/90 font-extrabold">{item.subtitle}</span>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.div>
    </section>
  );
}
