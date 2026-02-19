import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Brands",
  description:
    "Explore our curated selection of trusted electronics brands including LG, Samsung, Sony, TCL, Midea, and Nasco. Each brand is chosen for its quality, innovation, and reliability — so you can shop with confidence knowing every product meets our standards.",
  keywords: [
    "electronics brands",
    "LG",
    "Samsung",
    "Sony",
    "TCL",
    "Midea",
    "Nasco",
    "trusted brands",
    "brand catalogue",
    "WiredWorld brands",
  ],
  openGraph: {
    title: "Brands — WiredWorld",
    description:
      "Discover the top electronics brands we carry. From LG and Samsung to Sony and TCL — quality you can trust, all in one place.",
  },
};

export default function BrandsLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <>{children}</>;
}
