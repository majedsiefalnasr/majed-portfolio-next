/** One contact address, flowing into both `email` and `links.bookingEmail`. */
const email = "majedsiefalnasr@outlook.com";

/** Single source of truth for site-wide identity, SEO, and social links. */
export const siteConfig = {
  name: "Majed Sief Alnasr",
  role: "CX & Product Designer",
  title: "Majed Sief Alnasr — CX, UX/UI & Product Designer",
  description:
    "Portfolio of Majed Sief Alnasr — CX design, UX/UI, product design, and consulting. Minimal, evidence-led, crafted in the details.",
  // Override at deploy via NEXT_PUBLIC_SITE_URL; falls back for local dev.
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "https://majed.design",
  email,
  /**
   * Conversion targets, single source of truth. `booking` is still a
   * PLACEHOLDER anchor — swap in the real Cal.com/Calendly URL before
   * public sharing. CV/Resume paths point at placeholder PDFs in public/;
   * their links are hidden behind features.cvDownloads until real files land.
   */
  links: {
    booking: "#booking",
    bookingEmail: `mailto:${email}`,
    cv: "/cv.pdf",
    resume: "/resume.pdf",
  },
  ogImage: "/og.png",
  locale: "en_US",
  social: {
    linkedin: "https://www.linkedin.com/in/majedsiefalnasr",
    twitter: "https://twitter.com/majedsiefalnasr",
    github: "https://github.com/majedsiefalnasr",
    reddit: "https://www.reddit.com/user/majedsiefalnasr",
    medium: "https://medium.com/@majedsiefalnasr",
  },
} as const;

export type SiteConfig = typeof siteConfig;
