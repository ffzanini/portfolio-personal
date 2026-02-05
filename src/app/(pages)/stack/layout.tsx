import type { Metadata } from "next";
import { SITE_URL, PERSON } from "@/constants/seo";

export const metadata: Metadata = {
  title: "Stack Tecnológica",
  description:
    "Conheça a stack tecnológica de Felipe Frantz Zanini (ffzanini): ferramentas, linguagens e tecnologias usadas no desenvolvimento web. React, Next.js, TypeScript, JavaScript, Node.js, Tailwind CSS, frontend e fullstack. Descubra as tecnologias que domino como software engineer e como posso ajudar seu projeto.",
  keywords: [
    "stack",
    "stack tecnológica",
    "tecnologias",
    "ferramentas",
    "linguagens",
    "Felipe Frantz Zanini",
    "ffzanini",
    "React",
    "Next.js",
    "TypeScript",
    "JavaScript",
    "Node.js",
    "Tailwind CSS",
    "HTML5",
    "CSS3",
    "desenvolvimento",
    "desenvolvimento web",
    "frontend",
    "fullstack",
    "skills",
    "habilidades",
  ],
  alternates: {
    canonical: `${SITE_URL}/stack`,
    languages: {
      "pt-BR": `${SITE_URL}/stack?lang=pt`,
      "en": `${SITE_URL}/stack?lang=en`,
      "es": `${SITE_URL}/stack?lang=es`,
    },
  },
  openGraph: {
    title: `Stack Tecnológica | ${PERSON.name} - Ferramentas e Tecnologias`,
    description:
      "Conheça a stack tecnológica de Felipe Frantz Zanini (ffzanini): React, Next.js, TypeScript e tecnologias modernas. Descubra como posso ajudar seu projeto.",
    url: `${SITE_URL}/stack`,
    type: "website",
  },
};

export default function StackLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
