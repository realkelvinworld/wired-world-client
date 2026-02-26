import { BaseApiResponse, PaginatedApiResponse } from "@/interfaces";
import { WishlistItem } from "@/models/wishlist";
import { UserModel } from "@/models/user";
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
export const getOrderHistoryService = (params: {
  type: "history";
  page?: number;
  drop?: number;
  filters?: Record<string, unknown>;
}) => http.post<PaginatedApiResponse<Order[]>>(`/user/order/`, params);

// Cart
export const addToCartService = (payload: { type: "add"; id: number; quantity: number }) =>
  http.post<BaseApiResponse<Cart>>(`/user/cart/`, payload);

// Wishlist
export const getWishlistService = () =>
  http.post<BaseApiResponse<WishlistItem[]>>(`/user/wish_list/`, { type: "get" });

export const addToWishlistService = (id: number) =>
  http.post<BaseApiResponse<string>>(`/user/wish_list/`, { type: "add", id });

export const removeFromWishlistService = (id: number) =>
  http.post<BaseApiResponse<string>>(`/user/wish_list/`, { type: "remove", id });
