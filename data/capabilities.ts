export interface Capability {
  label: string;
  /** Lucide icon name in PascalCase (resolved by ui/Icon). */
  icon: string;
}

/** Drives the "What does he actually do?" chip marquee on Home. */
export const capabilities: Capability[] = [
  { label: "UX/UI design", icon: "LayoutDashboard" },
  { label: "Product design", icon: "Box" },
  { label: "CX strategy", icon: "Route" },
  { label: "Redesigns", icon: "Paintbrush" },
  { label: "UX research", icon: "Search" },
  { label: "Usability testing", icon: "MousePointerClick" },
  { label: "Design systems", icon: "Component" },
  { label: "Prototyping", icon: "Play" },
  { label: "Data-driven UX", icon: "ChartLine" },
  { label: "UX consultation", icon: "Compass" },
  { label: "Information architecture", icon: "Network" },
  { label: "Design-to-dev handoff", icon: "Code" },
];
