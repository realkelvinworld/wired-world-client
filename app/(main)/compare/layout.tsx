import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Compare Products",
  description:
    "Compare electronics and home appliances side by side on WiredWorld. View detailed specifications, features, prices, and ratings for TVs, laptops, refrigerators, air conditioners, and more — so you can make an informed decision before you buy.",
  keywords: [
    "compare products",
    "product comparison",
    "compare electronics",
    "compare TVs",
    "compare appliances",
    "side by side comparison",
    "WiredWorld compare",
  ],
  openGraph: {
    title: "Compare Products — WiredWorld",
    description:
      "Compare electronics and appliances side by side. Specs, features, and prices — all in one view.",
  },
};

export default function CompareLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <>{children}</>;
}
