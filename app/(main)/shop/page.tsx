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
    <LoadingLayout>
      <div className="min-h-screen">
        <div className="mx-auto max-w-7xl px-4 py-12">
          <PageHeader img={KichenFour} title="shop/products" />
          <div>
            {/* Filters */}
            <section></section>

            {/* List products */}
            <section>
              <ListProducts
                setFilters={setFilters}
                isPending={isPending}
                error={error}
                data={data}
              />
            </section>
          </div>
        </div>
      </div>
    </LoadingLayout>
  );
}
