export interface Project {
  id: number;
  navigation: string;
  image: string;
  category: string;
  technologies: string[];
  featured: boolean;
  active: boolean;
  demo: string;
  github: string;
  date: string;
}

/**
 * As rotas /images e /_next/image são cacheadas por 1 ano.
 * Ao substituir um print, aumente este número para o navegador buscar o arquivo novo.
 */
const PROJECT_IMAGE_REVISION = "2";

function projectImage(file: string) {
  return `/images/projects/${file}?v=${PROJECT_IMAGE_REVISION}`;
}

/** Ordem do slider de destaque, independente da data. */
export const featuredProjectOrder = [
  "indiobjj",
  "portocon",
  "doveresearch",
] as const;

const projectsData: Project[] = [
  {
    id: 1,
    navigation: "portifolio_v3",
    image: projectImage("portfolio_v3.png"),
    category: "frontend",
    technologies: [
      "JavaScript",
      "TypeScript",
      "React",
      "Next.js",
      "CSS3",
      "TailwindCSS",
      "Vercel",
    ],
    featured: false,
    active: true,
    demo: "https://www.ffzanini.dev/",
    github: "https://github.com/ffzanini/portifolio-personal",
    date: "2024-01-15",
  },
  {
    id: 7,
    navigation: "resume",
    image: projectImage("resume.png"),
    category: "frontend",
    technologies: [
      "JavaScript",
      "TypeScript",
      "React",
      "Next.js",
      "CSS3",
      "TailwindCSS",
      "Vercel",
    ],
    featured: false,
    active: true,
    demo: "https://resume.ffzanini.dev/",
    github: "https://github.com/ffzanini/resume-personal",
    date: "2023-11-20",
  },
  {
    id: 2,
    navigation: "doveresearch",
    image: projectImage("doveresearch.png"),
    category: "fullstack",
    technologies: [
      "JavaScript",
      "PHP",
      "CodeIgniter",
      "MySQL",
      "CSS3",
      "Bootstrap",
      "Hostgator",
    ],
    featured: true,
    active: true,
    demo: "https://doveresearch.org/",
    github: "",
    date: "2023-08-10",
  },
  {
    id: 3,
    navigation: "indiobjj",
    image: projectImage("indiobjj.png"),
    category: "frontend",
    technologies: [
      "JavaScript",
      "TypeScript",
      "React",
      "Next.js",
      "CSS3",
      "TailwindCSS",
      "Cloudflare",
      "Vercel",
    ],
    featured: true,
    active: true,
    demo: "https://indiobjj.com.br/",
    github: "https://github.com/ffzanini/indio-bjj",
    date: "2025-06-05",
  },
  {
    id: 4,
    navigation: "educacross",
    image: projectImage("educacross.png"),
    category: "frontend",
    technologies: [
      "JavaScript",
      "TypeScript",
      "Angular",
      "Vue",
      "Vuetify",
      "CSS3",
      "SCSS",
      "TailwindCSS",
    ],
    featured: false,
    active: true,
    demo: "https://www.educacross.com.br/",
    github: "",
    date: "2022-12-15",
  },
  {
    id: 5,
    navigation: "iguatemi",
    image: projectImage("iguatemi_v1.png"),
    category: "fullstack",
    technologies: [
      "JavaScript",
      "TypeScript",
      "React",
      "Vite",
      "CSS3",
      "Material UI",
      "TailwindCSS",
      "Java",
      "MuleSoft",
      "Sensedia",
      "Microsoft Azure",
      "MongoDB",
      "SalesForce",
      "SAP",
    ],
    featured: false,
    active: false,
    demo: "",
    github: "",
    date: "2022-05-20",
  },
  {
    id: 6,
    navigation: "portifolio_v2",
    image: projectImage("portfolio_v2.png"),
    category: "frontend",
    technologies: [
      "JavaScript",
      "TypeScript",
      "React",
      "Next.js",
      "CSS3",
      "TailwindCSS",
      "Vercel",
    ],
    featured: false,
    active: true,
    demo: "https://v2.ffzanini.dev/",
    github: "https://github.com/ffzanini/website-personal",
    date: "2022-03-10",
  },
  {
    id: 8,
    navigation: "nav9",
    image: projectImage("nav9.png"),
    category: "frontend",
    technologies: [
      "JavaScript",
      "TypeScript",
      "React",
      "Next.js",
      "CSS3",
      "TailwindCSS",
    ],
    featured: false,
    active: true,
    demo: "https://nav9.tech/",
    github: "",
    date: "2025-10-10",
  },
  {
    id: 9,
    navigation: "iceh_retriever",
    image: projectImage("equidade.png"),
    category: "fullstack",
    technologies: ["PHP", "MySQL", "CSS3", "Bootstrap", "Hostgator"],
    featured: false,
    active: true,
    demo: "https://equidade.org/en/retriever",
    github: "",
    date: "2026-01-01",
  },
  {
    id: 10,
    navigation: "portocon",
    image: projectImage("portocon.png"),
    category: "frontend",
    technologies: [
      "JavaScript",
      "TypeScript",
      "React",
      "Next.js",
      "CSS3",
      "TailwindCSS",
      "Vercel",
    ],
    featured: true,
    active: true,
    demo: "https://www.contabilidadeportocon.com.br/",
    github: "https://github.com/ffzanini/contador-portocon",
    date: "2026-03-31",
  },
  {
    id: 11,
    navigation: "iguatemi_v2",
    image: projectImage("iguatemi_v2.png"),
    category: "fullstack",
    technologies: [
      "JavaScript",
      "TypeScript",
      "React",
      "Vite",
      "CSS3",
      "Material UI",
      "TailwindCSS",
      "Java",
      "MuleSoft",
      "Sensedia",
      "Microsoft Azure",
      "MongoDB",
      "SalesForce",
      "SAP",
    ],
    featured: false,
    active: true,
    demo: "",
    github: "",
    date: "2026-09-01",
  },
  {
    id: 12,
    navigation: "pda",
    image: projectImage("pda.png"),
    category: "fullstack",
    technologies: [
      "JavaScript",
      "TypeScript",
      "React",
      "Vite",
      "CSS3",
      "Material UI",
      "TailwindCSS",
      "Java",
      "MuleSoft",
      "Sensedia",
      "Microsoft Azure",
      "MongoDB",
      "SalesForce",
      "SAP",
      "DocuSign",
    ],
    featured: false,
    active: true,
    demo: "",
    github: "",
    date: "2022-06-01",
  },
];

export const projects: Project[] = [...projectsData].sort(
  (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime(),
);

export function getFeaturedProjects(
  list: readonly Project[] = projects,
): Project[] {
  const byNavigation = new Map(
    list.map((project) => [project.navigation, project]),
  );

  return featuredProjectOrder.flatMap((navigation) => {
    const project = byNavigation.get(navigation);
    return project ? [project] : [];
  });
}
