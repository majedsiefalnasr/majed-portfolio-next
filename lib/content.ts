import { readdir, readFile } from "node:fs/promises";
import { join } from "node:path";
import matter from "gray-matter";
import type { BlogPost, Work } from "@/types";

const CONTENT_DIR = join(process.cwd(), "content");

type Collection = "blog" | "work";

/** Raw MDX source + parsed frontmatter for a single entry. */
interface Entry<TFrontmatter> {
  slug: string;
  frontmatter: TFrontmatter;
  body: string;
}

async function readEntry<TFrontmatter>(
  collection: Collection,
  slug: string,
): Promise<Entry<TFrontmatter> | null> {
  try {
    const raw = await readFile(
      join(CONTENT_DIR, collection, `${slug}.mdx`),
      "utf8",
    );
    const { data, content } = matter(raw);
    return { slug, frontmatter: data as TFrontmatter, body: content };
  } catch {
    return null;
  }
}

async function listSlugs(collection: Collection): Promise<string[]> {
  try {
    const files = await readdir(join(CONTENT_DIR, collection));
    return files
      .filter((f) => f.endsWith(".mdx"))
      .map((f) => f.replace(/\.mdx$/, ""));
  } catch {
    return [];
  }
}

/* ---- Blog ---- */

export async function getAllBlogPosts(): Promise<BlogPost[]> {
  const slugs = await listSlugs("blog");
  const entries = await Promise.all(
    slugs.map((slug) => readEntry<Omit<BlogPost, "slug">>("blog", slug)),
  );
  return entries
    .filter((e): e is NonNullable<typeof e> => e !== null)
    .map((e) => ({ slug: e.slug, ...e.frontmatter }))
    .sort((a, b) => +new Date(b.date) - +new Date(a.date));
}

export function getBlogPost(slug: string) {
  return readEntry<Omit<BlogPost, "slug">>("blog", slug);
}

export const getBlogSlugs = () => listSlugs("blog");

/* ---- Work ---- */

export async function getAllWork(): Promise<Work[]> {
  const slugs = await listSlugs("work");
  const entries = await Promise.all(
    slugs.map((slug) => readEntry<Omit<Work, "slug">>("work", slug)),
  );
  return entries
    .filter((e): e is NonNullable<typeof e> => e !== null)
    .map((e) => ({ slug: e.slug, ...e.frontmatter }))
    .sort((a, b) => (a.order ?? 99) - (b.order ?? 99));
}

export function getWork(slug: string) {
  return readEntry<Omit<Work, "slug">>("work", slug);
}

export const getWorkSlugs = () => listSlugs("work");
