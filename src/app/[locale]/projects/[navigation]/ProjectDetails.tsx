import { Project } from "@/app/data/projects";
import { ProjectDetailsContent } from "@/components/pages/projects/ProjectDetailsContent";

interface ProjectDetailsViewProps {
  project: Project;
}

export default function ProjectDetailsView({
  project,
}: Readonly<ProjectDetailsViewProps>) {
  return <ProjectDetailsContent project={project} />;
}
