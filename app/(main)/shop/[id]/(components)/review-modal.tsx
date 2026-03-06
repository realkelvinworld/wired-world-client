"use client";

import { StarIcon, PencilLineIcon } from "@phosphor-icons/react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useQueryClient } from "@tanstack/react-query";
import { Controller, useForm, useWatch } from "react-hook-form";
import { useState } from "react";
import { toast } from "sonner";

import { reviewFormSchema, type ReviewFormValues } from "@/schemas/review";
import { submitReviewService } from "@/services/user";
import { useWebTokenStore } from "@/store/auth";
import { UiButton, UiDialog, UiField, UiTextArea } from "@/components/ui";
import { useUserStore } from "@/store/user";

interface ReviewModalProps {
  itemId: number;
}

export default function ReviewModal({ itemId }: ReviewModalProps) {
  // state
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  // hooks
  const { user } = useUserStore();
  const queryClient = useQueryClient();

  const form = useForm<ReviewFormValues>({
    resolver: zodResolver(reviewFormSchema),
    defaultValues: { rating: 0, review: "" },
  });

  // variables
  const selectedRating = useWatch({ control: form.control, name: "rating" });

  if (!user) return null;

  // functions
  function onSubmit(data: ReviewFormValues) {
    setLoading(true);
    submitReviewService({
      item_id: itemId,
      rating: data.rating,
      review: data.review,
    })
      .then(() => {
        toast.success("Review submitted!");
        queryClient.invalidateQueries({
          queryKey: ["product-reviews", itemId],
        });
        form.reset();
        setOpen(false);
      })
      .catch(() => {
        toast.error("Could not submit your review. Please try again.");
      })
      .finally(() => {
        setLoading(false);
      });
  }

  return (
    <UiDialog.Dialog open={open} onOpenChange={setOpen}>
      <UiDialog.DialogTrigger asChild>
        <UiButton.Button
          variant="outline"
          size="sm"
          className="rounded-full gap-1.5"
        >
          <PencilLineIcon weight="bold" className="size-3.5" />
          Leave a Review
        </UiButton.Button>
      </UiDialog.DialogTrigger>

      <UiDialog.DialogContent className="max-w-md">
        <UiDialog.DialogHeader>
          <UiDialog.DialogTitle>Leave a Review</UiDialog.DialogTitle>
          <UiDialog.DialogDescription>
            Share your thoughts about this product with other shoppers.
          </UiDialog.DialogDescription>
        </UiDialog.DialogHeader>

        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5 pt-1">
          {/* Star Rating */}
          <Controller
            control={form.control}
            name="rating"
            render={({ field, fieldState }) => (
              <UiField.Field>
                <UiField.FieldLabel>Your Rating</UiField.FieldLabel>
                <div className="flex gap-1">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <button
                      key={star}
                      type="button"
                      onClick={() => field.onChange(star)}
                      className="p-0.5 focus:outline-none"
                      aria-label={`Rate ${star} star${star > 1 ? "s" : ""}`}
                    >
                      <StarIcon
                        weight={star <= selectedRating ? "fill" : "regular"}
                        className={`size-7 transition-colors ${
                          star <= selectedRating
                            ? "text-yellow-500"
                            : "text-muted-foreground/30 hover:text-yellow-400"
                        }`}
                      />
                    </button>
                  ))}
                </div>
                {fieldState.error && (
                  <UiField.FieldError>
                    {fieldState.error.message}
                  </UiField.FieldError>
                )}
              </UiField.Field>
            )}
          />

          {/* Review Text */}
          <Controller
            control={form.control}
            name="review"
            render={({ field, fieldState }) => (
              <UiField.Field>
                <UiField.FieldLabel>Your Review</UiField.FieldLabel>
                <UiTextArea.Textarea
                  {...field}
                  placeholder="What did you think of this product?"
                  rows={4}
                  className="resize-none"
                />
                {fieldState.error && (
                  <UiField.FieldError>
                    {fieldState.error.message}
                  </UiField.FieldError>
                )}
              </UiField.Field>
            )}
          />

          <UiDialog.DialogFooter>
            <UiButton.Button
              type="button"
              variant="ghost"
              onClick={() => setOpen(false)}
              disabled={loading}
            >
              Cancel
            </UiButton.Button>
            <UiButton.Button type="submit" disabled={loading}>
              {loading ? "Submitting…" : "Submit Review"}
            </UiButton.Button>
          </UiDialog.DialogFooter>
        </form>
      </UiDialog.DialogContent>
    </UiDialog.Dialog>
  );
}
