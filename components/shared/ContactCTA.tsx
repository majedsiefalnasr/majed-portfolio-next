import { SectionIntro } from "@/components/shared/SectionIntro";
import { siteConfig } from "@/lib/site-config";

/**
 * Pre-footer contact section: conversational intro + oversized email CTA.
 * Static — Server Component.
 */
export function ContactCTA() {
  return (
    <div className="flex flex-col gap-10">
      <SectionIntro headline="How can I reach him?">
        <p>
          Have an idea, a project, or just a question? I&apos;d love to hear from
          you. 👇
        </p>
      </SectionIntro>
      <a
        href={`mailto:${siteConfig.email}`}
        className="block break-words text-center text-[clamp(1.75rem,6vw,4.5rem)] font-semibold tracking-tight text-title underline decoration-ink/15 underline-offset-8 transition-colors hover:decoration-ink"
      >
        {siteConfig.email}
      </a>
    </div>
  );
}
