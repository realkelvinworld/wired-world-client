"use client";

import { ShoppingBagIcon, ArrowLeftIcon } from "@phosphor-icons/react";
import Link from "next/link";

import { UiButton } from "@/components/ui";
import { formatPrice } from "@/lib/format-price";
import { useCartStore } from "@/store/cart";
import { useCart } from "@/hooks/use-cart";
import { routes } from "@/routes";

import OrderSummary, { SummaryItem } from "./(components)/order-summary";
import GuestCheckout from "./(components)/guest-checkout";
import UserCheckout from "./(components)/user-checkout";

function CheckoutContent({ isLoggedIn }: { isLoggedIn: boolean }) {
  // hooks
  const { cart: localCart } = useCartStore();
  const { items: serverItems, subtotal: serverSubtotal, isPending } = useCart();

  // variables
  let summaryItems: SummaryItem[];
  let subtotal: string;

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
  } else {
    summaryItems = (localCart ?? []).map((c) => ({
      id: c.item.id,
      name: c.item.name,
      brand: c.item.brand__name,
      image: c.item.images[0],
      currency: c.item.currency,
      price: c.item.on_promotion ? c.item.discounted_price : c.item.price,
      quantity: c.quantity,
    }));
    const rawTotal = (localCart ?? []).reduce((sum, c) => {
      const unitPrice = parseFloat(
        c.item.on_promotion ? c.item.discounted_price : c.item.price,
      );
      return sum + unitPrice * c.quantity;
    }, 0);
    subtotal = localCart?.length
      ? formatPrice(localCart[0].item.currency, rawTotal.toFixed(2))
      : "";
  }

  const isEmpty = summaryItems.length === 0;

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
        <OrderSummary items={summaryItems} subtotal={subtotal} />
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
