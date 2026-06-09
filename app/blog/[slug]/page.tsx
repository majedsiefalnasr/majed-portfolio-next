import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { Section } from "@/components/layout/Section";
import { Mdx } from "@/components/mdx/Mdx";
import { PageFooterSections } from "@/components/layout/PageFooterSections";
import { getBlogPost, getBlogSlugs } from "@/lib/content";

export async function generateStaticParams() {
  const slugs = await getBlogSlugs();
  return slugs.map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const entry = await getBlogPost(slug);
  if (!entry) return {};
  return {
    title: entry.frontmatter.title,
    description: entry.frontmatter.excerpt,
  };
}

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  });
}

export default async function BlogDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const entry = await getBlogPost(slug);
  if (!entry) notFound();

  const { frontmatter, body } = entry;

  return (
    <>
      <Section width="prose">
        <nav className="mb-8 text-sm text-body">
          <Link href="/blog" className="hover:text-title">
            ← Blog
          </Link>
        </nav>
        <header className="flex flex-col gap-3">
          <div className="flex items-center gap-3 text-sm text-body">
            <span className="font-medium">{frontmatter.category}</span>
            <span aria-hidden>·</span>
            <time dateTime={frontmatter.date}>
              {formatDate(frontmatter.date)}
            </time>
          </div>
          <h1 className="text-h1 font-semibold text-title text-balance">
            {frontmatter.title}
          </h1>
          <p className="text-lead text-body">{frontmatter.excerpt}</p>
        </header>
      </Section>

      <Section width="prose" className="pt-0">
        <article>
          <Mdx source={body} />
        </article>
      </Section>

      <PageFooterSections withNewsletter={false} />
    </>
  );
}
