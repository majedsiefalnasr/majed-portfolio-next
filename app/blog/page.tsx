import type { Metadata } from "next";
import { Section } from "@/components/layout/Section";
import { SectionIntro } from "@/components/shared/SectionIntro";
import { BlogGrid } from "@/components/sections/BlogGrid";
import { PageFooterSections } from "@/components/layout/PageFooterSections";
import { getAllBlogPosts } from "@/lib/content";

export const metadata: Metadata = {
  title: "Blog",
  description:
    "Insights, ideas, and strategies on design, technology, and creativity.",
};

export default async function BlogPage() {
  const posts = await getAllBlogPosts();
  return (
    <>
      <Section>
        <SectionIntro as="h1" headline="What does he think about design?">
          <p>
            I share insights, ideas, and strategies on design, technology, and
            creativity. Read my latest thoughts: 👇
          </p>
        </SectionIntro>
      </Section>
      <Section className="pt-0">
        <BlogGrid posts={posts} />
      </Section>
      <PageFooterSections withNewsletter={false} />
    </>
  );
}
