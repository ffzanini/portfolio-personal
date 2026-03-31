import type { Metadata } from "next";
import { SITE_URL, PERSON } from "@/constants/seo";

export const metadata: Metadata = {
  title: "Contato",
  description:
    "Entre em contato com Felipe Frantz Zanini (ffzanini) para projetos, parcerias ou consultoria em desenvolvimento web.",
  alternates: {
    canonical: `${SITE_URL}/pt/contact`,
    languages: {
      "pt-BR": `${SITE_URL}/pt/contact`,
      en: `${SITE_URL}/en/contact`,
      es: `${SITE_URL}/es/contact`,
    },
  },
  openGraph: {
    title: `Contato | ${PERSON.name} - Entre em Contato`,
    url: `${SITE_URL}/pt/contact`,
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
