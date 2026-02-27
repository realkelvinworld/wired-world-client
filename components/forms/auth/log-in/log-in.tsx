"use client";

import { EyeIcon, EyeSlashIcon } from "@phosphor-icons/react";
import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";
import * as z from "zod";
import Link from "next/link";

import { UiButton, UiField, UiInput, UiSpinner } from "@/components/ui";
import { setAuthCookies } from "@/app/auth/actions";
import { useWebTokenStore } from "@/store/auth";
import { loginService } from "@/services/auth";
import { useUserStore } from "@/store/user";
import { getDeviceInfo } from "@/lib/utils";
import { routes } from "@/routes";

const formSchema = z.object({
  email: z
    .string()
    .min(1, "Email is required.")
    .email("Please enter a valid email address."),
  password: z.string().min(1, "Password is required."),
});

type LoginFormValues = z.infer<typeof formSchema>;

export default function LogIn() {
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const { setWebToken } = useWebTokenStore();
  const { setUser } = useUserStore();
  const router = useRouter();

  const form = useForm<LoginFormValues>({
    resolver: zodResolver(formSchema),
    mode: "all",
    defaultValues: {
      email: "",
      password: "",
    },
  });

  function onSubmit(data: LoginFormValues) {
    const device = getDeviceInfo();

    const payload = {
      email: data.email,
      password: data.password,
      device: `${device.browser.name} / ${device.os}`,
    };

    setLoading(true);
    loginService(payload)
      .then(async (res) => {
        if (res.info.two_factor) {
          setWebToken(res.info.token);
          toast.success("Verification code sent to your email.");
          router.push(routes.auth.login.otpInput);
        } else {
          await setAuthCookies(
            res.info.token,
            res.info.user?.is_staff && res.info.user?.staff_role
              ? res.info.user.staff_role
              : undefined,
          );
          setUser(res.info.user!);
          toast.success("Welcome back!");
          router.push(routes.user.dashboard);
        }
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
              <UiField.FieldLabel htmlFor="login-email">
                Email address
              </UiField.FieldLabel>
              <UiInput.Input
                {...field}
                id="login-email"
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

        <Controller
          name="password"
          control={form.control}
          render={({ field, fieldState }) => (
            <UiField.Field data-invalid={fieldState.invalid}>
              <UiField.FieldLabel htmlFor="login-password">
                Password
              </UiField.FieldLabel>
              <div className="relative">
                <UiInput.Input
                  {...field}
                  id="login-password"
                  type={showPassword ? "text" : "password"}
                  aria-invalid={fieldState.invalid}
                  placeholder="Enter your password"
                  autoComplete="current-password"
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
      </UiField.FieldGroup>

      <div className="flex justify-end -mt-2">
        <Link
          href={routes.auth.forgotPassword.request}
          className="text-sm text-muted-foreground hover:text-foreground underline underline-offset-4"
        >
          Forgot password?
        </Link>
      </div>

      <UiButton.Button
        type="submit"
        disabled={loading || !form.formState.isValid}
        className="w-full"
      >
        {loading ? <UiSpinner.Spinner className="text-secondary" /> : "Sign in"}
      </UiButton.Button>
    </form>
  );
}
