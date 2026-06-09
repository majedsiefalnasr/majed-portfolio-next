import type { Service } from "@/types";

/** Drives ServicesGrid on Home ("What Services Does He Offer?"). Copy mirrors Figma. */
export const services: Service[] = [
  {
    slug: "ux-ui-design",
    title: "UX/UI Design for Mobile & Web",
    description:
      "Need a sleek, functional design? He creates seamless experiences tailored for your users.",
    icon: "LayoutDashboard",
  },
  {
    slug: "redesign",
    title: "Redesign for Mobile & Web",
    description:
      "Have an existing product that needs a fresh look? He revamps designs for better usability and engagement.",
    icon: "Paintbrush",
  },
  {
    slug: "analytic-ux",
    title: "Analytic User Experience",
    description:
      "Want data-driven improvements? He analyzes user behavior to refine and optimize experiences.",
    icon: "ChartLine",
  },
  {
    slug: "ux-consultation",
    title: "UX Consultation",
    description:
      "Need expert guidance? He offers tailored insights to enhance your product's usability and impact.",
    icon: "Compass",
  },
];
