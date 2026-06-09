import { icons, type LucideProps } from "lucide-react";

interface IconProps extends LucideProps {
  /** A lucide icon name in PascalCase, e.g. "Compass" (from data files). */
  name: string;
}

/**
 * Resolves a lucide icon by name from data-driven content.
 * Renders nothing if the name is unknown, so a typo can't crash a page.
 */
export function Icon({ name, ...props }: IconProps) {
  const LucideIcon = icons[name as keyof typeof icons];
  if (!LucideIcon) return null;
  return <LucideIcon {...props} />;
}
