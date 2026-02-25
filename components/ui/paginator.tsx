import {
  CaretLeftIcon,
  CaretRightIcon,
  ListDashesIcon,
} from "@phosphor-icons/react";
import React from "react";

import { formatToLocalString } from "@/lib/utils";
import { FiltersInterface } from "@/interfaces";

import { UiButton, UiSelect } from ".";

// PROPS
type PaginatorProps = React.HTMLAttributes<HTMLDivElement> & {
  filters: FiltersInterface;
  setFilters: React.Dispatch<React.SetStateAction<FiltersInterface>>;
  next?: boolean;
  prev?: boolean;
  items: number;
  total?: number;
  next_page?: number;
  previous_page?: number;
};

function getVisiblePages(current: number, total: number): (number | "dots")[] {
  if (total <= 7) return Array.from({ length: total }, (_, i) => i + 1);

  const pages: (number | "dots")[] = [];

  if (current <= 3) {
    pages.push(1, 2, 3, 4, "dots", total);
  } else if (current >= total - 2) {
    pages.push(1, "dots", total - 3, total - 2, total - 1, total);
  } else {
    pages.push(1, "dots", current - 1, current, current + 1, "dots", total);
  }

  return pages;
}

export default function Paginator({
  items,
  filters,
  setFilters,
  next,
  prev,
  total,
  next_page,
}: PaginatorProps) {
  const handlePageChange = (page: number) => {
    setFilters((prev) => ({ ...prev, page }));
  };

  const changeDropCount = (value: string) => {
    setFilters((prev) => ({ ...prev, drop: Number(value), page: 1 }));
  };

  const currentPage = next_page && next_page > 1 ? next_page - 1 : 1;
  const drop = filters.drop || items || 20;
  const totalPages = total ? Math.ceil(total / drop) : 1;
  const progress = totalPages > 0 ? (currentPage / totalPages) * 100 : 0;
  const visiblePages = getVisiblePages(currentPage, totalPages);

  return (
    <div className="space-y-3">
      {/* Progress track */}
      <div className="h-0.5 w-full overflow-hidden rounded-full bg-border">
        <div
          className="h-full rounded-full bg-primary transition-all duration-500 ease-out"
          style={{ width: `${Math.max(progress, 2)}%` }}
        />
      </div>

      {/* Controls */}
      <div className="flex flex-wrap items-center justify-between gap-3">
        {/* Left: info + per-page */}
        <div className="flex items-center gap-2 text-sm">
          {total != null && total > 0 && (
            <span className="text-muted-foreground">
              <span className="font-medium text-foreground">
                {formatToLocalString(total)}
              </span>{" "}
              items
            </span>
          )}

          <UiSelect.Select
            value={drop.toString()}
            onValueChange={changeDropCount}
          >
            <UiSelect.SelectTrigger className="h-7 w-auto gap-1.5 rounded-full border-dashed px-2.5 text-xs text-muted-foreground">
              <ListDashesIcon weight="bold" className="size-3.5" />
              <UiSelect.SelectValue>{drop}/pg</UiSelect.SelectValue>
            </UiSelect.SelectTrigger>
            <UiSelect.SelectContent align="start">
              {[20, 50, 100, 250, 500].map((n) => (
                <UiSelect.SelectItem key={n} value={n.toString()}>
                  {n} per page
                </UiSelect.SelectItem>
              ))}
            </UiSelect.SelectContent>
          </UiSelect.Select>
        </div>

        {/* Right: page numbers + nav arrows */}
        <div className="flex items-center gap-1">
          {/* Page numbers */}
          {visiblePages.map((page, i) =>
            page === "dots" ? (
              <span
                key={`dots-${i}`}
                className="px-1 text-sm text-muted-foreground select-none"
              >
                ...
              </span>
            ) : (
              <UiButton.Button
                key={page}
                variant={page === currentPage ? "default" : "ghost"}
                size="icon-xs"
                onClick={() => handlePageChange(page)}
                className="rounded-full text-xs"
              >
                {page}
              </UiButton.Button>
            ),
          )}

          {/* Nav arrows */}
          <div className="ml-1 flex items-center">
            <UiButton.Button
              variant="ghost"
              size="icon-xs"
              onClick={() =>
                prev && handlePageChange((filters.page ?? 1) - 1)
              }
              disabled={!prev}
            >
              <CaretLeftIcon weight="bold" />
            </UiButton.Button>
            <UiButton.Button
              variant="ghost"
              size="icon-xs"
              onClick={() =>
                next && handlePageChange((filters.page ?? 1) + 1)
              }
              disabled={!next}
            >
              <CaretRightIcon weight="bold" />
            </UiButton.Button>
          </div>
        </div>
      </div>
    </div>
  );
}
