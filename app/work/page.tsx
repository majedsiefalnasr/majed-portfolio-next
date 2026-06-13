import type { Metadata } from "next";
import { Section } from "@/components/layout/Section";
import { SectionIntro } from "@/components/shared/SectionIntro";
import { WorkRow } from "@/components/shared/WorkRow";
import { TrustSection } from "@/components/sections/TrustSection";
import { PageFooterSections } from "@/components/layout/PageFooterSections";
import { getAllWork } from "@/lib/content";

export const metadata: Metadata = {
  title: "Work",
  description:
    "Selected work — end-to-end CX, UX/UI, and product design projects.",
};

export default async function WorkPage() {
  const workItems = await getAllWork();

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

      {workItems.map((work) => (
        <WorkRow key={work.slug} work={work} />
      ))}

      <TrustSection />

      <PageFooterSections withNewsletter={false} />
    </>
  );
}
