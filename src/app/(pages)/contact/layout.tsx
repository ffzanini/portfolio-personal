import type { Metadata } from "next";
import { SITE_URL, PERSON } from "@/constants/seo";

export const metadata: Metadata = {
  title: "Contato",
  description:
    "Entre em contato com Felipe Frantz Zanini (ffzanini) para projetos, parcerias ou consultoria em desenvolvimento web, jogos e tecnologia. Software engineer disponível para novos desafios.",
  keywords: [
    "contato",
    "Felipe Frantz Zanini",
    "ffzanini",
    "desenvolvimento",
    "consultoria",
    "projetos",
  ],
  alternates: { canonical: `${SITE_URL}/contact` },
  openGraph: {
    title: `Contato | ${PERSON.name}`,
    url: `${SITE_URL}/contact`,
  },
};

export default function ContactLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
