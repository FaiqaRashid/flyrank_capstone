import type { Metadata } from "next";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import FloatingChatbot from "./components/FloatingChatbot";
import BackToTop from "./components/BackToTop";
import WebtoonIntro from "./components/WebtoonIntro";
import "./globals.css";

export const metadata: Metadata = {
  title: "Faiqa Rashid | Full-Stack & AI Engineering Portfolio",
  description:
    "Portfolio of Faiqa Rashid, Computer Science student specializing in full-stack web development, AI/NLP integration, and accessibility-first design.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full antialiased scroll-smooth">
      <body className="min-h-full flex flex-col bg-cream text-obsidian selection:bg-sage selection:text-obsidian">
        {/* Webtoon Intro sequence overlay */}
        <WebtoonIntro />

        {/* Sticky Header Navigation */}
        <Navbar />

        {/* Main Content Area */}
        <main className="flex-1 w-full">{children}</main>

        {/* Global Floating Chatbot Widget */}
        <FloatingChatbot />

        {/* Global Back To Top Button */}
        <BackToTop />

        {/* Footer */}
        <Footer />
      </body>
    </html>
  );
}
