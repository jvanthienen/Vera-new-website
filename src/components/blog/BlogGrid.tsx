import { Post } from "@/lib/types/post";
import { PostPreview } from "./PostPreview";

type Props = {
  posts: Post[];
  title?: string;
  showTitle?: boolean;
};

export function BlogGrid({ posts, title = "Latest Posts", showTitle = true }: Props) {
  if (posts.length === 0) {
    return (
      <div className="text-center py-16">
        <p className="text-muted-foreground">No posts found.</p>
      </div>
    );
  }

  return (
    <section className="mb-16 md:mb-24">
      {showTitle && (
        <h2 className="font-serif text-2xl md:text-3xl font-bold mb-8 text-foreground leading-relaxed">
          {title}
        </h2>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {posts.map((post, index) => (
          <PostPreview
            key={post.slug}
            title={post.title}
            coverImage={post.coverImage}
            date={post.date}
            slug={post.slug}
            excerpt={post.excerpt}
            tags={post.tags}
            readingTime={post.readingTime}
            priority={index < 6}
          />
        ))}
      </div>
    </section>
  );
}
