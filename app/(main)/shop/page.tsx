"use client";

import { parseAsJson, parseAsString, useQueryState } from "nuqs";
import { useQuery } from "@tanstack/react-query";

import PageHeaderCarousel from "@/components/ux/page-header-carousel";
import ListProducts from "@/components/shared/list-products";
import FilterModal from "@/components/shared/filter-modal";
import { getProductsService } from "@/services/inventory";
import { FiltersSchema } from "@/schemas/filters";
import Paginator from "@/components/ui/paginator";
import { FiltersInterface } from "@/interfaces";
import UiFilters from "@/components/filters";

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

  // api
  const { data, isPending, error } = useQuery({
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
        <h1 className="sr-only">
          Shop Electronics &amp; Home Appliances — WiredWorld Ghana
        </h1>
        <PageHeaderCarousel
          title="shop/products"
          altPrefix="WiredWorld shop — electronics and home appliances"
        />
        {/* Mobile: sticky search + filter trigger */}
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
          />
          <UiFilters.ClearFilters filters={filters} setFilters={setFilters} />
        </div>

        <div className="flex lg:flex-row flex-col gap-6">
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
