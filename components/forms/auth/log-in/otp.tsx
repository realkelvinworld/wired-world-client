"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";
import * as z from "zod";

import { UiButton, UiField, UiInputOtp, UiSpinner } from "@/components/ui";
import { setAuthCookies } from "@/app/auth/actions";
import { loginVerifyService } from "@/services/auth";
import { useWebTokenStore } from "@/store/auth";
import { useUserStore } from "@/store/user";
import { getDeviceInfo } from "@/lib/utils";
import { routes } from "@/routes";

const formSchema = z.object({
  otp: z.string().length(6, "Please enter all 6 digits."),
});

type OtpFormValues = z.infer<typeof formSchema>;

export default function LoginOtp() {
  const [loading, setLoading] = useState(false);

  const { webToken, clearWebToken } = useWebTokenStore();
  const { setUser } = useUserStore();
  const router = useRouter();

  const form = useForm<OtpFormValues>({
    resolver: zodResolver(formSchema),
    mode: "all",
    defaultValues: {
      otp: "",
    },
  });

  function onSubmit(data: OtpFormValues) {
    const device = getDeviceInfo();

    const payload = {
      token: webToken ?? "",
      code: data.otp,
      device: `${device.browser.name} / ${device.os}`,
    };

    setLoading(true);
    loginVerifyService(payload)
      .then(async (res) => {
        setUser(res.info.user);
        await setAuthCookies(
          res.info.token,
          res.info.user.is_staff && res.info.user.staff_role
            ? res.info.user.staff_role
            : undefined,
        );
        clearWebToken();
        toast.success("Welcome back!");
        router.replace(routes.user.dashboard);
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
          "Verify code"
        )}
      </UiButton.Button>
    </form>
  );
}
