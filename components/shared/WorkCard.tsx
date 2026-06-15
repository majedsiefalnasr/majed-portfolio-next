import Image from "next/image";
import Link from "next/link";
import type { Work } from "@/types";
import { DemoTag } from "@/components/shared/DemoTag";
import { cn } from "@/lib/utils";

interface WorkCardProps {
  work: Work;
  /** `featured` = large hero card; `grid` = compact listing card. */
  variant?: "featured" | "grid";
  /** Optional eyebrow label, e.g. "Next project →". Covers the old NextWorkTeaser. */
  label?: string;
  className?: string;
}

/**
 * Single source for project cards across Home, Work, Who Am I.
 * Hover handled purely in CSS so this stays a Server Component.
 */
export function WorkCard({
  work,
  variant = "grid",
  label,
  className,
}: WorkCardProps) {
  const { slug, title, description, tags, metrics } = work;
  const cover = work.covers?.desktop ?? work.cover ?? "";
  const featured = variant === "featured";

  return (
    <Link
      href={`/work/${slug}`}
      className={cn(
        "paper-reach group block overflow-hidden rounded-card bg-surface ring-1 ring-ink/5 hover:shadow-xl",
        className,
      )}
    >
      <article className={cn("flex flex-col", featured ? "gap-8 p-8 md:p-12" : "gap-5 p-6")}>
        <div className="flex flex-col gap-4">
          {label && (
            <span className="text-sm font-medium text-body">{label}</span>
          )}
          {(tags.length > 0 || work.demo) && (
            <ul className="flex flex-wrap gap-2">
              {work.demo && (
                <DemoTag as="li" className="px-3 py-1 text-xs" />
              )}
              {tags.map((tag) => (
                <li
                  key={tag}
                  className="rounded-pill bg-ink/10 px-3 py-1 text-xs font-medium text-title"
                >
                  {tag}
                </li>
              ))}
            </ul>
          )}
          <h3
            className={cn(
              "font-semibold text-title",
              featured ? "text-h2" : "text-h3",
            )}
          >
            {title}
          </h3>
          <p className="max-w-prose text-body">{description}</p>

          {featured && metrics.length > 0 && (
            <dl className="mt-2 flex flex-wrap gap-x-12 gap-y-4">
              {metrics.map((m) => (
                <div key={m.label} className="flex flex-col">
                  <dt className="order-2 text-sm text-body">{m.label}</dt>
                  <dd className="order-1 text-lg font-semibold text-title">
                    {m.value}
                  </dd>
                </div>
              ))}
            </dl>
          )}
        </div>

        <div className="relative aspect-[16/9] w-full overflow-hidden rounded-card bg-background">
          <Image
            src={cover}
            alt={`${title} cover`}
            fill
            sizes={featured ? "(min-width: 768px) 800px, 100vw" : "(min-width: 768px) 400px, 100vw"}
            className="object-cover transition-transform duration-500 group-hover:scale-[1.03]"
          />
        </div>
      </article>
    </Link>
  );
}
