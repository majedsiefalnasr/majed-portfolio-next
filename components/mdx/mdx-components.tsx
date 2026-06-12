import Link from "next/link";
import type { MDXComponents } from "next-mdx-remote-client/rsc";
import { DeviceMockup } from "@/components/motion/DeviceMockup";
import { ImageGallery } from "@/components/mdx/ImageGallery";
import { MetricBlock } from "@/components/mdx/MetricBlock";
import { ZoomImage } from "@/components/mdx/ZoomImage";

/**
 * Global MDX component map: editorial prose styles + custom blocks usable
 * directly in .mdx (DeviceMockup, ImageGallery, MetricBlock).
 */
export const mdxComponents: MDXComponents = {
  h2: (props) => (
    <h2 className="mt-12 text-h2 font-semibold text-title" {...props} />
  ),
  h3: (props) => (
    <h3 className="mt-8 text-h3 font-semibold text-title" {...props} />
  ),
  p: (props) => <p className="mt-5 text-lead text-body" {...props} />,
  ul: (props) => (
    <ul className="mt-5 list-disc space-y-2 pl-6 text-lead text-body" {...props} />
  ),
  ol: (props) => (
    <ol className="mt-5 list-decimal space-y-2 pl-6 text-lead text-body" {...props} />
  ),
  a: ({ href = "#", ...props }) => (
    <Link
      href={href}
      className="text-title underline decoration-ink/30 underline-offset-4 hover:decoration-ink"
      {...props}
    />
  ),
  blockquote: (props) => (
    <blockquote
      className="mt-6 border-l-2 border-ink/20 pl-5 text-h3 font-medium text-title"
      {...props}
    />
  ),
  img: ({ src = "", alt = "" }) => (
    <ZoomImage src={typeof src === "string" ? src : ""} alt={alt} />
  ),
  // Custom blocks
  DeviceMockup,
  ImageGallery,
  MetricBlock,
};
