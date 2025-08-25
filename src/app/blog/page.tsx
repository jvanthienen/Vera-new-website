import { getAllPosts, getAllTags } from "@/lib/notion-blog-api-flexible";
import { BlogGrid } from "@/components/blog/BlogGrid";
import { Nav } from "@/components/hero/nav";
import { BackgroundBlur } from "@/components/ui/background-blur";
import { Badge } from "@/components/ui/badge";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Learn Human Design - Free Guides & Insights | Vera",
  description: "Learn Human Design with our comprehensive guides, insights, and practical tips. Discover your Energy Type, Strategy, Authority, and more.",
  metadataBase: new URL('https://vera-new-website.vercel.app'),
  alternates: {
    canonical: 'https://vera-new-website.vercel.app/blog',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  openGraph: {
    type: 'website',
    title: "Learn Human Design - Free Guides & Insights | Vera",
    description: "Learn Human Design with our comprehensive guides, insights, and practical tips. Discover your Energy Type, Strategy, Authority, and more.",
    url: 'https://vera-new-website.vercel.app/blog',
    siteName: 'Vera',
  },
  twitter: {
    card: 'summary_large_image',
    title: "Learn Human Design - Free Guides & Insights | Vera",
    description: "Learn Human Design with our comprehensive guides, insights, and practical tips. Discover your Energy Type, Strategy, Authority, and more.",
  },
};

// Revalidate every hour for fresh content but fast loading
export const revalidate = 3600; // 1 hour in seconds

export default async function BlogIndex() {
  const allPosts = await getAllPosts();
  const allTags = await getAllTags();

  return (
    <div className="z-1 grid w-full place-items-center p-8">
      <BackgroundBlur className="-top-40 md:-top-0" />
      <Nav />
      
      <div className="mt-16 flex flex-col items-center gap-6 w-full">
        <div className="flex flex-col items-center gap-6 px-6 py-14 md:px-10 md:py-25 w-full max-w-6xl">
          <Badge variant="secondary" className="uppercase">
            Blog
          </Badge>
          <h1 className="font-serif text-center text-3xl leading-[1.1] font-bold tracking-tight sm:text-5xl">
            Learn Human Design<div className="text-muted-foreground">Insights & Guides</div>
          </h1>
          <p className="mb-3 max-w-lg text-center leading-6 tracking-tight sm:text-xl lg:mb-8">
            Discover your unique blueprint with our comprehensive guides, insights, and practical tips for living your Human Design.
          </p>

          {/* Tags */}
          {allTags.length > 0 && (
            <div className="flex flex-wrap justify-center gap-3 mb-8">
              {allTags.map(tag => (
                <span
                  key={tag}
                  className="px-4 py-2 text-sm bg-secondary hover:bg-secondary/80 text-secondary-foreground transition-colors cursor-pointer rounded-full"
                >
                  {tag}
                </span>
              ))}
            </div>
          )}

          {/* Blog Posts */}
          <BlogGrid posts={allPosts} showTitle={false} />
        </div>
      </div>
    </div>
  );
}
