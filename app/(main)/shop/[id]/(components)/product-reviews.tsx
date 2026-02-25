"use client";

import {
  CaretLeftIcon,
  CaretRightIcon,
  ChatTeardropTextIcon,
  StarIcon,
} from "@phosphor-icons/react";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";

import { getProductReviewsService } from "@/services/inventory";
import { Review } from "@/models/review";
import {
  UiAvatar,
  UiBadge,
  UiButton,
  UiCard,
  UiSkeleton,
} from "@/components/ui";

interface ProductReviewsProps {
  itemId: number;
}

export default function ProductReviews({ itemId }: ProductReviewsProps) {
  const [page, setPage] = useState(1);

  const { data, isPending } = useQuery({
    queryKey: ["product-reviews", itemId, page],
    queryFn: () =>
      getProductReviewsService({
        type: "reviews",
        item_id: itemId,
        page,
        drop: 5,
      }),
  });

  const reviews = data?.info ?? [];
  const paginator = data?.paginator;
  const totalItems = paginator?.total_items ?? 0;

  return (
    <div className="space-y-6">
      {/* Section header */}
      <div className="flex items-center gap-3">
        <ChatTeardropTextIcon weight="bold" className="size-6" />
        <h2 className="text-xl font-semibold">Customer Reviews</h2>
        <UiBadge.Badge variant="secondary" className="rounded-full">
          {totalItems}
        </UiBadge.Badge>
      </div>

      {isPending ? (
        <ReviewsSkeleton />
      ) : reviews.length === 0 ? (
        <UiCard.Card className="py-12">
          <UiCard.CardContent className="flex flex-col items-center gap-3 text-center">
            <ChatTeardropTextIcon className="size-10 text-muted-foreground/40" />
            <p className="text-sm text-muted-foreground">
              No reviews yet. Be the first to review this product.
            </p>
          </UiCard.CardContent>
        </UiCard.Card>
      ) : (
        <div className="space-y-4">
          {reviews.map((review) => (
            <ReviewCard key={review.id} review={review} />
          ))}

          {/* Pagination */}
          {paginator && (paginator.next || paginator.prev) && (
            <div className="flex items-center justify-center gap-3 pt-2">
              <UiButton.Button
                variant="outline"
                size="icon"
                className="size-9 rounded-full"
                disabled={!paginator.prev}
                onClick={() => setPage((p) => p - 1)}
              >
                <CaretLeftIcon weight="bold" className="size-4" />
              </UiButton.Button>
              <span className="text-sm tabular-nums text-muted-foreground">
                {page} / {Math.ceil(totalItems / 5)}
              </span>
              <UiButton.Button
                variant="outline"
                size="icon"
                className="size-9 rounded-full"
                disabled={!paginator.next}
                onClick={() => setPage((p) => p + 1)}
              >
                <CaretRightIcon weight="bold" className="size-4" />
              </UiButton.Button>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

function ReviewCard({ review }: { review: Review }) {
  const initials =
    (review.user__first_name?.[0] ?? "") + (review.user__last_name?.[0] ?? "");

  return (
    <UiCard.Card className="transition-shadow shadow-none hover:shadow-sm">
      <UiCard.CardContent className="space-y-3 p-5">
        <div className="flex items-start justify-between gap-3">
          <div className="flex items-center gap-3">
            <UiAvatar.Avatar size="default">
              <UiAvatar.AvatarFallback className="text-xs font-semibold">
                {initials.toUpperCase()}
              </UiAvatar.AvatarFallback>
            </UiAvatar.Avatar>
            <div>
              <p className="text-sm font-medium leading-none">
                {review.user__first_name} {review.user__last_name}
              </p>
              <p className="mt-1 text-xs text-muted-foreground">
                {getTimeAgo(review.created)}
              </p>
            </div>
          </div>

          {/* Rating pill */}
          <div className="flex items-center gap-1 rounded-full bg-muted/50 px-2.5 py-1">
            <StarIcon weight="fill" className="size-3.5 text-yellow-500" />
            <span className="text-xs font-semibold">{review.rating}</span>
          </div>
        </div>

        <p className="text-sm leading-relaxed text-foreground/80">
          {review.review}
        </p>
      </UiCard.CardContent>
    </UiCard.Card>
  );
}

function getTimeAgo(dateStr: string): string {
  const now = new Date();
  const date = new Date(dateStr);
  const diffMs = now.getTime() - date.getTime();
  const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));

  if (diffDays === 0) return "Today";
  if (diffDays === 1) return "Yesterday";
  if (diffDays < 7) return `${diffDays} days ago`;
  if (diffDays < 30) {
    const weeks = Math.floor(diffDays / 7);
    return `${weeks} week${weeks > 1 ? "s" : ""} ago`;
  }
  if (diffDays < 365) {
    const months = Math.floor(diffDays / 30);
    return `${months} month${months > 1 ? "s" : ""} ago`;
  }
  const years = Math.floor(diffDays / 365);
  return `${years} year${years > 1 ? "s" : ""} ago`;
}

function ReviewsSkeleton() {
  return (
    <div className="space-y-4">
      {Array.from({ length: 3 }, (_, i) => (
        <UiCard.Card key={i}>
          <UiCard.CardContent className="space-y-3 p-5">
            <div className="flex items-center gap-3">
              <UiSkeleton.Skeleton className="size-8 rounded-full" />
              <div className="space-y-1.5">
                <UiSkeleton.Skeleton className="h-3.5 w-28" />
                <UiSkeleton.Skeleton className="h-3 w-16" />
              </div>
            </div>
            <UiSkeleton.Skeleton className="h-4 w-full" />
            <UiSkeleton.Skeleton className="h-4 w-2/3" />
          </UiCard.CardContent>
        </UiCard.Card>
      ))}
    </div>
  );
}
