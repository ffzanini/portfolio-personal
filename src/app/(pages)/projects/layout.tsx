import type { Metadata } from "next";
import { SITE_URL, PERSON } from "@/constants/seo";

export const metadata: Metadata = {
  title: "Projetos",
  description:
    "Explore projetos desenvolvidos por Felipe Frantz Zanini (ffzanini): desenvolvimento web, React, Next.js, TypeScript, frontend e fullstack. Descubra portfólio de software engineer com projetos reais, stack tecnológica e impacto digital. Veja aplicações web modernas e entre em contato para seu próximo projeto.",
  keywords: [
    "projetos",
    "portfólio projetos",
    "Felipe Frantz Zanini",
    "ffzanini",
    "desenvolvimento",
    "desenvolvimento web",
    "portfolio",
    "portfólio",
    "React",
    "Next.js",
    "TypeScript",
    "frontend",
    "fullstack",
    "projetos desenvolvidos",
    "aplicações web",
    "software engineer",
    "desenvolvedor",
  ],
  alternates: {
    canonical: `${SITE_URL}/projects`,
    languages: {
      "pt-BR": `${SITE_URL}/projects?lang=pt`,
      "en": `${SITE_URL}/projects?lang=en`,
      "es": `${SITE_URL}/projects?lang=es`,
    },
  },
  openGraph: {
    title: `Projetos | ${PERSON.name} - Portfólio de Desenvolvimento Web`,
    description:
      "Explore projetos desenvolvidos por Felipe Frantz Zanini (ffzanini): desenvolvimento web, React, Next.js e TypeScript. Veja aplicações web modernas e entre em contato.",
    url: `${SITE_URL}/projects`,
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
