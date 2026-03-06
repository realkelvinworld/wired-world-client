"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm } from "react-hook-form";
import { MailboxIcon } from "@phosphor-icons/react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";

import {
  forgotPasswordRequestSchema,
  type ForgotPasswordRequestValues,
} from "@/schemas/auth";
import { UiButton, UiField, UiInput, UiSpinner } from "@/components/ui";
import { forgotPasswordRequestService } from "@/services/auth";
import { useForgotPasswordStore } from "@/store/auth";
import { routes } from "@/routes";

export default function ForgotPasswordRequest() {
  // state
  const [loading, setLoading] = useState(false);

  // hooks
  const { setEmail } = useForgotPasswordStore();
  const router = useRouter();

  const form = useForm<ForgotPasswordRequestValues>({
    resolver: zodResolver(forgotPasswordRequestSchema),
    mode: "all",
    defaultValues: {
      email: "",
    },
  });

  // functions
  function onSubmit(data: ForgotPasswordRequestValues) {
    setLoading(true);
    setEmail(data.email);
    forgotPasswordRequestService({ email: data.email, type: "request" })
      .then((res) => {
        toast.success(res.info || "A reset code has been sent to your email.", {
          icon: <MailboxIcon className="h-4 w-4 text-green-500" />,
        });
        router.push(routes.auth.forgotPassword.reset);
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
              <UiField.FieldLabel htmlFor="forgot-email">
                Email address
              </UiField.FieldLabel>
              <UiInput.Input
                {...field}
                id="forgot-email"
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
          "Send reset code"
        )}
      </UiButton.Button>
    </form>
  );
}
