"use client";

import React, { useRef, useState, useEffect, useLayoutEffect, useCallback } from "react";
import { useChat } from "@ai-sdk/react";
import { useReducedMotion } from "framer-motion";

interface ChatWindowProps {
  onClose?: () => void;
  isExpanded?: boolean;
  onToggleExpand?: () => void;
}

export default function ChatWindow({
  onClose,
  isExpanded = false,
  onToggleExpand,
}: ChatWindowProps) {
  const shouldReduceMotion = useReducedMotion();

  const {
    messages,
    input,
    handleInputChange,
    handleSubmit,
    isLoading,
    stop,
    append,
    error,
    reload,
  } = useChat({
    api: "/api/chat",
    onError: (err) => {
      console.error("AI Assistant Chat Error:", err);
    },
  });

  const scrollContainerRef = useRef<HTMLDivElement | null>(null);
  const inputRef = useRef<HTMLInputElement | null>(null);
  const isAtBottomRef = useRef<boolean>(true);
  const [showJumpToBottom, setShowJumpToBottom] = useState<boolean>(false);
  const [warningMessage, setWarningMessage] = useState<string | null>(null);

  // Synchronous Ref & Timestamp Lock to eliminate multi-click race conditions on Retry
  const isRetryingRef = useRef<boolean>(false);
  const lastRetryTimeRef = useRef<number>(0);

  // Reset retry lock only after request finishes and cooldown period elapses
  useEffect(() => {
    if (!isLoading && Date.now() - lastRetryTimeRef.current > 1500) {
      isRetryingRef.current = false;
    }
  }, [isLoading, error]);

  // Client-side text-pacing layer state
  const [pacedText, setPacedText] = useState<string>("");
  const pacedMessageIdRef = useRef<string | null>(null);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  const lastMessage = messages[messages.length - 1];
  const isAssistantStreaming =
    lastMessage && lastMessage.role === "assistant";

  // Client-side progressive text pacing algorithm
  useEffect(() => {
    if (shouldReduceMotion) {
      if (lastMessage?.role === "assistant") {
        setPacedText(lastMessage.content);
      }
      return;
    }

    if (!isAssistantStreaming) {
      setPacedText("");
      pacedMessageIdRef.current = null;
      if (timerRef.current) clearInterval(timerRef.current);
      return;
    }

    const msgId = lastMessage.id;
    const targetContent = lastMessage.content;

    // Reset for new message
    if (pacedMessageIdRef.current !== msgId) {
      pacedMessageIdRef.current = msgId;
      setPacedText("");
    }

    if (timerRef.current) {
      clearInterval(timerRef.current);
    }

    timerRef.current = setInterval(() => {
      setPacedText((prev) => {
        if (prev.length >= targetContent.length) {
          if (timerRef.current) clearInterval(timerRef.current);
          return targetContent;
        }
        // Pacing step: reveal 2-3 characters every 18ms for smooth, natural typing
        const step = Math.min(3, targetContent.length - prev.length);
        return targetContent.slice(0, prev.length + step);
      });
    }, 18);

    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [lastMessage?.id, lastMessage?.content, isAssistantStreaming, shouldReduceMotion]);

  // Focus input when mounted
  useLayoutEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, []);

  const handleScroll = useCallback(() => {
    const container = scrollContainerRef.current;
    if (!container) return;

    const threshold = 60;
    const distanceFromBottom =
      container.scrollHeight - container.scrollTop - container.clientHeight;
    const isBottom = distanceFromBottom <= threshold;

    isAtBottomRef.current = isBottom;
    setShowJumpToBottom(!isBottom);
  }, []);

  // Smooth auto-scroll as text reveals progressively
  useLayoutEffect(() => {
    const container = scrollContainerRef.current;
    if (!container) return;

    if (isAtBottomRef.current) {
      container.scrollTo({
        top: container.scrollHeight,
        behavior: "smooth",
      });
    }
  }, [messages, pacedText, isLoading, error]);

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

  const handleStop = () => {
    stop();
    if (timerRef.current) {
      clearInterval(timerRef.current);
    }
    if (lastMessage?.role === "assistant") {
      setPacedText(lastMessage.content);
    }
  };

  // Synchronous Ref & Timestamp locked Retry Handler preventing burst click duplicate requests
  const handleRetry = useCallback((e?: React.MouseEvent) => {
    if (e) {
      e.preventDefault();
      e.stopPropagation();
    }

    const now = Date.now();
    if (
      isRetryingRef.current ||
      isLoading ||
      now - lastRetryTimeRef.current < 2000
    ) {
      return;
    }

    isRetryingRef.current = true;
    lastRetryTimeRef.current = now;

    reload();
  }, [isLoading, reload]);

  const handleFormSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    setWarningMessage(null);
    if (!input.trim()) {
      e.preventDefault();
      setWarningMessage("Please enter a message before sending.");
      return;
    }
    handleSubmit(e);
  };

  const getSpecificErrorMessage = (err: Error | null | undefined): string => {
    if (!err) return "An unexpected error occurred.";
    if (typeof window !== "undefined" && !navigator.onLine) {
      return "Couldn't reach the server — check your connection";
    }

    const lower = (err.message || "").toLowerCase();

    if (
      lower.includes("fetch") ||
      lower.includes("network") ||
      lower.includes("failed to fetch") ||
      lower.includes("offline")
    ) {
      return "Couldn't reach the server — check your connection";
    }

    if (
      lower.includes("429") ||
      lower.includes("rate limit") ||
      lower.includes("too many requests")
    ) {
      return "Too many requests right now — try again in a moment";
    }

    return "Something went wrong — please try again.";
  };

  const isWaitingForFirstToken =
    isLoading && (!lastMessage || lastMessage.role === "user");

  return (
    <div className="flex flex-col h-full w-full bg-cream border-2 border-obsidian rounded-2xl shadow-sharp overflow-hidden transition-all duration-300">
      {/* Chat Header */}
      <div className="bg-sage text-obsidian px-4 py-3.5 flex items-center justify-between border-b-2 border-obsidian">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-full bg-cream border-2 border-obsidian text-obsidian flex items-center justify-center font-black text-xs font-mono shadow-sharp-sm">
            AI
          </div>
          <div>
            <h2 className="font-black text-sm sm:text-base text-obsidian leading-tight">
              Faiqa&apos;s AI Assistant
            </h2>
            <p className="text-[11px] font-mono font-bold text-obsidian/80 flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-obsidian animate-pulse"></span>
              Powered by Groq AI (GPT-OSS)
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          {messages.length > 0 && (
            <span className="text-[10px] font-mono font-black bg-cream text-obsidian px-2.5 py-0.5 rounded-full border border-obsidian hidden sm:inline-block">
              {messages.length} msg{messages.length > 1 ? "s" : ""}
            </span>
          )}

          {/* Expand / Collapse Button */}
          {onToggleExpand && (
            <button
              onClick={onToggleExpand}
              className="p-1 rounded-lg bg-beige hover:bg-cream text-obsidian border-2 border-obsidian transition-all cursor-pointer focus-visible:ring-2 focus-visible:ring-obsidian"
              aria-label={isExpanded ? "Collapse chat" : "Expand chat"}
              title={isExpanded ? "Collapse chat" : "Expand chat"}
            >
              {isExpanded ? (
                <svg
                  className="w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2.5}
                    d="M9 9L4 4m0 0v5m0-5h5m6 0l5 5m0-5v5m0-5h-5m-6 14l-5 5m0 0v-5m0 5h5m6 0l5-5m0 5v-5m0 5h-5"
                  />
                </svg>
              ) : (
                <svg
                  className="w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2.5}
                    d="M4 8V4m0 0h4M4 4l5 5m11-1V4m0 0h-4m4 0l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5l-5-5m5 5v-4m0 4h-4"
                  />
                </svg>
              )}
            </button>
          )}

          {/* Close Button */}
          {onClose && (
            <button
              onClick={onClose}
              className="p-1 rounded-lg bg-beige hover:bg-cream text-obsidian border-2 border-obsidian transition-all cursor-pointer focus-visible:ring-2 focus-visible:ring-obsidian"
              aria-label="Close AI chat assistant"
              title="Close AI chat assistant"
            >
              <svg
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2.5}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          )}
        </div>
      </div>

      {/* Messages Scroll Area */}
      <div
        ref={scrollContainerRef}
        onScroll={handleScroll}
        className="flex-1 p-4 overflow-y-auto space-y-3 relative scroll-smooth bg-cream"
      >
        {/* Welcome State / Quick Suggestion Chips */}
        {messages.length === 0 && (
          <div className="h-full flex flex-col items-center justify-center text-center p-4 my-auto text-obsidian">
            <div className="w-12 h-12 rounded-xl bg-beige border-2 border-obsidian flex items-center justify-center mb-3 shadow-sharp-sm">
              <svg
                className="w-6 h-6 text-obsidian"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z"
                />
              </svg>
            </div>
            <h3 className="text-base font-black text-obsidian mb-1">
              Ask Faiqa&apos;s AI Assistant!
            </h3>
            <p className="text-xs font-medium text-obsidian/80 max-w-xs mb-4">
              Learn about background, skills, full-stack projects, or experience.
            </p>
            <div className="flex flex-col gap-2 w-full max-w-xs text-left text-xs font-mono">
              <button
                type="button"
                onClick={() => {
                  setWarningMessage(null);
                  append({
                    role: "user",
                    content: "What projects has Faiqa built?",
                  });
                }}
                className="p-2.5 bg-beige hover:bg-sage border-2 border-obsidian rounded-xl text-obsidian font-bold transition-all shadow-sharp-sm cursor-pointer text-left"
              >
                🚀 &quot;What projects has Faiqa built?&quot;
              </button>
              <button
                type="button"
                onClick={() => {
                  setWarningMessage(null);
                  append({
                    role: "user",
                    content: "What's Faiqa's tech stack?",
                  });
                }}
                className="p-2.5 bg-beige hover:bg-sage border-2 border-obsidian rounded-xl text-obsidian font-bold transition-all shadow-sharp-sm cursor-pointer text-left"
              >
                💻 &quot;What&apos;s Faiqa&apos;s tech stack?&quot;
              </button>
            </div>
          </div>
        )}

        {/* Message bubbles with Paced Assistant Stream Reveal */}
        {messages.map((message) => {
          const isUser = message.role === "user";
          const isAssistant = message.role === "assistant";
          const isCurrentStreamingMessage =
            isAssistant && message.id === lastMessage?.id;

          // Determine content to display (paced text for active streaming message, or full content)
          const contentToDisplay =
            isCurrentStreamingMessage && !shouldReduceMotion && (isLoading || pacedText.length < message.content.length)
              ? pacedText
              : message.content;

          return (
            <div
              key={message.id}
              className={`flex items-start gap-2 ${
                isExpanded ? "max-w-[85%]" : "max-w-[90%]"
              } ${isUser ? "ml-auto flex-row-reverse" : "mr-auto"}`}
            >
              <div
                className={`w-7 h-7 rounded-full flex items-center justify-center shrink-0 text-[10px] font-mono font-black border-2 border-obsidian shadow-sharp-sm ${
                  isUser ? "bg-sage text-obsidian" : "bg-beige text-obsidian"
                }`}
              >
                {isUser ? "YOU" : "AI"}
              </div>

              <div
                className={`p-3 rounded-xl text-xs sm:text-sm leading-relaxed border-2 border-obsidian shadow-sharp-sm ${
                  isUser
                    ? "bg-sage text-obsidian rounded-tr-none"
                    : "bg-beige text-obsidian rounded-tl-none"
                }`}
              >
                {isAssistant && !contentToDisplay && isLoading ? (
                  <div className="space-y-2 w-48 sm:w-64 py-1">
                    <div className="flex items-center gap-1.5 text-xs font-mono font-black text-obsidian mb-1">
                      <span className="w-2 h-2 rounded-full bg-obsidian animate-bounce"></span>
                      <span className="uppercase">Thinking...</span>
                    </div>
                    <div className="h-3 w-full skeleton-shimmer rounded-md border border-obsidian/30"></div>
                    <div className="h-3 w-4/5 skeleton-shimmer rounded-md border border-obsidian/30"></div>
                    <div className="h-3 w-3/5 skeleton-shimmer rounded-md border border-obsidian/30"></div>
                  </div>
                ) : (
                  <div className="whitespace-pre-wrap break-words">
                    {contentToDisplay}
                    {isCurrentStreamingMessage && isLoading && (
                      <span className="inline-block w-1.5 h-4 bg-obsidian ml-1 animate-pulse align-middle" />
                    )}
                  </div>
                )}
              </div>
            </div>
          );
        })}

        {isWaitingForFirstToken && (
          <div className="flex items-start gap-2 max-w-[90%] mr-auto animate-fade-in">
            <div className="w-7 h-7 rounded-full bg-beige text-obsidian border-2 border-obsidian flex items-center justify-center shrink-0 text-[10px] font-mono font-black shadow-sharp-sm">
              AI
            </div>
            <div className="p-3 rounded-xl text-xs bg-beige text-obsidian border-2 border-obsidian rounded-tl-none shadow-sharp-sm w-48 sm:w-64 space-y-2">
              <div className="flex items-center gap-1.5 text-xs font-mono font-black text-obsidian py-0.5">
                <span className="w-2 h-2 rounded-full bg-obsidian animate-bounce"></span>
                <span className="w-2 h-2 rounded-full bg-obsidian animate-bounce [animation-delay:0.15s]"></span>
                <span className="w-2 h-2 rounded-full bg-obsidian animate-bounce [animation-delay:0.3s]"></span>
                <span className="ml-1 uppercase text-obsidian">Thinking...</span>
              </div>
              <div className="h-3 w-full skeleton-shimmer rounded-md border border-obsidian/30"></div>
              <div className="h-3 w-4/5 skeleton-shimmer rounded-md border border-obsidian/30"></div>
            </div>
          </div>
        )}

        {/* Robust Functional Semantic Error State with Cooldown-Locked Retry Action */}
        {error && (
          <div
            className="bg-[#FEE2E2] text-[#7F1D1D] p-3.5 rounded-xl border-2 border-[#991B1B] text-xs font-mono font-bold space-y-2.5 shadow-sharp-sm animate-fade-in"
            role="alert"
          >
            <div className="flex items-start gap-2">
              <span className="font-black text-base shrink-0">⚠️</span>
              <div className="space-y-1">
                <span className="uppercase tracking-wider font-black block">
                  {getSpecificErrorMessage(error)}
                </span>
                <p className="font-sans font-medium text-[11px] leading-normal opacity-90">
                  {error.message || "An unexpected error occurred during request transmission."}
                </p>
              </div>
            </div>
            <div className="flex items-center gap-2 pt-1 border-t border-[#991B1B]/30">
              <button
                type="button"
                disabled={isLoading || isRetryingRef.current}
                onClick={handleRetry}
                className="bg-[#991B1B] text-white hover:bg-[#7F1D1D] disabled:opacity-50 disabled:cursor-not-allowed px-3 py-1.5 rounded-lg border border-obsidian text-[11px] font-mono font-black uppercase cursor-pointer transition-all flex items-center gap-1.5 shadow-sharp-sm"
              >
                {isLoading ? (
                  <>
                    <span className="w-3 h-3 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
                    <span>Retrying...</span>
                  </>
                ) : (
                  <>
                    <span>Retry ↻</span>
                  </>
                )}
              </button>
            </div>
          </div>
        )}

        {/* Functional Semantic Warning State */}
        {warningMessage && (
          <div
            className="bg-[#FEF3C7] text-[#78350F] p-3 rounded-xl border-2 border-[#92400E] text-xs font-mono font-bold flex items-center justify-between shadow-sharp-sm"
            role="status"
          >
            <div className="flex items-center gap-1.5">
              <span>💡</span>
              <span>{warningMessage}</span>
            </div>
            <button
              type="button"
              onClick={() => setWarningMessage(null)}
              className="text-[#78350F] hover:text-[#92400E] font-black text-sm ml-2 cursor-pointer"
              aria-label="Dismiss warning message"
            >
              ✕
            </button>
          </div>
        )}

        {showJumpToBottom && (
          <button
            type="button"
            onClick={scrollToBottom}
            className="sticky bottom-2 left-1/2 -translate-x-1/2 bg-sage text-obsidian hover:bg-sage/90 px-3 py-1 rounded-full text-xs font-mono font-black border-2 border-obsidian shadow-sharp flex items-center gap-1 transition-all z-10 cursor-pointer"
          >
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
                d="M19 14l-7 7m0 0l-7-7m7 7V3"
              />
            </svg>
            Jump to latest
          </button>
        )}
      </div>

      {/* Input Form Footer */}
      <form
        onSubmit={handleFormSubmit}
        className="p-3 bg-beige border-t-2 border-obsidian"
      >
        <div className="flex items-center gap-2">
          <input
            ref={inputRef}
            value={input}
            onChange={(e) => {
              if (warningMessage) setWarningMessage(null);
              handleInputChange(e);
            }}
            placeholder="Ask AI a question..."
            className="flex-1 min-w-0 bg-cream border-2 border-obsidian text-obsidian placeholder:text-obsidian/50 text-xs sm:text-sm rounded-xl px-3 py-2.5 font-medium focus:outline-none focus-visible:ring-2 focus-visible:ring-sage"
            aria-label="Chat input message"
          />

          {isLoading ? (
            <button
              type="button"
              onClick={handleStop}
              className="bg-beige hover:bg-cream text-obsidian px-3 py-2.5 rounded-xl text-xs font-mono font-black border-2 border-obsidian shadow-sharp-sm flex items-center gap-1 transition-all shrink-0 cursor-pointer"
              aria-label="Stop generation"
            >
              <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
                <rect x="6" y="6" width="12" height="12" rx="2" />
              </svg>
              <span>Stop</span>
            </button>
          ) : (
            <button
              type="submit"
              disabled={!input.trim()}
              className="bg-sage hover:bg-sage/90 text-obsidian font-mono text-xs font-black px-3.5 py-2.5 rounded-xl border-2 border-obsidian shadow-sharp-sm disabled:opacity-50 disabled:cursor-not-allowed shrink-0 transition-all cursor-pointer"
              aria-label="Send message"
            >
              Send ➢
            </button>
          )}
        </div>
      </form>
    </div>
  );
}
