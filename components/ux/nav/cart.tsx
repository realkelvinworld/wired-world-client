"use client";

import { ShoppingCartIcon } from "@phosphor-icons/react";

import { UiButton, UiSheet } from "@/components/ui";

export function Cart() {
  return (
    <UiSheet.Sheet>
      <UiSheet.SheetTrigger asChild>
        <UiButton.Button
          variant="outline"
          className="rounded-full border bg-primary text-white"
        >
          Cart <ShoppingCartIcon />
        </UiButton.Button>
      </UiSheet.SheetTrigger>
      <UiSheet.SheetContent
        side="right"
        className="w-full max-w-[440px] sm:max-w-[600px] lg:max-w-[550px] overflow-auto "
      >
        <UiSheet.SheetHeader>
          <UiSheet.SheetTitle>Cart</UiSheet.SheetTitle>
          <UiSheet.SheetDescription>
            Items you&apos;ve added to your cart.
          </UiSheet.SheetDescription>
        </UiSheet.SheetHeader>
        <div className="flex flex-1 items-center justify-center">
          <div className="text-center">
            <ShoppingCartIcon className="mx-auto size-12 text-muted-foreground/40" />
            <p className="mt-3 text-sm font-medium text-muted-foreground">
              Coming Soon
            </p>
            <p className="mt-1 text-xs text-muted-foreground/70">
              Save your favourite products here
            </p>
          </div>
        </div>
      </UiSheet.SheetContent>
    </UiSheet.Sheet>
  );
}
