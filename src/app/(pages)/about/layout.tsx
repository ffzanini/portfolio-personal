import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "About | Felipe Frant Zanini",
  description:
    "Learn more about Felipe Frant Zanini, his experiences, professional journey, the work as a software developer and content creator.",
};

export default function AboutLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
