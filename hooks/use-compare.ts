"use client";

import { useQueryClient, useQuery, useMutation } from "@tanstack/react-query";
import { toast } from "sonner";

import {
  getCompareListService,
  addToCompareService,
  removeFromCompareService,
  clearCompareService,
} from "@/services/user";

export const COMPARE_KEY = ["compare"];

export function useCompare() {
  const queryClient = useQueryClient();

  const { data, isPending } = useQuery({
    queryKey: COMPARE_KEY,
    queryFn: () => getCompareListService(),
    enabled: true,
  });

  const items = data?.info ?? [];

  const addMutation = useMutation({
    mutationFn: (id: number) => addToCompareService(id),
    onSuccess: () => toast.success("Added to compare"),
    onSettled: () => queryClient.invalidateQueries({ queryKey: COMPARE_KEY }),
  });

  const removeMutation = useMutation({
    mutationFn: (id: number) => removeFromCompareService(id),
    onSuccess: () => toast.success("Removed from compare"),
    onSettled: () => queryClient.invalidateQueries({ queryKey: COMPARE_KEY }),
  });

  const clearMutation = useMutation({
    mutationFn: () => clearCompareService(),
    onSuccess: () => toast.success("Compare list cleared"),
    onSettled: () => queryClient.invalidateQueries({ queryKey: COMPARE_KEY }),
  });

  const isInCompare = (id: number) => items.some((item) => item.id === id);

  const toggle = (id: number) => {
    if (isInCompare(id)) {
      removeMutation.mutate(id);
    } else {
      addMutation.mutate(id);
    }
  };

  return {
    items,
    isPending,
    isInCompare,
    toggle,
    remove: removeMutation.mutate,
    clear: clearMutation.mutate,
    isToggling: (id: number) =>
      (addMutation.isPending || removeMutation.isPending) &&
      (addMutation.variables === id || removeMutation.variables === id),
    isClearing: clearMutation.isPending,
  };
}
