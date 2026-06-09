export interface ProcessStep {
  title: string;
  description: string;
}

/** 4-step delivery flow shown on Home. */
export const processSteps: ProcessStep[] = [
  {
    title: "Discovery",
    description: "Understand the people, the problem, and the goals before pixels.",
  },
  {
    title: "Design",
    description: "Translate insight into flows, systems, and interfaces that feel obvious.",
  },
  {
    title: "Development",
    description: "Partner with engineering so the build stays true to the design.",
  },
  {
    title: "Delivery",
    description: "Ship, measure, and refine — design doesn't end at launch.",
  },
];
