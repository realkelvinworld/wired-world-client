"use client";

import { LockKeyIcon, SignOutIcon } from "@phosphor-icons/react";
import { usePathname, useRouter } from "next/navigation";
import Link from "next/link";

import { UiButton, UiSeparator } from "@/components/ui";
import { clearCookies } from "@/app/auth/actions";
import { useResendOtpStore } from "@/store/auth";
import { logoutService } from "@/services/auth";
import { useUserStore } from "@/store/user";
import { routes } from "@/routes";

const navItems = [
  { label: "Dashboard", href: routes.user.dashboard },
  { label: "Order History", href: routes.user.orderHistory },
];

export default function DashboardShell({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const router = useRouter();

  const { user, clearUser } = useUserStore();
  const { clearOtpStore } = useResendOtpStore();

  const userInitials = user
    ? `${user.first_name.charAt(0)}${user.last_name.charAt(0)}`.toUpperCase()
    : null;

  return (
    <div className="mx-auto w-full max-w-5xl px-4 py-8">
      <div className="mb-6 flex items-center gap-3">
        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary text-sm font-bold text-background">
          {userInitials}
        </div>
        <div>
          <p className="text-sm font-medium">
            {user?.first_name} {user?.last_name}
          </p>
          <p className="text-xs text-muted-foreground">{user?.country}</p>
        </div>
      </div>

      <div className="flex flex-wrap gap-2 items-center justify-between">
        <nav className="flex gap-1">
          {navItems.map((item) => (
            <UiButton.Button
              key={item.href}
              variant={pathname === item.href ? "default" : "ghost"}
              size="sm"
              className="rounded-full"
              asChild
            >
              <Link href={item.href}>{item.label}</Link>
            </UiButton.Button>
          ))}
        </nav>

        <div className="flex gap-2">
          <UiButton.Button
            variant="outline"
            size="sm"
            className="rounded-full"
            onClick={async () => {
              await clearCookies();
              clearOtpStore();
              clearUser();
              router.push(routes.auth.forgotPassword.request);
            }}
          >
            <LockKeyIcon className="mr-1 size-4" />
            Change Password
          </UiButton.Button>

          <UiButton.Button
            variant="destructive"
            size="sm"
            className="text-secondary hover:text-destructive-foreground rounded-full"
            onClick={async () => {
              await logoutService();
              clearOtpStore();
              clearUser();
            }}
          >
            Logout
            <SignOutIcon className="ml-1 size-4" />
          </UiButton.Button>
        </div>
      </div>

      <UiSeparator.Separator className="my-4" />

      {children}
    </div>
  );
}
