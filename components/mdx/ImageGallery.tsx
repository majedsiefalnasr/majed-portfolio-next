"use client";

import { useState, type MouseEvent } from "react";
import Image from "next/image";
import {
  Lightbox,
  type LightboxImage,
  type LightboxOrigin,
} from "@/components/ui/Lightbox";

interface ImageGalleryProps {
  images: LightboxImage[];
  /** Columns on md+ screens. */
  columns?: 2 | 3;
}

/**
 * Responsive image grid for MDX work entries and posts. Every tile opens the
 * shared lightbox (zooming out of the clicked tile); prev/next buttons and
 * arrow keys step through this gallery's images.
 */
export function ImageGallery({ images, columns = 2 }: ImageGalleryProps) {
  const [index, setIndex] = useState<number | null>(null);
  const [origin, setOrigin] = useState<LightboxOrigin | null>(null);

  function onOpen(e: MouseEvent<HTMLButtonElement>, i: number) {
    const r = e.currentTarget.getBoundingClientRect();
    setOrigin({ x: r.left + r.width / 2, y: r.top + r.height / 2, w: r.width });
    setIndex(i);
  }

  return (
    <div
      className={`my-8 grid grid-cols-1 gap-4 ${
        columns === 3 ? "md:grid-cols-3" : "md:grid-cols-2"
      }`}
    >
      {images.map((img, i) => (
        <button
          key={img.src}
          type="button"
          onClick={(e) => onOpen(e, i)}
          aria-label={`Enlarge image: ${img.alt}`}
          className="focus-ring group relative aspect-[4/3] cursor-zoom-in overflow-hidden rounded-large bg-surface"
        >
          <Image
            src={img.src}
            alt={img.alt}
            fill
            sizes="(min-width: 768px) 50vw, 100vw"
            className="object-cover transition-transform duration-500 ease-out group-hover:scale-[1.02] motion-reduce:transition-none"
          />
        </button>
      ))}
      <Lightbox
        images={images}
        index={index}
        onClose={() => setIndex(null)}
        onNavigate={setIndex}
        origin={origin}
      />
    </div>
  );
}
