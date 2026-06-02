"use client";
import dynamic from "next/dynamic";

const Footer = dynamic(
  () => import("@/components/ui").then((mod) => ({ default: mod.Footer })),
  {
    ssr: true,
    loading: () => (
      <div className="h-30 lg:h-18" />
    ),
  },
);

export function LazyFooter() {
  return <Footer />;
}
