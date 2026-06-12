import { CtaLink } from "@/components/ui/CtaLink";
import { SectionIntro } from "@/components/shared/SectionIntro";
import { siteConfig } from "@/lib/site-config";

/**
 * Primary conversion block near the end of Home. Both targets come from
 * siteConfig.links (placeholders during the framework phase) — swap the
 * real booking URL and email there, not here.
 */

export function BookingCTA() {
  return (
    <div id="booking" className="flex flex-col items-center gap-10">
      <SectionIntro align="center" headline="So, what's the next step?">
        A short call, no pitch. Bring your product, leave with{" "}
        <strong>an honest read and a clear plan</strong>, whether we work
        together or not.
      </SectionIntro>
      <div className="flex flex-wrap items-center justify-center gap-x-4 gap-y-3">
        <CtaLink href={siteConfig.links.booking}>
          Book a 20-minute intro call
        </CtaLink>
        <CtaLink href={siteConfig.links.bookingEmail} variant="secondary">
          Email me
        </CtaLink>
      </div>
    </div>
  );
}
