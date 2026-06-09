import type { CaseStudy } from "@/types";

/**
 * Static index of case studies surfaced on Home / Case Studies pages.
 * Long-form bodies live in content/case-studies/*.mdx; this is the listing data.
 * Keep `slug` in sync with the MDX filename.
 */
export const caseStudies: CaseStudy[] = [
  {
    slug: "zidney",
    title: "Zidney — rethinking the learning dashboard",
    description:
      "A ground-up redesign of the student experience, turning a cluttered LMS into a focused daily workspace.",
    cover: "/case-studies/zidney/cover.png",
    tags: ["Product Design", "UX/UI", "Design System"],
    metrics: [
      { value: "+38%", label: "Task completion" },
      { value: "-52%", label: "Support tickets" },
      { value: "4.7/5", label: "User satisfaction" },
    ],
    order: 1,
    featured: true,
  },
];
