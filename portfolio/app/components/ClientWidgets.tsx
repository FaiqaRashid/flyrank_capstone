"use client";

import dynamic from "next/dynamic";

// Lazy-load non-critical client components on client side to exclude AI SDK & intro animation JS from initial page bundle
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
  return (
    <>
      <WebtoonIntro />
      <FloatingChatbot />
      <BackToTop />
    </>
  );
}
