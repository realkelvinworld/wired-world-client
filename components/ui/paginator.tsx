import { ChevronLeftIcon, ChevronRightIcon } from "lucide-react";
import React from "react";

import { formatToLocalString } from "@/lib/utils";
import { FiltersInterface } from "@/interfaces";

import { UiSelect } from ".";

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

export default function Paginator({
  items,
  filters,
  setFilters,
  next,
  prev,
  total,
  next_page,
}: PaginatorProps) {
  /**
   * functions
   */

  const handlePageChange = (page: number) => {
    setFilters((prev) => ({
      ...prev,
      page: page,
    }));
  };

  const changeDropCount = (value: string) => {
    setFilters((prev) => ({
      ...prev,
      drop: Number(value),
    }));
  };

  // Current Page
  const currentPage = next_page && next_page > 1 ? next_page - 1 : 1;

  return (
    <>
      <div className="lg:hidden md:hidden  flex justify-end">
        {items > 0 && (
          <p className="text-muted-foreground ">
            Showing {items || filters.drop}{" "}
            {filters?.drop || items === 1 ? "item" : "items"} out of{" "}
            {total && formatToLocalString(total)} total{" "}
            {filters?.drop || items === 1 ? "item" : "items"} on page{" "}
            {currentPage ?? 1}
          </p>
        )}
      </div>
      <div className="flex flex-row justify-between items-center gap-1">
        <button
          onClick={() => {
            if (prev) {
              handlePageChange((filters.page ?? 1) - 1);
            }
          }}
          disabled={prev === false}
          className={`inline-flex items-center gap-1 rounded-md border border-input bg-background px-3 py-2 text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 ${
            prev === false ? "" : "hover:bg-accent hover:text-accent-foreground"
          }`}
        >
          <ChevronLeftIcon className="size-4" />
          <span className="hidden sm:block">Previous</span>
        </button>

        <section className="flex items-center gap-x-1">
          <div className="lg:block md:block hidden">
            {items > 0 && (
              <p className="text-muted-foreground px-2">
                Showing {formatToLocalString(items) || filters.drop}{" "}
                {filters?.drop || items === 1 ? "item" : "items"} out of{" "}
                {total && formatToLocalString(total)} total{" "}
                {filters?.drop || items === 1 ? "item" : "items"} on page{" "}
                {currentPage ?? 1}
              </p>
            )}
          </div>
          <div>
            <UiSelect.Select
              value={filters?.drop ? filters?.drop.toString() : "8"}
              onValueChange={(value) => changeDropCount(value)}
            >
              <UiSelect.SelectTrigger className="w-full inline-flex items-center gap-1 rounded-md border border-input bg-background px-3 py-2 text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50">
                <UiSelect.SelectValue>
                  {filters?.drop
                    ? ` ${filters?.drop} item${
                        filters?.drop === 1 ? "" : "s"
                      }  on page`
                    : `${items} item${items === 1 ? "" : "s"}  on page`}
                </UiSelect.SelectValue>
              </UiSelect.SelectTrigger>
              <UiSelect.SelectContent>
                <UiSelect.SelectItem value="20">
                  20 items per page
                </UiSelect.SelectItem>
                <UiSelect.SelectItem value="50">
                  50 items per page
                </UiSelect.SelectItem>
                <UiSelect.SelectItem value="100">
                  100 items per page
                </UiSelect.SelectItem>
                <UiSelect.SelectItem value="250">
                  250 items per page
                </UiSelect.SelectItem>
                <UiSelect.SelectItem value="500">
                  500 items per page
                </UiSelect.SelectItem>
              </UiSelect.SelectContent>
            </UiSelect.Select>
          </div>
          <button
            onClick={() => {
              if (next) {
                handlePageChange((filters.page ?? 1) + 1);
              }
            }}
            disabled={next === false}
            className={`inline-flex items-center gap-1 rounded-md border border-input bg-background px-3 py-2 text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 ${
              next === false
                ? ""
                : "hover:bg-accent hover:text-accent-foreground"
            }`}
          >
            <span className="hidden sm:block">Next</span>
            <ChevronRightIcon className="size-4" />
          </button>
        </section>
      </div>
    </>
  );
}
