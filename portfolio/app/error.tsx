"use client";

import React, { useEffect } from "react";
import Link from "next/link";

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error("Route error boundary caught failure:", error);
  }, [error]);

  return (
    <div className="min-h-screen bg-cream text-obsidian flex flex-col items-center justify-center p-6 text-center">
      <div className="max-w-md w-full bg-beige border-2 border-obsidian rounded-2xl p-8 shadow-sharp space-y-6">
        <div className="w-14 h-14 bg-[#FEE2E2] text-[#7F1D1D] rounded-full border-2 border-[#991B1B] mx-auto flex items-center justify-center font-black text-2xl shadow-sharp-sm">
          ⚠️
        </div>

        <div className="space-y-2">
          <h1 className="text-2xl font-black text-obsidian uppercase tracking-tight">
            Something Went Wrong
          </h1>
          <p className="text-sm font-medium text-obsidian/80 leading-relaxed">
            An unexpected application error occurred while loading this page.
          </p>
          {error?.message && (
            <div className="bg-cream border-2 border-obsidian/30 rounded-xl p-3 text-xs font-mono font-bold text-obsidian/70 break-words text-left">
              {error.message}
            </div>
          )}
        </div>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
          <button
            onClick={() => reset()}
            className="w-full sm:w-auto bg-sage hover:bg-sage/90 text-obsidian font-mono text-xs font-black uppercase px-5 py-3 rounded-xl border-2 border-obsidian shadow-sharp-sm transition-all cursor-pointer"
          >
            Try Again ↻
          </button>
          <Link
            href="/"
            className="w-full sm:w-auto bg-cream hover:bg-beige text-obsidian font-mono text-xs font-black uppercase px-5 py-3 rounded-xl border-2 border-obsidian shadow-sharp-sm transition-all text-center"
          >
            Return Home 🏠
          </Link>
        </div>
      </div>
    </div>
  );
}
