import { Navbar } from "@/components/ui";
import { HomeContent } from "@/components/pages/home/HomeContent";

export default function LocaleHomePage() {
  return (
    <>
      <link
        rel="preload"
        href="/images/me-desenho.jpeg"
        as="image"
        fetchPriority="high"
      />
      <Navbar />
      <HomeContent />
    </>
  );
}
