import { z } from "zod";

export const FiltersSchema = z.object({
  type: z.string().optional(),
  filters: z
    .object({
      search: z.string().optional(),
      sub_category_id: z.number().optional(),
      main_category_id: z.number().optional(),
      min_price: z.number().optional(),
      max_price: z.number().optional(),
      min_rating: z.number().optional(),
      max_rating: z.number().optional(),
      on_promotion: z.boolean().optional(),
    })
    .nullable()
    .optional(),
  drop: z.number().min(1).optional(),
  page: z.number().min(1).optional(),
});
