/** @type {import('next-sitemap').IConfig} */
const config = {
  siteUrl: "https://ffzanini.dev",
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
  },
  additionalPaths: async (config) => {
    return [
      await config.transform(config, "/"),
      await config.transform(config, "/about"),
      await config.transform(config, "/contact"),
      await config.transform(config, "/projects"),
      await config.transform(config, "/stack"),
    ];
  },
};

module.exports = config;
