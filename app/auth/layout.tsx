import { requireGuest } from "@/providers/auth-check";
import { redirect } from "next/navigation";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Account Access — WiredWorld Ghana",
  description:
    "Sign in or create a Wired World (WiredWorld) account to start shopping Ghana's premier online electronics store.",
  robots: { index: false, follow: false },
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
