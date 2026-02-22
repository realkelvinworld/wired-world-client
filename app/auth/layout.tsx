import { requireGuest } from "@/providers/auth-check";
import { redirect } from "next/navigation";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Authentication",
  description: "Sign in or create an account.",
};

export default async function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const redirectTo = await requireGuest();
  if (redirectTo) {
    redirect(redirectTo);
  }

  return <>{children}</>;
}
