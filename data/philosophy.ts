import type { PhilosophyItem } from "@/types";

/**
 * Drives the design-approach slider on Home ("Why Does his Design Approach Work?").
 * Copy mirrors the Figma design. Edit here, not in the component.
 */
export const philosophy: PhilosophyItem[] = [
  {
    title: "User First, Always",
    description: "Start with the person doing the task, not the component housing it.",
    icon: "Users",
    tone: "orange",
  },
  {
    title: "Function Meets Aesthetic",
    description: "Visual decisions earn their place by making something clearer or easier, not prettier.",
    icon: "Sparkles",
    tone: "green",
  },
  {
    title: "Simplicity Wins",
    description: "Cut until it breaks, then add back exactly what it needs.",
    icon: "Minimize2",
    tone: "blue",
  },
  {
    title: "Impact-Driven",
    description: "Name the metric before the first sketch, so the work has something to prove.",
    icon: "Target",
    tone: "red",
  },
  {
    title: "Collaboration Matters",
    description: "The best call in a design review is the engineer who spots the edge case on day one.",
    icon: "Handshake",
    tone: "orange",
  },
];
