/** @type {import('next-sitemap').IConfig} */
const config = {
    siteUrl: "https://invizon.web.app",
    generateRobotsTxt: true,
    generateIndexSitemap: false,
    outDir: "./out",
    changefreq: "weekly",
    priority: 0.7,
    sitemapSize: 5000,
    trailingSlash: false,
  };
  
  module.exports = config;