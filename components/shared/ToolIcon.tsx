import Image from "next/image";

const TOOL_ICONS: Record<string, string> = {
  figma: "/tools/figma.png",
  framer: "/tools/framer.png",
  notion: "/tools/notion.png",
  illustrator: "/tools/illustrator.png",
  photoshop: "/tools/photoshop.png",
  react: "/tools/react.svg",
};

interface ToolIconProps {
  tool: string;
  size?: number;
}

export function ToolIcon({ tool, size = 36 }: ToolIconProps) {
  const key = tool.toLowerCase();
  const src = TOOL_ICONS[key];

  if (!src) {
    return (
      <span
        className="inline-flex items-center justify-center rounded-[10px] bg-ink/10 text-[10px] font-bold text-title"
        style={{ width: size, height: size }}
        title={tool}
      >
        {tool.slice(0, 2).toUpperCase()}
      </span>
    );
  }

  return (
    <Image
      src={src}
      alt={tool}
      width={size}
      height={size}
      className="rounded-[10px]"
      title={tool}
    />
  );
}
