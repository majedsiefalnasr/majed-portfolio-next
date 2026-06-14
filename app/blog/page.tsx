import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Section } from "@/components/layout/Section";
import { SectionIntro } from "@/components/shared/SectionIntro";
import { BlogGrid } from "@/components/sections/BlogGrid";
import { BlogCarousel } from "@/components/sections/BlogCarousel";
import { NewsletterCTA } from "@/components/shared/NewsletterCTA";
import { ContactCTA } from "@/components/shared/ContactCTA";
import { getAllBlogPosts } from "@/lib/content";
import { features } from "@/lib/features";

export const metadata: Metadata = {
  title: "Blog",
  description:
    "Notes on product design, UX thinking, and the decisions behind the work.",
};

export default async function BlogPage() {
  if (!features.blog) notFound();
  const posts = await getAllBlogPosts();
  // Lead with up to 3 featured posts in the slider; the grid lists the rest.
  const featured = posts.slice(0, 3);
  const rest = posts.length > 3 ? posts.slice(3) : posts;
  return (
    <>
      <Section>
        <SectionIntro
          as="h1"
          align="center"
          headline="Notes on product design, UX thinking, and the decisions behind the work."
        />
      </Section>

      {featured.length > 0 && (
        <Section className="pt-0">
          <BlogCarousel posts={featured} cta={false} />
        </Section>
      )}

      <Section className="pt-0">
        <BlogGrid posts={rest} />
      </Section>

      <Section>
        <SectionIntro headline="Want new posts in your inbox?">
          Subscribe and each piece lands directly with you{" "}
          <strong>— no feed required.</strong>
        </SectionIntro>
        <div className="mt-12">
          <NewsletterCTA />
        </div>
      </Section>

      <Section>
        <ContactCTA />
      </Section>
    </>
  );
}
