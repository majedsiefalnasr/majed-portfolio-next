import type { Metadata } from "next";
import { Section } from "@/components/layout/Section";
import { SectionIntro } from "@/components/shared/SectionIntro";
import { HeroSection } from "@/components/sections/HeroSection";
import { ProcessSteps } from "@/components/sections/ProcessSteps";
import { CaseStudyCard } from "@/components/shared/CaseStudyCard";
import { PageFooterSections } from "@/components/layout/PageFooterSections";
import { getAllCaseStudies } from "@/lib/content";

export const metadata: Metadata = {
  title: "Who am I",
  description:
    "Majed Sief Alnasr — CX, UX/UI, and product designer with 7 years crafting seamless experiences.",
};

export default async function WhoAmIPage() {
  const caseStudies = await getAllCaseStudies();
  return (
    <>
      <Section>
        <HeroSection />
      </Section>

      <Section>
        <SectionIntro headline="Why does his design approach work?">
          <p>
            Good question! Here&apos;s how I make sure every project delivers
            results — research first, craft throughout, measure after.
          </p>
        </SectionIntro>
        <div className="mt-12">
          <ProcessSteps />
        </div>
      </Section>

      <Section>
        <SectionIntro headline="Is he skilled enough?">
          <p>
            I don&apos;t just talk — I prove it. Take a look at work I&apos;m
            proud of: 👇
          </p>
        </SectionIntro>
        <div className="mt-12 grid gap-8 md:grid-cols-2">
          {caseStudies.map((cs) => (
            <CaseStudyCard key={cs.slug} caseStudy={cs} variant="grid" />
          ))}
        </div>
      </Section>

      <PageFooterSections />
    </>
  );
}
