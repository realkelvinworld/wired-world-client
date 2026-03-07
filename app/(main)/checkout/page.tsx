"use client";

import { ShoppingBagIcon, ArrowLeftIcon } from "@phosphor-icons/react";
import { useSyncExternalStore } from "react";
import { useQuery } from "@tanstack/react-query";
import Link from "next/link";

import { UiButton, UiSkeleton } from "@/components/ui";
import { previewCartService } from "@/services/user";
import { useCartStore } from "@/store/cart";
import { useCart } from "@/hooks/use-cart";
import { routes } from "@/routes";

import OrderSummary, { SummaryItem } from "./(components)/order-summary";
import GuestCheckout from "./(components)/guest-checkout";
import UserCheckout from "./(components)/user-checkout";
import { useUserStore } from "@/store/user";

function CheckoutContent({ isLoggedIn }: { isLoggedIn: boolean }) {
  const storeHydrated = useSyncExternalStore(
    (cb) => useCartStore.persist.onFinishHydration(cb),
    () => useCartStore.persist.hasHydrated(),
    () => false,
  );
  const hydrated = storeHydrated;

  // hooks
  const { cart: localCart } = useCartStore();
  const {
    items: serverItems,
    subtotal: serverSubtotal,
    fees: serverFees,
    total: serverTotal,
    promoApplied,
    applyPromo,
    removePromo,
    isApplyingPromo,
    isRemovingPromo,
    isPending,
  } = useCart();
  const { user } = useUserStore();

  // api
  const { data: previewData, isPending: isPreviewPending } = useQuery({
    queryKey: [
      "cart-preview",
      (localCart ?? []).map((c) => `${c.item.id}:${c.quantity}`).join(","),
    ],
    queryFn: () =>
      previewCartService(
        (localCart ?? []).map((c) => ({
          item_id: c.item.id,
          quantity: c.quantity,
        })),
      ),
    enabled: !isLoggedIn && (localCart?.length ?? 0) > 0,
  });

  // variables
  let summaryItems: SummaryItem[];
  let subtotal: string;
  let fees: string | undefined;
  let total: string | undefined;

  if (isLoggedIn) {
    summaryItems = (serverItems ?? []).map((i) => ({
      id: i.item__id,
      name: i.item__name,
      brand: i.item__brand__name,
      image: i.item__images[0],
      currency: i.item__currency,
      price: i.item__on_promotion ? i.item__discounted_price : i.item__price,
      quantity: i.quantity,
    }));
    subtotal = serverSubtotal;
    fees = serverFees || undefined;
    total = serverTotal || undefined;
  } else {
    const previewItems = previewData?.info?.items ?? [];
    summaryItems = previewItems.map((i) => ({
      id: i.item__id,
      name: i.item__name,
      brand: i.item__brand__name,
      image: i.item__images[0],
      currency: i.item__currency,
      price: i.item__on_promotion ? i.item__discounted_price : i.item__price,
      quantity: i.quantity,
    }));
    subtotal = previewData?.info?.subtotal ?? "";
    fees = previewData?.info?.fees;
    total = previewData?.info?.total;
  }

  const isEmpty = isLoggedIn
    ? serverItems.length === 0
    : (localCart?.length ?? 0) === 0;

  // consditions
  if (!hydrated || (user && isPending)) {
    return <UiSkeleton.Skeleton className="h-96 w-full" />;
  }

  if (isEmpty) {
    return (
      <div className="flex flex-col items-center gap-4 py-24 text-center">
        <ShoppingBagIcon className="size-14 text-muted-foreground" />
        <div className="space-y-1">
          <h2 className="text-lg font-semibold">Your cart is empty</h2>
          <p className="text-sm text-muted-foreground">
            Add some items before checking out.
          </p>
        </div>
        <UiButton.Button asChild variant="outline">
          <Link href={routes.shop.shop}>
            <ArrowLeftIcon className="mr-2 size-4" />
            Continue Shopping
          </Link>
        </UiButton.Button>
      </div>
    );
  }

  return (
    <div className="grid gap-8 lg:grid-cols-[1fr_380px]">
      {/* Left — checkout form */}
      <div>{isLoggedIn ? <UserCheckout /> : <GuestCheckout />}</div>

      {/* Right — order summary (sticky on desktop) */}
      <div className="lg:sticky lg:top-24 lg:self-start">
        {!isLoggedIn && isPreviewPending ? (
          <UiSkeleton.Skeleton className="h-96 w-full rounded-xl" />
        ) : (
          <OrderSummary
            items={summaryItems}
            subtotal={subtotal}
            fees={fees}
            total={total}
            promoApplied={isLoggedIn ? promoApplied : null}
            onApplyPromo={isLoggedIn ? applyPromo : undefined}
            onRemovePromo={isLoggedIn ? () => removePromo() : undefined}
            isApplyingPromo={isApplyingPromo}
            isRemovingPromo={isRemovingPromo}
          />
        )}
      </div>
    </div>
  );
}

export default function CheckoutPage() {
  // variables
  const isLoggedIn =
    typeof document !== "undefined" && document.cookie.includes("access_token");

  return (
    <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6">
      {/* Header */}
      <div className="mb-8 flex items-center gap-4">
        <UiButton.Button asChild variant="ghost" size="sm" className="-ml-2">
          <Link href={routes.shop.shop}>
            <ArrowLeftIcon className="mr-2 size-4" />
            Back to shop
          </Link>
        </UiButton.Button>
      </div>

      <div className="mb-8">
        <h1 className="text-2xl font-bold">Checkout</h1>
        <p className="text-sm text-muted-foreground">
          {isLoggedIn
            ? "Review your order and select a delivery address."
            : "Complete your details to place your order."}
        </p>
      </div>

      <CheckoutContent isLoggedIn={isLoggedIn} />
    </div>
  );
}
