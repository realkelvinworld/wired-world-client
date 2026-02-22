import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Order History | WiredWorld",
  description:
    "View your past orders, track deliveries, and manage returns on WiredWorld.",
};

export default function OrderHistoryLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <>{children}</>;
}
