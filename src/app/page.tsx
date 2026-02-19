import type { Metadata } from "next";

import { Navbar } from "@/components/ui";
import { HomeContent } from "@/components/pages/home/HomeContent";
import { SITE_URL, DEFAULT_OG_IMAGE, PERSON } from "@/constants/seo";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: `${PERSON.name} | ${PERSON.jobTitle} | Desenvolvedor React & Next.js | ffzanini`,
    template: `%s | ${PERSON.name}`,
  },
  description:
    "Felipe Frantz Zanini (ffzanini) - Senior Software Engineer & Frontend Architect especializado em desenvolvimento web, React, Next.js e TypeScript. Explore projetos desenvolvidos, conheça minha stack tecnológica e entre em contato.",
  openGraph: {
    images: [
      {
        url: DEFAULT_OG_IMAGE.url,
        width: DEFAULT_OG_IMAGE.width,
        height: DEFAULT_OG_IMAGE.height,
        alt: DEFAULT_OG_IMAGE.alt,
      },
    ],
  },
};

export default function Home() {
  return (
    <>
      <Navbar />
      <HomeContent />
    </>
  );
}
