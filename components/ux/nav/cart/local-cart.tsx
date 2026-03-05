"use client";

import { ShoppingCartIcon, TrashIcon } from "@phosphor-icons/react";
import { toast } from "sonner";
import Link from "next/link";

import {
  UiBadge,
  UiButton,
  UiScrollArea,
  UiSeparator,
  UiSheet,
} from "@/components/ui";
import { formatPrice } from "@/lib/format-price";
import { useCartStore } from "@/store/cart";
import { OrderItem } from "@/models/order";
import { routes } from "@/routes";
import { Product } from "@/models/product";

export function LocalCart() {
  const { cart, removeItem, clearCart } = useCartStore();

  const items = cart ?? [];
  const itemCount = items.reduce((sum, i) => sum + i.quantity, 0);

  const currency = items[0]?.item.currency ?? "GHS";
  const subtotal = items.reduce((sum, item) => {
    const price = parseFloat(item.item.discounted_price || item.item.price);
    return sum + price * item.quantity;
  }, 0);

  function handleRemove(productId: number) {
    removeItem(productId);
    toast.success("Removed from cart");
  }

  function handleClear() {
    clearCart();
    toast.success("Cart cleared");
  }

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
        className="w-full max-w-[440px] sm:max-w-[600px] lg:max-w-[550px] overflow-auto"
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

        {items.length === 0 ? (
          <CartEmpty />
        ) : (
          <UiScrollArea.ScrollArea className="flex-1 -mx-6 px-6">
            <div className="space-y-4 p-6">
              {items.map((item) => (
                <CartItemCard
                  key={item.item.id}
                  item={item.item}
                  quantity={item.quantity}
                  onRemove={() => handleRemove(item.item.id)}
                />
              ))}
            </div>
          </UiScrollArea.ScrollArea>
        )}

        {items.length > 0 && (
          <div className="mt-auto border-t pt-4 space-y-4 px-6 py-10">
            <div className="flex items-center justify-between">
              <span className="text-sm text-muted-foreground">Subtotal</span>
              <span className="text-lg font-bold">
                {formatPrice(currency, subtotal.toString())}
              </span>
            </div>
            <div className="flex gap-2">
              <UiButton.Button
                variant="destructive"
                className="rounded-full"
                onClick={handleClear}
              >
                Clear cart
              </UiButton.Button>
              <UiButton.Button className="flex-1 rounded-full" asChild>
                <Link href={routes.checkout}>Checkout</Link>
              </UiButton.Button>
            </div>
          </div>
        )}
      </UiSheet.SheetContent>
    </UiSheet.Sheet>
  );
}

function CartItemCard({
  quantity,
  item,
  onRemove,
}: {
  quantity: number;
  item: Product;
  onRemove: () => void;
}) {
  const hasDiscount = parseFloat(item.discount) > 0;

  return (
    <div className="group/card flex gap-4 rounded-2xl border p-3 transition-colors hover:bg-muted/40">
      <Link
        href={routes.shop.productDetails(item.id)}
        className="relative size-24 shrink-0 overflow-hidden rounded-xl bg-muted/30"
      >
        <img
          src={item.images[0]}
          alt={item.name}
          loading="lazy"
          className="absolute inset-0 size-full object-contain p-2 transition-transform duration-200 group-hover/card:scale-105"
        />
        {hasDiscount && (
          <UiBadge.Badge className="absolute top-1.5 left-1.5 rounded-full border-0 px-1.5 py-0.5 text-[10px] font-semibold text-white">
            -{Math.round(parseFloat(item.discount))}%
          </UiBadge.Badge>
        )}
      </Link>

      <div className="flex min-w-0 flex-1 flex-col justify-between py-0.5">
        <div className="space-y-0.5">
          <p className="text-[11px] font-medium uppercase tracking-wider text-muted-foreground">
            {item.brand__name}
          </p>
          <Link
            href={routes.shop.productDetails(item.id)}
            className="line-clamp-2 text-sm font-semibold leading-snug hover:underline"
          >
            {item.name}
          </Link>
        </div>

        <div className="flex items-end justify-between">
          <div className="space-y-0.5">
            <div className="flex items-baseline gap-2">
              <span className="text-sm font-bold">
                {formatPrice(item.currency, item.discounted_price)}
              </span>
              {hasDiscount && (
                <span className="text-xs text-muted-foreground line-through">
                  {formatPrice(item.currency, item.price)}
                </span>
              )}
            </div>
            <p className="text-xs text-muted-foreground">Qty: {quantity}</p>
          </div>

          <UiButton.Button
            variant="ghost"
            size="icon"
            className="size-8 shrink-0 rounded-full text-muted-foreground/60 opacity-0 transition-all hover:bg-destructive/10 hover:text-destructive group-hover/card:opacity-100"
            onClick={onRemove}
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
