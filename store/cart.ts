import { persist } from "zustand/middleware";
import { create } from "zustand";
import { produce } from "immer";

import { Product } from "@/models/product";

interface CartState {
  cart:
    | {
        quantity: number;
        item: Product;
      }[]
    | null;
  setCart: (cart: Product[]) => void;
  addItem: (item: Product, quantity: number) => boolean;
  removeItem: (id: number) => void;
  updateQuantity: (id: number, quantity: number) => void;
  updateCart: (updater: (draft: Product[]) => void) => void;
  clearCart: () => void;
}

export const useCartStore = create<CartState>()(
  persist(
    (set, get) => ({
      cart: [],
      addItem: (item: Product, quantity: number) => {
        const existingItem = get().cart?.find((i) => i.item.id === item.id);
        const currentQuantity = existingItem?.quantity ?? 0;
        if (currentQuantity + quantity > item.stock) return false;

        set(() => {
          const currentCart = get().cart ?? [];

          if (existingItem) {
            return {
              cart: currentCart.map((i) =>
                i.item.id === item.id
                  ? { ...i, quantity: i.quantity + quantity }
                  : i,
              ),
            };
          } else {
            return { cart: [...currentCart, { item, quantity }] };
          }
        });

        return true;
      },
      removeItem: (id: number) => {
        set((state) => {
          return { cart: state.cart?.filter((f) => f.item.id !== id) ?? [] };
        });
      },
      updateQuantity: (id: number, quantity: number) => {
        set((state) => {
          return {
            cart:
              state.cart?.map((i) =>
                i.item.id === id
                  ? { ...i, quantity: i.quantity + quantity }
                  : i,
              ) ?? [],
          };
        });
      },
      setCart: (cart: Product[]) =>
        set({ cart: cart.map((item) => ({ item, quantity: 1 })) }),
      updateCart: (updater) =>
        set(
          produce((state: CartState) => {
            if (state.cart) updater(state.cart.map((i) => i.item));
          }),
        ),

      clearCart: () => set({ cart: [] }),
    }),
    {
      name: "wired-world-cart-state",
    },
  ),
);
