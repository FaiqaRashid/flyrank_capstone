"use client";

import React, { useState } from "react";
import { m, useReducedMotion } from "framer-motion";

export default function Contact() {
  const shouldReduceMotion = useReducedMotion();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [submitted, setSubmitted] = useState<boolean>(false);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [warningMessage, setWarningMessage] = useState<string | null>(null);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    if (errorMessage) setErrorMessage(null);
    if (warningMessage) setWarningMessage(null);
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);
    setWarningMessage(null);

    if (!formData.name.trim() || !formData.email.trim() || !formData.message.trim()) {
      setWarningMessage("Please fill in all required fields before submitting.");
      return;
    }

    if (!formData.email.includes("@") || !formData.email.includes(".")) {
      setErrorMessage("Please enter a valid email address.");
      return;
    }

    setIsSubmitting(true);

    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitted(true);
      setFormData({ name: "", email: "", message: "" });
    }, 1200);
  };

  return (
    <section
      id="contact"
      className="section-padding scroll-mt-20 border-b-2 border-obsidian bg-cream overflow-hidden"
    >
      <m.div
        initial={shouldReduceMotion ? { opacity: 1 } : { opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-50px" }}
        transition={{ duration: 0.35, ease: "easeOut" }}
        className="max-w-4xl mx-auto space-y-8"
      >
        {/* Section Header */}
        <div className="flex items-center gap-3">
          <span className="w-4 h-4 bg-sage rounded-full border-2 border-obsidian"></span>
          <h2 className="text-2xl sm:text-3xl font-black text-obsidian uppercase tracking-tight">
            04 // Get In Touch
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start">
          {/* Left Column: Direct info & social links */}
          <div className="md:col-span-5 space-y-6 bg-beige border-2 border-obsidian rounded-2xl p-6 sm:p-8 shadow-sharp hover:shadow-sharp-lg transition-shadow duration-200">
            <h3 className="text-xl font-black text-obsidian">
              Let&apos;s Build Together
            </h3>
            <p className="text-sm text-obsidian/90 font-medium leading-relaxed">
              Have a project in mind, an opportunity to discuss, or questions about my full-stack & AI development work? Send me a message!
            </p>

            <div className="space-y-3 pt-2">
              <div className="text-xs font-mono font-black uppercase text-obsidian/70">
                Direct Profiles:
              </div>
              <div className="flex items-center gap-3">
                <m.a
                  whileHover={shouldReduceMotion ? {} : { scale: 1.04 }}
                  whileTap={shouldReduceMotion ? {} : { scale: 0.96 }}
                  transition={{ duration: 0.15 }}
                  href="https://github.com/FaiqaRashid/FaiqaRashid"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 flex items-center justify-center gap-2 p-3 bg-cream hover:bg-sage text-obsidian border-2 border-obsidian rounded-xl font-mono text-xs font-black shadow-sharp-sm transition-colors cursor-pointer focus-visible:ring-2 focus-visible:ring-obsidian"
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
                  <span>GitHub</span>
                </m.a>

                <m.a
                  whileHover={shouldReduceMotion ? {} : { scale: 1.04 }}
                  whileTap={shouldReduceMotion ? {} : { scale: 0.96 }}
                  transition={{ duration: 0.15 }}
                  href="https://www.linkedin.com/in/faiqarashid/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 flex items-center justify-center gap-2 p-3 bg-cream hover:bg-sage text-obsidian border-2 border-obsidian rounded-xl font-mono text-xs font-black shadow-sharp-sm transition-colors cursor-pointer focus-visible:ring-2 focus-visible:ring-obsidian"
                >
                  <svg
                    className="w-4 h-4 fill-current"
                    viewBox="0 0 24 24"
                  >
                    <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.46 10.9v8.37H9.25V10.9H6.46M7.86 6.74a1.62 1.62 0 1 0 0 3.24 1.62 1.62 0 0 0 0-3.24z" />
                  </svg>
                  <span>LinkedIn</span>
                </m.a>
              </div>
            </div>
          </div>

          {/* Right Column: Working Contact Form */}
          <div className="md:col-span-7 bg-beige border-2 border-obsidian rounded-2xl p-6 sm:p-8 shadow-sharp hover:shadow-sharp-lg transition-shadow duration-200">
            {submitted ? (
              <div
                className="bg-[#DCFCE7] text-[#14532D] border-2 border-[#166534] rounded-xl p-6 text-center space-y-4 shadow-sharp-sm animate-fade-in"
                role="status"
              >
                <div className="w-12 h-12 bg-[#166534] text-white rounded-full border-2 border-obsidian mx-auto flex items-center justify-center font-black text-xl shadow-sharp-sm">
                  ✓
                </div>
                <h4 className="text-xl font-black text-[#14532D]">
                  Message Received!
                </h4>
                <p className="text-sm font-medium text-[#14532D]">
                  Thank you for reaching out. I will review your message and reply as soon as possible.
                </p>
                <m.button
                  whileHover={shouldReduceMotion ? {} : { scale: 1.04 }}
                  whileTap={shouldReduceMotion ? {} : { scale: 0.96 }}
                  type="button"
                  onClick={() => setSubmitted(false)}
                  className="bg-sage hover:bg-sage/90 text-obsidian font-mono text-xs font-black uppercase px-4 py-2 rounded-lg border-2 border-obsidian shadow-sharp-sm cursor-pointer"
                >
                  Send Another Message
                </m.button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                {errorMessage && (
                  <div
                    className="bg-[#FEE2E2] text-[#7F1D1D] border-2 border-[#991B1B] p-3 rounded-xl text-xs font-mono font-bold flex items-center justify-between shadow-sharp-sm"
                    role="alert"
                  >
                    <div className="flex items-center gap-1.5">
                      <span className="font-black text-base">⚠️</span>
                      <span>{errorMessage}</span>
                    </div>
                    <button
                      type="button"
                      onClick={() => setErrorMessage(null)}
                      className="text-[#7F1D1D] font-black text-sm cursor-pointer ml-2"
                      aria-label="Dismiss error message"
                    >
                      ✕
                    </button>
                  </div>
                )}

                {warningMessage && (
                  <div
                    className="bg-[#FEF3C7] text-[#78350F] border-2 border-[#92400E] p-3 rounded-xl text-xs font-mono font-bold flex items-center justify-between shadow-sharp-sm"
                    role="status"
                  >
                    <div className="flex items-center gap-1.5">
                      <span>💡</span>
                      <span>{warningMessage}</span>
                    </div>
                    <button
                      type="button"
                      onClick={() => setWarningMessage(null)}
                      className="text-[#78350F] font-black text-sm cursor-pointer ml-2"
                      aria-label="Dismiss warning message"
                    >
                      ✕
                    </button>
                  </div>
                )}

                <div>
                  <label
                    htmlFor="name"
                    className="block text-xs font-mono font-black uppercase text-obsidian mb-1.5"
                  >
                    Your Name <span className="text-obsidian">*</span>
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    required
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="Jane Doe"
                    className="w-full bg-cream border-2 border-obsidian rounded-xl px-4 py-3 text-sm text-obsidian placeholder:text-obsidian/50 font-medium focus:outline-none focus-visible:ring-2 focus-visible:ring-sage"
                  />
                </div>

                <div>
                  <label
                    htmlFor="email"
                    className="block text-xs font-mono font-black uppercase text-obsidian mb-1.5"
                  >
                    Your Email <span className="text-obsidian">*</span>
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    required
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="jane@example.com"
                    className="w-full bg-cream border-2 border-obsidian rounded-xl px-4 py-3 text-sm text-obsidian placeholder:text-obsidian/50 font-medium focus:outline-none focus-visible:ring-2 focus-visible:ring-sage"
                  />
                </div>

                <div>
                  <label
                    htmlFor="message"
                    className="block text-xs font-mono font-black uppercase text-obsidian mb-1.5"
                  >
                    Message <span className="text-obsidian">*</span>
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    required
                    rows={4}
                    value={formData.message}
                    onChange={handleChange}
                    placeholder="Hello Faiqa, I'd like to talk about..."
                    className="w-full bg-cream border-2 border-obsidian rounded-xl px-4 py-3 text-sm text-obsidian placeholder:text-obsidian/50 font-medium focus:outline-none focus-visible:ring-2 focus-visible:ring-sage resize-y"
                  ></textarea>
                </div>

                {/* Submit Button */}
                <m.button
                  whileHover={shouldReduceMotion ? {} : { scale: 1.02 }}
                  whileTap={shouldReduceMotion ? {} : { scale: 0.98 }}
                  transition={{ duration: 0.15 }}
                  type="submit"
                  disabled={isSubmitting}
                  className="relative overflow-hidden w-full bg-sage hover:bg-sage/90 text-obsidian font-black text-base py-3.5 rounded-xl border-2 border-obsidian shadow-sharp transition-colors cursor-pointer disabled:opacity-80 disabled:cursor-not-allowed focus-visible:ring-2 focus-visible:ring-obsidian"
                >
                  {isSubmitting ? (
                    <div className="flex items-center justify-center gap-2">
                      <span className="w-4 h-4 rounded-full border-2 border-obsidian border-t-transparent animate-spin"></span>
                      <span className="font-mono text-sm uppercase">Sending Message...</span>
                      <span className="absolute inset-0 skeleton-shimmer opacity-40 pointer-events-none"></span>
                    </div>
                  ) : (
                    "Send Message 🚀"
                  )}
                </m.button>
              </form>
            )}
          </div>
        </div>
      </m.div>
    </section>
  );
}
