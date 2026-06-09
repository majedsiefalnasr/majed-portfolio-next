import type { Testimonial } from "@/types";

/** Client testimonial shown on Home ("Can I trust him with my project?"). */
export const testimonials: Testimonial[] = [
  {
    quote:
      "His ability to deliver innovative design solutions was impressive. The creative approach set the work apart, and meticulous attention to detail ensured a polished, cohesive final product.",
    author: "Charles Chan",
    role: "Senior Design Director, ByteDance",
    avatar: "/testimonials/charles-chan.svg",
  },
];

/** Standalone editorial pull-quote near the foot of Home. */
export const pullQuote = {
  quote: "Quality means doing it right when no one is looking.",
  author: "Henry Ford",
  role: "American industrialist and business magnate",
} as const;
