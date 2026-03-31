import type { Metadata } from "next";
import { SITE_URL, PERSON } from "@/constants/seo";

export const metadata: Metadata = {
  title: "Projetos",
  description:
    "Explore projetos desenvolvidos por Felipe Frantz Zanini (ffzanini): desenvolvimento web, React, Next.js, TypeScript, frontend e fullstack.",
  alternates: {
    canonical: `${SITE_URL}/pt/projects`,
    languages: {
      "pt-BR": `${SITE_URL}/pt/projects`,
      en: `${SITE_URL}/en/projects`,
      es: `${SITE_URL}/es/projects`,
    },
  },
  openGraph: {
    title: `Projetos | ${PERSON.name}`,
    url: `${SITE_URL}/pt/projects`,
    type: "website",
  },
};

export default function ProjectsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
