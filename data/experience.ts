/**
 * Drives the "Selected Experience & Capabilities" section on Home.
 *
 * PLACEHOLDER DATA — every entry here is demonstration content for the
 * UI/UX development phase. Replace companies with real employers/clients
 * (and add logo assets) before publishing; review the other groups against
 * real history at the same time. The section renders a visible
 * "placeholder" notice as long as `isPlaceholder` stays true.
 */
export const experienceData = {
  isPlaceholder: true,
  companies: [
    { name: "Company One", note: "Enterprise · EdTech" },
    { name: "Company Two", note: "Scale-up · Fintech" },
    { name: "Company Three", note: "Startup · Travel" },
    { name: "Company Four", note: "Agency · Multi-client" },
  ],
  industries: [
    "EdTech",
    "Fintech",
    "Logistics",
    "Healthcare",
    "Travel",
    "E-commerce",
  ],
  products: [
    "Learning platforms",
    "Quoting & ops workspaces",
    "Analytics dashboards",
    "Booking flows",
    "Mobile health apps",
    "Design systems",
  ],
  disciplines: [
    "UX research",
    "Product design",
    "CX strategy",
    "Information architecture",
    "Prototyping",
    "Usability testing",
  ],
} as const;
