import type { ProcessStep } from "@/data/process";

/** 3-step "What happens if I reach out?" journey shown on Home. */
export const reachOutSteps: ProcessStep[] = [
  {
    title: "Say hello",
    description:
      "Email me what you're working on. A couple of sentences is plenty. No brief, no pitch deck required.",
  },
  {
    title: "We talk it through",
    description:
      "A short, honest call about your product and goals. If I'm not the right fit, I'll tell you straight.",
  },
  {
    title: "We get to work",
    description:
      "You get a clear scope and timeline, then design starts. You see progress early and often.",
  },
];
