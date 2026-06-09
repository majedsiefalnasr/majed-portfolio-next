export interface Testimonial {
  quote: string;
  author: string;
  role: string;
  /** Path under /public, or remote URL. */
  avatar?: string;
}
