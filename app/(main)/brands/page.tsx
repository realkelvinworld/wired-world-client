"use client";

import { parseAsJson, parseAsString, useQueryState } from "nuqs";
import { useQuery } from "@tanstack/react-query";
import { useEffect } from "react";

import { getProductsService } from "@/services/inventory";
import { useBrands } from "@/hooks/use-brands";
import { FiltersSchema } from "@/schemas/filters";
import Paginator from "@/components/ui/paginator";
import { FiltersInterface } from "@/interfaces";
import UiFilters from "@/components/filters";

import ListProducts from "@/components/shared/list-products";
import FilterModal from "@/components/shared/filter-modal";
import SortToggle from "@/components/shared/sort-toggle";

import BrandSelector from "./(components)/brand-selector";

export default function BrandsPage() {
  // state
  const [filters, setFilters] = useQueryState<FiltersInterface>(
    "filters",
    parseAsJson(FiltersSchema).withDefault({}),
  );
  const [sorting_order, setSorting_order] = useQueryState(
    "sorting_order",
    parseAsString.withDefault(""),
  );
  const [brandId, setBrandId] = useQueryState(
    "brand_id",
    parseAsString.withDefault(""),
  );

  // hooks
  const { data: brandsData, isPending: brandsPending } = useBrands();
  const brands = brandsData?.info ?? [];

  // auto-select first brand when brands load
  useEffect(() => {
    if (!brandId && brands.length > 0) {
      setBrandId(brands[0].id.toString());
    }
  }, [brandId, brands, setBrandId]);

  const selectedBrandId = brandId ? Number(brandId) : undefined;

  // api
  const { data, isPending, error } = useQuery({
    queryKey: ["products", "brands", selectedBrandId, filters, sorting_order],
    queryFn: () =>
      getProductsService({
        filters: {
          ...filters.filters,
          brand_id: selectedBrandId,
        },
        sorting_order: sorting_order,
        page: filters.page ?? 1,
        drop: filters.drop ?? 10,
        type: "list",
      }),
    enabled: !!selectedBrandId,
  });

  // variables
  const paginationItems = data?.paginator?.items;
  const paginationNext = data?.paginator?.next;
  const paginationprev = data?.paginator?.prev;
  const paginationpTotal = data?.paginator?.total_items;
  const paginationNextPage = data?.paginator?.next_page;

  const handleBrandSelect = (id: number) => {
    setBrandId(id.toString());
    setFilters((prev) => ({ ...prev, page: 1 }));
  };

  return (
    <div className="min-h-screen">
      <div className="mx-auto max-w-7xl px-4 py-12">
        {/* Banner placeholder */}
        <div className="mb-8 flex min-h-48 items-center justify-center rounded-2xl bg-muted/30 border border-dashed border-muted-foreground/20">
          <p className="text-sm text-muted-foreground">Banner</p>
        </div>

        {/* Brand selector */}
        <div className="mb-6">
          <BrandSelector
            brands={brands}
            selectedBrandId={selectedBrandId}
            onSelect={handleBrandSelect}
            isPending={brandsPending}
          />
        </div>

        {/* Mobile: sticky search + filter trigger */}
        <div className="sticky top-16 z-10 flex items-center gap-2 bg-background py-2 lg:hidden">
          <UiFilters.SearchFilter
            filters={filters}
            setFilters={setFilters}
            placeholder="Search product"
          />
          <FilterModal
            filters={filters}
            setFilters={setFilters}
            sortingOrder={sorting_order}
            setSortingOrder={setSorting_order}
            hideBrandFilter
          />
        </div>

        <div className="flex lg:flex-row flex-col gap-2">
          {/* Desktop: sidebar filters */}
          <div className="hidden lg:flex lg:sticky top-20 self-start w-80 flex-col gap-4">
            <div className="flex justify-between gap-2">
              <SortToggle value={sorting_order} onChange={setSorting_order} />
              <UiFilters.ClearFilters
                filters={filters}
                setFilters={setFilters}
              />
            </div>
            <UiFilters.SearchFilter
              filters={filters}
              setFilters={setFilters}
              placeholder="Search product"
            />
            <UiFilters.MainCategoryFilter
              filters={filters}
              setFilters={setFilters}
            />
            <UiFilters.SubCategoryFilter
              filters={filters}
              setFilters={setFilters}
            />
            <UiFilters.PriceFilter filters={filters} setFilters={setFilters} />
            <UiFilters.RatingFilter filters={filters} setFilters={setFilters} />
            <UiFilters.PromotionFilter
              filters={filters}
              setFilters={setFilters}
            />
          </div>

          {/* List products */}
          <section className="flex-1 min-w-0">
            <ListProducts
              setFilters={setFilters}
              isPending={isPending || brandsPending}
              error={error}
              data={data}
            />
          </section>
        </div>
        <section className="my-6">
          <Paginator
            filters={filters}
            items={paginationItems ?? 0}
            setFilters={setFilters}
            next={paginationNext}
            prev={paginationprev}
            total={paginationpTotal}
            next_page={paginationNextPage}
          />
        </section>
      </div>
    </div>
  );
}
