"use client";

import { parseAsJson, parseAsString, useQueryState } from "nuqs";
import { useQuery } from "@tanstack/react-query";

import { getProductsService } from "@/services/inventory";
import PageHeader from "@/components/ux/page-header";
import { FiltersSchema } from "@/schemas/filters";
import Paginator from "@/components/ui/paginator";
import { FiltersInterface } from "@/interfaces";
import UiFilters from "@/components/filters";
import { KichenFour } from "@/public/images";

import ListProducts from "@/components/shared/list-products";
import FilterModal from "@/components/shared/filter-modal";
import SortToggle from "@/components/shared/sort-toggle";

export default function ShopPage() {
  // state
  const [filters, setFilters] = useQueryState<FiltersInterface>(
    "filters",
    parseAsJson(FiltersSchema).withDefault({}),
  );
  const [sorting_order, setSorting_order] = useQueryState(
    "sorting_order",
    parseAsString.withDefault(""),
  );

  // hooks

  // api
  const { data, isPending, error, refetch } = useQuery({
    queryKey: ["products", filters, sorting_order],
    queryFn: () =>
      getProductsService({
        filters: {
          ...filters.filters,
        },
        sorting_order: sorting_order,
        page: filters.page ?? 1,
        drop: filters.drop ?? 10,
        type: "list",
      }),
  });
  // variables
  const paginationItems = data?.paginator?.items;
  const paginationNext = data?.paginator?.next;
  const paginationprev = data?.paginator?.prev;
  const paginationpTotal = data?.paginator?.total_items;
  const paginationNextPage = data?.paginator?.next_page;

  return (
    <div className="min-h-screen">
      <div className="mx-auto ma-wx-7xl px-4 py-12">
        <PageHeader img={KichenFour} title="shop/products" />
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
          />
        </div>

        <div className="flex lg:flex-row flex-col gap-6">
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
            <UiFilters.BrandFilter filters={filters} setFilters={setFilters} />
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
              isPending={isPending}
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
