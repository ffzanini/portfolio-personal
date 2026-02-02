import type { Metadata } from "next";
import { SITE_URL, PERSON } from "@/constants/seo";
import { projects } from "@/app/data/projects";

type Props = {
  children: React.ReactNode;
  params: Promise<{ navigation: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { navigation } = await params;
  const project = projects.find((p) => p.navigation === navigation);
  if (!project) {
    return {
      title: "Projeto",
      description: `Detalhes do projeto | ${PERSON.name}`,
    };
  }
  const projectTitle =
    navigation === "portifolio_v3"
      ? "Portfólio"
      : navigation === "portifolio_v2"
        ? "Portfólio v2"
        : navigation === "doveresearch"
          ? "DOVE Research"
          : navigation === "indiobjj"
            ? "JA Índio Jiu Jitsu"
            : navigation === "educacross"
              ? "EducaCross"
              : navigation === "iguatemi"
                ? "Iguatemi"
                : navigation === "resume"
                  ? "Currículo"
                  : navigation;
  const title = `${projectTitle} | Projetos`;
  const description = `Projeto desenvolvido por Felipe Frantz Zanini (ffzanini): ${projectTitle}. Stack: ${project.technologies.slice(0, 4).join(", ")}. Desenvolvimento e software engineer.`;
  const url = `${SITE_URL}/projects/${navigation}`;
  return {
    title,
    description,
    alternates: { canonical: url },
    openGraph: {
      title: `${projectTitle} | ${PERSON.name}`,
      url,
    },
  };
}

export default function ProjectDetailsLayout({ children }: Props) {
  return <>{children}</>;
}
