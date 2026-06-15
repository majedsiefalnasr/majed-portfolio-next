export interface WorkMetric {
  /** e.g. "+38%", "2.4M". */
  value: string;
  label: string;
}

export interface WorkCovers {
  desktop?: string;
  mobile?: string;
  tablet?: string;
}

/** Frontmatter contract for content/work/*.mdx. Source of truth. */
export interface WorkFrontmatter {
  title: string;
  description: string;
  /** Legacy single cover — prefer `covers`. Used as fallback for desktop. */
  cover?: string;
  tags: string[];
  metrics: WorkMetric[];
  /** Display order on listing pages (lower = earlier). */
  order?: number;
  featured?: boolean;
  /** Brand lockup image for the work listing rows. */
  logo?: string;
  /** Per-device cover images. Drives which device mock(s) render in WorkShowcase. */
  covers?: WorkCovers;
  /** Brand accent color; tints the showcase card's wash and glow. */
  accent?: string;
  /** Full-bleed banner fill on the work listing (defaults to accent). */
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

/** A resolved work entry: frontmatter + routing slug. */
export interface Work extends WorkFrontmatter {
  slug: string;
}
