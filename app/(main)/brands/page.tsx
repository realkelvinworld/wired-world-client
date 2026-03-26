"use client";

import { parseAsJson, parseAsString, useQueryState } from "nuqs";
import { useQuery } from "@tanstack/react-query";
import { useEffect, useMemo } from "react";

import { getProductsService } from "@/services/inventory";
import { useCategories } from "@/hooks/use-categories";
import { FiltersSchema } from "@/schemas/filters";
import Paginator from "@/components/ui/paginator";
import { FiltersInterface } from "@/interfaces";
import { useBrands } from "@/hooks/use-brands";
import UiFilters from "@/components/filters";

import PageHeaderCarousel from "@/components/ux/page-header-carousel";
import ListProducts from "@/components/shared/list-products";
import FilterModal from "@/components/shared/filter-modal";
import { UiSeparator } from "@/components/ui";

import CategorySelector from "./(components)/category-selector";
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
  const { data: categoriesData, isPending: categoriesPending } =
    useCategories();

  // variables
  const brands = useMemo(() => brandsData?.info ?? [], [brandsData]);
  const categories = categoriesData?.info ?? [];
  const selectedBrandId = brandId ? Number(brandId) : undefined;
  const selectedCategoryId = filters.filters?.main_category_id;
  const selectedBrand = brands?.find((f) => f.id === Number(brandId));

  // effect
  // useEffect(() => {
  //   if (!brandId && brands.length > 0) {
  //     setBrandId(brands[0].id.toString());
  //   }
  // }, [brandId, brands, setBrandId]);

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
        drop: filters.drop ?? 12,
        type: "list",
      }),
  });

  const paginationItems = data?.paginator?.items;
  const paginationNext = data?.paginator?.next;
  const paginationprev = data?.paginator?.prev;
  const paginationpTotal = data?.paginator?.total_items;
  const paginationNextPage = data?.paginator?.next_page;

  // functions
  function handleBrandSelect(id: number) {
    setBrandId(id.toString());
    setFilters((prev) => ({ ...prev, page: 1 }));
  }

  function handleCategorySelect(id: number | undefined) {
    setFilters((prev) => ({
      ...prev,
      page: 1,
      filters: {
        ...prev.filters,
        main_category_id: id,
        sub_category_id: undefined,
      },
    }));
  }

  return (
    <div className="min-h-screen">
      <div className="mx-auto max-w-7xl px-4 py-12">
        <h1 className="sr-only">
          Authorized Electronics Brands — WiredWorld Ghana
        </h1>
        {/* Banner */}
        <div className="my-10">
          {selectedBrand?.banners.length === 0 ? (
            <PageHeaderCarousel
              title={"brands"}
              altPrefix="WiredWorld authorized electronics brands"
            />
          ) : (
            <PageHeaderCarousel
              img={selectedBrand?.banners}
              altPrefix={
                selectedBrand?.name
                  ? `${selectedBrand.name} products at WiredWorld Ghana`
                  : "WiredWorld brand products"
              }
            />
          )}
        </div>

        {/* Brand selector pills */}
        <div className="mb-4">
          <BrandSelector
            brands={brands}
            selectedBrandId={selectedBrandId}
            onSelect={handleBrandSelect}
            isPending={brandsPending}
          />
        </div>
        {/* separator */}
        <UiSeparator.Separator className="my-4" />
        {/* Category selector pills */}
        <div className="mb-6">
          <CategorySelector
            categories={categories}
            selectedCategoryId={selectedCategoryId}
            onSelect={handleCategorySelect}
            isPending={categoriesPending}
          />
        </div>

        {/* Sticky search + filter bar */}
        <div className="sticky top-15 z-30 flex items-center gap-2 bg-background py-4 w-full">
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
            hideCategoryFilter
          />
          <UiFilters.ClearFilters filters={filters} setFilters={setFilters} />
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

        <section className="my-6">
          <Paginator
            filters={filters}
            items={paginationItems ?? 0}
            setFilters={setFilters}
            next={paginationNext}
            showCount={false}
            prev={paginationprev}
            total={paginationpTotal}
            next_page={paginationNextPage}
          />
        </section>
      </div>
    </div>
  );
}
