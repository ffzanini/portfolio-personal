"use client";
import dynamic from "next/dynamic";

const Footer = dynamic(
  () => import("@/components/ui").then((mod) => ({ default: mod.Footer })),
  { ssr: false, loading: () => null },
);

export function LazyFooter() {
  return <Footer />;
}
