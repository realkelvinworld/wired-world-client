import type { Metadata } from "next";
import DashboardShell from "@/app/user/(components)/dashboard-shell";
import AuthWrapper from "@/providers/auth-wrapper";

export const metadata: Metadata = {
  title: "My Account | WiredWorld",
  description:
    "Manage your Wired World (WiredWorld) account \u2014 orders, wishlist, addresses, and profile settings.",
  robots: { index: false, follow: false },
};

export default function UserLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <AuthWrapper>
      <DashboardShell>{children}</DashboardShell>
    </AuthWrapper>
  );
}
