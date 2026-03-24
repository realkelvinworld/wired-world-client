import type { Metadata } from "next";

const siteUrl = "https://wiredworldgh.com";

export const metadata: Metadata = {
  title: "Privacy Policy | Wired World Limited",
  description:
    "Read the Wired World Limited (WiredWorld) privacy policy. Learn how we collect, use, and protect your personal information when you shop with us in Ghana.",
  keywords: [
    "Wired World privacy policy",
    "WiredWorld privacy",
    "data protection Ghana",
    "personal information",
    "cookie policy",
    "data rights",
    "user privacy",
  ],
  alternates: {
    canonical: "/privacy",
  },
  openGraph: {
    type: "website",
    url: `${siteUrl}/privacy`,
    title: "Privacy Policy — Wired World (WiredWorld)",
    description:
      "How we collect, use, and protect your personal data. Your privacy matters to us.",
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
    title: "Privacy Policy | WiredWorld Ghana",
    description: "How WiredWorld collects, uses, and protects your personal data.",
    images: [`${siteUrl}/logos/WIRED-WORLD-2.png`],
  },
};

export default function PrivacyLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <>{children}</>;
}
