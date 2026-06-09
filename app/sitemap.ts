import type { MetadataRoute } from "next";
import { siteConfig } from "@/lib/site-config";
import { getCaseStudySlugs, getBlogSlugs } from "@/lib/content";

/** Static routes + case-study and blog detail pages, sourced from content/. */
export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const now = new Date();
  const staticRoutes = ["", "/who-am-i", "/case-studies", "/blog"].map(
    (path) => ({
      url: `${siteConfig.url}${path}`,
      lastModified: now,
      changeFrequency: "monthly" as const,
      priority: path === "" ? 1 : 0.8,
    }),
  );

  const [caseStudySlugs, blogSlugs] = await Promise.all([
    getCaseStudySlugs(),
    getBlogSlugs(),
  ]);

  const detailRoutes = [
    ...caseStudySlugs.map((slug) => `/case-studies/${slug}`),
    ...blogSlugs.map((slug) => `/blog/${slug}`),
  ].map((path) => ({
    url: `${siteConfig.url}${path}`,
    lastModified: now,
    changeFrequency: "yearly" as const,
    priority: 0.6,
  }));

  return [...staticRoutes, ...detailRoutes];
}
