import * as z from "zod";

export const contactFormSchema = z.object({
  full_name: z
    .string()
    .min(5, "Full name must be at least 5 characters.")
    .max(32, "Full name must be at most 32 characters."),
  email: z
    .string()
    .min(5, "Email must be at least 5 characters.")
    .max(32, "Email must be at most 32 characters.")
    .email("Please enter a valid email address."),
  phone_number: z
    .string()
    .min(10, "Enter a valid mobile number")
    .refine((value) => /^\d+$/.test(value.replace(/\+/g, "")), {
      message: "Phone number must be numeric",
    }),
  message: z
    .string()
    .min(20, "Message must be at least 20 characters.")
    .max(100, "Message must be at most 100 characters."),
});

export type ContactFormValues = z.infer<typeof contactFormSchema>;
