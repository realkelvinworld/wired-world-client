import { BaseApiResponse } from "@/interfaces";
import { Category } from "@/models/category";

import { http } from "../lib/http";

// Main Categories
export const getCategoriesService = (payload?: { id: number }) =>
  http.post<BaseApiResponse<Category[]>>(
    `/inventory/main_categories/${payload?.id ?? ""}`,
  );
