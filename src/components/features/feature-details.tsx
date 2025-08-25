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
      <div className="text-center">
        <p className="mb-2 text-base font-serif font-medium">{title}</p>
        <p className="text-muted-foreground text-sm text-wrap">{description}</p>
      </div>
    </>
  );
}
