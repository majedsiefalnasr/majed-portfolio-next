import Link from "next/link";
import type { CaseStudy } from "@/types";
import { cn } from "@/lib/utils";
import { BrowserMock } from "@/components/shared/BrowserMock";
import { CaseInfoRow } from "@/components/shared/CaseInfoRow";
import { DemoTag } from "@/components/shared/DemoTag";

type MetricsPlacement = "info" | "inside" | "below";

interface CaseStudyShowcaseProps {
  caseStudy: CaseStudy;
  /** Browser-frame screenshot (defaults to the case cover). */
  screenshot?: string;
  /** Small eyebrow above the title, e.g. "Next case". */
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
 * Featured case presentation from the Figma: a soft panel with dashed topic
 * tags, the centered project wordmark, a stat row, and the product screenshot
 * framed in browser chrome over a green glow that bleeds to the panel's
 * bottom edge. Server Component; hover handled in CSS.
 */
export function CaseStudyShowcase({
  caseStudy,
  screenshot,
  label,
  metrics = "info",
  priority,
  className,
}: CaseStudyShowcaseProps) {
  const { slug, title, tags } = caseStudy;
  const accent = caseStudy.accent ?? "#aee5a0";
  const shot = screenshot ?? caseStudy.screenshot ?? caseStudy.cover;

  const metricRow = caseStudy.metrics.length > 0 && (
    <dl className="flex flex-wrap justify-center gap-x-14 gap-y-5 text-left">
      {caseStudy.metrics.map((metric) => (
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
      href={`/case-studies/${slug}`}
      className={cn("group block", className)}
    >
      <article>
        <div
          className="relative overflow-hidden rounded-card bg-surface ring-1 ring-ink/5 transition-shadow duration-300 group-hover:shadow-xl"
        >
          <div className="flex flex-col items-center gap-7 px-5 pt-8 text-center sm:px-10 sm:pt-12">
            {label && (
              <span className="text-sm font-medium text-body">{label}</span>
            )}

            {(tags.length > 0 || caseStudy.demo) && (
              <ul className="flex flex-wrap justify-center gap-2">
                {caseStudy.demo && <DemoTag as="li" />}
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

            {/* Info row: location/year · role/services · tools */}
            {metrics === "info" && <CaseInfoRow caseStudy={caseStudy} />}
          </div>

          {/* Screenshot in browser chrome over a green glow bleeding off the
              panel's bottom edge, as in the Figma. */}
          <div className="relative mt-7 w-full">
            <div
              aria-hidden
              className="absolute inset-x-0 -top-28 bottom-0"
              style={{
                background: `radial-gradient(90% 115% at 50% 100%, color-mix(in oklab, ${accent} 72%, white) 0%, color-mix(in oklab, ${accent} 30%, var(--color-surface)) 52%, transparent 82%)`,
              }}
            />
            <BrowserMock
              screenshot={shot}
              alt={`${title} — product screenshot`}
              url={`${slug}.com`}
              priority={priority}
              className="relative mx-auto w-[88%] sm:w-3/4"
            />
          </div>
        </div>

        {metrics === "below" && (
          <div className="mt-8 flex justify-center sm:mt-10">{metricRow}</div>
        )}
      </article>
    </Link>
  );
}
