import type { Metadata } from "next";
import ChatWindow from "../components/ChatWindow";

export const metadata: Metadata = {
  title: "AI Chat Assistant | Faiqa Rashid Portfolio",
  description: "Interactive AI assistant powered by Groq AI streaming API.",
};

export default function ChatPage() {
  return (
    <section className="section-padding max-w-5xl mx-auto space-y-6">
      {/* Header section */}
      <div className="space-y-3">
        <span className="inline-block bg-sage text-obsidian font-mono font-black text-xs px-3 py-1 rounded-md border-2 border-obsidian uppercase tracking-wider shadow-sharp-sm">
          INTERACTIVE AI FEATURE
        </span>
        <h1 className="text-3xl sm:text-4xl font-black text-obsidian tracking-tight">
          AI Assistant
        </h1>
        <p className="text-base sm:text-lg text-obsidian/90 max-w-2xl font-medium leading-relaxed">
          Ask questions in real-time about Faiqa Rashid&apos;s background, skills, and full-stack software projects powered by Groq AI streaming.
        </p>
      </div>

      {/* Dedicated Chat Window Container */}
      <div className="h-[600px] w-full">
        <ChatWindow />
      </div>
    </section>
  );
}
