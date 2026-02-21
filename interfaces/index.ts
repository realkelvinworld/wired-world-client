/* eslint-disable @typescript-eslint/no-explicit-any */
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
