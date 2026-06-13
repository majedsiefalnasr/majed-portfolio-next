import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { Section } from "@/components/layout/Section";
import { Mdx } from "@/components/mdx/Mdx";
import { NextWorkTeaser } from "@/components/shared/NextWorkTeaser";
import { WorkHeroSlider } from "@/components/sections/WorkHeroSlider";
import { ToolIcon } from "@/components/shared/ToolIcon";
import { PageFooterSections } from "@/components/layout/PageFooterSections";
import { getWork, getWorkSlugs, getAllWork } from "@/lib/content";

export async function generateStaticParams() {
  const slugs = await getWorkSlugs();
  return slugs.map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const entry = await getWork(slug);
  if (!entry) return {};
  return {
    title: entry.frontmatter.title,
    description: entry.frontmatter.description,
  };
}

export default async function WorkDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const entry = await getWork(slug);
  if (!entry) notFound();

  const { frontmatter, body } = entry;
  const all = await getAllWork();
  const next = all.find((w) => w.slug !== slug);

  return (
    <>
      <Section width="prose">
        <nav className="mb-8 flex items-center gap-2 text-sm text-body">
          <Link href="/work" className="hover:text-title">
            Work
          </Link>
          <span aria-hidden>›</span>
          <span className="text-title">{frontmatter.title}</span>
        </nav>
        <header className="flex flex-col gap-8">
          <h1 className="text-h1 font-bold text-title text-balance">
            {frontmatter.title}
          </h1>

          {/* Info row: Location/Year · Role · Tools */}
          <div className="flex flex-wrap gap-x-16 gap-y-6">
            {frontmatter.locationYear && (
              <div className="flex flex-col gap-2">
                <span className="text-sm text-body" >Location &amp; year</span>
                <span className="text-base font-medium text-title" >{frontmatter.locationYear}</span>
              </div>
            )}
            {frontmatter.role && (
              <div className="flex flex-col gap-2">
                <span className="text-sm text-body" >Role / Services</span>
                <span className="text-base font-medium text-title" >{frontmatter.role}</span>
              </div>
            )}
            {frontmatter.tools && frontmatter.tools.length > 0 && (
              <div className="flex flex-col gap-2">
                <span className="text-sm text-body" >Tools Used</span>
                <div className="flex flex-wrap gap-2">
                  {frontmatter.tools.map((tool) => (
                    <ToolIcon key={tool} tool={tool} size={36} />
                  ))}
                </div>
              </div>
            )}
          </div>
        </header>
      </Section>

      <WorkHeroSlider work={{ ...frontmatter, slug }} />

      <Section width="prose">
        <article>
          <Mdx source={body} />
        </article>
      </Section>

      {next && (
        <Section>
          <NextWorkTeaser work={next} />
        </Section>
      )}

      <PageFooterSections />
    </>
  );
}
