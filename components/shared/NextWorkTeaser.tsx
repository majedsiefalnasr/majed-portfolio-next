import Link from "next/link";
import type { Work } from "@/types";
import { BrowserMock } from "@/components/shared/BrowserMock";
import { DemoTag } from "@/components/shared/DemoTag";

interface NextWorkTeaserProps {
  work: Work;
  /** Browser-frame screenshot (defaults to the Zidney hero export). */
  screenshot?: string;
}

/**
 * The work detail footer teaser from the Figma: "Next project" over the
 * project name on bare sand, with the browser mock clipped at the section's
 * bottom edge. On hover the mock rises toward the title. Server Component.
 */
export function NextWorkTeaser({ work, screenshot }: NextWorkTeaserProps) {
  const { slug, title } = work;
  const shot = screenshot ?? work.screenshot ?? work.cover;

  return (
    <Link
      href={`/work/${slug}`}
      className="group block text-center focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-ink"
    >
      <span className="text-sm font-medium text-body">Next project</span>
      <h2 className="mt-2 text-h2 font-bold text-title">{title}</h2>
      {work.demo && (
        <div className="mt-3 flex justify-center">
          <DemoTag />
        </div>
      )}
      <div className="h-[300px] sm:h-[360px] pt-16 -mt-8 overflow-hidden ">
        <div className="relative mx-auto w-[92%] max-w-3xl transition-transform duration-500 ease-out group-hover:-translate-y-5">
          <div
            aria-hidden
            className="absolute -inset-x-10 -top-8 bottom-0 -z-10"
            style={{
              background:
                "radial-gradient(70% 80% at 50% 40%, #dff2d4 0%, rgba(242,238,228,0) 75%)",
            }}
          />
          <BrowserMock
            screenshot={shot}
            alt={`${title} — product screenshot`}
            url={`${slug}.com`}
          />
        </div>
      </div>
    </Link>
  );
}
