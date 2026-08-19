"use client";

import React from "react";
import { m, useReducedMotion } from "framer-motion";

const skillCategories = [
  {
    title: "Frontend",
    tag: "UI / UX & WEB",
    skills: ["React", "Next.js", "TypeScript", "JavaScript", "Tailwind CSS", "HTML5/CSS3"],
  },
  {
    title: "AI / NLP",
    tag: "INTELLIGENCE & LLM",
    skills: [
      "Gemini API",
      "AI SDK integration",
      "Structured/schema-validated LLM output",
      "Prompt engineering",
      "LLM streaming",
    ],
  },
  {
    title: "Tools & Workflow",
    tag: "DEV ENVIRONMENT",
    skills: ["Git/GitHub", "AI-assisted development (Cursor/Antigravity)", "Figma"],
  },
  {
    title: "Backend & Data",
    tag: "SYSTEMS & DB",
    skills: ["Python", "Flask", "MySQL", "Supabase"],
  },
];

export default function Skills() {
  const shouldReduceMotion = useReducedMotion();

  return (
    <section
      id="skills"
      className="section-padding scroll-mt-20 border-b-2 border-obsidian bg-cream overflow-hidden"
    >
      <div className="max-w-6xl mx-auto space-y-8">
        {/* Section Header */}
        <m.div
          initial={shouldReduceMotion ? { opacity: 1 } : { opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.3 }}
          className="flex items-center gap-3"
        >
          <span className="w-4 h-4 bg-sage rounded-full border-2 border-obsidian"></span>
          <h2 className="text-2xl sm:text-3xl font-black text-obsidian uppercase tracking-tight">
            02 // Technical Skills
          </h2>
        </m.div>

        {/* Balanced Equal-Height Grid with Staggered Tags */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-stretch">
          {skillCategories.map((category, cardIndex) => (
            <m.div
              key={category.title}
              initial={shouldReduceMotion ? { opacity: 1 } : { opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-30px" }}
              transition={{ duration: 0.35, delay: shouldReduceMotion ? 0 : cardIndex * 0.08 }}
              className="bg-beige border-2 border-obsidian rounded-2xl p-6 shadow-sharp hover:shadow-sharp-lg flex flex-col justify-start space-y-4 h-full transition-shadow duration-200"
            >
              <div className="flex items-center justify-between border-b-2 border-obsidian/20 pb-3">
                <h3 className="text-xl font-black text-obsidian tracking-tight">
                  {category.title}
                </h3>
                <span className="bg-sage text-obsidian text-[10px] font-mono font-black px-2.5 py-1 rounded border-2 border-obsidian shadow-sharp-sm">
                  {category.tag}
                </span>
              </div>

              <div className="flex flex-wrap gap-2 pt-1">
                {category.skills.map((skill, tagIndex) => (
                  <m.span
                    key={skill}
                    initial={shouldReduceMotion ? { opacity: 1 } : { opacity: 0, scale: 0.9 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{
                      duration: 0.2,
                      delay: shouldReduceMotion ? 0 : cardIndex * 0.08 + tagIndex * 0.03,
                    }}
                    whileHover={shouldReduceMotion ? {} : { scale: 1.06, y: -2 }}
                    whileTap={shouldReduceMotion ? {} : { scale: 0.96 }}
                    className="bg-cream text-obsidian text-xs font-extrabold px-3 py-1.5 rounded-lg border-2 border-obsidian font-mono shadow-sharp-sm hover:bg-sage transition-colors cursor-pointer"
                  >
                    {skill}
                  </m.span>
                ))}
              </div>
            </m.div>
          ))}
        </div>
      </div>
    </section>
  );
}
