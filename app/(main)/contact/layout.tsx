import type { Metadata } from "next";

const siteUrl = "https://wiredworldgh.com";

export const metadata: Metadata = {
  title: "Contact Us | WiredWorld Ghana — Electronics Store in Accra",
  description:
    "Contact WiredWorld Ghana for product enquiries, order support, bulk purchases, and B2B corporate sales. Visit our showrooms in Accra Newtown, East Legon, and Kasoa, or reach us by phone, email, or WhatsApp. Mon–Sat: 8AM–6PM.",
  keywords: [
    "contact WiredWorld Ghana",
    "electronics store Accra",
    "WiredWorld customer support",
    "B2B electronics Ghana",
    "corporate electronics sales Ghana",
    "bulk electronics purchase Ghana",
    "WiredWorld phone number",
    "WiredWorld email",
    "electronics showroom Accra",
    "home appliances Ghana contact",
    "TV fridge washing machine Ghana",
    "WiredWorld WhatsApp",
    "order enquiry Ghana",
    "electronics help Ghana",
    "+233551105055",
  ],
  alternates: {
    canonical: "/contact",
  },
  openGraph: {
    type: "website",
    url: `${siteUrl}/contact`,
    title: "Contact WiredWorld Ghana — Electronics & Home Appliances",
    description:
      "Reach out to WiredWorld Ghana for product enquiries, order support, and corporate sales. Available Mon–Sat, 8AM–6PM. Call +233 55 110 5055, email info@wiredworldgh.com, or WhatsApp us.",
    images: [
      {
        url: `${siteUrl}/images/WIRED-IMAGE5.jpeg`,
        width: 1200,
        height: 630,
        alt: "Contact WiredWorld Ghana — visit our showroom or reach us online",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Contact WiredWorld Ghana",
    description:
      "Get in touch with WiredWorld Ghana for electronics enquiries, B2B sales, and order support. Call, email, or WhatsApp us — Mon–Sat, 8AM–6PM.",
    images: [`${siteUrl}/images/WIRED-IMAGE5.jpeg`],
  },
};

export default function ContactLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <>{children}</>;
}
