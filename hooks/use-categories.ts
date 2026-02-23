"use client";

import { getCategoriesService } from "@/services/inventory";
import { useQuery } from "@tanstack/react-query";

export function useCategories(categoryId?: number) {
  const { data, isPending, error } = useQuery({
    queryKey: ["categories"],
    queryFn: () =>
      getCategoriesService(categoryId ? { id: categoryId } : undefined),
  });

  return {
    data,
    isPending,
    error,
  };
}
