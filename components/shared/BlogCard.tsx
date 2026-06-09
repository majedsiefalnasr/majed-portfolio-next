import Image from "next/image";
import Link from "next/link";
import type { BlogPost } from "@/types";
import { cn } from "@/lib/utils";

interface BlogCardProps {
  post: BlogPost;
  variant?: "featured" | "grid";
  className?: string;
}

/** Formats an ISO date as e.g. "Sep 18, 2025". */
function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}

/** Single source for blog cards on Home ("Insights") and the Blog grid. */
export function BlogCard({ post, variant = "grid", className }: BlogCardProps) {
  const { slug, title, excerpt, category, date, cover } = post;
  const featured = variant === "featured";

  return (
    <Link
      href={`/blog/${slug}`}
      className={cn("group flex flex-col gap-4", className)}
    >
      <div className="relative aspect-[16/10] w-full overflow-hidden rounded-large bg-surface">
        <Image
          src={cover}
          alt={`${title} cover`}
          fill
          sizes="(min-width: 768px) 736px, 100vw"
          className="object-cover transition-transform duration-500 group-hover:scale-[1.03]"
        />
      </div>
      <div className="flex flex-col gap-2">
        <div className="flex items-center justify-between text-sm text-body">
          <span className="font-medium">{category}</span>
          <time dateTime={date}>{formatDate(date)}</time>
        </div>
        <h3
          className={cn(
            "font-semibold text-title transition-colors group-hover:text-ink",
            featured ? "text-h2" : "text-h3",
          )}
        >
          {title}
        </h3>
        {featured && <p className="max-w-prose text-body">{excerpt}</p>}
      </div>
    </Link>
  );
}
