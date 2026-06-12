import Image from "next/image";
import { Quote } from "lucide-react";
import type { Testimonial } from "@/types";
import { InkQuote } from "@/components/motion/InkQuote";
import { MotionReveal } from "@/components/motion/MotionReveal";
import { cn } from "@/lib/utils";

interface TestimonialBlockProps {
  testimonial: Testimonial;
  /** `pull` = large centered editorial quote (no avatar card). */
  variant?: "card" | "pull";
  className?: string;
}

/** Client testimonial or editorial pull-quote. Static — Server Component. */
export function TestimonialBlock({
  testimonial,
  variant = "card",
  className,
}: TestimonialBlockProps) {
  const { quote, author, role, avatar } = testimonial;

  if (variant === "pull") {
    return (
      <figure className={cn("flex flex-col items-center text-center", className)}>
        {avatar ? (
          // Figma: 120x80 rounded photo above the quote.
          <div className="group flex h-20 w-[120px] cursor-pointer items-center justify-center overflow-hidden rounded-[2.5rem] transition-all duration-500 ease-in-out hover:w-[200px] motion-reduce:transition-none">
            <div className="relative h-20 w-[200px] shrink-0">
              <Image
                src={avatar}
                alt={author}
                fill
                sizes="200px"
                className="object-cover object-[50%_30%] grayscale"
              />
            </div>
          </div>
        ) : (
          <Quote className="size-10 text-subtle" aria-hidden />
        )}
        {/* Words ink in as the reader scrolls through the quote. */}
        <InkQuote
          text={`"${quote}"`}
          className="mt-8 max-w-3xl text-h2 font-bold text-title text-balance"
        />
        <figcaption className="mt-8 text-body">
          <span className="block font-semibold text-title">{author}</span>
          <span className="block text-sm">{role}</span>
        </figcaption>
      </figure>
    );
  }

  // Figma 205:3773: 326x392 portrait + caption below; quote mark beside copy.
  return (
    <figure
      className={cn(
        "flex flex-col gap-8 md:flex-row md:items-start md:gap-28",
        className,
      )}
    >
      {avatar && (
        <MotionReveal className="flex w-full max-w-[326px] shrink-0 flex-col gap-8">
          <div className="relative aspect-[326/392] w-full overflow-hidden rounded-large bg-[#f5b13f]">
            <Image
              src={avatar}
              alt={author}
              fill
              sizes="326px"
              className="object-cover"
            />
          </div>
          <figcaption className="text-lg leading-relaxed text-title">
            <span className="font-semibold">{author}</span>, {role}
          </figcaption>
        </MotionReveal>
      )}
      <MotionReveal delay={0.12} className="flex gap-6 sm:gap-10">
        <Quote
          className="size-9 shrink-0 -scale-x-100 fill-current text-title sm:size-12"
          aria-hidden
        />
        <blockquote className="text-pretty text-h3 font-medium text-title sm:text-[1.75rem] sm:leading-[1.5]">
          {quote}
        </blockquote>
      </MotionReveal>
    </figure>
  );
}
