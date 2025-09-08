import { Nav } from "@/components/hero/nav";
import { BackgroundBlur } from "@/components/ui/background-blur";
import { HumanDesignForm } from "@/components/human-design-form/human-design-form";
import { Pill, PillAvatar, PillAvatarGroup } from "@/components/ui/pill";
import Image from "next/image";

export function Hero() {
  return (
    <div className="relative z-1 grid w-full place-items-center px-4 py-6 pb-2 md:p-4">
      <BackgroundBlur className="-top-40 md:-top-0" />
      <Nav />
      <div className="mt-6 flex flex-col items-center gap-4 md:mt-8 w-full max-w-4xl">
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
        
        {/* Hero Title - Improved mobile typography */}
        <div className="text-center px-2 space-y-2">
          <h1 className="font-serif text-2xl leading-tight font-bold tracking-tight sm:text-3xl lg:text-5xl lg:leading-[1.1]">
            Transform your life
          </h1>
          <p className="font-serif text-lg font-bold tracking-tight sm:text-xl lg:text-3xl">
            with Human Design
          </p>
        </div>
        
        {/* Description - Better mobile spacing */}
        <p className="max-w-lg text-center leading-relaxed tracking-tight px-4 text-sm sm:text-base lg:text-lg">
          Discover your unique chart and unlock your full potential. 
        </p>
        
        
        {/* Form - Better mobile spacing */}
        <div className="w-full max-w-md">
          <HumanDesignForm />
        </div>
        
        {/* Chart Image - Improved responsive sizing */}
        <div className="mt-6 flex justify-center w-full">
          <div className="relative">
            <Image 
              src="/screenshot-chart-rightsize.png" 
              alt="Human Design Chart showing energy centers and channels" 
              width={280} 
              height={480}
              className="w-56 h-auto max-w-full sm:w-64 md:w-72 lg:w-80 rounded-lg shadow-lg"
              priority
              sizes="(max-width: 640px) 224px, (max-width: 768px) 256px, (max-width: 1024px) 288px, 320px"
              placeholder="blur"
              blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAAIAAoDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAhEAACAQMDBQAAAAAAAAAAAAABAgMABAUGIWGRkqGx0f/EABUBAQEAAAAAAAAAAAAAAAAAAAMF/8QAGhEAAgIDAAAAAAAAAAAAAAAAAAECEgMRkf/aAAwDAQACEQMRAD8AltJagyeH0AthI5xdrLcNM91BF5pX2HaH9bcfaSXWGaRmknyJckliyjqTzSlT54b6bk+h0R//2Q=="
            />
          </div>
        </div>
      </div>
    </div>
  );
}  
 