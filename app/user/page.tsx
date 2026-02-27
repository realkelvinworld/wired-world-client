"use client";

import {
  EnvelopeSimpleIcon,
  GlobeIcon,
  PhoneIcon,
  ShieldCheckIcon,
  TranslateIcon,
} from "@phosphor-icons/react";

import {
  UiAvatar,
  UiBadge,
  UiCard,
  UiSeparator,
  UiSkeleton,
} from "@/components/ui";
import { useFirstPaint } from "@/hooks/use-first-paint";

import EditProfileForm from "./(components)/edit-profile-form";

export default function UserPage() {
  const { data, isPending } = useFirstPaint();
  const user = data?.info;

  if (isPending) {
    return (
      <div className="space-y-6">
        <div>
          <h1 className="text-lg font-semibold">Dashboard</h1>
          <p className="text-sm text-muted-foreground">
            Welcome back! Here&apos;s your account overview.
          </p>
        </div>
        <UiCard.Card>
          <UiCard.CardContent className="p-6 ">
            <div className="flex flex-col items-center gap-4 sm:flex-row sm:items-start">
              <UiSkeleton.Skeleton className="size-20 rounded-full" />
              <div className="flex-1 space-y-2 text-center sm:text-left">
                <UiSkeleton.Skeleton className="mx-auto h-5 w-40 sm:mx-0" />
                <UiSkeleton.Skeleton className="mx-auto h-4 w-56 sm:mx-0" />
              </div>
            </div>
            <UiSeparator.Separator className="my-6" />
            <div className="grid gap-4 sm:grid-cols-2">
              {Array.from({ length: 4 }).map((_, i) => (
                <div key={i} className="flex items-center gap-3">
                  <UiSkeleton.Skeleton className="size-9 rounded-lg" />
                  <div className="space-y-1">
                    <UiSkeleton.Skeleton className="h-3 w-16" />
                    <UiSkeleton.Skeleton className="h-4 w-32" />
                  </div>
                </div>
              ))}
            </div>
          </UiCard.CardContent>
        </UiCard.Card>
      </div>
    );
  }

  if (!user) return null;

  const initials =
    `${user.first_name.charAt(0)}${user.last_name.charAt(0)}`.toUpperCase();

  const infoItems = [
    { icon: EnvelopeSimpleIcon, label: "Email", value: user.email },
    { icon: PhoneIcon, label: "Phone", value: user.phone || "—" },
    { icon: GlobeIcon, label: "Country", value: user.country },
    { icon: TranslateIcon, label: "Language", value: user.language },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-lg font-semibold">Dashboard</h1>
        <p className="text-sm text-muted-foreground">
          Welcome back! Here&apos;s your account overview.
        </p>
      </div>

      <UiCard.Card className="shadow-none">
        <UiCard.CardContent className="p-6">
          {/* Avatar + Name */}
          <div className="flex flex-col items-center gap-4 sm:flex-row sm:items-start">
            <UiAvatar.Avatar className="size-20 text-2xl">
              {user.image && (
                <UiAvatar.AvatarImage src={user.image} alt={user.first_name} />
              )}
              <UiAvatar.AvatarFallback className="bg-primary text-primary-foreground text-2xl">
                {initials}
              </UiAvatar.AvatarFallback>
            </UiAvatar.Avatar>

            <div className="flex-1 text-center sm:text-left">
              <div className="flex flex-col items-center gap-2 sm:flex-row">
                <h2 className="text-xl font-semibold">
                  {user.first_name} {user.last_name}
                </h2>
                {user.is_staff && (
                  <UiBadge.Badge
                    variant="secondary"
                    className="gap-1 rounded-full"
                  >
                    <ShieldCheckIcon weight="bold" className="size-3" />
                    {user.staff_role ?? "Staff"}
                  </UiBadge.Badge>
                )}
              </div>
              <p className="mt-1 text-sm text-muted-foreground">{user.email}</p>
            </div>

            <EditProfileForm user={user} />
          </div>

          <UiSeparator.Separator className="my-6" />

          {/* Info grid */}
          <div className="grid gap-4 sm:grid-cols-2">
            {infoItems.map((item) => (
              <div key={item.label} className="flex items-center gap-3">
                <div className="flex size-9 shrink-0 items-center justify-center rounded-lg bg-muted">
                  <item.icon
                    weight="bold"
                    className="size-4 text-muted-foreground"
                  />
                </div>
                <div>
                  <p className="text-xs text-muted-foreground">{item.label}</p>
                  <p className="text-sm font-medium">{item.value}</p>
                </div>
              </div>
            ))}
          </div>
        </UiCard.CardContent>
      </UiCard.Card>
    </div>
  );
}
