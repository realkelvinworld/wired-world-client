"use client";

import { PackageIcon } from "@phosphor-icons/react";

import { UiCard, UiSeparator } from "@/components/ui";

export interface SummaryItem {
  id: number;
  name: string;
  brand: string;
  image: string;
  currency: string;
  price: string;
  quantity: number;
}

interface OrderSummaryProps {
  items: SummaryItem[];
  subtotal: string;
}

export default function OrderSummary({ items, subtotal }: OrderSummaryProps) {
  if (items.length === 0) {
    return (
      <UiCard.Card>
        <UiCard.CardContent className="flex flex-col items-center gap-3 py-12 text-center">
          <PackageIcon className="size-10 text-muted-foreground" />
          <p className="text-sm text-muted-foreground">Your cart is empty.</p>
        </UiCard.CardContent>
      </UiCard.Card>
    );
  }

  return (
    <UiCard.Card>
      <UiCard.CardHeader className="pb-3">
        <UiCard.CardTitle className="text-base">Order Summary</UiCard.CardTitle>
        <p className="text-sm text-muted-foreground">
          {items.length} item{items.length !== 1 ? "s" : ""}
        </p>
      </UiCard.CardHeader>

      <UiCard.CardContent className="space-y-4">
        {/* Items */}
        <div className="space-y-4">
          {items.map((item) => (
            <div key={item.id} className="flex gap-3">
              <div className="size-16 shrink-0 overflow-hidden rounded-lg border bg-muted/30">
                <img
                  src={item.image}
                  alt={item.name}
                  className="size-full object-contain p-1"
                />
              </div>
              <div className="min-w-0 flex-1 space-y-0.5">
                <p className="line-clamp-2 text-sm font-medium leading-snug">
                  {item.name}
                </p>
                <p className="text-xs text-muted-foreground">{item.brand}</p>
                <div className="flex items-center justify-between gap-2 pt-1">
                  <span className="text-xs text-muted-foreground">
                    Qty: {item.quantity}
                  </span>
                  <span className="text-sm font-semibold">
                    {item.currency} {item.price}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>

        <UiSeparator.Separator />

        {/* Totals */}
        <div className="flex justify-between text-sm font-semibold">
          <span>Subtotal</span>
          <span>{subtotal}</span>
        </div>
        <p className="text-xs text-muted-foreground">
          Fees and final total are calculated at payment.
        </p>
      </UiCard.CardContent>
    </UiCard.Card>
  );
}
