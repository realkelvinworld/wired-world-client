"use client";

import { EyeIcon, EyeSlashIcon } from "@phosphor-icons/react";
import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";
import * as z from "zod";

import { UiButton, UiField, UiInput, UiInputOtp, UiSpinner } from "@/components/ui";
import { forgotPasswordResetService } from "@/services/auth";
import { useForgotPasswordStore } from "@/store/auth";
import { routes } from "@/routes";

const formSchema = z
  .object({
    otp: z.string().length(6, "Please enter all 6 digits."),
    password: z.string().min(8, "Password must be at least 8 characters."),
    confirm_password: z.string(),
  })
  .refine((data) => data.password === data.confirm_password, {
    message: "Passwords do not match.",
    path: ["confirm_password"],
  });

type ResetFormValues = z.infer<typeof formSchema>;

export default function ForgotPasswordReset() {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [loading, setLoading] = useState(false);

  const { email } = useForgotPasswordStore();
  const router = useRouter();

  const form = useForm<ResetFormValues>({
    resolver: zodResolver(formSchema),
    mode: "all",
    defaultValues: {
      otp: "",
      password: "",
      confirm_password: "",
    },
  });

  function onSubmit(data: ResetFormValues) {
    setLoading(true);
    forgotPasswordResetService({
      email: email ?? "",
      type: "reset",
      code: data.otp,
      password: data.password,
    })
      .then((res) => {
        toast.success(res.info || "Password reset successfully.");
        router.push(routes.auth.login.login);
      })
      .finally(() => {
        setLoading(false);
      });
  }

  return (
    <form
      onSubmit={form.handleSubmit(onSubmit)}
      className="flex w-full max-w-sm flex-col gap-6"
    >
      <UiField.FieldGroup>
        <Controller
          name="otp"
          control={form.control}
          render={({ field, fieldState }) => (
            <UiField.Field
              data-invalid={fieldState.invalid}
              className="items-center"
            >
              <UiField.FieldLabel>Verification code</UiField.FieldLabel>
              <UiInputOtp.InputOTP
                maxLength={6}
                value={field.value}
                onChange={field.onChange}
              >
                <UiInputOtp.InputOTPGroup>
                  <UiInputOtp.InputOTPSlot
                    index={0}
                    className="h-12 w-12 text-lg"
                  />
                  <UiInputOtp.InputOTPSlot
                    index={1}
                    className="h-12 w-12 text-lg"
                  />
                  <UiInputOtp.InputOTPSlot
                    index={2}
                    className="h-12 w-12 text-lg"
                  />
                </UiInputOtp.InputOTPGroup>
                <UiInputOtp.InputOTPSeparator />
                <UiInputOtp.InputOTPGroup>
                  <UiInputOtp.InputOTPSlot
                    index={3}
                    className="h-12 w-12 text-lg"
                  />
                  <UiInputOtp.InputOTPSlot
                    index={4}
                    className="h-12 w-12 text-lg"
                  />
                  <UiInputOtp.InputOTPSlot
                    index={5}
                    className="h-12 w-12 text-lg"
                  />
                </UiInputOtp.InputOTPGroup>
              </UiInputOtp.InputOTP>
              {fieldState.invalid && (
                <UiField.FieldError errors={[fieldState.error]} />
              )}
            </UiField.Field>
          )}
        />

        <Controller
          name="password"
          control={form.control}
          render={({ field, fieldState }) => (
            <UiField.Field data-invalid={fieldState.invalid}>
              <UiField.FieldLabel htmlFor="reset-password">
                New password
              </UiField.FieldLabel>
              <div className="relative">
                <UiInput.Input
                  {...field}
                  id="reset-password"
                  type={showPassword ? "text" : "password"}
                  aria-invalid={fieldState.invalid}
                  placeholder="At least 8 characters"
                  autoComplete="new-password"
                  className="shadow-none py-5 pr-10"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                >
                  {showPassword ? (
                    <EyeSlashIcon size={18} />
                  ) : (
                    <EyeIcon size={18} />
                  )}
                </button>
              </div>
              {fieldState.invalid && (
                <UiField.FieldError errors={[fieldState.error]} />
              )}
            </UiField.Field>
          )}
        />

        <Controller
          name="confirm_password"
          control={form.control}
          render={({ field, fieldState }) => (
            <UiField.Field data-invalid={fieldState.invalid}>
              <UiField.FieldLabel htmlFor="reset-confirm-password">
                Confirm password
              </UiField.FieldLabel>
              <div className="relative">
                <UiInput.Input
                  {...field}
                  id="reset-confirm-password"
                  type={showConfirm ? "text" : "password"}
                  aria-invalid={fieldState.invalid}
                  placeholder="Re-enter your password"
                  autoComplete="new-password"
                  className="shadow-none py-5 pr-10"
                />
                <button
                  type="button"
                  onClick={() => setShowConfirm(!showConfirm)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                >
                  {showConfirm ? (
                    <EyeSlashIcon size={18} />
                  ) : (
                    <EyeIcon size={18} />
                  )}
                </button>
              </div>
              {fieldState.invalid && (
                <UiField.FieldError errors={[fieldState.error]} />
              )}
            </UiField.Field>
          )}
        />
      </UiField.FieldGroup>

      <UiButton.Button
        type="submit"
        disabled={loading || !form.formState.isValid}
        className="w-full"
      >
        {loading ? (
          <UiSpinner.Spinner className="text-secondary" />
        ) : (
          "Reset password"
        )}
      </UiButton.Button>
    </form>
  );
}
