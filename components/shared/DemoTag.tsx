import { cn } from "@/lib/utils";

/**
 * Quiet "Demo" pill marking fictional work entries on every card surface
 * (stack, showcase, listing row, grid card, next-project teaser), so demo
 * content is labeled before click-through. Callers gate on `work.demo`.
 * White fill + hairline ring keeps it distinct from both tag styles in use
 * (dashed topic chips and tonal ink chips).
 */
export function DemoTag({
  as: Tag = "span",
  className,
}: {
  as?: "span" | "li";
  className?: string;
}) {
  return (
    <Tag
      title="Demonstration project — illustrative data"
      className={cn(
        "inline-flex items-center rounded-pill bg-paper px-4 py-1.5 text-[13px] font-medium text-body ring-1 ring-ink/10",
        className,
      )}
    >
      Demo
    </Tag>
  );
}
