"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";

import { UiButton, UiField, UiInputOtp, UiSpinner } from "@/components/ui";
import { signUpOtpSchema, type SignUpOtpValues } from "@/schemas/auth";
import { requestEmailService, verifyEmailService } from "@/services/auth";
import { useResendOtpStore } from "@/store/auth";
import { routes } from "@/routes";

export default function SignUpOtp() {
  // state
  const [loading, setLoading] = useState(false);

  // hooks
  const router = useRouter();
  const { otpStore, setOtpStore } = useResendOtpStore();

  const form = useForm<SignUpOtpValues>({
    resolver: zodResolver(signUpOtpSchema),
    mode: "all",
    defaultValues: {
      otp: "",
    },
  });

  // functions
  function onSubmit(data: SignUpOtpValues) {
    setLoading(true);
    verifyEmailService({
      email: otpStore?.email ?? "",
      type: "verify",
      code: data.otp,
    })
      .then((data) => {
        setOtpStore({
          ...otpStore,
          isVerified: true,
        });
        toast.success(
          data.info || "Verification email sent! Please check your inbox.",
        );
        router.push(routes.auth.signUp.signUpUser);
        form.reset();
      })
      .finally(() => {
        setLoading(false);
      });
  }

  function handleResend() {
    setLoading(true);
    requestEmailService({
      email: otpStore?.email ?? "",
      type: "request",
    })
      .then((data) => {
        toast.success(
          data.info || "Verification email sent! Please check your inbox.",
        );
        form.reset();
      })
      .finally(() => {
        setLoading(false);
      });
  }

  return (
    <form
      onSubmit={form.handleSubmit(onSubmit)}
      className="flex w-full max-w-sm flex-col items-center gap-6"
    >
      <UiField.FieldGroup className="items-center">
        <Controller
          name="otp"
          control={form.control}
          render={({ field, fieldState }) => (
            <UiField.Field
              data-invalid={fieldState.invalid}
              className="items-center"
            >
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
              <UiField.FieldDescription className="text-center">
                Didn&apos;t receive a code?{" "}
                <button
                  type="button"
                  className="font-medium text-primary underline underline-offset-4"
                  onClick={handleResend}
                >
                  Resend
                </button>
              </UiField.FieldDescription>
            </UiField.Field>
          )}
        />
      </UiField.FieldGroup>

      <UiButton.Button
        type="submit"
        disabled={loading || !form.formState.isValid}
        className="w-full max-w-xs"
      >
        {loading ? (
          <UiSpinner.Spinner className="text-secondary" />
        ) : (
          " Verify Code"
        )}
      </UiButton.Button>
    </form>
  );
}
