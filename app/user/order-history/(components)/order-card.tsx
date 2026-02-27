"use client";

import {
  CalendarBlankIcon,
  CheckCircleIcon,
  ClockIcon,
  CubeIcon,
  TruckIcon,
  XCircleIcon,
} from "@phosphor-icons/react";

import { UiBadge, UiCard, UiSkeleton } from "@/components/ui";
import { formatPrice } from "@/lib/format-price";
import { Order } from "@/models/order";

// ── Status config ──────────────────────────────────────────

const statusConfig: Record<
  string,
  {
    label: string;
    icon: React.ElementType;
    iconBg: string;
    iconColor: string;
    badgeClass: string;
  }
> = {
  processing: {
    label: "Processing",
    icon: ClockIcon,
    iconBg: "bg-blue-100",
    iconColor: "text-blue-600",
    badgeClass: "bg-blue-100 text-blue-700 border-blue-200",
  },
  delivered: {
    label: "Delivered",
    icon: CheckCircleIcon,
    iconBg: "bg-green-100",
    iconColor: "text-green-600",
    badgeClass: "bg-green-100 text-green-700 border-green-200",
  },
  cancelled: {
    label: "Cancelled",
    icon: XCircleIcon,
    iconBg: "bg-red-100",
    iconColor: "text-red-600",
    badgeClass: "bg-red-100 text-red-700 border-red-200",
  },
  awaiting_rider: {
    label: "Awaiting Rider",
    icon: TruckIcon,
    iconBg: "bg-amber-100",
    iconColor: "text-amber-600",
    badgeClass: "bg-amber-100 text-amber-700 border-amber-200",
  },
};

function getStatusConfig(status: string) {
  return (
    statusConfig[status] ?? {
      label: status.replace(/_/g, " ").replace(/\b\w/g, (c) => c.toUpperCase()),
      icon: ClockIcon,
      iconBg: "bg-muted",
      iconColor: "text-muted-foreground",
      badgeClass: "bg-muted text-muted-foreground border-muted",
    }
  );
}

// ── Order Card ─────────────────────────────────────────────

interface OrderCardProps {
  order: Order;
  isLast: boolean;
}

export function OrderCard({ order, isLast }: OrderCardProps) {
  const config = getStatusConfig(order.status);
  const StatusIcon = config.icon;
  const totalItems = order.items.reduce((sum, item) => sum + item.quantity, 0);
  const itemNames = order.items.map((i) => i.item__name).join(", ");
  const shortId = order.order_id.split("-")[0].toUpperCase();

  const date = new Date(order.created);
  const formattedDate = date.toLocaleDateString("en-GB", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  });
  const formattedTime = date.toLocaleTimeString("en-US", {
    hour: "numeric",
    minute: "2-digit",
    hour12: true,
  });

  return (
    <div className="relative flex gap-4">
      {/* Timeline column */}
      <div className="flex flex-col items-center">
        {/* Status icon circle */}
        <div
          className={`relative z-10 flex size-12 shrink-0 items-center justify-center rounded-full border-2 border-background shadow-sm ${config.iconBg}`}
        >
          <StatusIcon weight="bold" className={`size-5 ${config.iconColor}`} />
        </div>
        {/* Connector line */}
        {!isLast && (
          <div className="w-px flex-1 border-l-2 border-dashed border-muted-foreground/20" />
        )}
      </div>

      {/* Card */}
      <UiCard.Card className="mb-4 flex-1 shadow-none">
        <UiCard.CardContent className="p-4">
          <div className="flex flex-col gap-3">
            {/* Status badge + order ID */}
            <div className="flex flex-wrap items-center gap-2">
              <UiBadge.Badge
                variant="outline"
                className={`rounded-full text-xs ${config.badgeClass}`}
              >
                {config.label}
              </UiBadge.Badge>
              <span className="text-xs text-muted-foreground">
                Order #{shortId}
              </span>
            </div>

            {/* Item name(s) */}
            <p className="line-clamp-1 text-sm font-medium">{itemNames}</p>

            {/* Meta row */}
            <div className="flex flex-wrap items-center gap-3 text-xs text-muted-foreground">
              <span className="flex items-center gap-1">
                <CubeIcon weight="bold" className="size-3.5" />
                {totalItems} {totalItems === 1 ? "piece" : "pieces"}
              </span>
              <span className="flex items-center gap-1">
                <ClockIcon weight="bold" className="size-3.5" />
                {formattedTime}
              </span>
              <span className="flex items-center gap-1">
                <CalendarBlankIcon weight="bold" className="size-3.5" />
                {formattedDate}
              </span>
            </div>

            {/* Total */}
            <p className="text-sm font-semibold">
              {formatPrice(order.currency, order.total_amount)}
            </p>
          </div>
        </UiCard.CardContent>
      </UiCard.Card>
    </div>
  );
}

// ── Skeleton ───────────────────────────────────────────────

export function OrderCardSkeleton({ isLast }: { isLast: boolean }) {
  return (
    <div className="relative flex gap-4">
      <div className="flex flex-col items-center">
        <UiSkeleton.Skeleton className="size-12 rounded-full" />
        {!isLast && (
          <div className="w-px flex-1 border-l-2 border-dashed border-muted-foreground/10" />
        )}
      </div>
      <UiCard.Card className="mb-4 flex-1 shadow-none">
        <UiCard.CardContent className="space-y-3 p-4">
          <div className="flex items-center gap-2">
            <UiSkeleton.Skeleton className="h-5 w-24 rounded-full" />
            <UiSkeleton.Skeleton className="h-4 w-20" />
          </div>
          <UiSkeleton.Skeleton className="h-4 w-3/4" />
          <div className="flex gap-3">
            <UiSkeleton.Skeleton className="h-3 w-20" />
            <UiSkeleton.Skeleton className="h-3 w-16" />
            <UiSkeleton.Skeleton className="h-3 w-24" />
          </div>
          <UiSkeleton.Skeleton className="h-4 w-20" />
        </UiCard.CardContent>
      </UiCard.Card>
    </div>
  );
}
