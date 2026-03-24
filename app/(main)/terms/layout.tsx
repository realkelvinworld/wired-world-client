import type { Metadata } from "next";

const siteUrl = "https://wiredworldgh.com";

export const metadata: Metadata = {
  title: "Terms & Conditions | Wired World Limited",
  description:
    "Read the Wired World Limited (WiredWorld) terms and conditions. Covers purchase rules, delivery policies, return and refund procedures, warranty information, and your rights and responsibilities as a customer.",
  keywords: [
    "Wired World terms and conditions",
    "WiredWorld terms",
    "purchase terms Ghana",
    "return policy Ghana",
    "refund policy Ghana",
    "warranty terms Ghana",
    "user agreement",
  ],
  alternates: {
    canonical: "/terms",
  },
  openGraph: {
    type: "website",
    url: `${siteUrl}/terms`,
    title: "Terms & Conditions — Wired World (WiredWorld)",
    description:
      "Our terms and conditions covering purchases, deliveries, returns, refunds, and warranties.",
    images: [
      {
        url: `${siteUrl}/logos/WIRED-WORLD-2.png`,
        width: 512,
        height: 512,
        alt: "WiredWorld Logo",
      },
    ],
  },
  twitter: {
    card: "summary",
    title: "Terms & Conditions | WiredWorld Ghana",
    description: "Purchase terms, delivery policy, returns, refunds & warranty information.",
    images: [`${siteUrl}/logos/WIRED-WORLD-2.png`],
  },
};

export default function TermsLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <>{children}</>;
}
