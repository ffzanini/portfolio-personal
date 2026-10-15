import { Project } from "@/app/data/projects";
import { ProjectDetailsContent } from "@/components/pages/projects/ProjectDetailsContent";
import type { ReactNode } from "react";

interface ProjectDetailsViewProps {
  project: Project;
  footer: ReactNode;
}

export default function ProjectDetailsView({
  project,
  footer,
}: Readonly<ProjectDetailsViewProps>) {
  return <ProjectDetailsContent project={project} footer={footer} />;
}
