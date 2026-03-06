"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useEffect } from "react";

import { newAddressSchema, type NewAddressValues } from "@/schemas/checkout";
import { useAddressActions } from "@/hooks/use-address";
import { Address } from "@/models/address";
import { UiButton, UiDialog, UiSeparator, UiSpinner } from "@/components/ui";

import AddressFields from "../../../(main)/checkout/(components)/address-fields";

interface AddressFormModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  editing?: Address | null;
}

export default function AddressFormModal({
  open,
  onOpenChange,
  editing = null,
}: AddressFormModalProps) {
  // hooks
  const { addMutation, updateMutation } = useAddressActions();

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

  // effect
  useEffect(() => {
    if (editing) {
      form.reset({
        street_address: editing.street_address,
        apartment: editing.apartment ?? "",
        city: editing.city,
        region: editing.region,
        zip: editing.zip,
      });
    } else {
      form.reset({
        street_address: "",
        apartment: "",
        city: "",
        region: "",
        zip: "",
      });
    }
  }, [editing, open, form]);

  // variables
  const isEditing = !!editing;
  const isPending = addMutation.isPending || updateMutation.isPending;

  // functions
  function onSubmit(data: NewAddressValues) {
    if (isEditing) {
      updateMutation.mutate(
        { id: editing.id, ...data },
        { onSuccess: () => onOpenChange(false) },
      );
    } else {
      addMutation.mutate(data, {
        onSuccess: () => onOpenChange(false),
      });
    }
  }

  return (
    <UiDialog.Dialog open={open} onOpenChange={onOpenChange}>
      <UiDialog.DialogContent className="max-w-lg">
        <UiDialog.DialogHeader>
          <UiDialog.DialogTitle>
            {isEditing ? "Edit Address" : "Add New Address"}
          </UiDialog.DialogTitle>
          <UiDialog.DialogDescription>
            {isEditing
              ? "Update the details for this address."
              : "Fill in the fields below to save a new address."}
          </UiDialog.DialogDescription>
        </UiDialog.DialogHeader>

        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 pt-1">
          <AddressFields control={form.control} />

          <UiSeparator.Separator />

          <UiDialog.DialogFooter>
            <UiButton.Button
              type="button"
              variant="ghost"
              onClick={() => onOpenChange(false)}
              disabled={isPending}
            >
              Cancel
            </UiButton.Button>
            <UiButton.Button
              type="submit"
              disabled={isPending || !form.formState.isValid}
            >
              {isPending ? (
                <UiSpinner.Spinner className="text-secondary" />
              ) : isEditing ? (
                "Save Changes"
              ) : (
                "Add Address"
              )}
            </UiButton.Button>
          </UiDialog.DialogFooter>
        </form>
      </UiDialog.DialogContent>
    </UiDialog.Dialog>
  );
}
