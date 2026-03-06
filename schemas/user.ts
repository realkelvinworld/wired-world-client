import * as z from "zod";

export const profileFormSchema = z.object({
  first_name: z
    .string()
    .min(2, "First name must be at least 2 characters.")
    .max(32, "First name must be at most 32 characters."),
  last_name: z
    .string()
    .min(2, "Last name must be at least 2 characters.")
    .max(32, "Last name must be at most 32 characters."),
  phone: z
    .string()
    .min(10, "Enter a valid phone number.")
    .refine((value) => /^\d+$/.test(value.replace(/\+/g, "")), {
      message: "Phone number must be numeric.",
    }),
  country_id: z.string().min(1, "Please select a country."),
  language_id: z.string().min(1, "Please select a language."),
});

export type ProfileFormValues = z.infer<typeof profileFormSchema>;
