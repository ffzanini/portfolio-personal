import type { Metadata } from "next";
import { SITE_URL, PERSON } from "@/constants/seo";
import { projects } from "@/app/data/projects";

type Props = {
  children: React.ReactNode;
  params: Promise<{ navigation: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { navigation } = await params;
  const project = projects.find((item) => item.navigation === navigation);

  if (!project) {
    return {
      title: "Projeto",
      description: `Detalhes do projeto | ${PERSON.name}`,
    };
  }

  const urlPath = `/projects/${navigation}`;
  const canonical = `${SITE_URL}/pt${urlPath}`;
  const technologies = project.technologies.slice(0, 6).join(", ");

  return {
    title: `${navigation} | Projetos | ${PERSON.name}`,
    description: `Explore o projeto ${navigation} desenvolvido por ${PERSON.name}. Stack tecnológica: ${technologies}.`,
    alternates: {
      canonical,
      languages: {
        "pt-BR": `${SITE_URL}/pt${urlPath}`,
        en: `${SITE_URL}/en${urlPath}`,
        es: `${SITE_URL}/es${urlPath}`,
      },
    },
    openGraph: {
      title: `${navigation} | Projetos | ${PERSON.name}`,
      description: `Detalhes e stack do projeto ${navigation}.`,
      url: canonical,
      type: "website",
    },
  };
}

export default function ProjectDetailsLayout({ children }: Props) {
  return <>{children}</>;
}
