import { MotionStep } from "@/components/sections/MotionStep";
import { processSteps } from "@/data/process";

/**
 * 4-step delivery flow. Server Component; each step's reveal is wrapped in the
 * client MotionStep. Pure-CSS responsive: vertical timeline on mobile,
 * horizontal on md+ (brainstorm SCAMPER "Adapt" — no JS breakpoints).
 */
export function ProcessSteps() {
  return (
    <ol className="flex flex-col gap-8 md:flex-row md:gap-6">
      {processSteps.map((step, i) => (
        <MotionStep
          key={step.title}
          index={i}
          className="relative flex-1 border-l-2 border-ink/10 pl-6 md:border-l-0 md:border-t-2 md:pl-0 md:pt-6"
        >
          <span className="absolute -left-[9px] top-0 flex size-4 items-center justify-center rounded-full bg-ink md:-top-[9px] md:left-0" aria-hidden />
          <span className="text-sm font-medium text-body">
            {String(i + 1).padStart(2, "0")}
          </span>
          <h3 className="mt-1 text-h3 font-semibold text-title">{step.title}</h3>
          <p className="mt-2 text-body">{step.description}</p>
        </MotionStep>
      ))}
    </ol>
  );
}
