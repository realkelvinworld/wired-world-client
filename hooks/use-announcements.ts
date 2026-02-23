"use client";

import { getAnnouncementsService } from "@/services/utils";
import { useQuery } from "@tanstack/react-query";

export function useAnnouncements() {
  const { data, isPending, error } = useQuery({
    queryKey: ["announcements"],
    queryFn: () => getAnnouncementsService(),
  });

  return {
    data,
    isPending,
    error,
  };
}
