import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "About Us",
  description:
    "Wired World Limited is a premier online retail electronics company based in Accra, Ghana. Founded in 2020, we deliver quality consumer electronics from trusted brands like Samsung, LG, Sony, TCL, Midea, and Nasco to individuals, businesses, and institutions nationwide.",
  keywords: [
    "about WiredWorld",
    "Wired World Limited",
    "electronics company Ghana",
    "online electronics retailer Accra",
    "consumer electronics Ghana",
    "WiredWorld history",
    "Ghanaian electronics business",
    "trusted electronics brands Ghana",
    "B2B electronics Ghana",
    "buy electronics online Accra",
  ],
  openGraph: {
    title: "About Us \u2014 WiredWorld",
    description:
      "Ghana\u2019s premier online electronics destination. Authentic products from Samsung, LG, Sony & more \u2014 competitive pricing, nationwide delivery, and world-class customer service since 2020.",
  },
};

export default function AboutLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <>{children}</>;
}
