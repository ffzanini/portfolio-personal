import { cache } from "react";
import { notFound } from "next/navigation";
import { Navbar } from "@/components/ui";
import ProjectDetails from "@/app/[locale]/projects/[navigation]/ProjectDetails";

interface PageProps {
  params: Promise<{
    locale: string;
    navigation: string;
  }>;
}

const getProjects = cache(async () => {
  const { projects } = await import("@/app/data/projects");
  return projects;
});

export async function generateStaticParams() {
  const projects = await getProjects();
  const locales = ["pt", "en", "es"];
  return locales.flatMap((locale) =>
    projects.map((project) => ({
      locale,
      navigation: project.navigation,
    })),
  );
}

export default async function LocaleProjectDetailsPage({ params }: PageProps) {
  const projects = await getProjects();
  const navigation = (await params).navigation;
  const project = projects.find((item) => item.navigation === navigation);

  if (!project) notFound();

  return (
    <>
      <Navbar />
      <ProjectDetails project={project} />
    </>
  );
}
