"use client";

import { BlogCard } from "@/components/shared/BlogCard";
import { CarouselButton } from "@/components/ui/CarouselButton";
import { CtaLink } from "@/components/ui/CtaLink";
import { useCarousel } from "@/lib/use-carousel";
import type { BlogPost } from "@/types";

interface BlogCarouselProps {
  posts: BlogPost[];
  /** Show the "Latest Blog Posts" link beside the arrows (home section). */
  cta?: boolean;
}

/**
 * Center-mode blog slider from the Figma: a full-bleed row with one large
 * card centered and its neighbors peeking at the viewport edges, circular
 * prev/next below. Fills to three slides by cycling when fewer posts exist;
 * fill slides are inert so assistive tech meets each post once.
 */
export function BlogCarousel({ posts, cta = true }: BlogCarouselProps) {
  const { ref, canPrev, canNext, scrollPrev, scrollNext } = useCarousel();

  if (posts.length === 0) return null;
  const slides =
    posts.length >= 3
      ? posts
      : Array.from({ length: 3 }, (_, i) => posts[i % posts.length]);

  return (
    <div className="mx-[calc(50%-50vw)] flex w-screen flex-col gap-8">
      <ul
        ref={ref}
        aria-label="Latest blog posts"
        // Active card aligns to the content box's left edge (Figma): 64px
        // gaps, neighbors bleeding to the viewport edges.
        className="flex snap-x snap-mandatory gap-6 overflow-x-auto px-[max(1.25rem,calc(50vw-30.625rem))] scroll-px-[max(1.25rem,calc(50vw-30.625rem))] pb-2 sm:gap-16 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
      >
        {slides.map((post, i) => (
          <li
            key={`${post.slug}-${i}`}
            inert={i >= posts.length || undefined}
            className="w-[min(46rem,84vw)] shrink-0 snap-start"
          >
            <BlogCard post={post} variant="featured" />
          </li>
        ))}
      </ul>

      {/* CTA at the start, arrows at the end of the row (site-wide rule). */}
      <div
        className="mx-auto flex w-full max-w-page items-center gap-3 px-5 sm:px-8 justify-end"
      >
        {cta && (
          <CtaLink href="/blog" variant="secondary">
            Latest Blog Posts
          </CtaLink>
        )}
        <div className="flex gap-3">
          <CarouselButton direction="prev" onClick={scrollPrev} disabled={!canPrev} />
          <CarouselButton direction="next" onClick={scrollNext} disabled={!canNext} />
        </div>
      </div>
    </div>
  );
}
