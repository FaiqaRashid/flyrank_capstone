"use client";

import React from "react";
import { motion, useMotionValue, useSpring, useTransform, useReducedMotion } from "framer-motion";

interface ProjectItem {
  id: string;
  title: string;
  tagline: string;
  description: string;
  tech: string[];
  demoUrl: string | null;
  githubUrl: string | null;
}

const projectsData: ProjectItem[] = [
  {
    id: "pakfreelance",
    title: "Pakfreelance AI Agent",
    tagline: "AMD Developer Hackathon — 5-Agent AI Toolkit",
    description:
      "An AI-powered toolkit built with 5-agent CrewAI orchestration to help the 4M+ freelancers across Pakistan and South Asia — generating winning proposals in seconds, detecting client scams through red-flag analysis, calculating optimal rates, scoring proposals with improvement feedback, and writing professional bios for Upwork/Fiverr. Includes a one-click Power Mode for complete job analysis.",
    tech: ["CrewAI", "Llama 3.3 70B", "AMD MI300X", "Streamlit"],
    demoUrl:
      "https://huggingface.co/spaces/lablab-ai-amd-developer-hackathon/pakfreelance-ai-agent",
    githubUrl: "https://github.com/FaiqaRashid/pakfreelance-ai-agent",
  },
  {
    id: "anime-explorer",
    title: "Anime Explorer",
    tagline: "Interactive Anime Discovery App",
    description:
      "A React + TypeScript anime discovery app with live search, a randomized homepage feed, and localStorage-based favourites — built using AI-assisted development, with real bugs caught and fixed along the way (an invalid hook placement, an API response mismatch, a rate-limit issue).",
    tech: ["React", "TypeScript", "Vite"],
    demoUrl: null,
    githubUrl: "https://github.com/FaiqaRashid/anime-explorer",
  },
  {
    id: "scriptclean-a11y",
    title: "Scriptclean A11y Guard",
    tagline: "AI Web Accessibility Auditor",
    description:
      "An AI-powered web accessibility auditing tool that automatically scans websites for WCAG 2.1 compliance violations and provides intelligent recommendations, with an interactive dashboard for detailed reports.",
    tech: ["Python", "Flask", "Machine Learning"],
    demoUrl: null,
    githubUrl: "https://github.com/FaiqaRashid/scriptclean-a11y-guard",
  },
  {
    id: "legal-analyzer",
    title: "AI Contract & Legal Document Risk Analyzer",
    tagline: "Schema-Validated Legal Analyzer",
    description:
      "An AI-powered web app that analyzes contracts and legal documents, extracts key metadata, and detects risks with confidence-scored explanations using a strict schema-validated output — built with Google Gemini 2.5 Flash and Pydantic. Includes document Q&A, PDF/DOCX export, user auth, and an admin analytics dashboard.",
    tech: [
      "Python",
      "Streamlit",
      "Gemini 2.5 Flash",
      "Supabase",
      "Pydantic",
    ],
    demoUrl: null,
    githubUrl:
      "https://github.com/FaiqaRashid/AI-Powered-Contract-Legal-Document-Risk-Analyzer",
  },
];

function TiltProjectCard({
  project,
  index,
  shouldReduceMotion,
}: {
  project: ProjectItem;
  index: number;
  shouldReduceMotion: boolean | null;
}) {
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const mouseXSpring = useSpring(x, { stiffness: 300, damping: 25 });
  const mouseYSpring = useSpring(y, { stiffness: 300, damping: 25 });

  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["6deg", "-6deg"]);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-6deg", "6deg"]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (shouldReduceMotion) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;

    const xPct = mouseX / width - 0.5;
    const yPct = mouseY / height - 0.5;

    x.set(xPct);
    y.set(yPct);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.article
      initial={shouldReduceMotion ? { opacity: 1 } : { opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{
        duration: 0.35,
        delay: shouldReduceMotion ? 0 : index * 0.08,
        ease: "easeOut",
      }}
      style={{
        rotateX: shouldReduceMotion ? 0 : rotateX,
        rotateY: shouldReduceMotion ? 0 : rotateY,
        transformStyle: "preserve-3d",
      }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="bg-beige border-2 border-obsidian rounded-2xl p-6 sm:p-8 shadow-sharp hover:shadow-sharp-lg flex flex-col justify-between h-full group cursor-pointer transition-shadow duration-200 perspective-1000"
    >
      <div className="flex-1 flex flex-col justify-between space-y-4 pb-4">
        {/* Header & Tagline */}
        <div className="space-y-1">
          <span className="inline-block text-[10px] font-mono font-black uppercase text-obsidian/70 bg-cream px-2.5 py-0.5 rounded border border-obsidian/30 mb-2">
            {project.tagline}
          </span>
          <h3 className="text-2xl font-black text-obsidian tracking-tight leading-snug group-hover:text-sage transition-colors">
            {project.title}
          </h3>
        </div>

        {/* Description */}
        <p className="text-sm sm:text-base text-obsidian/90 font-medium leading-relaxed flex-1">
          {project.description}
        </p>

        {/* Tech Tags */}
        <div className="flex flex-wrap gap-2 pt-2">
          {project.tech.map((t, tagIndex) => (
            <motion.span
              key={t}
              initial={shouldReduceMotion ? { opacity: 1 } : { opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: shouldReduceMotion ? 0 : index * 0.08 + tagIndex * 0.04 }}
              whileHover={shouldReduceMotion ? {} : { scale: 1.06 }}
              className="bg-sage text-obsidian text-xs font-extrabold px-3 py-1 rounded-full border-2 border-obsidian font-mono shadow-sharp-sm cursor-pointer transition-transform"
            >
              {t}
            </motion.span>
          ))}
        </div>
      </div>

      {/* Action Links */}
      <div className="flex flex-wrap items-center gap-3 pt-4 border-t-2 border-obsidian/20 mt-auto">
        {project.demoUrl && (
          <motion.a
            whileHover={shouldReduceMotion ? {} : { scale: 1.05 }}
            whileTap={shouldReduceMotion ? {} : { scale: 0.95 }}
            transition={{ duration: 0.15 }}
            href={project.demoUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 bg-sage hover:bg-sage/90 text-obsidian font-black text-xs px-4 py-2 rounded-xl border-2 border-obsidian shadow-sharp-sm transition-colors cursor-pointer focus-visible:ring-2 focus-visible:ring-obsidian"
            aria-label={`Live Demo for ${project.title}`}
          >
            <span>Live Demo</span>
            <svg
              className="w-3.5 h-3.5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2.5}
                d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
              />
            </svg>
          </motion.a>
        )}

        {project.githubUrl && (
          <motion.a
            whileHover={shouldReduceMotion ? {} : { scale: 1.05 }}
            whileTap={shouldReduceMotion ? {} : { scale: 0.95 }}
            transition={{ duration: 0.15 }}
            href={project.githubUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 bg-cream hover:bg-beige text-obsidian font-black text-xs px-4 py-2 rounded-xl border-2 border-obsidian shadow-sharp-sm transition-colors cursor-pointer focus-visible:ring-2 focus-visible:ring-obsidian"
            aria-label={`GitHub Repository for ${project.title}`}
          >
            <svg
              className="w-4 h-4 fill-current"
              viewBox="0 0 24 24"
            >
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"
              />
            </svg>
            <span>GitHub Code</span>
          </motion.a>
        )}
      </div>
    </motion.article>
  );
}

export default function Projects() {
  const shouldReduceMotion = useReducedMotion();

  return (
    <section
      id="projects"
      className="section-padding scroll-mt-20 border-b-2 border-obsidian bg-cream overflow-hidden"
    >
      <div className="max-w-6xl mx-auto space-y-8">
        {/* Section Header */}
        <motion.div
          initial={shouldReduceMotion ? { opacity: 1 } : { opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.3 }}
          className="flex items-center justify-between flex-wrap gap-4"
        >
          <div className="flex items-center gap-3">
            <span className="w-4 h-4 bg-sage rounded-full border-2 border-obsidian"></span>
            <h2 className="text-2xl sm:text-3xl font-black text-obsidian uppercase tracking-tight">
              03 // Featured Projects
            </h2>
          </div>
          <span className="text-xs font-mono font-bold text-obsidian/70">
            SHOWCASING 4 KEY BUILDS
          </span>
        </motion.div>

        {/* Balanced Equal-Height 3D Tilt Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-stretch">
          {projectsData.map((project, index) => (
            <TiltProjectCard
              key={project.id}
              project={project}
              index={index}
              shouldReduceMotion={shouldReduceMotion}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
