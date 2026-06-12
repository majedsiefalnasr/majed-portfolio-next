import { Section } from "@/components/layout/Section";
import { SectionIntro } from "@/components/shared/SectionIntro";
import { HeroSection } from "@/components/sections/HeroSection";
import { ProjectsStack } from "@/components/sections/ProjectsStack";
import { AboutSection } from "@/components/sections/AboutSection";
import { CapabilityChips } from "@/components/sections/CapabilityChips";
import { ExperienceCapabilities } from "@/components/sections/ExperienceCapabilities";
import { CaseStudyShowcase } from "@/components/shared/CaseStudyShowcase";
import { DesignApproachCarousel } from "@/components/sections/DesignApproachCarousel";
import { ServicesShowcase } from "@/components/sections/ServicesShowcase";
import { TestimonialBlock } from "@/components/shared/TestimonialBlock";
import { ProofMarquee } from "@/components/sections/ProofMarquee";
import { BlogCarousel } from "@/components/sections/BlogCarousel";
import { NewsletterCTA } from "@/components/shared/NewsletterCTA";
import { ContactCTA } from "@/components/shared/ContactCTA";
import { BookingCTA } from "@/components/shared/BookingCTA";
import { CvLinks } from "@/components/shared/CvLinks";
import { PricingSection } from "@/components/sections/PricingSection";
import { ReachOutSteps } from "@/components/sections/ReachOutSteps";
import { FaqSection } from "@/components/sections/FaqSection";
import { CtaLink } from "@/components/ui/CtaLink";
import { getAllCaseStudies, getAllBlogPosts } from "@/lib/content";
import { features } from "@/lib/features";
import { pullQuote } from "@/data/testimonials";

export default async function HomePage() {
  const [caseStudies, posts] = await Promise.all([
    getAllCaseStudies(),
    features.blog ? getAllBlogPosts() : Promise.resolve([]),
  ]);
  const featuredCase = caseStudies[0];

  return (
    <>
      <Section>
        <HeroSection />
      </Section>

      {/* Projects — evidence first */}
      <Section className="pt-0">
        <SectionIntro headline="Can he help me design something amazing?">
          See for yourself. Here&apos;s <strong>the work</strong> and{" "}
          <strong>what it changed</strong> for the people using it 👇
        </SectionIntro>
        {featuredCase && (
          <div className="mt-10">
            <ProjectsStack caseStudies={caseStudies} />
            <div className="mt-14 flex flex-col items-center gap-4 text-center">
              <span className="text-3xl" aria-hidden>
                🍀
              </span>
              <p className="text-h3 font-semibold text-title">
                And that&apos;s not all.
              </p>
              <CtaLink href="/case-studies" variant="secondary">
                View all case studies
              </CtaLink>
            </div>
          </div>
        )}
      </Section>

      {/* About — the person behind the work */}
      <Section>
        <SectionIntro headline="Who's behind the work?">
          Glad you asked. <strong>The short version:</strong>
        </SectionIntro>
        <div className="mt-12">
          <AboutSection />
        </div>
      </Section>

      {/* What he does — breadth at a glance */}
      <Section>
        <SectionIntro headline="What does he actually do?">
          I turn <strong>ideas into products people understand</strong>. The
          day-to-day craft covers the whole journey:
        </SectionIntro>
        <div className="mt-12">
          <CapabilityChips />
        </div>
      </Section>

      {/* Selected Experience & Capabilities — credibility anchors */}
      <Section>
        <SectionIntro headline="Where has he put all this to work?">
          Across <strong>products, industries, and teams</strong>. A snapshot
          of the ground covered so far:
        </SectionIntro>
        <div className="mt-12">
          <ExperienceCapabilities />
        </div>
      </Section>

      {/* Services — concrete ways to engage */}
      <Section>
        <SectionIntro headline="How can he help your product?">
          Four ways to work together, whether you&apos;re{" "}
          <strong>starting fresh</strong> or <strong>fixing what exists</strong>
          .
        </SectionIntro>
        <div className="mt-12">
          <ServicesShowcase />
        </div>
      </Section>

      {/* Design approach — the thinking behind the work */}
      <Section>
        <SectionIntro headline="Why does his design approach work?">
          Because it starts with <strong>people, not pixels</strong>. Five
          principles guide every project:
        </SectionIntro>
        <div className="mt-12">
          <DesignApproachCarousel />
        </div>
      </Section>

      {/* Editorial pull-quote — the philosophy in one line */}
      <Section>
        <TestimonialBlock
          variant="pull"
          testimonial={{
            quote: pullQuote.quote,
            author: pullQuote.author,
            role: pullQuote.role,
            avatar: pullQuote.avatar,
          }}
        />
      </Section>

      {/* Skilled / proof */}
      {featuredCase && (
        <Section>
          <SectionIntro headline="Is he skilled enough?">
            Claims are cheap. Here&apos;s <strong>one project, end to end</strong>
            , with the numbers it moved.
          </SectionIntro>
          <div className="mt-12">
            <CaseStudyShowcase caseStudy={featuredCase} metrics="below" />
          </div>
        </Section>
      )}

      {/* Trust / proof terminals */}
      <Section>
        <SectionIntro headline="Can I trust him with my project?">
          Don&apos;t take my word for it. <strong>Read the output</strong>:
          what clients say, what the work moved, and how it gets done.
        </SectionIntro>
        <div className="mt-12">
          <ProofMarquee />
        </div>
      </Section>

      {/* Insights */}
      {features.blog && posts.length > 0 && (
        <Section>
          <SectionIntro headline="What does he think about design?">
            Notes from the desk: <strong>ideas, process, and opinions</strong>{" "}
            in progress.
          </SectionIntro>
          <div className="mt-12">
            <BlogCarousel posts={posts} />
          </div>
        </Section>
      )}

      {/* Newsletter */}
      {features.newsletter && (
        <Section>
          <NewsletterCTA />
        </Section>
      )}

      {/* Pricing — no mystery before the ask */}
      <Section>
        <SectionIntro headline="What does working together cost?">
          No mystery pricing. <strong>Two simple shapes</strong>, and the full
          cost in writing before we start.
        </SectionIntro>
        <div className="mt-12">
          <PricingSection />
        </div>
      </Section>

      {/* Reach-out journey */}
      <Section>
        <SectionIntro headline="What happens if I reach out?">
          No forms, no hoops. <strong>Three steps</strong>, from hello to
          kickoff.
        </SectionIntro>
        <div className="mt-16">
          <ReachOutSteps />
        </div>
        <CvLinks className="mt-14" />
      </Section>

      {/* FAQ */}
      <Section>
        <SectionIntro headline="Still have questions?">
          Totally fair. <strong>Straight answers</strong> to the ones founders
          ask most.
        </SectionIntro>
        <div className="mt-12">
          <FaqSection />
        </div>
      </Section>

      {/* Booking — the primary conversion ask */}
      <Section>
        <BookingCTA />
      </Section>

      {/* Contact */}
      <Section>
        <ContactCTA />
      </Section>
    </>
  );
}
