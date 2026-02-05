import type { Metadata } from "next";
import { SITE_URL, PERSON } from "@/constants/seo";

export const metadata: Metadata = {
  title: "Contato",
  description:
    "Entre em contato com Felipe Frantz Zanini (ffzanini) para projetos, parcerias ou consultoria em desenvolvimento web, React, Next.js, TypeScript, jogos indie e tecnologia. Software engineer disponível para novos desafios e oportunidades. Envie sua proposta e vamos conversar sobre seu projeto!",
  keywords: [
    "contato",
    "Felipe Frantz Zanini",
    "ffzanini",
    "contato desenvolvedor",
    "hire developer",
    "contratar desenvolvedor",
    "desenvolvimento",
    "desenvolvimento web",
    "consultoria",
    "consultoria desenvolvimento",
    "projetos",
    "freelancer",
    "freelance",
    "React",
    "Next.js",
    "TypeScript",
    "Pelotas",
  ],
  alternates: {
    canonical: `${SITE_URL}/contact`,
    languages: {
      "pt-BR": `${SITE_URL}/contact?lang=pt`,
      "en": `${SITE_URL}/contact?lang=en`,
      "es": `${SITE_URL}/contact?lang=es`,
    },
  },
  openGraph: {
    title: `Contato | ${PERSON.name} - Entre em Contato`,
    description:
      "Entre em contato com Felipe Frantz Zanini (ffzanini) para projetos, parcerias ou consultoria em desenvolvimento web e tecnologia. Envie sua proposta e vamos conversar!",
    url: `${SITE_URL}/contact`,
    type: "website",
  },
};

export default function ContactLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
