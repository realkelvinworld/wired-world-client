import {
  CheckCircleIcon,
  StarIcon,
  TagIcon,
  XCircleIcon,
} from "@phosphor-icons/react";
import Image from "next/image";

import { UiBadge, UiButton, UiSeparator } from "@/components/ui";
import { formatPrice } from "@/lib/format-price";
import { Product } from "@/models/product";

interface ProductInfoProps {
  product: Product;
}

export default function ProductInfo({ product }: ProductInfoProps) {
  const hasDiscount = parseFloat(product.discount) > 0;
  const inStock = product.stock > 0;

  return (
    <div className="space-y-5">
      {/* Brand */}
      <div className="flex items-center gap-2">
        {product.brand__logo && (
          <Image
            src={product.brand__logo}
            alt={product.brand__name}
            width={24}
            height={24}
            unoptimized
            className="size-6 object-contain"
          />
        )}
        <span className="text-sm text-muted-foreground">
          {product.brand__name}
        </span>
      </div>

      {/* Name */}
      <h1 className="text-2xl font-bold leading-tight lg:text-3xl">
        {product.name}
      </h1>

      {/* Rating */}
      <div className="flex items-center gap-1">
        {Array.from({ length: 5 }, (_, i) => (
          <StarIcon
            key={i}
            weight={i < product.rating ? "fill" : "regular"}
            className={
              i < product.rating
                ? "size-5 text-yellow-500"
                : "size-5 text-muted-foreground/40"
            }
          />
        ))}
        <span className="ml-1 text-sm text-muted-foreground">
          {product.rating}/5
        </span>
      </div>

      {/* Price */}
      <div className="flex items-baseline gap-3">
        <span className="text-3xl font-bold">
          {formatPrice(product.currency, product.discounted_price)}
        </span>
        {hasDiscount && (
          <>
            <span className="text-lg text-muted-foreground line-through">
              {formatPrice(product.currency, product.price)}
            </span>
            <UiBadge.Badge className="rounded-full border-0 bg-red-500/10 text-red-600">
              <TagIcon weight="bold" className="size-3" />
              {Math.round(parseFloat(product.discount))}% off
            </UiBadge.Badge>
          </>
        )}
      </div>

      {/* Stock */}
      <div className="flex items-center gap-1.5">
        {inStock ? (
          <>
            <CheckCircleIcon weight="fill" className="size-4 text-green-600" />
            <span className="text-sm font-medium text-green-600">
              In stock ({product.stock})
            </span>
          </>
        ) : (
          <>
            <XCircleIcon weight="fill" className="size-4 text-red-500" />
            <span className="text-sm font-medium text-red-500">
              Out of stock
            </span>
          </>
        )}
      </div>

      <UiSeparator.Separator />

      {/* Features */}
      {product?.features?.length > 0 && (
        <div className="space-y-2">
          <h3 className="text-sm font-semibold">Features</h3>
          <ul className="space-y-1">
            {product.features.map((feature, idx) => (
              <li
                key={idx}
                className="flex items-center gap-2 text-sm text-muted-foreground"
              >
                <span className="size-1.5 shrink-0 rounded-full bg-primary" />
                {feature}
              </li>
            ))}
          </ul>
        </div>
      )}

      <UiSeparator.Separator />

      {/* Category */}
      <div className="space-y-1">
        <p className="text-xs text-muted-foreground">
          {product.category__main_category__name} &rsaquo;{" "}
          {product.category__name}
        </p>
        <p className="text-xs text-muted-foreground">
          <span className="font-semibold text-foreground">SKU:</span>{" "}
          {product.sku}
        </p>
      </div>

      {/* Action */}
      <UiButton.Button size="lg" className="w-full rounded-full">
        Add to cart
      </UiButton.Button>
    </div>
  );
}
