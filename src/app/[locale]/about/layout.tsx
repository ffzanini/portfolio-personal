import type { Metadata } from "next";
import { SITE_URL, PERSON } from "@/constants/seo";

export const metadata: Metadata = {
  title: "Sobre Mim",
  description:
    "Conheça Felipe Frantz Zanini (ffzanini): Senior Software Engineer & Frontend Architect especializado em React, Next.js e TypeScript.",
  alternates: {
    canonical: `${SITE_URL}/pt/about`,
    languages: {
      "pt-BR": `${SITE_URL}/pt/about`,
      en: `${SITE_URL}/en/about`,
      es: `${SITE_URL}/es/about`,
    },
  },
  openGraph: {
    title: `Sobre Mim | ${PERSON.name} - ${PERSON.jobTitle}`,
    url: `${SITE_URL}/pt/about`,
    type: "profile",
  },
};

export default function AboutLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
