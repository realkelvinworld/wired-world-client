"use client";

import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";

import { createOrderService, guestOrderService } from "@/services/user";
import { GuestOrderPayload } from "@/models/checkout";

export function useGuestCheckout() {
  return useMutation({
    mutationFn: (payload: GuestOrderPayload) => guestOrderService(payload),
    onError: () => toast.error("Failed to place order. Please try again."),
  });
}

export function useUserCheckout() {
  return useMutation({
    mutationFn: (address_id: number) => createOrderService(address_id),
    onError: () => toast.error("Failed to place order. Please try again."),
  });
}
