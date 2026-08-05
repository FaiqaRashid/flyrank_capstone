"use client";

import React, { useRef, useState, useLayoutEffect, useCallback } from "react";
import { useChat } from "@ai-sdk/react";

/**
 * ============================================================================
 * CHATWINDOW COMPONENT
 * ============================================================================
 * A real-time, responsive streaming AI chat component that connects to the Next.js
 * `/api/chat` route using Vercel AI SDK's `useChat` hook.
 */
export default function ChatWindow() {
  /**
   * --------------------------------------------------------------------------
   * 1. STREAMING & CONTEXT MANAGEMENT VIA USECHAT HOOK
   * --------------------------------------------------------------------------
   * We use the Vercel AI SDK's `useChat` hook directly for all state & network calls:
   * - `messages`: Conversation history array automatically sent with every request to preserve multi-turn context.
   * - `input`: Controlled string state for the text input field.
   * - `handleInputChange`: Input change handler bound to the text field's onChange.
   * - `handleSubmit`: Form submit handler that sends a real POST request to /api/chat.
   * - `isLoading`: Boolean indicating whether an HTTP stream request is active.
   * - `stop`: Function to cancel the active stream immediately while keeping partial response text.
   * - `append`: Helper to append a user message directly (used by quick suggestion chips).
   */
  const {
    messages,
    input,
    handleInputChange,
    handleSubmit,
    isLoading,
    stop,
    append,
  } = useChat({
    api: "/api/chat",
  });

  // Reference to the scrollable chat messages container
  const scrollContainerRef = useRef<HTMLDivElement | null>(null);

  /**
   * --------------------------------------------------------------------------
   * 2. AUTO-SCROLL LOGIC EXPLANATION
   * --------------------------------------------------------------------------
   * Problem: Forcing auto-scroll on every incoming streamed token can disrupt users
   *          who have manually scrolled up to read previous messages.
   *
   * Solution:
   * 1. `isAtBottomRef` tracks whether the user is currently at/near the bottom of the container.
   * 2. `handleScroll` updates `isAtBottomRef.current` whenever the user scrolls manually:
   *    - If distance from bottom <= 60px -> user is at bottom -> hide "Jump to latest".
   *    - If distance from bottom > 60px -> user scrolled up -> show "Jump to latest".
   * 3. `useLayoutEffect` triggers on `messages` or `isLoading` updates:
   *    - If `isAtBottomRef.current === true`, automatically scroll container to bottom.
   *    - If `isAtBottomRef.current === false`, preserve user's manual scroll position.
   */
  const isAtBottomRef = useRef<boolean>(true);
  const [showJumpToBottom, setShowJumpToBottom] = useState<boolean>(false);

  // Monitor user scrolling to detect if they have scrolled away from the bottom
  const handleScroll = useCallback(() => {
    const container = scrollContainerRef.current;
    if (!container) return;

    const threshold = 60;
    const distanceFromBottom = container.scrollHeight - container.scrollTop - container.clientHeight;
    const isBottom = distanceFromBottom <= threshold;

    isAtBottomRef.current = isBottom;
    setShowJumpToBottom(!isBottom);
  }, []);

  // Auto-scroll effect: scroll to bottom whenever messages or streaming updates occur, ONLY if user was already at bottom
  useLayoutEffect(() => {
    const container = scrollContainerRef.current;
    if (!container) return;

    if (isAtBottomRef.current) {
      container.scrollTo({
        top: container.scrollHeight,
        behavior: "smooth",
      });
    }
  }, [messages, isLoading]);

  // Scroll to bottom manually when clicking "Jump to latest" button
  const scrollToBottom = () => {
    const container = scrollContainerRef.current;
    if (!container) return;

    container.scrollTo({
      top: container.scrollHeight,
      behavior: "smooth",
    });
    isAtBottomRef.current = true;
    setShowJumpToBottom(false);
  };

  /**
   * --------------------------------------------------------------------------
   * 3. THINKING INDICATOR STATE DETECTOR
   * --------------------------------------------------------------------------
   * When `isLoading` is true and the last message in `messages` is a user message
   * (or an assistant message with empty content), we display a smooth thinking indicator
   * bubble. As tokens arrive from Groq, they seamlessly replace/populate the text.
   */
  const lastMessage = messages[messages.length - 1];
  const isWaitingForFirstToken = isLoading && (!lastMessage || lastMessage.role === "user");

  return (
    <div className="flex flex-col h-[calc(100vh-12rem)] min-h-[500px] max-w-4xl mx-auto bg-surface rounded-2xl border border-brown/20 shadow-xl overflow-hidden">
      {/* Chat Header */}
      <div className="bg-primary text-primary-foreground px-4 sm:px-6 py-4 flex items-center justify-between border-b border-brown/30 shadow-sm">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-accent text-accent-foreground flex items-center justify-center font-bold text-sm tracking-wide shadow">
            AI
          </div>
          <div>
            <h2 className="font-bold text-base sm:text-lg text-cream leading-tight">Faiqa&apos;s AI Assistant</h2>
            <p className="text-xs text-cream/80 flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
              Powered by Groq AI (Llama 3.3)
            </p>
          </div>
        </div>
        {messages.length > 0 && (
          <span className="text-xs bg-secondary/60 text-cream/90 px-2.5 py-1 rounded-full border border-maroon/30 hidden sm:inline-block">
            {messages.length} message{messages.length > 1 ? "s" : ""}
          </span>
        )}
      </div>

      {/* Messages Scroll Area */}
      <div
        ref={scrollContainerRef}
        onScroll={handleScroll}
        className="flex-1 p-4 sm:p-6 overflow-y-auto space-y-4 relative scroll-smooth bg-background/30"
      >
        {/* Welcome Empty State */}
        {messages.length === 0 && (
          <div className="h-full flex flex-col items-center justify-center text-center p-6 my-auto text-foreground/80">
            <div className="w-16 h-16 rounded-2xl bg-secondary/10 border border-brown/20 flex items-center justify-center mb-4 shadow-inner">
              <svg className="w-8 h-8 text-maroon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
              </svg>
            </div>
            <h3 className="text-lg font-bold text-primary mb-2">Hello! How can I help you today?</h3>
            <p className="text-sm text-foreground/70 max-w-md mb-6">
              Ask me anything about Faiqa Rashid&apos;s background, skills, software projects, or experience as a Front-End AI Engineering intern!
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 w-full max-w-lg text-left text-xs">
              <button
                type="button"
                onClick={() => append({ role: "user", content: "Tell me about Faiqa Rashid's background and skills." })}
                className="p-3 bg-surface hover:bg-cream border border-brown/20 rounded-xl text-foreground font-medium transition-all shadow-xs hover:border-gold cursor-pointer"
              >
                💡 &quot;Tell me about Faiqa&apos;s skills&quot;
              </button>
              <button
                type="button"
                onClick={() => append({ role: "user", content: "What projects has Faiqa built?" })}
                className="p-3 bg-surface hover:bg-cream border border-brown/20 rounded-xl text-foreground font-medium transition-all shadow-xs hover:border-gold cursor-pointer"
              >
                🚀 &quot;What projects has Faiqa built?&quot;
              </button>
            </div>
          </div>
        )}

        {/* Render Conversation Messages */}
        {messages.map((message) => {
          const isUser = message.role === "user";
          const isAssistant = message.role === "assistant";

          return (
            <div
              key={message.id}
              className={`flex items-start gap-2.5 max-w-[88%] sm:max-w-[80%] ${
                isUser ? "ml-auto flex-row-reverse" : "mr-auto"
              }`}
            >
              {/* Avatar Badge */}
              <div
                className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 text-xs font-bold shadow-xs ${
                  isUser
                    ? "bg-maroon text-cream border border-brown/30"
                    : "bg-accent text-accent-foreground border border-gold"
                }`}
              >
                {isUser ? "You" : "AI"}
              </div>

              {/* Message Bubble */}
              <div
                className={`p-3.5 sm:p-4 rounded-2xl text-sm sm:text-base leading-relaxed transition-all shadow-sm ${
                  isUser
                    ? "bg-primary text-primary-foreground rounded-tr-xs border border-maroon/40"
                    : "bg-surface text-surface-foreground rounded-tl-xs border border-brown/20"
                }`}
              >
                {/* Streaming Assistant Text vs Empty Streaming Content */}
                {isAssistant && !message.content && isLoading ? (
                  <div className="flex items-center gap-2 text-xs font-semibold text-ochre animate-pulse py-1">
                    <span className="w-2 h-2 rounded-full bg-gold animate-bounce"></span>
                    <span className="w-2 h-2 rounded-full bg-gold animate-bounce [animation-delay:0.15s]"></span>
                    <span className="w-2 h-2 rounded-full bg-gold animate-bounce [animation-delay:0.3s]"></span>
                    <span className="ml-1 tracking-wider uppercase">Thinking...</span>
                  </div>
                ) : (
                  <div className="whitespace-pre-wrap break-words">{message.content}</div>
                )}
              </div>
            </div>
          );
        })}

        {/* 
          THINKING INDICATOR BEFORE FIRST TOKEN ARRIVES
          Appears immediately when user sends a message, transitioning seamlessly
          into streamed tokens when Groq starts outputting content.
        */}
        {isWaitingForFirstToken && (
          <div className="flex items-start gap-2.5 max-w-[88%] sm:max-w-[80%] mr-auto animate-fade-in">
            <div className="w-8 h-8 rounded-full bg-accent text-accent-foreground border border-gold flex items-center justify-center shrink-0 text-xs font-bold shadow-xs">
              AI
            </div>
            <div className="p-3.5 sm:p-4 rounded-2xl text-sm bg-surface text-surface-foreground rounded-tl-xs border border-brown/20 shadow-sm">
              <div className="flex items-center gap-2 text-xs font-semibold text-brown/90 py-0.5">
                <span className="w-2 h-2 rounded-full bg-gold animate-bounce"></span>
                <span className="w-2 h-2 rounded-full bg-gold animate-bounce [animation-delay:0.15s]"></span>
                <span className="w-2 h-2 rounded-full bg-gold animate-bounce [animation-delay:0.3s]"></span>
                <span className="ml-1 tracking-wider uppercase text-ochre">Thinking...</span>
              </div>
            </div>
          </div>
        )}

        {/* Floating "Jump to Latest" Button when Scrolled Up */}
        {showJumpToBottom && (
          <button
            type="button"
            onClick={scrollToBottom}
            className="sticky bottom-2 left-1/2 -translate-x-1/2 bg-secondary text-secondary-foreground hover:bg-hover hover:text-hover-foreground px-3.5 py-1.5 rounded-full text-xs font-bold shadow-lg border border-gold/40 flex items-center gap-1.5 transition-all animate-bounce z-10 cursor-pointer"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
            </svg>
            Jump to latest
          </button>
        )}
      </div>

      {/* Input Form Footer (Mobile friendly at 375px) */}
      <form onSubmit={handleSubmit} className="p-3 sm:p-4 bg-surface border-t border-brown/20">
        <div className="flex items-center gap-2 max-w-full">
          <input
            value={input}
            onChange={handleInputChange}
            placeholder="Type a message..."
            className="flex-1 min-w-0 bg-background/50 border border-brown/30 text-foreground placeholder:text-foreground/50 text-base sm:text-sm rounded-xl px-3.5 py-2.5 sm:py-3 focus:outline-none focus:ring-2 focus:ring-accent focus:bg-background transition-all"
            aria-label="Chat input message"
          />

          {/* STOP BUTTON: Visible while streaming to immediately abort generation */}
          {isLoading ? (
            <button
              type="button"
              onClick={stop}
              className="bg-maroon hover:bg-maroon/90 text-cream px-3.5 sm:px-4 py-2.5 sm:py-3 rounded-xl text-sm font-bold flex items-center gap-1.5 transition-all shadow-md shrink-0 focus:ring-2 focus:ring-accent cursor-pointer"
              aria-label="Stop generation"
            >
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                <rect x="6" y="6" width="12" height="12" rx="2" />
              </svg>
              <span className="hidden sm:inline">Stop</span>
            </button>
          ) : (
            /* SEND BUTTON */
            <button
              type="submit"
              disabled={!input.trim()}
              className="bg-accent hover:bg-hover text-accent-foreground font-bold px-4 sm:px-5 py-2.5 sm:py-3 rounded-xl text-sm flex items-center gap-1.5 transition-all shadow-md disabled:opacity-50 disabled:cursor-not-allowed shrink-0 focus:ring-2 focus:ring-gold cursor-pointer"
              aria-label="Send message"
            >
              <span>Send</span>
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M12 19l9-7-9-7-9 7 9 7zm0 0v-7" />
              </svg>
            </button>
          )}
        </div>
      </form>
    </div>
  );
}
