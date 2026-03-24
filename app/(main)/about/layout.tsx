import type { Metadata } from "next";

const siteUrl = "https://wiredworldgh.com";

export const metadata: Metadata = {
  title: "About Us | Wired World Limited — Ghana's Online Electronics Store",
  description:
    "Learn about Wired World Limited (WiredWorld) — Ghana's premier online electronics retailer founded in 2020. Our mission is to empower individuals, SMEs, schools, hotels, and corporations across Ghana through access to the world's best technology at competitive prices. Authentic products, nationwide delivery, world-class service.",
  keywords: [
    "about Wired World",
    "about WiredWorld",
    "Wired World Limited",
    "Wired World Ghana",
    "Wired World history",
    "WiredWorld founded 2020",
    "electronics company Ghana",
    "online electronics retailer Accra",
    "consumer electronics Ghana",
    "Ghanaian electronics business",
    "trusted electronics brands Ghana",
    "B2B electronics Ghana",
    "SME electronics Ghana",
    "corporate electronics Ghana",
    "electronics for schools Ghana",
    "electronics for hotels Ghana",
    "government electronics Ghana",
    "authorized brand distributor Ghana",
    "authentic electronics Ghana",
    "nationwide delivery electronics Ghana",
    "buy electronics online Accra",
  ],
  alternates: {
    canonical: "/about",
  },
  openGraph: {
    type: "website",
    url: `${siteUrl}/about`,
    title: "About Wired World Limited (WiredWorld) — Ghana's Electronics Store",
    description:
      "Ghana's premier online electronics destination since 2020. Authentic products, nationwide delivery, competitive pricing, and world-class B2B and corporate procurement services.",
    images: [
      {
        url: `${siteUrl}/images/WIRED-IMAGE1.jpeg`,
        width: 1200,
        height: 630,
        alt: "WiredWorld team and showroom — Ghana's premier electronics store",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "About WiredWorld — Ghana's Electronics Store Since 2020",
    description:
      "Founded in 2020, WiredWorld brings authentic electronics from Samsung, LG, Sony & 15+ brands to Ghana. B2B, SME & corporate procurement available.",
    images: [`${siteUrl}/images/WIRED-IMAGE1.jpeg`],
  },
};

export default function AboutLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <>{children}</>;
}
