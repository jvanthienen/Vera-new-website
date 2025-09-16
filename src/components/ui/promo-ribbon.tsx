import { cn } from "@/lib/utils";

interface PromoRibbonProps {
  children: React.ReactNode;
  className?: string;
}

export function PromoRibbon({ children, className }: PromoRibbonProps) {
  return (
    <div className={cn("relative", className)}>
      {/* Promotional Ribbon */}
      <div className="absolute -top-2 -right-2 z-10">
        <div className="bg-red-400 text-white text-xs font-bold px-2 py-1 rounded-full shadow-lg animate-pulse">
          3 days free
        </div>
      </div>
      {children}
    </div>
  );
}
