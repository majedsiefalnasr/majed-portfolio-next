import type { Metadata } from "next";
import { ArrowDown } from "lucide-react";
import { Section } from "@/components/layout/Section";
import { SectionIntro } from "@/components/shared/SectionIntro";
import { WorkRow } from "@/components/shared/WorkRow";
import { TrustSection } from "@/components/sections/TrustSection";
import { PageFooterSections } from "@/components/layout/PageFooterSections";
import { getAllWork } from "@/lib/content";

export const metadata: Metadata = {
  title: "Work",
  description:
    "Selected product design case studies covering research, UX, UI, systems, and measurable product outcomes.",
};

export default async function WorkPage() {
  const workItems = await getAllWork();

  return (
    <>
      <Section>
        <SectionIntro
          as="h1"
          align="center"
          headline="What does his design process actually look like?"
        >
          Real case studies, messy problem to shipped product. See how I frame,
          shape, and turn the work into{" "}
          <strong>clear product outcomes.</strong>
        </SectionIntro>
        <div className="mt-10 flex flex-col items-center gap-3">
          <a
            href="#case-studies"
            className="tap-feedback flex size-[50px] items-center justify-center rounded-pill bg-surface text-title ring-1 ring-ink/10 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ink"
            aria-label="Jump to case studies"
          >
            <ArrowDown className="size-4" aria-hidden />
          </a>
          <span className="text-sm text-body">Review the case studies</span>
        </div>
      </Section>

      <div id="case-studies">
        {workItems.map((work) => (
          <WorkRow key={work.slug} work={work} />
        ))}
      </div>

      <TrustSection />

      <PageFooterSections withNewsletter={false} />
    </>
  );
}
