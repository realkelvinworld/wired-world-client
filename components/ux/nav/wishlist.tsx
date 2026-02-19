"use client";

import { HeartIcon } from "@phosphor-icons/react";

import { UiButton, UiSheet } from "@/components/ui";

export function Wishlist() {
  return (
    <UiSheet.Sheet>
      <UiSheet.SheetTrigger asChild>
        <UiButton.Button
          variant="outline"
          size="icon"
          className="rounded-full border border-primary/10"
        >
          <HeartIcon />
        </UiButton.Button>
      </UiSheet.SheetTrigger>
      <UiSheet.SheetContent side="right">
        <UiSheet.SheetHeader>
          <UiSheet.SheetTitle>Wishlist</UiSheet.SheetTitle>
          <UiSheet.SheetDescription>
            Items you&apos;ve saved for later.
          </UiSheet.SheetDescription>
        </UiSheet.SheetHeader>
        <div className="flex flex-1 items-center justify-center">
          <div className="text-center">
            <HeartIcon className="mx-auto size-12 text-muted-foreground/40" />
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
