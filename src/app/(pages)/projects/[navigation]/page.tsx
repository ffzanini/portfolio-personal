import { cache } from "react";
import { notFound } from "next/navigation";
import ProjectDetails from "@/app/(pages)/projects/[navigation]/ProjectDetails";

interface PageProps {
  params: Promise<{
    navigation: string;
  }>;
}

const getProjects = cache(async () => {
  const { projects } = await import("@/app/data/projects");
  return projects;
});

export async function generateStaticParams() {
  const projects = await getProjects();
  return projects.map((project) => ({
    navigation: project.navigation,
  }));
}

export default async function Page({ params }: PageProps) {
  const projects = await getProjects();
  const navigation = (await params).navigation;
  const project = projects.find((project) => project.navigation === navigation);

  if (!project) notFound();

  return <ProjectDetails project={project} />;
}
