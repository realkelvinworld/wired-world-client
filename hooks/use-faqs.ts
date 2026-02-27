"use client";

import { getFaqsService } from "@/services/base";
import { useQuery } from "@tanstack/react-query";

export function useFaqs() {
  const { data, isPending, error } = useQuery({
    queryKey: ["faqs"],
    queryFn: () => getFaqsService(),
  });

  return { data, isPending, error };
}
