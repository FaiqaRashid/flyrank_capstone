"use client";

import { useEffect, useState } from "react";
import dynamic from "next/dynamic";

// Lazy-load non-critical client components when main thread is idle to eliminate initial TBT overhead
const FloatingChatbot = dynamic(() => import("./FloatingChatbot"), {
  ssr: false,
});

const WebtoonIntro = dynamic(() => import("./WebtoonIntro"), {
  ssr: false,
});

const BackToTop = dynamic(() => import("./BackToTop"), {
  ssr: false,
});

export default function ClientWidgets() {
  const [isIdleLoaded, setIsIdleLoaded] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") return;

    if ("requestIdleCallback" in window) {
      const handle = (window as any).requestIdleCallback(
        () => setIsIdleLoaded(true),
        { timeout: 1500 }
      );
      return () => (window as any).cancelIdleCallback(handle);
    } else {
      const timer = setTimeout(() => setIsIdleLoaded(true), 1000);
      return () => clearTimeout(timer);
    }
  }, []);

  if (!isIdleLoaded) {
    return null;
  }

  return (
    <>
      <WebtoonIntro />
      <FloatingChatbot />
      <BackToTop />
    </>
  );
}
