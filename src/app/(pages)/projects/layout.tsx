import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Projects | Felipe Frant Zanini",
  description:
    "Explore the main projects developed by Felipe Frant Zanini, focused on technology, accessibility, usability, and digital impact.",
};

export default function ProjectsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
