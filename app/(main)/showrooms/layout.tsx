import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Showrooms",
  description:
    "Visit a WiredWorld showroom to experience our products firsthand. See, touch, and test the latest TVs, home appliances, audio systems, and more before you buy. Our showroom staff are on hand to guide you through features, specifications, and help you find the perfect fit for your home.",
  keywords: [
    "WiredWorld showroom",
    "electronics showroom Ghana",
    "visit showroom",
    "product demo",
    "try before you buy",
    "Accra showroom",
    "appliance showroom",
  ],
  openGraph: {
    title: "Showrooms — WiredWorld",
    description:
      "Experience our products in person. Visit a WiredWorld showroom to see, touch, and test the latest electronics and appliances.",
  },
};

export default function ShowroomsLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <>{children}</>;
}
