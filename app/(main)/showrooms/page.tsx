"use client";

import { parseAsIndex, useQueryState } from "nuqs";
import * as Icon from "@phosphor-icons/react";
import Image from "next/image";

import { UiButton, UiCard, UiSeparator, UiSkeleton } from "@/components/ui";
import ErrorState from "@/components/ux/error-state";
import { useShowrooms } from "@/hooks/use-showrooms";
import PageHeader from "@/components/ux/page-header";
import { useRegions } from "@/hooks/use-regions";
import { KitchenTwo } from "@/public/images";

export default function ShowroomsPage() {
  // State
  const [activeRegion, setActiveRegion] = useQueryState(
    "activeRegion",
    parseAsIndex.withDefault(1),
  );

  // Hooks
  const {
    data: regionsData,
    isPending: regionsLoading,
    error: regionsError,
  } = useRegions();

  const {
    data: showroomsData,
    isPending: showroomsLoading,
    error: showroomsError,
  } = useShowrooms(activeRegion);

  const regions = regionsData?.info;
  const showrooms = showroomsData?.info;

  return (
    <div className="min-h-screen">
      <div className="mx-auto max-w-7xl px-4 py-12">
        {/* Header Space */}
        <PageHeader img={KitchenTwo} title="showrooms" />

        {/* Region Filters */}
        <div className="mb-8 sticky top-20 bg-white px-2 py-4 rounded-lg border border-gray-200 shadow-none">
          <h2 className="text-sm font-semibold uppercase tracking-wider text-muted-foreground">
            Filter by Region
          </h2>
          <div className="mt-3 flex flex-wrap gap-2">
            {regionsLoading ? (
              Array.from({ length: 4 }).map((_, i) => (
                <UiSkeleton.Skeleton
                  key={i}
                  className="h-9 w-28 rounded-full"
                />
              ))
            ) : regionsError ? (
              <p className="text-sm text-muted-foreground">
                Could not load regions.
              </p>
            ) : (
              <>
                {regions?.map((region) => (
                  <UiButton.Button
                    key={region.id}
                    variant={activeRegion === region.id ? "default" : "outline"}
                    size="sm"
                    className="rounded-full"
                    onClick={() => setActiveRegion(region.id)}
                  >
                    {region.name}
                  </UiButton.Button>
                ))}
              </>
            )}
          </div>
        </div>

        <UiSeparator.Separator className="mb-8" />

        {/* Showrooms Grid */}
        {showroomsLoading ? (
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {Array.from({ length: 6 }).map((_, i) => (
              <UiSkeleton.Skeleton key={i} className="h-64 rounded-xl" />
            ))}
          </div>
        ) : showroomsError ? (
          <ErrorState
            title="Failed to load showrooms"
            message="We couldn't fetch the showroom data. Please try again."
            onRetry={() => window.location.reload()}
          />
        ) : showrooms && showrooms.length > 0 ? (
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {showrooms.map((showroom) => (
              <UiCard.Card
                key={showroom.id}
                className="overflow-hidden shadow-none"
              >
                {showroom.image ? (
                  <div className="relative h-40 w-full">
                    <Image
                      src={showroom.image}
                      alt={showroom.location}
                      fill
                      unoptimized
                      className="object-cover"
                    />
                  </div>
                ) : (
                  <div className="flex h-40 items-center justify-center bg-muted/50">
                    <Icon.StorefrontIcon className="size-10 text-muted-foreground/40" />
                  </div>
                )}

                <UiCard.CardContent className="space-y-3">
                  <div>
                    <h3 className="font-semibold">{showroom.location}</h3>
                    <p className="mt-1 text-sm text-muted-foreground">
                      {showroom.description}
                    </p>
                  </div>

                  <div className="space-y-2 text-sm text-muted-foreground">
                    <div className="flex items-center gap-2">
                      <Icon.PhoneIcon className="size-4 shrink-0" />
                      <a
                        href={`tel:${showroom.tel}`}
                        className="hover:text-foreground hover:underline"
                      >
                        {showroom.tel}
                      </a>
                    </div>
                    <div className="flex items-center gap-2">
                      <Icon.MapPinIcon className="size-4 shrink-0" />
                      <span>{showroom.digital_address}</span>
                    </div>
                  </div>
                </UiCard.CardContent>

                <UiCard.CardFooter>
                  <UiButton.Button
                    variant="outline"
                    size="sm"
                    className="w-full rounded-full"
                    asChild
                  >
                    <a
                      href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(showroom.digital_address)}`}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <Icon.NavigationArrowIcon className="mr-1 size-4" />
                      Get Directions
                    </a>
                  </UiButton.Button>
                </UiCard.CardFooter>
              </UiCard.Card>
            ))}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center py-16 text-center">
            <Icon.StorefrontIcon className="size-12 text-muted-foreground/30" />
            <p className="mt-4 text-sm font-medium text-muted-foreground">
              No showrooms found in this region.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
