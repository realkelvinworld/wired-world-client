"use client";

import { parseAsJson, useQueryState } from "nuqs";
import { useQuery } from "@tanstack/react-query";

import LoadingLayout from "@/components/animations/loading-layout";
import { getProductsService } from "@/services/inventory";
import PageHeader from "@/components/ux/page-header";
import { FiltersSchema } from "@/schemas/filters";
import { FiltersInterface } from "@/interfaces";
import { KichenFour } from "@/public/images";

import ListProducts from "./(components)/list-products";
import Paginator from "@/components/ui/paginator";

export default function ShopPage() {
  // state
  const [filters, setFilters] = useQueryState<FiltersInterface>(
    "filters",
    parseAsJson(FiltersSchema).withDefault({}),
  );

  // hooks

  // api
  const { data, isPending, error, refetch } = useQuery({
    queryKey: ["products", filters],
    queryFn: () =>
      getProductsService({
        type: "list",
      }),
  });
  return (
    <div className="min-h-screen">
      <div className="mx-auto max-w-7xl px-4 py-12">
        <PageHeader img={KichenFour} title="shop/products" />
        <div className="flex lg:flex-row flex-col gap-2">
          {/* Filters */}
          <div className="lg:sticky top-20 h-full">
            <span className="border rounded-full py-1 px-6 text-muted-foreground">
              Filters will sit here :)
            </span>
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
          <Paginator />
        </section>
      </div>
    </div>
  );
}
