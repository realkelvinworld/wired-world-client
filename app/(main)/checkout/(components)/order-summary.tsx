"use client";

import { PackageIcon, TicketIcon, TrashIcon } from "@phosphor-icons/react";
import { useState } from "react";

import { UiButton, UiCard, UiInput, UiSeparator } from "@/components/ui";
import { formatToLocalString } from "@/lib/utils";

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
  fees?: string;
  total?: string;
  promoApplied?: string | null;
  onApplyPromo?: (code: string) => void;
  onRemovePromo?: () => void;
  isApplyingPromo?: boolean;
  isRemovingPromo?: boolean;
}

export default function OrderSummary({
  items,
  subtotal,
  fees,
  total,
  promoApplied,
  onApplyPromo,
  onRemovePromo,
  isApplyingPromo,
  isRemovingPromo,
}: OrderSummaryProps) {
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
    <UiCard.Card className="shadow-none">
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
                    {item.currency} {formatToLocalString(Number(item.price))}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>

        <UiSeparator.Separator />

        {/* Promo code */}
        {onApplyPromo && (
          <PromoSection
            promoApplied={promoApplied ?? null}
            onApply={onApplyPromo}
            onRemove={onRemovePromo!}
            isApplying={isApplyingPromo ?? false}
            isRemoving={isRemovingPromo ?? false}
          />
        )}

        <UiSeparator.Separator />

        {/* Totals */}
        <div className="space-y-2">
          <div className="flex justify-between text-sm">
            <span className="text-muted-foreground">Subtotal</span>
            <span>{formatToLocalString(subtotal)}</span>
          </div>
          {fees && (
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">Tax</span>
              <span>{formatToLocalString(fees)}</span>
            </div>
          )}
          {total && (
            <>
              <UiSeparator.Separator />
              <div className="flex justify-between text-sm font-semibold">
                <span>Total</span>
                <span>{formatToLocalString(total)}</span>
              </div>
            </>
          )}
        </div>
      </UiCard.CardContent>
    </UiCard.Card>
  );
}

function PromoSection({
  promoApplied,
  onApply,
  onRemove,
  isApplying,
  isRemoving,
}: {
  promoApplied: string | null;
  onApply: (code: string) => void;
  onRemove: () => void;
  isApplying: boolean;
  isRemoving: boolean;
}) {
  // state
  const [promoCode, setPromoCode] = useState("");

  // functions
  function handleApply() {
    const trimmed = promoCode.trim();
    if (!trimmed) return;
    onApply(trimmed);
    setPromoCode("");
  }

  if (promoApplied) {
    return (
      <div className="flex items-center justify-between rounded-lg border border-dashed border-green-500/40 bg-green-50/50 px-3 py-2 dark:bg-green-950/20">
        <div className="flex items-center gap-2">
          <TicketIcon className="size-4 text-green-600" />
          <span className="text-sm font-medium text-green-700 dark:text-green-400">
            {promoApplied}
          </span>
        </div>
        <UiButton.Button
          variant="ghost"
          size="icon"
          className="size-7 rounded-full text-muted-foreground hover:bg-destructive/10 hover:text-destructive"
          onClick={onRemove}
          disabled={isRemoving}
        >
          <TrashIcon className="size-3.5" />
        </UiButton.Button>
      </div>
    );
  }

  return (
    <div className="flex gap-2">
      <UiInput.Input
        placeholder="Promo code"
        value={promoCode}
        onChange={(e) => setPromoCode(e.target.value)}
        onKeyDown={(e) => e.key === "Enter" && handleApply()}
        className="h-9 text-sm"
      />
      <UiButton.Button
        variant="outline"
        size="sm"
        onClick={handleApply}
        disabled={isApplying || !promoCode.trim()}
      >
        {isApplying ? "Applying..." : "Apply"}
      </UiButton.Button>
    </div>
  );
}
