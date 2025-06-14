import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contact | Felipe Frant Zanini",
  description:
    "Get in touch with Felipe Frant Zanini for projects, partnerships, or consulting in web development, games, and technology.",
};

export default function ContactLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
