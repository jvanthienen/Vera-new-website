import { Nav } from "@/components/hero/nav";
import { BackgroundBlur } from "@/components/ui/background-blur";
import { HumanDesignForm } from "@/components/human-design-form/human-design-form";
import { Pill, PillAvatar, PillAvatarGroup } from "@/components/ui/pill";
import Image from "next/image";

export function Hero() {
  return (
    <div className="z-1 grid w-full place-items-center p-4 pb-2">
      <BackgroundBlur className="-top-40 md:-top-0" />
      <Nav />
      <div className="mt-8 flex flex-col items-center gap-4">
        <Pill>
          <PillAvatarGroup className="hidden sm:flex">
            <PillAvatar src="/avatars/1.jpg" />
            <PillAvatar src="/avatars/2.jpg" />
            <PillAvatar src="/avatars/3.jpg" />
            <PillAvatar src="/avatars/4.jpg" />
          </PillAvatarGroup>
          <p className="text-vera-text px-2 text-xs font-medium sm:border-l-1 sm:text-sm">
            Join <span className="text-vera-text">300M+ people </span> living by Human Design
        
          </p>
        </Pill>
        <div className="text-center">
          <h1 className="font-serif text-3xl leading-[1.1] font-bold tracking-tight sm:text-5xl">
            Transform your life
          </h1>
          <p className="font-serif text-lg font-bold tracking-tight mt-2 sm:text-3xl">
            with Human Design
          </p>
        </div>
        <p className="max-w-lg text-center leading-5 tracking-tight sm:text-lg">
          Discover your unique chart and unlock your full potential. 
        </p>
        <HumanDesignForm />
        <div className="mt-4">
          <Image src="/screenshot-chart-rightsize.png" alt="Human Design Chart" width={280} height={480} />
        </div>
      </div>
    </div>
  );
}  
 