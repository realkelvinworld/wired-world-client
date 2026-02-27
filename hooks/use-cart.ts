"use client";

import { useQueryClient, useQuery, useMutation } from "@tanstack/react-query";
import { toast } from "sonner";

import {
  getCartService,
  addToCartService,
  removeFromCartService,
  clearCartService,
} from "@/services/user";

const CART_KEY = ["cart"];

export function useCart() {
  const queryClient = useQueryClient();

  const hasToken =
    typeof document !== "undefined" &&
    document.cookie.includes("access_token");

  const { data, isPending } = useQuery({
    queryKey: CART_KEY,
    queryFn: () => getCartService(),
    enabled: hasToken,
  });

  const items = data?.info?.items ?? [];
  const subtotal = data?.info?.subtotal ?? "";
  const itemCount = items.reduce((sum, item) => sum + item.quantity, 0);

  const addMutation = useMutation({
    mutationFn: (payload: { id: number; quantity: number }) =>
      addToCartService({ type: "add", ...payload }),
    onSuccess: () => toast.success("Added to cart"),
    onSettled: () =>
      queryClient.invalidateQueries({ queryKey: CART_KEY }),
  });

  const removeMutation = useMutation({
    mutationFn: (id: number) => removeFromCartService(id),
    onSuccess: () => toast.success("Removed from cart"),
    onSettled: () =>
      queryClient.invalidateQueries({ queryKey: CART_KEY }),
  });

  const clearMutation = useMutation({
    mutationFn: () => clearCartService(),
    onSuccess: () => toast.success("Cart cleared"),
    onSettled: () =>
      queryClient.invalidateQueries({ queryKey: CART_KEY }),
  });

  return {
    items,
    subtotal,
    itemCount,
    isPending,
    add: addMutation.mutate,
    remove: removeMutation.mutate,
    clear: clearMutation.mutate,
    isAdding: addMutation.isPending,
    isRemoving: removeMutation.isPending,
    isClearing: clearMutation.isPending,
  };
}
