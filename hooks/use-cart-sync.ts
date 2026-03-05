"use client";

import { useCartStore } from "@/store/cart";
import { addFullCartService } from "@/services/user";

export function useCartSync() {
  const { cart, clearCart } = useCartStore();

  async function syncCart() {
    if (!cart || cart.length === 0) return;

    const items = cart.map((c) => ({
      item_id: c.item.id,
      quantity: c.quantity,
    }));

    try {
      await addFullCartService(items);
    } catch {
      // Non-critical — local cart already cleared, server cart takes over
    } finally {
      clearCart();
    }
  }

  return { syncCart };
}
