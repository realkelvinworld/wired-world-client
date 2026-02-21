"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm } from "react-hook-form";
import * as z from "zod";

import { UiButton, UiField, UiInput } from "@/components/ui";

const formSchema = z.object({
  email: z
    .string()
    .min(1, "Email is required.")
    .email("Please enter a valid email address."),
});

type VerifyFormValues = z.infer<typeof formSchema>;

export default function Verify() {
  const form = useForm<VerifyFormValues>({
    resolver: zodResolver(formSchema),
    mode: "all",
    defaultValues: {
      email: "",
    },
  });

  function onSubmit(data: VerifyFormValues) {
    console.log("Verify form output:", data);
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
        disabled={form.formState.isSubmitting || !form.formState.isValid}
        className="w-full"
      >
        Continue
      </UiButton.Button>
    </form>
  );
}
