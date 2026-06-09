import type { Service } from "@/types";

/** Drives ServicesGrid on Home. */
export const services: Service[] = [
  {
    slug: "cx-design",
    title: "CX Design",
    description:
      "End-to-end customer experience — journeys, touchpoints, and the system that holds them together.",
    icon: "Route",
  },
  {
    slug: "ux-ui-design",
    title: "UX / UI Design",
    description:
      "Interfaces that feel obvious. Research-led flows, design systems, and pixel-honest execution.",
    icon: "LayoutDashboard",
  },
  {
    slug: "product-design",
    title: "Product Design",
    description:
      "From problem framing to shipped product — defining what to build and why it matters.",
    icon: "Boxes",
  },
  {
    slug: "consulting",
    title: "Consulting",
    description:
      "Design strategy and team enablement — embedding practices that outlast a single project.",
    icon: "Compass",
  },
];
