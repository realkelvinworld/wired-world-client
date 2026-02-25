import * as Icon from "@phosphor-icons/react";

import { FiltersInterface, PaginatedApiResponse } from "@/interfaces";
import { Product } from "@/models/product";

import { ProductCard, ProductCardSkeleton } from "@/components/shared/product-card";

interface IProductListProps {
  data: PaginatedApiResponse<Product[]> | undefined;
  isPending: boolean;
  error: Error | null;
  setFilters?: React.Dispatch<React.SetStateAction<FiltersInterface>>;
}

export default function ListProducts({
  data,
  error,
  isPending,
  setFilters,
}: IProductListProps) {
  if (isPending) {
    return (
      <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4 w-full">
        {Array.from({ length: 8 }).map((_, i) => (
          <ProductCardSkeleton key={i} />
        ))}
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center gap-4 py-20">
        <div className="flex size-16 items-center justify-center rounded-full bg-destructive/10">
          <Icon.WarningCircleIcon className="size-8 text-destructive" />
        </div>
        <div className="text-center">
          <h3 className="text-sm font-semibold">Something went wrong</h3>
          <p className="mt-1 text-sm text-muted-foreground">
            We couldn&apos;t load the products. Please try again.
          </p>
        </div>
      </div>
    );
  }

  const products = data?.info;

  if (!products || products.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center gap-4 py-20">
        <div className="flex size-16 items-center justify-center rounded-full bg-muted">
          <Icon.PackageIcon className="size-8 text-muted-foreground" />
        </div>
        <div className="text-center">
          <h3 className="text-sm font-semibold">No products found</h3>
          <p className="mt-1 text-sm text-muted-foreground">
            Try adjusting your filters or search terms.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3 w-full">
      {products.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
}
