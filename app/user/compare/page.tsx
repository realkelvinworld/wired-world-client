"use client";

import {
  ArrowLeftIcon,
  ArrowsClockwiseIcon,
  CheckCircleIcon,
  StarIcon,
  TrashIcon,
  XCircleIcon,
} from "@phosphor-icons/react";
import Link from "next/link";

import {
  UiBadge,
  UiButton,
  UiCard,
  UiSeparator,
  UiSkeleton,
} from "@/components/ui";
import { useCompare } from "@/hooks/use-compare";
import { formatPrice } from "@/lib/format-price";
import { Product } from "@/models/product";
import { routes } from "@/routes";

export default function UserComparePage() {
  // api
  const { items, isPending, remove, clear, isClearing } = useCompare();

  if (isPending) return <CompareSkeleton />;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="text-lg font-semibold">Compare</h1>
          <p className="text-sm text-muted-foreground">
            {items.length > 0
              ? `${items.length} ${items.length === 1 ? "product" : "products"} selected`
              : "Add products to compare them side by side."}
          </p>
        </div>
        {items.length > 0 && (
          <div className="flex items-center gap-2">
            <UiButton.Button
              variant="outline"
              size="sm"
              className="rounded-full"
              asChild
            >
              <Link href={routes.shop.shop}>
                <ArrowLeftIcon weight="bold" className="size-3.5" />
                Add more
              </Link>
            </UiButton.Button>
            <UiButton.Button
              variant="ghost"
              size="sm"
              className="rounded-full text-muted-foreground hover:text-destructive"
              onClick={() => clear()}
              disabled={isClearing}
            >
              <TrashIcon className="size-3.5" />
              Clear all
            </UiButton.Button>
          </div>
        )}
      </div>

      {/* Empty state */}
      {items.length === 0 && (
        <UiCard.Card className="py-16 shadow-none">
          <UiCard.CardContent className="flex flex-col items-center gap-3 text-center">
            <ArrowsClockwiseIcon
              className="size-10 text-muted-foreground/40"
              weight="light"
            />
            <p className="text-sm text-muted-foreground">
              No products added yet. Browse the shop and start comparing.
            </p>
            <UiButton.Button
              asChild
              variant="outline"
              size="sm"
              className="rounded-full"
            >
              <Link href={routes.shop.shop}>Browse shop</Link>
            </UiButton.Button>
          </UiCard.CardContent>
        </UiCard.Card>
      )}

      {/* Product cards grid */}
      {items.length > 0 && (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {items.map((product) => (
            <CompareCard
              key={product.id}
              product={product}
              onRemove={() => remove(product.id)}
            />
          ))}
        </div>
      )}
    </div>
  );
}

function CompareCard({
  product,
  onRemove,
}: {
  product: Product;
  onRemove: () => void;
}) {
  // variables
  const hasDiscount = parseFloat(product.discount) > 0;

  return (
    <UiCard.Card className="group/card overflow-hidden shadow-none transition-shadow hover:shadow-md">
      {/* Image */}
      <Link
        href={routes.shop.productDetails(product.id)}
        className="relative block aspect-square bg-muted/20 p-4"
      >
        {product.on_promotion && hasDiscount && (
          <UiBadge.Badge className="absolute top-3 left-3 z-10 rounded-full border-0 bg-red-500 px-2 py-0.5 text-[10px] font-semibold text-white">
            -{Math.round(parseFloat(product.discount))}%
          </UiBadge.Badge>
        )}
        <img
          src={product.images[0]}
          alt={product.name}
          className="size-full object-contain transition-transform duration-300 group-hover/card:scale-105"
        />
      </Link>

      <UiCard.CardContent className="space-y-4 px-4 pb-5">
        {/* Title + brand */}
        <div className="space-y-1">
          <p className="text-[11px] font-medium uppercase tracking-wider text-muted-foreground">
            {product.brand__name}
          </p>
          <Link
            href={routes.shop.productDetails(product.id)}
            className="line-clamp-2 text-sm font-semibold leading-snug hover:underline"
          >
            {product.name}
          </Link>
        </div>

        {/* Price */}
        <div className="flex items-baseline gap-2">
          <span className="text-base font-bold">
            {formatPrice(product.currency, product.discounted_price)}
          </span>
          {hasDiscount && (
            <span className="text-xs text-muted-foreground line-through">
              {formatPrice(product.currency, product.price)}
            </span>
          )}
        </div>

        <UiSeparator.Separator />

        {/* Specs list */}
        <div className="space-y-2.5 text-sm">
          <SpecRow label="Category" value={product.category__name} />
          <SpecRow label="SKU" value={product.sku} />
          <SpecRow
            label="Rating"
            value={
              <div className="flex items-center gap-1">
                {Array.from({ length: 5 }).map((_, i) => (
                  <StarIcon
                    key={i}
                    weight={i < product.rating ? "fill" : "regular"}
                    className={`size-3 ${i < product.rating ? "text-yellow-500" : "text-muted-foreground/25"}`}
                  />
                ))}
                <span className="ml-1 text-xs text-muted-foreground">
                  {product.rating}/5
                </span>
              </div>
            }
          />
          <SpecRow
            label="Stock"
            value={
              product.stock > 0 ? (
                <span className="flex items-center gap-1 text-xs text-green-600">
                  <CheckCircleIcon weight="fill" className="size-3.5" />
                  In stock ({product.stock})
                </span>
              ) : (
                <span className="flex items-center gap-1 text-xs text-red-500">
                  <XCircleIcon weight="fill" className="size-3.5" />
                  Out of stock
                </span>
              )
            }
          />
        </div>

        {/* Features */}
        {product.features.length > 0 && (
          <>
            <UiSeparator.Separator />
            <div className="space-y-2">
              <p className="text-xs font-medium text-muted-foreground">
                Features
              </p>
              <div className="flex flex-wrap gap-1.5">
                {product.features.map((f) => (
                  <UiBadge.Badge
                    key={f}
                    variant="secondary"
                    className="rounded-full text-xs font-normal"
                  >
                    {f}
                  </UiBadge.Badge>
                ))}
              </div>
            </div>
          </>
        )}

        <UiSeparator.Separator />

        {/* Actions */}
        <div className="flex items-center gap-2">
          <UiButton.Button asChild size="sm" className="flex-1 rounded-full">
            <Link href={routes.shop.productDetails(product.id)}>
              View Product
            </Link>
          </UiButton.Button>
          <UiButton.Button
            variant="outline"
            size="icon"
            className="size-8 shrink-0 rounded-full text-muted-foreground hover:border-destructive hover:text-destructive"
            onClick={onRemove}
          >
            <TrashIcon className="size-3.5" />
          </UiButton.Button>
        </div>
      </UiCard.CardContent>
    </UiCard.Card>
  );
}

function SpecRow({ label, value }: { label: string; value: React.ReactNode }) {
  return (
    <div className="flex items-center justify-between gap-3">
      <span className="shrink-0 text-xs text-muted-foreground">{label}</span>
      <span className="text-right text-xs font-medium">{value}</span>
    </div>
  );
}

function CompareSkeleton() {
  return (
    <div className="space-y-6">
      <div className="space-y-1">
        <UiSkeleton.Skeleton className="h-6 w-32" />
        <UiSkeleton.Skeleton className="h-4 w-48" />
      </div>
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {Array.from({ length: 3 }).map((_, i) => (
          <UiCard.Card key={i} className="overflow-hidden shadow-none">
            <UiSkeleton.Skeleton className="aspect-square w-full rounded-none" />
            <UiCard.CardContent className="space-y-3 px-4 pb-5">
              <UiSkeleton.Skeleton className="h-3 w-16" />
              <UiSkeleton.Skeleton className="h-4 w-3/4" />
              <UiSkeleton.Skeleton className="h-5 w-24" />
              <UiSkeleton.Skeleton className="h-px w-full" />
              <div className="space-y-2">
                <UiSkeleton.Skeleton className="h-3 w-full" />
                <UiSkeleton.Skeleton className="h-3 w-full" />
                <UiSkeleton.Skeleton className="h-3 w-full" />
                <UiSkeleton.Skeleton className="h-3 w-2/3" />
              </div>
            </UiCard.CardContent>
          </UiCard.Card>
        ))}
      </div>
    </div>
  );
}
