import type { Metadata } from "next";
import { SITE_URL, PERSON } from "@/constants/seo";

export const metadata: Metadata = {
  title: "Sobre Mim",
  description:
    "Conheça Felipe Frantz Zanini (ffzanini): Senior Software Engineer & Frontend Architect especializado em React, Next.js e TypeScript. Descubra minha trajetória profissional, experiência em desenvolvimento web, frontend e fullstack. Desenvolvedor, escritor, desenvolvedor de jogos indie e faixa marrom de Jiu Jitsu. Saiba mais sobre minha jornada em Pelotas, Brasil.",
  keywords: [
    "Felipe Frantz Zanini",
    "ffzanini",
    "sobre",
    "sobre mim",
    "biografia",
    "trajetória",
    "experiência",
    "desenvolvimento",
    "desenvolvimento web",
    "software engineer",
    "engenheiro de software",
    "desenvolvedor",
    "React",
    "Next.js",
    "TypeScript",
    "Pelotas",
    "Brasil",
    "desenvolvedor Pelotas",
  ],
  alternates: {
    canonical: `${SITE_URL}/about`,
    languages: {
      "pt-BR": `${SITE_URL}/about?lang=pt`,
      "en": `${SITE_URL}/about?lang=en`,
      "es": `${SITE_URL}/about?lang=es`,
    },
  },
  openGraph: {
    title: `Sobre Mim | ${PERSON.name} - ${PERSON.jobTitle}`,
    description:
      "Conheça Felipe Frantz Zanini (ffzanini): Senior Software Engineer & Frontend Architect especializado em React, Next.js e TypeScript. Descubra minha trajetória profissional e experiência em desenvolvimento web.",
    url: `${SITE_URL}/about`,
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
