import { SITE_URL, PERSON } from "@/constants/seo";

const personSchema = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: PERSON.name,
  alternateName: [PERSON.nickname, "Felipe Frantz", "ffzanini"],
  url: SITE_URL,
  jobTitle: PERSON.jobTitle,
  description: PERSON.description,
  image: `${SITE_URL}/images/visit-card.png`,
  sameAs: [
    "https://github.com/ffzanini",
    "https://www.linkedin.com/in/ffzanini/",
    "https://instagram.com/ffzanini/",
    "https://www.twitter.com/ffzanini/",
    "https://www.youtube.com/channel/UCVHgTgRK0M5kt2Gvi60b7Eg",
  ],
  knowsAbout: [
    "Software Development",
    "Web Development",
    "Frontend Development",
    "React",
    "Next.js",
    "TypeScript",
  ],
};

const websiteSchema = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: `${PERSON.name} | Portfolio`,
  alternateName: ["ffzanini.dev", "Felipe Frantz Zanini Portfolio"],
  url: SITE_URL,
  description:
    "Portfolio de Felipe Frantz Zanini (ffzanini) - Software Engineer, desenvolvimento web, projetos e stack tecnológica.",
  publisher: {
    "@type": "Person",
    name: PERSON.name,
    url: SITE_URL,
  },
  inLanguage: ["pt-BR", "en", "es"],
};

export function JsonLd() {
  const combined = [personSchema, websiteSchema];
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(combined) }}
    />
  );
}
