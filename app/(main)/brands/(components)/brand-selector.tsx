"use client";

import { UiButton, UiScrollArea, UiSkeleton } from "@/components/ui";
import { Brand } from "@/models/brand";

interface BrandSelectorProps {
  brands: Brand[];
  selectedBrandId: number | undefined;
  onSelect: (id: number) => void;
  isPending: boolean;
}

export default function BrandSelector({
  brands,
  selectedBrandId,
  onSelect,
  isPending,
}: BrandSelectorProps) {
  if (isPending) {
    return (
      <div className="flex gap-2">
        {Array.from({ length: 6 }).map((_, i) => (
          <UiSkeleton.Skeleton key={i} className="h-9 w-24 rounded-full" />
        ))}
      </div>
    );
  }

  if (!brands.length) return null;

  return (
    <UiScrollArea.ScrollArea className="w-full">
      <div className="flex gap-2 pb-2">
        {brands.map((brand) => (
          <UiButton.Button
            key={brand.id}
            variant={selectedBrandId === brand.id ? "default" : "outline"}
            size="sm"
            className="shrink-0 rounded-full"
            onClick={() => onSelect(brand.id)}
          >
            {brand.name}
          </UiButton.Button>
        ))}
      </div>
      <UiScrollArea.ScrollBar orientation="horizontal" />
    </UiScrollArea.ScrollArea>
  );
}
