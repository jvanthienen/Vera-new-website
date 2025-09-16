import type { Feature } from "@/components/features/features";

type FeatureDetailsProps = {
  feature: Feature;
  isActive: boolean;
};

export function FeatureDetails({ feature }: FeatureDetailsProps) {
  const { icon, title, description } = feature;

  return (
    <>
      <div className="w-fit">
        {icon}
      </div>
      <div className="text-center px-2">
        <p className="mb-2 text-sm sm:text-base font-serif font-medium leading-tight">{title}</p>
        <p className="text-muted-foreground text-xs sm:text-sm text-wrap leading-relaxed">{description}</p>
      </div>
    </>
  );
}
