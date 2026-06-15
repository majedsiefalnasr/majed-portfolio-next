import Link from "next/link";
import type { Work } from "@/types";
import { cn } from "@/lib/utils";
import { DeviceCovers } from "@/components/shared/DeviceCovers";
import { WorkInfoRow } from "@/components/shared/WorkInfoRow";
import { DemoTag } from "@/components/shared/DemoTag";

type MetricsPlacement = "info" | "inside" | "below";

interface WorkShowcaseProps {
  work: Work;
  /** Small eyebrow above the title, e.g. "Next project". */
  label?: string;
  /**
   * Stat row placement, per Figma variant:
   * - "info": location/role/tools row inside the panel (listing featured card)
   * - "inside": frontmatter metrics above the screenshot (home projects stack)
   * - "below": frontmatter metrics under the panel (home "Is he skilled enough?")
   */
  metrics?: MetricsPlacement;
  /** Mark the screenshot as the LCP candidate (above-the-fold instance). */
  priority?: boolean;
  className?: string;
}

/**
 * Featured project presentation from the Figma: a soft panel with dashed
 * topic tags, the centered project wordmark, a stat row, and the product
 * screenshot framed in browser chrome over a green glow that bleeds to the
 * panel's bottom edge. Server Component; hover handled in CSS.
 */
export function WorkShowcase({
  work,
  label,
  metrics = "info",
  priority,
  className,
}: WorkShowcaseProps) {
  const { slug, title, tags } = work;
  const accent = work.accent ?? "#aee5a0";
  const covers = work.covers ?? (work.cover ? { desktop: work.cover } : {});
  const mobileOnly = !!covers.mobile && !covers.desktop && !covers.tablet;

  const metricRow = work.metrics.length > 0 && (
    <dl className="flex flex-wrap justify-center gap-x-14 gap-y-5 text-left">
      {work.metrics.map((metric) => (
        <div key={metric.label} className="flex flex-col gap-1">
          <dt className="order-2 text-sm text-body">{metric.label}</dt>
          <dd className="order-1 text-[1.375rem] font-semibold leading-tight text-title">
            {metric.value}
          </dd>
        </div>
      ))}
    </dl>
  );

  return (
    <Link
      href={`/work/${slug}`}
      className={cn("group block", className)}
    >
      <article>
        <div
          className="relative overflow-hidden rounded-card bg-surface ring-1 ring-ink/5 transition-shadow duration-300 group-hover:shadow-xl"
        >
          {mobileOnly ? (
            /* ── Mobile-only: text left, phone right. min-h matches desktop card height
               which is driven by aspect-15/8 browser mock at w-3/4 of the card. ── */
            <div className="flex items-stretch">
              <div className="flex flex-1 flex-col justify-center gap-7 px-5 py-8 text-center sm:px-10 sm:py-12 sm:text-left">
                {label && (
                  <span className="text-sm font-medium text-body">{label}</span>
                )}

                {(tags.length > 0 || work.demo) && (
                  <ul className="flex flex-wrap justify-center gap-2 sm:justify-start">
                    {work.demo && <DemoTag as="li" />}
                    {tags.map((tag) => (
                      <li
                        key={tag}
                        className="rounded-pill border border-dashed border-ink/25 px-4 py-1.5 text-[13px] font-medium text-body"
                      >
                        {tag}
                      </li>
                    ))}
                  </ul>
                )}

                <h3 className="text-h2 font-bold uppercase tracking-tight text-title">
                  {title}
                </h3>

                {metrics === "inside" && metricRow}
                {metrics === "info" && <WorkInfoRow work={work} />}
              </div>

              {/* Phone mock — right column, natural height drives card height */}
              <div className="relative flex w-[42%] shrink-0 items-end justify-center py-8">
                <div
                  aria-hidden
                  className="absolute inset-0"
                  style={{
                    background: `radial-gradient(100% 120% at 60% 100%, color-mix(in oklab, ${accent} 72%, white) 0%, color-mix(in oklab, ${accent} 30%, var(--color-surface)) 52%, transparent 82%)`,
                  }}
                />
                <DeviceCovers
                  covers={covers}
                  title={title}
                  slug={slug}
                  priority={priority}
                  className="relative w-[55%]"
                />
              </div>
            </div>
          ) : (
            /* ── Default: text top, device bottom (desktop / tablet / multi) ── */
            <>
              <div className="flex flex-col items-center gap-7 px-5 pt-8 text-center sm:px-10 sm:pt-12">
                {label && (
                  <span className="text-sm font-medium text-body">{label}</span>
                )}

                {(tags.length > 0 || work.demo) && (
                  <ul className="flex flex-wrap justify-center gap-2">
                    {work.demo && <DemoTag as="li" />}
                    {tags.map((tag) => (
                      <li
                        key={tag}
                        className="rounded-pill border border-dashed border-ink/25 px-4 py-1.5 text-[13px] font-medium text-body"
                      >
                        {tag}
                      </li>
                    ))}
                  </ul>
                )}

                <h3 className="text-h2 font-bold uppercase tracking-tight text-title">
                  {title}
                </h3>

                {metrics === "inside" && metricRow}
                {metrics === "info" && <WorkInfoRow work={work} />}
              </div>

              <div className="relative mt-7 w-full">
                <div
                  aria-hidden
                  className="absolute inset-x-0 -top-28 bottom-0"
                  style={{
                    background: `radial-gradient(90% 115% at 50% 100%, color-mix(in oklab, ${accent} 72%, white) 0%, color-mix(in oklab, ${accent} 30%, var(--color-surface)) 52%, transparent 82%)`,
                  }}
                />
                <DeviceCovers
                  covers={covers}
                  title={title}
                  slug={slug}
                  priority={priority}
                  className="relative mx-auto w-[88%] sm:w-3/4"
                />
              </div>
            </>
          )}
        </div>

        {metrics === "below" && (
          <div className="mt-8 flex justify-center sm:mt-10">{metricRow}</div>
        )}
      </article>
    </Link>
  );
}
