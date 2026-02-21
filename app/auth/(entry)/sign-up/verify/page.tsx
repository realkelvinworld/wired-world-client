"use client";

import { motion } from "framer-motion";

import Verify from "@/components/forms/auth/sign-up/verify";

export default function VerifyPage() {
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
            Step 1 of 3
          </p>
          <h1 className="font-semibold text-2xl text-center max-w-sm">
            Let&apos;s get you started
          </h1>
          <p className="max-w-xs text-sm text-center text-muted-foreground">
            Enter your email address and we&apos;ll send you a verification code
            to confirm it&apos;s really you.
          </p>
        </div>

        <Verify />

        <p className="text-sm">
          &copy; Wired World {new Date().getFullYear()} | All Rights Reserved
        </p>
      </div>
    </motion.div>
  );
}
