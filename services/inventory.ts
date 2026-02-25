import { BaseApiResponse, PaginatedApiResponse } from "@/interfaces";
import { Category } from "@/models/category";
import { Product } from "@/models/product";
import { Review } from "@/models/review";
import { Brand } from "@/models/brand";

import { http } from "../lib/http";

// Main Categories
export const getCategoriesService = (payload?: { id: number }) =>
  http.post<BaseApiResponse<Category[]>>(
    `/inventory/main_categories/${payload?.id ?? ""}`,
  );
// Sub categories
export const getSubCategoriesService = (payload: { id: number }) =>
  http.post<BaseApiResponse<Category[]>>(
    `/inventory/sub_categories/${payload.id}`,
  );

// Products
export const getProductsService = (params: {
  type: "list";
  sorting_order?: string;
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
  };
  drop?: number;
  page?: number;
}) => http.post<PaginatedApiResponse<Product[]>>(`/inventory/items/`, params);

// Product Details
export const getProductsDetailsService = (payload: {
  type: "item";
  id: number;
}) => http.post<BaseApiResponse<Product>>(`/inventory/items/`, payload);

// Product Reviews
export const getProductReviewsService = (params: {
  type: "reviews";
  item_id: number;
  page?: number;
  drop?: number;
}) => http.post<PaginatedApiResponse<Review[]>>(`/inventory/items/`, params);

// Brands
export const getBrandsService = (payload?: { id: number }) =>
  http.post<BaseApiResponse<Brand[]>>(
    `/inventory/brands/${payload?.id ?? ""}`,
  );
