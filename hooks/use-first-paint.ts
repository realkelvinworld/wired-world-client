"use client";

import { firstPaintService } from "@/services/user";
import { useUserStore } from "@/store/user";
import { useQuery } from "@tanstack/react-query";
import { useEffect } from "react";

export function useFirstPaint() {
  const { setUser } = useUserStore();

  const { data, isPending, error } = useQuery({
    queryKey: ["first-paint"],
    queryFn: () => firstPaintService(),
  });

  useEffect(() => {
    if (data?.info) {
      setUser(data.info);
    }
  }, [data, setUser]);

  return { data, isPending, error };
}
