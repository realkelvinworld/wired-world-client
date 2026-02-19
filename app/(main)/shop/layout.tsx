import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Shop",
  description:
    "Browse the full WiredWorld catalogue of electronics and home appliances. From smart TVs, soundbars, and laptops to refrigerators, washing machines, and air conditioners — find everything you need at competitive prices with fast delivery across Ghana.",
  keywords: [
    "shop electronics",
    "buy appliances online",
    "smart TVs",
    "laptops",
    "refrigerators",
    "washing machines",
    "air conditioners",
    "soundbars",
    "online electronics store Ghana",
    "WiredWorld shop",
  ],
  openGraph: {
    title: "Shop — WiredWorld",
    description:
      "Browse our full range of electronics and home appliances. Great prices, fast delivery, trusted brands.",
  },
};

export default function ShopLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <>{children}</>;
}
