/** Single source of truth for site-wide identity, SEO, and social links. */
export const siteConfig = {
  name: "Majed Sief Alnasr",
  role: "CX & Product Designer",
  title: "Majed Sief Alnasr — CX, UX/UI & Product Designer",
  description:
    "Portfolio of Majed Sief Alnasr — CX design, UX/UI, product design, and consulting. Minimal, evidence-led, crafted in the details.",
  // Override at deploy via NEXT_PUBLIC_SITE_URL; falls back for local dev.
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "https://majed.design",
  email: "majedsiefalnasr@outlook.com",
  ogImage: "/og.png",
  locale: "en_US",
  social: {
    linkedin: "https://www.linkedin.com/in/majedsiefalnasr",
    twitter: "https://twitter.com/majedsiefalnasr",
    github: "https://github.com/majedsiefalnasr",
  },
} as const;

export type SiteConfig = typeof siteConfig;
