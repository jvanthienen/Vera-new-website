import { Nav } from "@/components/hero/nav";
import { BackgroundBlur } from "@/components/ui/background-blur";
import { Badge } from "@/components/ui/badge";

export default function Loading() {
  return (
    <div className="z-1 grid w-full place-items-center p-8">
      <BackgroundBlur className="-top-40 md:-top-0" />
      <Nav />
      
      <div className="mt-16 flex flex-col items-center gap-6 w-full">
        <div className="flex flex-col items-center gap-6 px-6 py-14 md:px-10 md:py-25 w-full max-w-6xl">
          <Badge variant="secondary" className="uppercase">
            Blog
          </Badge>
          
          {/* Hero Section Skeleton */}
          <div className="text-center mb-12 md:mb-16 w-full">
            <div className="h-12 bg-gray-200/50 rounded animate-pulse mb-4 w-1/2 mx-auto"></div>
            <div className="h-6 bg-gray-200/50 rounded animate-pulse mb-8 w-3/4 mx-auto"></div>
            
            {/* Tags skeleton */}
            <div className="flex flex-wrap justify-center gap-2 mb-8">
              {[...Array(5)].map((_, i) => (
                <div key={i} className="h-6 bg-gray-200/50 rounded animate-pulse w-16"></div>
              ))}
            </div>
          </div>

          {/* Blog Grid Skeleton */}
          <div className="grid gap-8 md:gap-12 md:grid-cols-2 lg:grid-cols-3 w-full">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="space-y-4">
                <div className="h-48 bg-gray-200/50 rounded animate-pulse"></div>
                <div className="h-6 bg-gray-200/50 rounded animate-pulse w-3/4"></div>
                <div className="h-4 bg-gray-200/50 rounded animate-pulse"></div>
                <div className="h-4 bg-gray-200/50 rounded animate-pulse w-2/3"></div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
