import type { Metadata } from "next";

import { SITE_URL } from "@/constants/seo";

export const metadata: Metadata = {
  robots: { index: false, follow: true },
  alternates: {
    canonical: `${SITE_URL}/pt`,
  },
};

export default function IntroPage() {
  return (
    <>
      <noscript>
        <meta httpEquiv="refresh" content="0;url=/pt" />
      </noscript>
      <div className="min-h-dvh bg-[#0c0c0e]" aria-hidden />
    </>
  );
}
