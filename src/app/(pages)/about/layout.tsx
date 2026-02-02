import type { Metadata } from "next";
import { SITE_URL, PERSON } from "@/constants/seo";

export const metadata: Metadata = {
  title: "Sobre",
  description:
    "Conheça Felipe Frantz Zanini (ffzanini): trajetória, experiência em desenvolvimento e software engineer. Sobre o desenvolvedor, escritor e faixa marrom de Jiu Jitsu.",
  keywords: [
    "Felipe Frantz Zanini",
    "ffzanini",
    "sobre",
    "desenvolvimento",
    "software engineer",
    "Pelotas",
  ],
  alternates: { canonical: `${SITE_URL}/about` },
  openGraph: {
    title: `Sobre | ${PERSON.name}`,
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
