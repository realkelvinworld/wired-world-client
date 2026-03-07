import { OrderItem } from "./order";

export type CartItem = OrderItem;

export interface Cart {
  subtotal: string;
  fees: string;
  total: string;
  items: CartItem[];
  promo_applied?: string | null;
}
