import type { MetadataRoute } from "next";
import { projects } from "@/app/data/projects";
import { SITE_URL } from "@/constants/seo";

const staticPaths = ["", "/about", "/stack", "/projects", "/contact"];
const locales = ["pt", "en", "es"] as const;

const buildAlternateLanguages = (path: string) => ({
  "pt-BR": `${SITE_URL}/pt${path}`,
  en: `${SITE_URL}/en${path}`,
  es: `${SITE_URL}/es${path}`,
});

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  const staticEntries: MetadataRoute.Sitemap = staticPaths.flatMap((path) =>
    locales.map((locale) => ({
      url: `${SITE_URL}/${locale}${path}`,
      lastModified: now,
      changeFrequency: "weekly",
      priority: path === "" ? 1 : 0.8,
      alternates: {
        languages: buildAlternateLanguages(path),
      },
    })),
  );

  const projectEntries: MetadataRoute.Sitemap = projects.flatMap((project) =>
    locales.map((locale) => ({
      url: `${SITE_URL}/${locale}/projects/${project.navigation}`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.7,
      alternates: {
        languages: buildAlternateLanguages(`/projects/${project.navigation}`),
      },
    })),
  );

  return [...staticEntries, ...projectEntries];
}
