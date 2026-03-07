import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Compare Products",
  description:
    "Compare electronics and home appliances side by side on Wired World (WiredWorld). View detailed specifications, features, prices, and ratings for TVs, laptops, refrigerators, air conditioners, and more — so you can make an informed decision before you buy.",
  keywords: [
    "compare products",
    "product comparison",
    "compare electronics Ghana",
    "compare TVs Ghana",
    "compare appliances Ghana",
    "side by side comparison",
    "Wired World compare",
    "WiredWorld compare",
  ],
  openGraph: {
    title: "Compare Products — Wired World (WiredWorld)",
    description:
      "Compare electronics and appliances side by side. Specs, features, and prices — all in one view.",
  },
  robots: { index: false, follow: false },
};

export default function CompareLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <>{children}</>;
}
