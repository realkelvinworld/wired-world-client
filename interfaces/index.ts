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

// Login reponse
export interface LoginResponse {
  two_factor: string;
  user?: UserModel;
  token: string;
}
