import type { Metadata } from "next";
import { SITE_URL, PERSON } from "@/constants/seo";

export const metadata: Metadata = {
  title: "Projetos",
  description:
    "Projetos desenvolvidos por Felipe Frantz Zanini (ffzanini): desenvolvimento web, React, Next.js, TypeScript. Portfólio de software engineer com foco em tecnologia e impacto digital.",
  keywords: [
    "projetos",
    "Felipe Frantz Zanini",
    "ffzanini",
    "desenvolvimento",
    "portfolio",
    "React",
    "Next.js",
  ],
  alternates: { canonical: `${SITE_URL}/projects` },
  openGraph: {
    title: `Projetos | ${PERSON.name}`,
    url: `${SITE_URL}/projects`,
  },
};

export default function ProjectsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
