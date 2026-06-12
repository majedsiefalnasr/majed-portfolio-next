import { testimonials } from "@/data/testimonials";

export interface ProofCard {
  /** Small caption above the content, e.g. "Client feedback". */
  kicker: string;
  /** Lucide icon name shown beside the kicker (the testimonial card uses an avatar instead). */
  icon?: string;
  /** Body copy; multiple entries render as separate lines. */
  lines: { text: string; strong?: boolean }[];
  /** Avatar + author for the testimonial card. */
  avatar?: string;
  author?: string;
  role?: string;
  /** Attribution under the content (e.g. case study source). */
  source?: string;
  /** Visible honesty label for demonstration data. */
  demo?: boolean;
}

/**
 * Drives the "Can I trust him with my project?" proof marquee on Home: a
 * continuously drifting row of cards (testimonial, results, process,
 * availability) instead of one large quote block. Honest by construction —
 * real facts stay unlabeled, demonstration data carries a visible "demo
 * data" chip. The quote reuses data/testimonials.ts.
 */
export const proofCards: ProofCard[] = [
  {
    // TODO(majed): Verify identity/photo/LinkedIn before public launch.
    kicker: "Client feedback",
    lines: [{ text: `"${testimonials[0].quote}"` }],
    avatar: testimonials[0].avatar,
    author: testimonials[0].author,
    role: testimonials[0].role,
  },
  {
    kicker: "Project results",
    icon: "TrendingUp",
    lines: [
      { text: "Quote turnaround: 3.1h → 22min", strong: true },
      { text: "Task success: 58% → 92%", strong: true },
      { text: "SUS score: 54 → 81", strong: true },
    ],
    source: "Atlas Freight flagship case",
    demo: true,
  },
  {
    kicker: "How I work",
    icon: "ListChecks",
    lines: [
      { text: "1. Research the real workflow" },
      { text: "2. Decide with evidence, not taste" },
      { text: "3. Test before polishing" },
      { text: "4. Hand off dev-ready, stay close" },
    ],
  },
  {
    kicker: "Availability",
    icon: "Clock",
    lines: [
      { text: "Available for new projects", strong: true },
      { text: "Usually replies within 1–2 business days · async-friendly" },
    ],
  },
];

/**
 * Three vertical "wall of love" columns for the proof marquee, each drifting
 * independently. With only four cards, columns share a couple of cards so
 * every column has enough height to loop smoothly — same real content, just
 * shown more than once.
 */
export const proofColumns: ProofCard[][] = [
  [proofCards[0], proofCards[1]],
  [proofCards[2], proofCards[3]],
  [proofCards[1], proofCards[2]],
];
