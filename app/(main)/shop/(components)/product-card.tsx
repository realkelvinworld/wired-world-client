import * as Icon from "@phosphor-icons/react";
import Image from "next/image";
import Link from "next/link";

import { UiBadge, UiButton, UiSkeleton } from "@/components/ui";
import { Product } from "@/models/product";
import { routes } from "@/routes";

interface ProductCardProps {
  product: Product;
}

function formatPrice(currency: string, amount: string) {
  const symbol = currency === "GHS" ? "₵" : currency;
  const num = parseFloat(amount);
  return `${symbol}${num.toLocaleString("en-GH", { minimumFractionDigits: num % 1 === 0 ? 0 : 2, maximumFractionDigits: 2 })}`;
}

export function ProductCard({ product }: ProductCardProps) {
  const hasDiscount = parseFloat(product.discount) > 0;
  const productHref = routes.shop.productDetails(product.sku);

  return (
    <div className="group overflow-hidden rounded-2xl border bg-background transition-shadow hover:shadow-lg">
      {/* Image area */}
      <Link
        href={productHref}
        className="relative block aspect-square bg-muted/30 p-4"
      >
        {hasDiscount && (
          <UiBadge.Badge
            className={`absolute top-3 left-3 z-10 rounded-full border-0 px-2.5 py-1 text-xs font-semibold text-white ${product.on_promotion ? "bg-linear-to-r from-red-600 to-red-400" : ""}`}
          >
            {Math.round(parseFloat(product.discount))}%
          </UiBadge.Badge>
        )}

        <div className="absolute top-3 right-3 z-10 flex flex-col gap-2">
          <UiButton.Button
            variant="outline"
            size="icon"
            className="size-9 rounded-full bg-background/80 backdrop-blur-sm"
            onClick={(e) => {
              e.preventDefault();
            }}
          >
            <Icon.EyeIcon className="size-4" />
          </UiButton.Button>
          <UiButton.Button
            variant="outline"
            size="icon"
            className="size-9 rounded-full bg-background/80 backdrop-blur-sm"
            onClick={(e) => {
              e.preventDefault();
            }}
          >
            <Icon.ArrowsClockwiseIcon className="size-4" />
          </UiButton.Button>
        </div>

        <Image
          src={product.images[0]}
          alt={product.name}
          fill
          unoptimized
          className="object-contain p-6 transition-transform duration-300 group-hover:scale-105"
        />
      </Link>

      {/* Info area */}
      <div className="space-y-3 bg-muted/20 p-4">
        <div className="flex items-start justify-between gap-2">
          <div className="min-w-0 space-y-1">
            <p className="text-xs text-muted-foreground">
              {product.category__name}
            </p>
            <h3 className="line-clamp-2 text-sm font-semibold leading-snug">
              {product.name}
            </h3>
          </div>
          <UiButton.Button
            variant="ghost"
            size="icon"
            className="size-8 shrink-0 rounded-full"
            onClick={() => {}}
          >
            <Icon.HeartIcon className="size-4" />
          </UiButton.Button>
        </div>

        <div className="flex items-baseline gap-2">
          <span className="text-sm font-bold">
            {formatPrice(product.currency, product.discounted_price)}
          </span>
          {hasDiscount && (
            <span className="text-xs text-muted-foreground line-through">
              {formatPrice(product.currency, product.price)}
            </span>
          )}
        </div>

        <p className="text-xs text-muted-foreground">
          <span className="font-semibold text-foreground">SKU:</span>{" "}
          {product.sku}
        </p>
      </div>
    </div>
  );
}

export function ProductCardSkeleton() {
  return (
    <div className="overflow-hidden rounded-2xl border bg-background w-full">
      <UiSkeleton.Skeleton className="aspect-square w-full rounded-none" />
      <div className="space-y-3 bg-muted/20 p-4">
        <div className="space-y-1">
          <UiSkeleton.Skeleton className="h-3 w-16" />
          <UiSkeleton.Skeleton className="h-4 w-3/4" />
        </div>
        <UiSkeleton.Skeleton className="h-4 w-24" />
        <UiSkeleton.Skeleton className="h-3 w-20" />
      </div>
    </div>
  );
}
