/**
 * Feature toggles. Content and components stay in the repo; these only
 * control visibility. Flip a flag to true and the nav link, sections,
 * routes, and sitemap entries come back — nothing else to restore.
 */
export const features = {
  /** Blog: nav link, home "Insights" carousel, /blog routes, sitemap entries. */
  blog: false,
  /**
   * Newsletter ("Join the List"): hidden alongside the blog — with no posts
   * there is nothing to subscribe to, and the form has no backend yet.
   */
  newsletter: false,
  /**
   * CV/Resume download links (hero, reach-out, footer): hidden until the
   * placeholder PDFs in public/ are replaced with real documents — a
   * recruiter downloading a placeholder ends the evaluation.
   */
  cvDownloads: false,
} as const;
