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
  const { slug, title, category, date, cover } = post;
  const featured = variant === "featured";

  return (
    <Link
      href={`/blog/${slug}`}
      className={cn("group flex flex-col gap-6", className)}
    >
      <div
        className="relative w-full overflow-hidden rounded-card bg-surface"
        style={{ height: featured ? "460px" : "286px" }}
      >
        <Image
          src={cover}
          alt={`${title} cover`}
          fill
          sizes="(min-width: 768px) 736px, 100vw"
          className="object-cover transition-transform duration-500 group-hover:scale-[1.03]"
        />
      </div>
      <div className="flex flex-col gap-3">
        <div className="flex items-center justify-between gap-4">
          <span className="text-lg font-semibold text-title">{category}</span>
          <time dateTime={date} className="text-sm text-body">
            {formatDate(date)}
          </time>
        </div>
        <h3
          className={cn(
            "font-semibold text-title transition-colors group-hover:text-ink",
            featured ? "text-[2rem] leading-snug" : "text-h3",
          )}
        >
          {title}
        </h3>
      </div>
    </Link>
  );
}
