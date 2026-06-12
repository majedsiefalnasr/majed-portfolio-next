import { Compass, PenTool, Rocket, type LucideIcon } from "lucide-react";

export interface CredibilityCard {
  icon: LucideIcon;
  /** Pastel tint behind the icon (approach-carousel chip language). */
  tint: string;
  title: string;
  description: string;
}

/**
 * The three credibility angles in "Who's behind the work?". Honest framing
 * only: capabilities and ways of working, no invented client names or
 * project counts.
 */
export const credibilityCards: CredibilityCard[] = [
  {
    icon: Compass,
    tint: "#c4e3ff",
    title: "Product thinking",
    description:
      "Design decisions tied to what the business needs to move: research first, metrics named upfront, and the courage to cut what doesn't serve the goal.",
  },
  {
    icon: PenTool,
    tint: "#c5f2d1",
    title: "UX/UI execution",
    description:
      "The whole journey in one pair of hands: interviews, flows, interfaces, design systems, and a dev handoff engineers don't have to decode.",
  },
  {
    icon: Rocket,
    tint: "#ffe7ca",
    title: "Founder mindset",
    description:
      "Built and shipped his own products, so he designs like an owner: scope honestly, move fast where it's safe, slow down where it's expensive.",
  },
];
