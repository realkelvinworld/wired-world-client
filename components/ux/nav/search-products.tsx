"use client";

import {
  GhostIcon,
  MagnifyingGlassIcon,
  SpinnerGapIcon,
} from "@phosphor-icons/react";
import { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import Image from "next/image";

import { getProductsService } from "@/services/inventory";
import { formatPrice } from "@/lib/format-price";
import { UiButton, UiCommand } from "@/components/ui";
import { routes } from "@/routes";

export function SearchProducts() {
  // state
  const [open, setOpen] = useState(false);
  const [search, setSearch] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState("");

  // derived state: reset search when dialog closes
  const [prevOpen, setPrevOpen] = useState(open);
  if (prevOpen !== open) {
    setPrevOpen(open);
    if (!open) {
      setSearch("");
      setDebouncedSearch("");
    }
  }

  // routes
  const router = useRouter();

  // effect
  useEffect(() => {
    const timer = setTimeout(() => setDebouncedSearch(search.trim()), 400);
    return () => clearTimeout(timer);
  }, [search]);

  // api
  const { data, isPending } = useQuery({
    queryKey: ["nav-search", debouncedSearch],
    queryFn: () =>
      getProductsService({
        type: "list",
        filters: { search: debouncedSearch },
        drop: 20,
      }),
    enabled: debouncedSearch.length > 0,
  });

  // variables
  const products = data?.info ?? [];
  const isLoading = isPending && debouncedSearch.length > 0;
  const isEmpty =
    !isPending && debouncedSearch.length > 0 && products.length === 0;

  // functions
  function handleSelect(id: number) {
    router.push(routes.shop.productDetails(id));
    setOpen(false);
  }

  return (
    <>
      <UiButton.Button
        variant="outline"
        size="icon"
        className="rounded-full border border-primary/10"
        onClick={() => setOpen(true)}
      >
        <MagnifyingGlassIcon />
      </UiButton.Button>

      <UiCommand.CommandDialog
        open={open}
        onOpenChange={setOpen}
        title="Search Products"
        description="Search for products by name"
        className="sm:max-w-2xl rounded-2xl shadow-2xl"
      >
        <UiCommand.Command
          shouldFilter={false}
          className="**:[[cmdk-input-wrapper]]:py-4 **:[[cmdk-input-wrapper]]:px-4 **:[[cmdk-input]]:text-base"
        >
          <UiCommand.CommandInput
            placeholder="Search products..."
            value={search}
            onValueChange={setSearch}
          />
          <UiCommand.CommandList className="max-h-100 px-2">
            {isLoading && (
              <div className="flex items-center justify-center gap-2 py-6 text-sm text-muted-foreground">
                <SpinnerGapIcon className="size-4 animate-spin" />
                Searching...
              </div>
            )}

            {isEmpty && (
              <UiCommand.CommandEmpty className="flex flex-col justify-center items-center py-10">
                <GhostIcon size={25} className="text-gray-400" />
                No products found for &quot;{debouncedSearch}&quot;
              </UiCommand.CommandEmpty>
            )}

            {!isLoading && products.length > 0 && (
              <UiCommand.CommandGroup heading={`Results (${products.length})`}>
                {products.map((product) => (
                  <UiCommand.CommandItem
                    key={product.id}
                    value={String(product.id)}
                    onSelect={() => handleSelect(product.id)}
                    className="flex items-center gap-3 py-2 cursor-pointer"
                  >
                    <div className="size-12 shrink-0 overflow-hidden rounded-md bg-muted">
                      {product.images[0] && (
                        <Image
                          src={product.images[0]}
                          alt={product.name}
                          width={48}
                          height={48}
                          className="size-full object-cover"
                        />
                      )}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium truncate">
                        {product.name}
                      </p>
                      <p className="text-xs text-muted-foreground truncate">
                        {product.brand__name} &middot; {product.category__name}
                      </p>
                    </div>
                    <div className="shrink-0 text-right">
                      <p className="text-sm font-semibold">
                        {formatPrice(
                          product.currency,
                          product.discounted_price || product.price,
                        )}
                      </p>
                      {product.on_promotion &&
                        product.discounted_price !== product.price && (
                          <p className="text-xs text-muted-foreground line-through">
                            {formatPrice(product.currency, product.price)}
                          </p>
                        )}
                    </div>
                  </UiCommand.CommandItem>
                ))}
              </UiCommand.CommandGroup>
            )}
          </UiCommand.CommandList>
        </UiCommand.Command>
      </UiCommand.CommandDialog>
    </>
  );
}
