import type { Metadata } from "next";
import ChatWindow from "../components/ChatWindow";

export const metadata: Metadata = {
  title: "AI Chat | Portfolio",
  description: "Interactive AI assistant powered by Groq AI streaming API.",
};

export default function ChatPage() {
  return (
    <section className="space-y-6">
      {/* Header section */}
      <div className="space-y-2">
        <span className="inline-block bg-accent text-accent-foreground font-bold text-xs px-3 py-1 rounded-full uppercase tracking-wider shadow-sm">
          Interactive AI Feature
        </span>
        <h1 className="text-3xl sm:text-4xl font-black text-primary tracking-tight">AI Assistant</h1>
        <p className="text-base sm:text-lg text-brown max-w-2xl font-medium leading-relaxed">
          Ask questions in real-time about Faiqa Rashid&apos;s background, skills, and projects powered by Groq AI streaming.
        </p>
      </div>

      {/* Main Chat Window Component */}
      <ChatWindow />
    </section>
  );
}

