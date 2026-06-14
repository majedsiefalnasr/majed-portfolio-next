import type { CSSProperties } from "react";
import { FileDown } from "lucide-react";
import { features } from "@/lib/features";
import { siteConfig } from "@/lib/site-config";
import { cn } from "@/lib/utils";

/**
 * CV / Resume download links. Paths come from siteConfig.links and point at
 * placeholder PDFs in public/ — replace those files with the real documents,
 * then flip features.cvDownloads on. Renders nothing while the flag is off,
 * so the hero/reach-out/footer placements need no changes.
 */
const documents = [
  { href: siteConfig.links.cv, label: "Download CV" },
  { href: siteConfig.links.resume, label: "Download Resume" },
];

export function CvLinks({
  className,
  style,
}: {
  className?: string;
  style?: CSSProperties;
}) {
  if (!features.cvDownloads) return null;
  return (
    <div
      className={cn(
        "flex flex-wrap items-center justify-center gap-x-6 gap-y-2",
        className,
      )}
      style={style}
    >
      {documents.map((doc) => (
        <a
          key={doc.href}
          href={doc.href}
          download
          className="focus-ring inline-flex items-center gap-1.5 text-sm font-medium text-body underline decoration-ink/30 underline-offset-4 transition-colors hover:text-title hover:decoration-ink"
        >
          <FileDown className="size-4" aria-hidden />
          {doc.label}
        </a>
      ))}
    </div>
  );
}
