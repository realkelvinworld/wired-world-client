import type { Metadata } from "next";

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
  openGraph: {
    title: "Terms & Conditions — Wired World (WiredWorld)",
    description:
      "Our terms and conditions covering purchases, deliveries, returns, refunds, and warranties.",
  },
  alternates: { canonical: "/terms" },
};

export default function TermsLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <>{children}</>;
}
