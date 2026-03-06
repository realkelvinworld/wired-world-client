import * as z from "zod";

export const guestCheckoutSchema = z.object({
  first_name: z.string().min(1, "First name is required"),
  last_name: z.string().min(1, "Last name is required"),
  email: z.string().email("Enter a valid email address"),
  phone: z
    .string()
    .min(10, "Enter a valid phone number.")
    .refine((value) => /^\d+$/.test(value.replace(/\+/g, "")), {
      message: "Phone number must be numeric.",
    }),
  country_id: z.string().min(1, "Select a country"),
  company_name: z.string().optional(),
  notes: z.string().optional(),
  street_address: z.string().min(1, "Street address is required"),
  apartment: z.string().optional(),
  city: z.string().min(1, "City is required"),
  region: z.string().min(1, "Region is required"),
  zip: z.string().min(1, "ZIP code is required"),
});

export type GuestFormValues = z.infer<typeof guestCheckoutSchema>;

export const newAddressSchema = z.object({
  street_address: z.string().min(1, "Street address is required"),
  apartment: z.string().optional(),
  city: z.string().min(1, "City is required"),
  region: z.string().min(1, "Region is required"),
  zip: z.string().min(1, "ZIP code is required"),
});

export type NewAddressValues = z.infer<typeof newAddressSchema>;
