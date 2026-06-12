export interface FaqItem {
  question: string;
  answer: string;
}

/** Pre-contact objection handling on Home ("Still have questions?"). */
export const faqItems: FaqItem[] = [
  {
    question: "What kind of projects do you take on?",
    answer:
      "Product design end to end: UX/UI for mobile and web, redesigns of existing products, data-driven UX improvements, and design consultation. A brand-new idea or a tangled legacy flow, both are home ground.",
  },
  {
    question: "How does pricing work?",
    answer:
      "Two shapes: a per-project quote scoped after our first chat, or a monthly design-partner plan for ongoing work. Either way you get the full cost in writing before you commit to anything.",
  },
  {
    question: "How long does a project take?",
    answer:
      "It depends on the scope. A focused redesign moves in weeks; a full product takes longer. You'll have a realistic timeline before we start, and you'll see progress the whole way through.",
  },
  {
    question: "Can you work with our existing team?",
    answer:
      "Yes, happily. I work alongside founders, product people, and engineers, and I stay through the build so what ships matches what we designed.",
  },
  {
    question: "What do you need from me to get started?",
    answer:
      "Just context: what you're building, who it's for, and what isn't working. A short email is enough to kick things off; we'll dig into the rest together.",
  },
];
