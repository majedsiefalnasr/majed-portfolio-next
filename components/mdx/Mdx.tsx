import { evaluate } from "next-mdx-remote-client/rsc";
import { mdxComponents } from "@/components/mdx/mdx-components";

interface MdxProps {
  /** Raw MDX body (frontmatter already stripped by the content loader). */
  source: string;
}

/**
 * Compiles and renders an MDX body as a Server Component.
 * Frontmatter is parsed upstream in lib/content, so disable it here.
 */
export async function Mdx({ source }: MdxProps) {
  const { content, error } = await evaluate({
    source,
    options: { parseFrontmatter: false },
    components: mdxComponents,
  });

  if (error) {
    // Surface compile errors loudly in dev rather than rendering blank.
    throw error;
  }

  return <div className="mdx-content">{content}</div>;
}
