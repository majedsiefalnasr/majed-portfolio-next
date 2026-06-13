import { Section } from "@/components/layout/Section";
import { SectionIntro } from "@/components/shared/SectionIntro";
import { ProofMarquee } from "@/components/sections/ProofMarquee";

/**
 * "Can I trust him with my project?" — shared trust/proof section, identical
 * across pages (Home, Work).
 */
export function TrustSection() {
  return (
    <Section>
      <SectionIntro headline="Can I trust him with my project?">
        Don&apos;t take my word for it. <strong>Read the output</strong>: what
        clients say, what the work moved, and how it gets done.
      </SectionIntro>
      <div className="mt-12">
        <ProofMarquee />
      </div>
    </Section>
  );
}
