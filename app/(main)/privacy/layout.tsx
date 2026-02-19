import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description:
    "Learn how WiredWorld collects, uses, and protects your personal information. Our privacy policy covers data collection practices, cookie usage, third-party sharing, your data rights, and the security measures we take to keep your information safe when you shop with us.",
  keywords: [
    "privacy policy",
    "WiredWorld privacy",
    "data protection",
    "personal information",
    "cookie policy",
    "data rights",
    "GDPR",
    "user privacy",
  ],
  openGraph: {
    title: "Privacy Policy — WiredWorld",
    description:
      "How we collect, use, and protect your personal data. Your privacy matters to us.",
  },
};

export default function PrivacyLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <>{children}</>;
}
