import type { MetadataRoute } from "next";
import { siteConfig } from "@/lib/site-config";
import { getCaseStudySlugs, getBlogSlugs } from "@/lib/content";
import { features } from "@/lib/features";

/** Static routes + case-study and blog detail pages, sourced from content/. */
export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const now = new Date();
  const staticPaths = ["", "/who-am-i", "/case-studies"];
  if (features.blog) staticPaths.push("/blog");
  const staticRoutes = staticPaths.map((path) => ({
    url: `${siteConfig.url}${path}`,
    lastModified: now,
    changeFrequency: "monthly" as const,
    priority: path === "" ? 1 : 0.8,
  }));

  const [caseStudySlugs, blogSlugs] = await Promise.all([
    getCaseStudySlugs(),
    features.blog ? getBlogSlugs() : Promise.resolve([]),
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
