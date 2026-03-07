import type { Metadata } from "next";

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
  openGraph: {
    title:
      "Showrooms — Wired World (WiredWorld) | Accra Newtown, East Legon, Kasoa",
    description:
      "Experience our products in person. Visit a Wired World showroom in Accra Newtown, East Legon, or Kasoa — Mon–Sat, 8AM–6PM.",
  },
};

export default function ShowroomsLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <>{children}</>;
}
