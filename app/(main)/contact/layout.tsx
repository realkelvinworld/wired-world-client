import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contact Us",
  description:
    "Get in touch with the WiredWorld team. Whether you have questions about a product, need help with an order, or want to discuss a bulk purchase — our support team is here to help. Reach us by phone, email, or visit our showroom in Accra, Ghana.",
  keywords: [
    "contact WiredWorld",
    "customer support",
    "electronics help",
    "order enquiry",
    "bulk purchase",
    "WiredWorld Ghana",
    "support team",
  ],
  openGraph: {
    title: "Contact Us — WiredWorld",
    description:
      "Have a question or need assistance? Reach out to our support team — we're happy to help with products, orders, and more.",
  },
};

export default function ContactLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <>{children}</>;
}
