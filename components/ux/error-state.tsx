"use client";

import * as Icon from "@phosphor-icons/react";
import Link from "next/link";

import { UiButton } from "@/components/ui";
import { routes } from "@/routes";

interface ErrorStateProps {
  title?: string;
  message?: string;
  onRetry?: () => void;
}

export default function ErrorState({
  title = "Something went wrong",
  message = "We couldn't load the data. This could be a temporary issue — try again or navigate to a safe page.",
  onRetry,
}: ErrorStateProps) {
  return (
    <div className="flex flex-col items-center justify-center py-16 px-4 text-center">
      <div className="flex h-14 w-14 items-center justify-center rounded-full bg-destructive/10">
        <Icon.WarningCircleIcon className="h-7 w-7 text-destructive" />
      </div>

      <h2 className="mt-4 text-lg font-semibold">{title}</h2>
      <p className="mt-1 max-w-sm text-sm text-muted-foreground">{message}</p>

      <div className="mt-6 flex items-center gap-3">
        {onRetry && (
          <UiButton.Button variant="outline" size="sm" onClick={onRetry}>
            <Icon.ArrowCounterClockwiseIcon className="mr-1 size-4" />
            Try again
          </UiButton.Button>
        )}
        <UiButton.Button variant="outline" size="sm" asChild>
          <Link href={routes.home}>
            <Icon.HouseIcon className="mr-1 size-4" />
            Home
          </Link>
        </UiButton.Button>
        <UiButton.Button size="sm" asChild>
          <Link href={routes.shop}>
            <Icon.StorefrontIcon className="mr-1 size-4" />
            Shop
          </Link>
        </UiButton.Button>
      </div>
    </div>
  );
}
