export interface Service {
  /** Stable key for React lists and anchors. */
  slug: string;
  title: string;
  description: string;
  /** Lucide-style icon name, resolved at render site. */
  icon: string;
}
