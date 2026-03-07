import type { Metadata } from "next";

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
  openGraph: {
    title: "Privacy Policy — Wired World (WiredWorld)",
    description:
      "How we collect, use, and protect your personal data. Your privacy matters to us.",
  },
  alternates: { canonical: "/privacy" },
};

export default function PrivacyLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <>{children}</>;
}
