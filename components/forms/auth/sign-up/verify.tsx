"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm } from "react-hook-form";
import { MailboxIcon } from "@phosphor-icons/react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";

import { verifyEmailSchema, type VerifyFormValues } from "@/schemas/auth";
import { UiButton, UiField, UiInput, UiSpinner } from "@/components/ui";
import { requestEmailService } from "@/services/auth";
import { useResendOtpStore } from "@/store/auth";
import { routes } from "@/routes";

export default function Verify() {
  // state
  const [loading, setLoading] = useState(false);

  // hooks
  const router = useRouter();
  const { setOtpStore } = useResendOtpStore();

  const form = useForm<VerifyFormValues>({
    resolver: zodResolver(verifyEmailSchema),
    mode: "all",
    defaultValues: {
      email: "",
    },
  });

  // functions
  function onSubmit(data: VerifyFormValues) {
    setLoading(true);
    // set temporary data
    setOtpStore({ email: data.email, type: "request" });
    requestEmailService({ email: data.email, type: "request" })
      .then((data) => {
        toast.success(
          data.info || "Verification email sent! Please check your inbox.",
          {
            icon: <MailboxIcon className="h-4 w-4 text-green-500" />,
          },
        );
        form.reset();
        router.push(routes.auth.signUp.otpInput);
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
          name="email"
          control={form.control}
          render={({ field, fieldState }) => (
            <UiField.Field data-invalid={fieldState.invalid}>
              <UiField.FieldLabel htmlFor="email">
                Email address
              </UiField.FieldLabel>
              <UiInput.Input
                {...field}
                id="email"
                type="email"
                aria-invalid={fieldState.invalid}
                placeholder="you@example.com"
                autoComplete="email"
                className="shadow-none py-5"
              />
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
          " Continue"
        )}
      </UiButton.Button>
    </form>
  );
}
