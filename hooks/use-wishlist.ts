"use client";

import { useQueryClient, useQuery, useMutation } from "@tanstack/react-query";
import { toast } from "sonner";

import {
  getWishlistService,
  addToWishlistService,
  removeFromWishlistService,
  clearWishlistService,
} from "@/services/user";

const WISHLIST_KEY = ["wishlist"];

export function useWishlist() {
  const queryClient = useQueryClient();

  const hasToken =
    typeof document !== "undefined" &&
    document.cookie.includes("access_token");

  const { data, isPending } = useQuery({
    queryKey: WISHLIST_KEY,
    queryFn: () => getWishlistService(),
    enabled: hasToken,
  });

  const items = data?.info ?? [];

  const addMutation = useMutation({
    mutationFn: (id: number) => addToWishlistService(id),
    onSuccess: () => toast.success("Added to wishlist"),
    onSettled: () =>
      queryClient.invalidateQueries({ queryKey: WISHLIST_KEY }),
  });

  const removeMutation = useMutation({
    mutationFn: (id: number) => removeFromWishlistService(id),
    onSuccess: () => toast.success("Removed from wishlist"),
    onSettled: () =>
      queryClient.invalidateQueries({ queryKey: WISHLIST_KEY }),
  });

  const clearMutation = useMutation({
    mutationFn: () => clearWishlistService(),
    onSuccess: () => toast.success("Wishlist cleared"),
    onSettled: () =>
      queryClient.invalidateQueries({ queryKey: WISHLIST_KEY }),
  });

  const isInWishlist = (id: number) => items.some((item) => item.id === id);

  const toggle = (id: number) => {
    if (isInWishlist(id)) {
      removeMutation.mutate(id);
    } else {
      addMutation.mutate(id);
    }
  };

  return {
    items,
    isPending,
    isInWishlist,
    toggle,
    add: addMutation.mutate,
    remove: removeMutation.mutate,
    clear: clearMutation.mutate,
    isToggling: addMutation.isPending || removeMutation.isPending,
    isClearing: clearMutation.isPending,
  };
}
