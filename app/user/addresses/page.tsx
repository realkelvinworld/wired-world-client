"use client";

import {
  MapPinIcon,
  PencilSimpleIcon,
  PlusIcon,
  TrashIcon,
} from "@phosphor-icons/react";
import { useState } from "react";

import { useAddressActions, useAddresses } from "@/hooks/use-address";
import { Address } from "@/models/address";
import {
  UiAlertDialog,
  UiButton,
  UiCard,
  UiSkeleton,
  UiSpinner,
} from "@/components/ui";

import AddressFormModal from "./(components)/address-form-modal";

export default function AddressesPage() {
  // state
  const [modalOpen, setModalOpen] = useState(false);
  const [editing, setEditing] = useState<Address | null>(null);
  const [deletingId, setDeletingId] = useState<number | null>(null);

  // api
  const { addresses, isPending } = useAddresses();
  const { deleteMutation } = useAddressActions();

  // functions
  function openAdd() {
    setEditing(null);
    setModalOpen(true);
  }

  function openEdit(address: Address) {
    setEditing(address);
    setModalOpen(true);
  }

  function handleDelete(id: number) {
    deleteMutation.mutate(id, {
      onSuccess: () => setDeletingId(null),
    });
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-lg font-semibold">Addresses</h1>
          <p className="text-sm text-muted-foreground">
            Manage your saved delivery addresses.
          </p>
        </div>
        <UiButton.Button
          size="sm"
          className="rounded-full gap-1.5"
          onClick={openAdd}
        >
          <PlusIcon weight="bold" className="size-3.5" />
          Add Address
        </UiButton.Button>
      </div>

      {/* List */}
      {isPending ? (
        <AddressesSkeleton />
      ) : addresses.length === 0 ? (
        <UiCard.Card className="py-12 shadow-none">
          <UiCard.CardContent className="flex flex-col items-center gap-3 text-center">
            <MapPinIcon className="size-10 text-muted-foreground/40" />
            <p className="text-sm text-muted-foreground">
              No addresses saved yet.
            </p>
            <UiButton.Button
              variant="outline"
              size="sm"
              className="rounded-full"
              onClick={openAdd}
            >
              Add your first address
            </UiButton.Button>
          </UiCard.CardContent>
        </UiCard.Card>
      ) : (
        <div className="grid gap-4 sm:grid-cols-2">
          {addresses.map((address: Address) => (
            <UiCard.Card key={address.id} className="shadow-none">
              <UiCard.CardContent className="p-5">
                <div className="flex items-start justify-between gap-3">
                  <div className="flex items-start gap-3">
                    <div className="mt-0.5 flex size-8 shrink-0 items-center justify-center rounded-lg bg-muted">
                      <MapPinIcon className="size-4 text-muted-foreground" />
                    </div>
                    <div className="space-y-0.5">
                      <p className="text-sm font-medium leading-snug">
                        {address.street_address}
                        {address.apartment ? `, ${address.apartment}` : ""}
                      </p>
                      <p className="text-xs text-muted-foreground">
                        {address.city}, {address.region} {address.zip}
                      </p>
                    </div>
                  </div>

                  <div className="flex shrink-0 gap-1">
                    <UiButton.Button
                      variant="ghost"
                      size="icon"
                      className="size-8 text-muted-foreground hover:text-foreground"
                      onClick={() => openEdit(address)}
                    >
                      <PencilSimpleIcon className="size-3.5" />
                    </UiButton.Button>

                    <UiAlertDialog.AlertDialog
                      open={deletingId === address.id}
                      onOpenChange={(open) =>
                        setDeletingId(open ? address.id : null)
                      }
                    >
                      <UiAlertDialog.AlertDialogTrigger asChild>
                        <UiButton.Button
                          variant="ghost"
                          size="icon"
                          className="size-8 text-muted-foreground hover:text-destructive"
                        >
                          <TrashIcon className="size-3.5" />
                        </UiButton.Button>
                      </UiAlertDialog.AlertDialogTrigger>
                      <UiAlertDialog.AlertDialogContent>
                        <UiAlertDialog.AlertDialogHeader>
                          <UiAlertDialog.AlertDialogTitle>
                            Remove address?
                          </UiAlertDialog.AlertDialogTitle>
                          <UiAlertDialog.AlertDialogDescription>
                            This address will be permanently deleted and cannot
                            be recovered.
                          </UiAlertDialog.AlertDialogDescription>
                        </UiAlertDialog.AlertDialogHeader>
                        <UiAlertDialog.AlertDialogFooter>
                          <UiAlertDialog.AlertDialogCancel>
                            Cancel
                          </UiAlertDialog.AlertDialogCancel>
                          <UiAlertDialog.AlertDialogAction
                            onClick={() => handleDelete(address.id)}
                            disabled={deleteMutation.isPending}
                            className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
                          >
                            {deleteMutation.isPending ? (
                              <UiSpinner.Spinner className="text-secondary" />
                            ) : (
                              "Remove"
                            )}
                          </UiAlertDialog.AlertDialogAction>
                        </UiAlertDialog.AlertDialogFooter>
                      </UiAlertDialog.AlertDialogContent>
                    </UiAlertDialog.AlertDialog>
                  </div>
                </div>
              </UiCard.CardContent>
            </UiCard.Card>
          ))}
        </div>
      )}

      {/* Add / Edit modal */}
      <AddressFormModal
        open={modalOpen}
        onOpenChange={setModalOpen}
        editing={editing}
      />
    </div>
  );
}

function AddressesSkeleton() {
  return (
    <div className="grid gap-4 sm:grid-cols-2">
      {Array.from({ length: 3 }).map((_, i) => (
        <UiCard.Card key={i} className="shadow-none">
          <UiCard.CardContent className="p-5">
            <div className="flex items-start gap-3">
              <UiSkeleton.Skeleton className="size-8 shrink-0 rounded-lg" />
              <div className="flex-1 space-y-1.5">
                <UiSkeleton.Skeleton className="h-4 w-3/4" />
                <UiSkeleton.Skeleton className="h-3 w-1/2" />
              </div>
            </div>
          </UiCard.CardContent>
        </UiCard.Card>
      ))}
    </div>
  );
}
