import Image from "next/image";

interface GalleryImage {
  src: string;
  alt: string;
}

interface ImageGalleryProps {
  images: GalleryImage[];
  /** Columns on md+ screens. */
  columns?: 2 | 3;
}

/** Responsive image grid for use inside MDX case studies and posts. */
export function ImageGallery({ images, columns = 2 }: ImageGalleryProps) {
  return (
    <div
      className={`my-8 grid grid-cols-1 gap-4 ${
        columns === 3 ? "md:grid-cols-3" : "md:grid-cols-2"
      }`}
    >
      {images.map((img) => (
        <div
          key={img.src}
          className="relative aspect-[4/3] overflow-hidden rounded-large bg-surface"
        >
          <Image
            src={img.src}
            alt={img.alt}
            fill
            sizes="(min-width: 768px) 50vw, 100vw"
            className="object-cover"
          />
        </div>
      ))}
    </div>
  );
}
