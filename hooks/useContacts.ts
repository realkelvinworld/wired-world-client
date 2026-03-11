"use client";

import { getContactService } from "@/services/utils";
import { useQuery } from "@tanstack/react-query";

export function useContacts() {
  const { data, isPending, error } = useQuery({
    queryKey: ["contacts"],
    queryFn: () => getContactService(),
  });

  return { data, isPending, error };
}
