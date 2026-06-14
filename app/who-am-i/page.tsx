import type { Metadata } from "next";
import { Section } from "@/components/layout/Section";
import { SectionIntro } from "@/components/shared/SectionIntro";
import { AvatarHero } from "@/components/sections/AvatarHero";
import { ProcessSteps } from "@/components/sections/ProcessSteps";
import { WorkCard } from "@/components/shared/WorkCard";
import { PageFooterSections } from "@/components/layout/PageFooterSections";
import { getAllWork } from "@/lib/content";

export const metadata: Metadata = {
  title: "Who am I?",
  description:
    "Majed Sief Alnasr — CX, UX/UI, and product designer with 7 years turning tangled products into ones people understand.",
};

export default async function WhoAmIPage() {
  const workItems = await getAllWork();
  return (
    <>
      <Section>
        <AvatarHero />
      </Section>

      <Section>
        <SectionIntro headline="How does he actually run a project?">
          Same four steps, every time. Not a formula{" "}
          <strong>— a way of making sure nothing gets skipped.</strong>
        </SectionIntro>
        <div className="mt-12">
          <ProcessSteps />
        </div>
      </Section>

      <Section>
        <SectionIntro headline="Is he skilled enough?">
          The case studies answer that.{" "}
          <strong>Pick any one and see the full arc:</strong>
        </SectionIntro>
        <div className="mt-12 grid gap-8 md:grid-cols-2">
          {workItems.map((work) => (
            <WorkCard key={work.slug} work={work} variant="grid" />
          ))}
        </div>
      </Section>

      <PageFooterSections />
    </>
  );
}
