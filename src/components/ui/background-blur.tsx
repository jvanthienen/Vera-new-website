import React from "react";
import { cn } from "@/lib/utils";

type Props = {
  className?: string;
};

export function BackgroundBlur({ className }: Props) {
  return (
    <div
      className={cn(
        "pointer-events-none absolute top-0 left-0 -z-10 h-full w-full",
        className,
      )}
      style={{
        background: `radial-gradient(ellipse at top left, var(--vera-text-darker) 0%, var(--vera-text) 20%, transparent 60%), 
                     radial-gradient(ellipse at top right, var(--vera-text-darker) 0%, var(--vera-text) 20%, transparent 60%)`,
      }}
    />
  );
}
