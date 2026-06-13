import { MotionReveal } from "@/components/motion/MotionReveal";
import { reachOutSteps } from "@/data/reach-out";
import { cn } from "@/lib/utils";

/** Alternating paper tilts; cards straighten when reached for. */
const tilts = ["md:-rotate-2", "md:rotate-[1.5deg]", "md:-rotate-1"];

/** Hand-drawn arrow hopping from one step card to the next. */
function DoodleArrow1({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 96 56"
      fill="none"
      aria-hidden
      className={cn("w-24 text-ink/60", className)}
    >
      <path
        d="M6 46 C 18 14, 58 4, 86 26"
        stroke="currentColor"
        strokeWidth="3"
        strokeLinecap="round"
      />
      <path
        d="M75 14 L 86 26 L 70 29"
        stroke="currentColor"
        strokeWidth="3"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function DoodleArrow2({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 96 56"
      fill="none"
      aria-hidden
      className={cn("w-24 text-ink/60", className)}
    >
      <path
        d="M 0 0 C 0 0 6.699 39.354 72 16 M 62 26.904 L 73.5 15.404 L 59.5 12.404"
        stroke="currentColor"
        strokeWidth="2.4"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}


/**
 * "What happens if I reach out?" — the engagement journey as three tilted
 * paper sheets with doodle arrows hopping between them. A real ordered
 * sequence, so the cards carry step numerals; flat at rest, they straighten
 * and lift on hover. Mobile stacks them vertically without connectors.
 */
export function ReachOutSteps() {
  return (
    <div className="relative">
      <DoodleArrow1 className="absolute -top-14 left-[28.5%] hidden rotate-6 md:block" />
      <DoodleArrow2 className="absolute -bottom-[3.75rem] left-[62%] hidden -rotate-8 md:block" />

      <ol className="grid gap-5 md:grid-cols-3 md:gap-8">
        {reachOutSteps.map((step, i) => (
          <li key={step.title}>
            <MotionReveal delay={i * 0.12} className="h-full">
              <article
                className={cn(
                  "paper-reach flex h-full flex-col rounded-large bg-surface p-7 ring-1 ring-ink/5 hover:shadow-lg md:min-h-[300px]",
                  tilts[i],
                )}
              >
                <span className="font-mono text-sm font-medium text-body">
                  0{i + 1}
                </span>
                <h3 className="mt-6 text-h3 font-semibold text-title md:mt-auto">
                  {step.title}
                </h3>
                <p className="mt-2 text-pretty leading-relaxed text-body">
                  {step.description}
                </p>
              </article>
            </MotionReveal>
          </li>
        ))}
      </ol>
    </div>
  );
}
