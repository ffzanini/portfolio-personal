import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Stack | Felipe Frant Zanini",
  description:
    "Tools, languages, and technologies that Felipe Frant Zanini currently uses and has used in the development of his projects.",
};

export default function StackLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
