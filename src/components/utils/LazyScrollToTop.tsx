"use client";
import dynamic from "next/dynamic";

const ScrollToTopButton = dynamic(
  () => import("@/components/utils").then((mod) => ({ default: mod.ScrollToTopButton })),
  { ssr: false },
);

export function LazyScrollToTop() {
  return <ScrollToTopButton />;
}
