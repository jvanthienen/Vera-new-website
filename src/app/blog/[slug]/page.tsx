import { getPostBySlug, getAllPosts } from "@/lib/notion-blog-api-flexible";
import { PostHeader } from "@/components/blog/PostHeader";
import { PostBody } from "@/components/blog/PostBody";
import { notFound } from "next/navigation";
import { Nav } from "@/components/hero/nav";
import { BackgroundBlur } from "@/components/ui/background-blur";
import type { Metadata } from "next";

interface Params {
  slug: string;
}

export async function generateMetadata({ params }: { params: Promise<Params> }): Promise<Metadata> {
  const resolvedParams = await params;
  const post = await getPostBySlug(resolvedParams.slug);
  
  if (!post) {
    return {
      title: 'Post Not Found | Vera',
    };
  }

  return {
    title: `${post.title} | Human Design Blog | Vera`,
    description: post.excerpt || `Learn about ${post.title} in Human Design`,
    metadataBase: new URL('https://vera-new-website.vercel.app'),
          alternates: {
        canonical: `/blog/${resolvedParams.slug}`,
      },
    openGraph: {
      type: 'article',
      title: post.title,
      description: post.excerpt || `Learn about ${post.title} in Human Design`,
      url: `/blog/${resolvedParams.slug}`,
      siteName: 'Vera',
      publishedTime: post.date,
      ...(post.coverImage && {
        images: [
          {
            url: post.coverImage,
            width: 1200,
            height: 630,
            alt: post.title,
          },
        ],
      }),
    },
    twitter: {
      card: 'summary_large_image',
      title: post.title,
      description: post.excerpt || `Learn about ${post.title} in Human Design`,
      ...(post.coverImage && {
        images: [post.coverImage],
      }),
    },
  };
}

export async function generateStaticParams() {
  const allPosts = await getAllPosts();
  return allPosts.map((post) => ({
    slug: post.slug,
  }));
}

export default async function BlogPost({ params }: { params: Promise<Params> }) {
  const resolvedParams = await params;
  const post = await getPostBySlug(resolvedParams.slug);

  if (!post) {
    notFound();
  }

  return (
    <div className="z-1 grid w-full place-items-center p-8">
      <BackgroundBlur className="-top-40 md:-top-0" />
      <Nav />
      
      <div className="mt-16 flex flex-col items-center gap-6 w-full">
        <div className="max-w-4xl mx-auto w-full">
          {/* Outer card container matching main page styling */}
          <div className="bg-card/50 backdrop-blur-sm border rounded-2xl p-6 space-y-6">
            {/* Header in the lighter outer container */}
            <PostHeader
              title={post.title}
              coverImage={post.coverImage}
              date={post.date}
              author={post.author}
              tags={post.tags}
              readingTime={post.readingTime}
            />
            
            {/* Content in separate card */}
            <article>
              <PostBody content={post.content} />
            </article>
          </div>
        </div>
      </div>
    </div>
  );
}
