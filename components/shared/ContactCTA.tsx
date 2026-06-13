import { SectionIntro } from "@/components/shared/SectionIntro";
import { EmailDrift } from "@/components/motion/EmailDrift";
import { CtaLink } from "@/components/ui/CtaLink";
import { siteConfig } from "@/lib/site-config";

/**
 * Pre-footer contact section: conversational intro + the oversized email that
 * bleeds off the edge with a faint ghost behind it (Figma). Server Component.
 */
export function ContactCTA() {
  return (
    <div className="flex flex-col gap-12">
      <SectionIntro headline="How can I reach him?">
        Have an idea, a project, or just a question?{" "}
        <strong>I&apos;d love to hear from you.</strong> 👇
      </SectionIntro>

      {/* Full-bleed oversized email; it drifts sideways with scroll while the
          ghost layer counter-drifts (EmailDrift). */}
      {/* Figma: main email left-aligned at the box edge bleeding right; the
          ghost layer is ~3x larger behind it. */}
      <div className="relative left-1/2 right-1/2 -mx-[50vw] w-screen">
        <a
          href={`mailto:${siteConfig.email}`}
          className="group relative block"
          aria-label={`Email ${siteConfig.email}`}
        >
          <EmailDrift
            ghost={
              <span
                className="pointer-events-none block whitespace-nowrap text-center font-bold tracking-tight text-title/[0.05]"
                style={{ fontSize: "clamp(6rem, 16.5vw, 15.5rem)" }}
              >
                {siteConfig.email}
              </span>
            }
            main={
              <span
                className="block whitespace-nowrap pl-[max(1.25rem,calc(50vw-30.625rem))] text-left font-bold tracking-tight text-title transition-colors group-hover:text-ink"
                style={{ fontSize: "clamp(2.25rem, 5.3vw, 5rem)" }}
              >
                {siteConfig.email}
              </span>
            }
          />
        </a>
      </div>

      {/* Explicit actions under the marquee: status echo + two clear paths. */}
      <div className="flex flex-col items-center gap-6">
        <p className="flex items-center gap-2.5 text-sm font-medium text-title">
          <span
            className="inline-flex size-2 rounded-full bg-positive"
            aria-hidden
          />
          Currently available for new projects
        </p>
        <div className="flex flex-wrap items-center justify-center gap-x-4 gap-y-3">
          <CtaLink href={siteConfig.links.bookingEmail}>Email me</CtaLink>
          <CtaLink
            href={siteConfig.social.linkedin}
            variant="secondary"
            target="_blank"
            rel="noopener noreferrer"
          >
            Connect on LinkedIn
          </CtaLink>
        </div>
      </div>
    </div>
  );
}
