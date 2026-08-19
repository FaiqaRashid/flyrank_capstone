import type { Metadata } from "next";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import ClientWidgets from "./components/ClientWidgets";
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
        {/* Sticky Header Navigation */}
        <Navbar />

        {/* Main Content Area */}
        <main className="flex-1 w-full">{children}</main>

        {/* Lazy-Loaded Non-Critical Client Widgets (FloatingChatbot, WebtoonIntro, BackToTop) */}
        <ClientWidgets />

        {/* Footer */}
        <Footer />
      </body>
    </html>
  );
}
