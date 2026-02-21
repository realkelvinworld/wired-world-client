"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm } from "react-hook-form";
import * as z from "zod";

import { UiButton, UiField, UiInputOtp } from "@/components/ui";

const formSchema = z.object({
  otp: z.string().length(6, "Please enter all 6 digits."),
});

type OtpFormValues = z.infer<typeof formSchema>;

export default function LoginOtp() {
  const form = useForm<OtpFormValues>({
    resolver: zodResolver(formSchema),
    mode: "all",
    defaultValues: {
      otp: "",
    },
  });

  function onSubmit(data: OtpFormValues) {
    console.log("Login OTP output:", data);
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
        disabled={form.formState.isSubmitting || !form.formState.isValid}
        className="w-full max-w-xs"
      >
        Verify code
      </UiButton.Button>
    </form>
  );
}
