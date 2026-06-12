import { Section } from "@/components/layout/Section";
import { ContactCTA } from "@/components/shared/ContactCTA";
import { NewsletterCTA } from "@/components/shared/NewsletterCTA";
import { features } from "@/lib/features";

interface PageFooterSectionsProps {
  /** Hide the newsletter on pages where it doesn't belong. */
  withNewsletter?: boolean;
}

/**
 * Composes the recurring pre-footer block (ContactCTA + NewsletterCTA),
 * included explicitly per page rather than in layout.tsx (brainstorm decision).
 * Server Component composing a server + client child.
 */
export function PageFooterSections({
  withNewsletter = true,
}: PageFooterSectionsProps) {
  return (
    <>
      {withNewsletter && features.newsletter && (
        <Section>
          <NewsletterCTA />
        </Section>
      )}
      <Section>
        <ContactCTA />
      </Section>
    </>
  );
}
