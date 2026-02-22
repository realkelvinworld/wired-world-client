"use client";

import { EyeIcon, EyeSlashIcon } from "@phosphor-icons/react";
import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { useState } from "react";
import Image from "next/image";
import * as z from "zod";

import {
  UiButton,
  UiField,
  UiInput,
  UiSelect,
  UiSpinner,
} from "@/components/ui";
import { PhoneInput } from "@/components/ui/phone-input";
import { setAuthCookies } from "@/app/auth/actions";
import { useResendOtpStore } from "@/store/auth";
import { useCountry } from "@/hooks/useCountries";
import { signUpService } from "@/services/auth";
import { useUserStore } from "@/store/user";
import { getDeviceInfo } from "@/lib/utils";
import { routes } from "@/routes";
import { toast } from "sonner";

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

type SignUpFormValues = z.infer<typeof formSchema>;

export default function SignUp() {
  // State
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [loading, setLoading] = useState(false);

  // Hooks
  const { otpStore } = useResendOtpStore();
  const { data: country } = useCountry();
  const { setUser } = useUserStore();
  const router = useRouter();

  const form = useForm<SignUpFormValues>({
    resolver: zodResolver(formSchema),
    mode: "all",
    defaultValues: {
      first_name: "",
      last_name: "",
      email: otpStore?.email ?? "",
      phone: "",
      password: "",
      country_id: "",
      confirm_password: "",
    },
  });

  function onSubmit(data: SignUpFormValues) {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { confirm_password, ...rest } = data;
    const device = getDeviceInfo();

    const payload = {
      ...rest,
      country_id: Number(rest.country_id),
      device: `${device.browser.name} / ${device.os}`,
    };
    setLoading(true);
    signUpService(payload)
      .then(async (data) => {
        toast.success("Account created successfully");
        setUser(data.info.user);
        await setAuthCookies(
          data.info.token,
          data.info.user.is_staff && data.info.user.staff_role
            ? data.info.user.staff_role
            : undefined,
        );
        form.reset();
        router.push(routes.user.dashboard);
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
          name="country_id"
          control={form.control}
          render={({ field, fieldState }) => (
            <UiField.Field data-invalid={fieldState.invalid} className="w-full">
              <UiField.FieldLabel>Country</UiField.FieldLabel>
              <UiSelect.Select
                value={field.value}
                onValueChange={field.onChange}
              >
                <UiSelect.SelectTrigger
                  aria-invalid={fieldState.invalid}
                  className="py-5"
                >
                  <UiSelect.SelectValue placeholder="Select a country" />
                </UiSelect.SelectTrigger>
                <UiSelect.SelectContent>
                  {country?.info?.map((c) => (
                    <UiSelect.SelectItem key={c.id} value={c.id.toString()}>
                      <Image
                        src={c.image}
                        alt={c.name}
                        width={20}
                        height={16}
                        className="inline-block rounded-sm object-cover"
                      />
                      {c.name}
                    </UiSelect.SelectItem>
                  ))}
                </UiSelect.SelectContent>
              </UiSelect.Select>
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
        disabled={loading || !form.formState.isValid}
        className="w-full"
      >
        {loading ? (
          <UiSpinner.Spinner className="text-secondary" />
        ) : (
          " Create Account"
        )}
      </UiButton.Button>
    </form>
  );
}
