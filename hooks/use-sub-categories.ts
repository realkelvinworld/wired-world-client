"use client";

import { getSubCategoriesService } from "@/services/inventory";
import { useQuery } from "@tanstack/react-query";

export function useSubCategories(mainCategoryId?: number) {
  const { data, isPending, error } = useQuery({
    queryKey: ["sub-categories", mainCategoryId],
    queryFn: () => getSubCategoriesService({ id: mainCategoryId! }),
    enabled: !!mainCategoryId,
  });

  return {
    data,
    isPending,
    error,
  };
}
