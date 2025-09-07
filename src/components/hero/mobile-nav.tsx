import { Drawer, DrawerContent, DrawerTrigger, DrawerTitle } from "@/components/ui/drawer";
import { cn } from "@/lib/utils";
import { Menu } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

type Props = {
  items: {
    label: string;
    href: string;
  }[];
  className?: string;
};

export function MobileNav({ items, className }: Props) {
  return (
    <nav className={cn("flex w-full max-w-7xl items-center justify-between gap-4 px-2", className)}>
      <Link href="/" className="flex-shrink-0">
        <Image 
          src="/logo.svg" 
          alt="Vera - Human Design Guide" 
          width={86} 
          height={26} 
          className="h-6 w-auto sm:h-7" 
          priority
          sizes="(max-width: 640px) 86px, 86px"
        />
      </Link>
      <Drawer direction="top">
        <DrawerTrigger className="relative -m-2 cursor-pointer p-3 mobile-touch-target flex items-center justify-center">
          <span className="sr-only">Open menu</span>
          <Menu className="h-6 w-6 text-vera-text" />
        </DrawerTrigger>
        <DrawerContent className="flex flex-col gap-6 p-6 sm:p-8">
          <DrawerTitle className="sr-only">Menu</DrawerTitle>
          {items.map((item) => (
            <Link 
              key={item.href} 
              href={item.href}
              className="text-center py-3 text-lg font-medium hover:text-vera-primary transition-colors duration-200 mobile-touch-target flex items-center justify-center"
            >
              {item.label}
            </Link>
          ))}
          {/* Download App Button */}
          <Link 
            href="https://apps.apple.com/us/app/vera-your-human-design-guide/id6748094016" 
            target="_blank" 
            rel="noopener noreferrer"
            className="mt-4 inline-flex h-12 items-center justify-center rounded-md bg-primary px-6 py-3 text-base font-medium text-primary-foreground ring-offset-background transition-colors hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 mobile-touch-target"
          >
            Download the app
          </Link>
        </DrawerContent>
      </Drawer>
    </nav>
  );
}
