import { notFound } from "next/navigation";
import ProjectDetails from "./ProjectDetails";

export async function generateStaticParams() {
  const { projects } = await import("@/app/data/projects");
  return projects.map((project) => ({
    navigation: project.navigation,
  }));
}

export default async function ProjectDetailsViewPage({
  params,
}: {
  params: { navigation: string };
}) {
  const { projects } = await import("@/app/data/projects");

  const project = projects.find(
    (project) => project.navigation === params.navigation
  );

  if (!project) {
    notFound();
  }

  return <ProjectDetails project={project} />;
}
