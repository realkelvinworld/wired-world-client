"use client";
import { getCountriesService } from "@/services/utils";
import { useQuery } from "@tanstack/react-query";

export function useCountry() {
  const { data, isPending, error } = useQuery({
    queryKey: ["country"],
    queryFn: () => getCountriesService(),
  });
  return {
    data,
    isPending,
    error,
  };
}
