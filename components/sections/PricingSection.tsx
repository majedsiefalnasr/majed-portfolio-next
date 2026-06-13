import { Check } from "lucide-react";
import { MotionReveal } from "@/components/motion/MotionReveal";
import { pricingPlans, type PricingPlan } from "@/data/pricing";
import { siteConfig } from "@/lib/site-config";
import { cn } from "@/lib/utils";

function PlanCard({ plan }: { plan: PricingPlan }) {
  const featured = plan.featured ?? false;
  return (
    <article
      className={cn(
        "flex h-full flex-col gap-6 rounded-large p-8",
        featured
          ? "bg-ink text-inverse"
          : "bg-surface text-body ring-1 ring-ink/5",
      )}
    >
      <div className="flex flex-col gap-4">
        <h3
          className={cn(
            "text-h3 font-semibold",
            featured ? "text-paper" : "text-title",
          )}
        >
          {plan.name}
        </h3>
        <p className="flex items-baseline gap-1.5">
          <span
            className={cn(
              "text-4xl font-semibold tracking-tight",
              featured ? "text-paper" : "text-title",
            )}
          >
            {plan.price}
          </span>
          {plan.period && <span className="text-sm">{plan.period}</span>}
        </p>
        <p className="text-pretty leading-relaxed">{plan.description}</p>
      </div>

      <ul className="flex flex-col gap-3">
        {plan.features.map((feature) => (
          <li key={feature} className="flex items-start gap-3">
            <Check
              className={cn(
                "mt-0.5 size-4 shrink-0",
                featured ? "text-paper" : "text-title",
              )}
              aria-hidden
            />
            {feature}
          </li>
        ))}
      </ul>

      <a
        href={
          plan.cta.type === "booking"
            ? siteConfig.links.booking
            : `${siteConfig.links.bookingEmail}?subject=${encodeURIComponent(plan.cta.subject)}`
        }
        className={cn(
          "tap-feedback mt-auto inline-flex h-[54px] items-center justify-center rounded-pill px-8 text-base font-medium focus-visible:outline-2 focus-visible:outline-offset-2",
          featured
            ? "bg-paper text-ink outline-paper hover:bg-paper/90"
            : "bg-ink text-paper outline-ink hover:bg-ink/90",
        )}
      >
        {plan.cta.label}
      </a>
    </article>
  );
}

/**
 * "What does working together cost?" — two engagement shapes side by side:
 * the per-project quote on Soft Paper and the monthly partnership as the ink
 * card (paper-on-ink, per the Monochrome Control Rule). One quiet reassurance
 * line below instead of fine print.
 */
export function PricingSection() {
  return (
    <div className="flex flex-col gap-8">
      <div className="grid gap-6 md:grid-cols-2">
        {pricingPlans.map((plan, i) => (
          <MotionReveal key={plan.name} delay={i * 0.12} className="h-full">
            <PlanCard plan={plan} />
          </MotionReveal>
        ))}
      </div>
      <p className="text-center text-sm text-body">
        Every engagement starts with a free chat, and you&apos;ll have the full
        cost in writing before we begin.
      </p>
    </div>
  );
}
