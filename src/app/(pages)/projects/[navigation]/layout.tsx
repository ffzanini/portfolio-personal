import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Project Details | Felipe Frant Zanini",
  description:
    "Detailed information about the projects developed by Felipe Frant Zanini, with a focus on tech stack, features developed, technical challenges, and results.",
};

export default function ProjectDetailsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
