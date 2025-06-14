import { notFound } from "next/navigation";
import ProjectDetails from "./ProjectDetails";

type Props = {
  params: {
    navigation: string;
  };
};

export async function generateStaticParams(): Promise<
  { navigation: string }[]
> {
  const { projects } = await import("@/app/data/projects");
  return projects.map((project) => ({
    navigation: project.navigation,
  }));
}

export default async function ProjectDetailsViewPage({ params }: Props) {
  const { projects } = await import("@/app/data/projects");

  const project = projects.find(
    (project) => project.navigation === params.navigation
  );

  if (!project) {
    notFound();
  }

  return <ProjectDetails project={project} />;
}
