import type { Metadata } from "next";
import { SITE_URL, PERSON } from "@/constants/seo";

export const metadata: Metadata = {
  title: "Stack Tecnológica",
  description:
    "Conheça a stack tecnológica de Felipe Frantz Zanini (ffzanini): ferramentas, linguagens e tecnologias usadas no desenvolvimento web.",
  alternates: {
    canonical: `${SITE_URL}/pt/stack`,
    languages: {
      "pt-BR": `${SITE_URL}/pt/stack`,
      en: `${SITE_URL}/en/stack`,
      es: `${SITE_URL}/es/stack`,
    },
  },
  openGraph: {
    title: `Stack Tecnológica | ${PERSON.name}`,
    url: `${SITE_URL}/pt/stack`,
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
