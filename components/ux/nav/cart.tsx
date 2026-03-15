"use client";

import { useUserStore } from "@/store/user";

import { OnlineCart } from "./cart/online-cart";
import { LocalCart } from "./cart/local-cart";
import { useState } from "react";

export function Cart() {
  const [open, setOpen] = useState(false);

  const { user } = useUserStore();

  return (
    <div>
      {user ? (
        <OnlineCart open={open} setOpen={setOpen} />
      ) : (
        <LocalCart open={open} setOpen={setOpen} />
      )}
    </div>
  );
}
