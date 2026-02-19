import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Terms & Conditions",
  description:
    "Read the WiredWorld terms and conditions. This page outlines the rules and regulations governing your use of our website, purchase of products, delivery policies, return and refund procedures, warranty information, and your rights and responsibilities as a customer.",
  keywords: [
    "terms and conditions",
    "WiredWorld terms",
    "purchase terms",
    "return policy",
    "refund policy",
    "warranty terms",
    "user agreement",
  ],
  openGraph: {
    title: "Terms & Conditions — WiredWorld",
    description:
      "Our terms and conditions covering purchases, deliveries, returns, refunds, and warranties.",
  },
};

export default function TermsLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <>{children}</>;
}
