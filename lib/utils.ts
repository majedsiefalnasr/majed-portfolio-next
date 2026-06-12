import { clsx, type ClassValue } from "clsx";
import { extendTailwindMerge } from "tailwind-merge";

/**
 * tailwind-merge must be taught the project's custom font-size utilities
 * (the @theme --text-* tokens); otherwise it classifies `text-lead`,
 * `text-intro`, etc. as text *colors* and silently drops them whenever a
 * real color like `text-body` follows in the same class list.
 */
const twMerge = extendTailwindMerge({
  extend: {
    classGroups: {
      "font-size": [
        { text: ["display", "h1", "h2", "h3", "question", "lead", "intro"] },
      ],
    },
  },
});

/** Merge conditional class names, resolving Tailwind conflicts (last wins). */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
