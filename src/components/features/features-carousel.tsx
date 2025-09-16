"use client";

import type { Feature } from "@/components/features/features";
import { FeatureCard } from "@/components/features/feature-card";
import { Carousel, CarouselApi, CarouselContent, CarouselItem } from "@/components/ui/carousel";
import { cn } from "@/lib/utils";
import { useEffect, useState } from "react";

type Props = {
  features: Feature[];
  className?: string;
};

export function FeaturesCarousel({ features, className }: Props) {
  const [carouselApi, setCarouselApi] = useState<CarouselApi>();
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    if (!carouselApi) {
      return;
    }

    setCurrent(carouselApi.selectedScrollSnap() + 1);

    carouselApi.on("select", () => {
      setCurrent(carouselApi.selectedScrollSnap() + 1);
    });
  }, [carouselApi]);

  return (
    <div className={cn("w-full", className)}>
      <Carousel 
        setApi={setCarouselApi}
        opts={{
          align: "center",
          loop: false,
          skipSnaps: false,
          dragFree: false,
          containScroll: "trimSnaps",
          slidesToScroll: 1,
        }}
      >
        <CarouselContent className="-ml-2 md:-ml-4">
          {features.map((feature, index) => (
            <CarouselItem
              key={feature.title}
              className="pl-2 md:pl-4 basis-[85%] sm:basis-[75%] md:basis-[60%]"
              onClick={() => {
                carouselApi?.scrollTo(index);
                setCurrent(index + 1);
              }}
            >
              <FeatureCard feature={feature} isActive={current === index + 1} />
            </CarouselItem>
          ))}
        </CarouselContent>
      </Carousel>
      
      {/* Carousel indicators */}
      <div className="flex justify-center gap-2 mt-6">
        {features.map((_, index) => (
          <button
            key={index}
            className={cn(
              "w-2 h-2 rounded-full transition-colors duration-200",
              current === index + 1 
                ? "bg-primary" 
                : "bg-muted-foreground/30"
            )}
            onClick={() => {
              carouselApi?.scrollTo(index);
              setCurrent(index + 1);
            }}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </div>
  );
}
