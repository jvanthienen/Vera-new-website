import Link from "next/link";
import CoverImage from "./CoverImage";
import DateFormatter from "./DateFormatter";
import { Clock } from "lucide-react";

type Props = {
  title: string;
  coverImage: string | null;
  date: string;
  excerpt: string;
  slug: string;
  tags?: string[];
  readingTime?: number;
  priority?: boolean;
};

export function PostPreview({ title, coverImage, date, excerpt, slug, tags, readingTime, priority = false }: Props) {
  return (
    <div className="bg-card border hover:shadow-md transition-all duration-200 overflow-hidden flex flex-col h-full rounded-xl">
      <div className="aspect-video">
        <CoverImage slug={slug} title={title} src={coverImage} priority={priority} />
      </div>

      <div className="p-6 flex flex-col flex-1">
        {tags && tags.length > 0 && (
          <div className="flex flex-wrap gap-2 mb-3">
            {tags.slice(0, 2).map(tag => (
              <span
                key={tag}
                className="px-3 py-1 text-xs bg-secondary text-secondary-foreground rounded-full"
              >
                {tag}
              </span>
            ))}
          </div>
        )}

        <h3 className="font-serif text-lg font-medium mb-2 leading-tight">
          <Link 
            href={`/blog/${slug}`} 
            className="text-foreground hover:text-primary transition-colors"
            prefetch={true}
          >
            {title}
          </Link>
        </h3>

        <p className="text-muted-foreground text-sm mb-4 line-clamp-2">{excerpt}</p>

        <div className="mt-auto flex items-center justify-between gap-4 pt-4 border-t">
          <DateFormatter dateString={date} />
          {readingTime && (
            <div className="flex items-center gap-1 text-sm text-muted-foreground">
              <Clock className="w-3 h-3" />
              <span>{readingTime} min</span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
