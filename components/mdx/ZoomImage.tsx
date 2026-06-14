"use client";

import { useState, type MouseEvent } from "react";
import Image from "next/image";
import {
  Lightbox,
  type LightboxOrigin,
} from "@/components/ui/Lightbox";

/**
 * Standalone MDX image (the `img` mapping): same 16:9 well as before, now
 * opening in the artifact lightbox on click — the overlay zooms out of this
 * tile. Galleries handle their own multi-image lightbox; this one is
 * single-image, no prev/next.
 */
export function ZoomImage({ src = "", alt = "" }: { src?: string; alt?: string }) {
  const [origin, setOrigin] = useState<LightboxOrigin | null>(null);
  const [open, setOpen] = useState(false);

  function onOpen(e: MouseEvent<HTMLButtonElement>) {
    const r = e.currentTarget.getBoundingClientRect();
    setOrigin({ x: r.left + r.width / 2, y: r.top + r.height / 2, w: r.width });
    setOpen(true);
  }

  return (
    <>
      <button
        type="button"
        onClick={onOpen}
        aria-label={`Enlarge image: ${alt}`}
        className="focus-ring group relative my-8 block aspect-[16/9] w-full cursor-zoom-in overflow-hidden rounded-large bg-surface"
      >
        <Image
          src={src}
          alt={alt}
          fill
          sizes="(min-width: 768px) 680px, 100vw"
          className="object-cover transition-transform duration-500 ease-out group-hover:scale-[1.015] motion-reduce:transition-none"
        />
      </button>
      <Lightbox
        images={[{ src, alt }]}
        index={open ? 0 : null}
        onClose={() => setOpen(false)}
        onNavigate={() => {}}
        origin={origin}
      />
    </>
  );
}
