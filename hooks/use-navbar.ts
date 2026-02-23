"use client";
import { getNavbarService } from "@/services/utils";
import { useQuery } from "@tanstack/react-query";

export function useNavBar() {
  const { data, isPending, error } = useQuery({
    queryKey: ["navbar"],
    queryFn: () => getNavbarService(),
  });
  return {
    data,
    isPending,
    error,
  };
}
