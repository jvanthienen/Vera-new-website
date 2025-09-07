import { Wreath } from "@/components/showcase/wreath";
import { Star, HalfStar } from "@/components/showcase/star";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export function Showcase() {
  return (
    <div className="relative mx-auto mt-8 mb-4 md:mt-12 md:mb-8">
      {/* Social Proof Grid */}
      <div className="grid w-fit grid-cols-3 gap-6 md:gap-16 mx-auto">
        <Wreath>
          <p className="mb-0.5 text-[0.625rem] md:text-base">Rating</p>
          <div className="flex items-center text-amber-400 [&>svg]:size-2.5 md:[&>svg]:size-5">
            <Star />
            <Star />
            <Star />
            <Star />
            <HalfStar />
          </div>
          <p className="text-xl font-bold md:mt-1.5 md:text-3xl">4.9</p>
        </Wreath>
        <Wreath>
          <p className="text-[0.625rem] md:text-base">Helping over</p>
          <p className="mt-1.5 text-center text-xs font-bold md:text-2xl">100,000+ people</p>
        </Wreath>
        <Wreath>
          <p className="text-[0.625rem] md:text-base">Trained by</p>
          <p className="mt-1.5 text-center text-xs font-bold text-balance md:text-2xl">
            HD 
            <br />
            experts
          </p>
        </Wreath>
      </div>
      
      {/* Download App Button */}
      <div className="flex justify-center mt-8 md:mt-12">
        <Button 
          asChild
          size="lg"
          className="h-12 px-8 text-base font-medium bg-primary hover:bg-primary/90 text-primary-foreground rounded-xl shadow-lg"
        >
          <Link 
            href="https://apps.apple.com/us/app/vera-your-human-design-guide/id6748094016" 
            target="_blank" 
            rel="noopener noreferrer"
          >
            Download the app
          </Link>
        </Button>
      </div>
    </div>
  );
}
