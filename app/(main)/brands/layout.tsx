import type { Metadata } from "next";

const siteUrl = "https://wiredworldgh.com";

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
  alternates: {
    canonical: "/brands",
  },
  openGraph: {
    type: "website",
    url: `${siteUrl}/brands`,
    title: "Authorized Brands — Wired World (WiredWorld) Ghana",
    description:
      "Discover the full lineup of authorized brands we carry — Samsung, LG, Sony, TCL, Midea, Nasco, JBL, Ariston & more. 100% genuine products backed by manufacturer warranties.",
    images: [
      {
        url: `${siteUrl}/images/HOME-BANNER-3.jpg`,
        width: 1200,
        height: 630,
        alt: "Authorized electronics brands at WiredWorld Ghana — Samsung, LG, Sony & more",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Authorized Brands | WiredWorld Ghana",
    description:
      "Shop Samsung, LG, Sony, TCL & 15+ authorized brands at WiredWorld. 100% genuine products with manufacturer warranties.",
    images: [`${siteUrl}/images/HOME-BANNER-3.jpg`],
  },
};

export default function BrandsLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <>{children}</>;
}
