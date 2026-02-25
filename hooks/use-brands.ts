"use client";

import { getBrandsService } from "@/services/inventory";
import { useQuery } from "@tanstack/react-query";

export function useBrands(brandId?: number) {
  const { data, isPending, error } = useQuery({
    queryKey: ["brands", brandId],
    queryFn: () => getBrandsService(brandId ? { id: brandId } : undefined),
  });

  return {
    data,
    isPending,
    error,
  };
}
