import { FeatureDetails } from "@/components/features/feature-details";
import type { Feature } from "@/components/features/features";
import Image from "next/image";

type FeatureCardProps = {
  feature: Feature;
  isActive: boolean;
};

export function FeatureCard({ feature, isActive }: FeatureCardProps) {
  return (
    <div className="flex w-full flex-col items-center gap-4 px-2 py-4 sm:gap-5 sm:py-6">
      <FeatureDetails feature={feature} isActive={isActive} />
      <div className="bg-card w-full rounded-lg border pt-4 px-4 sm:pt-6 sm:px-6 md:pt-8 md:px-8 overflow-hidden h-[280px] sm:h-[350px] md:h-[485px]">
        <div className="w-full h-full flex items-end justify-center">
          <Image 
            src={feature.image} 
            alt={`${feature.title} screenshot`}
            width={304} 
            height={445}
            className="object-contain object-bottom w-full h-full max-w-[200px] sm:max-w-[250px] md:max-w-[304px]"
            priority={isActive}
            sizes="(max-width: 640px) 200px, (max-width: 768px) 250px, 304px"
          />
        </div>
      </div>
    </div>
  );
}
