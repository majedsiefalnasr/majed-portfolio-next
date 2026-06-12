export interface CaseStudyMetric {
  /** e.g. "+38%", "2.4M". */
  value: string;
  label: string;
}

/** Frontmatter contract for content/case-studies/*.mdx. Source of truth. */
export interface CaseStudyFrontmatter {
  title: string;
  description: string;
  cover: string;
  tags: string[];
  metrics: CaseStudyMetric[];
  /** Display order on listing pages (lower = earlier). */
  order?: number;
  featured?: boolean;
  /** Brand lockup image for the case-studies listing rows. */
  logo?: string;
  /** Hero screenshot used in browser/laptop mockups (falls back to cover). */
  screenshot?: string;
  /** Brand accent color; tints the showcase card's wash and glow. */
  accent?: string;
  /** Full-bleed banner fill on the case-studies listing (defaults to accent). */
  banner?: string;
  /** e.g. "The Netherlands ©2023" */
  locationYear?: string;
  /** e.g. "Design & Development" */
  role?: string;
  /** Demonstration content: homepage surfaces render a subtle "Demo" tag. */
  demo?: boolean;
  /** Tool names shown in the info row, e.g. ["Figma", "React"] */
  tools?: string[];
}

/** A resolved case study: frontmatter + routing slug. */
export interface CaseStudy extends CaseStudyFrontmatter {
  slug: string;
}
