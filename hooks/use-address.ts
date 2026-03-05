"use client";

import { useQueryClient, useMutation, useQuery } from "@tanstack/react-query";
import { toast } from "sonner";

import {
  deleteAddressService,
  updateAddressService,
  listAddressesService,
  addAddressService,
} from "@/services/user";

export const ADDRESS_KEY = ["addresses"];

export function useAddresses() {
  const hasToken =
    typeof document !== "undefined" && document.cookie.includes("access_token");

  const { data, isPending } = useQuery({
    queryKey: ADDRESS_KEY,
    queryFn: () => listAddressesService(),
    enabled: hasToken,
  });

  return { addresses: data?.info ?? [], isPending };
}

export function useAddressActions() {
  const queryClient = useQueryClient();
  const invalidate = () =>
    queryClient.invalidateQueries({ queryKey: ADDRESS_KEY });

  const addMutation = useMutation({
    mutationFn: addAddressService,
    onSuccess: () => {
      toast.success("Address added");
      invalidate();
    },
    onError: () => toast.error("Failed to add address"),
  });

  const updateMutation = useMutation({
    mutationFn: updateAddressService,
    onSuccess: () => {
      toast.success("Address updated");
      invalidate();
    },
    onError: () => toast.error("Failed to update address"),
  });

  const deleteMutation = useMutation({
    mutationFn: deleteAddressService,
    onSuccess: () => {
      toast.success("Address removed");
      invalidate();
    },
    onError: () => toast.error("Failed to remove address"),
  });

  return { addMutation, updateMutation, deleteMutation };
}
