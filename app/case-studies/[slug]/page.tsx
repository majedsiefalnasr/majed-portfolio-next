import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { Section } from "@/components/layout/Section";
import { Mdx } from "@/components/mdx/Mdx";
import { CaseStudyCard } from "@/components/shared/CaseStudyCard";
import { PageFooterSections } from "@/components/layout/PageFooterSections";
import {
  getCaseStudy,
  getCaseStudySlugs,
  getAllCaseStudies,
} from "@/lib/content";

export async function generateStaticParams() {
  const slugs = await getCaseStudySlugs();
  return slugs.map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const entry = await getCaseStudy(slug);
  if (!entry) return {};
  return {
    title: entry.frontmatter.title,
    description: entry.frontmatter.description,
  };
}

export default async function CaseStudyDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const entry = await getCaseStudy(slug);
  if (!entry) notFound();

  const { frontmatter, body } = entry;
  const all = await getAllCaseStudies();
  const next = all.find((cs) => cs.slug !== slug);

  return (
    <>
      <Section width="prose">
        <nav className="mb-8 text-sm text-body">
          <Link href="/case-studies" className="hover:text-title">
            ← Case studies
          </Link>
        </nav>
        <header className="flex flex-col gap-4">
          {frontmatter.tags?.length > 0 && (
            <ul className="flex flex-wrap gap-2">
              {frontmatter.tags.map((tag) => (
                <li
                  key={tag}
                  className="rounded-pill bg-ink/5 px-3 py-1 text-xs font-medium text-body"
                >
                  {tag}
                </li>
              ))}
            </ul>
          )}
          <h1 className="text-h1 font-semibold text-title text-balance">
            {frontmatter.title}
          </h1>
          <p className="text-lead text-body">{frontmatter.description}</p>
        </header>
      </Section>

      <Section width="prose" className="pt-0">
        <article>
          <Mdx source={body} />
        </article>
      </Section>

      {next && (
        <Section>
          <CaseStudyCard
            caseStudy={next}
            variant="featured"
            label="Next case →"
          />
        </Section>
      )}

      <PageFooterSections />
    </>
  );
}
