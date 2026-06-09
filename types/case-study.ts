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
}

/** A resolved case study: frontmatter + routing slug. */
export interface CaseStudy extends CaseStudyFrontmatter {
  slug: string;
}
