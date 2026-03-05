"use client";

import { useUserStore } from "@/store/user";

import { OnlineCart } from "./cart/online-cart";
import { LocalCart } from "./cart/local-cart";

export function Cart() {
  const { user } = useUserStore();

  return <div>{user ? <OnlineCart /> : <LocalCart />}</div>;
}
