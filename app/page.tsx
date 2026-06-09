import { Section } from "@/components/layout/Section";
import { SectionIntro } from "@/components/shared/SectionIntro";
import { HeroSection } from "@/components/sections/HeroSection";
import { CaseStudyCard } from "@/components/shared/CaseStudyCard";
import { DesignPhilosophyGrid } from "@/components/sections/DesignPhilosophyGrid";
import { ServicesGrid } from "@/components/sections/ServicesGrid";
import { TestimonialBlock } from "@/components/shared/TestimonialBlock";
import { BlogCard } from "@/components/shared/BlogCard";
import { PageFooterSections } from "@/components/layout/PageFooterSections";
import { getAllCaseStudies, getAllBlogPosts } from "@/lib/content";
import { testimonials, pullQuote } from "@/data/testimonials";

export default async function HomePage() {
  const [caseStudies, posts] = await Promise.all([
    getAllCaseStudies(),
    getAllBlogPosts(),
  ]);
  const featuredCase = caseStudies[0];
  const featuredPost = posts[0];

  return (
    <>
      <Section>
        <HeroSection />
      </Section>

      {/* Projects */}
      <Section>
        <SectionIntro headline="Can he help me design something amazing?">
          <p>See for yourself — take a look at the work I have done: 👇</p>
        </SectionIntro>
        {featuredCase && (
          <div className="mt-12">
            <CaseStudyCard caseStudy={featuredCase} variant="featured" />
          </div>
        )}
      </Section>

      {/* Design approach */}
      <Section>
        <SectionIntro headline="Why does his design approach work?">
          <p>
            Good question! Here&apos;s how I make sure every project delivers
            results 👇
          </p>
        </SectionIntro>
        <div className="mt-12">
          <DesignPhilosophyGrid />
        </div>
      </Section>

      {/* Services */}
      <Section>
        <SectionIntro headline="What services does he offer?">
          <p>
            I specialize in crafting intuitive, user-centered experiences.
            Here&apos;s how I can help: 👇
          </p>
        </SectionIntro>
        <div className="mt-12">
          <ServicesGrid />
        </div>
      </Section>

      {/* Trust / testimonial */}
      {testimonials[0] && (
        <Section>
          <SectionIntro headline="Can I trust him with my project?">
            <p>
              Good design speaks for itself, but feedback matters too. Let my
              clients tell you what working with me is like: 👇
            </p>
          </SectionIntro>
          <div className="mt-12">
            <TestimonialBlock testimonial={testimonials[0]} />
          </div>
        </Section>
      )}

      {/* Insights */}
      {featuredPost && (
        <Section>
          <SectionIntro headline="What does he think about design?">
            <p>
              I share insights, ideas, and strategies on design, technology, and
              creativity. Read my latest: 👇
            </p>
          </SectionIntro>
          <div className="mt-12">
            <BlogCard post={featuredPost} variant="featured" />
          </div>
        </Section>
      )}

      {/* Editorial pull-quote */}
      <Section>
        <TestimonialBlock
          variant="pull"
          testimonial={{
            quote: pullQuote.quote,
            author: pullQuote.author,
            role: pullQuote.role,
          }}
        />
      </Section>

      <PageFooterSections />
    </>
  );
}
