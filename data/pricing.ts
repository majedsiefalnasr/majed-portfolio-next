export interface PricingPlan {
  name: string;
  /** Display price: a figure ("$3,500") or a phrase ("Custom quote"). */
  price: string;
  /** Rendered small after the price, e.g. "/month". */
  period?: string;
  description: string;
  features: string[];
  /**
   * `booking` routes to siteConfig.links.booking; `email` opens a message
   * via siteConfig.links.bookingEmail with the given subject.
   */
  cta:
    | { label: string; type: "booking" }
    | { label: string; type: "email"; subject: string };
  /** Featured plan renders as the ink (paper-on-ink) card. */
  featured?: boolean;
}

/**
 * Drives the Home pricing section ("What does working together cost?").
 * TODO(majed): the Design-partner rate and both feature lists are
 * placeholders — set your real rate and terms before publishing.
 */
export const pricingPlans: PricingPlan[] = [
  {
    name: "Single project",
    price: "Custom quote",
    description:
      "One product, one scope, one price. Right for a redesign, a new feature, or a product finding its shape.",
    features: [
      "Fixed scope and timeline, agreed upfront",
      "UX/UI end to end, research to dev handoff",
      "Progress you can see and comment on weekly",
    ],
    cta: { label: "Get a quote", type: "email", subject: "Project quote" },
  },
  {
    name: "Design partner",
    price: "$3,500",
    period: "/month",
    description:
      "Ongoing design for teams that ship: a steady stream of UX and UI work without the hiring overhead.",
    features: [
      "Unlimited requests, handled one at a time",
      "Async collaboration with your team",
      "Pause or cancel anytime",
    ],
    cta: { label: "Book a call", type: "booking" },
    featured: true,
  },
];
