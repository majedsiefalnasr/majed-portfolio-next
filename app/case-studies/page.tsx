import type { Metadata } from "next";
import { Section } from "@/components/layout/Section";
import { SectionIntro } from "@/components/shared/SectionIntro";
import { CaseStudyCard } from "@/components/shared/CaseStudyCard";
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
  const [featured, ...rest] = caseStudies;

  return (
    <>
      <Section>
        <SectionIntro as="h1" headline="Can he help me design something amazing?">
          <p>See for yourself — take a look at the work I have done: 👇</p>
        </SectionIntro>
      </Section>

      {featured && (
        <Section className="pt-0">
          <CaseStudyCard caseStudy={featured} variant="featured" />
        </Section>
      )}

      {rest.length > 0 && (
        <Section className="pt-0">
          <div className="grid gap-8 md:grid-cols-2">
            {rest.map((cs) => (
              <CaseStudyCard key={cs.slug} caseStudy={cs} variant="grid" />
            ))}
          </div>
        </Section>
      )}

      {testimonials[0] && (
        <Section>
          <TestimonialBlock testimonial={testimonials[0]} />
        </Section>
      )}

      <PageFooterSections />
    </>
  );
}
