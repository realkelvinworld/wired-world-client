import { Geist, Geist_Mono } from "next/font/google";
import type { Metadata } from "next";
import "./globals.css";

import QuickNav from "@/components/ux/quick-nav";
import Footer from "@/components/ux/footer";
import Navbar from "@/components/ux/nav";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const siteUrl = "https://wiredworld.com";

export const metadata: Metadata = {
  title: {
    default: "WiredWorld — Electronics, Home Appliances & More",
    template: "%s | WiredWorld",
  },
  description:
    "Shop top electronics, home appliances, TVs, audio systems, kitchen gadgets, laptops and air conditioning from trusted brands like LG, Samsung, Sony, TCL, Midea and Nasco. Fast delivery & great prices.",
  keywords: [
    "electronics store",
    "home appliances",
    "smart TVs",
    "4K UHD TVs",
    "OLED TVs",
    "refrigerators",
    "washing machines",
    "soundbars",
    "headphones",
    "laptops",
    "air conditioners",
    "kitchen appliances",
    "LG",
    "Samsung",
    "Sony",
    "TCL",
    "Midea",
    "Nasco",
    "WiredWorld",
    "buy electronics online",
  ],
  authors: [{ name: "WiredWorld" }],
  creator: "WiredWorld",
  publisher: "WiredWorld",
  metadataBase: new URL(siteUrl),
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: siteUrl,
    siteName: "WiredWorld",
    title: "WiredWorld — Electronics, Home Appliances & More",
    description:
      "Shop top electronics, home appliances, TVs, audio systems, kitchen gadgets, laptops and air conditioning from trusted brands. Fast delivery & great prices.",
  },
  twitter: {
    card: "summary_large_image",
    title: "WiredWorld — Electronics, Home Appliances & More",
    description:
      "Shop top electronics, home appliances, TVs, audio systems, kitchen gadgets, laptops and air conditioning from trusted brands. Fast delivery & great prices.",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <Navbar />
        {children}
        <QuickNav />
        <Footer />
      </body>
    </html>
  );
}
