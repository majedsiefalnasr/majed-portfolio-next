import { Section } from "@/components/layout/Section";
import { ContactCTA } from "@/components/shared/ContactCTA";
import { NewsletterCTA } from "@/components/shared/NewsletterCTA";

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
      {withNewsletter && (
        <Section className="border-t border-ink/5">
          <NewsletterCTA />
        </Section>
      )}
      <Section className="border-t border-ink/5">
        <ContactCTA />
      </Section>
    </>
  );
}
