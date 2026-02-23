import { BaseApiResponse, PaginatedApiResponse } from "@/interfaces";
import { Category } from "@/models/category";
import { Product } from "@/models/product";

import { http } from "../lib/http";

// Main Categories
export const getCategoriesService = (payload?: { id: number }) =>
  http.post<BaseApiResponse<Category[]>>(
    `/inventory/main_categories/${payload?.id ?? ""}`,
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
  };
  drop?: number;
  page?: number;
}) => http.post<PaginatedApiResponse<Product[]>>(`/inventory/items/`, params);
