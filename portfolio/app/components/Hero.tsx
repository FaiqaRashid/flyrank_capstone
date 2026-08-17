"use client";

import React from "react";
import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";

export default function Hero() {
  const shouldReduceMotion = useReducedMotion();

  const handleScrollToProjects = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    const projectsEl = document.getElementById("projects");
    if (projectsEl) {
      projectsEl.scrollIntoView({ behavior: "smooth" });
      window.history.pushState(null, "", "#projects");
    }
  };

  const handleDownloadCV = () => {
    const link = document.createElement("a");
    link.href = "/Faiqa_Rashid_Resume.pdf";
    link.download = "Faiqa_Rashid_Resume.pdf";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <section
      id="home"
      className="section-padding scroll-mt-20 flex flex-col justify-center min-h-[calc(100vh-4rem)] border-b-2 border-obsidian bg-cream"
    >
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-14 items-center max-w-6xl mx-auto w-full">
        {/* Left Column: Written Lines with Framer Motion reveal */}
        <motion.div
          initial={shouldReduceMotion ? { opacity: 1 } : { opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.35, ease: "easeOut" }}
          className="lg:col-span-7 flex flex-col justify-center space-y-6 lg:space-y-7"
        >
          {/* Kicker Tag */}
          <div>
            <div className="inline-flex items-center gap-2 bg-sage text-obsidian px-3.5 py-1.5 rounded-md border-2 border-obsidian shadow-sharp-sm font-mono text-xs font-black uppercase tracking-wider">
              <span className="w-2.5 h-2.5 rounded-full bg-obsidian animate-ping"></span>
              Faiqa Rashid // Portfolio
            </div>
          </div>

          {/* Headline */}
          <h1 className="text-3xl sm:text-4xl lg:text-[2.75rem] xl:text-5xl font-black text-obsidian tracking-tight leading-[1.18]">
            &ldquo;The best way to learn technology is by actually building it.&rdquo;
          </h1>

          {/* Tagline */}
          <p className="text-lg sm:text-xl font-black text-obsidian/85 leading-snug">
            Full-stack developer, AI/NLP-focused. Accessibility-first.
          </p>

          {/* Short Bio */}
          <p className="text-base sm:text-lg text-obsidian/90 font-medium leading-relaxed max-w-2xl">
            I&apos;m a Computer Science student specializing in Full-Stack Web Development and Machine Learning, with hands-on experience building production-quality applications and participating in competitive hackathons (AMD Developer Hackathon, IBM Developer Day).
          </p>

          {/* Quick Access Icon Row (GitHub & LinkedIn) */}
          <div className="flex items-center gap-3 pt-1">
            <span className="text-xs font-mono font-black uppercase tracking-wider text-obsidian/70 mr-1">
              CONNECT:
            </span>
            <motion.a
              whileHover={shouldReduceMotion ? {} : { scale: 1.08 }}
              whileTap={shouldReduceMotion ? {} : { scale: 0.95 }}
              transition={{ duration: 0.15 }}
              href="https://github.com/FaiqaRashid/FaiqaRashid"
              target="_blank"
              rel="noopener noreferrer"
              className="p-2.5 bg-beige hover:bg-sage text-obsidian border-2 border-obsidian rounded-xl shadow-sharp-sm transition-colors cursor-pointer focus-visible:ring-2 focus-visible:ring-obsidian"
              aria-label="Faiqa Rashid GitHub Profile"
            >
              <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24" aria-hidden="true">
                <path fillRule="evenodd" clipRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
              </svg>
            </motion.a>

            <motion.a
              whileHover={shouldReduceMotion ? {} : { scale: 1.08 }}
              whileTap={shouldReduceMotion ? {} : { scale: 0.95 }}
              transition={{ duration: 0.15 }}
              href="https://www.linkedin.com/in/faiqarashid/"
              target="_blank"
              rel="noopener noreferrer"
              className="p-2.5 bg-beige hover:bg-sage text-obsidian border-2 border-obsidian rounded-xl shadow-sharp-sm transition-colors cursor-pointer focus-visible:ring-2 focus-visible:ring-obsidian"
              aria-label="Faiqa Rashid LinkedIn Profile"
            >
              <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24" aria-hidden="true">
                <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.46 10.9v8.37H9.25V10.9H6.46M7.86 6.74a1.62 1.62 0 1 0 0 3.24 1.62 1.62 0 0 0 0-3.24z" />
              </svg>
            </motion.a>
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-wrap items-center gap-4 pt-1">
            <motion.a
              whileHover={shouldReduceMotion ? {} : { scale: 1.04 }}
              whileTap={shouldReduceMotion ? {} : { scale: 0.96 }}
              transition={{ duration: 0.15 }}
              href="#projects"
              onClick={handleScrollToProjects}
              className="inline-flex items-center justify-center bg-sage hover:bg-sage/90 text-obsidian font-black text-base px-6 py-3.5 rounded-xl border-2 border-obsidian shadow-sharp transition-colors cursor-pointer focus-visible:ring-2 focus-visible:ring-obsidian"
            >
              View Projects ↓
            </motion.a>

            <motion.button
              whileHover={shouldReduceMotion ? {} : { scale: 1.04 }}
              whileTap={shouldReduceMotion ? {} : { scale: 0.96 }}
              transition={{ duration: 0.15 }}
              onClick={handleDownloadCV}
              className="inline-flex items-center justify-center bg-beige hover:bg-cream text-obsidian font-black text-base px-6 py-3.5 rounded-xl border-2 border-obsidian shadow-sharp transition-colors cursor-pointer focus-visible:ring-2 focus-visible:ring-obsidian"
              aria-label="Download Faiqa Rashid's PDF Resume"
            >
              Download CV 📄
            </motion.button>
          </div>

          {/* Tech Stack Strip */}
          <div className="pt-4 border-t-2 border-obsidian/20 flex flex-wrap items-center gap-2">
            <span className="text-xs font-mono font-black uppercase text-obsidian/70 mr-2">
              TECH STACK:
            </span>
            {["Python", "JavaScript", "PHP", "SQL", "React", "Next.js"].map((tech) => (
              <motion.span
                key={tech}
                whileHover={shouldReduceMotion ? {} : { scale: 1.06, y: -1 }}
                transition={{ duration: 0.15 }}
                className="bg-beige text-obsidian text-xs font-extrabold px-3 py-1 rounded-md border-2 border-obsidian font-mono shadow-sharp-sm hover:bg-sage transition-colors cursor-pointer"
              >
                {tech}
              </motion.span>
            ))}
          </div>
        </motion.div>

        {/* Right Column: User Portrait Image with Framer Motion reveal */}
        <motion.div
          initial={shouldReduceMotion ? { opacity: 1 } : { opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.4, delay: 0.1 }}
          className="lg:col-span-5 flex justify-center lg:justify-end"
        >
          <motion.div
            whileHover={shouldReduceMotion ? {} : { scale: 1.02, rotate: 0.5 }}
            transition={{ duration: 0.2 }}
            className="relative w-full max-w-sm aspect-[3/4] bg-beige border-2 border-obsidian rounded-2xl p-3.5 shadow-sharp hover:shadow-sharp-lg transition-all relative overflow-hidden group cursor-pointer"
          >
            <div className="absolute top-5 left-5 z-10 bg-sage text-obsidian text-xs font-black px-3 py-1 rounded border-2 border-obsidian font-mono shadow-sharp-sm">
              DEV // PROFILE
            </div>

            <div className="w-full h-full relative rounded-xl border-2 border-obsidian overflow-hidden bg-cream">
              <Image
                src="/faiqa_user_avatar.jpg"
                alt="Faiqa Rashid - Developer Portrait"
                fill
                priority
                sizes="(max-width: 768px) 100vw, 400px"
                className="object-cover object-top group-hover:scale-105 transition-transform duration-300"
              />
            </div>

            <div className="absolute bottom-5 right-5 z-10 bg-cream text-obsidian text-xs font-mono font-black px-3 py-1 rounded border-2 border-obsidian shadow-sharp-sm">
              AI/NLP & Full-Stack
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
