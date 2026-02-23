"use client";

import LoadingLayout from "@/components/animations/loading-layout";
import ComingSoon from "@/components/ux/coming-soon";
// import { FiltersInterface } from "@/interfaces";
// import { FiltersSchema } from "@/schemas/filters";
// import { getProductsService } from "@/services/inventory";
// import { useQuery } from "@tanstack/react-query";
// import { parseAsJson, useQueryState } from "nuqs";

export default function ShopPage() {
  // state
  // const [filters, setFilters] = useQueryState<FiltersInterface>(
  //   "filters",
  //   parseAsJson(FiltersSchema).withDefault({}),
  // );

  // hooks

  // api
  // const { data, isPending, error, refetch } = useQuery({
  //   queryKey: ["products", filters],
  //   queryFn: () => getProductsService({}),
  // });
  return (
    <LoadingLayout>
      <ComingSoon
        title="Shop"
        description="Browse our full catalogue of electronics and home appliances."
      />
      <div>
        {/* Filters */}
        <section></section>

        {/* List products */}
        <section></section>
      </div>
    </LoadingLayout>
  );
}
