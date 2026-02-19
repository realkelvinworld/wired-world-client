import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Checkout",
  description:
    "Complete your WiredWorld purchase securely. Review your cart, enter your delivery address, choose a payment method, and confirm your order. We support multiple payment options and offer fast, reliable delivery across Ghana.",
  keywords: [
    "checkout",
    "buy electronics",
    "secure payment",
    "online order",
    "delivery Ghana",
    "WiredWorld checkout",
  ],
  openGraph: {
    title: "Checkout — WiredWorld",
    description:
      "Securely complete your purchase with multiple payment options and fast delivery.",
  },
  robots: {
    index: false,
    follow: false,
  },
};

export default function CheckoutLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <>{children}</>;
}
