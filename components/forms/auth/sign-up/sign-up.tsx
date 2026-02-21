"use client";

import { EyeIcon, EyeSlashIcon } from "@phosphor-icons/react";
import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm } from "react-hook-form";
import { useState } from "react";
import * as z from "zod";

import { UiButton, UiField, UiInput } from "@/components/ui";
import { PhoneInput } from "@/components/ui/phone-input";
import { getDeviceInfo } from "@/lib/utils";

const formSchema = z
  .object({
    first_name: z
      .string()
      .min(2, "First name must be at least 2 characters.")
      .max(32, "First name must be at most 32 characters."),
    last_name: z
      .string()
      .min(2, "Last name must be at least 2 characters.")
      .max(32, "Last name must be at most 32 characters."),
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

type SignUpFormValues = z.infer<typeof formSchema>;

export default function SignUp() {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  const form = useForm<SignUpFormValues>({
    resolver: zodResolver(formSchema),
    mode: "all",
    defaultValues: {
      first_name: "",
      last_name: "",
      email: "",
      phone: "",
      password: "",
      confirm_password: "",
    },
  });

  function onSubmit(data: SignUpFormValues) {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { confirm_password, ...rest } = data;
    const device = getDeviceInfo();

    const payload = {
      ...rest,
      country_id: 1,
      device: `${device.browser.name} / ${device.os}`,
    };

    console.log("Sign-up form output:", payload);
  }

  return (
    <form
      onSubmit={form.handleSubmit(onSubmit)}
      className="flex w-full max-w-sm flex-col gap-6"
    >
      <UiField.FieldGroup>
        <div className="grid grid-cols-2 gap-4">
          <Controller
            name="first_name"
            control={form.control}
            render={({ field, fieldState }) => (
              <UiField.Field data-invalid={fieldState.invalid}>
                <UiField.FieldLabel htmlFor="first_name">
                  First name
                </UiField.FieldLabel>
                <UiInput.Input
                  {...field}
                  id="first_name"
                  aria-invalid={fieldState.invalid}
                  placeholder="Kelvin"
                  autoComplete="given-name"
                  className="shadow-none py-5"
                />
                {fieldState.invalid && (
                  <UiField.FieldError errors={[fieldState.error]} />
                )}
              </UiField.Field>
            )}
          />
          <Controller
            name="last_name"
            control={form.control}
            render={({ field, fieldState }) => (
              <UiField.Field data-invalid={fieldState.invalid}>
                <UiField.FieldLabel htmlFor="last_name">
                  Last name
                </UiField.FieldLabel>
                <UiInput.Input
                  {...field}
                  id="last_name"
                  aria-invalid={fieldState.invalid}
                  placeholder="Selassie"
                  autoComplete="family-name"
                  className="shadow-none py-5"
                />
                {fieldState.invalid && (
                  <UiField.FieldError errors={[fieldState.error]} />
                )}
              </UiField.Field>
            )}
          />
        </div>

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
                placeholder="kelvin@example.com"
                autoComplete="email"
                className="shadow-none py-5"
              />
              {fieldState.invalid && (
                <UiField.FieldError errors={[fieldState.error]} />
              )}
            </UiField.Field>
          )}
        />

        <Controller
          name="phone"
          control={form.control}
          render={({ field, fieldState }) => (
            <UiField.Field data-invalid={fieldState.invalid}>
              <UiField.FieldLabel htmlFor="phone">
                Phone number
              </UiField.FieldLabel>
              <PhoneInput
                id="phone"
                placeholder="Enter phone number"
                defaultCountry="GH"
                {...field}
                value={field.value}
                onChange={field.onChange}
                className="rounded"
              />
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
              <UiField.FieldLabel htmlFor="password">
                Password
              </UiField.FieldLabel>
              <div className="relative">
                <UiInput.Input
                  {...field}
                  id="password"
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
              <UiField.FieldLabel htmlFor="confirm_password">
                Confirm password
              </UiField.FieldLabel>
              <div className="relative">
                <UiInput.Input
                  {...field}
                  id="confirm_password"
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
        disabled={form.formState.isSubmitting || !form.formState.isValid}
        className="w-full"
      >
        Create account
      </UiButton.Button>
    </form>
  );
}
