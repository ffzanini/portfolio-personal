/** @type {import('next-sitemap').IConfig} */
const SITE_URL = "https://ffzanini.dev";

const projectSlugs = [
  "portifolio_v3",
  "doveresearch",
  "indiobjj",
  "educacross",
  "iguatemi",
  "portifolio_v2",
  "resume",
];

const config = {
  siteUrl: SITE_URL,
  generateRobotsTxt: true,
  sitemapSize: 5000,
  changefreq: "monthly",
  priority: 0.7,
  exclude: [],
  robotsTxtOptions: {
    policies: [
      {
        userAgent: "*",
        allow: "/",
      },
    ],
    additionalSitemaps: [`${SITE_URL}/sitemap.xml`],
  },
  additionalPaths: async (config) => {
    const base = [
      await config.transform(config, "/", { priority: 1, changefreq: "weekly" }),
      await config.transform(config, "/about"),
      await config.transform(config, "/contact"),
      await config.transform(config, "/projects"),
      await config.transform(config, "/stack"),
    ];
    const projectPaths = await Promise.all(
      projectSlugs.map((slug) =>
        config.transform(config, `/projects/${slug}`, {
          priority: 0.6,
          changefreq: "monthly",
        })
      )
    );
    return [...base, ...projectPaths];
  },
};

module.exports = config;
