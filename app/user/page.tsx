"use client";

import { UiCard } from "@/components/ui";
import { useUserStore } from "@/store/user";

export default function UserPage() {
  const { user } = useUserStore();

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-lg font-semibold">Dashboard</h1>
        <p className="text-sm text-muted-foreground">
          Welcome back! Here&apos;s your account overview.
        </p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <UiCard.Card>
          <UiCard.CardHeader>
            <UiCard.CardTitle className="text-sm font-medium">
              Email
            </UiCard.CardTitle>
          </UiCard.CardHeader>
          <UiCard.CardContent>
            <p className="text-sm">{user?.email ?? "—"}</p>
          </UiCard.CardContent>
        </UiCard.Card>

        <UiCard.Card>
          <UiCard.CardHeader>
            <UiCard.CardTitle className="text-sm font-medium">
              Phone
            </UiCard.CardTitle>
          </UiCard.CardHeader>
          <UiCard.CardContent>
            <p className="text-sm">{user?.phone ?? "—"}</p>
          </UiCard.CardContent>
        </UiCard.Card>

        <UiCard.Card>
          <UiCard.CardHeader>
            <UiCard.CardTitle className="text-sm font-medium">
              Country
            </UiCard.CardTitle>
          </UiCard.CardHeader>
          <UiCard.CardContent>
            <p className="text-sm">{user?.country ?? "—"}</p>
          </UiCard.CardContent>
        </UiCard.Card>

        <UiCard.Card>
          <UiCard.CardHeader>
            <UiCard.CardTitle className="text-sm font-medium">
              Language
            </UiCard.CardTitle>
          </UiCard.CardHeader>
          <UiCard.CardContent>
            <p className="text-sm">{user?.language ?? "—"}</p>
          </UiCard.CardContent>
        </UiCard.Card>
      </div>
    </div>
  );
}
