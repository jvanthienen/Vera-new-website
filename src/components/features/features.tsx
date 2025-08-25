import { FeaturesCarousel } from "@/components/features/features-carousel";
import { FeaturesTabs } from "@/components/features/features-tabs";
import { Badge } from "@/components/ui/badge";
import Image from "next/image";

export type Feature = {
  icon: React.ReactNode;
  title: string;
  description: string;
  image: string;
};

const features = [
  {
    icon: <Image src="/Bodycharticon.svg" alt="Body Chart" width={48} height={48} className="w-12 h-12" />,
    title: "Full Human Design Chart",
    description: "Discover your energy type, Authority, Strategy and more.",
    image: "/screenshot-chart-half-rightsize.png",
  },
  {
    icon: <Image src="/journal-icon.svg" alt="Journal" width={48} height={48} className="w-12 h-12" />,
    title: "AI powered Journal",
    description: "Get journal prompts, and chat with Vera to guide you.",
    image: "/screenshot-journal-half-rightsize.png",
  },
  {
    icon: <Image src="/Challenges-icon-1.svg" alt="Challenges" width={48} height={48} className="w-12 h-12" />,
    title: "Practice Challenges",
    description: "Get deep challenges to practice and learn your chart.",
    image: "/screenshot-challenges-half-rightsize.png",
  },
  {
    icon: <Image src="/relationships-icon.svg" alt="Relationships" width={48} height={48} className="w-12 h-12" />,
    title: "Enhance your relationships",
    description: "Add your people's charts and get insights on how to improve your relationships.",
    image: "/screenshot-relationships-half-rightsize.png",
  },
] satisfies Feature[];

export function Features() {
  return (
    <div id="features" className="flex w-full flex-col items-center gap-6 px-6 py-14 md:px-10 md:py-25">
      <Badge variant="secondary" className="uppercase">
        Features
      </Badge>
      <h2 className="font-serif text-center text-3xl leading-[1.1] font-bold tracking-tight sm:text-5xl">
        Discover how<div className="text-muted-foreground">Vera helps you</div>
      </h2>
      <p className="mb-3 max-w-lg text-center leading-6 tracking-tight sm:text-xl lg:mb-8">
        We want everyone to transform their life by practicing their Human Design.
      </p>
      <FeaturesCarousel features={features} className="block lg:hidden" />
      <FeaturesTabs features={features} className="hidden lg:block" />
    </div>
  );
}
