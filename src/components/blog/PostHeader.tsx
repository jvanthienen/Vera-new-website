import CoverImage from "./CoverImage";
import DateFormatter from "./DateFormatter";
import { type Author } from "@/lib/types/author";
import { Clock, ArrowLeft } from "lucide-react";
import Link from "next/link";

type Props = {
  title: string;
  coverImage: string | null;
  date: string;
  author: Author;
  tags?: string[];
  readingTime?: number;
};

export function PostHeader({ title, coverImage, date, tags, readingTime }: Props) {
  return (
    <div className="mb-8 md:mb-12">
      {/* Back to Blog link */}
      <Link
        href="/blog"
        className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors mb-8"
      >
        <ArrowLeft className="w-4 h-4" />
        Back to Blog
      </Link>

      {/* Header content */}
      <div className="mb-6">
        {/* Tags */}
        {tags && tags.length > 0 && (
          <div className="flex justify-center mb-6">
            <div className="flex flex-wrap gap-3">
              {tags.map(tag => (
                <span key={tag} className="px-4 py-2 text-sm bg-secondary text-secondary-foreground rounded-full">
                  {tag}
                </span>
              ))}
            </div>
          </div>
        )}

        {/* Title */}
        <h1 className="font-serif text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-6 text-center leading-tight max-w-4xl mx-auto">
          {title}
        </h1>

        {/* Meta info */}
        <div className="flex justify-center">
          <div className="flex items-center gap-3 text-sm text-muted-foreground">
            <DateFormatter dateString={date} />
            {readingTime && (
              <>
                <span className="text-muted-foreground/60">•</span>
                <div className="flex items-center gap-1">
                  <Clock className="w-3 h-3" />
                  <span>{readingTime} min read</span>
                </div>
              </>
            )}
          </div>
        </div>
      </div>

      {/* Cover Image */}
      {coverImage && (
        <div className="mb-8">
          <CoverImage title={title} src={coverImage} priority />
        </div>
      )}
    </div>
  );
}
