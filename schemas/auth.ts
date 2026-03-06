import * as z from "zod";

// Login
export const loginFormSchema = z.object({
  email: z
    .string()
    .min(1, "Email is required.")
    .email("Please enter a valid email address."),
  password: z.string().min(1, "Password is required."),
});

export type LoginFormValues = z.infer<typeof loginFormSchema>;

// Login OTP
export const loginOtpSchema = z.object({
  otp: z.string().length(6, "Please enter all 6 digits."),
});

export type LoginOtpValues = z.infer<typeof loginOtpSchema>;

// Verify Email (sign-up step 1)
export const verifyEmailSchema = z.object({
  email: z
    .string()
    .min(1, "Email is required.")
    .email("Please enter a valid email address."),
});

export type VerifyFormValues = z.infer<typeof verifyEmailSchema>;

// Sign-up OTP
export const signUpOtpSchema = z.object({
  otp: z.string().length(6, "Please enter all 6 digits."),
});

export type SignUpOtpValues = z.infer<typeof signUpOtpSchema>;

// Sign-up
export const signUpFormSchema = z
  .object({
    first_name: z
      .string()
      .min(2, "First name must be at least 2 characters.")
      .max(32, "First name must be at most 32 characters."),
    last_name: z
      .string()
      .min(2, "Last name must be at least 2 characters.")
      .max(32, "Last name must be at most 32 characters."),
    country_id: z.string(),
    email: z
      .string()
      .min(1, "Email is required.")
      .email("Please enter a valid email address."),
    phone: z
      .string()
      .min(10, "Enter a valid phone number.")
      .refine((value) => /^\d+$/.test(value.replace(/\+/g, "")), {
        message: "Phone number must be numeric.",
      }),
    password: z.string().min(8, "Password must be at least 8 characters."),
    confirm_password: z.string(),
  })
  .refine((data) => data.password === data.confirm_password, {
    message: "Passwords do not match.",
    path: ["confirm_password"],
  });

export type SignUpFormValues = z.infer<typeof signUpFormSchema>;

// Forgot Password - Request
export const forgotPasswordRequestSchema = z.object({
  email: z
    .string()
    .min(1, "Email is required.")
    .email("Please enter a valid email address."),
});

export type ForgotPasswordRequestValues = z.infer<
  typeof forgotPasswordRequestSchema
>;

// Forgot Password - Reset
export const forgotPasswordResetSchema = z
  .object({
    otp: z.string().length(6, "Please enter all 6 digits."),
    password: z.string().min(8, "Password must be at least 8 characters."),
    confirm_password: z.string(),
  })
  .refine((data) => data.password === data.confirm_password, {
    message: "Passwords do not match.",
    path: ["confirm_password"],
  });

export type ForgotPasswordResetValues = z.infer<
  typeof forgotPasswordResetSchema
>;
