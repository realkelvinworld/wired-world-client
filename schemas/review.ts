import * as z from "zod";

export const reviewFormSchema = z.object({
  rating: z.number().min(1, "Please select a rating.").max(5),
  review: z
    .string()
    .min(3, "Review must be at least 3 characters.")
    .max(500, "Review must be at most 500 characters."),
});

export type ReviewFormValues = z.infer<typeof reviewFormSchema>;
