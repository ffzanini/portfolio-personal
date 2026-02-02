import type { Metadata } from "next";
import { SITE_URL, PERSON } from "@/constants/seo";

export const metadata: Metadata = {
  title: "Stack",
  description:
    "Stack tecnológica de Felipe Frantz Zanini (ffzanini): ferramentas, linguagens e tecnologias usadas no desenvolvimento. React, Next.js, TypeScript, frontend e fullstack.",
  keywords: [
    "stack",
    "tecnologias",
    "Felipe Frantz Zanini",
    "ffzanini",
    "React",
    "Next.js",
    "TypeScript",
    "desenvolvimento",
  ],
  alternates: { canonical: `${SITE_URL}/stack` },
  openGraph: {
    title: `Stack | ${PERSON.name}`,
    url: `${SITE_URL}/stack`,
  },
};

export default function StackLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
