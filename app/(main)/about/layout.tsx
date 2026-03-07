import type { Metadata } from "next";

export const metadata: Metadata = {
  title:
    "About Us | Wired World Limited \u2014 Ghana's Online Electronics Store",
  description:
    "Learn about Wired World Limited (WiredWorld) \u2014 Ghana's premier online electronics retailer founded in 2020. Our mission is to empower individuals, SMEs, schools, hotels, and corporations across Ghana through access to the world's best technology at competitive prices. Authentic products, nationwide delivery, world-class service.",
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
  openGraph: {
    title:
      "About Wired World Limited (WiredWorld) \u2014 Ghana's Electronics Store",
    description:
      "Ghana's premier online electronics destination since 2020. Authentic products, nationwide delivery, competitive pricing, and world-class B2B and corporate procurement services.",
  },
};

export default function AboutLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <>{children}</>;
}
