import { MotionReveal } from "@/components/motion/MotionReveal";
import { faqItems } from "@/data/faq";

/**
 * "Still have questions?" — native details/summary accordion. Soft-paper
 * sheets with a plus that turns into a close mark; expansion animates via the
 * scoped `details-content` transition in globals.css (progressive
 * enhancement, instant where unsupported).
 */
export function FaqSection() {
  return (
    <MotionReveal>
      <div className="mx-auto flex max-w-3xl flex-col gap-4">
        {faqItems.map((item) => (
          <details
            key={item.question}
            className="faq-item group rounded-large bg-surface ring-1 ring-ink/5 open:shadow-lg"
          >
            <summary className="focus-ring flex cursor-pointer list-none items-center justify-between gap-4 p-6 text-left font-semibold text-title [&::-webkit-details-marker]:hidden">
              {item.question}
              <svg
                viewBox="0 0 16 16"
                aria-hidden
                className="size-4 shrink-0 transition-transform duration-300 group-open:rotate-45 motion-reduce:transition-none"
              >
                <path
                  d="M8 1.5v13M1.5 8h13"
                  stroke="currentColor"
                  strokeWidth="1.8"
                  strokeLinecap="round"
                />
              </svg>
            </summary>
            <p className="max-w-prose px-6 pb-6 text-pretty leading-relaxed text-body">
              {item.answer}
            </p>
          </details>
        ))}
      </div>
    </MotionReveal>
  );
}
