import type { CaseStudy } from "@/types";

/**
 * Static index of case studies surfaced on Home / Case Studies pages.
 * Long-form bodies live in content/case-studies/*.mdx; this is the listing data.
 * Keep `slug` in sync with the MDX filename. Copy mirrors Figma.
 */
export const caseStudies: CaseStudy[] = [
  {
    slug: "zidney",
    title: "Zidney",
    description:
      "A ground-up redesign of the student learning experience, turning a cluttered LMS into a focused daily workspace.",
    cover: "/case-studies/zidney/cover.png",
    tags: ["Discovery", "UX/UI Design", "Development"],
    metrics: [
      { value: "Enterprise", label: "Company type" },
      { value: "Application", label: "Project type" },
      { value: "3.25x CLI", label: "Result" },
    ],
    order: 1,
    featured: true,
  },
];
