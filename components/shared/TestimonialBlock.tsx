import Image from "next/image";
import { Quote } from "lucide-react";
import type { Testimonial } from "@/types";
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
        <Quote className="size-10 text-subtle" aria-hidden />
        <blockquote className="mt-6 max-w-3xl text-h2 font-medium text-title text-balance">
          {quote}
        </blockquote>
        <figcaption className="mt-6 text-body">
          <span className="font-semibold text-title">{author}</span>
          <span className="block text-sm">{role}</span>
        </figcaption>
      </figure>
    );
  }

  return (
    <figure
      className={cn(
        "flex flex-col gap-8 md:flex-row md:items-center md:gap-12",
        className,
      )}
    >
      {avatar && (
        <div className="relative aspect-square w-full max-w-[326px] shrink-0 overflow-hidden rounded-large bg-surface">
          <Image
            src={avatar}
            alt={author}
            fill
            sizes="326px"
            className="object-cover"
          />
        </div>
      )}
      <div className="flex flex-col gap-6">
        <Quote className="size-8 text-subtle" aria-hidden />
        <blockquote className="text-h3 font-medium text-title text-pretty">
          {quote}
        </blockquote>
        <figcaption className="text-body">
          <span className="font-semibold text-title">{author}</span>, {role}
        </figcaption>
      </div>
    </figure>
  );
}
