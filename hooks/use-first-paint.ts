"use client";

import { useQuery } from "@tanstack/react-query";
import { useEffect } from "react";

import { firstPaintService } from "@/services/user";
import { useUserStore } from "@/store/user";

export function useFirstPaint() {
  const { setUser } = useUserStore();

  const { data, isPending, error } = useQuery({
    queryKey: ["first-paint"],
    queryFn: () => firstPaintService(),
    enabled: true,
  });

  useEffect(() => {
    if (data?.info) {
      setUser(data.info);
    }
  }, [data, setUser]);

  return { data, isPending, error };
}
