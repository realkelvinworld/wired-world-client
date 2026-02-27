"use client";

import { getLanguagesService } from "@/services/base";
import { useQuery } from "@tanstack/react-query";

export function useLanguages() {
  const { data, isPending, error } = useQuery({
    queryKey: ["languages"],
    queryFn: () => getLanguagesService(),
  });

  return { data, isPending, error };
}
