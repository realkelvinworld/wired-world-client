"use client";

import {
  ArrowRightIcon,
  ShoppingCartIcon,
  UserIcon,
} from "@phosphor-icons/react";
import { useRouter } from "next/navigation";
import { useState } from "react";

import { UiButton, UiCard, UiSeparator, UiSpinner } from "@/components/ui";
import { useUserCheckout } from "@/hooks/use-checkout";
import { useUserStore } from "@/store/user";

import AddressSelector from "./address-selector";

export default function UserCheckout() {
  const router = useRouter();
  const { user } = useUserStore();
  const { mutate: placeOrder, isPending } = useUserCheckout();
  const [selectedAddressId, setSelectedAddressId] = useState<number | null>(
    null,
  );

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!selectedAddressId) return;
    placeOrder(selectedAddressId, {
      onSuccess: (res) => {
        router.push(res.info.authorization_url);
      },
    });
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Account info — read only */}
      <UiCard.Card>
        <UiCard.CardHeader className="pb-3">
          <div className="flex items-center gap-2">
            <UserIcon className="size-4 text-muted-foreground" />
            <UiCard.CardTitle className="text-base">
              Account Details
            </UiCard.CardTitle>
          </div>
        </UiCard.CardHeader>
        <UiCard.CardContent>
          <div className="grid gap-3 rounded-lg bg-muted/40 p-4 sm:grid-cols-2">
            <div>
              <p className="text-xs text-muted-foreground">Name</p>
              <p className="text-sm font-medium">
                {user?.first_name} {user?.last_name}
              </p>
            </div>
            <div>
              <p className="text-xs text-muted-foreground">Email</p>
              <p className="text-sm font-medium">{user?.email}</p>
            </div>
            <div>
              <p className="text-xs text-muted-foreground">Phone</p>
              <p className="text-sm font-medium">{user?.phone}</p>
            </div>
            <div>
              <p className="text-xs text-muted-foreground">Country</p>
              <p className="text-sm font-medium">{user?.country}</p>
            </div>
          </div>
        </UiCard.CardContent>
      </UiCard.Card>

      {/* Address */}
      <UiCard.Card>
        <UiCard.CardHeader className="pb-3">
          <UiCard.CardTitle className="text-base">
            Delivery Address
          </UiCard.CardTitle>
          <p className="text-sm text-muted-foreground">
            Select a saved address or add a new one.
          </p>
        </UiCard.CardHeader>
        <UiCard.CardContent>
          <AddressSelector
            selectedId={selectedAddressId}
            onSelect={setSelectedAddressId}
          />
        </UiCard.CardContent>
      </UiCard.Card>

      <UiSeparator.Separator />

      <UiButton.Button
        type="submit"
        size="lg"
        className="w-full"
        disabled={isPending || !selectedAddressId}
      >
        {isPending ? (
          <UiSpinner.Spinner className="mr-2 size-4" />
        ) : (
          <ShoppingCartIcon className="mr-2 size-4" />
        )}
        {isPending ? "Processing..." : "Place Order"}
        {!isPending && <ArrowRightIcon className="ml-2 size-4" />}
      </UiButton.Button>

      {!selectedAddressId && (
        <p className="text-center text-xs text-muted-foreground">
          Please select a delivery address to continue.
        </p>
      )}
    </form>
  );
}
