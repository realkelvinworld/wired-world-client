"use client";

import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { useEffect } from "react";

import ForgotPasswordReset from "@/components/forms/auth/forgot-password/reset";
import { useForgotPasswordStore } from "@/store/auth";
import { routes } from "@/routes";

export default function ResetPasswordPage() {
  const { email } = useForgotPasswordStore();
  const router = useRouter();

  useEffect(() => {
    if (!email) {
      router.replace(routes.auth.forgotPassword.request);
    }
  }, [email, router]);

  if (!email) return null;

  return (
    <motion.div
      initial={{ opacity: 0, x: 60 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.4, ease: "easeOut" }}
      className="flex flex-col items-center justify-center min-h-[60vh] w-full"
    >
      <div className="flex flex-col items-center justify-center h-full p-4 space-y-6">
        <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary">
          <span className="text-sm font-bold text-background">W</span>
        </div>

        <div className="flex flex-col items-center justify-center space-y-2">
          <p className="text-xs font-medium uppercase tracking-widest text-muted-foreground">
            Step 2 of 2
          </p>
          <h1 className="font-semibold text-2xl text-center max-w-sm">
            Reset your password
          </h1>
          <p className="max-w-xs text-sm text-center text-muted-foreground">
            Enter the code sent to your email and set a new password.
          </p>
        </div>

        <ForgotPasswordReset />

        <p className="text-sm">
          &copy; Wired World {new Date().getFullYear()} | All Rights Reserved
        </p>
      </div>
    </motion.div>
  );
}
