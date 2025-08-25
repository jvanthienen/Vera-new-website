import Link from "next/link";
import Image from "next/image";
import { cn } from "@/lib/utils";

type Props = {
  title: string;
  src: string | null;
  slug?: string;
  priority?: boolean;
  className?: string;
};

// Simple base64 blur placeholder - a small gray image
const shimmerBlurDataUrl = "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAABAAEDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAf/xAAUEAEAAAAAAAAAAAAAAAAAAAAA/8QAFQEBAQAAAAAAAAAAAAAAAAAAAAX/xAAUEQEAAAAAAAAAAAAAAAAAAAAA/9oADAMBAAIRAxEAPwCdABmX/9k=";

const CoverImage = ({ title, src, slug, priority = false, className = "" }: Props) => {
  // Check if we have a valid image src
  const hasValidSrc = src && src.trim() !== "";

  const image = hasValidSrc ? (
    <Image
      src={src}
      alt={`Cover Image for ${title}`}
      className={cn(
        "w-full object-cover",
        slug && "hover:opacity-90 transition-opacity duration-200",
        className
      )}
      width={1200}
      height={630}
      priority={priority}
      loading={priority ? "eager" : "lazy"}
      sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
      quality={85}
      placeholder="blur"
      blurDataURL={shimmerBlurDataUrl}
    />
  ) : (
    <div
      className={cn(
        "w-full h-[315px] flex items-center justify-center bg-muted",
        slug && "hover:bg-muted/80 transition-colors duration-200",
        className
      )}
    >
      <div className="text-muted-foreground text-center">
        <div className="text-4xl mb-2">📄</div>
      </div>
    </div>
  );

  return (
    <div className="relative overflow-hidden rounded-xl">
      {slug ? (
        <Link href={`/blog/${slug}`} aria-label={title}>
          {image}
        </Link>
      ) : (
        image
      )}
    </div>
  );
};

export default CoverImage;
