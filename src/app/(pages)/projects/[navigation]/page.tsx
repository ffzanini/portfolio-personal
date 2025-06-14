import { notFound } from "next/navigation";
import ProjectDetails from "@/app/(pages)/projects/[navigation]/ProjectDetails";

interface PageProps {
  params: Promise<{
    navigation: string;
  }>;
}
export async function generateStaticParams() {
  const { projects } = await import("@/app/data/projects");
  return projects.map((project) => ({
    navigation: project.navigation,
  }));
}

export default async function Page({ params }: PageProps) {
  const { projects } = await import("@/app/data/projects");

  const navigation = (await params).navigation;
  const project = projects.find((project) => project.navigation === navigation);

  if (!project) notFound();

  return <ProjectDetails project={project} />;
}
