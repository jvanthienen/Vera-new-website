
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
} from "@/components/ui/navigation-menu";
import { PromoRibbon } from "@/components/ui/promo-ribbon";
import { cn } from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";

type Props = {
  items: {
    label: string;
    href: string;
  }[];
  className?: string;
};

export function DesktopNav({ items, className }: Props) {
  return (
    <nav className={cn("mx-auto flex w-full max-w-7xl items-center justify-between gap-4", className)}>
      <Link href="/">
        <Image src="/logo.svg" alt="logo" width={86} height={26} />
      </Link>
      <NavigationMenu>
        <NavigationMenuList className="gap-8">
          {items.map((item) => (
            <NavigationMenuItem key={item.href}>
              <NavigationMenuLink href={item.href}>{item.label}</NavigationMenuLink>
            </NavigationMenuItem>
          ))}
        </NavigationMenuList>
      </NavigationMenu>
      <div className="flex items-center gap-3">
        {/* Product Hunt Button */}
        <Link
          href="https://www.producthunt.com/products/human-design-app-vera?embed=true&utm_source=badge-featured&utm_medium=badge&utm_source=badge-human&#0045;design&#0045;app&#0045;vera"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex h-10 items-center justify-center rounded-md transition-opacity hover:opacity-90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
        >
          <img 
            src="https://api.producthunt.com/widgets/embed-image/v1/featured.svg?post_id=1015460&theme=light&t=1757645025302" 
            alt="Human Design App: Vera - Unique personality insights to guide smarter life decisions. | Product Hunt" 
            className="h-10 w-auto"
          />
        </Link>
        
        {/* Download App Button */}
        <PromoRibbon>
          <Link 
            href="https://apps.apple.com/us/app/vera-your-human-design-guide/id6748094016" 
            target="_blank" 
            rel="noopener noreferrer"
            className="inline-flex h-10 items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground ring-offset-background transition-colors hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50"
          >
            Download the app
          </Link>
        </PromoRibbon>
      </div>
    </nav>
  );
}
