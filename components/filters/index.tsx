"use client";

import {
  CrownIcon,
  ListBulletsIcon,
  MagnifyingGlassIcon,
  SquaresFourIcon,
  StarIcon,
  TagIcon,
  XIcon,
} from "@phosphor-icons/react";
import { useMemo, useState } from "react";
import { debounce } from "lodash-es";

import {
  UiButton,
  UiLabel,
  UiSelect,
  UiSlider,
  UiSwitch,
} from "@/components/ui";
import { useSubCategories } from "@/hooks/use-sub-categories";
import { useCategories } from "@/hooks/use-categories";
import { useBrands } from "@/hooks/use-brands";
import { UiInput } from "@/components/ui";
import { FiltersInterface } from "@/interfaces";

interface FilterProps {
  filters: FiltersInterface;
  setFilters: React.Dispatch<React.SetStateAction<FiltersInterface>>;
  placeholder?: string;
}

// ── Search ──────────────────────────────────────────────────

export function SearchFilter({
  filters,
  setFilters,
  placeholder = "Search products...",
}: FilterProps) {
  const [localValue, setLocalValue] = useState(filters.filters?.search ?? "");

  const debouncedUpdate = useMemo(
    () =>
      debounce((value: string) => {
        setFilters((prev) => {
          if (value === "") {
            // eslint-disable-next-line @typescript-eslint/no-unused-vars
            const { search: _search, ...rest } = prev.filters ?? {};
            const hasRemaining = Object.keys(rest).length > 0;
            return { ...prev, filters: hasRemaining ? rest : null };
          }
          return { ...prev, filters: { ...prev.filters, search: value } };
        });
      }, 400),
    [setFilters],
  );

  return (
    <div className="relative w-full">
      <MagnifyingGlassIcon
        weight="bold"
        className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground"
      />
      <UiInput.Input
        type="text"
        placeholder={placeholder}
        className="pl-9 rounded-full"
        value={localValue}
        onChange={(e) => {
          setLocalValue(e.target.value);
          debouncedUpdate(e.target.value);
        }}
      />
    </div>
  );
}

// ── Price Range ─────────────────────────────────────────────

export function PriceFilter({ filters, setFilters }: FilterProps) {
  const [localRange, setLocalRange] = useState([
    filters.filters?.min_price ?? 0,
    filters.filters?.max_price ?? 10000,
  ]);

  const debouncedUpdate = useMemo(
    () =>
      debounce((values: number[]) => {
        setFilters((prev) => ({
          ...prev,
          filters: {
            ...prev.filters,
            min_price: values[0],
            max_price: values[1],
          },
        }));
      }, 400),
    [setFilters],
  );

  const handleChange = (values: number[]) => {
    setLocalRange(values);
    debouncedUpdate(values);
  };

  return (
    <div className="space-y-3">
      <div className="flex items-center gap-2">
        <TagIcon weight="bold" className="size-4 text-muted-foreground" />
        <UiLabel.Label className="text-sm text-muted-foreground">
          Price range
        </UiLabel.Label>
      </div>
      <UiSlider.Slider
        min={0}
        max={10000}
        step={50}
        value={localRange}
        onValueChange={handleChange}
      />
      <div className="flex items-center justify-between text-xs text-muted-foreground">
        <span>GHS {localRange[0].toLocaleString()}</span>
        <span>GHS {localRange[1].toLocaleString()}</span>
      </div>
    </div>
  );
}

// ── Rating Range ────────────────────────────────────────────

export function RatingFilter({ filters, setFilters }: FilterProps) {
  const minRating = filters.filters?.min_rating ?? 1;
  const maxRating = filters.filters?.max_rating ?? 5;

  return (
    <div className="space-y-3">
      <div className="flex items-center gap-2">
        <StarIcon weight="bold" className="size-4 text-muted-foreground" />
        <UiLabel.Label className="text-sm text-muted-foreground">
          Rating
        </UiLabel.Label>
      </div>
      <UiSlider.Slider
        min={1}
        max={5}
        step={1}
        value={[minRating, maxRating]}
        onValueChange={(values) =>
          setFilters((prev) => ({
            ...prev,
            filters: {
              ...prev.filters,
              min_rating: values[0],
              max_rating: values[1],
            },
          }))
        }
      />
      <div className="flex items-center justify-between text-xs text-muted-foreground">
        <span>
          {minRating} star{minRating !== 1 && "s"}
        </span>
        <span>{maxRating} stars</span>
      </div>
    </div>
  );
}

// ── On Promotion ────────────────────────────────────────────

export function PromotionFilter({ filters, setFilters }: FilterProps) {
  const isOn = filters.filters?.on_promotion ?? false;

  return (
    <div className="flex items-center justify-between">
      <UiLabel.Label
        htmlFor="promotion-filter"
        className="text-sm text-muted-foreground"
      >
        On promotion
      </UiLabel.Label>
      <UiSwitch.Switch
        id="promotion-filter"
        size="default"
        checked={isOn}
        onCheckedChange={(checked) =>
          setFilters((prev) => ({
            ...prev,
            filters: {
              ...prev.filters,
              on_promotion: checked || undefined,
            },
          }))
        }
      />
    </div>
  );
}

// ── Main Category ──────────────────────────────────────────

export function MainCategoryFilter({ filters, setFilters }: FilterProps) {
  const { data, isPending } = useCategories();
  const categories = data?.info ?? [];
  const selected = filters.filters?.main_category_id?.toString() ?? "all";

  return (
    <div className="space-y-3">
      <div className="flex items-center gap-2">
        <SquaresFourIcon
          weight="bold"
          className="size-4 text-muted-foreground"
        />
        <UiLabel.Label className="text-sm text-muted-foreground">
          Category
        </UiLabel.Label>
      </div>
      <UiSelect.Select
        value={selected}
        onValueChange={(value) => {
          const id = value === "all" ? undefined : Number(value);
          setFilters((prev) => ({
            ...prev,
            filters: {
              ...prev.filters,
              main_category_id: id,
              sub_category_id: undefined,
            },
          }));
        }}
      >
        <UiSelect.SelectTrigger className="w-full rounded">
          <UiSelect.SelectValue
            placeholder={isPending ? "Loading..." : "All categories"}
          />
        </UiSelect.SelectTrigger>
        <UiSelect.SelectContent>
          <UiSelect.SelectItem value="all">All categories</UiSelect.SelectItem>
          {categories.map((cat) => (
            <UiSelect.SelectItem key={cat.id} value={cat.id.toString()}>
              {cat.name}
            </UiSelect.SelectItem>
          ))}
        </UiSelect.SelectContent>
      </UiSelect.Select>
    </div>
  );
}

// ── Sub Category ───────────────────────────────────────────

export function SubCategoryFilter({ filters, setFilters }: FilterProps) {
  const mainCategoryId = filters.filters?.main_category_id;
  const { data, isPending } = useSubCategories(mainCategoryId);
  const subCategories = data?.info ?? [];
  const selected = filters.filters?.sub_category_id?.toString() ?? "all";

  if (!mainCategoryId) return null;

  return (
    <div className="space-y-3">
      <div className="flex items-center gap-2">
        <ListBulletsIcon
          weight="bold"
          className="size-4 text-muted-foreground"
        />
        <UiLabel.Label className="text-sm text-muted-foreground">
          Sub-category
        </UiLabel.Label>
      </div>
      <UiSelect.Select
        value={selected}
        onValueChange={(value) =>
          setFilters((prev) => ({
            ...prev,
            filters: {
              ...prev.filters,
              sub_category_id: value === "all" ? undefined : Number(value),
            },
          }))
        }
      >
        <UiSelect.SelectTrigger className="w-full rounded">
          <UiSelect.SelectValue
            placeholder={isPending ? "Loading..." : "All sub-categories"}
          />
        </UiSelect.SelectTrigger>
        <UiSelect.SelectContent>
          <UiSelect.SelectItem value="all">
            All sub-categories
          </UiSelect.SelectItem>
          {subCategories.map((cat) => (
            <UiSelect.SelectItem key={cat.id} value={cat.id.toString()}>
              {cat.name}
            </UiSelect.SelectItem>
          ))}
        </UiSelect.SelectContent>
      </UiSelect.Select>
    </div>
  );
}

// ── Brand ──────────────────────────────────────────────────

export function BrandFilter({ filters, setFilters }: FilterProps) {
  const { data, isPending } = useBrands();
  const brands = data?.info ?? [];
  const selected = filters.filters?.brand_id?.toString() ?? "all";

  return (
    <div className="space-y-3">
      <div className="flex items-center gap-2">
        <CrownIcon weight="bold" className="size-4 text-muted-foreground" />
        <UiLabel.Label className="text-sm text-muted-foreground">
          Brand
        </UiLabel.Label>
      </div>
      <UiSelect.Select
        value={selected}
        onValueChange={(value) =>
          setFilters((prev) => ({
            ...prev,
            filters: {
              ...prev.filters,
              brand_id: value === "all" ? undefined : Number(value),
            },
          }))
        }
      >
        <UiSelect.SelectTrigger className="w-full rounded">
          <UiSelect.SelectValue
            placeholder={isPending ? "Loading..." : "All brands"}
          />
        </UiSelect.SelectTrigger>
        <UiSelect.SelectContent>
          <UiSelect.SelectItem value="all">All brands</UiSelect.SelectItem>
          {brands.map((brand) => (
            <UiSelect.SelectItem key={brand.id} value={brand.id.toString()}>
              {brand.name}
            </UiSelect.SelectItem>
          ))}
        </UiSelect.SelectContent>
      </UiSelect.Select>
    </div>
  );
}

// ── Clear Filters ───────────────────────────────────────────

export function ClearFilters({ filters, setFilters }: FilterProps) {
  const hasFilters =
    filters.filters != null && Object.keys(filters.filters).length > 0;

  if (!hasFilters) return null;

  return (
    <UiButton.Button
      variant="destructive"
      className="text-secondary rounded-full"
      onClick={() => setFilters((prev) => ({ ...prev, filters: null }))}
    >
      <XIcon weight="bold" />
      Clear filters
    </UiButton.Button>
  );
}

// ── Barrel export ───────────────────────────────────────────

const UiFilters = {
  SearchFilter,
  MainCategoryFilter,
  SubCategoryFilter,
  BrandFilter,
  PriceFilter,
  RatingFilter,
  PromotionFilter,
  ClearFilters,
};

export default UiFilters;
