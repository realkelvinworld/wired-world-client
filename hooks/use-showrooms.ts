"use client";

import { getShowroomsService } from "@/services/utils";
import { useQuery } from "@tanstack/react-query";

export function useShowrooms(regionId: number) {
  const { data, isPending, error } = useQuery({
    queryKey: ["showrooms", regionId],
    queryFn: () => getShowroomsService({ id: regionId }),
  });

  return {
    data,
    isPending,
    error,
  };
}
