import { SITE_URL, PERSON } from "@/constants/seo";

const personSchema = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: PERSON.name,
  alternateName: [
    PERSON.nickname,
    "Felipe Frantz",
    "ffzanini",
    "Felipe Zanini",
  ],
  url: SITE_URL,
  jobTitle: PERSON.jobTitle,
  description: PERSON.description,
  image: `${SITE_URL}/images/visit-card.png`,
  address: {
    "@type": "PostalAddress",
    addressLocality: "Pelotas",
    addressRegion: "RS",
    addressCountry: "BR",
    postalCode: "96000-000",
  },
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
    "Fullstack Development",
    "React",
    "Next.js",
    "TypeScript",
    "JavaScript",
    "Node.js",
    "Tailwind CSS",
    "HTML5",
    "CSS3",
    "PHP",
    "Game Development",
    "Indie Games",
    "Screenwriting",
    "Jiu Jitsu",
  ],
  hasOccupation: {
    "@type": "Occupation",
    name: PERSON.jobTitle,
    occupationLocation: {
      "@type": "City",
      name: "Pelotas",
    },
    skills: [
      "React",
      "Next.js",
      "TypeScript",
      "JavaScript",
      "Node.js",
      "Web Development",
      "Frontend Development",
      "Fullstack Development",
    ],
  },
  alumniOf: {
    "@type": "Organization",
    name: "Universidade",
  },
  worksFor: {
    "@type": "Organization",
    name: "Freelancer",
  },
  award: "Faixa Marrom de Jiu Jitsu",
  knowsLanguage: ["pt-BR", "en", "es"],
};

const websiteSchema = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: `${PERSON.name} | Portfolio`,
  alternateName: [
    "ffzanini.dev",
    "Felipe Frantz Zanini Portfolio",
    "Portfolio ffzanini",
  ],
  url: SITE_URL,
  description: PERSON.descriptionLong,
  publisher: {
    "@type": "Person",
    name: PERSON.name,
    url: SITE_URL,
  },
  inLanguage: ["pt-BR", "en", "es"],
  potentialAction: {
    "@type": "SearchAction",
    target: {
      "@type": "EntryPoint",
      urlTemplate: `${SITE_URL}/projects?search={search_term_string}`,
    },
    "query-input": "required name=search_term_string",
  },
};

const organizationSchema = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: `${PERSON.name} - Software Engineer`,
  url: SITE_URL,
  logo: `${SITE_URL}/images/visit-card.png`,
  sameAs: [
    "https://github.com/ffzanini",
    "https://www.linkedin.com/in/ffzanini/",
    "https://instagram.com/ffzanini/",
    "https://www.twitter.com/ffzanini/",
  ],
  contactPoint: {
    "@type": "ContactPoint",
    contactType: "Professional",
    url: `${SITE_URL}/contact`,
  },
};

export function JsonLd() {
  const combined = [personSchema, websiteSchema, organizationSchema];
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(combined) }}
    />
  );
}
