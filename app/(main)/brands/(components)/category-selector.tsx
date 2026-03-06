"use client";

import { UiButton, UiScrollArea, UiSkeleton } from "@/components/ui";
import { Category } from "@/models/category";

interface CategorySelectorProps {
  categories: Category[];
  selectedCategoryId: number | undefined;
  onSelect: (id: number | undefined) => void;
  isPending: boolean;
}

export default function CategorySelector({
  categories,
  selectedCategoryId,
  onSelect,
  isPending,
}: CategorySelectorProps) {
  if (isPending) {
    return (
      <div className="flex gap-2">
        {Array.from({ length: 5 }).map((_, i) => (
          <UiSkeleton.Skeleton key={i} className="h-9 w-24 rounded-full" />
        ))}
      </div>
    );
  }

  if (!categories.length) return null;

  return (
    <UiScrollArea.ScrollArea className="w-full">
      <div className="flex gap-2 pb-2">
        <UiButton.Button
          variant={selectedCategoryId === undefined ? "default" : "outline"}
          size="sm"
          className="shrink-0 rounded-full"
          onClick={() => onSelect(undefined)}
        >
          All
        </UiButton.Button>
        {categories.map((category) => (
          <UiButton.Button
            key={category.id}
            variant={selectedCategoryId === category.id ? "default" : "outline"}
            size="sm"
            className="shrink-0 rounded-full"
            onClick={() => onSelect(category.id)}
          >
            {category.name}
          </UiButton.Button>
        ))}
      </div>
      <UiScrollArea.ScrollBar orientation="horizontal" />
    </UiScrollArea.ScrollArea>
  );
}
