import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Checkout | Secure Payment — WiredWorld Ghana",
  description:
    "Complete your Wired World (WiredWorld) purchase securely. We accept Mobile Money (MTN MoMo, Vodafone Cash), bank transfers, card payments, and pay on delivery. Fast, reliable nationwide delivery across Ghana.",
  keywords: [
    "WiredWorld checkout",
    "Wired World checkout",
    "buy electronics Ghana",
    "secure online payment Ghana",
    "Mobile Money electronics Ghana",
    "MTN MoMo payment Ghana",
    "Vodafone Cash payment Ghana",
    "pay on delivery Ghana",
    "bank transfer electronics Ghana",
    "card payment electronics Ghana",
    "online order Ghana",
    "delivery Ghana",
  ],
  openGraph: {
    title: "Checkout — Wired World (WiredWorld)",
    description:
      "Securely complete your purchase. Mobile Money, card, bank transfer & pay on delivery accepted. Fast nationwide delivery.",
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
