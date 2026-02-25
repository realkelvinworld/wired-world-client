"use client";

import { FunnelIcon } from "@phosphor-icons/react";

import { UiButton, UiScrollArea, UiSheet } from "@/components/ui";
import { FiltersInterface } from "@/interfaces";
import UiFilters from "@/components/filters";

import SortToggle from "@/components/shared/sort-toggle";

interface FilterModalProps {
  filters: FiltersInterface;
  setFilters: React.Dispatch<React.SetStateAction<FiltersInterface>>;
  sortingOrder: string;
  setSortingOrder: (value: string) => void;
  hideBrandFilter?: boolean;
}

export default function FilterModal({
  filters,
  setFilters,
  sortingOrder,
  setSortingOrder,
  hideBrandFilter,
}: FilterModalProps) {
  return (
    <UiSheet.Sheet>
      <UiSheet.SheetTrigger asChild>
        <UiButton.Button variant="outline" size="sm" className="rounded-full">
          <FunnelIcon weight="bold" />
          Filters
        </UiButton.Button>
      </UiSheet.SheetTrigger>
      <UiSheet.SheetContent side="left" className="w-full">
        <UiSheet.SheetHeader>
          <UiSheet.SheetTitle>Filters</UiSheet.SheetTitle>
          <UiSheet.SheetDescription>
            Refine your product search
          </UiSheet.SheetDescription>
        </UiSheet.SheetHeader>
        <UiScrollArea.ScrollArea className="flex-1 p-4">
          <div className="flex flex-col gap-4 pb-4">
            <div className="flex justify-between gap-2">
              <SortToggle value={sortingOrder} onChange={setSortingOrder} />
              <UiFilters.ClearFilters
                filters={filters}
                setFilters={setFilters}
              />
            </div>
            <UiFilters.MainCategoryFilter
              filters={filters}
              setFilters={setFilters}
            />
            <UiFilters.SubCategoryFilter
              filters={filters}
              setFilters={setFilters}
            />
            {!hideBrandFilter && (
              <UiFilters.BrandFilter
                filters={filters}
                setFilters={setFilters}
              />
            )}
            <UiFilters.PriceFilter filters={filters} setFilters={setFilters} />
            <UiFilters.RatingFilter filters={filters} setFilters={setFilters} />
            <UiFilters.PromotionFilter
              filters={filters}
              setFilters={setFilters}
            />
          </div>
        </UiScrollArea.ScrollArea>
      </UiSheet.SheetContent>
    </UiSheet.Sheet>
  );
}
