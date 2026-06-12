import type { Metadata } from "next";
import { Section } from "@/components/layout/Section";
import { SectionIntro } from "@/components/shared/SectionIntro";
import { CaseStudyRow } from "@/components/shared/CaseStudyRow";
import { TestimonialBlock } from "@/components/shared/TestimonialBlock";
import { PageFooterSections } from "@/components/layout/PageFooterSections";
import { getAllCaseStudies } from "@/lib/content";
import { testimonials } from "@/data/testimonials";

export const metadata: Metadata = {
  title: "Case studies",
  description:
    "Selected work — end-to-end CX, UX/UI, and product design case studies.",
};

export default async function CaseStudiesPage() {
  const caseStudies = await getAllCaseStudies();

  return (
    <>
      <Section>
        <SectionIntro
          as="h1"
          align="center"
          headline="Take a look at real-world examples of how he tackles challenges with smart, user-focused design"
        />
        <div className="mt-10 flex flex-col items-center gap-3">
          <div className="flex size-[50px] items-center justify-center rounded-pill bg-surface ring-1 ring-ink/10">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden className="text-body"><path d="M12 5v14M5 12l7 7 7-7"/></svg>
          </div>
          <span className="text-sm text-body">Scroll to explore</span>
        </div>
      </Section>

      {caseStudies.map((cs) => (
        <CaseStudyRow key={cs.slug} caseStudy={cs} />
      ))}

      {testimonials[0] && (
        <Section>
          <SectionIntro headline="Can I trust him with my project?">
            <strong>Good design speaks</strong> for itself, but feedback matters
            too. Here is what working with me is like: 👇
          </SectionIntro>
          <div className="mt-12">
            <TestimonialBlock testimonial={testimonials[0]} />
          </div>
        </Section>
      )}

      <PageFooterSections withNewsletter={false} />
    </>
  );
}
