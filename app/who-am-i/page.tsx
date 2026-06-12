import type { Metadata } from "next";
import { Section } from "@/components/layout/Section";
import { SectionIntro } from "@/components/shared/SectionIntro";
import { AvatarHero } from "@/components/sections/AvatarHero";
import { ProcessSteps } from "@/components/sections/ProcessSteps";
import { CaseStudyCard } from "@/components/shared/CaseStudyCard";
import { PageFooterSections } from "@/components/layout/PageFooterSections";
import { getAllCaseStudies } from "@/lib/content";

export const metadata: Metadata = {
  title: "Who am I",
  description:
    "Majed Sief Alnasr — CX, UX/UI, and product designer with 7 years turning tangled products into ones people understand.",
};

export default async function WhoAmIPage() {
  const caseStudies = await getAllCaseStudies();
  return (
    <>
      <Section>
        <AvatarHero />
      </Section>

      <Section>
        <SectionIntro headline="Why does his design approach work?">
          Good question! Here&apos;s how I{" "}
          <strong>make sure every project delivers results</strong> 👇
        </SectionIntro>
        <div className="mt-12">
          <ProcessSteps />
        </div>
      </Section>

      <Section>
        <SectionIntro headline="Is he skilled enough?">
          I don&apos;t just talk, <strong>I prove it.</strong> Take a look at a{" "}
          <strong>project I&apos;m proud of:</strong> 👇
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
