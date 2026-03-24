import type { Metadata } from "next";

const siteUrl = "https://wiredworldgh.com";

export const metadata: Metadata = {
  title: "Showrooms | Accra Newtown, East Legon & Kasoa — Wired World Ghana",
  description:
    "Visit a Wired World (WiredWorld) showroom and experience TVs, home appliances, and electronics in person. Locations in Accra Newtown, East Legon, and Kasoa. Our knowledgeable staff are ready to guide you. Open Mon–Sat, 8AM–6PM.",
  keywords: [
    "Wired World showroom",
    "WiredWorld showroom",
    "electronics showroom Accra",
    "electronics showroom Ghana",
    "showroom Accra Newtown",
    "showroom East Legon",
    "showroom Kasoa",
    "TV shop Accra",
    "TV shop East Legon",
    "TV shop Kasoa",
    "appliance store Accra",
    "electronics store near me Ghana",
    "visit electronics store Accra",
    "try before you buy electronics Ghana",
    "product demo Ghana",
  ],
  alternates: {
    canonical: "/showrooms",
  },
  openGraph: {
    type: "website",
    url: `${siteUrl}/showrooms`,
    title:
      "Showrooms — Wired World (WiredWorld) | Accra Newtown, East Legon, Kasoa",
    description:
      "Experience our products in person. Visit a Wired World showroom in Accra Newtown, East Legon, or Kasoa — Mon–Sat, 8AM–6PM.",
    images: [
      {
        url: `${siteUrl}/images/KITCHEN-TWO.jpg`,
        width: 1200,
        height: 630,
        alt: "WiredWorld showroom — electronics and home appliances in Accra Ghana",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Visit a WiredWorld Showroom | Accra Newtown, East Legon & Kasoa",
    description:
      "See TVs, fridges, ACs & more in person at our showrooms across Accra and Kasoa. Open Mon–Sat, 8AM–6PM.",
    images: [`${siteUrl}/images/KITCHEN-TWO.jpg`],
  },
};

export default function ShowroomsLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <>{children}</>;
}
