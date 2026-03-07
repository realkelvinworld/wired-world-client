"use client";

import { useQueryClient, useQuery, useMutation } from "@tanstack/react-query";
import { toast } from "sonner";

import {
  getCartService,
  addToCartService,
  removeFromCartService,
  clearCartService,
  applyPromoService,
  removePromoService,
} from "@/services/user";

const CART_KEY = ["cart"];

export function useCart() {
  const queryClient = useQueryClient();

  const hasToken =
    typeof document !== "undefined" && document.cookie.includes("access_token");

  const { data, isPending } = useQuery({
    queryKey: CART_KEY,
    queryFn: () => getCartService(),
    enabled: hasToken,
  });

  const items = data?.info?.items ?? [];
  const subtotal = data?.info?.subtotal ?? "";
  const fees = data?.info?.fees ?? "";
  const total = data?.info?.total ?? "";
  const promoApplied = data?.info?.promo_applied ?? null;
  const itemCount = items.reduce((sum, item) => sum + item.quantity, 0);

  const addMutation = useMutation({
    mutationFn: (payload: { id: number; quantity: number }) =>
      addToCartService({ type: "add", ...payload }),
    onSuccess: () => toast.success("Added to cart"),
    onSettled: () => queryClient.invalidateQueries({ queryKey: CART_KEY }),
  });

  const removeMutation = useMutation({
    mutationFn: (id: number) => removeFromCartService(id),
    onSuccess: () => toast.success("Removed from cart"),
    onSettled: () => queryClient.invalidateQueries({ queryKey: CART_KEY }),
  });

  const clearMutation = useMutation({
    mutationFn: () => clearCartService(),
    onSuccess: () => toast.success("Cart cleared"),
    onSettled: () => queryClient.invalidateQueries({ queryKey: CART_KEY }),
  });

  const applyPromoMutation = useMutation({
    mutationFn: (promoCode: string) => applyPromoService(promoCode),
    onSuccess: (res) =>
      toast.success(res.info ? "Promo code applied!" : "Promo code applied!"),
    onSettled: () => queryClient.invalidateQueries({ queryKey: CART_KEY }),
  });

  const removePromoMutation = useMutation({
    mutationFn: () => removePromoService(),
    onSuccess: () => toast.success("Promo code removed"),
    onSettled: () => queryClient.invalidateQueries({ queryKey: CART_KEY }),
  });

  return {
    items,
    subtotal,
    fees,
    total,
    promoApplied,
    itemCount,
    isPending,
    add: addMutation.mutate,
    remove: removeMutation.mutate,
    clear: clearMutation.mutate,
    applyPromo: applyPromoMutation.mutate,
    removePromo: removePromoMutation.mutate,
    isAdding: addMutation.isPending,
    isRemoving: removeMutation.isPending,
    isClearing: clearMutation.isPending,
    isApplyingPromo: applyPromoMutation.isPending,
    isRemovingPromo: removePromoMutation.isPending,
  };
}
