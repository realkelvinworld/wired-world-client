"use client";

import { ArrowLeftIcon } from "@phosphor-icons/react";
import { useParams } from "next/navigation";
import { useQuery } from "@tanstack/react-query";
import Link from "next/link";

import { getProductsDetailsService } from "@/services/inventory";
import { UiButton, UiSeparator, UiSkeleton } from "@/components/ui";
import { routes } from "@/routes";

import ProductReviews from "./(components)/product-reviews";
import ProductGallery from "./(components)/product-gallery";
import ProductInfo from "./(components)/product-info";

export default function ProductDetailPage() {
  const { id } = useParams<{ id: string }>();

  const { data, isPending, error } = useQuery({
    queryKey: ["product-detail", id],
    queryFn: () => getProductsDetailsService({ type: "item", id: Number(id) }),
    enabled: !!id,
  });

  const product = data?.info;

  if (isPending) return <ProductDetailSkeleton />;

  if (error || !product) {
    return (
      <div className="flex min-h-[50vh] items-center justify-center">
        <p className="text-muted-foreground">
          {error ? "Failed to load product." : "Product not found."}
        </p>
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      <div className="mx-auto max-w-7xl px-4 py-12">
        {/* Back button */}
        <UiButton.Button
          variant="ghost"
          size="sm"
          className="mb-6 rounded-full"
          asChild
        >
          <Link href={routes.shop.shop}>
            <ArrowLeftIcon weight="bold" className="size-4" />
            Back to shop
          </Link>
        </UiButton.Button>

        {/* Product */}
        <div className="flex flex-col gap-8 lg:flex-row lg:gap-12">
          {/* Gallery */}
          <div className="w-full lg:w-1/2">
            <ProductGallery
              images={product.images}
              productName={product.name}
            />
          </div>

          {/* Info */}
          <div className="w-full lg:w-1/2">
            <ProductInfo product={product} />
          </div>
        </div>

        {/* Reviews */}
        <UiSeparator.Separator className="my-10" />
        <ProductReviews itemId={product.id} />
      </div>
    </div>
  );
}

function ProductDetailSkeleton() {
  return (
    <div className="min-h-screen">
      <div className="mx-auto max-w-7xl px-4 py-12">
        <UiSkeleton.Skeleton className="mb-6 h-8 w-32 rounded-full" />
        <div className="flex flex-col gap-8 lg:flex-row lg:gap-12">
          {/* Gallery skeleton */}
          <div className="w-full space-y-4 lg:w-1/2">
            <UiSkeleton.Skeleton className="aspect-square w-full rounded-2xl" />
            <div className="flex gap-2">
              {Array.from({ length: 4 }, (_, i) => (
                <UiSkeleton.Skeleton
                  key={i}
                  className="size-20 shrink-0 rounded-lg"
                />
              ))}
            </div>
          </div>

          {/* Info skeleton */}
          <div className="w-full space-y-5 lg:w-1/2">
            <UiSkeleton.Skeleton className="h-6 w-24" />
            <UiSkeleton.Skeleton className="h-9 w-3/4" />
            <UiSkeleton.Skeleton className="h-5 w-32" />
            <UiSkeleton.Skeleton className="h-10 w-48" />
            <UiSkeleton.Skeleton className="h-4 w-28" />
            <UiSkeleton.Skeleton className="h-px w-full" />
            <div className="space-y-2">
              <UiSkeleton.Skeleton className="h-4 w-20" />
              <UiSkeleton.Skeleton className="h-4 w-40" />
              <UiSkeleton.Skeleton className="h-4 w-36" />
              <UiSkeleton.Skeleton className="h-4 w-28" />
            </div>
            <UiSkeleton.Skeleton className="h-px w-full" />
            <UiSkeleton.Skeleton className="h-3 w-48" />
            <UiSkeleton.Skeleton className="h-11 w-full rounded-full" />
          </div>
        </div>
      </div>
    </div>
  );
}
