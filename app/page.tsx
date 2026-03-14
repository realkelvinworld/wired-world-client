"use client";

import { ShoppingBagIcon } from "@phosphor-icons/react";
import { parseAsJson, useQueryState } from "nuqs";
import { useQuery } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";

import PageHeaderCarousel from "@/components/ux/page-header-carousel";
import LoadingLayout from "@/components/animations/loading-layout";
import ListProducts from "@/components/shared/list-products";
import { getProductsService } from "@/services/inventory";
import BrandsSlider from "@/components/ux/brands-slider";
import { useCategories } from "@/hooks/use-categories";
import { UiBadge, UiButton } from "@/components/ui";
import { FiltersSchema } from "@/schemas/filters";
import { FiltersInterface } from "@/interfaces";
import { routes } from "@/routes";

import CategorySelector from "./(main)/brands/(components)/category-selector";

export default function Home() {
  // state
  const [filters, setFilters] = useQueryState<FiltersInterface>(
    "filters",
    parseAsJson(FiltersSchema).withDefault({}),
  );

  // api
  const { data, isPending, error } = useQuery({
    queryKey: ["products", filters],
    queryFn: () =>
      getProductsService({
        filters: {
          ...filters.filters,
        },
        sorting_order: "popularity",
        page: 1,
        drop: 6,
        type: "list",
      }),
  });

  // Hooks
  const { data: categoriesData, isPending: categoriesPending } =
    useCategories();

  // navigation
  const { push } = useRouter();

  // functions
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

  // variables
  const categories = categoriesData?.info ?? [];
  const selectedCategoryId = filters.filters?.main_category_id;

  return (
    <LoadingLayout>
      <div className="min-h-screen max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Hero */}
        <motion.div
          initial={{ opacity: 0, y: -30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
        >
          <div className="flex justify-center items-center my-10 sm:my-14 relative">
            <h1 className="font-bold text-5xl sm:text-4xl md:text-5xl lg:text-7xl text-center tracking-tight px-2 sm:px-0">
              Your Trusted
              <span className="text-blue-500"> Online Electronics </span>
              Destination
            </h1>
          </div>
        </motion.div>

        {/* First Carousel */}
        <section className="mt-20">
          <PageHeaderCarousel
            badge="shop from your favorite brands"
            title=""
            url={routes.brands}
          />
        </section>

        {/* Show some products sold */}
        <section className="my-30 flex flex-col gap-6">
          <UiBadge.Badge className="mx-auto mt-4 bg-primary text-white font-semibold">
            Top picks based on popularity
          </UiBadge.Badge>

          <h1 className="text-3xl lg:text-5xl sm:text-4xl font-bold text-center tracking-tight">
            Discover Our Best Sellers
          </h1>

          {/*Quick Brand selector */}
          <div className="mb-6 flex flex-col gap-6">
            <CategorySelector
              categories={categories}
              selectedCategoryId={selectedCategoryId}
              onSelect={handleCategorySelect}
              isPending={categoriesPending}
            />
            <ListProducts
              setFilters={setFilters}
              isPending={isPending || categoriesPending}
              error={error}
              data={data}
            />
          </div>
          <UiButton.Button
            variant="default"
            size="lg"
            className="mx-auto rounded-full"
            onClick={() => push(routes.shop.shop)}
          >
            Explore More Products
            <ShoppingBagIcon className="ml-2" />
          </UiButton.Button>
        </section>

        {/* Brands we work with */}
        <BrandsSlider />
      </div>
    </LoadingLayout>
  );
}
