"use client";

import { ShoppingCartIcon, TrashIcon } from "@phosphor-icons/react";
import Image from "next/image";
import Link from "next/link";

import {
  UiBadge,
  UiButton,
  UiScrollArea,
  UiSeparator,
  UiSheet,
  UiSkeleton,
} from "@/components/ui";
import { useCart } from "@/hooks/use-cart";
import { formatPrice } from "@/lib/format-price";
import { CartItem } from "@/models/cart";
import { routes } from "@/routes";

export function Cart() {
  const {
    items,
    subtotal,
    itemCount,
    isPending,
    remove,
    clear,
    isRemoving,
    isClearing,
  } = useCart();

  return (
    <UiSheet.Sheet>
      <UiSheet.SheetTrigger asChild>
        <UiButton.Button
          variant="outline"
          className="relative rounded-full border bg-primary text-white"
        >
          Cart <ShoppingCartIcon />
          {itemCount > 0 && (
            <UiBadge.Badge className="absolute -top-1.5 -right-1.5 size-5 items-center justify-center rounded-full border-2 border-background bg-destructive px-0 text-[10px] font-bold text-white">
              {itemCount}
            </UiBadge.Badge>
          )}
        </UiButton.Button>
      </UiSheet.SheetTrigger>
      <UiSheet.SheetContent
        side="right"
        className="w-full max-w-[440px] sm:max-w-[600px] lg:max-w-[550px] "
      >
        <UiSheet.SheetHeader className="pb-4">
          <div className="flex items-center gap-2.5">
            <UiSheet.SheetTitle className="text-lg">Cart</UiSheet.SheetTitle>
            {items.length > 0 && (
              <UiBadge.Badge
                variant="secondary"
                className="rounded-full px-2.5 py-0.5 text-xs font-medium"
              >
                {items.length} {items.length === 1 ? "item" : "items"}
              </UiBadge.Badge>
            )}
          </div>
          <UiSheet.SheetDescription>
            Items you&apos;ve added to your cart.
          </UiSheet.SheetDescription>
        </UiSheet.SheetHeader>

        <UiSeparator.Separator />

        {isPending ? (
          <CartSkeleton />
        ) : items.length === 0 ? (
          <CartEmpty />
        ) : (
          <UiScrollArea.ScrollArea className="flex-1 -mx-6 px-6">
            <div className="space-y-4 p-6">
              {items.map((item) => (
                <CartItemCard
                  key={item.id}
                  item={item}
                  onRemove={() => remove(item.id)}
                  disabled={isRemoving}
                />
              ))}
            </div>
          </UiScrollArea.ScrollArea>
        )}

        {items.length > 0 && (
          <div className="mt-auto border-t pt-4 space-y-4 px-6 py-10">
            <div className="flex items-center justify-between">
              <span className="text-sm text-muted-foreground">Subtotal</span>
              <span className="text-lg font-bold">{subtotal}</span>
            </div>
            <div className="flex gap-2">
              <UiButton.Button
                variant="destructive"
                className="rounded-full"
                onClick={() => clear()}
                disabled={isClearing}
              >
                {isClearing ? "Clearing..." : "Clear cart"}
              </UiButton.Button>
              <UiButton.Button className="flex-1 rounded-full" asChild>
                <Link href={routes.shop.shop}>Checkout</Link>
              </UiButton.Button>
            </div>
          </div>
        )}
      </UiSheet.SheetContent>
    </UiSheet.Sheet>
  );
}

function CartItemCard({
  item,
  onRemove,
  disabled,
}: {
  item: CartItem;
  onRemove: () => void;
  disabled: boolean;
}) {
  const hasDiscount = parseFloat(item.item__discount) > 0;

  return (
    <div className="group/card flex gap-4 rounded-2xl border p-3 transition-colors hover:bg-muted/40">
      <Link
        href={routes.shop.productDetails(item.item__id)}
        className="relative size-24 shrink-0 overflow-hidden rounded-xl bg-muted/30"
      >
        <Image
          src={item.item__images[0]}
          alt={item.item__name}
          fill
          unoptimized
          className="object-contain p-2 transition-transform duration-200 group-hover/card:scale-105"
        />
        {hasDiscount && (
          <UiBadge.Badge className="absolute top-1.5 left-1.5 rounded-full border-0 px-1.5 py-0.5 text-[10px] font-semibold text-white">
            -{Math.round(parseFloat(item.item__discount))}%
          </UiBadge.Badge>
        )}
      </Link>

      <div className="flex min-w-0 flex-1 flex-col justify-between py-0.5">
        <div className="space-y-0.5">
          <p className="text-[11px] font-medium uppercase tracking-wider text-muted-foreground">
            {item.item__brand__name}
          </p>
          <Link
            href={routes.shop.productDetails(item.item__id)}
            className="line-clamp-2 text-sm font-semibold leading-snug hover:underline"
          >
            {item.item__name}
          </Link>
        </div>

        <div className="flex items-end justify-between">
          <div className="space-y-0.5">
            <div className="flex items-baseline gap-2">
              <span className="text-sm font-bold">
                {formatPrice(item.item__currency, item.item__discounted_price)}
              </span>
              {hasDiscount && (
                <span className="text-xs text-muted-foreground line-through">
                  {formatPrice(item.item__currency, item.item__price)}
                </span>
              )}
            </div>
            <p className="text-xs text-muted-foreground">
              Qty: {item.quantity}
            </p>
          </div>

          <UiButton.Button
            variant="ghost"
            size="icon"
            className="size-8 shrink-0 rounded-full text-muted-foreground/60 opacity-0 transition-all hover:bg-destructive/10 hover:text-destructive group-hover/card:opacity-100"
            onClick={onRemove}
            disabled={disabled}
          >
            <TrashIcon className="size-4" />
          </UiButton.Button>
        </div>
      </div>
    </div>
  );
}

function CartEmpty() {
  return (
    <div className="flex flex-1 items-center justify-center py-16">
      <div className="text-center">
        <div className="mx-auto mb-4 flex size-16 items-center justify-center rounded-full bg-muted/50">
          <ShoppingCartIcon className="size-7 text-muted-foreground/50" />
        </div>
        <p className="text-sm font-semibold text-foreground">
          Your cart is empty
        </p>
        <p className="mt-1 text-xs text-muted-foreground">
          Browse the shop and add items to your cart
        </p>
      </div>
    </div>
  );
}

function CartSkeleton() {
  return (
    <div className="space-y-4 py-5">
      {Array.from({ length: 3 }).map((_, i) => (
        <div key={i} className="flex gap-4 rounded-2xl border p-3">
          <UiSkeleton.Skeleton className="size-24 shrink-0 rounded-xl" />
          <div className="flex flex-1 flex-col justify-between py-0.5">
            <div className="space-y-1.5">
              <UiSkeleton.Skeleton className="h-3 w-20" />
              <UiSkeleton.Skeleton className="h-4 w-4/5" />
            </div>
            <UiSkeleton.Skeleton className="h-4 w-24" />
          </div>
        </div>
      ))}
    </div>
  );
}
