"use client";

import { ClockCounterClockwiseIcon } from "@phosphor-icons/react";

export default function OrderHistoryPage() {
  return (
    <div className="flex flex-col items-center justify-center py-16 text-center">
      <ClockCounterClockwiseIcon className="size-10 text-muted-foreground" />
      <h2 className="mt-4 text-lg font-semibold">Order History</h2>
      <p className="mt-1 max-w-xs text-sm text-muted-foreground">
        Your past orders will appear here. This feature is coming soon.
      </p>
    </div>
  );
}
