/* eslint-disable @typescript-eslint/no-explicit-any */

import { UserModel } from "@/models/user";

// Base API response structure
export interface BaseApiResponse<T = any> {
  success: boolean;
  info: T;
}

// Pagination structure
export interface Paginator {
  items: number;
  total_items: number;
  previous_page: number;
  next_page: number;
  next: boolean;
  prev: boolean;
}

// API response with optional pagination
export interface PaginatedApiResponse<T = any> extends BaseApiResponse<T> {
  paginator?: Paginator;
}

// Country
export interface Country {
  id: number;
  name: string;
  short_name: string;
  phone_code: string;
  currency: string;
  currency_symbol: string;
  currency_code: string;
  enabled: boolean;
  image: string;
}

// Login response
export interface LoginResponse {
  two_factor: string;
  user?: UserModel;
  token: string;
}

// Product filters
export interface FiltersInterface {
  type?: string;
  filters?: {
    search?: string;
    sub_category_id?: number;
    main_category_id?: number;
    min_price?: number;
    max_price?: number;
    min_rating?: number;
    max_rating?: number;
    on_promotion?: boolean;
    brand_id?: number;
  } | null;
  drop?: number;
  page?: number;
}
