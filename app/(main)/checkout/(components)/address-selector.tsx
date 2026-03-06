"use client";

import { PlusIcon, TrashIcon, MapPinIcon } from "@phosphor-icons/react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useState } from "react";

import { newAddressSchema, type NewAddressValues } from "@/schemas/checkout";
import {
  UiButton,
  UiCard,
  UiSkeleton,
  UiSeparator,
  UiSpinner,
} from "@/components/ui";
import { useAddressActions, useAddresses } from "@/hooks/use-address";
import { Address } from "@/models/address";

import AddressFields from "./address-fields";

interface AddressSelectorProps {
  selectedId: number | null;
  onSelect: (id: number) => void;
}

export default function AddressSelector({
  selectedId,
  onSelect,
}: AddressSelectorProps) {
  // state
  const [showNewForm, setShowNewForm] = useState(false);

  // api
  const { addresses, isPending } = useAddresses();
  const { addMutation, deleteMutation } = useAddressActions();

  // hooks
  const form = useForm<NewAddressValues>({
    resolver: zodResolver(newAddressSchema),
    mode: "all",
    defaultValues: {
      street_address: "",
      apartment: "",
      city: "",
      region: "",
      zip: "",
    },
  });

  // functions
  function handleAddAddress(data: NewAddressValues) {
    addMutation.mutate(data, {
      onSuccess: () => {
        form.reset();
        setShowNewForm(false);
      },
    });
  }

  if (isPending) {
    return (
      <div className="space-y-3">
        {Array.from({ length: 2 }).map((_, i) => (
          <UiSkeleton.Skeleton key={i} className="h-20 w-full rounded-xl" />
        ))}
      </div>
    );
  }

  return (
    <div className="space-y-3">
      {/* Saved addresses */}
      {addresses.length === 0 && !showNewForm && (
        <p className="text-sm text-muted-foreground">
          No saved addresses yet. Add one below.
        </p>
      )}

      {addresses.map((address: Address) => {
        const isSelected = selectedId === address.id;
        return (
          <button
            key={address.id}
            type="button"
            onClick={() => onSelect(address.id)}
            className={`w-full rounded-xl border p-4 text-left transition-colors ${
              isSelected
                ? "border-primary bg-primary/5"
                : "border-border hover:border-primary/40"
            }`}
          >
            <div className="flex items-start justify-between gap-3">
              <div className="flex items-start gap-3">
                <MapPinIcon
                  className={`mt-0.5 size-4 shrink-0 ${isSelected ? "text-primary" : "text-muted-foreground"}`}
                />
                <div className="space-y-0.5">
                  <p className="text-sm font-medium">
                    {address.street_address}
                    {address.apartment ? `, ${address.apartment}` : ""}
                  </p>
                  <p className="text-xs text-muted-foreground">
                    {address.city}, {address.region} {address.zip}
                  </p>
                </div>
              </div>
              <UiButton.Button
                type="button"
                variant="ghost"
                size="icon"
                className="size-7 shrink-0 text-muted-foreground hover:text-destructive"
                disabled={deleteMutation.isPending}
                onClick={(e) => {
                  e.stopPropagation();
                  deleteMutation.mutate(address.id);
                }}
              >
                {deleteMutation.isPending ? (
                  <UiSpinner.Spinner className="size-3" />
                ) : (
                  <TrashIcon className="size-3.5" />
                )}
              </UiButton.Button>
            </div>
          </button>
        );
      })}

      {/* Add new address */}
      {!showNewForm ? (
        <UiButton.Button
          type="button"
          variant="outline"
          size="sm"
          className="w-full"
          onClick={() => setShowNewForm(true)}
        >
          <PlusIcon className="mr-2 size-4" />
          Add new address
        </UiButton.Button>
      ) : (
        <UiCard.Card className="border-dashed">
          <UiCard.CardHeader className="pb-3">
            <UiCard.CardTitle className="text-sm">New Address</UiCard.CardTitle>
          </UiCard.CardHeader>
          <UiCard.CardContent>
            <form
              onSubmit={form.handleSubmit(handleAddAddress)}
              className="space-y-4"
            >
              <AddressFields control={form.control} />
              <UiSeparator.Separator />
              <div className="flex justify-end gap-2">
                <UiButton.Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  onClick={() => {
                    setShowNewForm(false);
                    form.reset();
                  }}
                >
                  Cancel
                </UiButton.Button>
                <UiButton.Button
                  type="submit"
                  size="sm"
                  disabled={addMutation.isPending || !form.formState.isValid}
                >
                  {addMutation.isPending ? (
                    <UiSpinner.Spinner className="text-secondary" />
                  ) : (
                    "Save address"
                  )}
                </UiButton.Button>
              </div>
            </form>
          </UiCard.CardContent>
        </UiCard.Card>
      )}
    </div>
  );
}
