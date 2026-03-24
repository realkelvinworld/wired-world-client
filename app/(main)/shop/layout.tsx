import type { Metadata } from "next";

const siteUrl = "https://wiredworldgh.com";

export const metadata: Metadata = {
  title: "Shop Electronics & Home Appliances | Wired World Ghana",
  description:
    "Shop the full Wired World (WiredWorld) catalogue — smart TVs, home appliances, audio systems, gaming consoles, wearables, office & IT equipment and more. 15+ trusted brands including Samsung, LG, Sony, TCL, Midea, Nasco, Bruhm, JBL & Ariston. Nationwide delivery, Mobile Money accepted.",
  keywords: [
    "Wired World shop",
    "WiredWorld shop",
    "shop electronics Ghana",
    "buy appliances online Ghana",
    "smart TVs Ghana",
    "OLED TVs Ghana",
    "QLED TVs Ghana",
    "4K TVs Ghana",
    "buy TV online Ghana",
    "refrigerators Ghana",
    "buy fridge Ghana",
    "washing machines Ghana",
    "air conditioners Ghana",
    "buy AC Ghana",
    "soundbars Ghana",
    "headphones Ghana",
    "gaming consoles Ghana",
    "gaming accessories Ghana",
    "smartwatches Ghana",
    "fitness trackers Ghana",
    "printers Ghana",
    "projectors Ghana",
    "networking equipment Ghana",
    "office IT equipment Ghana",
    "kitchen appliances Ghana",
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
    "Mobile Money electronics",
    "MTN MoMo purchase",
    "pay on delivery Ghana",
    "nationwide delivery Ghana",
  ],
  alternates: {
    canonical: "/shop",
  },
  openGraph: {
    type: "website",
    url: `${siteUrl}/shop`,
    title: "Shop — Wired World (WiredWorld) | Electronics & Home Appliances Ghana",
    description:
      "Browse our full range of electronics and home appliances. Samsung, LG, Sony, TCL, Midea, Nasco & 15+ more brands. Great prices, nationwide delivery, Mobile Money accepted.",
    images: [
      {
        url: `${siteUrl}/images/HOME-BANNER-2.webp`,
        width: 1200,
        height: 630,
        alt: "Shop Electronics & Home Appliances at WiredWorld Ghana",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Shop Electronics & Home Appliances | WiredWorld Ghana",
    description:
      "Browse Samsung, LG, Sony, TCL & 15+ brands. Smart TVs, fridges, ACs, audio & more. Nationwide delivery, Mobile Money accepted.",
    images: [`${siteUrl}/images/HOME-BANNER-2.webp`],
  },
};

export default function ShopLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <>{children}</>;
}
