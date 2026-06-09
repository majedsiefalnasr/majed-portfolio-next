/** Frontmatter contract for content/blog/*.mdx. Source of truth for blog posts. */
export interface BlogFrontmatter {
  title: string;
  excerpt: string;
  category: string;
  /** ISO date string (YYYY-MM-DD). */
  date: string;
  cover: string;
  /** Variant hint read by the page template. */
  featured?: boolean;
}

/** A resolved blog post: frontmatter + routing slug. */
export interface BlogPost extends BlogFrontmatter {
  slug: string;
}
