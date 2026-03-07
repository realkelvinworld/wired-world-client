import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Our Brands | Authorized Electronics Partners — Wired World Ghana",
  description:
    "Wired World Limited (WiredWorld) is an authorized retailer of Samsung, LG, Sony, TCL, Midea, Nasco, Sigma, Electrolux, MDV, Audiio, Bruhm, Pearl, Innova, Ariston, Tesla, JBL, and Harman. Every product is 100% genuine, sourced from authorized distributors and backed by full manufacturer warranties.",
  keywords: [
    "Wired World brands",
    "WiredWorld brands",
    "authorized electronics brands Ghana",
    "genuine electronics Ghana",
    "authentic electronics brands",
    "Samsung authorized retailer Ghana",
    "LG authorized retailer Ghana",
    "Sony authorized retailer Ghana",
    "Samsung",
    "LG",
    "Sony",
    "TCL",
    "Midea",
    "Nasco",
    "Sigma",
    "Electrolux",
    "MDV",
    "Audiio",
    "Bruhm",
    "Pearl",
    "Innova",
    "Ariston",
    "Tesla",
    "JBL",
    "Harman",
    "manufacturer warranty Ghana",
    "brand catalogue Ghana",
    "trusted electronics brands Ghana",
  ],
  openGraph: {
    title: "Authorized Brands — Wired World (WiredWorld) Ghana",
    description:
      "Discover the full lineup of authorized brands we carry — Samsung, LG, Sony, TCL, Midea, Nasco, JBL, Ariston & more. 100% genuine products backed by manufacturer warranties.",
  },
};

export default function BrandsLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <>{children}</>;
}
