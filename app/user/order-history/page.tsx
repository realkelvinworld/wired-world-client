"use client";

import { PackageIcon, WarningCircleIcon } from "@phosphor-icons/react";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";

import { getOrderHistoryService } from "@/services/user";
import Paginator from "@/components/ui/paginator";
import { FiltersInterface } from "@/interfaces";

import { OrderCard, OrderCardSkeleton } from "./(components)/order-card";

export default function OrderHistoryPage() {
  const [filters, setFilters] = useState<FiltersInterface>({
    page: 1,
    drop: 20,
  });

  const { data, isPending, error } = useQuery({
    queryKey: ["order-history", filters.page, filters.drop],
    queryFn: () =>
      getOrderHistoryService({
        type: "history",
        page: filters.page ?? 1,
        drop: filters.drop ?? 20,
        filters: {},
      }),
  });

  const orders = data?.info ?? [];
  const paginationItems = data?.paginator?.items;
  const paginationNext = data?.paginator?.next;
  const paginationPrev = data?.paginator?.prev;
  const paginationTotal = data?.paginator?.total_items;
  const paginationNextPage = data?.paginator?.next_page;

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-lg font-semibold">Order History</h1>
        <p className="text-sm text-muted-foreground">
          View your past orders and their status.
        </p>
      </div>

      {/* Loading */}
      {isPending && (
        <div>
          {Array.from({ length: 4 }).map((_, i) => (
            <OrderCardSkeleton key={i} isLast={i === 3} />
          ))}
        </div>
      )}

      {/* Error */}
      {error && !isPending && (
        <div className="flex flex-col items-center justify-center gap-4 py-20">
          <div className="flex size-16 items-center justify-center rounded-full bg-destructive/10">
            <WarningCircleIcon className="size-8 text-destructive" />
          </div>
          <div className="text-center">
            <h3 className="text-sm font-semibold">Something went wrong</h3>
            <p className="mt-1 text-sm text-muted-foreground">
              We couldn&apos;t load your orders. Please try again.
            </p>
          </div>
        </div>
      )}

      {/* Empty */}
      {!isPending && !error && orders.length === 0 && (
        <div className="flex flex-col items-center justify-center gap-4 py-20">
          <div className="flex size-16 items-center justify-center rounded-full bg-muted">
            <PackageIcon className="size-8 text-muted-foreground" />
          </div>
          <div className="text-center">
            <h3 className="text-sm font-semibold">No orders yet</h3>
            <p className="mt-1 text-sm text-muted-foreground">
              Your order history will appear here once you make a purchase.
            </p>
          </div>
        </div>
      )}

      {/* Orders timeline */}
      {!isPending && !error && orders.length > 0 && (
        <>
          <div>
            {orders.map((order, index) => (
              <OrderCard
                key={order.id}
                order={order}
                isLast={index === orders.length - 1}
              />
            ))}
          </div>

          <Paginator
            filters={filters}
            items={paginationItems ?? 0}
            setFilters={setFilters}
            next={paginationNext}
            prev={paginationPrev}
            total={paginationTotal}
            next_page={paginationNextPage}
          />
        </>
      )}
    </div>
  );
}
