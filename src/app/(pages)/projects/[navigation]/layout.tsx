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
                  : navigation === "nav9"
                    ? "nav9.tech"
                    : navigation === "iceh_retriever"
                      ? "ICEH Retriever"
                      : navigation;
  const title = `${projectTitle} | Projetos | ${PERSON.name}`;
  const technologiesList = project.technologies.slice(0, 6).join(", ");
  const description = `Explore o projeto ${projectTitle} desenvolvido por Felipe Frantz Zanini (ffzanini). Stack tecnológica: ${technologiesList}. Desenvolvimento web, frontend e fullstack. Software engineer especializado em React, Next.js e TypeScript. Veja detalhes e entre em contato.`;
  const url = `${SITE_URL}/projects/${navigation}`;
  return {
    title,
    description,
    keywords: [
      projectTitle,
      "projeto",
      "Felipe Frantz Zanini",
      "ffzanini",
      "desenvolvimento",
      "desenvolvimento web",
      ...project.technologies.slice(0, 5),
      "React",
      "Next.js",
      "TypeScript",
      "portfolio",
    ],
    alternates: {
      canonical: url,
      languages: {
        "pt-BR": `${url}?lang=pt`,
        "en": `${url}?lang=en`,
        "es": `${url}?lang=es`,
      },
    },
    openGraph: {
      title: `${projectTitle} | Projetos | ${PERSON.name}`,
      description: `Explore o projeto ${projectTitle} desenvolvido por Felipe Frantz Zanini (ffzanini). Stack tecnológica: ${technologiesList}. Veja detalhes e entre em contato.`,
      url,
      type: "website",
    },
  };
}

export default function ProjectDetailsLayout({ children }: Props) {
  return <>{children}</>;
}
