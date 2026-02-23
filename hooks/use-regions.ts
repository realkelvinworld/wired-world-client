"use client";

import { getRegionsService } from "@/services/utils";
import { useQuery } from "@tanstack/react-query";

export function useRegions() {
  const { data, isPending, error } = useQuery({
    queryKey: ["regions"],
    queryFn: () => getRegionsService(),
  });

  return {
    data,
    isPending,
    error,
  };
}
