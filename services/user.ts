import { BaseApiResponse, PaginatedApiResponse } from "@/interfaces";
import {
  GuestOrderPayload,
  CartPreview,
  PaystackInfo,
} from "@/models/checkout";
import { WishlistItem } from "@/models/wishlist";
import { UserModel } from "@/models/user";
import { Address } from "@/models/address";
import { Order } from "@/models/order";
import { Cart } from "@/models/cart";

import { http } from "../lib/http";

// First Paint
export const firstPaintService = () =>
  http.post<BaseApiResponse<UserModel>>(`/user/first_paint/`);

// Update Profile
export const updateProfileService = (payload: {
  first_name: string;
  last_name: string;
  phone: string;
  image: string | null;
  country_id: number;
  language_id: number;
}) => http.post<BaseApiResponse<UserModel>>(`/user/update_profile/`, payload);

// Order History
export type OrderStatus =
  | "pending"
  | "processing"
  | "shipped"
  | "delivered"
  | "cancelled";

export const getOrderHistoryService = (params: {
  type: "history";
  page?: number;
  drop?: number;
  filters?: {
    search?: string;
    status?: OrderStatus;
  };
}) => http.post<PaginatedApiResponse<Order[]>>(`/user/order/`, params);

// Cart
export const getCartService = () =>
  http.post<BaseApiResponse<Cart>>(`/user/cart/`, { type: "get" });

export const addToCartService = (payload: {
  type: "add";
  id: number;
  quantity: number;
}) => http.post<BaseApiResponse<Cart>>(`/user/cart/`, payload);

export const removeFromCartService = (id: number) =>
  http.post<BaseApiResponse<string>>(`/user/cart/`, { type: "remove", id });

export const clearCartService = () =>
  http.post<BaseApiResponse<string>>(`/user/cart/`, { type: "clear" });

// Wishlist
export const getWishlistService = () =>
  http.post<BaseApiResponse<WishlistItem[]>>(`/user/wish_list/`, {
    type: "get",
  });

export const addToWishlistService = (id: number) =>
  http.post<BaseApiResponse<string>>(`/user/wish_list/`, { type: "add", id });

export const removeFromWishlistService = (id: number) =>
  http.post<BaseApiResponse<string>>(`/user/wish_list/`, {
    type: "remove",
    id,
  });

export const clearWishlistService = () =>
  http.post<BaseApiResponse<string>>(`/user/compare_list/`, { type: "clear" });

// Addresses
export const listAddressesService = () =>
  http.post<BaseApiResponse<Address[]>>(`/user/address/`, { type: "list" });

export const getAddressService = (id: number) =>
  http.post<BaseApiResponse<Address>>(`/user/address/`, { type: "get", id });

export const addAddressService = (payload: {
  street_address: string;
  apartment?: string;
  city: string;
  region: string;
  zip: string;
}) =>
  http.post<BaseApiResponse<string>>(`/user/address/`, {
    type: "add",
    ...payload,
  });

export const updateAddressService = (payload: {
  id: number;
  street_address?: string;
  apartment?: string;
  city?: string;
  region?: string;
  zip?: string;
}) =>
  http.post<BaseApiResponse<string>>(`/user/address/`, {
    type: "update",
    ...payload,
  });

export const deleteAddressService = (id: number) =>
  http.post<BaseApiResponse<string>>(`/user/address/`, { type: "delete", id });

// Checkout
export const previewCartService = (
  cart: { item_id: number; quantity: number }[],
) => http.post<BaseApiResponse<CartPreview>>(`/user/preview_cart/`, cart);

export const guestOrderService = (payload: GuestOrderPayload) =>
  http.post<BaseApiResponse<PaystackInfo>>(`/user/guest_order/`, payload);

// Authenticated order
export const createOrderService = (address_id: number) =>
  http.post<BaseApiResponse<PaystackInfo>>(`/user/order/`, {
    type: "create_order",
    address_id,
  });

export const getOrderService = (id: number) =>
  http.post<BaseApiResponse<Order>>(`/user/order/`, { type: "order", id });

// Sync local cart to server after login/signup
export const addFullCartService = (
  items: { item_id: number; quantity: number }[],
) =>
  http.post<BaseApiResponse<string>>(`/user/cart/`, {
    type: "add_full",
    items,
  });
